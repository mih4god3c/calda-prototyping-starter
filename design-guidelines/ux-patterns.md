# UX Patterns

Default interaction patterns for CALDA prototypes. The AI follows these unless explicitly overridden.

---

## Navigation

### Mobile Apps
- **Primary navigation**: Bottom tab bar with 3–5 items (icon + label)
- **Secondary navigation**: Top app bar with back arrow (`←`) and page title
- **Nested navigation**: Stack-based — new screen slides in from the right, back goes left
- **Modals**: Slide up from the bottom (bottom sheet) for actions; full-screen for complex flows
- **Tab bar items**: Home, Explore/Search, primary action (optional FAB), Notifications, Profile

### Web Apps
- **Primary navigation**: Left sidebar for feature-rich apps; top navbar for marketing/simple apps
- **Secondary navigation**: Horizontal tabs within a section
- **Breadcrumbs**: Show on pages 3+ levels deep
- **Back navigation**: Browser back button is sufficient — don't add custom back buttons on web

### Back Navigation (Mobile)
- Always show a back button (`←`) in the top-left when not on a root tab screen
- Back button label: "Back" or the parent screen name (max 15 chars)
- Swipe-to-go-back is implicit on mobile — don't block it

---

## Loading States

### Rules
- Always show a loading state — never show a blank screen
- Use `Skeleton` components that match the shape of the content being loaded
- Minimum loading duration: 400ms (even if data is "instant" — use `mockFetch` delay)
- Never use a full-page spinner for content that loads in < 2 seconds

### Skeleton Patterns
- **List item**: Skeleton rectangle ~60px tall, full width, with smaller rectangle for metadata
- **Card**: Skeleton rectangle matching card dimensions
- **Avatar + name**: Circle skeleton (40px) + rectangle skeleton (120px wide)
- **Page header**: Wide short rectangle for title + narrow for subtitle

### Progressive Loading
- Load and show above-the-fold content first
- Below-the-fold content can have its own skeleton
- Tabs: load the active tab content first; other tabs load on demand

---

## Empty States

### Rules
- Every list, table, or data view must have an empty state
- Use the `<EmptyState>` component from `src/components/prototype/EmptyState.tsx`
- Always include: an icon (from lucide-react), a title, a description, and a CTA button

### Empty State Copy Patterns
- Title: "No [items] yet" or "Your [list name] is empty"
- Description: Tell the user how to add their first item
- CTA: The primary action to create the first item

### Examples
- "No notifications yet" — "You'll see alerts and updates here" — [Enable notifications]
- "No items in your cart" — "Browse products and add them to your cart" — [Start shopping]
- "No saved addresses" — "Add an address for faster checkout" — [Add address]

---

## Forms

### Layout
- Labels always **above** the input field (never floating/placeholder-only)
- Group related fields with a section heading and divider
- One column on mobile; two columns acceptable on web for short fields (e.g. first/last name)

### Validation
- Validate on blur (when field loses focus), not on every keystroke
- Show error messages **below** the field in red
- Show success indicator (green checkmark) for validated fields when helpful
- Never disable the submit button — show errors inline when submitted with invalid data

### Submit Buttons
- Loading state: Spinner + "Saving..." text while submitting (use `mockFetch` delay)
- Success: Show a success toast (`sonner`) and navigate or reset the form
- Error: Show error message below the button or in an Alert component

### Required Fields
- Mark required fields with an asterisk `*` after the label
- Add "(Optional)" to optional fields if most fields are required

---

## Error Handling

### Error Types & Responses
| Error type | Component | Behaviour |
|-----------|-----------|-----------|
| Form field validation | Helper text below field (red) | Inline, no toast |
| Form submission failure | `Alert` with `variant="destructive"` above the form | Stays visible |
| Data loading failure | Error state with retry button | Replace skeleton |
| Network error | `Alert` with "Check your connection" + retry | Toast + inline |
| Not found (404) | Dedicated empty/error state | Full page or inline |
| Permission denied | Redirect to login or show locked state | Navigation |

### Error Messages
- Be specific: "Email already in use" not "Something went wrong"
- Tell the user what to do: "Try again" / "Check your connection" / "Contact support"
- Never expose technical errors: no stack traces, no API error codes visible to users

---

## Feedback & Notifications

### Toast Notifications (Sonner)
- **Success**: Green — "Changes saved", "Item added", "Message sent" (auto-dismiss: 3s)
- **Error**: Red — use only for transient errors, not form errors (auto-dismiss: 5s)
- **Info**: Default — "Link copied to clipboard" (auto-dismiss: 2s)
- Position: Bottom-center on mobile, bottom-right on web
- Max 1 toast visible at a time

### Confirmation Dialogs
Use a `Dialog` for:
- Destructive actions: "Delete account", "Cancel subscription", "Remove item"
- Irreversible actions: "Submit request", "Publish post"
- Dialog must have: clear title, consequence description, Cancel button, Confirm button (destructive variant)

### Inline Confirmation
Use for low-stakes confirmations:
- "Are you sure?" text + [Yes, remove] [Cancel] buttons inline

### Loading Feedback
- Button shows spinner + loading text while action is in progress
- Disable the button during loading (prevent double-submit)

---

## Gestures (Mobile)

### Swipe Actions
- **Swipe left on list item**: Reveal destructive action (delete, archive) in red
- **Swipe right on list item**: Reveal positive action (mark as done, save) in green
- Always show a visual affordance (subtle shadow or arrow hint)

### Pull to Refresh
- Show on scrollable lists and feeds
- Trigger a `mockFetch` reload
- Show spinner at top during refresh

### Long Press
- Use for: multi-select mode, context menus, drag-to-reorder
- Show a haptic-style visual pulse on long press (scale animation)

---

## Accessibility Defaults

- All interactive elements must have accessible labels (aria-label or visible text)
- Minimum touch target size: 44×44px on mobile
- Colour is never the only differentiator (icons + colour, text + colour)
- Focus states are visible — never `outline: none` without a replacement
