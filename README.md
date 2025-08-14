# Knowledge Graph Explorer

An interactive knowledge graph visualization application built with React, TypeScript, and Canvas. This project provides a foundation for exploring and visualizing knowledge graphs with physics-based layouts and interactive features.

## Features

- **Interactive Graph Visualization**: Canvas-based rendering with smooth animations
- **Physics Simulation**: Force-directed layout with customizable parameters
- **Node Types**: Support for different entity types (Person, Organization, Role, Skill, Project, etc.)
- **Trait Visualization**: Personality trait analysis with color-coded halos
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion
- **TypeScript**: Full type safety and modern development experience

## Project Structure

```
Knowledge-Graph/
├── app/                    # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── KnowledgeGraph.tsx
│   │   ├── App.tsx        # Main application
│   │   └── index.css      # Tailwind CSS
│   ├── package.json       # Dependencies
│   └── tailwind.config.js # Tailwind configuration
├── originalscript         # Reference implementation (not in git)
└── .gitignore            # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Development

### Adding Your Data

To integrate your own knowledge graph data:

1. Replace the `sampleData` in `KnowledgeGraph.tsx` with your actual data
2. Ensure your data follows the expected structure:
   ```typescript
   interface GraphData {
     nodes: Array<{
       id: string;
       label: string;
       type: keyof typeof TYPE_META;
       // ... other properties
     }>;
     links: Array<{
       source: string | { id: string };
       target: string | { id: string };
       relation: string;
     }>;
   }
   ```

### Customization

- **Node Types**: Add new types in the `TYPE_META` object
- **Colors & Shapes**: Customize visual appearance per node type
- **Physics**: Adjust simulation parameters in `tickPhysics` function
- **Layouts**: Implement new layout algorithms (radial, timeline, etc.)

## Security & Privacy

- **No PII in Git**: The `.gitignore` excludes personal information
- **Reference Files**: `originalscript` and other reference files are excluded
- **Sample Data**: Only generic example data is included in the repository

## Technologies Used

- **React 19** - Modern React with hooks
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Canvas API** - High-performance 2D graphics
- **Lucide React** - Icon library

## Contributing

This is a personal project for exploring knowledge graph visualization. Feel free to fork and adapt for your own needs.

## License

MIT License - see LICENSE file for details.
