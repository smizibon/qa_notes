# Source Code Directory

# Source Directory Context

This document provides an overview of the `src/` directory structure and the context documentation system used throughout this project.

## 🚨 CRITICAL: LLM Coding Ground Rules

Before modifying ANY code in this directory, LLMs MUST follow these principles:

1. ✅ **Always try to use reusable code first**
   - Search for existing functions/components before creating new ones
   - Use `grep_search` or `semantic_search` to find similar implementations
   - Check `utils/errorHandler.ts` for error handling utilities
   - Check `components/` for reusable UI components

2. ✅ **Only create new functions if existing ones can't be reused**
   - Verify no similar function exists in utils/ or components/
   - Justify why existing code cannot be adapted

3. ✅ **Function creation must prioritize reusability**
   - Make functions generic with parameters (no hardcoding)
   - Use TypeScript generics for type safety
   - Write pure functions when possible
   - Document parameters and return types

4. ✅ **Always maintain proper error handling**
   - Use `loadJsonFile()` for JSON loading (has retry logic)
   - Use `ErrorHandler.handle()` or `ErrorHandler.handleWithRetry()` for async ops
   - Wrap component renders with try-catch + `<ErrorDisplay />`
   - Never let the app crash - provide graceful fallbacks

5. ✅ **Always update CONTEXT.md after confirming stability**
   - Make changes → Test app → Confirm stable → Update CONTEXT.md
   - Document new functions, components, patterns
   - Mark TODO tasks as ✅ COMPLETED with date
   - Update compliance scores if improved
   - **This is MANDATORY** - part of the development workflow

**See PROJECT_CONTEXT.md for detailed examples and anti-patterns.**

## Overall Codebase Compliance: 92% ✅

| Directory | Score | Status | Last Updated |
|-----------|-------|--------|--------------|
| `components/` | 90% | ✅ Excellent | Stable |
| `utils/` | 95% | ✅ Excellent | Dec 24, 2025 |
| `pages/` | 95% | ✅ Excellent | Dec 24, 2025 ⬆️ |
| `data/` | 100% | ✅ Perfect | Stable |

**Recent Improvements**:
- ✅ Dec 24, 2025: Created `contentLoader.ts` utility
- ✅ Dec 24, 2025: Refactored Lessons.tsx (60% → 95%)
- ✅ 94% code reduction (48 lines → 3 lines)

**No critical issues** - Codebase ready for scaling to 9 topics

## Purpose

The `src/` directory contains all application source code organized into logical subdirectories. Each major subdirectory has its own `CONTEXT.md` file that provides detailed information about the files and patterns within that directory.

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
