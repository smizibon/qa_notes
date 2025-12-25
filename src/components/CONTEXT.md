# 🧩 Components: `src/components/`

## 🏗️ Core Library
| Component | `data-testid` | Responsibility |
| :--- | :--- | :--- |
| `Navigation` | `nav-container` | Mega-menu, submenus (left-aligned), link categories. |
| `GlassCard` | `glass-card` | Layout primitive (blur, border, shadow). |
| `ErrorDisplay`| `error-display`| Centralized UI for `AppError` handling. |
| `Footer` | `footer-container`| Global footer. |
| `ProfileImage`| `profile-image`| Glowing avatar with scales. |

## 🎨 Implementation Patterns
- **Test IDs**: Required on all interactive elements. Pattern: `component-element-type`.
- **Props**: Pass `className` and `onClick` to primitives for composition.
- **Icons**: Map string keys to Lucide components (see `Navigation.tsx`).
- **Responsive**: Mobile-first Tailwind (e.g., `flex-col md:flex-row`).

## 🕒 Latest Changes
- **Navigation**: Submenus repositioned left (`right-full`) to fix screen overflow. Added category indicators.
- **AboutMe**: Integrated missing test IDs.

---
**Last Updated**: 2025-12-25 | **Version**: 2.5.0
