# App-Level Agent Guide

> The directives below refine the root instructions in line with the multi-scope model described in *AGENTS.md & Agent-Native Development (2025)*. Follow them for any work executed inside `app/`.

## Project Setup
- Always run commands from the `app/` directory.
- Install dependencies with `npm install` before running other scripts.
- Use Node.js 18+; surface compatibility issues if `npm run lint` or `npm run build` fail due to tooling versions.

## Key Scripts
- `npm run dev` — start the Vite dev server for interactive checks. Stop the server before running build/lint tasks in CI scripts.
- `npm run lint` — required before commits; auto-fix only with `npm run lint -- --fix` when changes are reviewed afterwards.
- `npm run build` — validates TypeScript and bundler output; required before marking tasks as complete.
- `npm run preview` — optional smoke test of production bundle; mention in PR notes if used to verify fixes.

## Frontend Conventions
- Maintain strict TypeScript typings and leverage shared interfaces from `src/utils/dataLoader.ts` instead of redefining shapes.
- Prefer functional React components with hooks (`useState`, `useEffect`, etc.) and colocate UI-specific state within components.
- Keep styles in Tailwind utility classes or `index.css`; avoid inline styles unless dynamic.
- For accessibility, provide aria labels or visually hidden text for icon-only buttons from `lucide-react`.

## Data & CSV Handling
- CSV demo utilities and debugging HTML files reside in `public/`. When changing upload flows, update the matching guides (`README_CSV.md`, `README_YOUR_DATA.md`).
- Validate CSV parsing with `public/test_csv_upload.html` when adjusting `dataLoader` logic and record findings in PRs.

## Testing Expectations
Before completion of any feature/bugfix:
1. `npm run lint`
2. `npm run build`
3. Manual smoke test via `npm run dev` if UI behavior changes (document scenarios exercised).

## File Boundaries
- Do not edit `node_modules` or generated build outputs (`dist/`).
- Keep configuration files (`vite.config.ts`, Tailwind, ESLint, TypeScript configs) synchronized if options overlap.

## Pull Requests
- Summaries should explain how UI, data loading, and configuration were affected.
- Include screenshots or screen recordings for visual tweaks (reference the relevant `public` debugging harness when applicable).
- Note any follow-up work needed to regenerate demo CSVs or docs.
