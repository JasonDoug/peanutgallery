# Milestone 4: Commentary History

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

Implement the Commentary History feature — Archive of past commentary sessions.

## Overview

A simple archive where users can browse past commentary sessions as cards with video thumbnails, then view the generated commentary text with timestamps. Users can revisit previous sessions and see which personality was used.

**Key Functionality:**
- Browse sessions with thumbnails and personality tags
- View full transcripts with timestamps
- Delete past sessions

## Components Provided

Copy the section components from `product-plan/sections/commentary-history/components/`:

- `CommentaryGrid.tsx` — Grid for browsing history
- `CommentaryCard.tsx` — Session card with stats
- `CommentaryDetail.tsx` — Detailed transcript view

## Props Reference

**Data props:**

```typescript
export interface CommentaryHistoryData {
  sessions: CommentarySession[]
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onSelectSession` | User clicks a session to view details |
| `onDeleteSession` | User clicks delete |

## Expected User Flows

### Flow 1: Review a Past Viewing Session

1. User scrolls through the History grid
2. User clicks a session card (e.g. "The Thing")
3. User reads the AI riffs with their associated timestamps
4. **Outcome:** User can relive the commentary from that session

## Files to Reference

- `product-plan/sections/commentary-history/README.md` — Feature overview
- `product-plan/sections/commentary-history/tests.md` — UI behavior test specs
- `product-plan/sections/commentary-history/components/` — React components
- `product-plan/sections/commentary-history/types.ts` — TypeScript interfaces
- `product-plan/sections/commentary-history/sample-data.json` — Test data
- `product-plan/sections/commentary-history/CommentaryGrid.png` — Visual reference

## Done When

- [ ] History grid renders past sessions
- [ ] Detail view correctly maps timestamps to commentary
- [ ] Empty state is shown when no history exists
- [ ] All callback props are wired to working functionality
