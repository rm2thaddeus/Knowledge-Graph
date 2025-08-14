import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Filter, Sparkles, Play, Pause, FileText, X
} from "lucide-react";
import { buildGraphFromCSV } from '../utils/dataLoader';
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



// Physics simulation
function initPositions(nodes: any[]) {
  const spread = 220;
  nodes.forEach((n) => {
    if (typeof n.x !== "number") n.x = (Math.random() - 0.5) * spread;
    if (typeof n.y !== "number") n.y = (Math.random() - 0.5) * spread;
    n.vx = 0; n.vy = 0; n.fx = undefined; n.fy = undefined;
  });
}

function tickPhysics(nodes: any[], links: any[], cfg: any = {}) {
  const { charge = -220, linkDistance = 64, linkStrength = 0.05, center = 0.018, damping = 0.9, maxSpeed = 3 } = cfg;
  
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
  const groups = new Map();
  nodes.forEach((n) => { 
    const t = n.type || "Unknown"; 
    if (!groups.has(t)) groups.set(t, []); 
    groups.get(t).push(n); 
  });
  const types = Array.from(groups.keys());
  const baseR = 140; 
  const ringGap = 90;
  types.forEach((t, ringIdx) => {
    const ring = groups.get(t);
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
  const yBuckets = new Map();
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
    const idx = yBuckets.get(t); 
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
  onFrame 
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

  const [showFileUpload, setShowFileUpload] = useState(false);
  const [layoutMode] = useState("force");
  const [edgeOpacity] = useState(0.35);

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

  // Simple filter based on showTraits
  const filtered = useMemo(() => {
    let nodes = (graph.nodes || []).filter((n) => {
      if (!showTraits && n.type === "Trait") return false;
      return true;
    });

    const keep = new Set(nodes.map((n) => n.id));
    const links = (graph.links || []).filter((l) => 
      keep.has(l.source) && keep.has(l.target)
    );
    return { nodes, links };
  }, [graph, showTraits]);





  // File upload handling
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const fileContents: Record<string, string> = {};
      
      for (const file of files) {
        const content = await file.text();
        fileContents[file.name] = content;
      }

      // Parse nodes and edges from CSV files
      const allNodes: Record<string, string>[] = [];
      const allLinks: Record<string, string>[] = [];

      Object.entries(fileContents).forEach(([filename, content]) => {
        if (filename.startsWith('nodes_')) {
          const rows = content.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
          const headers = rows[0];
          const data = rows.slice(1).map(row => {
            const obj: Record<string, string> = {};
            headers.forEach((header, i) => {
              obj[header] = row[i] || '';
            });
            return obj;
          });
          allNodes.push(...data);
        } else if (filename.startsWith('edges_')) {
          const rows = content.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
          const headers = rows[0];
          const data = rows.slice(1).map(row => {
            const obj: Record<string, string> = {};
            headers.forEach((header, i) => {
              obj[header] = row[i] || '';
            });
            return obj;
          });
          allLinks.push(...data);
        }
      });

      const newGraph = buildGraphFromCSV(allNodes, allLinks);
      setGraph(newGraph);
      setShowFileUpload(false);
    } catch (error) {
      console.error("Error parsing CSV files:", error);
      alert("Error parsing CSV files. Please check the file format.");
    }
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
    showTraits,
    layoutMode,
  };



  return (
    <div className="w-full h-screen bg-neutral-900 text-slate-50 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -8 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="rounded-2xl shadow-lg bg-neutral-800 p-4 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Knowledge Graph Explorer</h2>
            </div>
            <button
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-3 py-2 text-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {showFileUpload ? "Hide" : "Upload CSV"}
            </button>
          </div>
          <p className="text-sm text-slate-300">
            Interactive knowledge graph visualization with physics simulation. 
            {graph.nodes.length > 0 && ` Showing ${graph.nodes.length} nodes and ${graph.links.length} connections.`}
          </p>
        </motion.div>

        {/* File Upload Section */}
        {showFileUpload && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            className="rounded-2xl shadow-lg bg-neutral-800 p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Upload CSV Files</h3>
              <button onClick={() => setShowFileUpload(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-300 mb-3">
              Select multiple CSV files from your knowledge_graph_updated folder. 
              The app will automatically detect nodes_* and edges_* files.
            </p>
            <input
              type="file"
              multiple
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Controls */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: -8 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="rounded-2xl shadow-lg bg-neutral-800 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4" />
                <span className="font-semibold">Controls</span>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setPlaying(!playing)} 
                  className="w-full bg-neutral-700 hover:bg-neutral-600 rounded-xl px-3 py-2 text-sm flex items-center gap-2 justify-center"
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {playing ? "Pause" : "Play"}
                </button>
                
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    checked={showTraits} 
                    onChange={(e) => setShowTraits(e.target.checked)} 
                  />
                  Show trait halo
                </label>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -8 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="rounded-2xl shadow-lg bg-neutral-800 p-4"
            >
              <div className="text-xs uppercase text-slate-400 mb-2">Legend</div>
              <div className="grid grid-cols-1 gap-2 text-sm max-h-60 overflow-y-auto">
                {NODE_TYPES.map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span 
                      className="inline-block w-3 h-3 rounded-full" 
                      style={{ background: TYPE_META[t as keyof typeof TYPE_META]?.color }} 
                    />
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Graph Canvas */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden bg-neutral-950">
              <CanvasForceGraph {...canvasProps} />
            </div>
            
            {/* Hover tooltip */}
            {hoverNode && (
              <div className="mt-4 bg-neutral-800/90 backdrop-blur rounded-xl px-3 py-2 text-sm text-slate-200 shadow">
                <div className="font-medium">{hoverNode.label || hoverNode.id}</div>
                <div className="text-xs text-slate-400">{hoverNode.type}</div>
                {hoverNode.source && (
                  <div className="text-xs text-slate-400 mt-1">Source: {hoverNode.source}</div>
                )}
              </div>
            )}

            {/* Focus node details */}
            {focusNode && (
              <div className="mt-4 bg-neutral-800/90 backdrop-blur rounded-xl p-3 text-sm text-slate-200 shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{focusNode.label || focusNode.id}</h4>
                  <button onClick={() => setFocusNode(null)} className="text-slate-400 hover:text-slate-200">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1 text-xs">
                  <div><span className="text-slate-400">Type:</span> {focusNode.type}</div>
                  {focusNode.source && <div><span className="text-slate-400">Source:</span> {focusNode.source}</div>}
                  {focusNode.confidence && <div><span className="text-slate-400">Confidence:</span> {focusNode.confidence}</div>}
                  {focusNode.start && <div><span className="text-slate-400">Start:</span> {focusNode.start}</div>}
                  {focusNode.end && <div><span className="text-slate-400">End:</span> {focusNode.end}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
