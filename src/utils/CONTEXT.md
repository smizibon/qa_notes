# 🛠️ Utilities: `src/utils/`

## 🧰 API Signature Map
| Export | Signature | Usage Pattern |
| :--- | :--- | :--- |
| `loadJsonFile<T>` | `(path) => Promise<{data, error}>` | Safely load local JSON with auto-retry. |
| `safeFetch<T>` | `(url, opts) => Promise<{data, error}>` | Network fetch with retries & error mapping. |
| `ErrorHandler.handle` | `(asyncFn) => Promise<T>` | Global async wrapper for `AppError` safety. |
| `createContentImports`| `(topic, type, files) => Record` | Dynamic import map generator for topics. |

## 💡 Key Patterns
- **Dry Imports**: Use `contentLoader.ts` to generate dynamic imports for large file sets (e.g., 16 lessons).
- **AppError**: Always map errors to the `AppError` type for consistent `ErrorDisplay` rendering.

## 🕒 Latest Changes
- **contentLoader.ts**: Implemented `createContentImports` and `createTopicImports`.
- **errorHandler.ts**: Standardized `loadJsonFile` return type to `{data, error}`.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
