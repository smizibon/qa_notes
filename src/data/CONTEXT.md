# Data Directory (`data/`)

**Purpose**: JSON content files for all topics - the content layer with no logic.

**Last Updated**: December 24, 2025  
**Status**: TypeScript complete (48 files), 8 topics planned

## 📁 Directory Structure

```
data/
├── typescript/          ✅ COMPLETE (48 files)
│   ├── lessons/        # 16 tutorial files
│   ├── cheatsheet/     # 16 quick reference files
│   ├── examples/       # 16 practical examples
│   └── README.md       # Topic-specific documentation
│
├── llm-ai/             🚧 IN PROGRESS
│   └── prompt-engineering/
│
├── links/              ✅ COMPLETE
│   └── links.json      # Categorized external links (9 categories, 42 links)
│
├── profile/            ✅ COMPLETE
│   └── about.json      # About Me page content
│
└── [8 other topics]/   🚧 PLANNED
    ├── playwright/
    ├── api-testing/
    ├── docker/
    ├── cicd/
    ├── appium/
    ├── test-cases/
    ├── n8n/
    └── (each with lessons/, cheatsheet/, examples/, README.md)
```

## 🔑 Key Schemas

### Links (`links/links.json`)
```json
{
  "categories": [
    {
      "name": "Category Name",
      "icon": "LucideIconName",
      "links": [
        {
          "name": "Link Name",
          "url": "https://...",
          "tooltip": "Description"
        }
      ]
    }
  ]
}
```

### Lessons/Cheatsheet/Examples
See individual topic `README.md` files for detailed schemas:
- `typescript/README.md` - Complete TypeScript schema documentation
- `llm-ai/README.md` - LLM & AI schema documentation

## 📝 Content Standards

**All topics follow 16-lesson structure**:
1. Getting Started
2-4. Basics  
5-9. Intermediate
10-13. Advanced
14. Configuration
15. Common Patterns/Errors
16. Quick Reference

**File naming**: kebab-case (e.g., `getting-started.json`)  
**IDs**: Prefix with type (e.g., `lesson-getting-started`)

## 🛠️ For Content Creation

**Adding new topic**:
1. Create folder structure: `mkdir -p {topic}/{lessons,cheatsheet,examples}`
2. Create 16 JSON files in each subfolder
3. Create `{topic}/README.md` with schema docs
4. Update `contentLoader.ts` with file array
5. Update `Lessons.tsx` topic support

**Adding new lesson to existing topic**:
1. Create JSON in `lessons/`, `cheatsheet/`, `examples/`
2. Add to file array in `contentLoader.ts`
3. Test in UI

## ⚠️ Critical Rules

1. **Always use `loadJsonFile()`** - Never raw fetch
2. **Validate JSON before committing** - Use `jq` or `cat file.json | jq .`
3. **Keep files under 100KB** - Split if larger
4. **Maintain schema compatibility** - Add fields, don't remove
5. **Update topic README.md** - When changing schema

## 📖 Detailed Documentation

- **Individual topic README.md files** - Complete schemas, field definitions, examples
- **`/src/utils/CONTEXT.md`** - How content is loaded (`loadJsonFile`, `contentLoader.ts`)
- **`/src/pages/CONTEXT.md`** - How content is rendered (Lessons.tsx, Details.tsx)

---

**For complete JSON schema documentation, see the topic-specific README.md files.**

### 1. Links Configuration (`links/links.json`)

```json
{
  "links": [
    {
      "name": "Display Name",
      "url": "https://example.com",
      "tooltip": "Descriptive text shown on hover"
    }
  ]
}
```

**Fields**:
- `name` **(required)** - Link text displayed in UI
- `url` **(required)** - Full URL including protocol
- `tooltip` **(required)** - Helper text for context

**Usage**: Loaded by Navigation component with error handling

---

### 2. Lesson Files (`typescript/lessons/*.json`)

Comprehensive tutorial content with multiple sections.

```json
{
  "id": "lesson-unique-id",
  "title": "Lesson Title",
  "description": "What students will learn",
  "sections": [
    {
      "title": "Section Title",
      
      // Text Content
      "content": "Main explanation text",
      "explanation": "Detailed explanation",
      "analogy": "Real-world comparison",
      "note": "Important note",
      "warning": "Warning message",
      "bestPractice": "Recommended approach",
      
      // Code Examples
      "code": "Single code block",
      "example": {
        "code": "Code string",
        "explanation": "What it does"
      },
      "examples": [
        {
          "code": "Code string",
          "explanation": "Explanation",
          "title": "Example title"
        }
      ],
      "codeBlocks": [
        {
          "title": "Block title",
          "code": "Code string",
          "description": "Description"
        }
      ],
      
      // Lists
      "keyPoints": ["Point 1", "Point 2"],
      "benefits": ["Benefit 1", "Benefit 2"],
      "practices": ["Practice 1", "Practice 2"],
      "useCases": ["Use case 1", "Use case 2"],
      "commonOperations": ["Op 1", "Op 2"],
      
      // When to Use (string OR array)
      "whenToUse": "Single use case",
      // OR
      "whenToUse": ["Use case 1", "Use case 2"],
      
      // Problem/Solution Pattern
      "problem": {
        "description": "Problem description",
        "code": "Problematic code",
        "issue": "What's wrong"
      },
      "solution": {
        "description": "Solution description",
        "code": "Fixed code",
        "benefit": "Why it's better"
      },
      
      // Structured Content
      "steps": [
        {
          "step": "Step description",
          "description": "Details",
          "command": "CLI command",
          "explanation": "Why this step"
        }
      ],
      "process": ["Step 1", "Step 2"],
      "workflow": [
        {
          "phase": "Phase name",
          "description": "What happens"
        }
      ],
      
      // Quick Reference (for quick-reference.json)
      "quick_ref": [
        {
          "syntax": "code syntax",
          "desc": "Description"
        }
      ],
      
      // Tips & Tricks
      "tips": [
        { "tip": "Tip text" }
        // OR just strings
      ],
      
      // Shortcuts
      "shortcuts": [
        {
          "action": "Action name",
          "mac": "Cmd + K",
          "win": "Ctrl + K"
        }
      ],
      
      // CLI Commands
      "commands": [
        {
          "command": "command text",
          "desc": "What it does"
        }
      ],
      
      // Common Mistakes
      "mistakes": [
        {
          "mistake": "What people do wrong",
          "fix": "How to fix it"
        }
      ],
      
      // Resources
      "resources": [
        {
          "name": "Resource name",
          "url": "https://..."
        }
        // OR just strings
      ]
    }
  ]
}
```

**Field Types**:
- **Text**: `string`
- **List**: `string[]`
- **Object**: `{ key: value }`
- **Array of Objects**: `[{ }, { }]`
- **Flexible**: Some fields accept string OR array

**Rendering**: All fields are optional. Renderer checks for presence before displaying.

---

### 3. Cheatsheet Files (`typescript/cheatsheet/*.json`)

Quick reference content with code blocks and tips.

```json
{
  "id": "cheatsheet-id",
  "title": "Topic Title",
  "explanation": "Brief overview of the topic",
  "codeBlocks": [
    {
      "title": "Example Title",
      "code": "Code syntax",
      "description": "What it does"
    }
  ],
  "keyPoints": [
    "Key point 1",
    "Key point 2"
  ],
  "tip": "Pro tip for this topic"
}
```

**Fields**:
- `id` **(required)** - Unique identifier
- `title` **(required)** - Display title
- `explanation` **(optional)** - Overview text
- `codeBlocks` **(optional)** - Array of code examples
- `keyPoints` **(optional)** - Important points list
- `tip` **(optional)** - Single pro tip

---

### 4. Examples Files (`typescript/examples/*.json`)

Practical code examples with difficulty levels.

```json
{
  "id": "examples-id",
  "title": "Examples Title",
  "description": "What these examples demonstrate",
  "examples": [
    {
      "title": "Example Title",
      "description": "What this example shows",
      "difficulty": "beginner",  // or "intermediate", "advanced"
      "code": "Full code example",
      "explanation": "Line-by-line explanation"
    }
  ]
}
```

**Fields**:
- `id` **(required)** - Unique identifier
- `title` **(required)** - Display title
- `description` **(optional)** - Overview
- `examples` **(required)** - Array of examples
  - `title` **(required)** - Example name
  - `description` **(optional)** - What it shows
  - `difficulty` **(optional)** - beginner/intermediate/advanced
  - `code` **(required)** - Full code
  - `explanation` **(optional)** - Detailed explanation

---

## File Naming Conventions

### Lessons
- Use kebab-case: `getting-started.json`
- Descriptive names: `type-guards.json`
- Match topic: Same name across lesson/cheatsheet/examples

### IDs
- Prefix with type: `lesson-id`, `cheatsheet-id`, `examples-id`
- Use kebab-case: `lesson-getting-started`
- Must be unique within type

---

## Content Creation Guidelines

### Writing Lessons

1. **Start with the problem**
   - Why does this concept exist?
   - What problem does it solve?

2. **Use analogies**
   - Real-world comparisons
   - Simple, relatable examples

3. **Show, don't tell**
   - Code examples for every concept
   - Before/after comparisons

4. **Progressive complexity**
   - Start simple
   - Build on previous concepts
   - End with advanced patterns

5. **Common mistakes**
   - What beginners typically get wrong
   - How to avoid pitfalls

### Code Examples Best Practices

```typescript
// ❌ Bad: No context
const x = 5;

// ✅ Good: Descriptive with comments
// Define the maximum retry attempts
const MAX_RETRIES = 5;
```

- Add comments explaining "why"
- Use realistic variable names
- Keep examples focused
- Show complete, runnable code

### Writing Tips

- Keep paragraphs short (3-5 sentences)
- Use bullet points for lists
- Bold important terms
- Include practical use cases
- Reference other lessons when relevant

---

## How to Add New Content

### Adding a New Lesson

**Step 1**: Create JSON files
```bash
cd src/data/typescript
touch lessons/new-topic.json
touch cheatsheet/new-topic.json  
touch examples/new-topic.json
```

**Step 2**: Fill in content using schema above

**Step 3**: Update `Lessons.tsx` imports
```typescript
const LESSON_IMPORTS = {
  // ... existing
  'new-topic.json': () => loadJsonFile('/src/data/typescript/lessons/new-topic.json'),
};

const CHEATSHEET_IMPORTS = {
  // ... existing
  'new-topic.json': () => loadJsonFile('/src/data/typescript/cheatsheet/new-topic.json'),
};

const EXAMPLES_IMPORTS = {
  // ... existing
  'new-topic.json': () => loadJsonFile('/src/data/typescript/examples/new-topic.json'),
};
```

**Step 4**: Add metadata
```typescript
const LESSONS: LessonMetadata[] = [
  // ... existing
  {
    id: 'new-topic',
    title: 'New Topic Title',
    description: 'Brief description',
    lessonFile: 'new-topic.json',
    cheatsheetFile: 'new-topic.json',
    examplesFile: 'new-topic.json'
  }
];
```

**Step 5**: Test
- Load the lesson in UI
- Verify all fields render correctly
- Check for errors in console

### Adding a New Topic (e.g., Playwright)

**Step 1**: Create directory structure
```bash
mkdir -p src/data/playwright/{lessons,cheatsheet,examples}
```

**Step 2**: Create content files (16 lessons recommended)
```bash
cd src/data/playwright/lessons
touch getting-started.json basic-concepts.json ...
```

**Step 3**: Update `Lessons.tsx` with new topic support
- Add topic to switch statement
- Create import maps for new topic
- Update topic selector

**Step 4**: Update Navigation
- Add new topic to topics array
- Assign icon and color

**Step 5**: Update this CONTEXT.md
- Move topic from "Planned" to main structure
- Document any topic-specific patterns

---

## Validation

### JSON Validation Rules

1. **Must be valid JSON**
   - No trailing commas
   - Proper quote escaping
   - Valid UTF-8

2. **Required fields**
   - `id`, `title` are required
   - Check schema for other required fields

3. **Field types**
   - Strings for text
   - Arrays for lists
   - Objects for structured data

4. **No breaking changes**
   - Don't remove existing fields
   - Add new fields instead
   - Maintain backwards compatibility

### Testing JSON Files

```bash
# Validate JSON syntax
cat file.json | jq .

# Check specific fields
cat file.json | jq '.sections[].title'

# Count sections
cat file.json | jq '.sections | length'
```

### Using loadJsonFile Validation

```typescript
const { data, error } = await loadJsonFile<LessonData>(
  '/path/to/file.json',
  (data) => {
    // Validation function
    return (
      typeof data.id === 'string' &&
      typeof data.title === 'string' &&
      Array.isArray(data.sections) &&
      data.sections.length > 0
    );
  }
);

if (error?.type === ErrorType.VALIDATION) {
  console.error('Invalid JSON structure');
}
```

---

## Content Organization Principles

### 16 Lesson Standard
Each topic should have approximately 16 lessons:
1. Getting Started
2-4. Basics (fundamental concepts)
5-9. Intermediate (common patterns)
10-13. Advanced (complex scenarios)
14. Configuration
15. Common Patterns/Errors
16. Quick Reference

### Topic Independence
- Each topic folder is self-contained
- No cross-topic dependencies
- Can be developed independently

### Consistency
- Same structure across all topics
- Same lesson naming patterns
- Same field names and types

---

## Performance Considerations

### File Size
- Keep JSON files under 100KB
- Split large lessons into smaller ones
- Use arrays efficiently

### Loading Strategy
- Lazy load (on-demand)
- Parallel loading for 3 file types
- Cache in component state

### Images/Assets
- Not stored in JSON (use URLs)
- External hosting recommended
- Optimize before linking

---

## Migration & Updates

### Updating Existing Content

1. **Don't break existing structure**
   - Add new fields, don't remove old ones
   - Maintain existing field names
   - Keep IDs stable

2. **Version if needed**
   - Add `version` field if schema changes
   - Handle multiple versions in renderer

3. **Test after updates**
   - Load in UI to verify
   - Check all field types render
   - Verify no console errors

### Batch Updates

```bash
# Find and replace across files
cd src/data/typescript/lessons
sed -i '' 's/oldText/newText/g' *.json

# Validate all after changes
for file in *.json; do
  echo "Validating $file"
  cat $file | jq . > /dev/null || echo "ERROR in $file"
done
```

---

## Troubleshooting

### Content not showing
- Verify JSON is valid (use `jq`)
- Check field names match schema
- Ensure file path is correct in imports
- Look for errors in browser console

### Field not rendering
- Check if field type is supported in renderer
- Verify field name spelling
- Check for TypeScript errors
- Add field support to `Lessons.tsx` if new

### Performance issues
- Check file sizes (use `ls -lh`)
- Split large files
- Optimize JSON structure

---

## Best Practices

### ✅ Do's

1. **Validate JSON before committing**
2. **Use descriptive IDs and titles**
3. **Include examples for every concept**
4. **Write for beginners**
5. **Keep content focused**
6. **Update docs when changing schema**

### ❌ Don'ts

1. **Don't use hardcoded paths in JSON**
2. **Don't include HTML in text fields**
3. **Don't duplicate content**
4. **Don't break existing field names**
5. **Don't skip validation**

---

## Related Documentation

- **`/src/pages/CONTEXT.md`** - How content is rendered
- **`/src/utils/CONTEXT.md`** - How content is loaded
- **`/PROJECT_CONTEXT.md`** - Overall content strategy

---

**Last Updated**: December 24, 2025
**Maintainer**: Content Team
