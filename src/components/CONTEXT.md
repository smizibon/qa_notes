# 🧩 Components: `src/components/`

## 🏗️ Core Library
| Component | `data-testid` | Responsibility |
| :--- | :--- | :--- |
| `Navigation` | `nav-container` | Mega-menu, submenus (left-aligned), link categories. |
| `GlassCard` | `glass-card` | Layout primitive (blur, border, shadow). |
| `ErrorDisplay`| `error-display`| Centralized UI for `AppError` handling. |
| `Footer` | `footer-container`| Global footer. |
| `ProfileImage`| `profile-image`| Glowing avatar with scales. |
| `LinksControls` | `links-search-input`, `links-refresh-button`, `links-view-grid-button`, `links-view-list-button` | Unified controls for search, view toggles, and refresh. |

## 🎨 Implementation Patterns
- **Test IDs**: Required on all interactive elements. Pattern: `component-element-type`.
- **Props**: Pass `className` and `onClick` to primitives for composition.
- **Icons**: Map string keys to Lucide components (see `Navigation.tsx`).
- **Responsive**: Mobile-first Tailwind (e.g., `flex-col md:flex-row`).
 
## 🎨 Design Tokens (Summary)
- Base panel: `bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl`
- Default button: `p-2 bg-slate-700/30 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all`
- Primary action: `bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20`
- Success: `bg-green-500 text-white shadow-lg shadow-green-500/20`
- Press feedback: `active:scale-95`
- See `PROJECT_CONTEXT.md` for full style guide.

## 🕒 Latest Changes
- **Navigation**: Submenus repositioned left (`right-full`) to fix screen overflow. Added category indicators.
- **AboutMe**: Integrated missing test IDs.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
