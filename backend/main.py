import logging
import os
import json
import asyncio
from contextlib import asynccontextmanager
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from pydantic import BaseModel

from database import engine, init_db, get_session
from models import (
    Personality, 
    CommentarySession, 
    CommentaryEntry, 
    CommentarySessionCreate,
    JokeResponse,
    JokeCandidate
)
from engine import PeanutGalleryEngine

logger = logging.getLogger(__name__)

# Global engine instance (to be initialized in lifespan)
pg_engine: Optional[PeanutGalleryEngine] = None

class SetupResponse(BaseModel):
    agents: List[dict]
    voices: List[dict]
    commentary: List[dict]
    videoSources: List[dict]
    activeSession: dict

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pg_engine
    
    # Validate required environment variables
    required_vars = ["OPENROUTER_API_KEY", "STREAM_API_KEY", "STREAM_API_SECRET"]
    missing = [v for v in required_vars if not os.environ.get(v)]
    if missing:
        msg = f"Missing required environment variables: {', '.join(missing)}"
        logger.error(msg)
        # We don't raise RuntimeError here to allow the app to start but with limited functionality
        # or we could raise it to prevent startup. The finding suggests raising/explicit error.
        # raising RuntimeError(msg)

    # Initialize the Engine
    pg_engine = PeanutGalleryEngine(
        api_key=os.environ.get("OPENROUTER_API_KEY", ""),
        stream_key=os.environ.get("STREAM_API_KEY", ""),
        stream_secret=os.environ.get("STREAM_API_SECRET", ""),
        kokoro_url=os.environ.get("KOKORO_SERVER_URL")
    )

    # Startup logic
    init_db()
    # Seed presets if empty
    with Session(engine) as session:
        statement = select(Personality).where(Personality.isPreset)
        results = session.exec(statement).all()
        if not results:
            seed_presets(session)
    
    yield
    
    # Shutdown logic
    if pg_engine:
        await pg_engine.close()

app = FastAPI(title="PeanutGallery API", lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

def seed_presets(session: Session):
    try:
        default_path = os.path.join(os.path.dirname(__file__), "personalities-data.json")
        json_path = os.environ.get("PRESETS_PATH", default_path)
        
        if not os.path.exists(json_path):
            logger.warning(f"Presets file not found at {json_path}. Skipping seeding.")
            return

        with open(json_path, "r") as f:
            data = json.load(f)
            for p_data in data.get("personalities", []):
                if p_data.get("isPreset"):
                    statement = select(Personality).where(Personality.name == p_data["name"])
                    if session.exec(statement).first():
                        continue
                        
                    personality = Personality(
                        id=p_data["id"],
                        name=p_data["name"],
                        description=p_data["description"],
                        tone=p_data["tone"],
                        systemPrompt=p_data["systemPrompt"],
                        temperature=p_data["temperature"],
                        model=p_data["model"],
                        voiceId=p_data.get("voiceId", "af_heart"),
                        active=p_data["active"],
                        isPreset=True,
                        isDefault=p_data.get("isDefault", False),
                        exampleOutputs=p_data.get("exampleOutputs", []),
                        forbiddenTopics=p_data.get("forbiddenTopics", []),
                        responseStyleExamples=p_data.get("responseStyleExamples", []),
                        outputFormat=p_data.get("outputFormat", "plain-text"),
                        usageCount=p_data.get("usageCount", 0),
                        averageRating=p_data.get("averageRating", 0.0)
                    )
                    session.add(personality)
        session.commit()
    except (FileNotFoundError, KeyError, json.JSONDecodeError) as e:
        logger.error(f"Error seeding presets: {e}")
    except Exception as e:
        logger.error(f"Unexpected error seeding presets: {e}")

# --- Personalities API ---

@app.get("/api/personalities", response_model=List[Personality])
def list_personalities(session: Session = Depends(get_session)):
    return session.exec(select(Personality)).all()

@app.post("/api/personalities", response_model=Personality)
def create_personality(personality: Personality, session: Session = Depends(get_session)):
    session.add(personality)
    session.commit()
    session.refresh(personality)
    return personality

@app.put("/api/personalities/{id}", response_model=Personality)
def update_personality(
    updated_p: Personality, 
    id: str = Path(alias="id"),
    session: Session = Depends(get_session)
):
    db_p = session.get(Personality, id)
    if not db_p:
        raise HTTPException(status_code=404, detail="Personality not found")
    
    # Update fields using Pydantic v2 model_dump
    p_data = updated_p.model_dump(exclude_unset=True)
    for key, value in p_data.items():
        if key != "id":
            setattr(db_p, key, value)
    
    session.add(db_p)
    session.commit()
    session.refresh(db_p)
    return db_p

@app.delete("/api/personalities/{id}")
def delete_personality(
    id: str = Path(alias="id"),
    session: Session = Depends(get_session)
):
    db_p = session.get(Personality, id)
    if not db_p:
        raise HTTPException(status_code=404, detail="Personality not found")
    if db_p.isPreset:
        raise HTTPException(status_code=403, detail="Cannot delete preset personalities")
    
    session.delete(db_p)
    session.commit()
    return {"ok": True}

# --- Sessions & History API ---

@app.get("/api/history", response_model=List[CommentarySession])
def list_history(session: Session = Depends(get_session)):
    return session.exec(select(CommentarySession).order_by(CommentarySession.date.desc())).all()

@app.post("/api/sessions", response_model=CommentarySession)
async def create_session(session_req: CommentarySessionCreate, session: Session = Depends(get_session)):
    personality = session.get(Personality, session_req.personalityId)
    if not personality:
        raise HTTPException(status_code=404, detail="Personality not found")
    
    # Create the session record first
    db_session = CommentarySession(
        title=session_req.title,
        personalityId=session_req.personalityId,
        personalityName=personality.name,
        videoSource=session_req.videoSource
    )
    session.add(db_session)
    session.commit()
    session.refresh(db_session)

    try:
        # Initialize Riff Agent with per-session isolation
        await pg_engine.create_riff_agent(db_session.id, personality.id, personality.systemPrompt)
        
        # Start Lookahead Task and store it in engine state
        task = asyncio.create_task(pg_engine.run_file_lookahead(db_session.id, db_session.videoSource))
        pg_engine.active_sessions[db_session.id]["task"] = task
        
        return db_session
    except Exception as e:
        logger.error(f"Failed to start session engine: {e}")
        # Cleanup orphan session record on failure
        session.delete(db_session)
        session.commit()
        raise HTTPException(status_code=500, detail=str(e)) from e

@app.post("/api/sessions/{session_id}/stop")
async def stop_session(session_id: str):
    if session_id in pg_engine.active_sessions:
        session_state = pg_engine.active_sessions.pop(session_id)
        task = session_state.get("task")
        if task:
            task.cancel()
            try:
                await task
            except asyncio.CancelledError:
                pass
        return {"ok": True}
    raise HTTPException(status_code=404, detail="Active session not found")

@app.get("/api/history/{session_id}")
def get_session_detail(session_id: str, session: Session = Depends(get_session)):
    db_session = session.get(CommentarySession, session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    return db_session

@app.delete("/api/history/{session_id}")
def delete_session(session_id: str, session: Session = Depends(get_session)):
    db_session = session.get(CommentarySession, session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Relationship cascade handles entries deletion
    session.delete(db_session)
    session.commit()
    return {"ok": True}

# --- Setup & Voices API ---

@app.get("/api/voices")
def list_voices():
    return [
        {"id": "af_heart", "name": "Heart (Female)", "provider": "kokoro", "gender": "female", "accent": "US"},
        {"id": "am_adam", "name": "Adam (Male)", "provider": "kokoro", "gender": "male", "accent": "US"},
        {"id": "bf_emma", "name": "Emma (Female)", "provider": "kokoro", "gender": "female", "accent": "UK"},
    ]

@app.get("/api/setup", response_model=SetupResponse)
def get_setup(session: Session = Depends(get_session)):
    personalities = session.exec(select(Personality)).all()
    agents = [
        {
            "id": p.id,
            "name": p.name,
            "personality": p.description,
            "voiceId": p.voiceId,
            "temperature": p.temperature,
            "isDefault": p.isDefault,
            "isPreset": p.isPreset
        } for p in personalities
    ]
    
    return {
        "agents": agents,
        "voices": list_voices(),
        "commentary": [],
        "videoSources": [],
        "activeSession": {
            "videoSourceId": "",
            "agentId": next((a["id"] for a in agents if a["isDefault"]), agents[0]["id"] if agents else ""),
            "voiceId": next((a["voiceId"] for a in agents if a["isDefault"]), "af_heart"),
            "delaySeconds": 60,
            "volume": 80,
            "isPlaying": False
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
