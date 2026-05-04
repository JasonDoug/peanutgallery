# Core Commentary Engine

## Overview

The Core Commentary Engine is the main viewing experience for PeanutGallery. Users configure their video source, select an AI agent, and launch a real-time commentary session where the AI watches and riffs on the video.

## User Flows

- Configure video source (URL or Upload)
- Select AI Agent and Voice personality
- Adjust commentary delay and volume
- Real-time commentary display during playback

## Data Shapes

**Entities:** Agent, Voice, Commentary, VideoSource, ActiveSession

## Visual Reference

See `SetupScreen.png` for the target UI design.

## Components Provided

- `SetupScreen` — Main configuration and session launch view
- `VideoSourceInput` — URL and Upload handling
- `AgentSelector` — Grid for selecting AI personas
- `VoiceSelector` — Dropdown for selecting text-to-speech voices
- `ActiveSessionDisplay` — Main viewing UI
