# Dev Graph Migration Blueprint

- Author: GPT-5 Codex
- Date: 2025-11-10
- Phase: MVP
- Status: Draft

## Target Repository Layout

```
Knowledge-Graph/
├── apps/
│   ├── explorer/                 # existing Vite React app moved from `app/`
│   └── dev-graph-ui/             # Next.js UI migrated from Pixel Detective
├── services/
│   └── dev-graph-api/            # FastAPI backend (`developer_graph`)
├── infrastructure/
│   ├── neo4j/                    # database configs, import scripts
│   └── docker/                   # compose bundles & env files
├── scripts/                      # orchestrators (merged start_* scripts)
├── docs/                         # existing documentation, plus migration notes
└── tooling/
    ├── mcp-rules/                # consolidated `.cursor/rules`
    └── shared-config/            # lint/tsconfig/pytest shared assets
```

> **Transition Strategy**: keep current `app/` in place initially; introduce `apps/` alongside it. Once migration stabilizes, relocate legacy code into `apps/explorer/` with symlinks or staged moves to avoid breaking Git history.

## Directory Mapping

- `Pixel_Detective/tools/dev-graph-ui` ➜ `apps/dev-graph-ui`
  - Preserve `.next` out of repo.
  - Merge Tailwind configs with explorer app via `tooling/shared-config/tailwind`.
  - Relocate environment docs into `apps/dev-graph-ui/README.md` (updated for new root paths).
- `Pixel_Detective/developer_graph` ➜ `services/dev-graph-api`
  - Convert PowerShell start scripts into consolidated `scripts/dev-graph-api.ps1`.
  - Move `routes/AGENTS.md` and other nested guides under new path, updating relative references.
- `Pixel_Detective/database` ➜ `infrastructure/neo4j`
  - Include seed CSVs, Cypher migrations, and config templates.
- `Pixel_Detective/docker-compose.yml` ➜ `infrastructure/docker/dev-graph-stack.compose.yml`
  - Compose file will orchestrate Neo4j, optional Qdrant, API, and UI containers.
- Shared automation (`start_dev_graph.ps1`, `start_pixel_detective.ps1`, `start_backend.ps1`) ➜ rationalized into `scripts/`.
- `.cursor/rules/*.mdc` ➜ merge into `tooling/mcp-rules/` while retaining Knowledge-Graph `AGENTS.md` hierarchy.

## JavaScript/TypeScript Dependency Alignment

- Align on **Node.js 20 LTS** (covers Vite + Next.js requirements).
- Introduce `package.json` workspaces:
  - Root `package.json` managing shared devDependencies (`eslint`, `typescript`, `tailwindcss`).
  - `apps/explorer/package.json` retains Vite-specific scripts.
  - `apps/dev-graph-ui/package.json` keeps Next.js scripts (`dev`, `build`, `lint`).
- Resolve overlapping libraries:
  - Tailwind config: extract shared base, allow per-app extensions.
  - ESLint/TS configs: place in `tooling/shared-config` and extend within each app.
  - Icon libraries (`lucide-react` vs. Chakra icons): keep both initially; note eventual convergence.

## Python/Backend Dependency Alignment

- Create `services/dev-graph-api/requirements.in` + compiled `requirements.txt` to document versions.
- Set Python runtime to 3.11 (compatible with Neo4j drivers + FastAPI stack).
- Introduce `.env.example` consolidating Neo4j URI, credentials, ingestion paths, OpenAI/embedding providers (if applicable).
- Document `poetry` vs. `pip` decision (default to pip + requirements for parity with original repo).

## Configuration & Environment Updates

- Root `.gitignore` updates:
  - Exclude `.next/`, `.venv/`, `.mypy_cache/`, `neo4j/data/`, `qdrant/snapshots/`.
- Add `.env.example` files per app/service:
  - `apps/dev-graph-ui/.env.local.example` with `NEXT_PUBLIC_DEV_GRAPH_API_URL`.
  - `services/dev-graph-api/.env.example` listing `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`, ingestion toggles.
- Centralize start scripts:
  - `scripts/start-dev-graph.ps1` orchestrating Docker (Neo4j) + API + UI.
  - `scripts/start-explorer.ps1` for legacy app.
- Docker Compose:
  - Provide profiles for `dev-graph-api`, `neo4j`, `qdrant` to allow partial starts.
  - Use shared `.env.docker` for credentials.

## Documentation & Rule Integration

- Mirror Pixel Detective `.cursor/rules` into `tooling/mcp-rules/` and cross-link from root `AGENTS.md`.
- Update `docs/templates` to include new sprint/PRD templates referencing Dev Graph stack.
- Add migration notes to `docs/production-room` covering new services and monitoring requirements.

## Open Questions

- Whether to migrate Knowledge-Graph explorer into the Dev Graph API (shared data) or keep separate ingestion flows.
- Strategy for Neo4j hosting (local container vs. managed service) and integration with existing CSV workflow.
- Timeline for merging Tailwind + Chakra design systems or keeping them isolated per app.

