# Source Code Directory

This directory contains all the React application source code organized by functionality.

## 📁 Directory Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Main page components (routes)
├── data/           # JSON content files for lessons
├── utils/          # Utility functions and helpers
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🔄 Context Documentation

Each subdirectory contains a `CONTEXT.md` file that explains:
- Purpose and responsibility of that folder
- Key files and their roles
- Common patterns and conventions
- Dependencies and imports
- When and how to modify files

## ⚠️ Critical Rules

### 1. **Always Update Context Docs**
When you modify stable code:
1. Update the relevant `CONTEXT.md` in the folder
2. Update `PROJECT_CONTEXT.md` in root if architecture changes
3. Document new patterns, components, or utilities

### 2. **Read Context First**
Before making changes:
1. Read the folder's `CONTEXT.md`
2. Understand existing patterns
3. Follow established conventions
4. Maintain consistency

### 3. **Context Update Triggers**
Update docs when:
- ✅ Adding new components/pages
- ✅ Changing component APIs
- ✅ Adding new utilities
- ✅ Modifying data structures
- ✅ Implementing new patterns
- ✅ Fixing major bugs
- ❌ NOT for minor typo fixes or style tweaks

## 📋 Documentation Standards

### Context File Structure
```markdown
# Folder Name

## Purpose
[What this folder does]

## Key Files
[List important files with brief descriptions]

## Patterns & Conventions
[Common patterns used here]

## Dependencies
[What this folder depends on]

## How to Modify
[Step-by-step guide for common changes]

## Related Docs
[Links to other relevant context files]
```

## 🚀 Quick Start for LLMs

1. **Start with `PROJECT_CONTEXT.md`** - Get overall architecture
2. **Navigate to relevant folder** - Read `CONTEXT.md`
3. **Review key files** - Understand implementation
4. **Make changes** - Follow patterns
5. **Update docs** - Keep context current

## 📊 Current State

- **Components**: Fully documented with error handling patterns
- **Pages**: Main pages documented with routing logic
- **Data**: JSON schema and structure documented
- **Utils**: Error handling library fully documented

## 🎯 For AI Editors

When you're asked to:
- **Add a component** → Read `src/components/CONTEXT.md`
- **Create a page** → Read `src/pages/CONTEXT.md`
- **Add content** → Read `src/data/CONTEXT.md`
- **Create utility** → Read `src/utils/CONTEXT.md`

This ensures you understand patterns before coding!
