# PeanutGallery

PeanutGallery is a real-time AI video companion that provides MST3K-style commentary on movies. It is designed as a self-hosted, open-source tool that prioritizes on-prem hardware for privacy and performance.

## Project Overview

- **Core Technology:** React 19, FastAPI, VisionAgents, TypeScript, Tailwind CSS 4.
- **Mission:** Provide a robust, customizable, and self-hostable MST3K experience using local-first AI.
- **Architecture:** 
    - `frontend/`: Standalone React application.
    - `backend/`: Python API and VisionAgents commentary engine.
    - `product-plan/`: Design systems and milestone-based instructions.

## Building and Running

### Frontend
Commands should be executed within the `frontend/` directory:
- `npm run dev`: Start development server.
- `npm run build`: Production build.

### Backend (Development)
Commands should be executed within the `backend/` directory:
- `uv sync`: Install dependencies.
- `uv run fastapi dev main.py`: Start API server.

## Development Conventions

### Self-Hosting & OSS
- **Docker First**: Aim for easy deployment via Docker Compose.
- **Local Fallbacks**: Always provide a local inference option (e.g., Moondream, Kokoro) before falling back to cloud APIs.
- **Environment Parity**: Use `.env.example` for all sensitive configurations.

## Directory Structure Highlights

- `frontend/src/components/`: Modularized UI components grouped by system (shell, commentary-engine, etc.).
- `frontend/src/pages/`: Main view components for each route.
- `product-plan/`: Source of truth for designs, data shapes, and milestone instructions.
- `output/`: Contains vision-agent related data and scripts for the commentary engine.
