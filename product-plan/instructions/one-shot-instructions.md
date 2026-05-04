# PeanutGallery — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# Milestone 1: Shell

Set up the design tokens and application shell — the persistent chrome that wraps all sections.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

---

# Milestone 2: Core Commentary Engine

Implement the Core Commentary Engine feature — Real-time video analysis and AI commentary generation.

## Overview

The Core Commentary Engine is the main viewing experience for PeanutGallery. Users configure their video source, select an AI agent, and launch a real-time commentary session where the AI watches and riffs on the video.

**Key Functionality:**
- Configure video source (URL or Upload)
- Select AI Agent and Voice personality
- Adjust commentary delay and volume

---

# Milestone 3: Prompt & Personality System

Implement the Prompt & Personality System feature — Browse, customize, and create AI agent personalities.

## Overview

The Prompt & Personality System allows users to browse, customize, and create AI agent personalities with different tones and behaviors.

**Key Functionality:**
- Browse personalities in a card grid
- View personality details and usage stats
- Edit system prompts, temperature, and models
- Test-run personalities in a sandbox with sample input

---

# Milestone 4: Commentary History

Implement the Commentary History feature — Archive of past commentary sessions.

## Overview

A simple archive where users can browse past commentary sessions as cards with video thumbnails, then view the generated commentary text with timestamps.

**Key Functionality:**
- Browse sessions with thumbnails and personality tags
- View full transcripts with timestamps
- Delete past sessions
