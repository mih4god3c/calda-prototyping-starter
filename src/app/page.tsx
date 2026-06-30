import Link from "next/link";
import { ExternalLink, Smartphone, Monitor, FolderOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ScreenMeta } from "@/lib/types";

/**
 * Prototype Index — the home screen.
 *
 * Every screen you add to this prototype should be listed here.
 * Add new entries to the `screens` array and categorise them.
 *
 * The AI will update this file automatically when you ask it to add a new screen.
 */
const screens: ScreenMeta[] = [
  // ── Add your screens here ──────────────────────────────────────────────────
  // Example:
  // {
  //   name: "Login",
  //   description: "Email + password login screen with forgot password link",
  //   href: "/(screens)/login",
  //   device: "mobile",
  //   category: "Authentication",
  // },
];

function groupByCategory(items: ScreenMeta[]) {
  return items.reduce<Record<string, ScreenMeta[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export default function PrototypeIndex() {
  const grouped = groupByCategory(screens);
  const categories = Object.keys(grouped).sort();
  const isEmpty = screens.length === 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FolderOpen className="h-4 w-4" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Prototype</h1>
        </div>
        <p className="text-muted-foreground">
          All screens in this prototype. Click any card to open the screen.
        </p>
      </div>

      {isEmpty ? (
        /* Empty state — shown before any screens are added */
        <div className="rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 px-8 py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Smartphone className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-lg font-semibold">No screens yet</h2>
          <p className="mx-auto mb-6 max-w-sm text-sm text-muted-foreground">
            Start prompting in Cursor to add screens. Try:{" "}
            <span className="font-medium text-foreground">
              &quot;Add a login screen for a mobile app&quot;
            </span>
          </p>
          <div className="mx-auto max-w-xs rounded-lg bg-muted p-4 text-left text-xs text-muted-foreground">
            <p className="mb-1 font-semibold text-foreground">Quick start tips</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Fill in <code className="text-foreground">branding/brand.md</code></li>
              <li>Ask: <em>&quot;Apply our branding to the prototype&quot;</em></li>
              <li>Ask: <em>&quot;Add an onboarding flow for mobile&quot;</em></li>
              <li>Run <code className="text-foreground">npm run dev</code> and open this page</li>
            </ol>
          </div>
        </div>
      ) : (
        /* Screen grid — populated as screens are added */
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h2>
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">
                  {grouped[category].length}{" "}
                  {grouped[category].length === 1 ? "screen" : "screens"}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[category].map((screen) => (
                  <Link key={screen.href} href={screen.href} className="group">
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base font-semibold group-hover:text-primary">
                            {screen.name}
                          </CardTitle>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
                        </div>
                        <CardDescription className="text-xs leading-relaxed">
                          {screen.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Badge
                          variant="secondary"
                          className="gap-1 text-xs font-normal"
                        >
                          {screen.device === "mobile" ? (
                            <Smartphone className="h-3 w-3" />
                          ) : (
                            <Monitor className="h-3 w-3" />
                          )}
                          {screen.device === "mobile" ? "Mobile" : "Web"}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 border-t pt-6 text-center text-xs text-muted-foreground">
        CALDA Prototyping Starter &mdash; built with Next.js + shadcn/ui
      </div>
    </div>
  );
}
