# CSV Upload Fix for Knowledge Graph

## Problem Identified

The CSV upload was not working due to **column name mismatches** between your CSV files and the parsing logic:

### Your CSV Files Use:
- **Nodes**: `node_type` column (instead of `type`)
- **Edges**: `source_id` and `target_id` columns (instead of `source` and `target`)

### The Code Expected:
- **Nodes**: `type` column
- **Edges**: `source` and `target` columns

## What Was Fixed

### 1. Updated `dataLoader.ts`
- Enhanced column detection to handle `source_id`/`target_id` for edges
- Enhanced column detection to handle `node_type` for nodes
- Added flexible column name matching with synonyms

### 2. Enhanced File Detection
- Better detection of node vs edge files based on filename patterns
- Improved fallback logic for ambiguous files
- Added support for your `nodes_*` and `edges_*` naming convention

### 3. Added Debug Panel
- Real-time CSV processing logs visible in the UI
- Better error messages and validation
- Processing status updates

### 4. Created Test Files
- `test_csv_upload.html` with sample CSV files matching your format
- Download and test the upload functionality

## How to Test the Fix

### Option 1: Use Your Existing CSV Files
1. Open your knowledge graph application
2. Click "Load CSV Data" and select your CSV files from `../knowledge_graph_updated/`
3. Or click "Load Folder" and select the entire `knowledge_graph_updated` folder
4. Check the debug panel for processing logs

### Option 2: Use Test Files
1. Open `app/public/test_csv_upload.html` in your browser
2. Download the test CSV files
3. Upload them to your knowledge graph application
4. Verify the nodes and connections appear correctly

## Expected Results

With your CSV files, you should see:
- **Person nodes**: Aitor, Martin, Francesco, Sara, Simona, Tania, Alessandro, Giuseppe
- **Company nodes**: Merck Life Science, UNITN, University of Rome Tor Vergata
- **Role nodes**: Business Intelligence Consultant, Postdoc, MSCA ESR
- **Skill nodes**: Prompt Engineering, Palantir Foundry, Design of Experiments
- **Project nodes**: Cortexus, SFDC Tagger, Pixel Detective
- **And many more nodes and connections...**

## CSV File Format Requirements

### Node Files (e.g., `nodes_person.csv`)
```csv
id,name,node_type,source,source_type,confidence,provenance
Person1,"Aitor Patiño Diaz",Person,ATS_and_Human.pdf,cv,High,"..."
```

### Edge Files (e.g., `edges_person_role.csv`)
```csv
source_id,target_id,relation,source,source_type,confidence,provenance
Person1,Role1,holds_role,CV_with_portfolio.pdf,cv,High,"..."
```

## Troubleshooting

### If Upload Still Doesn't Work:
1. **Check the debug panel** - it shows real-time processing logs
2. **Check browser console** - detailed error messages appear there
3. **Verify CSV format** - ensure columns match the expected names
4. **Check file encoding** - files should be UTF-8 encoded

### Common Issues:
- **Empty files**: Ensure CSV files contain data
- **Wrong delimiter**: The parser auto-detects comma, semicolon, or tab
- **Missing headers**: First row must contain column names
- **Special characters**: Handle quotes and commas properly in CSV

## File Naming Convention

The system now recognizes these patterns:
- **Node files**: `nodes_*.csv`, `*node*.csv`
- **Edge files**: `edges_*.csv`, `*edge*.csv`, `*link*.csv`

## Technical Details

### Column Detection Logic
The system tries multiple column name variations:
- **ID fields**: `id`, `node_id`, `uid`, `key`, `identifier`
- **Type fields**: `type`, `node_type`, `category`, `class`, `kind`
- **Source fields**: `source`, `source_id`, `sourceid`, `from`, `start`
- **Target fields**: `target`, `target_id`, `targetid`, `to`, `end`
- **Relation fields**: `relation`, `relationship`, `rel`, `edge`, `predicate`

### Fallback Detection
If column names don't match, the system falls back to:
1. Filename patterns (`nodes_*`, `edges_*`)
2. Content analysis (number of columns, data patterns)
3. Header content analysis

## Performance Notes

- Large CSV files (>10MB) may take time to process
- The system processes files sequentially for memory efficiency
- Progress is shown in the debug panel
- Invalid rows are filtered out automatically

## Future Improvements

Consider these enhancements:
1. **Batch processing** for very large datasets
2. **CSV validation** before upload
3. **Template generation** for new CSV files
4. **Data preview** before graph creation
5. **Export functionality** for modified graphs

## Support

If you encounter issues:
1. Check the debug panel for specific error messages
2. Verify your CSV format matches the examples
3. Test with the provided test files first
4. Check browser console for detailed logs

The fix should resolve your CSV upload issues and allow you to visualize your comprehensive knowledge graph data!
