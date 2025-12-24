# Source Directory (`src/`)

**Purpose**: Contains all application source code organized by responsibility.

## 📋 Quick Reference

**Ground Rules**: See `../PROJECT_CONTEXT.md` for complete LLM coding guidelines.

**Directory Summary**:

| Directory | Purpose | Files | Status |
|-----------|---------|-------|--------|
| **components/** | Reusable React UI components | Navigation, ErrorDisplay, Footer, etc. | ✅ Stable |
| **pages/** | Main route components | Home, Lessons, Examples, Details, AboutMe | ✅ Stable |
| **data/** | JSON content for 9 topics | TypeScript (complete), 8 others (planned) | ✅ Structured |
| **utils/** | Helper functions & error handling | errorHandler, contentLoader | ✅ Stable |
| **sections/** | Legacy section components | BasicTypes, Functions, etc. (deprecated) | ⚠️ Legacy |

**Last Updated**: December 24, 2025  
**Version**: 2.4.0  
**Overall Compliance**: 92%

##For Detailed Context:

- **components/CONTEXT.md** - All React components, props, patterns, test IDs
- **pages/CONTEXT.md** - Page components, routing, recent features
- **data/CONTEXT.md** - JSON data structure, topic organization
- **utils/CONTEXT.md** - Helper functions, error handling, contentLoader

## 📂 Key Files

**Entry Points**:
- `main.tsx` - Vite app entry, renders App component
- `App.tsx` - Root component, manages routing and state

**Sections** (Legacy):
- `sections/` - Old section-based components (pre-refactor)
- **Status**: Deprecated, replaced by dynamic Lessons page

## 🎯 For AI Editors

**Before modifying code**:
1. Read `../PROJECT_CONTEXT.md` for ground rules
2. Navigate to relevant folder's `CONTEXT.md` for details
3. Check existing patterns before creating new code
4. Update this file only for directory-level changes

**Update triggers**:
- ✅ Adding new src/ subdirectory
- ✅ Major architectural changes
- ❌ Individual file changes (update folder-level CONTEXT.md instead)
