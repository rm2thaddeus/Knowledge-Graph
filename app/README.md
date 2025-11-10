# Knowledge Graph Job Search Explorer - App

> **⚠️ EARLY ALPHA VERSION** - This is the main application component for exploring knowledge graphs in job searching.

## 🚀 Quick Start

### Windows Users (Recommended)
1. **Double-click** `start-app.bat` in this folder
2. The script will automatically:
   - Check if Node.js is installed
   - Install dependencies if needed
   - Start the development server
   - Open the app in your browser

### Manual Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19** - Latest React with modern hooks and features
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS 4** - Utility-first CSS with modern features
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icon library

### Graph Visualization
- **Custom Canvas Engine** - High-performance 2D graphics
- **Physics Simulation** - Force-directed layout algorithms
- **Multiple Layouts** - Force, Radial, and Timeline views
- **Interactive Controls** - Drag, zoom, and node selection

### Data Processing
- **CSV Parser** - Intelligent column detection and mapping
- **Flexible Schema** - Supports various data formats
- **Real-time Updates** - Dynamic graph updates
- **Export Functionality** - JSON data export

## 📊 Features

### Core Visualization
- **Interactive Nodes** - Click for details, drag to reposition
- **Dynamic Edges** - Visual relationship representation
- **Layout Switching** - Multiple visualization algorithms
- **Responsive Canvas** - Adapts to window size

### Data Management
- **CSV Import** - Drag & drop or file picker
- **Auto-detection** - Smart parsing of nodes vs. edges
- **Data Validation** - Error handling and user feedback
- **Export Options** - Save your graph data

### User Experience
- **Search & Filter** - Find specific nodes quickly
- **Type-based Styling** - Visual distinction by entity type
- **Keyboard Shortcuts** - Power user navigation
- **Mobile Responsive** - Touch-friendly interface

## 📁 File Structure

```
app/
├── src/
│   ├── components/
│   │   └── KnowledgeGraph.tsx    # Main graph component
│   ├── utils/
│   │   └── dataLoader.ts          # CSV parsing utilities
│   ├── App.tsx                    # Root application
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies & scripts
├── start-app.bat                   # Windows startup script
├── tailwind.config.js             # Tailwind configuration
├── vite.config.ts                 # Vite build configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🔧 Development

### Prerequisites
- **Node.js 18+** - Required for React 19 and modern features
- **npm 9+** - Package manager (comes with Node.js)

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint checks
```

### Environment Variables
Create a `.env.local` file for local development:
```env
VITE_APP_TITLE=Knowledge Graph Explorer
VITE_APP_VERSION=alpha
```

## 📈 Data Format

### Supported CSV Structures

#### Nodes (Entities)
```csv
id,name,type,source,start,end,confidence,provenance
skill_1,Python,Skill,resume.pdf,2020-01,2023-12,0.9,Self-assessment
company_1,Google,Company,linkedin.pdf,,,0.8,Public profile
person_1,John Doe,Person,resume.pdf,2020-01,2023-12,0.95,Direct contact
```

**Required Columns:**
- `id` - Unique identifier (also accepts: `ID`, `node_id`)
- `name` - Display name (also accepts: `Name`, `label`, `Label`, `title`, `Title`)
- `type` - Entity category (also accepts: `Type`, `node_type`, `category`, `Category`)

**Optional Columns:**
- `source` - Source document or file
- `start` - Start date (YYYY-MM format)
- `end` - End date (YYYY-MM format)
- `confidence` - Confidence level (0.0-1.0)
- `provenance` - Additional description or source

#### Edges (Relationships)
```csv
source,target,relation,source_file,confidence,provenance
skill_1,skill_2,prerequisite,resume.pdf,0.8,Skill assessment
person_1,company_1,works_at,linkedin.pdf,0.9,Public profile
skill_1,job_1,required_for,job_posting.pdf,0.85,Job requirements
```

**Required Columns:**
- `source` - Source node ID (also accepts: `Source`, `source_id`, `from`)
- `target` - Target node ID (also accepts: `Target`, `target_id`, `to`)
- `relation` - Relationship type (also accepts: `Relation`, `relationship`, `type`)

**Optional Columns:**
- `source_file` - Source document
- `confidence` - Confidence level (0.0-1.0)
- `provenance` - Additional description

## 🎨 Customization

### Node Types
Add new entity types in `KnowledgeGraph.tsx`:
```typescript
const TYPE_META = {
  Skill: { color: '#3B82F6', shape: 'circle' },
  Company: { color: '#10B981', shape: 'square' },
  Person: { color: '#F59E0B', shape: 'diamond' },
  // Add your custom types here
  Project: { color: '#8B5CF6', shape: 'hexagon' },
}
```

### Layout Algorithms
Implement custom layouts by extending the layout system:
```typescript
const customLayout = (nodes: Node[], width: number, height: number) => {
  // Your custom layout logic
  return nodes.map(node => ({
    ...node,
    x: /* calculated x position */,
    y: /* calculated y position */
  }))
}
```

### Styling
Customize appearance using Tailwind CSS classes in the component files.

## 🚧 Known Issues (Alpha)

- **Large Datasets**: Performance may degrade with 1000+ nodes
- **Browser Compatibility**: Optimized for modern browsers
- **Memory Usage**: Large graphs may consume significant memory
- **Export Limits**: Very large graphs may fail to export

## 🔮 Upcoming Features

- **Performance Optimization** - WebGL rendering for large graphs
- **Advanced Layouts** - Hierarchical, circular, and custom layouts
- **Data Persistence** - Local storage and cloud sync options
- **Collaboration** - Real-time multi-user editing
- **Analytics** - Graph metrics and insights

## 🐛 Troubleshooting

### Common Issues

**App won't start:**
- Ensure Node.js 18+ is installed
- Check if port 5173 is available
- Try running `npm install` manually

**CSV import fails:**
- Verify CSV format matches examples above
- Check for special characters in column headers
- Ensure file encoding is UTF-8

**Graph not displaying:**
- Check browser console for errors
- Verify data structure is correct
- Try refreshing the page

**Performance issues:**
- Reduce dataset size for testing
- Close other browser tabs
- Use modern browser (Chrome, Firefox, Safari, Edge)

### Getting Help
- Check browser console for error messages
- Verify your data format matches examples
- Try with sample data first
- Report issues with detailed error information

---

**Note**: This is experimental software for exploring knowledge graphs in job searching. Feedback and bug reports are welcome!
