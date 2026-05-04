# PeanutGallery — Product Overview

## Summary

A real-time AI video companion that watches movies with you and riffs on what's happening, MST3K-style. Users can customize the prompt to shift from comedy riffs to educational commentary, making it a flexible companion for any kind of viewing.

## Planned Sections

1. **Core Commentary Engine** — Real-time video analysis and AI commentary generation using VisionAgents and GetStream's video framework.
2. **Prompt & Personality System** — Customizable prompt engine and multiple agent personalities (slapstick, dry humor, educational) that users can switch between.
3. **Commentary History** — Save, browse, and revisit past commentary moments from viewing sessions.

## Product Entities

- **Session**: A single viewing session where a user watches a movie with PeanutGallery providing commentary in real-time.
- **Commentary**: An individual AI-generated comment tied to a specific moment in a viewing session, including timestamps and the agent that generated it.
- **Agent**: An AI persona with its own prompt instructions and personality traits (e.g., slapstick, dry humor, educational).
- **User**: A person who uses PeanutGallery to watch movies with AI commentary.
- **Movie**: The video content being watched, including metadata like title, duration, and source.

## Design System

**Colors:**
- Primary: rose
- Secondary: amber
- Neutral: zinc

**Typography:**
- Heading: Space Grotesk
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell
2. **Core Commentary Engine** — Real-time video analysis and session setup
3. **Prompt & Personality System** — Personality browsing and editor
4. **Commentary History** — Browsing and viewing past sessions

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
