Purpose
Smart Campus room availability checker. One room, fictional booking data, fixed current time (09:00, NOW = 540 in src/App.tsx). The app only answers "Available / Unavailable" with reasons. It does not create bookings.

Architecture
index.html -> src/main.tsx: Vite entry point, mounts the React app.
src/App.tsx: React UI (time inputs, "room blocked" toggle, result panel).
src/availability.ts: pure booking rules (checkAvailability, minutesToLabel, labelToMinutes, MAX_DURATION). The only source of truth.
src/availability.test.ts: Vitest regression tests for the rules.
Config: package.json, vite.config.ts (@/ alias = src/), tsconfig*.json, eslint.config.js, tailwind.config.js.
Setup
npm ci (use the lockfile; do not use npm install).
npm run dev to start the app locally.
Acceptance Criteria (must be preserved)
AC1: Reject start >= end, times outside the day, and requests in the past.
AC2: Enforce the maximum duration of 120 minutes (exactly 120 is allowed).
AC3: Reject a blocked room.
AC4: Reject overlaps; allow bookings that only touch at endpoints.
AC5: Return Available / Unavailable without changing booking data.
AC6: Preserve clear UI feedback on desktop and mobile.
Safe commands (run without asking)
npm test, npm run typecheck, npm run lint, npm run build
npm ls <package>, npm audit, npm audit --omit=dev (read-only)
git status, git diff, git log
Reading any file in the repository.
Ask first (human approval required before running)
npm install, npm uninstall, npm update, npm audit fix
Any edit to package.json or package-lock.json
Any git commit, git branch, git checkout, git merge, git push
Creating new files outside src/ or the docs files named in the task
Forbidden actions
Do not create, read, print or commit secrets, API keys, .env files or real personal data.
Do not add a backend, login, database or booking creation. Preserve AC1-AC6 and the existing UI.
Do not deploy, publish or call external services.
Do not run destructive commands: rm -rf, git reset --hard, git push --force, deleting branches or tags (especially the baseline-assignment05 branch).
Do not add, remove or upgrade dependencies without approval. Do not add or use @supabase/supabase-js.
Do not delete tests, skip tests, weaken assertions, or disable lint rules to make checks pass.
Do not change the fixed current time or mutate booking fixtures.
Do not merge changes or edit files outside the requested scope.
Coding conventions
Prefer pure functions and minimal diffs. Keep business logic in src/availability.ts, not in App.tsx.
TypeScript strict types; no any. Use the @/ alias for imports from src/.
Use a design pattern only when it solves a concrete maintainability problem; at most two, and name them in the change summary.
Do not refactor unrelated code.
Test expectations
Every change to a rule in src/availability.ts needs a test in src/availability.test.ts covering the behavior, including edge cases (endpoints, exactly 120 minutes, current time).
Existing tests (13 at baseline) must still pass unchanged.
Report the real pass/fail totals. Say explicitly which checks were not run.
Verification and review gate
Before proposing a change, run npm test, npm run typecheck, npm run lint and npm run build, and report the real output. Every change summary must list: changed files, rationale, commands run, results, and any known risks. A human must review the diff and approve before any change is accepted. Never claim a check passed unless it was actually run.

