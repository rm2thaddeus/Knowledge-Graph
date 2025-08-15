# 🐛 CSV Loading Debug Guide

## Step 1: Test with Simple File
1. **Open your browser** to `http://localhost:5173/`
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Click "Load CSV Data"** button
5. **Select ONLY** `debug_test.csv` file
6. **Watch the console** for detailed logs

## Step 2: What to Look For
The console should show:
- 🚀 Starting file upload process...
- 📁 Files selected: 1
- 📖 Reading file: debug_test.csv
- 📄 File content preview
- 🔍 Processing file: debug_test.csv
- 📋 File: debug_test.csv
- 🔧 Calling buildGraphFromCSV...
- 🏗️ Building nodes...
- 🎯 Final result

## Step 3: If It Works
- You should see a small graph with 2 nodes
- Now try with your real data

## Step 4: If It Fails
- **Copy the exact error message** from console
- **Check what step failed** in the logs
- **Look for any red error messages**

## Common Issues:
1. **File not selected** - Make sure you click "Open" after selecting
2. **File encoding** - Files should be UTF-8
3. **CSV format** - Should have headers on first row
4. **Column names** - Should match expected patterns

## Expected Console Output:
```
🚀 Starting file upload process...
📁 Files selected: 1
📖 Reading file: debug_test.csv (45 bytes)
📄 File content preview: id,name,type
Person1,Aitor,Person
Person2,Martin,Person...
🔍 Processing file: debug_test.csv
   Content length: 45 characters
   Lines: 3
   Parsed rows: [["id", "name", "type"], ["Person1", "Aitor", "Person"], ["Person2", "Martin", "Person"]]
   Headers found: ["id", "name", "type"]
   Data objects: [{"id": "Person1", "name": "Aitor", "type": "Person"}, {"id": "Person2", "name": "Martin", "type": "Person"}]
📋 File: debug_test.csv
   Headers: [id, name, type]
   Data rows: 2
   Sample row: {"id": "Person1", "name": "Aitor", "type": "Person"}
   Has node fields: true (id, name, type)
   Has edge fields: false ()
✅ Detected nodes file: debug_test.csv with 2 nodes
📊 Total collected: 2 nodes, 0 links
📋 All nodes: [{"id": "Person1", "name": "Aitor", "type": "Person"}, {"id": "Person2", "name": "Martin", "type": "Person"}]
🔗 All links: []
🔧 Calling buildGraphFromCSV...
🔧 buildGraphFromCSV called with:
   nodesCSV: [{"id": "Person1", "name": "Aitor", "type": "Person"}, {"id": "Person2", "name": "Martin", "type": "Person"}]
   linksCSV: []
🏗️ Building nodes...
   Processing node row 0: {"id": "Person1", "name": "Aitor", "type": "Person"}
     ID found: "Person1"
     Label found: "Aitor"
     Type found: "Person"
     Confidence found: "Medium"
     Provenance found: ""
     Final node: {"id": "Person1", "label": "Aitor", "type": "Person", "confidence": "Medium", "provenance": ""}
   Processing node row 1: {"id": "Person2", "name": "Martin", "type": "Person"}
     ID found: "Person2"
     Label found: "Martin"
     Type found: "Person"
     Confidence found: "Medium"
     Provenance found: ""
     Final node: {"id": "Person2", "label": "Martin", "type": "Person", "confidence": "Medium", "provenance": ""}
🔗 Building links...
🔗 Valid links: 0/0
📋 Valid nodes: 2/2
✅ Processed 2 valid nodes and 0 valid links
📊 Node types found: ["Person"]
🔗 Relation types found: []
🎯 Final result: {"nodes": [{"id": "Person1", "label": "Aitor", "type": "Person", "confidence": "Medium", "provenance": ""}, {"id": "Person2", "label": "Martin", "type": "Person", "confidence": "Medium", "provenance": ""}], "links": []}
🎯 New graph created: {"nodes": [{"id": "Person1", "label": "Aitor", "type": "Person", "confidence": "Medium", "provenance": ""}, {"id": "Person2", "label": "Martin", "type": "Person", "confidence": "Medium", "provenance": ""}], "links": []}
```

## If You See Different Output:
- **Copy the exact console output** and share it
- **Note which step failed**
- **Check if any error messages appear**
