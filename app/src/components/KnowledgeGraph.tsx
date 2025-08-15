import React, { useEffect, useRef, useState, useMemo } from "react";
import { 
  Sparkles, Play, Pause, FileText, X, Search, 
  Download, Info, ZoomIn, ZoomOut, RotateCcw, FolderOpen
} from "lucide-react";
import { buildGraphFromCSV, parseCSVContent } from '../utils/dataLoader';
import type { GraphData, GraphNode, GraphLink } from '../utils/dataLoader';

// Node type metadata - updated to match your data
const TYPE_META = {
  Person: { color: "#2563eb", shape: "circle" },
  Company: { color: "#0ea5e9", shape: "rounded" },
  Role: { color: "#22c55e", shape: "diamond" },
  Project: { color: "#a855f7", shape: "hex" },
  Skill: { color: "#f59e0b", shape: "pill" },
  Publication: { color: "#ef4444", shape: "square" },
  Award: { color: "#eab308", shape: "star" },
  Language: { color: "#64748b", shape: "circle" },
  Trait: { color: "#14b8a6", shape: "ring" },
  Education: { color: "#8b5cf6", shape: "triangle" },
  Certification: { color: "#06b6d4", shape: "cross" },
  Event: { color: "#f97316", shape: "diamond" },
  Account: { color: "#84cc16", shape: "square" },
  Profile: { color: "#ec4899", shape: "hex" },
  Location: { color: "#10b981", shape: "circle" },
  Institution: { color: "#6366f1", shape: "rounded" },
  Writing_Sample: { color: "#f59e0b", shape: "pill" }
};

const NODE_TYPES = Object.keys(TYPE_META);

// Enhanced starter data with more realistic content
// NOTE: This is the default hardcoded data that shows when no CSV files are loaded
// To load your own data, use the "Upload CSV" button in the top bar
const starterData: GraphData = {
  nodes: [
    {
      id: "Person1",
      label: "Aitor Patiño Díaz",
      type: "Person",
      confidence: "High",
      traits: { Openness: 0.9, Conscientiousness: 0.7, Agreeableness: 0.85, Extraversion: 0.7, Stability: 0.8 },
      provenance: "Identity & cross-platform match",
      accounts: 9
    },
    { id: "Org1", label: "Merck Life Science (Molsheim)", type: "Company", provenance: "CV (2022–2025)" },
    { id: "Org2", label: "University of Trento (UNITN)", type: "Company" },
    { id: "Org3", label: "University of Rome Tor Vergata", type: "Company" },
    { id: "Role1", label: "Business Intelligence Consultant – Filtration", type: "Role", start: "2022-06", end: "2025-04", provenance: "CV" },
    { id: "Role2", label: "Postdoc – ACDC EU Project", type: "Role", start: "2021-06", end: "2022-06" },
    { id: "Role3", label: "MSCA ESR – DNA Robotics", type: "Role", start: "2018-01", end: "2021-12" },
    { id: "Proj3", label: "Cortexus (GPT Assistant)", type: "Project" },
    { id: "Proj8", label: "SFDC Tagger (GPT Assistant)", type: "Project" },
    { id: "Proj10", label: "Pixel Detective (AI Project)", type: "Project" },
    { id: "SkillPE", label: "Prompt Engineering", type: "Skill" },
    { id: "SkillFoundry", label: "Palantir Foundry", type: "Skill" },
    { id: "SkillDOE", label: "Design of Experiments (DoE)", type: "Skill" },
    { id: "SkillOpt", label: "Algorithmic Optimization", type: "Skill" },
    { id: "SkillDNA", label: "DNA/RNA Nanotechnology", type: "Skill" },
    { id: "Pub2", label: "Cell-Free Switches for Antibody Detection (JACS 2022)", type: "Publication" },
    { id: "Award1", label: "ALIFE 2021 Essay – 1st Prize + Community Award", type: "Award" },
    { id: "Lang1", label: "English (C2)", type: "Language" },
    { id: "Lang2", label: "Spanish (C2)", type: "Language" },
    { id: "Lang3", label: "French (C2)", type: "Language" },
    { id: "Lang4", label: "Italian (B2)", type: "Language" },
    { id: "Trait_Openness", label: "Openness 0.90", type: "Trait", score: 0.9 },
    { id: "Trait_Conscientiousness", label: "Conscientiousness 0.70", type: "Trait", score: 0.7 },
    { id: "Trait_Agreeableness", label: "Agreeableness 0.85", type: "Trait", score: 0.85 },
    { id: "Trait_Extraversion", label: "Extraversion 0.70", type: "Trait", score: 0.7 },
    { id: "Trait_Stability", label: "Emotional Stability 0.80", type: "Trait", score: 0.8 }
  ],
  links: [
    { source: "Person1", target: "Role1", relation: "holds_role" },
    { source: "Person1", target: "Role2", relation: "holds_role" },
    { source: "Person1", target: "Role3", relation: "holds_role" },
    { source: "Role1", target: "Org1", relation: "at_company" },
    { source: "Role2", target: "Org2", relation: "at_company" },
    { source: "Role3", target: "Org3", relation: "at_company" },
    { source: "Person1", target: "Proj3", relation: "built" },
    { source: "Person1", target: "Proj8", relation: "built" },
    { source: "Person1", target: "Proj10", relation: "built" },
    { source: "Person1", target: "SkillPE", relation: "has_skill" },
    { source: "Person1", target: "SkillFoundry", relation: "has_skill" },
    { source: "Person1", target: "SkillDOE", relation: "has_skill" },
    { source: "Person1", target: "SkillOpt", relation: "has_skill" },
    { source: "Person1", target: "SkillDNA", relation: "has_skill" },
    { source: "Person1", target: "Pub2", relation: "authored" },
    { source: "Person1", target: "Award1", relation: "won" },
    { source: "Person1", target: "Lang1", relation: "speaks" },
    { source: "Person1", target: "Lang2", relation: "speaks" },
    { source: "Person1", target: "Lang3", relation: "speaks" },
    { source: "Person1", target: "Lang4", relation: "speaks" },
         { source: "Person1", target: "Trait_Openness", relation: "has_trait" },
     { source: "Person1", target: "Trait_Conscientiousness", relation: "has_trait" },
     { source: "Person1", target: "Trait_Agreeableness", relation: "has_trait" },
     { source: "Person1", target: "Trait_Extraversion", relation: "has_trait" },
     { source: "Person1", target: "Trait_Stability", relation: "has_trait" }
  ]
};

// Utility functions
const year = (s: string | undefined) => (s ? parseInt(String(s).slice(0, 4)) : undefined);

function shortestPath(graph: GraphData, startId: string, endId: string): string[] {
  if (startId === endId) return [startId];
  const adj = new Map<string, string[]>();
  (graph.links || []).forEach(({ source, target }) => {
    const s = source;
    const t = target;
    if (!adj.has(s)) adj.set(s, []);
    if (!adj.has(t)) adj.set(t, []);
    adj.get(s)!.push(t);
    adj.get(t)!.push(s);
  });
  const q = [startId];
  const prev = new Map<string, string | null>([[startId, null]]);
  while (q.length) {
    const u = q.shift()!;
    for (const v of adj.get(u) || []) {
      if (!prev.has(v)) {
        prev.set(v, u);
        q.push(v);
        if (v === endId) {
          const path = [v];
          let cur = v;
          while (prev.get(cur) !== null) { 
            cur = prev.get(cur)!; 
            path.push(cur); 
          }
          return path.reverse();
        }
      }
    }
  }
  return [];
}



// Physics simulation
function initPositions(nodes: any[]) {
  const spread = 800; // Increased from 220 to spread nodes much further apart
  nodes.forEach((n) => {
    if (typeof n.x !== "number") n.x = (Math.random() - 0.5) * spread;
    if (typeof n.y !== "number") n.y = (Math.random() - 0.5) * spread;
    n.vx = 0; n.vy = 0; n.fx = undefined; n.fy = undefined;
  });
}

function tickPhysics(nodes: any[], links: any[], cfg: any = {}) {
  const { charge = -800, linkDistance = 120, linkStrength = 0.02, center = 0.008, damping = 0.9, maxSpeed = 5 } = cfg; // Increased repulsion and link distance
  
  // Repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y;
      let d2 = dx * dx + dy * dy || 0.01;
      const f = charge / d2;
      const fx = f * dx, fy = f * dy;
      if (!a.fx) { a.vx += fx; a.vy += fy; }
      if (!b.fx) { b.vx -= fx; b.vy -= fy; }
    }
  }
  
  // Springs
  for (const l of links) {
    const s = typeof l.source === "object" ? l.source : nodes.find((n) => n.id === l.source);
    const t = typeof l.target === "object" ? l.target : nodes.find((n) => n.id === l.target);
    if (!s || !t) continue;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 0.01;
    const diff = dist - linkDistance;
    const f = linkStrength * diff;
    const fx = (dx / dist) * f, fy = (dy / dist) * f;
    if (!s.fx) { s.vx += fx; s.vy += fy; }
    if (!t.fx) { t.vx -= fx; t.vy -= fy; }
  }
  
  // Centering & integrate
  for (const n of nodes) {
    if (!n.fx) { n.vx += -n.x * center; n.vy += -n.y * center; }
    if (n.fx) { n.x = n.fx; n.y = n.fy; continue; }
    n.vx *= damping; n.vy *= damping;
    const spd = Math.hypot(n.vx, n.vy);
    if (spd > maxSpeed) { n.vx = (n.vx / spd) * maxSpeed; n.vy = (n.vy / spd) * maxSpeed; }
    n.x += n.vx; n.y += n.vy;
  }
}

// Layout helpers
function applyRadialByType(nodes: any[]) {
  const groups = new Map<string, any[]>();
  nodes.forEach((n) => { 
    const t = n.type || "Unknown"; 
    if (!groups.has(t)) groups.set(t, []); 
    groups.get(t)!.push(n); 
  });
  const types = Array.from(groups.keys());
  const baseR = 140; 
  const ringGap = 90;
  types.forEach((t, ringIdx) => {
    const ring = groups.get(t)!;
    const R = baseR + ringIdx * ringGap;
    const step = (Math.PI * 2) / Math.max(1, ring.length);
    for (let i = 0; i < ring.length; i++) {
      const a = i * step;
      ring[i].fx = R * Math.cos(a);
      ring[i].fy = R * Math.sin(a);
    }
  });
}

function applyTimeline(nodes: any[]) {
  let minY = Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const sy = year(n.start); 
    const ey = year(n.end); 
    const yv = (sy ?? ey ?? 2016);
    minY = Math.min(minY, yv); 
    maxY = Math.max(maxY, yv);
  }
  if (!isFinite(minY) || !isFinite(maxY) || minY === maxY) { 
    minY = 2015; 
    maxY = 2025; 
  }
  const span = maxY - minY || 1;
  const yBuckets = new Map<string, number>();
  nodes.forEach((n) => { 
    const t = n.type || "Other"; 
    if (!yBuckets.has(t)) yBuckets.set(t, 0); 
  });
  nodes.forEach((n) => {
    const sy = year(n.start); 
    const ey = year(n.end); 
    const yv = (sy ?? ey ?? minY);
    const x = ((yv - minY) / span - 0.5) * 900;
    const t = n.type || "Other"; 
    const idx = yBuckets.get(t)!; 
    yBuckets.set(t, idx + 1);
    
    n.fx = x; 
    n.fy = (idx % 10) * 26 - 120 + (t.length % 5) * 6;
  });
}

function clearFixed(nodes: any[]) { 
  nodes.forEach((n) => { 
    n.fx = undefined; 
    n.fy = undefined; 
  }); 
}

// Canvas renderer component
function CanvasForceGraph({ 
  graphData, 
  width, 
  height, 
  onNodeHover, 
  onNodeClick, 
  nodeStyle, 
  linkStyle, 
  playing, 
  focusNode,
  pathSet, 
  showTraits, 
  layoutMode = "force", 
  onFrame,
  resetCounter,
  zoomInCounter,
  zoomOutCounter,
}: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<any[]>([]);
  const linksRef = useRef<any[]>([]);
  const rafRef = useRef<number>(0);
  const hoverRef = useRef<any>(null);
  const transformRef = useRef({ k: 1, x: width / 2, y: height / 2 });
  const dragRef = useRef<{ 
    node: any | null; 
    draggingCanvas: boolean; 
    lastX: number; 
    lastY: number; 
    offsetX: number; 
    offsetY: number; 
  }>({ node: null, draggingCanvas: false, lastX: 0, lastY: 0, offsetX: 0, offsetY: 0 });

  // Initialize graph copies
  useEffect(() => {
    const nodes = (graphData.nodes || []).map((n: any) => ({ ...n }));
    const links = (graphData.links || []).map((l: any) => ({ ...l }));
    initPositions(nodes);
    nodesRef.current = nodes; 
    linksRef.current = links;
    
    // Apply layout immediately
    if (layoutMode === "radial") applyRadialByType(nodesRef.current);
    else if (layoutMode === "timeline") applyTimeline(nodesRef.current);
    else clearFixed(nodesRef.current);
  }, [graphData, layoutMode]);

  // Recenter when focus changes
  useEffect(() => {
    if (!focusNode) return;
    const n = nodesRef.current.find((x) => x.id === focusNode.id);
    if (!n) return;
    const t = transformRef.current;
    t.x = width / 2 - n.x * t.k;
    t.y = height / 2 - n.y * t.k;
  }, [focusNode, width, height]);

  // Keep transform centered on resize
  useEffect(() => {
    const t = transformRef.current;
    t.x = width / 2;
    t.y = height / 2;
  }, [width, height]);

  // Draw loop
  useEffect(() => {
    const c = canvasRef.current; 
    if (!c) return; 
    const ctx = c.getContext("2d"); 
    if (!ctx) return;

    function draw() {
      if (!ctx) return;
      const { k, x, y } = transformRef.current;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0a0a0a"; 
      ctx.fillRect(0, 0, width, height);
      ctx.save(); 
      ctx.translate(x, y); 
      ctx.scale(k, k);

      // Draw links
      for (const l of linksRef.current) {
        const s = typeof l.source === "object" ? l.source : nodesRef.current.find((n) => n.id === l.source);
        const t = typeof l.target === "object" ? l.target : nodesRef.current.find((n) => n.id === l.target);
        if (!s || !t || !ctx) continue;
        ctx.strokeStyle = linkStyle?.(l) || "#94a3b8";
        ctx.lineWidth = pathSet?.has(s.id) && pathSet?.has(t.id) ? 2 / k : 1 / k;
        ctx.beginPath(); 
        ctx.moveTo(s.x, s.y); 
        ctx.lineTo(t.x, t.y); 
        ctx.stroke();
      }

      // Draw nodes
      for (const n of nodesRef.current) nodeStyle?.(n, ctx, 1 / Math.max(1, k), showTraits);
      if (ctx) ctx.restore();
    }

    function loop() {
      if (playing) tickPhysics(nodesRef.current, linksRef.current, {});
      draw();
      onFrame?.(nodesRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, linkStyle, nodeStyle, pathSet, showTraits, width, height, onFrame]);

  // External view controls
  useEffect(() => {
    if (!width || !height) return;
    const t = transformRef.current;
    t.k = 1;
    t.x = width / 2;
    t.y = height / 2;
  }, [resetCounter, width, height]);

  useEffect(() => {
    if (!width || !height || !zoomInCounter) return;
    const t = transformRef.current;
    const cx = width / 2; const cy = height / 2;
    const wx = (cx - t.x) / t.k; const wy = (cy - t.y) / t.k;
    const nextK = Math.min(3, t.k * 1.2);
    t.x = cx - wx * nextK; t.y = cy - wy * nextK; t.k = nextK;
  }, [zoomInCounter, width, height]);

  useEffect(() => {
    if (!width || !height || !zoomOutCounter) return;
    const t = transformRef.current;
    const cx = width / 2; const cy = height / 2;
    const wx = (cx - t.x) / t.k; const wy = (cy - t.y) / t.k;
    const nextK = Math.max(0.2, t.k / 1.2);
    t.x = cx - wx * nextK; t.y = cy - wy * nextK; t.k = nextK;
  }, [zoomOutCounter, width, height]);

  // Event handlers
  const onMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    
    // Node picking
    const { wx, wy } = screenToWorld(px, py);
    const over = pickNode(wx, wy);
    if (over?.id !== hoverRef.current?.id) { 
      hoverRef.current = over || null; 
      onNodeHover?.(hoverRef.current); 
    }

    // Drag handling
    if (dragRef.current.node) {
      dragRef.current.node.fx = wx - dragRef.current.offsetX;
      dragRef.current.node.fy = wy - dragRef.current.offsetY;
    } else if (dragRef.current.draggingCanvas) {
      const dx = px - dragRef.current.lastX, dy = py - dragRef.current.lastY;
      const t = transformRef.current; 
      t.x += dx; t.y += dy; 
      dragRef.current.lastX = px; dragRef.current.lastY = py;
    }
  };

  const onDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const target = pickNode(screenToWorld(px, py).wx, screenToWorld(px, py).wy);
    
    if (target) {
      const { wx, wy } = screenToWorld(px, py);
      dragRef.current.node = target;
      dragRef.current.offsetX = wx - target.x;
      dragRef.current.offsetY = wy - target.y;
      target.fx = target.x;
      target.fy = target.y;
    } else {
      dragRef.current.draggingCanvas = true;
      dragRef.current.lastX = px;
      dragRef.current.lastY = py;
    }
  };

  const onUp = () => {
    if (dragRef.current.node) {
      dragRef.current.node.fx = undefined;
      dragRef.current.node.fy = undefined;
      dragRef.current.node = null;
    }
    dragRef.current.draggingCanvas = false;
  };

  const onClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const target = pickNode(screenToWorld(px, py).wx, screenToWorld(px, py).wy);
    if (target) onNodeClick?.(target);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { wx, wy } = screenToWorld(px, py);
    const delta = -e.deltaY;
    const factor = Math.exp(delta * 0.001);
    const t = transformRef.current;
    const nextK = Math.min(3, Math.max(0.2, t.k * factor));
    t.x = px - wx * nextK;
    t.y = py - wy * nextK;
    t.k = nextK;
  };

  // Helper functions
  const screenToWorld = (px: number, py: number) => {
    const { k, x, y } = transformRef.current;
    return { wx: (px - x) / k, wy: (py - y) / k };
  };

  const pickNode = (wx: number, wy: number) => {
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      const r = n.type === "Person" ? 10 : 6;
      if (Math.hypot(wx - n.x, wy - n.y) <= r + 4) return n;
    }
    return null;
  };

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      onMouseMove={onMove} 
      onMouseDown={onDown}
      onMouseUp={onUp}
      onClick={onClick}
      onWheel={onWheel}
      className="w-full h-full block cursor-grab active:cursor-grabbing" 
    />
  );
}

// Main component
export default function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 800 });
  const [graph, setGraph] = useState<GraphData>(starterData);
  const [playing, setPlaying] = useState(true);
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const [focusNode, setFocusNode] = useState<GraphNode | null>(null);
  const [showTraits, setShowTraits] = useState(true);
  const [neighborhoodOnly, setNeighborhoodOnly] = useState(false);
  const [pathPair] = useState({ a: "", b: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [layoutMode, setLayoutMode] = useState("force");
  const [pathNodes, setPathNodes] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filterTypes] = useState(() => new Set(NODE_TYPES));
  const [yearRange] = useState([2012, 2025]);
  const [neighborhoodHops] = useState(2);
  const [edgeOpacity] = useState(0.35);
  const [minDegree] = useState(0);
  const [frameNodes, setFrameNodes] = useState<any[]>([]);
  const [resetCounter, setResetCounter] = useState(0);
  const [zoomInCounter, setZoomInCounter] = useState(0);
  const [zoomOutCounter, setZoomOutCounter] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dirInputRef = useRef<HTMLInputElement | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Add debug logging
  const addDebugLog = (message: string) => {
    setDebugInfo(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };


  // Observe size of middle pane for canvas dims
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setDims({ w: Math.max(320, r.width), h: Math.max(320, r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-reset view on mount to show spread-out default view
  useEffect(() => {
    const timer = setTimeout(() => {
      setResetCounter(c => c + 1);
    }, 500); // Wait for physics to settle a bit
    return () => clearTimeout(timer);
  }, []);

  // Ensure the folder input supports directory selection across browsers
  useEffect(() => {
    if (dirInputRef.current) {
      try {
        dirInputRef.current.setAttribute('webkitdirectory', '');
        dirInputRef.current.setAttribute('directory', '');
        dirInputRef.current.setAttribute('mozdirectory', '');
        dirInputRef.current.setAttribute('nwdirectory', '');
      } catch (_) {
        // noop
      }
    }
  }, []);

  // Build degree map
  const degMap = useMemo(() => {
    const d = new Map<string, number>();
    (graph.links || []).forEach((l) => {
      const s = l.source;
      const t = l.target;
      d.set(s, (d.get(s) || 0) + 1);
      d.set(t, (d.get(t) || 0) + 1);
    });
    return d;
  }, [graph]);

  // Optional neighborhood filter
  function nodesWithinHops(g: GraphData, centerId: string, hops: number) {
    if (!centerId) return new Set<string>();
    const adj = new Map<string, string[]>();
    (g.links || []).forEach(({ source, target }) => {
      const s = source;
      const t = target;
      if (!adj.has(s)) adj.set(s, []);
      if (!adj.has(t)) adj.set(t, []);
      adj.get(s)!.push(t);
      adj.get(t)!.push(s);
    });
    const keep = new Set<string>([centerId]);
    let frontier = [centerId];
    for (let h = 0; h < hops; h++) {
      const next: string[] = [];
      for (const u of frontier) {
        for (const v of adj.get(u) || []) {
          if (!keep.has(v)) {
            keep.add(v);
            next.push(v);
          }
        }
      }
      frontier = next;
    }
    return keep;
  }

  // Enhanced filter + search
  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    let nodes = (graph.nodes || []).filter((n) => {
      if (!filterTypes.has(n.type)) return false;
      if (text && !(n.label || String(n.id)).toLowerCase().includes(text)) return false;
      if (n.start || n.end) {
        const sY = year(n.start) ?? -Infinity;
        const eY = year(n.end) ?? Infinity;
        if (eY < yearRange[0] || sY > yearRange[1]) return false;
      }
      if (!showTraits && n.type === "Trait") return false;
      if ((degMap.get(n.id) || 0) < minDegree) return false;
      return true;
    });

    // Neighborhood cut
    if (neighborhoodOnly && (focusNode?.id || text)) {
      const center = focusNode?.id || nodes.find((n) => (n.label || n.id).toLowerCase().includes(text))?.id;
      if (center) {
        const keep = nodesWithinHops(graph, center, neighborhoodHops);
        nodes = nodes.filter((n) => keep.has(n.id));
      }
    }

    const keep = new Set(nodes.map((n) => n.id));
    const links = (graph.links || []).filter((l) => 
      keep.has(l.source) && keep.has(l.target)
    );
    return { nodes, links };
  }, [graph, filterTypes, query, yearRange, showTraits, neighborhoodOnly, neighborhoodHops, focusNode, minDegree, degMap]);

  useEffect(() => {
    setPathNodes(shortestPath(graph, pathPair.a, pathPair.b));
  }, [graph, pathPair.a, pathPair.b]);





  // Shared processor for both file and folder uploads
  const processSelectedFiles = async (files: FileList) => {
    console.log("🚀 Starting file processing...");
    addDebugLog("🚀 Starting file processing...");
    console.log("📁 Files selected:", files.length);
    addDebugLog(`📁 Files selected: ${files.length}`);
    setIsUploading(true);

    try {
      // Only keep CSV files
      const csvFiles: File[] = [];
      for (const f of files as any) {
        if (f && typeof f.name === 'string' && f.name.toLowerCase().endsWith('.csv')) csvFiles.push(f as File);
      }
      if (csvFiles.length === 0) {
        addDebugLog("❌ No CSV files found");
        alert('No CSV files found. Please select CSV files or a folder containing CSVs.');
        return;
      }

      addDebugLog(`Processing ${csvFiles.length} CSV files...`);
      console.log(`Processing ${csvFiles.length} CSV files...`);
      const fileContents: Record<string, string> = {};
      for (const file of csvFiles) {
        addDebugLog(`📖 Reading: ${file.name}`);
        console.log(`📖 Reading file: ${file.name} (${file.size} bytes)`);
        const content = await file.text();
        console.log(`📄 File content preview:`, content.substring(0, 200) + '...');
        fileContents[file.name] = content;
      }

      // Parse nodes and edges from CSV files
      const allNodes: Record<string, string>[] = [];
      const allLinks: Record<string, string>[] = [];

      Object.entries(fileContents).forEach(([filename, content]) => {
        addDebugLog(`🔍 Processing: ${filename}`);
        console.log(`🔍 Processing file: ${filename}`);
        const data = parseCSVContent(content);
        const headers = data.length ? Object.keys(data[0]) : [];
        const normalize = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
        const normHeaders = new Set(headers.map(normalize));
        
        console.log(`   Headers found:`, headers);
        console.log(`   Normalized headers:`, Array.from(normHeaders));
        
        // Enhanced detection for your CSV naming convention
        const hasNodeFields = ['id','name','label','type','nodetype','category'].some(k => normHeaders.has(k));
        const hasEdgeFields = ['source','sourceid','source_id','from','target','targetid','target_id','to','relation','relationship','predicate'].some(k => normHeaders.has(k));
        
        // Use filename patterns as fallback for better detection
        const isNodeFile = filename.toLowerCase().includes('node') || filename.toLowerCase().startsWith('nodes_');
        const isEdgeFile = filename.toLowerCase().includes('edge') || filename.toLowerCase().includes('link') || filename.toLowerCase().startsWith('edges_');

        console.log(`   Headers found:`, headers);
        console.log(`   Normalized headers:`, Array.from(normHeaders));
        console.log(`   Has node fields: ${hasNodeFields}`);
        console.log(`   Has edge fields: ${hasEdgeFields}`);
        console.log(`   Is node file (pattern): ${isNodeFile}`);
        console.log(`   Is edge file (pattern): ${isEdgeFile}`);
        
        // Debug: show which specific columns are being detected
        const detectedNodeFields = ['id','name','label','type','nodetype','category'].filter(k => normHeaders.has(k));
        const detectedEdgeFields = ['source','sourceid','source_id','from','target','targetid','target_id','to','relation','relationship','predicate'].filter(k => normHeaders.has(k));
        console.log(`   Detected node fields:`, detectedNodeFields);
        console.log(`   Detected edge fields:`, detectedEdgeFields);

        // Priority-based detection: filename patterns take precedence when there's ambiguity
        if (isNodeFile && !isEdgeFile) {
          // If filename clearly indicates it's a node file, treat it as such
          addDebugLog(`📋 ${filename}: Detected as NODE file (filename pattern priority)`);
          console.log(`   📋 Detected as NODE file (filename pattern priority)`);
          allNodes.push(...data);
        } else if (isEdgeFile && !isNodeFile) {
          // If filename clearly indicates it's an edge file, treat it as such
          addDebugLog(`🔗 ${filename}: Detected as EDGE file (filename pattern priority)`);
          console.log(`   🔗 Detected as EDGE file (filename pattern priority)`);
          allLinks.push(...data);
        } else if (hasNodeFields && !hasEdgeFields) {
          // Fall back to column-based detection when filename is ambiguous
          addDebugLog(`📋 ${filename}: Detected as NODE file (has node fields)`);
          console.log(`   📋 Detected as NODE file (has node fields)`);
          allNodes.push(...data);
        } else if (hasEdgeFields || (isEdgeFile && !isNodeFile)) {
          // Enhanced edge detection: also check for source_id/target_id pattern
          const hasSourceTargetPattern = ['source_id','target_id','sourceid','targetid'].some(k => normHeaders.has(k));
          if (hasEdgeFields || hasSourceTargetPattern) {
            addDebugLog(`🔗 ${filename}: Detected as EDGE file (has edge fields or source_id/target_id pattern)`);
            console.log(`   🔗 Detected as EDGE file (has edge fields or source_id/target_id pattern)`);
            allLinks.push(...data);
          } else {
            addDebugLog(`📋 ${filename}: Fallback as NODE file (no clear edge pattern)`);
            console.log(`   📋 Fallback: treating as NODE file (no clear edge pattern)`);
            allNodes.push(...data);
          }
        } else if (isNodeFile) {
          // Final fallback for node files
          addDebugLog(`📋 ${filename}: Detected as NODE file (final fallback)`);
          console.log(`   📋 Detected as NODE file (final fallback)`);
          allNodes.push(...data);
        } else if (isEdgeFile) {
          // Final fallback for edge files
          addDebugLog(`🔗 ${filename}: Detected as EDGE file (final fallback)`);
          console.log(`   🔗 Detected as EDGE file (final fallback)`);
          allLinks.push(...data);
        } else {
          // Last resort: if file has 3+ columns and no clear pattern, treat as nodes
          if (data.length > 0 && Object.keys(data[0]).length >= 3) {
            addDebugLog(`📋 ${filename}: Fallback as NODE file (3+ columns)`);
            console.log(`   📋 Fallback: treating as NODE file (3+ columns)`);
            allNodes.push(...data);
          }
        }
      });

      // Add summary logging
      addDebugLog(`📊 Processing complete: ${allNodes.length} node records, ${allLinks.length} edge records`);
      console.log(`📊 Processing complete: ${allNodes.length} node records, ${allLinks.length} edge records`);
      
      // Debug: show sample data
      if (allNodes.length > 0) {
        console.log(`📋 Sample node data:`, allNodes[0]);
        addDebugLog(`📋 Sample node: ${JSON.stringify(allNodes[0]).substring(0, 100)}...`);
      }
      if (allLinks.length > 0) {
        console.log(`🔗 Sample edge data:`, allLinks[0]);
        addDebugLog(`🔗 Sample edge: ${JSON.stringify(allLinks[0]).substring(0, 100)}...`);
      }

      if (allNodes.length === 0) {
        addDebugLog("❌ No nodes found in CSV files");
        alert("❌ No nodes found in CSV files. Please check that your CSV files contain node data with columns like 'id', 'name', 'type', etc.");
        return;
      }

      if (allLinks.length === 0) {
        addDebugLog("⚠️ No edge/link files found");
        console.log("⚠️ No edge/link files found. This will create a graph with only nodes (no connections).");
      }

      addDebugLog(`📊 Found ${allNodes.length} nodes, ${allLinks.length} edges`);
      console.log(`📊 Summary: Found ${allNodes.length} node records and ${allLinks.length} edge records`);
      
      // Validate that we have at least some valid data
      if (allNodes.length === 0 && allLinks.length === 0) {
        addDebugLog("❌ No valid data found");
        alert("❌ No valid data found in CSV files. Please check your file format and content.");
        return;
      }

      addDebugLog("🏗️ Building graph from CSV data...");
      const newGraph = buildGraphFromCSV(allNodes, allLinks);
      
      // Additional validation
      if (newGraph.nodes.length === 0) {
        addDebugLog("❌ Failed to parse any valid nodes");
        alert("❌ Failed to parse any valid nodes from CSV files. Please check your data format.");
        return;
      }
      
      addDebugLog(`✅ Successfully built graph with ${newGraph.nodes.length} nodes and ${newGraph.links.length} links`);
      setGraph(newGraph);
      setTimeout(() => setResetCounter(c => c + 1), 100);
      
      const successMessage = allLinks.length > 0 
        ? `🎉 Successfully loaded ${newGraph.nodes.length} nodes and ${newGraph.links.length} links!`
        : `🎉 Successfully loaded ${newGraph.nodes.length} nodes! (No connections found - you may need to upload edge files)`;
      
      alert(successMessage);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      addDebugLog(`❌ Error: ${errorMsg}`);
      console.error('❌ Error parsing CSV files:', error);
      alert(`❌ Error parsing CSV files: ${errorMsg}`);
    } finally {
      setIsUploading(false);
    }
  };

  // File upload handling (manual multi-file selection)
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    await processSelectedFiles(files);
    event.target.value = '';
  };

  // Folder upload handling (directory picker)
  const handleDirectoryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    await processSelectedFiles(files);
    event.target.value = '';
  };

  // Canvas drawing helpers
  function drawNode(node: any, ctx: CanvasRenderingContext2D, invScale: number, showTraitsLocal: boolean) {
    const meta = TYPE_META[node.type as keyof typeof TYPE_META] || { color: "#94a3b8", shape: "circle" };
    const r = node.type === "Person" ? 10 : 6;
    
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = meta.color;
    ctx.strokeStyle = meta.color;
    
    // Draw different shapes
    switch (meta.shape) {
      case "diamond":
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - r);
        ctx.lineTo(node.x + r, node.y);
        ctx.lineTo(node.x, node.y + r);
        ctx.lineTo(node.x - r, node.y);
        ctx.closePath();
        ctx.fill();
        break;
      case "hex":
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i;
          const x = node.x + r * Math.cos(a);
          const y = node.y + r * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - r);
        ctx.lineTo(node.x - r, node.y + r);
        ctx.lineTo(node.x + r, node.y + r);
        ctx.closePath();
        ctx.fill();
        break;
      case "cross":
        ctx.beginPath();
        ctx.moveTo(node.x - r, node.y - r);
        ctx.lineTo(node.x + r, node.y + r);
        ctx.moveTo(node.x + r, node.y - r);
        ctx.lineTo(node.x - r, node.y + r);
        ctx.stroke();
        break;
      case "star":
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = (Math.PI / 5) * i;
          const rr = i % 2 ? r / 2 : r;
          ctx.lineTo(node.x + Math.cos(a) * rr, node.y + Math.sin(a) * rr);
        }
        ctx.closePath();
        ctx.fill();
        break;
      case "ring":
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case "pill":
        ctx.beginPath();
        ctx.arc(node.x - r * 0.6, node.y, r * 0.6, Math.PI / 2, -Math.PI / 2);
        ctx.arc(node.x + r * 0.6, node.y, r * 0.6, -Math.PI / 2, Math.PI / 2);
        ctx.closePath();
        ctx.fill();
        break;
      default:
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    
         // Draw trait halo for Person nodes
     if (node.type === "Person" && node.traits && showTraitsLocal) {
       const vals = Object.values(node.traits) as number[];
       const sum = vals.reduce((a: number, b: number) => a + b, 0) || 1;
       let start = -Math.PI / 2;
       const radius = r + 6;
       const colors = ["#0ea5e9", "#22c55e", "#eab308", "#a855f7", "#14b8a6"];
       
       Object.values(node.traits).forEach((v: any, i: number) => {
         const ang = ((v as number) / sum) * Math.PI * 2;
        ctx.beginPath();
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 3 * invScale;
        ctx.arc(node.x, node.y, radius, start, start + ang);
        ctx.stroke();
        start += ang;
      });
    }
    
         // Draw label with LOD
     if (1 / invScale >= 1.2) {
       const label = node.label || node.id;
       const fontSize = 12 * invScale;
       ctx.font = `${fontSize}px ui-sans-serif`;
       ctx.fillStyle = "#e2e8f0";
       ctx.textAlign = "center";
       ctx.textBaseline = "top";
       ctx.fillText(label, node.x, node.y + r + 4 * invScale);
     }
    
    ctx.restore();
  }

  function linkColor(link: GraphLink) {
    const rel = link.relation || "related";
    if (rel === "has_trait") return `rgba(20,184,166,${edgeOpacity})`;
    if (rel === "holds_role" || rel === "at_company") return `rgba(16,185,129,${edgeOpacity})`;
    if (rel === "has_skill") return `rgba(245,158,11,${edgeOpacity})`;
    if (rel === "built") return `rgba(168,85,247,${edgeOpacity})`;
    if (rel === "authored") return `rgba(239,68,68,${edgeOpacity})`;
    if (rel === "won") return `rgba(234,179,8,${edgeOpacity})`;
    if (rel === "speaks") return `rgba(100,116,139,${edgeOpacity})`;
    return `rgba(148,163,184,${edgeOpacity})`;
  }



  const pathSet = new Set(pathNodes);

  const canvasProps = {
    graphData: filtered,
    width: dims.w,
    height: dims.h,
    playing: playing && layoutMode === "force",
    onNodeHover: (n: GraphNode) => setHoverNode(n),
    onNodeClick: (n: GraphNode) => setFocusNode(n),
    nodeStyle: drawNode,
    linkStyle: linkColor,
    focusNode,
    pathSet,
    showTraits,
    layoutMode,
    onFrame: (nodes: any[]) => setFrameNodes(nodes),
    resetCounter,
    zoomInCounter,
    zoomOutCounter,
  };



  function exportGraph() {
    try {
      const blob = new Blob([JSON.stringify(graph, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "knowledge-graph.json"; a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setDetailsOpen(!!focusNode);
  }, [focusNode]);

  return (
    <div className="relative w-full h-screen bg-neutral-950 text-slate-50">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-neutral-900/70 border-b border-neutral-800">
        {graph === starterData && (
          <div className="bg-amber-900/20 border-b border-amber-700/30 px-4 py-2 text-center">
            <div className="text-amber-200 text-sm">
              📊 Showing sample data. Click "Load CSV Data" to visualize your own knowledge graph!
            </div>
          </div>
        )}
        <div className="mx-auto max-w-[1600px] px-4 py-2 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 pr-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div className="font-semibold tracking-wide">Graph Explorer</div>
          </div>
          <div className="flex-1 min-w-[280px] max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search nodes, skills, companies..."
              className="w-full bg-neutral-800/90 border border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="text-xs text-slate-400 max-w-xs hidden xl:block">
            {graph === starterData ? "Showing sample data - use 'Load CSV Data' to load your own" : `Loaded ${graph.nodes.length} nodes, ${graph.links.length} links`}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => setPlaying((p) => !p)} className="bg-neutral-800 hover:bg-neutral-700 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:block">{playing ? "Pause" : "Play"}</span>
            </button>
            <select value={layoutMode} onChange={(e) => setLayoutMode(e.target.value)} className="bg-neutral-800 hover:bg-neutral-700 rounded-lg px-3 py-2 text-sm border border-neutral-700">
              <option value="force">Force</option>
              <option value="radial">Radial</option>
              <option value="timeline">Timeline</option>
            </select>
            <label className={`cursor-pointer rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors shadow-lg ${
              isUploading 
                ? 'bg-blue-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 hover:shadow-xl'
            }`}>
              <FileText className="w-5 h-5" />
              <span className="text-white font-semibold">{isUploading ? 'Processing...' : 'Load CSV Data'}</span>
              <input 
                type="file" 
                multiple 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="hidden"
                disabled={isUploading}
              />
            </label>
            <label className={`cursor-pointer rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors shadow-lg ${
              isUploading 
                ? 'bg-indigo-600 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-xl'
            }`}>
              <FolderOpen className="w-5 h-5" />
              <span className="text-white font-semibold">{isUploading ? 'Processing...' : 'Load Folder'}</span>
              <input
                ref={dirInputRef}
                type="file"
                multiple
                accept=".csv"
                onChange={handleDirectoryUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            <div className="hidden lg:block text-xs text-slate-400 ml-2 max-w-xs">
              CSV files should contain columns like: id, name, type for nodes; source, target, relation for links
            </div>
            <div className="text-xs text-blue-300 ml-2 max-w-xs">
              💡 Upload both nodes and links CSV files together
            </div>
            <button onClick={exportGraph} className="bg-emerald-700 hover:bg-emerald-600 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:block">Export</span>
            </button>
            <label className="flex items-center gap-2 text-sm ml-2">
              <input type="checkbox" checked={showTraits} onChange={(e) => setShowTraits(e.target.checked)} />
              <span className="hidden sm:block">Traits</span>
            </label>
            <label className="flex items-center gap-2 text-sm ml-2">
              <input type="checkbox" checked={neighborhoodOnly} onChange={(e) => setNeighborhoodOnly(e.target.checked)} />
              <span className="hidden sm:block">Neighborhood</span>
            </label>
          </div>
        </div>
      </div>

      {/* Graph viewport */}
      <div className={`${graph === starterData ? 'pt-24' : 'pt-16'} w-full h-full`} ref={containerRef}>
        <div className="relative w-full h-[calc(100vh-48px)]">
          <CanvasForceGraph {...canvasProps} />

          {/* Floating zoom controls */}
          <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-2">
            <button onClick={() => setZoomInCounter((c) => c + 1)} className="w-9 h-9 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-lg flex items-center justify-center text-slate-200 border border-neutral-700">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={() => setZoomOutCounter((c) => c + 1)} className="w-9 h-9 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-lg flex items-center justify-center text-slate-200 border border-neutral-700">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={() => setResetCounter((c) => c + 1)} className="w-9 h-9 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-lg flex items-center justify-center text-slate-200 border border-neutral-700">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Minimap */}
          <div className="absolute left-4 bottom-4 z-20 bg-neutral-900/80 border border-neutral-700 backdrop-blur rounded-xl p-2">
            <Minimap width={160} height={120} nodes={frameNodes} />
          </div>

          {/* Debug Panel */}
          {debugInfo.length > 0 && (
            <div className="absolute left-4 top-20 z-20 bg-neutral-900/90 border border-neutral-700 backdrop-blur rounded-xl p-3 max-w-md max-h-64 overflow-y-auto">
              <div className="text-xs font-semibold text-slate-300 mb-2">CSV Processing Log</div>
              <div className="space-y-1">
                {debugInfo.map((log, i) => (
                  <div key={i} className="text-xs text-slate-400 font-mono">{log}</div>
                ))}
              </div>
              <button 
                onClick={() => setDebugInfo([])} 
                className="text-xs text-slate-500 hover:text-slate-300 mt-2"
              >
                Clear Log
              </button>
            </div>
          )}

          {/* Hover tooltip */}
          {hoverNode && (
            <div className={`pointer-events-none absolute left-4 z-20 bg-neutral-800/90 backdrop-blur rounded-xl px-3 py-2 text-sm text-slate-200 shadow border border-neutral-700 ${graph === starterData ? 'top-20' : 'top-16'}`}>
              <div className="font-medium">{hoverNode.label || hoverNode.id}</div>
              <div className="text-xs text-slate-400">{hoverNode.type}</div>
            </div>
          )}

          {/* Details drawer */}
          <div className={`absolute top-0 right-0 h-full w-[340px] bg-neutral-900/95 backdrop-blur border-l border-neutral-800 z-30 transition-transform duration-300 ${detailsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">Details</span>
              </div>
              <button onClick={() => { setFocusNode(null); setDetailsOpen(false); }} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 text-sm">
              {focusNode ? (
                <div className="space-y-3">
                  <div className="text-base font-semibold">{focusNode.label || focusNode.id}</div>
                  <div className="flex justify-between"><span className="text-slate-400">Type</span><span className="text-slate-200">{focusNode.type}</span></div>
                  {focusNode.start && <div className="flex justify-between"><span className="text-slate-400">Start</span><span className="text-slate-200">{focusNode.start}</span></div>}
                  {focusNode.end && <div className="flex justify-between"><span className="text-slate-400">End</span><span className="text-slate-200">{focusNode.end}</span></div>}
                  {focusNode.traits && (
                    <div>
                      <div className="text-slate-400 mb-1">Traits</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(focusNode.traits as any).map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between bg-neutral-800 rounded-lg px-2 py-1">
                            <span>{k}</span>
                            <span className="text-slate-300">{Number(v as number).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-slate-400">Click a node to see details.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimap component
function Minimap({ width = 160, height = 120, nodes = [] as any[] }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0, 0, width, height);
    if (!nodes.length) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes as any[]) { minX = Math.min(minX, n.x); minY = Math.min(minY, n.y); maxX = Math.max(maxX, n.x); maxY = Math.max(maxY, n.y); }
    const pad = 20; const sx = (width - pad * 2) / Math.max(1, maxX - minX); const sy = (height - pad * 2) / Math.max(1, maxY - minY); const s = Math.min(sx, sy);
    for (const n of nodes as any[]) {
      const x = pad + (n.x - minX) * s; const y = pad + (n.y - minY) * s;
      // @ts-ignore TYPE_META available in module scope
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      const color = (TYPE_META as any)[n.type]?.color || '#94a3b8';
      ctx.fillStyle = color; ctx.fillRect(x - 1, y - 1, 2, 2);
    }
  }, [nodes, width, height]);
  return <canvas ref={ref} width={width} height={height} className="rounded-lg" />;
}
