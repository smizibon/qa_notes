# 📚 Sections: `src/sections/`

## 🔎 Purpose
- Render lesson and cheatsheet content driven by JSON files under `src/data/cheatsheet/`.
- Provide consistent UI via `CodeBlock` and shared styling with Glassmorphism.
- Maintain automation coverage using `data-testid` on key elements.

## 🧩 JSON Schema (Cheatsheet)
- File path: `src/data/cheatsheet/*.json`
- Recommended shape:
  - `id`: string (unique identifier)
  - `title`: string (human-readable section title)
  - `description`: string (short description)
  - `codeBlocks`: array of:
    - `heading`: string (block title)
    - `language`: string (e.g., `ts`, `js`, `json`)
    - `snippet`: string (code to render)
    - `notes`: array of strings (optional, quick bullets)
    - `tags`: array of strings (optional, search/filter aid)

### 🧾 Example
```json
{
  "id": "cheatsheet-basic-types",
  "title": "Basic Types",
  "description": "Essential TypeScript basic types with examples",
  "codeBlocks": [
    {
      "heading": "Primitives",
      "language": "ts",
      "snippet": "const a: string = 'hello';\nconst b: number = 42;",
      "notes": ["Strings and numbers are most common", "Prefer explicit typing in examples"],
      "tags": ["typescript", "basics", "types"]
    }
  ]
}
```

## 🧠 Rendering Pattern
- Import JSON in section component, e.g. `import data from '../data/cheatsheet/basic-types.json'`.
- Iterate `data.codeBlocks` and render with `CodeBlock`:
  - Title → `CodeBlock` `title` prop
  - Snippet → children
  - Language → optional syntax highlighting choice (future)

## 🧪 Automation Test IDs
- `CodeBlock` emits:
  - `code-block`
  - `code-block-title`
  - `code-block-content`
- When creating new section components, ensure parent containers include predictable test IDs (e.g., `basic-types-section`, `quick-reference-section`).

## ✅ Best Practices
- Ensure JSON files exist before importing to avoid type errors.
- Keep `codeBlocks` strictly array of objects; do not mix strings with objects.
- Prefer small, focused snippets with clear headings.
- Update context docs whenever schema changes or a new section type is introduced.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.1
