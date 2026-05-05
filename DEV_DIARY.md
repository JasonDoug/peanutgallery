# PeanutGallery Dev Diary

## Current Project Status: ~35% Complete

This project is being built as a self-hosted, OSS MST3K-style AI video companion.

---

## Progress Overview

### 1. Frontend (80%) ✅
- [x] UI Shell & Navigation (AppShell, MainNav)
- [x] Personality System UI (Grid, Card, Editor)
- [x] Commentary History UI (Grid, Detail)
- [x] Core Engine UI (Setup Screen, Active Session Display)
- [ ] Integration with real Backend API (Currently using sample JSON)
- [ ] GetStream Video Player Integration

### 2. Backend API (40%) 🔄
- [x] Project Initialization (`uv`, FastAPI)
- [x] Data Models (SQLModel: Personality, Session, Commentary)
- [x] Database Initialization & Seeding (SQLite)
- [x] Basic REST Endpoints (`/personalities`, `/history`)
- [ ] Session Management Endpoints (`/start`, `/stop`)
- [ ] Media Upload & Handling logic

### 3. AI & Commentary Engine (20%) 🔄
- [x] VisionAgents Scaffolding
- [x] On-prem STT Integration (Fast-Whisper)
- [x] On-prem TTS Integration (Kokoro)
- [x] Cloud LLM Integration (OpenRouter)
- [ ] **Joke Engine (The Brain)**: Scoring logic & context window (10%)
- [ ] **1-Minute Lookahead (File-mode)**: (0%)
- [ ] **1-Minute Buffer (Stream-mode)**: (0%)

### 4. DevOps & OSS Foundation (50%) 🔄
- [x] Root Documentation (README, GEMINI.md)
- [x] OSS License (MIT)
- [x] Dockerfile for Backend
- [x] Dockerfile for Frontend
- [x] Docker Compose orchestration
- [ ] Self-hosting Guide / Documentation
- [ ] CI/CD Pipelines

---

## 🛠 What's Next (The "To-Do" List)

### Immediate Priority
1. **The Joke Engine**: Finalize the prompt engineering for OpenRouter to handle the "Riffing" style and implement the scoring system.
2. **File Lookahead**: Implement the background worker that reads a local video file 60 seconds ahead of a "current_time" pointer.
3. **Frontend Wiring**: Switch the React frontend from `fetch('/sample-data.json')` to `fetch('http://localhost:8000/api/...')`.

### 0% Completes (Future Milestones)
- **YouTube/URL Buffering**: Logic to ingest a streaming URL and hold it in a 1-minute buffer before processing.
- **Scene Change Detection**: Custom VisionAgent processor to trigger jokes specifically on scene transitions.
- **Multi-Agent Riffing**: Allowing two personalities to "talk" to each other about the same clip.

---

*Last Updated: Monday, May 4, 2026*
