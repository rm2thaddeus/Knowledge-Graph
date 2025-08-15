# Your Knowledge Graph Data Structure

This document explains how to load your knowledge graph data from the `knowledge_graph_updated` folder.

## 📁 Your Data Structure

You have a comprehensive knowledge graph with **separate CSV files** for different entity types:

### Node Files (Entities)
- `nodes_person.csv` - People in your network
- `nodes_company.csv` - Companies and organizations  
- `nodes_role.csv` - Job roles and positions
- `nodes_project.csv` - Projects and initiatives
- `nodes_skill.csv` - Skills and competencies
- `nodes_publication.csv` - Publications and papers
- `nodes_award.csv` - Awards and recognitions
- `nodes_language.csv` - Languages spoken
- `nodes_trait.csv` - Personality traits
- `nodes_education.csv` - Educational background
- `nodes_certification.csv` - Certifications
- `nodes_event.csv` - Events and conferences
- `nodes_account.csv` - Online accounts
- `nodes_profile.csv` - Profile information
- `nodes_location.csv` - Geographic locations
- `nodes_writing_sample.csv` - Writing samples

### Edge Files (Relationships)
- `edges_person_*.csv` - All person relationships
- `edges_role_company.csv` - Role-company connections
- `edges_education_institution.csv` - Education-institution links
- `edges_company_location.csv` - Company-location connections

## 🚀 How to Load Your Data

### Option 1: Load All Files at Once (Recommended)
1. **Click the blue "Load CSV Data" button** in the top toolbar
2. **Select ALL your CSV files** from the `knowledge_graph_updated` folder
3. **Hold Ctrl (or Cmd on Mac)** and click each CSV file
4. **Click "Open"** - the app will process all files automatically
5. **Wait for processing** - you'll see "Processing..." while files are being read
6. **Your knowledge graph will appear** with all your data!

### Option 2: Use the Helper Tool
1. **Open** `load_all_csv.html` in your browser
2. **Select all your CSV files** from the folder
3. **Click "Load All Files"** to process them
4. **Copy the combined data** to clipboard if needed

## 🔍 What Happens During Loading

The app automatically:
- ✅ **Detects file types** based on column names
- ✅ **Combines all nodes** from different CSV files
- ✅ **Combines all relationships** from edge files
- ✅ **Maps columns** to the correct graph structure
- ✅ **Validates data** and filters out invalid relationships
- ✅ **Creates the graph** with proper node types and colors

## 📊 Expected Results

After loading, you should see:
- **A comprehensive knowledge graph** with all your entities
- **Different colored nodes** for each entity type (Person, Company, Role, etc.)
- **Connections** showing relationships between entities
- **Interactive features** like zoom, pan, and node details

## 🛠️ Troubleshooting

### If you see a white screen:
- Check the browser console (F12) for error messages
- Make sure all CSV files have proper headers
- Verify file encoding is UTF-8

### If some data is missing:
- Check that all CSV files are selected
- Ensure column names match expected patterns
- Look for console warnings about skipped files

### If the graph looks empty:
- Verify that edge files reference valid node IDs
- Check that node files have the required `id`, `name`, and `type` columns

## 💡 Tips for Best Results

1. **Select all files at once** rather than loading them individually
2. **Keep your CSV structure** - don't change column names
3. **Use the console** (F12) to see detailed loading progress
4. **Start with a small subset** if you have performance issues

Your knowledge graph should load with hundreds of nodes and relationships, giving you a comprehensive view of your professional network!
