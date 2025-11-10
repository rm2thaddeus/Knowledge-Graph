# Knowledge Graph Job Search Explorer

> **⚠️ EARLY ALPHA VERSION** - This is an experimental application exploring the use of knowledge graphs for job searching and career mapping.

## 🎯 Project Overview

This application explores how **knowledge graphs** can revolutionize job searching by creating visual, interconnected representations of:
- **Professional Skills** and their relationships
- **Career Paths** and progression opportunities  
- **Industry Connections** and networking potential
- **Job Requirements** mapped to personal capabilities
- **Learning Paths** for skill development

The goal is to transform traditional linear job searching into an interactive, network-based exploration that reveals hidden opportunities and career trajectories.

## 🚀 Quick Start

### Option 1: Double-Click to Run (Windows)
1. Download the project files
2. Double-click `start-app.bat` in the `app` folder
3. The app will open in your default browser at `http://localhost:5173`

### Option 2: Manual Setup
```bash
cd app
npm install
npm run dev
```

## 🏗️ Architecture

This is a **React + TypeScript** application built with:
- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Visualization**: Custom Canvas-based graph rendering
- **Data Processing**: CSV parsing with automatic column detection
- **Build Tool**: Vite for fast development and building

## 📊 Core Features

### Interactive Knowledge Graph Visualization
- **Multiple Layouts**: Force-directed, Radial, and Timeline views
- **Real-time Interaction**: Drag, zoom, and explore connections
- **Responsive Design**: Works on desktop and mobile devices

### Data Import & Management
- **CSV Upload**: Load your own knowledge graph data
- **Auto-detection**: Intelligent parsing of nodes and edges
- **Flexible Format**: Supports various column naming conventions
- **Data Export**: Save graphs as JSON for sharing or backup

### Search & Analysis
- **Node Search**: Find specific skills, companies, or people
- **Relationship Exploration**: Discover connections between entities
- **Filtering**: Narrow down by type, date, or other criteria

## 📁 Project Structure

```
Knowledge-Graph/
├── app/                          # Main application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   └── KnowledgeGraph.tsx  # Main graph component
│   │   ├── utils/               # Utility functions
│   │   │   └── dataLoader.ts    # CSV parsing logic
│   │   ├── App.tsx              # Root component
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Static assets
│   ├── package.json             # Dependencies
│   └── start-app.bat            # Windows startup script
├── README.md                     # This file
└── LICENSE                       # Project license
```

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd Knowledge-Graph

# Install dependencies
cd app
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📈 Use Cases

### For Job Seekers
- **Skill Gap Analysis**: Visualize your skills vs. job requirements
- **Career Path Planning**: See potential career trajectories
- **Network Mapping**: Identify key connections in your industry
- **Learning Roadmap**: Plan skill development strategically

### For Recruiters & HR
- **Candidate Matching**: Visual skill-to-requirement mapping
- **Team Composition**: Analyze skill distribution and gaps
- **Succession Planning**: Map career progression paths
- **Training Needs**: Identify skill development priorities

### For Career Coaches
- **Client Assessment**: Visual representation of client capabilities
- **Goal Setting**: Map realistic career objectives
- **Progress Tracking**: Monitor skill development over time
- **Market Analysis**: Understand industry skill demands

## 🎨 Data Format

### Nodes CSV (Skills, Companies, People, etc.)
```csv
id,name,type,source,start,end,confidence
skill_1,Python,Skill,resume.pdf,2020-01,2023-12,0.9
company_1,Google,Company,linkedin.pdf,,,0.8
person_1,John Doe,Person,resume.pdf,2020-01,2023-12,0.95
```

### Edges CSV (Relationships)
```csv
source,target,relation,source_file,confidence
skill_1,skill_2,prerequisite,resume.pdf,0.8
person_1,company_1,works_at,linkedin.pdf,0.9
skill_1,job_1,required_for,job_posting.pdf,0.85
```

## 🚧 Current Limitations (Alpha)

- **Data Persistence**: No database storage yet
- **User Accounts**: No authentication system
- **Collaboration**: Single-user only
- **Advanced Analytics**: Basic filtering and search
- **Mobile Optimization**: Desktop-focused interface

## 🔮 Roadmap

### Phase 2 (Beta)
- [ ] User authentication and profiles
- [ ] Cloud data storage
- [ ] Advanced graph algorithms
- [ ] Job posting integration
- [ ] Skill recommendation engine

### Phase 3 (Release)
- [ ] Multi-user collaboration
- [ ] API for third-party integrations
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Enterprise features

## 🤝 Contributing

This is an experimental project exploring new approaches to job searching. Contributions are welcome!

### Areas of Interest
- **Graph Algorithms**: Improve visualization and analysis
- **Data Processing**: Enhance CSV parsing and validation
- **UI/UX**: Better user experience and accessibility
- **Integration**: Connect with job boards and career platforms
- **Analytics**: Advanced insights and recommendations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React, TypeScript, and modern web technologies
- Inspired by research into knowledge graphs for career development
- Designed to explore the intersection of AI, data visualization, and job searching

---

**Note**: This is experimental software. Please provide feedback and report any issues you encounter while exploring knowledge graphs for job searching!
