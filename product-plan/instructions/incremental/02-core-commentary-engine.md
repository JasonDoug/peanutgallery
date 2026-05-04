# Milestone 2: Core Commentary Engine

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Implement the Core Commentary Engine feature — Real-time video analysis and AI commentary generation.

## Overview

The Core Commentary Engine is the main viewing experience for PeanutGallery. Users configure their video source, select an AI agent, and launch a real-time commentary session where the AI watches and riffs on the video. During playback, commentary appears as subtitle overlays and in a chat sidebar with summonable controls.

**Key Functionality:**
- Configure video source (URL or Upload)
- Select AI Agent and Voice personality
- Adjust commentary delay and volume
- Real-time commentary display during playback

## Components Provided

Copy the section components from `product-plan/sections/core-commentary-engine/components/`:

- `SetupScreen.tsx` — Main configuration and session launch view
- `VideoSourceInput.tsx` — URL and Upload handling
- `AgentSelector.tsx` — Grid for selecting AI personas
- `VoiceSelector.tsx` — Dropdown for selecting text-to-speech voices
- `ActiveSessionDisplay.tsx` — The main viewing UI (future placeholder)

## Props Reference

The components expect these data shapes (see `types.ts` for full definitions):

**Data props:**

```typescript
export interface CoreCommentaryEngineData {
  agents: Agent[]
  voices: Voice[]
  commentary: Commentary[]
  videoSources: VideoSource[]
  activeSession: ActiveSession
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onAgentSelect` | User selects a different agent |
| `onVoiceSelect` | User selects a different voice |
| `onVideoUrlSubmit` | User submits a video URL |
| `onStartCommentary` | User clicks "Start Commentary" |

## Expected User Flows

### Flow 1: Setup a Commentary Session

1. User enters a movie URL or uploads a file
2. User selects an AI Agent (e.g. "The Snarky Critic")
3. User chooses a Voice
4. User clicks "Start Commentary"
5. **Outcome:** The viewing session begins with the chosen settings

## Files to Reference

- `product-plan/sections/core-commentary-engine/README.md` — Feature overview
- `product-plan/sections/core-commentary-engine/tests.md` — UI behavior test specs
- `product-plan/sections/core-commentary-engine/components/` — React components
- `product-plan/sections/core-commentary-engine/types.ts` — TypeScript interfaces
- `product-plan/sections/core-commentary-engine/sample-data.json` — Test data
- `product-plan/sections/core-commentary-engine/SetupScreen.png` — Visual reference

## Done When

- [ ] Setup screen renders with real agent/voice data
- [ ] Video source selection works
- [ ] All callback props are wired to working functionality
- [ ] Matches the visual design
