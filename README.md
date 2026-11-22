# Smart Campus Room Availability Checker

## Purpose

Smart Campus room availability checker. One room, fictional booking data, fixed
current time (09:00). The app only answers "Available / Unavailable" with
reasons. It does not create bookings.

## Requirements

- Node.js 22 or newer (verified locally on Node 24.22.2; CI uses Node 22)

## Setup

```
npm ci
```

## Run

```
npm run dev
```

## Checks

```
npm test
npm run typecheck
npm run lint
npm run build
```

## Project structure

```
AGENTS.md                  Agent instructions and acceptance criteria
README.md                  This file
eslint.config.js           ESLint configuration
index.html                 HTML entry point
package.json               Scripts and dependencies
package-lock.json          Locked dependency versions (npm ci uses this)
postcss.config.js          PostCSS configuration
tailwind.config.js         Tailwind CSS configuration
tsconfig.app.json          TypeScript config for the app
tsconfig.json              TypeScript project references
tsconfig.node.json         TypeScript config for Node tooling
vite.config.ts             Vite configuration (@/ alias = src/)
src/
  App.tsx                  React UI (time inputs, "room blocked" toggle, result panel)
  availability.ts          Pure booking rules — the only source of truth
  availability.test.ts     Vitest regression tests for the rules
  index.css                Global styles
  main.tsx                 Vite entry point, mounts the React app
  vite-env.d.ts            Vite client types
```

## Acceptance criteria (must be preserved)

- AC1: Reject start >= end, times outside the day, and requests in the past.
- AC2: Enforce the maximum duration of 120 minutes (exactly 120 is allowed).
- AC3: Reject a blocked room.
- AC4: Reject overlaps; allow bookings that only touch at endpoints.
- AC5: Return Available / Unavailable without changing booking data.
- AC6: Preserve clear UI feedback on desktop and mobile.

## Agent instructions

See [AGENTS.md](AGENTS.md) for the full agent instructions, including scope
rules, safe commands, and the verification and review gate.
