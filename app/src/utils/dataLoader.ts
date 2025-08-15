// Data loader utility for knowledge graph CSV files
export interface GraphNode {
  id: string;
  label: string;
  type: string;
  source?: string;
  source_type?: string;
  confidence?: string;
  provenance?: string;
  start?: string;
  end?: string;
  [key: string]: any; // Allow additional properties
}

export interface GraphLink {
  source: string;
  target: string;
  relation: string;
  source_file?: string;
  source_type?: string;
  confidence?: string;
  provenance?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// CSV parsing utilities
function csvToRows(text: string): string[][] {
  const input = String(text || "").replace(/^\ufeff/, "").trim(); // strip BOM if present
  const lines = input.split(/\r?\n/);

  // Helper: split a single line by delimiter, respecting quotes
  const splitLine = (line: string, delimiter: string): string[] => {
    const parts: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        // Handle escaped double quotes within quoted field
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; continue; }
        inQuotes = !inQuotes; continue;
      }
      if (ch === delimiter && !inQuotes) {
        parts.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    parts.push(cur);
    return parts.map((v) => String(v).replace(/^\"|\"$/g, "").trim());
  };

  // Detect delimiter from header line by choosing the candidate that yields the most columns
  const candidates = [",", ";", "\t"];
  const headerLine = lines[0] || "";
  let bestDelim = ",";
  let bestCount = 1;
  for (const d of candidates) {
    const parts = splitLine(headerLine, d);
    if (parts.length > bestCount) {
      bestCount = parts.length;
      bestDelim = d;
    }
  }

  const rows = lines.map((line) => splitLine(line, bestDelim));
  
  // Find the maximum number of columns from all rows
  const maxColumns = Math.max(...rows.map(row => row.length));
  
  // Pad rows with empty strings to ensure consistent column count
  const paddedRows = rows.map(row => {
    while (row.length < maxColumns) {
      row.push("");
    }
    return row;
  });
  
  // Drop empty lines (all cells empty)
  return paddedRows.filter((r) => r.some((c) => String(c).trim().length > 0));
}

function rowsToObjects([header, ...rows]: string[][]): Record<string, string>[] {
  const seen = new Set<string>();
  const hdr = (header || []).map((h, idx) => {
    const base = String(h ?? "").replace(/^\ufeff/, "").trim() || `col_${idx}`;
    let key = base;
    let suffix = 1;
    while (seen.has(key)) key = `${base}_${suffix++}`;
    seen.add(key);
    return key;
  });
  
  return (rows || []).map((r) => {
    // Ensure the row has the same number of columns as the header
    const paddedRow = [...r];
    while (paddedRow.length < hdr.length) {
      paddedRow.push("");
    }
    
    return Object.fromEntries(hdr.map((h, i) => [
      h, 
      (paddedRow && paddedRow[i] != null ? String(paddedRow[i]) : "").trim()
    ]));
  });
}

// Load and parse CSV data
export async function loadKnowledgeGraphData(): Promise<GraphData> {
  try {
    // For now, we'll use a sample of the data structure
    // In a real app, you'd fetch these from your server or load them as static assets
    
    const sampleData: GraphData = {
      nodes: [
        {
          id: "Person1",
          label: "Aitor Patiño Diaz",
          type: "Person",
          source: "ATS_and_Human.pdf",
          source_type: "cv",
          confidence: "High",
          provenance: "Aitor Patiño Diaz Phone: +33 7 82 16 22 64 Email: aitorpatinodiaz@gmail.com LinkedIn: linkedin.com/in/aitorp/"
        },
        {
          id: "Role1",
          label: "Business Intelligence Consultant - Filtration",
          type: "Role",
          start: "2022-06",
          end: "2025-04",
          source: "CV_with_portfolio.pdf",
          source_type: "cv",
          confidence: "High"
        },
        {
          id: "Role2",
          label: "Postdoctoral Researcher - ACDC EU project",
          type: "Role",
          start: "2021-06",
          end: "2022-06",
          source: "CV_with_portfolio.pdf",
          source_type: "cv",
          confidence: "High"
        },
        {
          id: "Company1",
          label: "Merck Life Science",
          type: "Company",
          source: "CV_with_portfolio.pdf",
          source_type: "cv",
          confidence: "High"
        },
        {
          id: "Skill1",
          label: "Prompt Engineering",
          type: "Skill",
          source: "CV_with_portfolio.pdf",
          source_type: "cv",
          confidence: "High"
        },
        {
          id: "Skill2",
          label: "Palantir Foundry",
          type: "Skill",
          source: "CV_with_portfolio.pdf",
          source_type: "cv",
          confidence: "High"
        },
        {
          id: "Project1",
          label: "Cortexus (GPT Assistant)",
          type: "Project",
          source: "CV_with_portfolio.pdf",
          source_type: "cv",
          confidence: "High"
        },
        {
          id: "Publication1",
          label: "Cell-Free Switches for Antibody Detection (JACS 2022)",
          type: "Publication",
          source: "PubMed (JACS 2022)",
          source_type: "web",
          confidence: "High"
        }
      ],
      links: [
        { source: "Person1", target: "Role1", relation: "holds_role" },
        { source: "Person1", target: "Role2", relation: "holds_role" },
        { source: "Role1", target: "Company1", relation: "at_company" },
        { source: "Person1", target: "Skill1", relation: "has_skill" },
        { source: "Person1", target: "Skill2", relation: "has_skill" },
        { source: "Person1", target: "Project1", relation: "built" },
        { source: "Person1", target: "Publication1", relation: "authored" }
      ]
    };

    return sampleData;
  } catch (error) {
    console.error("Error loading knowledge graph data:", error);
    return { nodes: [], links: [] };
  }
}

// Function to parse CSV content (for when you want to load the actual CSV files)
export function parseCSVContent(csvContent: string): Record<string, string>[] {
  const rows = csvToRows(csvContent);
  return rowsToObjects(rows);
}

// Function to build graph from CSV files
export function buildGraphFromCSV(
  nodesCSV: Record<string, string>[],
  linksCSV: Record<string, string>[]
): GraphData {
  console.log("🔧 buildGraphFromCSV called with:");
  console.log("   nodesCSV:", nodesCSV);
  console.log("   linksCSV:", linksCSV);
  
  // Normalization helpers for flexible header matching
  const normalizeKey = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const rowKeyCache = new WeakMap<Record<string, string>, Map<string, string>>();
  const getKeyMap = (row: Record<string, string>) => {
    let map = rowKeyCache.get(row);
    if (!map) {
      map = new Map<string, string>();
      for (const k of Object.keys(row)) map.set(normalizeKey(k), k);
      rowKeyCache.set(row, map);
    }
    return map;
  };
  
  // Helper function to find the best matching column (by synonyms and normalized key)
  const findColumn = (row: Record<string, string>, possibleNames: string[]): string => {
    const keyMap = getKeyMap(row);
    for (const name of possibleNames) {
      const norm = normalizeKey(name);
      const orig = keyMap.get(norm);
      if (orig && row[orig] !== undefined && row[orig] !== '') return row[orig];
    }
    return '';
  };

  console.log("🏗️ Building nodes...");
  const nodes: GraphNode[] = nodesCSV.map((row, index) => {
    console.log(`   Processing node row ${index}:`, row);
    
    // Try to find the best ID field
    const id = findColumn(row, ['id', 'node_id', 'uid', 'key', 'identifier']) || `node_${index}`;
    console.log(`     ID found: "${id}"`);
    
    // Try to find the best label/name field
    const label = findColumn(row, ['label', 'name', 'title', 'display', 'display_name']) || id;
    console.log(`     Label found: "${label}"`);
    
    // Try to find the best type field - handle both 'type' and 'node_type' (your CSV uses node_type)
    const type = findColumn(row, ['type', 'node_type', 'category', 'class', 'kind']) || 'Unknown';
    console.log(`     Type found: "${type}"`);
    
    // Try to find confidence field
    const confidence = findColumn(row, ['confidence', 'conf']) || 'Medium';
    console.log(`     Confidence found: "${confidence}"`);
    
    // Try to find provenance field
    const provenance = findColumn(row, ['provenance', 'source', 'origin']) || '';
    console.log(`     Provenance found: "${provenance}"`);
    
    // Try to find start/end dates
    const start = findColumn(row, ['start', 'start_date', 'from', 'since', 'begin']);
    const end = findColumn(row, ['end', 'end_date', 'to', 'until', 'finish']);
    
    // Try to find traits (for Person nodes)
    const traits = findColumn(row, ['traits', 'trait']);
    
    // Try to find accounts (for Person nodes)
    const accounts = findColumn(row, ['accounts', 'account']);
    
    // Try to find score (for Trait nodes)
    const score = findColumn(row, ['score', 'value']);
    
    // Build the node object
    const node: GraphNode = {
      id,
      label,
      type,
      confidence,
      provenance
    };
    
    // Add optional fields if they exist
    if (start) node.start = start;
    if (end) node.end = end;
    if (traits) node.traits = traits;
    if (accounts) node.accounts = parseInt(accounts) || 0;
    if (score) node.score = parseFloat(score) || 0;
    
    console.log(`     Final node:`, node);
    return node;
  });

  console.log("🔗 Building links...");
  const links: GraphLink[] = linksCSV.map((row, index) => {
    console.log(`   Processing link row ${index}:`, row);
    
    // Try to find source and target - handle both 'source'/'target' and 'source_id'/'target_id' (your CSV uses source_id/target_id)
    const source = findColumn(row, ['source', 'source_id', 'sourceid', 'from', 'start', 'src', 'head', 'subject', 's']);
    const target = findColumn(row, ['target', 'target_id', 'targetid', 'to', 'end', 'dst', 'tail', 'object', 'o']);
    
    console.log(`     Source found: "${source}"`);
    console.log(`     Target found: "${target}"`);
    
    // Try to find relation field
    const relation = findColumn(row, ['relation', 'relationship', 'rel', 'edge', 'edge_type', 'type', 'predicate', 'label']) || 'related';
    console.log(`     Relation found: "${relation}"`);
    
    // Try to find confidence field
    const confidence = findColumn(row, ['confidence', 'conf']) || 'Medium';
    console.log(`     Confidence found: "${confidence}"`);
    
    // Try to find provenance field
    const provenance = findColumn(row, ['provenance', 'source', 'origin']) || '';
    console.log(`     Provenance found: "${provenance}"`);
    
    // Build the link object
    const link: GraphLink = {
      source,
      target,
      relation,
      confidence,
      provenance
    };
    
    console.log(`     Final link:`, link);
    return link;
  });

  // Filter out invalid links (missing source or target)
  const validLinks = links.filter(link => link.source && link.target);
  console.log(`🔗 Valid links: ${validLinks.length}/${links.length}`);
  
  // Show some sample valid links
  if (validLinks.length > 0) {
    console.log(`🔗 Sample valid links:`, validLinks.slice(0, 3));
  }
  
  // Show some invalid links if any
  const invalidLinks = links.filter(link => !link.source || !link.target);
  if (invalidLinks.length > 0) {
    console.log(`❌ Invalid links (missing source/target):`, invalidLinks.slice(0, 3));
  }
  
  // Filter out invalid nodes (missing id or type)
  const validNodes = nodes.filter(node => node.id && node.type);
  console.log(`📋 Valid nodes: ${validNodes.length}/${nodes.length}`);

  console.log(`✅ Processed ${validNodes.length} valid nodes and ${validLinks.length} valid links`);
  console.log(`📊 Node types found:`, [...new Set(validNodes.map(n => n.type))]);
  console.log(`🔗 Relation types found:`, [...new Set(validLinks.map(l => l.relation))]);

  const result = {
    nodes: validNodes,
    links: validLinks
  };
  
  console.log("🎯 Final result:", result);
  return result;
}

// Function to load knowledge graph from multiple CSV files (for your directory structure)
export async function loadKnowledgeGraphFromDirectory(): Promise<GraphData> {
  try {
    // This would be called from a file input that selects multiple CSV files
    // For now, return empty data - the actual loading happens in the component
    return { nodes: [], links: [] };
  } catch (error) {
    console.error("Error loading knowledge graph data:", error);
    return { nodes: [], links: [] };
  }
}
