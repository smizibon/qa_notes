# 📄 Pages: `src/pages/`

## 🏛️ Page Inventory
| Page | `data-testid` | Responsibility |
| :--- | :--- | :--- |
| `Home` | `home-page` | Landing view, stats, creator profile. |
| `Lessons` | `lessons-page` | Topic exploration, progress tracking. |
| `Watch` | `watch-page` | Video hub (4 designs), manual watched persistence. |
| `Links` | `links-page` | Resource hub with categories above search, embedded controls (refresh + view toggles) on the left, search on the right, collapsible sections, and copy feedback. |
| `Examples` | `examples-page` | Code playground. |
| `Details` | `details-page` | Item deep-dive. |
| `AboutMe` | `about-me-page` | Portfolio view. |

## 🛠️ Orchestration Patterns
- **Routing**: Handled in `App.tsx` via `currentPage` state.
- **Data Load**: `useEffect` + `loadJsonFile`.
- **Error Handling**: Component-level `try-catch` + `ErrorDisplay`.
- **State Persistence**: `localStorage` (watched videos in `Watch.tsx`).

## 🧪 Controls & Test IDs — Links Page
- **Controls**: `links-controls-toggle`, `links-refresh-button`, `links-view-grid-button`, `links-view-list-button`, `links-search-input`, `links-search-clear`
- **Categories**: `links-categories-panel`, `links-categories-collapse`, `links-categories-clear`, `links-category-chip-*`
- **Cards**: `open-link-card-*`, `select-link-*`, `copy-link-*`, `open-link-*`
- **Bulk Actions**: `links-selection-bar`, `links-selected-count`, `links-copy-all-button`, `links-clear-selection-button`
- **Category Collapse**: `category-collapse-*` (button left of title)

## 🕒 Latest Changes
- **Links.tsx**: Resource hub with categories above search, multi-select chips, internal categories collapse, per-category collapse, prominent search, bulk copy selection bar, single-link copy visual feedback, and global topic synchronization.
- **Watch.tsx**: Progress tracking (manual toggle), category counts, design selector relocated.
- **Home.tsx**: Full `data-testid` coverage, profile glow enhancements.

---
**Last Updated**: 2025-12-25 | **Version**: 2.6.0
