# Component Patterns

When to use which component and how to configure it. The AI follows these defaults.

---

## Lists vs Cards vs Tables

### Use a **List** (vertical, full-width items) when:
- Showing items in a queue, feed, or ranked order
- Each item has 1–3 pieces of key info
- Mobile: almost always prefer list over grid
- Examples: notifications, messages, transactions, search results

### Use a **Card Grid** when:
- Items are visually rich (images, charts)
- Items are browseable, not just sequential
- 2-column grid on mobile (for compact items), 3–4 columns on web
- Examples: products, media, saved items, profiles

### Use a **Table** when:
- Data has multiple comparable attributes
- Users need to sort, filter, or scan across columns
- Web only — avoid tables on mobile (use cards/lists instead)
- Examples: admin dashboards, data exports, schedules

---

## Cards

### Anatomy
```
┌──────────────────────────────────┐
│ [Image / Icon]  Title            │
│                 Subtitle / meta  │
│                                  │
│ Description (optional, 2 lines)  │
│                                  │
│ [Secondary action]  [Primary CTA]│
└──────────────────────────────────┘
```

### Card Variants
| Variant | Use case |
|---------|----------|
| **Default** (border + subtle shadow) | General content cards |
| **Elevated** (stronger shadow, no border) | Featured or interactive cards |
| **Outlined** (border, no shadow) | Secondary information, settings |
| **Filled** (colored background) | Status cards, highlights, banners |

### Rules
- Cards should be consistently sized within a grid
- Clickable cards: entire card is the tap target, show hover/press state
- Never nest clickable elements inside a clickable card (use a menu icon instead)

---

## Dialogs vs Sheets vs Drawers

### Use a **Dialog** (center modal) when:
- Asking for confirmation of a destructive or irreversible action
- Collecting 1–3 short inputs (quick form)
- Displaying a brief message that requires acknowledgment
- Works on both mobile and web

### Use a **Sheet** (bottom sheet on mobile, right panel on web) when:
- Showing a form with 4+ fields
- Presenting detail view of a list item without navigating away
- Filters and sort options panel
- Editing an item in-context

### Use a **Drawer** (right sidebar slide-in) when:
- Web only: navigation menus on tablet/mobile widths
- Settings panels, detail panels on wide screens
- Large form or wizard that takes over the right half of the screen

### Size Guidelines
- Dialog: max 480px wide, never taller than 80vh
- Sheet: full width on mobile, max 480px on web, up to 90vh tall
- Drawer: 320–480px wide (web only)

---

## Buttons

### Hierarchy
| Variant | When to use |
|---------|-------------|
| `default` (filled primary) | The single most important action per screen |
| `secondary` (filled secondary/muted) | Supporting actions |
| `outline` | Secondary actions that need visibility without dominance |
| `ghost` | Low-emphasis actions in toolbars, tables |
| `destructive` | Permanent, irreversible actions (delete, cancel subscription) |
| `link` | Inline text actions, navigation |

### Rules
- One `default` primary button per screen section maximum
- Destructive actions always have a confirmation step
- Loading state: spinner + "Saving…" text, button disabled during loading
- Full-width buttons on mobile for primary CTAs at bottom of screen
- Icon-only buttons always have `aria-label`

---

## Badges & Tags

### Use **Badge** for:
- Status indicators (Active, Pending, Archived)
- Count indicators (notifications, cart items)
- Category labels, feature flags
- Never interactive — badges are display-only

### Use **interactive tags / chips** for:
- Filters that can be toggled on/off
- Multi-select options (categories, preferences)
- Dismissible items (selected filters, recently used)

### Badge Variants
| Variant | Use case |
|---------|----------|
| `default` | General label |
| `secondary` | Neutral, low-emphasis |
| `outline` | Subtle label |
| `destructive` | Error status, blocked, banned |

---

## Tabs

### Use Tabs when:
- Content has 2–5 parallel, mutually exclusive views
- User switches between them frequently
- All tabs are always available (not conditional)

### Avoid Tabs when:
- There are more than 5 tabs
- Tabs have a natural sequence (use a wizard/stepper instead)
- One tab is rarely used (consider moving it to a different hierarchy)

### Tabs Rules
- Active tab content loads immediately; other tabs load on activation
- Show a counter badge on tabs with unread/new items
- Mobile: tabs scroll horizontally if they don't fit (scrollable tabs)
- Keep tab labels short: 1–2 words maximum

---

## Forms: Input Selection Components

| Need | Component |
|------|-----------|
| Short text (name, email, search) | `Input` |
| Long text (description, notes) | `Textarea` (min 3 rows) |
| Binary toggle | `Switch` (prefer) or `Checkbox` |
| Multiple binary options | `Checkbox` group |
| One of a few options (≤5) | `RadioGroup` (show all options) |
| One of many options (>5) | `Select` dropdown |
| Date / time | Text input with date picker popover |
| File upload | Custom dropzone with dashed border |

---

## Navigation Components

### Mobile Bottom Tab Bar
- 3–5 tabs maximum
- Active tab: filled/colored icon + bold label
- Inactive tab: outlined icon + muted label
- Badge for unread notifications on the relevant tab

### Web Sidebar
- Logo at top
- Primary nav items with icons + labels
- Divider between sections
- User avatar + name at the bottom
- Collapsed mode: icons only (toggle with a ← button)

### Breadcrumbs
- Show on pages 3+ levels deep on web
- Format: `Home / Section / Page`
- Last item is non-clickable (current page)
- Show max 3 items; collapse middle items with `…` if deeper

---

## Empty States

Always use `<EmptyState>` from `src/components/prototype/EmptyState.tsx`.

```tsx
<EmptyState
  icon={ShoppingCart}
  title="Your cart is empty"
  description="Add items to your cart to continue shopping."
  action={{ label: "Browse products", href: "/(screens)/product-list" }}
/>
```

The icon should be from `lucide-react` and visually related to the content type.

---

## Avatars

### Size Scale
| Size | Use case |
|------|----------|
| `xs` (24px) | Dense lists, inline mentions |
| `sm` (32px) | List items, comments |
| `md` (40px) | Standard — default |
| `lg` (56px) | Profile headers, cards |
| `xl` (80px+) | Profile page hero |

### Fallback
Always provide a fallback — use initials (2 characters) when no image is available.

---

## Loading Skeletons

Match the skeleton shape precisely to the content it represents:
- Text line: `<Skeleton className="h-4 w-[80%]" />`
- Title: `<Skeleton className="h-6 w-[60%]" />`
- Avatar: `<Skeleton className="h-10 w-10 rounded-full" />`
- Card: `<Skeleton className="h-[180px] w-full rounded-lg" />`
- Button: `<Skeleton className="h-10 w-24 rounded-md" />`

Group skeletons in the exact same layout as the real content will be.
