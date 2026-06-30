# CALDA Prototyping Starter

A ready-to-use prototyping environment for UX/UI designers. Download, fill in your brand, and start prompting in Cursor — no backend required.

---

## Before You Start

You need two things installed on your computer. Both are free.

| What | Where to get it | Why |
|------|----------------|-----|
| **Node.js** (LTS version) | [nodejs.org/en/download](https://nodejs.org/en/download) — download the installer for your OS and click through the setup wizard | Runs the prototype on your computer |
| **Cursor** | [cursor.com](https://cursor.com) — download and install like any app | The AI-powered editor where you do all your prompting |

Once those are installed, you're ready.

---

## Getting Started

### 1. Download and set up the project

1. Go to the repository page on GitHub and click **Code → Download ZIP**
2. Unzip the downloaded file and rename the folder to your project name (e.g. `my-app-prototype`)
3. Open **Terminal** (macOS: search "Terminal" in Spotlight) or **Command Prompt** (Windows: search "cmd")
4. Type `cd ` (with a space after), then drag the project folder into the terminal window — this fills in the path automatically. Press Enter.
5. Run:

```bash
npm install
```

This downloads all the dependencies. It takes about 30 seconds and prints a lot of text — that's normal.

### 2. Open in Cursor

Open Cursor, go to **File → Open Folder**, and select the folder you just cloned. This is important — open the folder, not an individual file.

### 3. Fill in your brand

Open `branding/brand.md` in Cursor and fill in your product details. You don't need to fill everything in — **even just the product name and primary color is enough to get started.** The AI will use sensible defaults for anything you leave blank.

```
branding/
├── brand.md        ← Fill this in first (product name + primary color at minimum)
├── logos/          ← Drop your SVG or PNG logo here
└── fonts/          ← Drop custom fonts here (optional — most designers use Google Fonts)
```

### 4. Start the dev server

Back in Terminal (or use Cursor's built-in terminal with **Ctrl+`**):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Keep this tab open — it updates live as you build.

### 5. Start prompting in Cursor

Click the **chat icon** in the sidebar (or press **Ctrl+L** / **Cmd+L**) to open the AI chat. The AI is already configured with prototyping rules — just start describing what you want to build.

---

## Your First Session

### The kickoff prompt

Copy this, fill in the brackets, and send it as your very first message:

```
We are building a prototype for a [mobile / web] app called [Product Name].

It is for [describe who uses it — e.g. "freelancers who want to track their invoices" 
or "gym members who want to book classes"].

The main flows we need to prototype are:
  1. [e.g. Sign up and onboarding]
  2. [e.g. The main home screen]
  3. [e.g. Creating a new item / booking / order]
  4. [e.g. Profile and settings]

Please suggest which screens we'll need for flow 1, then build them one by one.
```

The AI will plan out the screens, ask any clarifying questions, and start building. After each screen it will tell you how to view it.

---

### Example follow-up prompts

Once you have your first screens, here are natural things to say next:

**Navigating between screens**
> "When I tap the Login button, it should go to the home screen."
> "Add a back button that goes back to the previous screen."
> "The bottom tab bar should navigate between Home, Search, and Profile."

**Changing the look**
> "Make the home screen feel more spacious — more padding, bigger cards."
> "Try a darker background on the login screen, like a deep navy."
> "The buttons feel too small on mobile — make them full width."
> "Show me two different layouts for this screen and I'll pick one."

**Adding interactions and states**
> "When I tap Save, show a spinner for a second then show a success message."
> "If the list is empty, show a friendly message telling the user to add their first item."
> "Add a loading skeleton while the feed is loading."

**Building out a flow**
> "Now add the next screen — when the user taps a card it should open the detail view."
> "Add an onboarding flow with 3 steps before the user reaches the home screen."
> "The checkout flow needs a summary screen before the confirmation."

**Branding and style**
> "Apply our branding from brand.md to all the screens."
> "Change the font to something more modern — try DM Sans."
> "The app feels too corporate — make it friendlier and more playful."

**Mocking integrations**
> "Add a payment screen — mock Stripe, I don't need it to actually work."
> "Show what happens when the user connects their Google account."
> "Add push notification prompts in the onboarding flow."

---

## Repository Structure

```
├── AGENTS.md                    ← AI master prompt — do not delete
├── branding/                    ← Your brand assets & guidelines
│   ├── brand.md                 ← Colors, fonts, voice — fill in first
│   ├── logos/                   ← Drop logo files here
│   └── fonts/                   ← Drop custom font files here
├── design-guidelines/           ← UX & component patterns the AI follows
│   ├── ux-patterns.md
│   └── component-patterns.md
├── src/
│   ├── app/
│   │   ├── page.tsx             ← Prototype index (all your screens listed here)
│   │   ├── layout.tsx           ← Global layout & fonts
│   │   └── (screens)/           ← Individual prototype screens live here
│   ├── components/
│   │   ├── ui/                  ← UI component library (shadcn/ui)
│   │   └── prototype/           ← Shared chrome: phone frame, web shell, etc.
│   └── lib/
│       ├── mock-api.ts          ← Simulates loading delays so the prototype feels real
│       ├── mock-data/           ← Realistic fake data (users, notifications, etc.)
│       └── types.ts             ← Shared data types
└── .cursor/
    ├── rules/                   ← Always-on AI guidelines (no backend, use design system)
    └── skills/                  ← Reusable AI behaviours (add screen, apply branding, etc.)
```

---

## Key Concepts

### No Backend
This prototype has no real backend. All data is fake — it comes from `src/lib/mock-data/`. When a feature would need a real API (like payments or notifications), the AI builds a convincing simulation and adds a note in the code documenting what the real API would look like.

### Screen Framing
- **Mobile app screens** → rendered inside a phone frame so they look like a real device
- **Web app screens** → rendered with a sidebar and top bar

### Adding Screens
Ask Cursor: **"Add a screen for [description]"** and it will create the file and add it to the index automatically.

### Applying Branding
After filling in `branding/brand.md`, ask: **"Apply our branding"** and the AI will update colors, fonts, and all components.

### Mocking Integrations
Ask: **"Integrate with [service]"** (e.g. Stripe, Google Maps, push notifications) and the AI builds a convincing mock with no real API calls.

---

## AI Skills

These behaviours are built in — the AI uses them automatically when relevant:

| Skill | How to trigger |
|-------|---------------|
| Add a new screen | "Add a screen for..." |
| Apply branding | "Apply our branding" |
| Mock an integration | "Integrate with [service name]" |

---

## Tips for Better Prototypes

- **Be descriptive.** Instead of "add a profile screen", try: "Add a mobile profile screen with an avatar, name, bio, and settings options for notifications, privacy, and help."
- **Reference existing screens.** "Add a settings screen similar to the profile screen but with toggle switches for each option."
- **Describe the user, not the UI.** "The user should be able to filter the list by category" works better than "add filter buttons".
- **Iterate out loud.** "This looks good but the header feels too heavy — make it lighter." Treat it like a conversation with a designer.
- **Branding matters.** Filling in `brand.md` early dramatically improves the quality and consistency of generated screens.

---

## Maintainer Notes

This repository is maintained by CALDA. Designers download a ZIP for each new project — they don't need git.

**For maintainers (CALDA team):**
- Use git normally — clone, branch, commit, push
- When you improve rules, skills, or guidelines, push to `main` and designers get the updates next time they download a ZIP
- Keep `node_modules/` and `.next/` in `.gitignore` — they're not part of the starter
- Test changes by running `npm install && npm run dev` in a clean copy before pushing

**For designers:**
- Download a fresh ZIP for each new prototype project — don't reuse a previous one
- Don't modify `.cursor/rules/` or `.cursor/skills/` — those are maintained by CALDA and will be updated over time
- To suggest improvements, send them to the CALDA team
