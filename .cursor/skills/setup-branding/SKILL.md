# Skill: setup-branding

Use this skill when the designer wants to apply their brand to the prototype, or when `branding/brand.md` has been filled in and needs to be wired into the app.

## When to Use
- "Apply our branding"
- "Set up the colors / fonts / style"
- "The brand.md is filled in, please apply it"
- "Update the theme to match our brand"
- "Change the color scheme to..."

---

## Steps

### 1. Read the branding file
Read `branding/brand.md` in full. Extract:
- Primary color (hex)
- Secondary color (hex)
- Neutral/background colors (hex)
- Font family names (primary + optional mono/display)
- Border radius preference
- Any special brand notes

### 2. Convert hex to OKLCH
shadcn/ui v4 uses OKLCH color values. Convert each hex color to OKLCH using the formula. You can use approximate conversions — exact precision is not critical for prototyping.

Common conversions (use as reference):
- Pure white `#ffffff` → `oklch(1 0 0)`
- Pure black `#000000` → `oklch(0 0 0)`
- For brand colors, estimate: lightness (0–1), chroma (0–0.4), hue (0–360)

### 3. Update `src/app/globals.css`
Replace the `:root` CSS variable block with values derived from the brand:

```css
:root {
  --background: oklch(/* light bg */);
  --foreground: oklch(/* dark text */);
  --primary: oklch(/* brand primary */);
  --primary-foreground: oklch(/* text on primary */);
  --secondary: oklch(/* brand secondary */);
  --secondary-foreground: oklch(/* text on secondary */);
  /* ... remaining tokens ... */
  --radius: 0.5rem; /* from brand border radius */
}
```

Also update the `--font-sans` variable to reference the brand font.

### 4. Update font imports in `src/app/layout.tsx`
If the brand uses Google Fonts, import them using `next/font/google`:

```tsx
import { Inter } from "next/font/google"; // replace with brand font
const brandFont = Inter({ subsets: ["latin"], variable: "--font-sans" });
```

If using custom fonts from `branding/fonts/`, use `next/font/local`:

```tsx
import localFont from "next/font/local";
const brandFont = localFont({
  src: [
    { path: "../../branding/fonts/BrandFont-Regular.woff2", weight: "400" },
    { path: "../../branding/fonts/BrandFont-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
});
```

### 5. Copy logo to public
If there's a logo in `branding/logos/`, copy it to `public/logo.svg` (or `.png`) so it can be referenced in components.

### 6. Update the prototype shell components
After updating CSS variables, update these components to use brand-aware classes:
- `src/components/prototype/PrototypeShell.tsx` — top nav logo + brand colors
- `src/components/prototype/MobileFrame.tsx` — status bar color if applicable

### 7. Verify the prototype index
Check `src/app/page.tsx` to ensure the index page also looks good with the new brand.

### 8. Report back
Tell the designer:
- Which colors were applied
- Which font was set up
- Any limitations or approximations made (e.g., if an exact font wasn't available on Google Fonts)
- Suggest testing on `http://localhost:3000`
