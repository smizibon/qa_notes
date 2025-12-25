# 🧠 Root Context: QA Notes

## 🏗️ AI Documentation Hierarchy
1. **`PROJECT_CONTEXT.md`** (this): Global Arch, Ground Rules, Vision, Future Plans.
2. **`src/CONTEXT.md`**: Directory-to-responsibility mapping.
3. **`src/{folder}/CONTEXT.md`**: Implementation-level patterns & schemas.
4. **`src/data/{topic}/CONTEXT.md`**: Field-level JSON schemas.

## ⚖️ LLM Ground Rules (STRICT)
- **Reusable-First**: Scan `src/utils/` and `src/components/` before writing code.
- **Generic Logic**: Parametrize functions; avoid hardcoded magic values.
- **Error Safety**: Wrap async in `ErrorHandler`; use `ErrorDisplay` for UI. No crashes.
- **Testable UI**: Mandatory `data-testid="component-element-type"` (kebab-case) on all interactive elements.
- **Doc-First Update**: Update relevant `CONTEXT.md` files *after* verifying code stability.
- **Glassmorphism**: Match `slate-950` base, `backdrop-blur-xl`, and semi-transparent border styling.

## 🎯 Project Overview & Vision
A **personal QA revision platform** for interview preparation. 
- **Core Strategy**: 16-lesson progression (Basics → Advanced → Reference) per topic.
- **Content Types**: Lessons (Tutorials), Cheatsheets (Syntax), Examples (Code).
- **Design**: Modern Glassmorphism with mega-menu navigation.

### 📅 Topic Roadmap (Status)
| Topic | Status | Files |
| :--- | :--- | :--- |
| **TypeScript** | ✅ Complete | 48 files (16/16/16) |
| **LLM & AI** | 🚧 In Progress | Prompt Engineering section complete |
| **Test Cases** | 🚧 Planned | Content drafting |
| **API Testing** | 🚧 Planned | - |
| **Playwright** | 🚧 Planned | - |
| **Appium** | 🚧 Planned | - |
| **CI/CD** | 🚧 Planned | - |
| **Docker** | 🚧 Planned | - |
| **N8N** | 🚧 Planned | - |

### 🚀 Future Enhancements
- **Interactive Playground**: In-browser TS compiler.
- **Exercises**: Automated checking for practice problems.
- **Search**: Full-text search across all JSON content.
- **Quizzes**: Post-lesson knowledge checks.
- **Certificates**: Completion tracking & generation.

## 🛠️ Tech Stack & Architecture
- **Core**: React 18 (TypeScript 5) + Vite.
- **Styling**: Tailwind CSS (CDN-based - **no build step, no config**).
- **Icons**: Lucide React.
- **Routing**: Client-side state (no React Router).
- **Persistence**: `localStorage` (Watched videos, Lesson progress).
- **Data Fetching**: `loadJsonFile` utility with auto-retry and validation.

## 🗺️ Project Structure
```text
qa_notes/
├── src/
│   ├── components/     # Reusable UI (Nav, GlassCard, ErrorDisplay, CodeBlock)
│   ├── pages/          # Route views (Home, Lessons, Watch, AboutMe)
│   ├── data/           # Pure JSON content organized by topic
│   ├── utils/          # Core helpers (Error handling, JSON loader, content maps)
│   └── App.tsx         # Root state & Routing Switch
├── DATA_STRUCTURE.md   # Detailed folder map
└── PROJECT_CONTEXT.md  # Master AI Instruction
```

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
