from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
import json
import os

from .database import engine, init_db, get_session
from .models import Personality, CommentarySession, CommentaryEntry

app = FastAPI(title="PeanutGallery API")

# Configure CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()
    # Seed presets if empty
    with Session(engine) as session:
        statement = select(Personality).where(Personality.isPreset == True)
        results = session.exec(statement).all()
        if not results:
            seed_presets(session)

def seed_presets(session: Session):
    try:
        # Navigate to the frontend's public directory to get the presets
        json_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "personalities-data.json")
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
    except Exception as e:
        print(f"Error seeding presets: {e}")

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
