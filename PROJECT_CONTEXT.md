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

## 🏷️ Test ID Catalog
- **Pattern**: `component-element-type` (kebab-case). Keep IDs stable for automation.
- **Pages (roots)**:
  - `home-page`, `lessons-page`, `watch-page`, `links-page`, `examples-page`, `details-page`, `about-me-page`
- **Links Page (controls)**:
  - `links-controls-toggle`, `links-categories-panel`, `links-categories-collapse`, `links-categories-clear`, `links-category-chip-*`
  - `links-refresh-button`, `links-view-grid-button`, `links-view-list-button`, `links-search-input`, `links-search-clear`
- **Links Page (cards)**:
  - `open-link-card-*`, `select-link-*`, `copy-link-*`, `open-link-*`
  - Bulk bar: `links-selection-bar`, `links-selected-count`, `links-copy-all-button`, `links-clear-selection-button`
- **Code Blocks**:
  - `code-block`, `code-block-title`, `code-block-content`

## 🎨 Design Tokens & UI Style Guide
- **Base panel**: `bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl`
- **Card accent**: `hover:border-blue-500/30`, active: `ring-2 ring-blue-500 bg-blue-500/10`
- **Icon chips**: `bg-blue-500/10 border border-blue-500/20 text-blue-400`
- **Interactive button (default)**: `p-2 bg-slate-700/30 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all`
- **Primary action**: `bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20`
- **Success feedback**: `bg-green-500 text-white shadow-lg shadow-green-500/20`
- **Press animation**: `active:scale-95` on clickable elements
- Keep spacing compact (`gap-2`/`gap-3`) and radii consistent (`rounded-lg`/`rounded-2xl`)

## ✅ Typecheck & Docs Update Checklist
1. Run type check/build: `npm run build` (or `tsc` if configured)
2. Verify required `data-testid` presence on new/edited elements
3. Update relevant context docs:
   - `PROJECT_CONTEXT.md` (rules, catalogs, style guide)
   - `src/{folder}/CONTEXT.md` (implementation changes)
4. Smoke-test in browser; verify layout and interactions
5. Commit with clear message summarizing user-facing changes and doc updates

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
**Last Updated**: 2025-12-25 | **Version**: 2.6.0
