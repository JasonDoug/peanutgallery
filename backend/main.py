import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
import json
import os

from .database import engine, init_db, get_session
from .models import Personality, CommentarySession, CommentaryEntry

logger = logging.getLogger(__name__)

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
        # Prefer PRESETS_PATH env var, fallback to local path
        default_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "personalities-data.json")
        json_path = os.environ.get("PRESETS_PATH", default_path)
        
        if not os.path.exists(json_path):
            logger.warning(f"Presets file not found at {json_path}. Skipping seeding.")
            return

        with open(json_path, "r") as f:
            data = json.load(f)
            for p_data in data.get("personalities", []):
                # Only seed presets
                if p_data.get("isPreset"):
                    # Check if already exists by name or id
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

@app.get("/api/personalities", response_model=List[Personality])
def list_personalities(session: Session = Depends(get_session)):
    return session.exec(select(Personality)).all()

@app.get("/api/history", response_model=List[CommentarySession])
def list_history(session: Session = Depends(get_session)):
    return session.exec(select(CommentarySession)).all()

@app.get("/api/history/{session_id}", response_model=CommentarySession)
def get_session_detail(session_id: str, session: Session = Depends(get_session)):
    db_session = session.get(CommentarySession, session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # In a real implementation, we'd join with CommentaryEntry
    # For now, we return the session object
    return db_session

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
