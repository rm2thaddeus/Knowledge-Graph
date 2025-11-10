# Dev Graph Comparative Inventory

- Author: GPT-5 Codex
- Date: 2025-11-10
- Phase: PoC
- Status: In Progress

## Knowledge-Graph Baseline

### Structure
- `app/` – Vite React frontend with monolithic `KnowledgeGraph.tsx`, CSV utilities in `src/utils/`, Tailwind config, and minimal build tooling (`vite`, `eslint`, `tsconfig`).
- `docs/` – Planning folders (`ideation-room`, `mvp-room`, `poc-room`, `production-room`, `templates`) plus agent guides; no backend or infrastructure assets.
- No backend/services directories; data flows entirely through client-side CSV uploads.

### Technology & Capabilities
- React 19 + TypeScript running on Vite; Tailwind for styling, lucide icons for UI.
- Canvas-based force/radial/timeline renderer with CSV ingestion (`parseCSVContent`, `buildGraphFromCSV`).
- Local-only workflow: graphs persist in memory, exports as JSON; no API, database, or auth.
- Existing docs frame the product as an alpha job-search explorer with CSV-based knowledge graphs.

### Agent & Rule Coverage
- `AGENTS.md` hierarchy under repository root, `app/`, `app/src/`, `components/`, `utils/`, and docs rooms. Guidance focuses on React purity, CSV parsing discipline, and documentation metadata.
- No `.cursor/rules` directory; relies on nested `AGENTS.md` for expectations.

## Pixel Detective Dev Graph Reference

### Structure
- `tools/dev-graph-ui/` – Next.js 15 app with WebGL/SVG visualizations (`src/components/WebGLEvolutionGraph.tsx`, timeline pages, hooks) and Tailwind/Chakra setup.
- `developer_graph/` – FastAPI backend (`api.py`, `routes/*`) with ingestion services (`chunk_ingestion.py`, `temporal_engine.py`, `parallel_ingestion.py`), schema modules, and comprehensive architecture docs.
- `database/`, `docker-compose.yml`, `scripts/`, and start scripts orchestrating Neo4j + API + UI; shared utilities (`utils/`, `config.py`).
- `.cursor/rules/*.mdc` – extensive rule set covering debugging, sprint planning, MCP usage, FastAPI, React, and PowerShell conventions.

### Technology & Capabilities
- Frontend: Next.js 15, React 18, Graphology/WebGL for high-volume rendering, Chakra UI overlays, API integration via `NEXT_PUBLIC_DEV_GRAPH_API_URL`.
- Backend: FastAPI 0.110, Neo4j 5.x temporal graph, ingest pipelines (unified/optimized/unlimited), sprint analytics, search endpoints, embedding service hooks.
- DevOps: Docker Compose for Neo4j/Qdrant, PowerShell start scripts, requirements.txt for Python services, Node 18+ prerequisites.
- Documentation includes detailed architecture breakdowns, performance audits, ingestion playbooks, and troubleshooting notes.

### Agent & Rule Coverage
- `developer_graph/AGENTS.md` and `routes/AGENTS.md` enforce API design, logging, ingestion safety.
- `.cursor/rules` auto-route work via smart entry points, highlight sprint planning, MCP server usage, debugging, feature implementation workflows, and PowerShell syntax requirements.
- Frontend `tools/dev-graph-ui/AGENTS.md` specifies Next.js component patterns, WebGL lifecycle management, and performance instrumentation.

## Key Gaps & Considerations

- **Platform Depth**: Knowledge-Graph is a single-page client explorer; Dev Graph is a full stack (Next.js + FastAPI + Neo4j). Migration introduces backend services, databases, and orchestration absent today.
- **Data Flow**: Current app ingests CSV on the client; Dev Graph assumes Git/Docs ingestion pipelines, Neo4j persistence, and REST endpoints. Aligning requires deciding on ingestion strategy (retain CSV, adopt pipelines, or hybrid).
- **Tech Stack Alignment**: React/Vite vs. Next.js; no direct routing or SSR in Knowledge-Graph. Need coexistence plan (parallel apps vs. consolidation) and dependency reconciliation (Tailwind + Chakra, distinct build tools).
- **Operational Surface**: Knowledge-Graph lacks infrastructure docs; Dev Graph brings Docker, scripts, and ops practices. Integrating demands new production runbooks, environment variables, and service management protocols.
- **Governance**: Dev Graph’s rule system (MCP, sprint workflows) is richer than the current project. Harmonization should decide how `.cursor/rules` interoperate with existing `AGENTS.md` hierarchy.


