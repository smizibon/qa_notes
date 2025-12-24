# QA Notes - Project Context for LLMs

## 🚨 CRITICAL: Documentation-First Development

### **LLM Coding Ground Rules**

When generating or modifying code in this project, LLMs MUST follow these principles:

1. ✅ **Always Try to Use Reusable Code**
   - Search for existing functions/components before creating new ones
   - Use `grep_search` or `semantic_search` to find similar implementations
   - Prefer composition over duplication

2. ✅ **Only Create New Functions When Necessary**
   - New functions should only be created if existing ones cannot be reused
   - Check `src/utils/` for utility functions before implementing
   - Review `src/components/` for UI components before creating new ones

3. ✅ **Function Creation Must Consider Reusability**
   - Make functions generic and parameterized
   - Avoid hardcoding values - use parameters instead
   - Write pure functions when possible (no side effects)
   - Add TypeScript interfaces/types for better reusability
   - Document parameters and return types clearly

4. ✅ **Always Maintain Error Handling Properly**
   - Use `ErrorHandler` from `src/utils/errorHandler.ts` for all async operations
   - Wrap component renders with try-catch and `ErrorDisplay`
   - Use `safeFetch()` for network requests (automatic retries)
   - Use `loadJsonFile()` for loading JSON with validation
   - Never let the app crash - always provide graceful fallbacks
   - Log errors with context for debugging

5. ✅ **Always Update CONTEXT.md Files After Confirming Stability**
   - After making changes and confirming the platform is stable (app runs without errors)
   - Update the relevant `CONTEXT.md` file in that directory
   - Update `PROJECT_CONTEXT.md` if architecture changes
   - Document new functions, components, or patterns added
   - Update compliance scores if code quality improved
   - Mark completed TODO tasks as ✅ COMPLETED with date
   - This is MANDATORY - not optional

**Example Workflow**:
```
1. Make code changes
2. Test app (npm run dev) - confirm no errors
3. ✅ Platform is stable
4. Update relevant CONTEXT.md files
5. Commit changes with updated documentation
```

**Context Update Triggers**:
- ✅ New utility functions added
- ✅ New components created
- ✅ Major refactoring completed
- ✅ Bug fixes that change behavior
- ✅ New patterns or conventions introduced
- ✅ TODO tasks completed
- ❌ NOT needed for minor typos or style tweaks

**Example of Good Practice**:
```typescript
// ✅ GOOD: Reusable, error-handled, generic function
import { loadJsonFile, ErrorType } from '../utils/errorHandler';

async function loadContent<T>(path: string, validator?: (data: any) => boolean) {
  const { data, error } = await loadJsonFile(path, validator);
  if (error) {
    return { content: null, error };
  }
  return { content: data as T, error: null };
}

// ✅ GOOD: Component with error boundary
try {
  return (
    <div>
      {content && <ContentDisplay data={content} />}
    </div>
  );
} catch (err) {
  return <ErrorDisplay error={err} compact />;
}
```

**Example of Bad Practice**:
```typescript
// ❌ BAD: Not reusable, no error handling, hardcoded
async function loadTypeScriptLesson() {
  const response = await fetch('/src/data/typescript/lessons/lesson1.json');
  const data = await response.json(); // No error handling!
  return data;
}

// ❌ BAD: Component without error boundary
return (
  <div>
    {content.sections.map(section => ( // Will crash if content is null!
      <div>{section.title}</div>
    ))}
  </div>
);
```

### Context Documentation System

This project uses **hierarchical context documentation** to help LLMs understand the codebase efficiently:

- **`PROJECT_CONTEXT.md`** (this file) - Overall architecture, high-level patterns
- **`src/CONTEXT.md`** - Source directory overview
- **`src/components/CONTEXT.md`** - Component patterns and conventions
- **`src/pages/CONTEXT.md`** - Page architecture and routing
- **`src/utils/CONTEXT.md`** - Utility functions and error handling
- **`src/data/CONTEXT.md`** - JSON schema and content guidelines

### **PRIMARY RULE: Always Update Context Docs**

When you modify **stable code** (not experiments or WIP):

1. ✅ **Update the relevant `CONTEXT.md` file** in that folder
2. ✅ **Update this `PROJECT_CONTEXT.md`** if architecture changes
3. ✅ **Document new patterns, components, or utilities**
4. ✅ **Keep examples current with actual code**

**Context update triggers**:
- ✅ Adding new components/pages/utilities
- ✅ Changing component APIs or signatures  
- ✅ Adding new data structures or JSON fields
- ✅ Implementing new architectural patterns
- ✅ Fixing major bugs that change behavior
- ❌ NOT needed for minor typos or style tweaks

### How to Use This System (For LLMs)

**Before coding**:
1. Read `PROJECT_CONTEXT.md` - Get overall picture
2. Navigate to relevant folder's `CONTEXT.md` - Understand patterns
3. Review key files - See implementation details

**After coding**:
1. Update relevant `CONTEXT.md` - Document changes
2. Update `PROJECT_CONTEXT.md` if needed - Keep high-level accurate
3. Keep examples and patterns current

**Benefits**:
- 📊 Faster context loading (targeted reading)
- 🎯 Better understanding of patterns
- 🔄 Consistency across codebase
- 📝 Self-documenting architecture
- 🤖 More accurate AI suggestions

---

## Project Overview

This is a **personal QA revision platform** designed for QA Engineers to prepare for interviews. It covers 9 comprehensive topics: TypeScript, Test Cases, API Testing, Playwright, Appium, CI/CD, Docker, N8N, and LLM Testing.

### Core Purpose
- **Interview Preparation**: Quick revision before QA interviews
- **Multi-Topic Coverage**: All essential QA engineering skills in one place
- **Structured Learning**: Lessons → Cheatsheet → Examples for each topic
- **Progress Tracking**: Mark completed topics and track learning
- **Modern UI**: Glassmorphism design with mega menu navigation

## Architecture

### Technology Stack
- **Frontend Framework**: React 18.2.0 with TypeScript 5.0.0
- **Build Tool**: Vite 4.5.14 (fast HMR and optimized builds)
- **Styling**: Tailwind CSS via CDN (no build step needed)
- **Icons**: Lucide React 0.263.1
- **Routing**: Client-side state-based routing (no React Router)

### Project Structure

```
qa_notes/
├── src/
│   ├── App.tsx                 # Main app with state-based routing
│   ├── main.tsx               # Entry point
│   │
│   ├── components/            # Reusable UI components
│   │   ├── Navigation.tsx     # Mega menu with 9 topics
│   │   └── CodeBlock.tsx      # Syntax highlighting
│   │
│   ├── pages/                 # Main pages
│   │   ├── Home.tsx           # Landing page
│   │   ├── Lessons.tsx        # Multi-topic lesson browser
│   │   └── Details.tsx        # About page
│   │
│   └── data/                  # Learning content (JSON)
│       ├── typescript/        # ✅ Complete (48 files)
│       │   ├── lessons/       # 16 detailed lessons
│       │   ├── cheatsheet/    # 16 quick references
│       │   └── examples/      # 16 practical examples
│       ├── test-cases/        # 🚧 Planned
│       ├── api-testing/       # 🚧 Planned
│       ├── playwright/        # 🚧 Planned
│       ├── appium/            # 🚧 Planned
│       ├── cicd/              # 🚧 Planned
│       ├── docker/            # 🚧 Planned
│       ├── n8n/               # 🚧 Planned
│       └── llm-testing/       # 🚧 Planned
│
├── DATA_STRUCTURE.md          # Detailed folder structure
├── index.html                 # HTML with Tailwind CDN
└── package.json              # Dependencies
```

## Key Features

### 1. Navigation System
- **Mega Menu**: Hover-enabled dropdown showing all 9 QA topics
- **Topic Icons**: Each topic has custom Lucide icon and color
- **Status Badges**: ✓ for complete topics, "Soon" for planned
- **Mobile Responsive**: Accordion menu with all topics listed
- **Sticky Header**: Navigation stays at top during scroll
- **Dynamic Links**: External resource links loaded from JSON with tooltips
- **3 Main Pages**: Home, Topics (via mega menu), Links

### 2. Multi-Topic System
**Location**: `src/pages/Lessons.tsx` + `src/data/[topic]/*.json`

**Current Topics**:
1. **TypeScript** ✅ - Complete (16 lessons, 16 cheatsheets, 16 examples)
2. **Test Cases** 🚧 - Planned
3. **API Testing** 🚧 - Planned
4. **Playwright** 🚧 - Planned
5. **Appium** 🚧 - Planned
6. **CI/CD** 🚧 - Planned
7. **Docker** 🚧 - Planned
8. **N8N** 🚧 - Planned
9. **LLM Testing** 🚧 - Planned

**Features**:
- 3-tab structure per topic: Lesson | Cheatsheet | Examples
- Progress tracking per topic
- Sidebar curriculum with lesson numbers
- Mark-as-complete functionality
- Dynamic content loading via switch statement

**Lesson Structure** (JSON format):
```json
{
  "id": "lesson-id",
  "title": "Lesson Title",
  "description": "Brief description",
  "sections": [
    {
      "title": "Section Title",
      "content": "Main explanation text",
      "analogy": "Real-world comparison for clarity",
      "example": {...},       // Single example object
      "examples": [...],       // Multiple examples array
      "keyPoints": [...],      // Bullet points
      "benefits": [...],       // Why it matters
      "whenToUse": "...",     // String or array of use cases
      "problem": {...},        // Problem/solution pattern
      "solution": {...},       // Solution with benefits
      "practices": [...],      // Best practices array
      "mistakes": [...],       // Common mistakes with fixes
      "quick_ref": [...],      // Quick reference items (syntax + desc)
      "tips": [...],           // Quick tips array
      "shortcuts": [...],      // Keyboard shortcuts
      "commands": [...],       // CLI commands
      "resources": [...],      // External links
      "note": "..."           // Important note
    }
  ]
}
```

**Lesson Loading Pattern**:
```typescript
// Using fetch API to avoid Vite dynamic import issues
const fetchJsonFile = async (path: string) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return { default: await response.json() };
};

// Topic-based imports map
const LESSON_IMPORTS: Record<string, () => Promise<any>> = {
  'getting-started.json': () => fetchJsonFile('/src/data/typescript/lessons/getting-started.json'),
  // ... 15 more entries
};
```

### 3. Error Handling System
**Location**: `src/utils/errorHandler.ts` + `src/components/ErrorDisplay.tsx`

**Centralized Error Management**:
- **ErrorHandler**: Main error handling class with sync and async support
- **ErrorLogger**: Consistent logging with context tracking
- **AppError**: Custom error class with types and metadata
- **safeFetch**: Wrapped fetch with automatic retries
- **loadJsonFile**: JSON loader with validation support

**Error Types**:
- `NETWORK` - Connection and HTTP errors
- `PARSE` - JSON parsing failures
- `VALIDATION` - Data validation errors
- `RENDER` - React component rendering errors
- `NOT_FOUND` - Missing resources
- `UNKNOWN` - Unexpected errors

**Features**:
- Automatic retry logic for network failures (up to 3 attempts)
- Graceful error display with retry buttons
- Detailed console logging with stack traces
- User-friendly error messages with icons
- Error context tracking for debugging
- Compact and full error display modes

**Error Boundary Pattern**:
```typescript
try {
  return (<div>...content...</div>);
} catch (err) {
  const error = err instanceof AppError ? err : new AppError(
    err instanceof Error ? err.message : String(err),
    ErrorType.RENDER,
    { contentType: 'lesson' }
  );
  return <ErrorDisplay error={error} compact />;
}
```

**Usage Example**:
```typescript
// Async with retry
const { data, error } = await ErrorHandler.handleWithRetry(
  () => fetch('/api/data'),
  'ComponentName',
  3 // max retries
);

// JSON loading with validation
const { data, error } = await loadJsonFile('/path/to/file.json', (data) => {
  return data.hasOwnProperty('id') && data.hasOwnProperty('title');
});
```

**Benefits**:
- App never crashes - always shows error UI
- Consistent error experience across all components
- Easy to add error handling to new features
- Automatic logging for debugging
- Retry mechanism improves reliability

### 4. Cheatsheet System
**Location**: `src/pages/Cheatsheet.tsx` + `src/sections/*.tsx` + `src/data/cheatsheet/*.json`

**Features**:
- All 16 topics in one scrollable page
- Expandable/collapsible sections
- Quick syntax reference
- Code examples with explanations
- Tips and best practices

**Data Flow**:
1. `Cheatsheet.tsx` imports all 16 section components
2. Each section component imports its JSON data
3. Sections use `ExpandableSection` wrapper for collapse functionality
4. State managed in App.tsx: `expandedSections` object

### 5. Design System

**Color Palette**:
- **Backgrounds**: slate-950, slate-900, slate-850, slate-800
- **Accents**: blue-400, blue-500, cyan-400, cyan-500
- **Text**: white (headings), slate-300 (body), slate-400 (muted)
- **Borders**: slate-700/50 (semi-transparent)

**Visual Effects**:
- **Glassmorphism**: `backdrop-blur-xl` with semi-transparent backgrounds
- **Gradients**: `bg-gradient-to-r from-blue-400 to-cyan-400`
- **Shadows**: `shadow-2xl` with colored glows (`shadow-blue-500/20`)
- **Animations**: `hover:scale-105`, `transition-all duration-300`
- **Rounded corners**: `rounded-2xl`, `rounded-3xl`

**Component Patterns**:
```tsx
// Typical card component
<div className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 
                border border-slate-700/50 shadow-2xl 
                hover:shadow-blue-500/10 transition-all duration-300">
```

### 6. Responsive Design
- **Desktop**: Full navigation, all features visible
- **Tablet**: Adjusted spacing and layout
- **Mobile**: Hamburger menu, stacked layout, simplified navigation

## Data Architecture

### Dynamic Links System
**Location**: `src/data/links/links.json`

**Purpose**: Centralized external resource links with tooltips

**Structure**:
```json
{
  "links": [
    {
      "name": "TypeScript Handbook",
      "url": "https://www.typescriptlang.org/docs/handbook/",
      "tooltip": "Official TypeScript documentation and guides"
    }
  ]
}
```

**Features**:
- Add links by editing JSON only (no code changes)
- Tooltips on hover for context
- Opens in new tab with security attributes
- Styled dropdown in navigation

### 16 Core Topics
All content (cheatsheet + lessons) covers these topics in order:

1. **Getting Started** - Installation, setup, first program
2. **Basic Types** - string, number, boolean, arrays, tuples, any, unknown
3. **Type Inference** - How TypeScript infers types automatically
4. **Functions** - Parameters, return types, overloads, rest parameters
5. **Interfaces** - Object shapes, optional properties, readonly, extension
6. **Type Aliases** - Creating custom type names, unions, intersections
7. **Classes** - OOP, access modifiers, inheritance, abstract classes
8. **Generics** - Type parameters, constraints, generic functions/classes
9. **Enums** - Numeric and string enums, const enums
10. **Type Guards** - typeof, instanceof, custom guards, discriminated unions
11. **Utility Types** - Partial, Required, Pick, Omit, Record, etc.
12. **Advanced Patterns** - Conditional types, mapped types, template literals, infer
13. **TSConfig** - Compiler options, strict mode, module resolution
14. **Common Patterns** - Builder, factory, repository, result types
15. **Common Errors** - Understanding and fixing TypeScript errors
16. **Quick Reference** - Fast syntax lookup and cheat sheet

### JSON Data Structure

**Cheatsheet JSON** (brief reference):
```json
{
  "id": "topic-id",
  "title": "Topic Name",
  "explanation": "Brief overview",
  "codeBlocks": [
    {
      "title": "Example Title",
      "code": "TypeScript code",
      "description": "What it does"
    }
  ],
  "tip": "Best practice or important note"
}
```

**Lessons JSON** (comprehensive tutorial):
```json
{
  "id": "lesson-id",
  "title": "Full Title",
  "description": "What you'll learn",
  "sections": [
    {
      "title": "Section name",
      "content": "Detailed explanation (200-400 words)",
      "analogy": "Real-world comparison",
      "example": { "code": "...", "explanation": "..." },
      "examples": [...],  // Array of multiple examples
      "keyPoints": ["Point 1", "Point 2"],
      "benefits": ["Benefit 1", "Benefit 2"],
      "practices": [...],  // Best practices
      "mistakes": [...]    // Common mistakes to avoid
    }
  ]
}
```

## State Management

### App-Level State (`App.tsx`)
```typescript
const [activeTab, setActiveTab] = useState('home');
const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
```

### Lessons-Level State (`Lessons.tsx`)
```typescript
const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
const [lessonContent, setLessonContent] = useState<any>(null);
const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
```

### State Flow
1. User clicks navigation → Updates `activeTab` in App
2. App renders corresponding page based on `activeTab`
3. User clicks lesson → Loads JSON, updates `selectedLesson`
4. User marks complete → Adds to `completedLessons` Set
5. Progress bar updates based on Set size

## Educational Approach

### Pedagogy Principles
1. **Zero Assumptions**: Assumes no prior TypeScript knowledge
2. **Analogies First**: Every complex concept explained with real-world comparison
3. **Why Before How**: Explains motivation before syntax
4. **Progressive Complexity**: Each lesson builds on previous ones
5. **Practical Examples**: Every concept with working code
6. **Common Mistakes**: Highlights what beginners typically get wrong
7. **Best Practices**: Professional patterns emphasized throughout

### Content Structure Pattern
Each lesson section follows this flow:
1. **What is it?** - Simple definition
2. **Why do we need it?** - Real problem it solves
3. **Analogy** - Real-world comparison
4. **How it works** - Detailed explanation
5. **Syntax** - Code examples with explanations
6. **Common mistakes** - What to avoid
7. **Best practices** - Professional recommendations

### Example: Type Guards Lesson Structure
```
1. What Are Type Guards? 
   → Runtime checks that help TypeScript narrow types
   
2. Analogy
   → Like showing passport at airport security
   
3. Problem without guards
   → Code example showing the issue
   
4. Solution with guards
   → typeof, instanceof, custom guards
   
5. Advanced patterns
   → Discriminated unions, assertion functions
   
6. Best practices
   → When to use each type of guard
```

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173 or 5174)
npm run build        # Production build
npm run preview      # Preview production build
```

### File Organization Rules
1. **Components**: Reusable UI, no data fetching
2. **Pages**: Top-level views, handle data loading
3. **Sections**: Topic-specific content, import JSON
4. **Data**: Static JSON content only

### Adding New Content

**To add a new lesson**:
1. Create `src/data/lessons/new-topic.json` with full structure
2. Add case to switch statement in `Lessons.tsx`
3. Add metadata to `lessons` array in `Lessons.tsx`
4. Create corresponding `src/sections/NewTopicSection.tsx`
5. Add to `src/data/cheatsheet/new-topic.json`
6. Import section in `Cheatsheet.tsx`

**To modify existing lesson**:
1. Edit JSON file directly in `src/data/lessons/`
2. Changes reflect immediately (hot reload)
3. No code changes needed

## Common Patterns

### Component Structure
```tsx
// Standard component pattern
import { Icon } from 'lucide-react';

interface ComponentProps {
  prop: string;
}

export default function Component({ prop }: ComponentProps) {
  return (
    <div className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 
                    border border-slate-700/50">
      {/* Content */}
    </div>
  );
}
```

### JSON Import Pattern
```tsx
// Section component pattern
import data from '../data/cheatsheet/topic.json';
import ExpandableSection from '../components/ExpandableSection';

export default function TopicSection() {
  return (
    <ExpandableSection id={data.id} title={data.title}>
      {/* Render data */}
    </ExpandableSection>
  );
}
```

### Dynamic Import (Lessons)
```tsx
// Must use explicit switch, not template literals
async function loadLesson(file: string) {
  let content;
  switch (file) {
    case 'topic.json':
      content = await import('../data/lessons/topic.json');
      break;
  }
  setLessonContent(content.default);
}
```

## Known Limitations & Workarounds

### 1. Dynamic Imports
**Issue**: Vite cannot analyze template literal imports
```typescript
// ✗ Doesn't work
await import(`../data/lessons/${file}`);

// ✓ Works
switch (file) {
  case 'topic.json': await import('../data/lessons/topic.json'); break;
}
```

### 2. TypeScript Module Resolution
**Issue**: Sometimes VS Code shows "Cannot find module" for valid imports
**Workaround**: Restart TS Server or reload VS Code window
**Note**: App compiles and runs fine despite editor warning

### 3. Tailwind Classes
**Setup**: Using CDN link in `index.html`, not PostCSS
**Limitation**: No custom theme, @apply, or config file
**Benefit**: Zero build configuration needed

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Lessons loaded on-demand (dynamic imports)
2. **Code Splitting**: Vite automatically splits by route
3. **JSON Size**: Each lesson ~500-1000 lines, loads fast
4. **No Heavy Dependencies**: Minimal bundle size
5. **CDN for Tailwind**: Browser-cached, no build overhead

### Bundle Size (approximate)
- React + ReactDOM: ~140KB
- TypeScript app code: ~100KB
- Lucide icons: ~50KB
- JSON data: ~200KB total (loaded on demand)
- **Total initial load**: ~300KB gzipped

## Troubleshooting Guide

### Common Issues

**Port already in use**
```bash
# Vite will automatically try next port (5174, 5175, etc.)
Port 5173 is in use, trying another one...
```

**Import errors in VS Code**
- Restart TypeScript Server: Cmd+Shift+P → "TypeScript: Restart TS Server"
- Reload window: Cmd+Shift+P → "Developer: Reload Window"

**Lesson not loading**
- Error boundaries will show detailed error message in red box
- Check browser console for detailed error with stack trace
- Verify JSON is valid (no trailing commas, proper quotes)
- Check that all field types used in JSON are supported by renderer
- Ensure arrays are actually arrays (use Array.isArray checks)

**Styles not applying**
- Verify Tailwind CDN link in `index.html`
- Check for typos in class names
- Use browser inspector to verify classes applied

## Testing Strategy

### Manual Testing Checklist
- [ ] All 16 lessons load without errors
- [ ] Progress tracking persists during session
- [ ] Navigation works on mobile and desktop
- [ ] All code examples render correctly
- [ ] Expandable sections expand/collapse
- [ ] External links open in new tabs
- [ ] Practice dropdown appears on hover
- [ ] Mark complete button works for all lessons
- [ ] Progress bar updates accurately

### Future Testing
- Add unit tests with Vitest
- Add E2E tests with Playwright
- Add accessibility testing
- Add TypeScript strict type checking validation

## Git Workflow

### Commit Message Format
```
<type>: <description>

Examples:
feat: Add type guards lesson with examples
fix: Resolve lesson loading issue in Lessons.tsx
docs: Update README with new lesson topics
style: Improve glassmorphism effects in navigation
refactor: Simplify lesson loading switch statement
```

### Branch Strategy
- `main`: Production-ready code
- Feature branches: Create for major changes
- Direct commits: OK for docs and small fixes

## Future Enhancements

### Planned Features
1. **Interactive Playground**: In-browser TypeScript compiler
2. **Exercises**: Practice problems with automated checking
3. **Video Integration**: Video explanations for each lesson
4. **Search**: Full-text search across all content
5. **Bookmarks**: Save favorite sections
6. **Dark/Light Toggle**: Theme switching
7. **Export**: Download lessons as PDF
8. **Community**: Comments and discussions
9. **Quizzes**: Test knowledge after each lesson
10. **Certificates**: Completion certificates

### Technical Debt
- Migrate from CDN Tailwind to PostCSS
- Add proper testing suite (unit tests with Vitest, E2E with Playwright)
- Implement proper state management (Zustand/Context for global state)
- Add loading states with skeleton screens
- Add proper accessibility (ARIA labels, keyboard navigation, screen reader support)

## For LLM Context

### When helping with this project:

**If asked to add content**:
1. Maintain beginner-friendly tone
2. Include real-world analogies
3. Provide code examples with explanations
4. Follow existing JSON structure
5. Add to both cheatsheet and lessons if major topic

**If asked to fix bugs**:
1. Check if it's a VS Code cache issue first
2. Verify the app actually runs (npm run dev)
3. Check browser console for real errors
4. Test on both desktop and mobile viewport

**If asked to improve UI**:
1. Maintain glassmorphism aesthetic
2. Keep dark theme consistency
3. Ensure mobile responsiveness
4. Use existing color palette
5. Add smooth transitions

**If asked about architecture**:
1. Explain current state-based routing
2. Note Vite import limitations
3. Clarify JSON data structure
4. Describe component hierarchy

### Key Files to Know
- `src/App.tsx` - Main routing logic
- `src/pages/Lessons.tsx` - Lesson system core
- `src/components/Navigation.tsx` - Navigation UI
- `src/data/lessons/*.json` - Lesson content
- `README.md` - User-facing documentation
- `PROJECT_CONTEXT.md` - This file (LLM context)

---

**Project Status**: ✅ Production Ready  
**Last Updated**: December 24, 2025  
**Version**: 2.0.0  
**Maintainer**: Learning Platform Team

**Recent Updates**:
- ✅ **Centralized Error Handling System** - ErrorHandler library with retry logic
- ✅ **ErrorDisplay Component** - Reusable error UI with compact and full modes
- ✅ **Automatic Retry Mechanism** - Network failures retry up to 3 times
- ✅ **Error Boundaries** - All render functions wrapped with try-catch
- ✅ **Graceful Degradation** - App continues working when sections fail
- ✅ **Comprehensive Logging** - Detailed error tracking with context
- ✅ **User-Friendly Messages** - Categorized errors with helpful icons
- ✅ **JSON Loading System** - Centralized loadJsonFile with validation
- ✅ **Navigation Error Handling** - Links load with fallback on failure
- ✅ **20+ JSON Field Types Support** - quick_ref, tips, shortcuts, commands, etc.
