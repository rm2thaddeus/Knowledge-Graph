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
- **Unified Dev Graph App (`apps/dev-graph`)**: Next.js front end presenting both CSV and Neo4j-backed experiences through dataset-aware routing and shared UI components.
- **Dev Graph API (`services/dev-graph-api`)**: FastAPI service providing ingestion, analytics, and query endpoints when a Neo4j database is active. The UI proxies through internal API routes to keep client code consistent.
- **Neo4j Cluster (local Docker-first)**: Hosts temporal graph databases; optional Qdrant integration remains available but disabled by default in local mode.

### Data Flow Adjustments
- Introduce an ingestion adaptor that accepts CSV uploads and converts them into Dev Graph ingestion manifests, enabling continuity for existing datasets and feeding multiple databases.
- Define a shared schema contract (`services/dev-graph-api/schema/knowledge_graph_adapter.py`) translating CSV node/edge shapes into Neo4j entities without losing metadata required for client rendering.
- Maintain in-memory CSV sessions for quick demos; users can promote sessions to Neo4j databases via a “Create database” flow that triggers the adaptor and refreshes the UI.

### Auth & Access Control (Future)
- Short term: local trusted usage (no auth).
- Mid term: API key or bearer token to protect ingestion endpoints.
- Long term: integrate with identity provider, enabling per-user workspaces and audit logging.

## Phased Rollout Plan

| Phase | Scope | Success Criteria |
| --- | --- | --- |
| 0. Code Landing | Bring Dev Graph Next.js + FastAPI code into repo; scaffold unified app shell alongside legacy Vite app. | `apps/dev-graph` boots in CSV mode; Docker-based Neo4j + API start successfully. |
| 1. Data Bridge | Build CSV → Dev Graph ingestion adaptor; expose command/script; document workflows. | Same CSV renders in-memory and can be promoted to a Neo4j-backed dataset selectable in the UI. |
| 2. Feature Parity & Navigation | Port legacy CSV canvas, controls, and exports into the unified app; add dataset switcher and navigation to analytics views. | Users can toggle between CSV/Neo4j datasets inside one UI; legacy Vite app marked deprecated. |
| 3. Operations Hardening | Publish runbooks, monitoring, backup strategy for Neo4j + API; integrate into CI/CD. | Operational readiness checklist complete; automated tests cover ingestion and rendering flows. |
| 4. Optimization & Refactor | Simplify design system, streamline ingestion UX, and expose multi-database management. | Shared component library, reduced duplication, stakeholder satisfaction metrics met. |

## Stakeholder Deliverables

1. **Architecture Update** (`docs/production-room/architecture.md` addendum)  
   - Combined system diagram (Unified Dev Graph App + Dev Graph API + Neo4j).  
   - Service responsibilities, data contracts, and deployment topology.
2. **Migration Roadmap** (executive summary + detailed Gantt in `docs/mvp-room`)  
   - Timeline with dependencies, resource estimates, and checkpoints.
3. **Operational Runbook** (`docs/production-room/operational-readiness.md` companion)  
   - Start/stop procedures, health checks, backup/restore steps, on-call playbook.
4. **Risk & Mitigation Register** (`docs/production-room/risk-log.md` new)  
   - Data integrity, dependency conflicts, performance regression risks, fallback plans.
5. **Adoption Metrics Plan** (`docs/production-room/metrics-plan.md` new)  
   - KPIs for stakeholder review (API uptime, ingestion throughput, percentage of sessions running in Neo4j mode vs. CSV mode).
6. **Change Management Packet**  
   - Communication brief for leadership, training plan for analysts, FAQ for support teams.

## Required Modifications Post-Merge

- **Unified Dev Graph App**: embed CSV canvas module, provide dataset selector, and harmonize styling across legacy components and Dev Graph dashboards.
- **Dev Graph API**: add endpoints for ad-hoc datasets (namespaced by user/session), expose simplified graph queries for CSV parity features, and document rate limits.
- **Tooling**: extend CI to run `npm run lint/build` for the unified Next.js app, `pytest` for backend, and container smoke tests; decommission Vite workflows once parity achieved.

## Dependencies & Risks

- **Infrastructure Footprint**: Neo4j requires persistent volume management; ensure OneDrive sync does not conflict with database directories.
- **Dependency Conflicts**: Tailwind vs. Chakra styling, TypeScript config alignment, and Python dependency versions must be reconciled before unified tooling.
- **Team Adoption**: Provide training for FastAPI + Neo4j development, and update AGENT/MCP rule hierarchies to reflect the integrated stack.
- **Performance Envelope**: WebGL dashboards rely on GPU resources; document fallback behavior when running on low-power hardware in CSV-only mode.

## Next Steps

1. Validate the target directory layout with maintainers.  
2. Author the ingestion adaptor design doc (owner: backend).  
3. Prototype dataset selector and CSV→Neo4j promotion flow; gather UX feedback.  
4. Draft operational runbook skeletons so stakeholders can review early.  
5. Schedule stakeholder review workshop once Phase 0 completes and legacy UI deprecation timeline is clear.

## Stakeholder Considerations

- **Exploration Users** (career mapping, CSV demos): need instant load workflow, guard against forced Neo4j setup; provide quick-start guide and sample CSV catalog.
- **Analysts & Engineers** (Dev Graph power users): require persistent datasets, analytics dashboards, and reproducible ingestion scripts; deliver CLI templates and dataset promotion instructions.
- **Operations & Support**: need monitoring dashboards (Neo4j health, ingestion queue), incident triage playbooks, and backup/restore procedures documented in `docs/production-room`.
- **Leadership & Stakeholders**: expect progress visibility; publish migration status updates, risk heatmap, and adoption metrics at each phase milestone.

## Testing & Validation Plan

- **Frontend**: e2e flows for CSV upload, dataset promotion, dataset switching, and analytics navigation using Playwright or Cypress.
- **Backend**: pytest suites covering ingestion adaptor, dataset metadata endpoints, and Neo4j interaction with multiple databases.
- **Integration**: nightly Docker compose smoke test launching full stack, loading sample CSV, promoting to Neo4j, and verifying dashboards render.
- **Performance**: benchmark large CSV ingestion vs. Neo4j queries; track frame rate on WebGL dashboards with adaptive throttling for local devices.

## Communication Plan

- Bi-weekly integration updates shared via `docs/production-room/progress-log.md`.
- Stakeholder review workshop after Phase 1 to confirm dataset promotion experience meets expectations.
- Release notes accompanying each phase completion summarizing new capabilities, operational changes, and next priorities.

