# Source Directory Agent Guide

> These rules specialize the repository-wide instructions for TypeScript source code, consistent with the hierarchical pattern described in *AGENTS.md & Agent-Native Development (2025)*.

## Architectural Notes
- `App.tsx` is the single entry point; all routes/components should be imported through this file to keep bootstrapping explicit.
- Visualization logic resides in `components/KnowledgeGraph.tsx`; utility code (CSV parsing, graph transforms) belongs in `utils/`.
- Maintain separation of concerns: React components manage presentation and state orchestration; data shaping belongs to utilities.

## TypeScript & React Standards
- Enable strict typing: prefer explicit interfaces/types for props and state. Avoid using `any` except where unavoidable; document rationale inline.
- Memoize expensive computations (e.g., layout calculations) with `useMemo`/`useCallback` and guard canvas updates with `useEffect` dependency arrays.
- Keep state immutable; clone objects/arrays before mutation. When modifying graph data, use derived state to avoid in-place edits.
- Leverage descriptive component/file names. Co-locate unit helpers alongside components only when they are purely presentational.

## Styling & UI
- Favor Tailwind utility classes via `index.css` or component-level class strings. Add comments when introducing custom CSS.
- Provide keyboard-accessible interactions (e.g., handle `Enter`/`Space` for buttons beyond default `<button>` elements).
- Use icons from `lucide-react` sparingly and always include accompanying text or `aria-label` attributes.

## Testing & Validation
- After changes in this directory, ensure `npm run lint` and `npm run build` still pass from the `app/` root.
- For data-flow or layout modifications, exercise the CSV debugging harnesses in `public/` and note observed behavior.

## Documentation Expectations
- Update inline comments to explain non-obvious simulation parameters (force layout constants, heuristics, etc.).
- When new types or utilities are introduced, extend relevant markdown files (`public/README_CSV.md`, project README) to explain data formats.
