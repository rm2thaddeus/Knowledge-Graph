# Knowledge Graph Explorer

A React-based interactive knowledge graph visualization tool that can load data from CSV files.

## Features

- **Interactive Graph Visualization**: Force-directed, radial, and timeline layouts
- **CSV Data Loading**: Load your own knowledge graph data from CSV files
- **Search and Filter**: Find nodes and filter by type, date, and other criteria
- **Export**: Save your graph data as JSON
- **Responsive Design**: Works on desktop and mobile devices

## CSV Format

The application automatically detects CSV files and parses them as either nodes or edges based on their content.

### Nodes CSV Format
Your nodes CSV should contain columns like:
```csv
id,name,type,source,start,end
Person1,John Doe,Person,resume.pdf,2020-01,2023-12
Company1,Acme Corp,Company,resume.pdf,,
Skill1,Python,Skill,resume.pdf,,
```

**Required columns:**
- `id` (or `ID`, `node_id`) - Unique identifier for the node
- `name` (or `Name`, `label`, `Label`, `title`, `Title`) - Display name
- `type` (or `Type`, `node_type`, `category`, `Category`) - Node category

**Optional columns:**
- `source` - Source document or file
- `start` - Start date (YYYY-MM format)
- `end` - End date (YYYY-MM format)
- `confidence` - Confidence level
- `provenance` - Additional description

### Edges CSV Format
Your edges CSV should contain columns like:
```csv
source,target,relation,source_file
Person1,Company1,works_at,resume.pdf
Person1,Skill1,has_skill,resume.pdf
```

**Required columns:**
- `source` (or `Source`, `source_id`, `from`) - Source node ID
- `target` (or `Target`, `target_id`, `to`) - Target node ID
- `relation` (or `Relation`, `relationship`, `type`) - Relationship type

**Optional columns:**
- `source_file` - Source document
- `confidence` - Confidence level
- `provenance` - Additional description

## Usage

1. **Load Data**: Click "Load CSV Data" and select your CSV files
2. **View Graph**: The graph will automatically display with your data
3. **Navigate**: Drag to pan, scroll to zoom, click nodes for details
4. **Layout**: Choose between Force, Radial, or Timeline layouts
5. **Search**: Use the search bar to find specific nodes
6. **Export**: Save your graph as JSON for later use

## Default Data

When you first open the application, it shows sample data about Aitor Patiño Díaz's professional background. This is hardcoded data that gets replaced when you load your own CSV files.

## Tips

- **File Naming**: While not required, naming files with "nodes" or "edges" in the filename can help with auto-detection
- **Column Headers**: Use clear, descriptive column names
- **Data Quality**: Ensure your IDs are unique and consistent between nodes and edges files
- **Multiple Files**: You can select multiple CSV files at once - the app will combine them

## Development

This is a React application built with:
- TypeScript
- Canvas-based rendering
- Force-directed physics simulation
- Tailwind CSS for styling

To run locally:
```bash
npm install
npm run dev
```
