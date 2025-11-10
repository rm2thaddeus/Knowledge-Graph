# Dev Graph Integration Strategy

- Author: GPT-5 Codex
- Date: 2025-11-10
- Phase: Production
- Status: Proposed

## Objective
Unify the existing Knowledge-Graph explorer with the Pixel Detective Dev Graph stack so the organization can:
- Run both visualization experiences within a single repository.
- Reuse Dev Graph’s ingestion, analytics, and Neo4j persistence for long-lived graph data.
- Preserve CSV-first experimentation while gradually adopting automated ingestion.

## Interaction Model

### Core Services
- **Dev Graph API (`services/dev-graph-api`)** remains the source of truth, exposing temporal graph, analytics, and ingestion endpoints over FastAPI.
- **Explorer App (`apps/explorer`)** continues to provide CSV-based visualization but gains optional API-backed modes:
  - `CSV Mode`: local-only, matches current behavior.
  - `Graph Mode`: fetches subgraph/timeline data from Dev Graph API.
- **Dev Graph UI (`apps/dev-graph-ui`)** operates as the advanced analytics front end. It consumes the same API and shares authentication/session context with Explorer when available.

### Data Flow Adjustments
- Introduce an ingestion adaptor that accepts CSV uploads and converts them into Dev Graph ingestion manifests, enabling continuity for existing datasets.
- Define a shared schema contract (`services/dev-graph-api/schema/knowledge_graph_adapter.py`) translating Explorer node/edge shapes into Neo4j entities.
- Leverage Neo4j as persistent storage for both apps; Explorer caches live results client-side but can request stored graphs by profile identifier.

### Auth & Access Control (Future)
- Short term: local trusted usage (no auth).
- Mid term: API key or bearer token to protect ingestion endpoints.
- Long term: integrate with identity provider, enabling per-user workspaces and audit logging.

## Phased Rollout Plan

| Phase | Scope | Success Criteria |
| --- | --- | --- |
| 0. Code Landing | Bring Dev Graph code into repo, compile both apps independently, document setup. | Both UIs run locally; Docker-based Neo4j + API start successfully. |
| 1. Data Bridge | Build CSV → Dev Graph ingestion adaptor; expose command/script; document workflows. | Same CSV renders in Explorer (legacy) and via API-backed Explorer mode. |
| 2. Unified Navigation | Add top-level launcher shell (e.g., `/portal`) linking Explorer and Dev Graph UI; share theme and session state. | Single sign-on entry point; consistent branding and navigation between apps. |
| 3. Operations Hardening | Publish runbooks, monitoring, backup strategy for Neo4j + API; integrate into CI/CD. | Operational readiness checklist complete; automated tests cover ingestion and rendering flows. |
| 4. Optimization & Refactor | Modify Dev Graph visualizations to incorporate Knowledge-Graph use cases (career mapping) and retire redundant components. | Shared component library, reduced duplication, stakeholder satisfaction metrics met. |

## Stakeholder Deliverables

1. **Architecture Update** (`docs/production-room/architecture.md` addendum)  
   - Combined system diagram (Explorer + Dev Graph API + Neo4j).  
   - Service responsibilities, data contracts, and deployment topology.
2. **Migration Roadmap** (executive summary + detailed Gantt in `docs/mvp-room`)  
   - Timeline with dependencies, resource estimates, and checkpoints.
3. **Operational Runbook** (`docs/production-room/operational-readiness.md` companion)  
   - Start/stop procedures, health checks, backup/restore steps, on-call playbook.
4. **Risk & Mitigation Register** (`docs/production-room/risk-log.md` new)  
   - Data integrity, dependency conflicts, performance regression risks, fallback plans.
5. **Adoption Metrics Plan** (`docs/production-room/metrics-plan.md` new)  
   - KPIs for stakeholder review (API uptime, ingestion throughput, user engagement with both UIs).
6. **Change Management Packet**  
   - Communication brief for leadership, training plan for analysts, FAQ for support teams.

## Required Modifications Post-Merge

- **Dev Graph UI**: simplify navigation for Knowledge-Graph personas (career mapping views, CSV import triggers) and align visual branding with Explorer.
- **Dev Graph API**: add endpoints for ad-hoc datasets (namespaced by user/session), expose simplified graph queries for Explorer, and document rate limits.
- **Explorer App**: abstract data sources (CSV vs. API), add authentication hooks, and create shared component library for graph legends, controls, and export features.
- **Tooling**: extend CI to run `npm run lint/build` for both React apps, `pytest` for backend, and container smoke tests.

## Dependencies & Risks

- **Infrastructure Footprint**: Neo4j requires persistent volume management; ensure OneDrive sync does not conflict with database directories.
- **Dependency Conflicts**: Tailwind vs. Chakra styling, differing TypeScript configs, and Python dependency versions must be reconciled before unified tooling.
- **Team Adoption**: Provide training for FastAPI + Neo4j development, and update AGENT/MCP rule hierarchies to reflect the integrated stack.

## Next Steps

1. Validate the target directory layout with maintainers.  
2. Author the ingestion adaptor design doc (owner: backend).  
3. Prototype shared navigation shell; gather UX feedback.  
4. Draft operational runbook skeletons so stakeholders can review early.  
5. Schedule stakeholder review workshop once Phase 0 completes.

