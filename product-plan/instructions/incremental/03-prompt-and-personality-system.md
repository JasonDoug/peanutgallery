# Milestone 3: Prompt & Personality System

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

Implement the Prompt & Personality System feature — Browse, customize, and create AI agent personalities.

## Overview

The Prompt & Personality System allows users to browse, customize, and create AI agent personalities with different tones and behaviors. Users can select from preset personalities or build custom ones with fine-tuned prompt parameters.

**Key Functionality:**
- Browse personalities in a card grid
- View personality details and usage stats
- Edit system prompts, temperature, and models
- Test-run personalities in a sandbox with sample input

## Components Provided

Copy the section components from `product-plan/sections/prompt-and-personality-system/components/`:

- `PersonalityGrid.tsx` — Grid view for browsing personalities
- `PersonalityCard.tsx` — Individual personality card with usage stats
- `PersonalityEditor.tsx` — Full-screen editor and sandbox environment

## Props Reference

**Data props:**

```typescript
export interface PersonalitySystemData {
  personalities: Personality[]
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onSelectPersonality` | User clicks a personality to view/edit |
| `onToggleActive` | User toggles a personality on/off |
| `onSave` | User saves changes in the editor |
| `onTestRun` | User clicks "Run Test" in the sandbox |

## Expected User Flows

### Flow 1: Customize an AI Personality

1. User clicks "Edit" on a personality card
2. User modifies the System Prompt and Temperature
3. User enters sample text in the Sandbox and clicks "Run Test"
4. User clicks "Save Changes"
5. **Outcome:** The personality is updated with the new behavior settings

## Files to Reference

- `product-plan/sections/prompt-and-personality-system/README.md` — Feature overview
- `product-plan/sections/prompt-and-personality-system/tests.md` — UI behavior test specs
- `product-plan/sections/prompt-and-personality-system/components/` — React components
- `product-plan/sections/prompt-and-personality-system/types.ts` — TypeScript interfaces
- `product-plan/sections/prompt-and-personality-system/sample-data.json` — Test data
- `product-plan/sections/prompt-and-personality-system/PersonalityGrid.png` — Visual reference

## Done When

- [ ] Card grid renders all available personalities
- [ ] Editor view handles prompt and parameter changes
- [ ] Sandbox properly displays "Generated" AI responses
- [ ] All callback props are wired to working functionality
