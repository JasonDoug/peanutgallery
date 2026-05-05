from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
import uuid
from sqlmodel import SQLModel, Field, Column, JSON, Relationship
from pydantic import BaseModel

class Personality(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    description: str
    tone: str # 'slapstick' | 'dry-humor' | 'educational' | 'hype' | 'supportive' | 'technical' | 'custom'
    systemPrompt: str
    temperature: float = 0.7
    model: str = "gpt-4o-mini"
    voiceId: str = "af_heart"
    active: bool = True
    isPreset: bool = False
    isDefault: bool = False
    
    # Complex fields stored as JSON
    exampleOutputs: List[Dict[str, str]] = Field(default=[], sa_column=Column(JSON))
    forbiddenTopics: List[str] = Field(default=[], sa_column=Column(JSON))
    responseStyleExamples: List[str] = Field(default=[], sa_column=Column(JSON))
    
    outputFormat: str = "plain-text" # 'plain-text' | 'markdown' | 'json'
    usageCount: int = 0
    averageRating: float = 0.0
    lastUsed: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CommentaryEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str = Field(index=True, foreign_key="commentarysession.id")
    timestamp: str # HH:MM:SS
    text: str
    
    session: "CommentarySession" = Relationship(back_populates="entries")

class CommentarySession(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    thumbnailUrl: Optional[str] = None
    personalityName: str
    personalityId: str
    duration: str = "0:00"
    commentaryCount: int = 0
    videoSource: str # Local path or URL
    
    entries: List[CommentaryEntry] = Relationship(
        back_populates="session", 
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )

# Pydantic models for the Joke Engine
class JokeCandidate(BaseModel):
    text: str
    wit_score: int
    timing_score: int
    reasoning: str

class JokeResponse(BaseModel):
    candidates: List[JokeCandidate]
    best_joke_index: int

# Input Schemas
class CommentarySessionCreate(BaseModel):
    title: str
    personalityId: str
    videoSource: str
