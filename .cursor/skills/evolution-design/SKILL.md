---
name: evolution-design
description: Evolution Design (ED Small) architecture for frontend. Use when adding features, organizing modules, structuring imports, or deciding where code belongs. Layered structure: app → features → services → shared.
---

# Evolution Design (ED Small)

Layered architecture with **unidirectional imports** (only downward).

## Layers

| Layer | Purpose | Can Import |
|-------|---------|------------|
| `app/` | Entry, routing, composition | all |
| `features/` | Large independent features | services, shared |
| `services/` | Cross-feature business logic | shared |
| `shared/` | UI, utils, types | nothing |

## Rules

- **Features** do NOT import other features or app
- **Services** do NOT import features or other services
- **No barrel files** — import directly: `@/features/auth/ui/login-form`
- Choose module stage by size: Single File → Flat → Grouped → Compose

## Module Structure

- **Flat:** `api.ts`, `component.tsx`, `use-hook.ts` (100–300 lines)
- **Grouped:** `ui/`, `model/`, `api/`, `domain/` (> 300 lines)
- **Compose:** `model/` and `ui/` independent; `compose/` connects them

## Feature Interaction

- Compose in app, shared services, or events via `shared/lib/events`

## Reference

For full rules, examples, and migration guide: [reference.md](reference.md)
