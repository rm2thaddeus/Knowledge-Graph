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
  return String(text || "")
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const parts: string[] = [];
      let cur = "";
      let inQ = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') inQ = !inQ;
        else if (ch === "," && !inQ) { 
          parts.push(cur); 
          cur = ""; 
        }
        else cur += ch;
      }
      parts.push(cur);
      return parts.map((v) => String(v).replace(/^"|"$/g, "").trim());
    });
}

function rowsToObjects([header, ...rows]: string[][]): Record<string, string>[] {
  const hdr = (header || []).map((h) => String(h).trim());
  return (rows || []).map((r) => 
    Object.fromEntries(hdr.map((h, i) => [h, (r && r[i] != null ? String(r[i]) : "").trim()]))
  );
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
  const nodes: GraphNode[] = nodesCSV.map((row) => ({
    id: row.id || row.ID,
    label: row.name || row.label || row.Name || row.Label || row.id || row.ID,
    type: row.node_type || row.type || row.Type || "Unknown",
    source: row.source,
    source_type: row.source_type,
    confidence: row.confidence,
    provenance: row.provenance,
    start: row.start || row.Start,
    end: row.end || row.End
  }));

  const links: GraphLink[] = linksCSV.map((row) => ({
    source: row.source_id || row.source || row.Source,
    target: row.target_id || row.target || row.Target,
    relation: row.relation || row.Relation || "related_to",
    source_file: row.source,
    source_type: row.source_type,
    confidence: row.confidence,
    provenance: row.provenance
  }));

  return { nodes, links };
}
