# Screens

This folder contains all individual prototype screens.

Each screen lives in its own subfolder:

```
(screens)/
├── login/
│   └── page.tsx
├── onboarding/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
└── ...
```

The `(screens)` folder is a Next.js **route group** — the parentheses mean it doesn't affect the URL. A screen at `(screens)/login/page.tsx` is accessible at `/login`, not `/(screens)/login`.

## Adding a New Screen

Ask Cursor: **"Add a screen for [description]"** — it will create the file and register it on the prototype index automatically.

Or create manually:
1. Create a folder: `src/app/(screens)/my-screen/`
2. Add `page.tsx` using the template from `.cursor/skills/new-screen/SKILL.md`
3. Add an entry to the `screens` array in `src/app/page.tsx`
