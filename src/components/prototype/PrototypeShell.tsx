"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Bell, User, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface PrototypeShellProps {
  /** Page title shown in the header */
  title?: string;
  /** Custom nav items — defaults to a generic set */
  navItems?: NavItem[];
  /** Content to render in the top-right header area */
  headerRight?: React.ReactNode;
  /** Hide the left sidebar */
  noSidebar?: boolean;
  children: React.ReactNode;
}

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", href: "/(screens)/dashboard", icon: LayoutDashboard },
  { label: "Notifications", href: "/(screens)/notifications", icon: Bell, badge: 3 },
  { label: "Profile", href: "/(screens)/profile", icon: User },
  { label: "Settings", href: "/(screens)/settings", icon: Settings },
];

/**
 * Wraps web app prototype screens with a sidebar nav and top bar.
 * Use this for all web app screens.
 */
export function PrototypeShell({
  title,
  navItems = defaultNavItems,
  headerRight,
  noSidebar = false,
  children,
}: PrototypeShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      {/* Left sidebar */}
      {!noSidebar && (
        <aside className="flex w-60 flex-col border-r bg-background">
          {/* Logo area */}
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <Link href="/" className="text-sm font-semibold hover:opacity-80">
              Prototype
            </Link>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <Badge variant="default" className="h-5 px-1.5 text-xs">
                      {item.badge}
                    </Badge>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* User area */}
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=alex" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">Alex Morgan</p>
              <p className="truncate text-xs text-muted-foreground">alex@example.com</p>
            </div>
          </div>
        </aside>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1 text-muted-foreground"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            All screens
          </Link>
          {title && (
            <>
              <Separator orientation="vertical" className="h-5" />
              <h1 className="text-sm font-semibold">{title}</h1>
            </>
          )}
          {headerRight && <div className="ml-auto">{headerRight}</div>}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
