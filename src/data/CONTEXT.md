# 📊 Data: `src/data/`

## 📁 Content Structure
```text
data/
├── [topic]/          # (e.g., typescript, playwright)
│   ├── lessons/      # 16-lesson progression (Basics -> Advanced -> Ref)
│   ├── cheatsheet/   # Syntax/pattern quick refs
│   ├── examples/     # Code snippets
│   └── CONTEXT.md    # Field-level schemas for this topic
├── links/            # links.json (9 categories)
└── watch/            # videos.json (Video metadata)
```

## ⚖️ Standards
- **Naming**: `kebab-case.json`.
- **IDs**: Prefix-based unique strings (e.g., `ts-lesson-01`).
- **Loading**: ALWAYS use `loadJsonFile` from `src/utils/`.
- **Validation**: Schema-first; refer to `[topic]/CONTEXT.md` before editing.

## 🕒 Latest Changes
- **links.json**: Categorized into 9 specific QA/Dev groups.
- **videos.json**: Initialized for the Watch page hub.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
