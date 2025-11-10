# Dev Graph Migration Blueprint

- Author: GPT-5 Codex
- Date: 2025-11-10
- Phase: MVP
- Status: Draft

## Target Repository Layout

```
Knowledge-Graph/
├── apps/
│   └── dev-graph/                # Unified Next.js application (CSV + Neo4j modes)
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

> **Transition Strategy**: stage the Next.js app under `apps/dev-graph` while the current Vite `app/` continues to ship demos. Incrementally port CSV visualization modules into the Next.js codebase; once feature parity is achieved, retire the Vite app and update launch scripts.

## Directory Mapping

- `Pixel_Detective/tools/dev-graph-ui` ➜ `apps/dev-graph`
  - Preserve `.next` out of repo.
  - Reorganize routes: `/datasets/csv` for CSV explorer, `/datasets/neo4j` for database-backed views, `/analytics/*` for existing Dev Graph dashboards.
  - Import Knowledge-Graph Canvas components into `apps/dev-graph/src/features/csv-explorer/`.
- `Pixel_Detective/developer_graph` ➜ `services/dev-graph-api`
  - Convert PowerShell start scripts into consolidated `scripts/dev-graph-api.ps1`.
  - Move `routes/AGENTS.md` and other nested guides under new path, updating relative references.
- `Pixel_Detective/database` ➜ `infrastructure/neo4j`
  - Include seed CSVs, Cypher migrations, and config templates.
- `Pixel_Detective/docker-compose.yml` ➜ `infrastructure/docker/dev-graph-stack.compose.yml`
  - Compose file will orchestrate Neo4j, optional Qdrant, API, and UI containers.
- Shared automation (`start_dev_graph.ps1`, `start_pixel_detective.ps1`, `start_backend.ps1`) ➜ rationalized into `scripts/`.
- Existing Vite `app/` ➜ archived under `archive/vite-csv-explorer` (until removal) to preserve history while preventing duplicate UIs.
- `.cursor/rules/*.mdc` ➜ merge into `tooling/mcp-rules/` while retaining Knowledge-Graph `AGENTS.md` hierarchy.

## JavaScript/TypeScript Dependency Alignment

- Align on **Node.js 20 LTS** for the monorepo.
- Introduce root-level `package.json` workspace managing shared devDependencies (`eslint`, `typescript`, `tailwindcss`, `@tanstack/react-query`).
- `apps/dev-graph/package.json` handles Next.js scripts (`dev`, `build`, `lint`, `start`); remove Vite-specific tooling post-migration.
- Resolve overlapping libraries:
  - Tailwind config: shared base in `tooling/shared-config/tailwind`, with CSV-specific themes merged into Chakra styling via design tokens.
  - ESLint/TS configs: extend from `tooling/shared-config/eslint-config` and `tsconfig.base.json`.
  - Icon libraries: consolidate on `lucide-react` for CSV features and map Dev Graph Chakra components to use shared icon adapters.
- Add shared UI package `packages/graph-ui-kit/` when common components (toolbars, legends, dataset selectors) emerge during consolidation.

## Python/Backend Dependency Alignment

- Create `services/dev-graph-api/requirements.in` + compiled `requirements.txt` to document versions.
- Set Python runtime to 3.11 (compatible with Neo4j drivers + FastAPI stack).
- Introduce `.env.example` consolidating Neo4j URI, credentials, ingestion paths, OpenAI/embedding providers (if applicable).
- Document `poetry` vs. `pip` decision (default to pip + requirements for parity with original repo).

## Configuration & Environment Updates

- Root `.gitignore` updates:
  - Exclude `.next/`, `.venv/`, `.mypy_cache/`, `neo4j/data/`, `qdrant/snapshots/`.
- Add `.env.example` files per app/service:
  - `apps/dev-graph/.env.local.example` with `NEXT_PUBLIC_DEV_GRAPH_API_URL` and `NEXT_PUBLIC_DEFAULT_DATA_MODE`.
  - `services/dev-graph-api/.env.example` listing `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`, ingestion toggles.
- Centralize start scripts:
  - `scripts/start-dev-graph.ps1` orchestrating Docker (Neo4j) + API + unified UI (with `--mode csv` fallback if Neo4j disabled).
  - `scripts/start-legacy-vite.ps1` retained temporarily for regression testing.
- Docker Compose:
  - Provide profiles for `dev-graph-api`, `neo4j`, `qdrant` to allow partial starts.
  - Use shared `.env.docker` for credentials.

## Documentation & Rule Integration

- Mirror Pixel Detective `.cursor/rules` into `tooling/mcp-rules/` and cross-link from root `AGENTS.md`.
- Update `docs/templates` to include new sprint/PRD templates referencing Dev Graph stack.
- Add migration notes to `docs/production-room` covering new services and monitoring requirements.

## Implementation Checklist (MVP Scope)

1. **Bootstrap Unified App**
   - [ ] Copy Next.js app into `apps/dev-graph`.
   - [ ] Add CSV demo route that reuses existing canvas component via a shim.
   - [ ] Wire environment variables and workspace scripts.
2. **Port CSV Features**
   - [ ] Migrate `KnowledgeGraph.tsx` and utilities into `apps/dev-graph/src/features/csv-explorer`.
   - [ ] Replace Vite-specific imports (e.g., CSS) with Next.js equivalents.
   - [ ] Validate CSV upload/export inside Next.js runtime.
3. **Enable Dataset Switching**
   - [ ] Create dataset context + selector (CSV session vs. Neo4j database).
   - [ ] Implement `POST /api/internal/datasets/promote` calling FastAPI ingestion adaptor.
   - [ ] Persist dataset metadata in Neo4j (or local JSON when offline).
4. **Retire Legacy App**
   - [ ] Update root README/start scripts to point to unified app.
   - [ ] Archive Vite app and remove from workspace dependencies.
   - [ ] Run lint/build/test pipelines to confirm parity.

## Open Questions

- Confirm deprecation timeline for the legacy Vite app once CSV parity is reached in Next.js.
- Strategy for Neo4j hosting (local container vs. managed service) and integration with existing CSV workflow.
- Finalize design system convergence (Tailwind utility classes vs. Chakra theme tokens) for the unified UI.

