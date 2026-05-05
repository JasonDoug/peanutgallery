# PeanutGallery Dev Diary

## Current Project Status: ~65% Complete

This project is being built as a self-hosted, OSS MST3K-style AI video companion.

---

## Progress Overview

### 1. Frontend (90%) ✅
- [x] UI Shell & Navigation (AppShell, MainNav)
- [x] Personality System UI (Grid, Card, Editor)
- [x] Commentary History UI (Grid, Detail)
- [x] Core Engine UI (Setup Screen, Active Session Display)
- [x] Integration with real Backend API (Wired via Vite proxy)
- [ ] GetStream Video Player Integration

### 2. Backend API (90%) ✅
- [x] Project Initialization (`uv`, FastAPI)
- [x] Data Models (SQLModel: Personality, Session, Commentary, JokeCandidate)
- [x] Database Initialization & Seeding (SQLite)
- [x] Full REST CRUD Endpoints (`/personalities`, `/history`, `/setup`)
- [x] Session Management Logic (Real `/api/sessions` starts background workers)
- [x] Backend WebSocket/Streaming Foundation (Conceptually mapped in Engine)
- [ ] Media Upload & Handling logic (Final FFmpeg wiring)

### 3. AI & Commentary Engine (85%) 🔄
- [x] VisionAgents Scaffolding
- [x] On-prem STT Integration (Fast-Whisper)
- [x] On-prem TTS Integration (Kokoro / Remote Kokoro Caller)
- [x] Cloud LLM Integration (OpenRouter)
- [x] **Joke Engine (The Brain)**: Scoring logic & context window (AI-001/002 complete)
- [x] **1-Minute Lookahead (File-mode)**: Conceptual implementation in `run_file_lookahead` (BE-001)
- [ ] **1-Minute Buffer (Stream-mode)**: (0%)

### 4. DevOps & OSS Foundation (65%) 🔄
- [x] Root Documentation (README, GEMINI.md)
- [x] OSS License (MIT)
- [x] Dockerfile for Backend (Security hardened: Non-root user, pinned versions)
- [x] Dockerfile for Frontend (Security hardened: Unprivileged Nginx)
- [x] Docker Compose orchestration (Added healthchecks, named volumes, restart policies)
- [x] Self-hosting Guide / Documentation (Quickstart added to README)
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
