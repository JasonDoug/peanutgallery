# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **Session** — A single viewing session (used in: Core Commentary Engine, Commentary History)
- **Commentary** — Individual comments (used in: Core Commentary Engine, Commentary History)
- **Agent** — AI persona definition (used in: Core Commentary Engine, Prompt & Personality System)
- **User** — User metadata (used in: Shell)
- **Movie** — Video metadata (used in: Core Commentary Engine, Commentary History)

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/core-commentary-engine/types.ts`
- `sections/prompt-and-personality-system/types.ts`
- `sections/commentary-history/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
