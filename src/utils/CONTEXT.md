# Utils Directory

## 🚨 CRITICAL: Use These Utilities Before Writing New Code!

**LLMs: Before writing ANY async code or error handling, these utilities MUST be checked first:**

### Available Error Handling Utilities:

1. **`loadJsonFile<T>(path, validator?)`** ✅ USE FOR JSON
   - Automatic retry logic, error handling, validation
   - Returns `{ data, error }` pattern

2. **`safeFetch(url, options?)`** ✅ USE FOR API CALLS
   - Auto retries, response.ok check, JSON parsing
   - Returns `{ data, error }` pattern

3. **`ErrorHandler.handle()` / `handleWithRetry()`** ✅ USE FOR ASYNC OPS
   - Wraps async functions with error handling & retry

### ❌ DON'T: Manual fetch | ✅ DO: Use safeFetch()

## 🔄 Update This File After Adding Utilities

**MANDATORY**: When you create a new utility function:
1. Test the app to confirm stability
2. Add documentation here with:
   - Function name and purpose
   - Parameters and return type
   - Usage example
   - Add to "Available Utilities" section
3. Update compliance score if applicable
4. Commit with updated CONTEXT.md

**This ensures LLMs can discover and reuse your utilities!**

## ✅ Recently Added Utilities

### `contentLoader.ts` (Added December 24, 2025)

**Purpose**: Creates import maps for dynamic content loading across topics

**Functions**:
1. **`createContentImports(topic, contentType, fileNames)`**
   - Creates loader functions for a specific content type
   - Eliminates code duplication
   - Returns Record<string, () => Promise<any>>

2. **`createTopicImports(topic, fileNames)`**
   - Creates all three import maps at once
   - Returns { lessons, cheatsheet, examples }

**Exports**:
- `TYPESCRIPT_FILES` - Standard file names array
- `TYPESCRIPT_CHEATSHEET_FILES` - Cheatsheet specific files
- `TYPESCRIPT_EXAMPLES_FILES` - Examples specific files

**Usage**:
```typescript
import { createContentImports, TYPESCRIPT_FILES } from '../utils/contentLoader';

const LESSON_IMPORTS = createContentImports('typescript', 'lessons', TYPESCRIPT_FILES);
```

**Impact**: Reduced Lessons.tsx from 48 lines to 3 lines (94% reduction)

## 🔴 TODO: Missing Utility (High Priority)

**Task**: ~~Create `contentLoader.ts` utility~~ ✅ COMPLETED  
**Status**: ✅ Implemented December 24, 2025  
**Result**: Compliance improved from 60% → 95%

## Compliance Score: 95% (Excellent)

✅ All utilities follow reusability principles  
✅ Generic with TypeScript generics  
✅ Parameterized (no hardcoding)  
✅ Comprehensive error handling  
⚠️ Missing contentLoader utility (documented above)

## Purpose
Utility functions, helpers, and libraries that provide reusable functionality across the application. Currently focused on centralized error handling.

## Key Files

### **`errorHandler.ts`** (350+ lines)
The centralized error handling system for the entire application.

**Exports**:
- `ErrorType` - Enum of error categories
- `AppError` - Custom error class
- `ErrorLogger` - Logging utilities
- `ErrorHandler` - Main error handling class
- `ErrorMessages` - User-friendly error messages
- `getUserFriendlyError()` - Get display-ready error info
- `createErrorBoundaryHandler()` - React error boundary helper
- `safeFetch()` - Fetch wrapper with retry
- `loadJsonFile()` - JSON loader with validation

---

## Error Handling System

### Error Types
```typescript
enum ErrorType {
  NETWORK = 'NETWORK',      // Connection, HTTP errors
  PARSE = 'PARSE',          // JSON parsing failures
  VALIDATION = 'VALIDATION', // Data validation errors
  RENDER = 'RENDER',        // React rendering errors
  NOT_FOUND = 'NOT_FOUND',  // Missing resources
  UNKNOWN = 'UNKNOWN'       // Unexpected errors
}
```

### AppError Class
```typescript
class AppError extends Error {
  type: ErrorType;
  context?: Record<string, any>;
  timestamp: Date;
  
  constructor(message, type, context);
}
```

**Benefits**:
- Categorizes errors for better handling
- Stores context for debugging
- Timestamps for tracking
- Extends native Error for stack traces

### ErrorLogger
Provides consistent logging across the app:

```typescript
// Log any error
ErrorLogger.log(error, 'ComponentName.functionName');

// Log with context
ErrorLogger.logWithContext(
  'Failed to load data',
  ErrorType.NETWORK,
  'Lessons.loadContent',
  { userId: '123', attempt: 2 }
);
```

**Output**:
```json
{
  "timestamp": "2025-12-24T10:30:00.000Z",
  "location": "Lessons.loadContent",
  "message": "Failed to load data",
  "type": "NETWORK",
  "context": { "userId": "123", "attempt": 2 },
  "stack": "Error: Failed to load data\n  at ..."
}
```

### ErrorHandler Class

**Async handling with error capture**:
```typescript
const { data, error } = await ErrorHandler.handle<DataType>(
  async () => {
    const response = await fetch('/api/data');
    return response.json();
  },
  'MyComponent.loadData',
  ErrorType.NETWORK
);

if (error) {
  // Handle error
} else {
  // Use data
}
```

**Async handling with automatic retry**:
```typescript
const { data, error } = await ErrorHandler.handleWithRetry<DataType>(
  async () => fetch('/api/data').then(r => r.json()),
  'MyComponent.loadData',
  3,      // maxRetries
  1000    // retryDelay in ms
);
```

**Synchronous handling**:
```typescript
const { data, error } = ErrorHandler.handleSync<ParsedData>(
  () => {
    const parsed = parseComplexData(rawData);
    return processed;
  },
  'MyComponent.parseData',
  ErrorType.PARSE
);
```

### safeFetch()
Wrapped fetch with automatic retries and error handling:

```typescript
const { data, error } = await safeFetch<ResponseType>(
  '/api/endpoint',
  { method: 'POST', body: JSON.stringify(payload) }
);

if (error) {
  // Error is already an AppError with type NETWORK
  console.error(error.message);
} else {
  // data is parsed JSON
  console.log(data);
}
```

**Features**:
- Automatically retries on failure (2 times)
- Checks response.ok
- Parses JSON automatically
- Returns typed data or AppError
- Includes URL and status in error context

### loadJsonFile()
Specialized JSON file loader with validation:

```typescript
// Simple load
const { data, error } = await loadJsonFile<LessonData>(
  '/src/data/typescript/lessons/basics.json'
);

// With validation
const { data, error } = await loadJsonFile<LessonData>(
  '/src/data/typescript/lessons/basics.json',
  (data) => {
    return (
      data.hasOwnProperty('id') &&
      data.hasOwnProperty('title') &&
      Array.isArray(data.sections)
    );
  }
);
```

**Features**:
- Uses safeFetch internally (has retry)
- Optional custom validation
- Returns VALIDATION error if validation fails
- Returns typed data

### Error Messages
Predefined user-friendly messages for each error type:

```typescript
ErrorMessages[ErrorType.NETWORK] = {
  title: 'Connection Error',
  message: 'Unable to load content. Please check your internet connection and try again.',
  icon: '🌐',
};

ErrorMessages[ErrorType.PARSE] = {
  title: 'Data Error',
  message: 'The content data is malformed. Please contact support if this persists.',
  icon: '📋',
};

// ... etc for all types
```

### getUserFriendlyError()
Converts any error into display-ready format:

```typescript
const displayError = getUserFriendlyError(error);
// Returns:
// {
//   title: 'Connection Error',
//   message: 'Unable to load content...',
//   icon: '🌐',
//   details: 'HTTP 404: Not Found'
// }
```

Use this with `ErrorDisplay` component to show errors to users.

---

## Usage Patterns

### Pattern 1: Simple Async Load
```typescript
import { loadJsonFile, AppError } from '../utils/errorHandler';

const loadData = async () => {
  const { data, error } = await loadJsonFile('/path/to/file.json');
  
  if (error) {
    setError(error);
    return;
  }
  
  setData(data);
};
```

### Pattern 2: With Retry
```typescript
import { ErrorHandler, ErrorType } from '../utils/errorHandler';

const fetchWithRetry = async () => {
  const { data, error } = await ErrorHandler.handleWithRetry(
    () => fetch('/api/data').then(r => r.json()),
    'Component.fetch',
    3  // retry 3 times
  );
  
  if (error) {
    // Failed after 3 retries
    showError(error);
  } else {
    processData(data);
  }
};
```

### Pattern 3: Render Error Boundary
```typescript
import { ErrorType, AppError } from '../utils/errorHandler';
import ErrorDisplay from '../components/ErrorDisplay';

const renderContent = () => {
  try {
    return <div>{/* Complex rendering */}</div>;
  } catch (err) {
    const error = err instanceof AppError ? err : new AppError(
      err instanceof Error ? err.message : String(err),
      ErrorType.RENDER,
      { component: 'MyComponent' }
    );
    return <ErrorDisplay error={error} compact />;
  }
};
```

### Pattern 4: Custom Validation
```typescript
const loadWithValidation = async () => {
  const { data, error } = await loadJsonFile<LessonData>(
    '/path/to/lesson.json',
    (data) => {
      // Custom validation logic
      if (!data.id || !data.title) return false;
      if (!Array.isArray(data.sections)) return false;
      if (data.sections.length === 0) return false;
      return true;
    }
  );
  
  if (error?.type === ErrorType.VALIDATION) {
    console.error('Invalid lesson structure');
  }
};
```

---

## How to Add New Utilities

### Step 1: Create utility file
```bash
touch src/utils/newUtility.ts
```

### Step 2: Implement with types
```typescript
/**
 * Brief description of utility
 */
export function utilityFunction<T>(param: Type): ReturnType {
  // Implementation
}

// Add tests if complex
```

### Step 3: Add error handling
```typescript
import { ErrorHandler, ErrorType, AppError } from './errorHandler';

export async function riskyUtility<T>(): Promise<{ data: T | null; error: AppError | null }> {
  return ErrorHandler.handle<T>(
    async () => {
      // Risky operation
    },
    'utilityName',
    ErrorType.UNKNOWN
  );
}
```

### Step 4: Export from index (if created)
```typescript
// src/utils/index.ts
export * from './errorHandler';
export * from './newUtility';
```

### Step 5: Document in this file
Add to "Key Files" section above.

---

## Testing Utilities

### Testing errorHandler functions

```typescript
// Test AppError
const error = new AppError(
  'Test error',
  ErrorType.NETWORK,
  { test: true }
);

expect(error.type).toBe(ErrorType.NETWORK);
expect(error.context.test).toBe(true);

// Test ErrorHandler
const { data, error } = await ErrorHandler.handle(
  async () => { throw new Error('Test'); },
  'test',
  ErrorType.UNKNOWN
);

expect(error).not.toBeNull();
expect(error?.type).toBe(ErrorType.UNKNOWN);

// Test loadJsonFile
const { data, error } = await loadJsonFile('/invalid/path.json');
expect(error).not.toBeNull();
expect(error?.type).toBe(ErrorType.NETWORK);
```

---

## Best Practices

### ✅ Do's

1. **Always use error handling**
```typescript
// Good
const { data, error } = await loadJsonFile(path);

// Bad
const data = await fetch(path).then(r => r.json());
```

2. **Provide context**
```typescript
// Good
new AppError('Failed to load', ErrorType.NETWORK, {
  url: '/api/data',
  userId: user.id,
  timestamp: Date.now()
});

// Less helpful
new Error('Failed to load');
```

3. **Use appropriate error types**
```typescript
// Good
if (response.status === 404) {
  throw new AppError('Not found', ErrorType.NOT_FOUND);
}

// Less specific
throw new Error('Error');
```

4. **Log errors properly**
```typescript
// Good
ErrorLogger.log(error, 'Component.method');

// Less helpful
console.error(error);
```

### ❌ Don'ts

1. **Don't swallow errors**
```typescript
// Bad
try {
  await loadData();
} catch (err) {
  // Silently fail
}

// Good
try {
  await loadData();
} catch (err) {
  ErrorLogger.log(err, 'loadData');
  setError(err);
}
```

2. **Don't use raw fetch without safeFetch**
```typescript
// Bad
const data = await fetch(url).then(r => r.json());

// Good
const { data, error } = await safeFetch(url);
```

3. **Don't create errors without types**
```typescript
// Bad
throw new Error('Something failed');

// Good
throw new AppError('Something failed', ErrorType.VALIDATION);
```

---

## Extending Error Handling

### Adding a New Error Type

1. **Add to enum**:
```typescript
enum ErrorType {
  // ... existing
  NEW_TYPE = 'NEW_TYPE',
}
```

2. **Add user message**:
```typescript
ErrorMessages[ErrorType.NEW_TYPE] = {
  title: 'Title',
  message: 'User-friendly message',
  icon: '🎯',
};
```

3. **Use in code**:
```typescript
throw new AppError('Details', ErrorType.NEW_TYPE, context);
```

### Adding Retry Logic to Other Functions

Follow the `handleWithRetry` pattern:
```typescript
export async function retryableOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<{ data: T | null; error: AppError | null }> {
  return ErrorHandler.handleWithRetry(
    operation,
    'retryableOperation',
    maxRetries
  );
}
```

---

## Performance Considerations

### Retry Strategy
- Default: 2 retries for `safeFetch`, 3 for `handleWithRetry`
- Delay increases: 1000ms, 2000ms, 3000ms (exponential backoff)
- Max total time: ~6-12 seconds before giving up

### Logging Overhead
- Console logs are synchronous
- Future: Consider async logging service
- Only logs in development (check before sending to analytics)

### Error Object Size
- Keep context objects small
- Don't include large data in context
- Use IDs instead of full objects

---

## Future Enhancements

### Planned Features
1. **Analytics Integration** - Send errors to monitoring service
2. **Error Recovery Strategies** - Automatic fallbacks
3. **Error Rate Limiting** - Prevent error spam
4. **Offline Support** - Queue failed requests
5. **Custom Retry Strategies** - Per-error-type retry logic

---

## Related Documentation

- **`/src/components/CONTEXT.md`** - ErrorDisplay component
- **`/src/pages/CONTEXT.md`** - Page-level error handling
- **`/PROJECT_CONTEXT.md`** - Overall architecture

---

**Last Updated**: December 24, 2025
**Maintainer**: Development Team
