# PeanutGallery

PeanutGallery is a self-hosted, open-source AI video companion that provides MST3K-style commentary on movies. It uses real-time vision and audio analysis to generate witty, contextual riffs.

## Features

- **MST3K-Style Riffing**: Context-aware AI commentary that watches movies with you.
- **Self-Hosted First**: Designed to run on your own hardware, leveraging local GPUs for vision and speech processing.
- **Dual-Mode Processing**:
  - **File-Based Lookahead**: Processes local media files 1 minute ahead for perfectly timed jokes.
  - **Buffered Streaming**: Supports YouTube and live streams with a smart processing buffer.
- **Custom Personalities**: Create and switch between different AI "bots" with unique prompts and voices.

## Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS 4.
- **Backend**: Python FastAPI + VisionAgents.
- **Local AI Stack**:
  - **STT**: Fast-Whisper (On-prem).
  - **TTS**: Kokoro (On-prem).
  - **Vision**: Moondream / Ultralytics (On-prem).
- **Cloud Fallbacks**: OpenRouter (LLM/VLM) and GetStream (WebRTC Transport).

## Getting Started

The easiest way to run PeanutGallery is using Docker Compose:

1. **Prerequisites**: Ensure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.
2. **Configuration**: 
   - Copy `backend/.env.example` to `backend/.env`.
   - Add your `OPENROUTER_API_KEY`, `STREAM_API_KEY`, and `STREAM_API_SECRET`.
3. **Run**:
   ```bash
   docker compose up --build
   ```
4. **Access**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

To stop the application, use `Ctrl+C` or `docker compose down`.
