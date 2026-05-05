import os
from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./peanutgallery.db")
DEBUG_SQL = os.getenv("DEBUG_SQL", "false").lower() == "true"

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}, # Required for SQLite + FastAPI
    echo=DEBUG_SQL
)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
