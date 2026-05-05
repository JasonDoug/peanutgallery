import logging
import os
import json
from contextlib import asynccontextmanager
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from .database import engine, init_db, get_session
from .models import Personality, CommentarySession, CommentaryEntry
from .engine import PeanutGalleryEngine

logger = logging.getLogger(__name__)

# Initialize the Engine
pg_engine = PeanutGalleryEngine(
    api_key=os.environ.get("OPENROUTER_API_KEY", ""),
    stream_key=os.environ.get("STREAM_API_KEY", ""),
    stream_secret=os.environ.get("STREAM_API_SECRET", ""),
    kokoro_url=os.environ.get("KOKORO_SERVER_URL")
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    init_db()
    # Seed presets if empty
    with Session(engine) as session:
        statement = select(Personality).where(Personality.isPreset)
        results = session.exec(statement).all()
        if not results:
            seed_presets(session)
    yield
    # Shutdown logic (if any)

app = FastAPI(title="PeanutGallery API", lifespan=lifespan)

# Configure CORS for frontend development
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
                        active=p_data["active"],
                        isPreset=True,
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
def update_personality(id: str, updated_p: Personality, session: Session = Depends(get_session)):
    db_p = session.get(Personality, id)
    if not db_p:
        raise HTTPException(status_code=404, detail="Personality not found")
    
    p_data = updated_p.dict(exclude_unset=True)
    for key, value in p_data.items():
        if key != "id":
            setattr(db_p, key, value)
    
    session.add(db_p)
    session.commit()
    session.refresh(db_p)
    return db_p

@app.delete("/api/personalities/{id}")
def delete_personality(id: str, session: Session = Depends(get_session)):
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
async def create_session(session_req: CommentarySession, background_tasks: BackgroundTasks, session: Session = Depends(get_session)):
    personality = session.get(Personality, session_req.personalityId)
    if not personality:
        raise HTTPException(status_code=404, detail="Personality not found")
    
    try:
        # Initialize Riff Agent (AI-001/002/003)
        await pg_engine.create_riff_agent(personality.id, personality.systemPrompt)
        
        # Start Lookahead (BE-001)
        pg_engine.active_sessions[session_req.id] = True
        background_tasks.add_task(pg_engine.run_file_lookahead, session_req.id, session_req.videoSource)
        
        session.add(session_req)
        session.commit()
        session.refresh(session_req)
        return session_req
    except Exception as e:
        logger.error(f"Failed to start session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sessions/{session_id}/stop")
async def stop_session(session_id: str):
    if session_id in pg_engine.active_sessions:
        del pg_engine.active_sessions[session_id]
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

@app.get("/api/setup", response_model=dict)
def get_setup(session: Session = Depends(get_session)):
    personalities = session.exec(select(Personality)).all()
    agents = [
        {
            "id": p.id,
            "name": p.name,
            "personality": p.description,
            "voiceId": "af_heart",
            "temperature": p.temperature,
            "isDefault": p.isPreset
        } for p in personalities
    ]
    
    return {
        "agents": agents,
        "voices": list_voices(),
        "commentary": [],
        "videoSources": [],
        "activeSession": {
            "videoSourceId": "",
            "agentId": agents[0]["id"] if agents else "",
            "voiceId": "af_heart",
            "delaySeconds": 60,
            "volume": 80,
            "isPlaying": False
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
