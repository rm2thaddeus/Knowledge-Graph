# CSV Data Format for Knowledge Graph

This app expects CSV files with specific column structures to build your knowledge graph.

## Required Files

You need **two CSV files**:
1. **Nodes CSV** - Contains all the entities (people, companies, skills, etc.)
2. **Links CSV** - Contains the relationships between entities

## Nodes CSV Format

Required columns:
- `id` - Unique identifier for each node
- `name` - Display name/label for the node
- `type` - Node type (Person, Company, Role, Project, Skill, etc.)

Optional columns:
- `confidence` - Confidence level (High, Medium, Low)
- `provenance` - Source of the information
- `start` - Start date (YYYY-MM format)
- `end` - End date (YYYY-MM format)
- Any additional properties you want to include

## Links CSV Format

Required columns:
- `source` - ID of the source node (must match an ID from nodes CSV)
- `target` - ID of the target node (must match an ID from nodes CSV)
- `relation` - Type of relationship (holds_role, at_company, has_skill, etc.)

Optional columns:
- `confidence` - Confidence level
- `provenance` - Source of the relationship

## How to Load

1. Click the **"Load CSV Data"** button in the top toolbar
2. Select both your nodes and links CSV files
3. The app will automatically detect which file is which
4. Your knowledge graph will replace the sample data

## Example

See `sample_nodes.csv` and `sample_links.csv` for working examples.

## Tips

- Make sure all IDs in the links CSV exist in the nodes CSV
- Use consistent naming for node types
- The app will auto-detect file types based on column names
- You can include additional columns - they'll be preserved as node properties
