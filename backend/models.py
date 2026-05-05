from datetime import datetime
from typing import List, Optional, Dict, Any
from sqlmodel import SQLModel, Field, Column, JSON
import uuid

class Personality(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    description: str
    tone: str # 'slapstick' | 'dry-humor' | 'educational' | 'hype' | 'supportive' | 'technical' | 'custom'
    systemPrompt: str
    temperature: float = 0.7
    model: str = "gpt-4o-mini"
    active: bool = True
    isPreset: bool = False
    
    # Complex fields stored as JSON
    exampleOutputs: List[Dict[str, str]] = Field(default=[], sa_column=Column(JSON))
    forbiddenTopics: List[str] = Field(default=[], sa_column=Column(JSON))
    responseStyleExamples: List[str] = Field(default=[], sa_column=Column(JSON))
    
    outputFormat: str = "plain-text" # 'plain-text' | 'markdown' | 'json'
    usageCount: int = 0
    averageRating: float = 0.0
    lastUsed: Optional[datetime] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class CommentaryEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str = Field(index=True)
    timestamp: str # HH:MM:SS
    text: str

class CommentarySession(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    date: datetime = Field(default_factory=datetime.utcnow)
    thumbnailUrl: Optional[str] = None
    personalityName: str
    personalityId: str
    duration: str = "0:00"
    commentaryCount: int = 0
    videoSource: str # Local path or URL
