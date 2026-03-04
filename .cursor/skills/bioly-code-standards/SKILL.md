---
name: bioly-code-standards
description: Code quality standards for bioly project using Ultracite (Biome). Use when writing or editing TypeScript, React, or CSS code. Covers formatting, type safety, React patterns, accessibility, and lint commands.
---

# Bioly Code Standards

Project uses **Ultracite** (Biome preset) for formatting and linting.

## Commands

- `npx ultracite fix` — format and auto-fix
- `npx ultracite check` — check for issues
- `npx ultracite doctor` — diagnose setup

## Core Principles

Write **accessible, performant, type-safe, maintainable** code. Prefer clarity over brevity.

### TypeScript

- Explicit types for params/returns when they help clarity
- Prefer `unknown` over `any`
- Use `as const` for literals
- Type narrowing over type assertions
- Descriptive names, no magic numbers

### Modern JS/TS

- Arrow functions for callbacks
- Prefer `for...of` over `.forEach()` and indexed `for`
- Optional chaining (`?.`), nullish coalescing (`??`)
- Template literals, destructuring
- `const` by default, `let` only when needed, never `var`

### React

- Function components, hooks at top level
- Correct dependency arrays
- `key` with unique IDs (not array index)
- Children between tags, not as props
- No components defined inside components
- Semantic HTML + ARIA (alt text, labels, keyboard handlers, `<button>` not `<div role="button">`)

### Async

- Always `await` in async functions
- `async/await` over promise chains
- Try-catch for errors

### Organization

- Focused functions, early returns
- Extract complex conditions to named booleans
- Avoid nested ternaries

### Security

- `rel="noopener"` with `target="_blank"`
- Avoid `dangerouslySetInnerHTML`
- No `eval()`, validate/sanitize input

### Performance

- No spread in loop accumulators
- Top-level regex literals
- Specific imports over namespace
- Avoid barrel files
- Next.js `<Image>` over `<img>`

### Framework

**Next.js:** Use `<Image>`, metadata API, Server Components for data.

**React 19+:** `ref` as prop (no `forwardRef`).

## Testing

- Assertions in `it()`/`test()`
- Async/await, no done callbacks
- No `.only`/`.skip` in commits

## What Biome Doesn't Catch

Focus on: business logic correctness, naming, architecture, edge cases, UX, documentation.

Run `npx ultracite fix` before committing.
