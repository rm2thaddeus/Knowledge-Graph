# 🧪 Test Your CSV Loading

## Quick Test (Recommended First)
1. **Click the blue "Load CSV Data" button** in the app
2. **Select these two test files:**
   - `test_nodes.csv` (contains 5 nodes: 3 people + 2 roles)
   - `test_edges.csv` (contains 3 relationships)
3. **Click "Open"** - you should see a small graph with 5 nodes and 3 connections

## If the Test Works:
1. **Now load your real data:**
   - Click "Load CSV Data" again
   - Navigate to `C:\Users\aitor\OneDrive\Documentos\Graph CV\knowledge_graph_updated`
   - **Select ALL your CSV files** (hold Ctrl and click each one)
   - Click "Open"

## What You Should See:
- **Console logs** showing each file being processed
- **File detection** showing which files are nodes vs edges
- **Column mapping** showing how headers are interpreted
- **Final graph** with all your data

## Expected Results:
- **~25+ node files** should be detected as nodes
- **~30+ edge files** should be detected as relationships
- **Hundreds of nodes** and **hundreds of connections** in your final graph

## Troubleshooting:
- **Check browser console** (F12) for detailed logs
- **Look for error messages** in red
- **Verify file selection** - make sure you selected multiple files
- **Check file encoding** - files should be UTF-8

Your knowledge graph should load with all your professional data!
