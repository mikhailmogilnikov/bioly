# Evolution Design — Full Reference

## Layered Architecture

```
app/ ─────┐
          ↓
features/ ┼─────┐
          ↓     ↓
services/ ──────┼─────┐
                ↓     ↓
shared/   ──────┴─────┘
```

### app/
Entry point, routing, providers, feature composition. Can import all layers. Minimal business logic.

### features/
Large independent features. Can import `services/`, `shared/`. **Cannot** import other features or `app/`.

### services/
API clients, cross-feature business logic. Can import `shared/` only. **Cannot** import features, app, or other services.

### shared/
UI components, utilities, hooks, types, API client. **Cannot** import other layers.

## Module Stages

**Stage 1 (Single File):** < 100 lines, one file.

**Stage 2 (Flat):** 100–300 lines. `api.ts`, `component.tsx`, `use-hook.ts` at same level.

**Stage 3 (Grouped):** > 300 lines. Groups: `ui/`, `model/`, `api/`, `domain/`, `lib/`, `config/`.

**Stage 4 (Compose):** Complex. `model/` and `ui/` independent; `compose/` connects via slots, events, DI.

## Import Rules

**Allowed:**
- app → any
- features → services, shared
- services → shared

**Forbidden:**
- features → features, app
- services → features, services, app
- shared → anything
- Barrel files (index.ts)

## Public API

Use direct imports:
```tsx
import { LoginForm } from "@/features/auth/ui/login-form";
import { useAuth } from "@/features/auth/model/use-auth";
```

## Feature Interaction

1. Composition in app
2. Shared service (e.g. user store)
3. Events via shared (createEvent, emit, subscribe)

## Naming

- Features: kebab-case (auth, task-list, user-profile)
- Services: tasks, users, api, storage
- Shared: ui/, lib/, api/, types/, config/

## Links

- [ED Guide](https://ed.evocomm.space/guide/)
- [ED Small](https://ed.evocomm.space/guide/ed-small/)
