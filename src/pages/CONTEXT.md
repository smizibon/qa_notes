# 📄 Pages: `src/pages/`

## 🏛️ Page Inventory
| Page | `data-testid` | Responsibility |
| :--- | :--- | :--- |
| `Home` | `home-page` | Landing view, stats, creator profile. |
| `Lessons` | `lessons-page` | Topic exploration, progress tracking. |
| `Watch` | `watch-page` | Video hub (4 designs), manual watched persistence. |
| `Examples` | `examples-page` | Code playground. |
| `Details` | `details-page` | Item deep-dive. |
| `AboutMe` | `about-me-page` | Portfolio view. |

## 🛠️ Orchestration Patterns
- **Routing**: Handled in `App.tsx` via `currentPage` state.
- **Data Load**: `useEffect` + `loadJsonFile`.
- **Error Handling**: Component-level `try-catch` + `ErrorDisplay`.
- **State Persistence**: `localStorage` (watched videos in `Watch.tsx`).

## 🕒 Latest Changes
- **Watch.tsx**: Progress tracking (manual toggle), category counts, design selector relocated.
- **Home.tsx**: Full `data-testid` coverage, profile glow enhancements.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
