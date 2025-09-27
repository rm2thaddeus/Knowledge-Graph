# Components Agent Guide

> These instructions override `app/src/AGENTS.md` for UI components, reflecting the nested guidance model advocated in *AGENTS.md & Agent-Native Development (2025)*.

## Scope
Applies to React components under `app/src/components/`, including `KnowledgeGraph.tsx` and any future component modules.

## Coding Standards
- Keep components pure and declarative; side-effects (event listeners, timers) belong inside `useEffect` with proper cleanup.
- Split monolithic components when they exceed ~300 lines or manage unrelated concerns (rendering vs. simulation vs. settings panes).
- Define prop types with explicit interfaces. Export them when used by multiple consumers.
- Prefer descriptive component names that reflect rendered UI behavior.

## Canvas & Graph Rendering
- Encapsulate canvas drawing operations; store refs with `useRef` and guard DOM access behind effect hooks.
- Document performance-sensitive code (animation loops, physics) with inline comments for future tuning.
- Avoid magic numbers; create named constants for physics parameters and UI layout offsets.
- When modifying interactions (zoom, drag, highlighting), test with keyboard and mouse to ensure no regressions.

## State Management
- Keep derived state memoized to avoid unnecessary re-renders. For large graph datasets, consider virtualization strategies before increasing complexity.
- Use React state setters immutably and avoid mutating objects stored in refs unless necessary for performance (document such exceptions).

## Testing & Verification
- After changes, run `npm run lint` and `npm run build` from `app/`.
- Manually verify graph interactions using `npm run dev` with both the hard-coded starter data and sample CSV uploads from `public/`.
- Update documentation (tooltips, instructions) if UI controls change.

## Accessibility & UX
- Provide keyboard shortcuts only when accompanied by on-screen help.
- Ensure focus outlines remain visible. Do not disable outlines unless you replace them with an accessible alternative.
- Use color palettes that satisfy WCAG contrast ratios; document rationale for new colors.
