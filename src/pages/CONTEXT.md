# Pages Directory

## 🚨 Code Quality Issues Found

### ❌ Issue #1: Massive Code Duplication in Lessons.tsx (HIGH PRIORITY)

**Location**: Lines 170-223  
**Severity**: 🔴 Critical - Violates reusability principle  
**Compliance Score**: 60%

**Problem**: 48 nearly identical lines creating import maps:
```typescript
'getting-started.json': () => loadJsonFile('/src/data/typescript/lessons/getting-started.json'),
'basic-types.json': () => loadJsonFile('/src/data/typescript/lessons/basic-types.json'),
// ... repeated 46 more times across 3 maps (LESSON_IMPORTS, CHEATSHEET_IMPORTS, EXAMPLES_IMPORTS)
```

**Impact**: 
- Violates "Always try to use reusable code" principle
- Hard to maintain (3 separate maps)
- Not scalable for 9 planned topics (will become 144 lines)
- Hardcoded topic name ("typescript")

**TODO - Refactoring Task**:
Create `src/utils/contentLoader.ts`:
```typescript
export function createContentImports(
  topic: string,
  contentType: 'lessons' | 'cheatsheet' | 'examples',
  fileNames: string[]
): Record<string, () => Promise<any>> {
  return fileNames.reduce((acc, fileName) => {
    acc[fileName] = () => loadJsonFile(`/src/data/${topic}/${contentType}/${fileName}`);
    return acc;
  }, {} as Record<string, () => Promise<any>>);
}

// Usage in Lessons.tsx:
const fileNames = ['getting-started.json', 'basic-types.json', ...];
const LESSON_IMPORTS = createContentImports('typescript', 'lessons', fileNames);
const CHEATSHEET_IMPORTS = createContentImports('typescript', 'cheatsheet', fileNames);
const EXAMPLES_IMPORTS = createContentImports('typescript', 'examples', fileNames);
```

**Estimated Effort**: 2 hours  
**Priority**: Complete BEFORE adding new topics  
**Benefit**: Reduces 144 lines to ~25 lines + reusable utility

### ✅ Good Practices Found (95% Compliance):

1. **Error Handling**: All render functions wrapped with try-catch ✅
2. **ErrorDisplay Usage**: Consistent error UI across all tabs ✅
3. **loadJsonFile**: Using centralized error-handling utility ✅
4. **Type Safety**: TypeScript interfaces for all data structures ✅
5. **Error Boundaries**: Lines 813, 870, 928 properly implemented ✅

## Purpose
Top-level page components that represent different views/routes in the application. Pages orchestrate data loading, state management, and render child components.

## Key Files

### **`Lessons.tsx`** (1100+ lines)
**Purpose**: Multi-topic lesson browser with 3-tab interface (Lesson | Cheatsheet | Examples)

**Features**:
- Dynamic content loading for 16 TypeScript lessons
- Progress tracking with completion status
- Error boundaries on all render functions
- Sidebar curriculum navigation
- Tab-based content switching

**State**:
- `selectedLesson` - Currently displayed lesson
- `activeTab` - Which tab is active (lesson/cheatsheet/examples)
- `lessonContent`, `cheatsheetContent`, `examplesContent` - Loaded JSON data
- `completedLessons` - Set of completed lesson IDs
- `isLoading` - Loading state
- `error` - Error state (AppError | null)

**Props**:
- `selectedTopic` - Which topic is selected (e.g., 'typescript')

**Content Loading**:
Uses centralized `loadJsonFile` from error handler:
```typescript
const LESSON_IMPORTS: Record<string, () => Promise<any>> = {
  'getting-started.json': () => loadJsonFile('/src/data/typescript/lessons/getting-started.json'),
  // ... 15 more
};
```

**Render Functions**:
All wrapped in try-catch with `ErrorDisplay`:
- `renderLessonContent()` - Renders lesson sections
- `renderCheatsheetContent()` - Renders cheatsheet 
- `renderExamplesContent()` - Renders examples

**Supported JSON Fields** (20+):
- Basic: `title`, `description`, `content`, `explanation`
- Examples: `example`, `examples`, `code`, `codeBlocks`
- Lists: `keyPoints`, `benefits`, `steps`, `practices`
- Special: `quick_ref`, `tips`, `shortcuts`, `commands`, `resources`
- Blocks: `problem`, `solution`, `analogy`, `note`, `warning`

### **`Home.tsx`**
**Purpose**: Landing page with overview and call-to-action

**Features**:
- Hero section with gradient title
- Feature showcase
- Topic overview cards
- Getting started guide

**State**: None (stateless)

**Props**: None

---

## Page Architecture

### Data Flow Pattern
```
User Action → Page Component → Load Data → Update State → Render UI
                  ↓                ↓            ↓            ↓
              Props/State    Error Handler   setState()   Components
```

### Error Handling Pattern
All pages use centralized error handling:
```typescript
const loadContent = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { data, error } = await loadJsonFile('/path/to/file.json');
    if (error) throw error;
    setContent(data);
  } catch (err) {
    const appError = err instanceof AppError ? err : new AppError(
      err.message,
      ErrorType.NETWORK
    );
    setError(appError);
  } finally {
    setIsLoading(false);
  }
};
```

### Loading States Pattern
```typescript
{!selectedLesson ? (
  <EmptyState />
) : isLoading ? (
  <LoadingState />
) : error ? (
  <ErrorDisplay error={error} onRetry={retry} />
) : (
  <Content />
)}
```

---

## Lessons Page Deep Dive

### Content Structure
Each lesson has 3 types of content loaded in parallel:
1. **Lesson** - Detailed tutorial with sections
2. **Cheatsheet** - Quick reference with code blocks
3. **Examples** - Practical code examples

### Import Maps
Three separate maps for each content type:
```typescript
const LESSON_IMPORTS: Record<string, () => Promise<any>>;
const CHEATSHEET_IMPORTS: Record<string, () => Promise<any>>;
const EXAMPLES_IMPORTS: Record<string, () => Promise<any>>;
```

### Load All Content Function
```typescript
const loadAllContent = async (lesson: LessonMetadata) => {
  // 1. Validate files exist
  // 2. Load in parallel
  // 3. Check for errors
  // 4. Update state
  // 5. Handle errors with AppError
};
```

### Render Pipeline
```
JSON Data → Render Function → Try-Catch → Error Display | Content
    ↓            ↓                ↓              ↓           ↓
  Sections   Map Fields    Catch Errors    Show Error   Show UI
```

### Field Rendering
The render functions handle 20+ field types dynamically:

**Text Fields**:
- `content`, `description`, `explanation`, `analogy`

**Code Fields**:
- `code`, `example.code`, `codeBlocks[]`

**List Fields**:
- `keyPoints[]`, `benefits[]`, `steps[]`, `practices[]`

**Special Fields**:
- `quick_ref[]` - Syntax + description pairs
- `tips[]` - Quick tips
- `shortcuts[]` - Keyboard shortcuts (mac/win)
- `commands[]` - CLI commands
- `resources[]` - External links
- `mistakes[]` - Common mistakes with fixes

**Problem/Solution Pattern**:
```typescript
if (section.problem && section.solution) {
  // Render problem block
  // Render solution block with benefits
}
```

### Progress Tracking
```typescript
const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

const markComplete = (lessonId: string) => {
  setCompletedLessons(prev => new Set([...prev, lessonId]));
};
```

---

## How to Add a New Page

### Step 1: Create the file
```bash
touch src/pages/NewPage.tsx
```

### Step 2: Set up page structure
```typescript
import { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';
import ErrorDisplay from '../components/ErrorDisplay';
import { loadJsonFile, AppError, ErrorType } from '../utils/errorHandler';

interface NewPageProps {
  // Props from App.tsx
}

export default function NewPage({ }: NewPageProps) {
  // State
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await loadJsonFile('/path/to/data.json');
      if (error) {
        setError(error);
      } else {
        setData(data);
      }
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Render
  return (
    <div className="min-h-screen p-4 md:p-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <ErrorDisplay error={error} onRetry={loadData} />
      ) : (
        <div>{/* Content */}</div>
      )}
    </div>
  );
}
```

### Step 3: Add to App.tsx
```typescript
import NewPage from './pages/NewPage';

// In App.tsx return:
{activeTab === 'newpage' && <NewPage />}
```

### Step 4: Update Navigation
Add new tab/link in `Navigation.tsx`

### Step 5: Update this CONTEXT.md
Document the new page above.

---

## Common Modifications

### Adding a new lesson to Lessons.tsx

1. **Add JSON file**:
```bash
# Add to src/data/typescript/lessons/
touch new-topic.json
```

2. **Add to imports**:
```typescript
const LESSON_IMPORTS = {
  // ... existing
  'new-topic.json': () => loadJsonFile('/src/data/typescript/lessons/new-topic.json'),
};
```

3. **Add metadata**:
```typescript
const LESSONS: LessonMetadata[] = [
  // ... existing
  {
    id: 'new-topic',
    title: 'New Topic',
    description: 'Description',
    lessonFile: 'new-topic.json',
    cheatsheetFile: 'new-topic.json',
    examplesFile: 'new-topic.json'
  }
];
```

4. **Create corresponding cheatsheet and examples JSON files**

### Adding a new JSON field type

1. **Add to render function**:
```typescript
{/* New Field */}
{section.newField && (
  <div className="bg-color-500/10 rounded-xl p-4 mb-4">
    <h4 className="text-color-400 font-semibold mb-2">🎯 Title</h4>
    {/* Render content */}
  </div>
)}
```

2. **Update CONTEXT.md** with new field documentation

3. **Test with sample JSON** containing the new field

---

## Styling Patterns

### Page Layout
```typescript
<div className="min-h-screen p-4 md:p-8">
  <div className="max-w-7xl mx-auto">
    {/* Page content */}
  </div>
</div>
```

### Grid Layouts
```typescript
// Sidebar + Main Content
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  <div className="lg:col-span-1">{/* Sidebar */}</div>
  <div className="lg:col-span-3">{/* Main */}</div>
</div>
```

### Card Sections
```typescript
<div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
  {/* Content */}
</div>
```

---

## Performance Considerations

### Lazy Loading
- Content loaded on-demand (not on initial page load)
- Only active tab content is rendered
- Previous content cached in state

### Parallel Loading
```typescript
const [lesson, cheatsheet, examples] = await Promise.all([
  loadLesson(),
  loadCheatsheet(),
  loadExamples()
]);
```

### Memoization Opportunities
Consider `useMemo` for:
- Filtered/sorted lists
- Computed progress percentages
- Formatted content

### State Management
- Keep page state local (no Redux/Context needed yet)
- Use Sets for O(1) lookup (completedLessons)
- Clear state on unmount if needed

---

## Testing Guidelines

When modifying pages:

1. **Loading States**: Test with slow network
2. **Error States**: Test with invalid URLs, malformed JSON
3. **Empty States**: Test with no data
4. **Navigation**: Test tab switching, lesson selection
5. **Mobile**: Test responsive layout
6. **Accessibility**: Test keyboard navigation

---

## Troubleshooting

### Page not showing content
- Check if JSON files exist at specified paths
- Verify import maps have correct file names
- Check browser console for errors
- Verify error boundaries are working

### Content not rendering
- Check JSON structure matches expected schema
- Verify all field types are supported in render function
- Check for TypeScript errors in console

### Performance issues
- Check for unnecessary re-renders (use React DevTools)
- Verify data isn't being loaded repeatedly
- Check for large JSON files that need optimization

---

## Anti-Patterns

❌ **Don't** load all content upfront (lazy load)
❌ **Don't** ignore error states (always handle)
❌ **Don't** put complex logic in render functions
❌ **Don't** forget loading indicators
❌ **Don't** mix data fetching and UI rendering

✅ **Do** use error boundaries
✅ **Do** show loading states
✅ **Do** handle empty states gracefully
✅ **Do** keep pages focused on orchestration
✅ **Do** delegate rendering to components

---

## Related Documentation

- **`/src/components/CONTEXT.md`** - Reusable components
- **`/src/data/CONTEXT.md`** - JSON data structure
- **`/src/utils/CONTEXT.md`** - Error handling
- **`/PROJECT_CONTEXT.md`** - Overall architecture

---

**Last Updated**: December 24, 2025
**Maintainer**: Development Team
