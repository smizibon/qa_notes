# 📂 Source Overview: `src/`

## 🗺️ Directory Mapping
| Path | Responsibility | Implementation Sub-Context |
| :--- | :--- | :--- |
| `components/` | Stateless/Shared UI primitives. | `components/CONTEXT.md` |
| `pages/` | Stateful route views & orchestration. | `pages/CONTEXT.md` |
| `data/` | Content store (JSON schemas). | `data/CONTEXT.md` |
| `utils/` | Logic (Error handling, IO helpers). | `utils/CONTEXT.md` |
| `sections/` | Legacy/Deprecated topic UI. | (N/A) |

## � App Entry Points
- `App.tsx`: Root state, page routing switch, global layout.
- `main.tsx`: DOM mounting & Vite entry.

## 🤖 AI Workflow
1. Locate target folder.
2. Read local `CONTEXT.md`.
3. Adhere to patterns defined in `../PROJECT_CONTEXT.md`.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
