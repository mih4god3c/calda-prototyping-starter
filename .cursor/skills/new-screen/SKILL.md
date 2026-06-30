# Skill: new-screen

Use this skill whenever the designer asks to add, create, or build a new screen, page, flow, or view.

## When to Use
- "Add a screen for..."
- "Create a [login / dashboard / profile / settings / onboarding] page"
- "Build the [checkout / search / detail / list] flow"
- "I need a screen where the user can..."

## What This Skill Does
Creates a new prototype screen following the established conventions, then registers it on the prototype index.

---

## Steps

### 1. Determine the screen type
Identify whether this is a **mobile screen** or a **web app screen**.
- If unclear, ask the designer: "Is this for the mobile app or web app?"
- Mobile screens get wrapped in `<MobileFrame>`
- Web screens get wrapped in `<PrototypeShell>`

### 2. Read the branding file
Always read `branding/brand.md` before generating any visual component. Apply the brand colors, typography, and radius values.

### 3. Read the relevant design guidelines
- Check `design-guidelines/ux-patterns.md` for navigation and interaction patterns
- Check `design-guidelines/component-patterns.md` for component selection

### 4. Check existing mock data
Read `src/lib/mock-data/` to see what data is already available. Reuse existing data rather than creating new mock files when possible.

### 5. Create the screen file
Create the file at: `src/app/(screens)/[kebab-case-name]/page.tsx`

The screen must:
- Be a `"use client"` component if it has interactivity
- Import mock data from `src/lib/mock-data/`
- Use `mockFetch()` for any "loaded" data (with `useEffect` + `useState`)
- Include a loading skeleton state
- Include an empty state if it shows a list
- Use shadcn/ui components throughout
- Add `// BACKEND:` comment blocks for any data that would come from a real API

### 6. Register on the prototype index
Add the new screen to `src/app/page.tsx`. Find the `screens` array and add an entry:

```typescript
{
  name: "Screen Name",
  description: "One line describing what the user does here",
  href: "/(screens)/screen-name",
  device: "mobile", // or "web"
  category: "Authentication", // or "Onboarding", "Core", "Settings", etc.
}
```

### 7. Announce what was built
After creating the screen, tell the designer:
- The URL to visit: `http://localhost:3000/(screens)/[name]`
- What mock data it uses
- What `// BACKEND:` integrations were documented
- Suggested next screens to build

---

## Screen Template (Mobile)

```tsx
"use client";

import { useState, useEffect } from "react";
import { MobileFrame } from "@/components/prototype/MobileFrame";
import { mockFetch } from "@/lib/mock-api";
// import { mockItems } from "@/lib/mock-data/items";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExampleMobileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    async function load() {
      // BACKEND: GET /api/items
      // Request:  Query params: page, limit, filter
      // Response: { items: Item[], total: number, hasMore: boolean }
      // Auth:     Bearer token
      // const result = await mockFetch(mockItems, 600);
      // setData(result);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <MobileFrame title="Screen Title">
      {isLoading ? (
        <div className="space-y-3 p-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <div className="p-4">
          {/* Screen content */}
        </div>
      )}
    </MobileFrame>
  );
}
```

## Screen Template (Web)

```tsx
"use client";

import { useState, useEffect } from "react";
import { PrototypeShell } from "@/components/prototype/PrototypeShell";
import { mockFetch } from "@/lib/mock-api";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExampleWebScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // BACKEND: GET /api/...
      await mockFetch(null, 500);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <PrototypeShell title="Screen Title">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : (
        <div>
          {/* Screen content */}
        </div>
      )}
    </PrototypeShell>
  );
}
```
