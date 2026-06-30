"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileFrameProps {
  /** Screen title shown in the top app bar */
  title?: string;
  /** Show a back arrow in the top-left */
  showBack?: boolean;
  /** Label for the back button (default: "Back") */
  backLabel?: string;
  /** Custom header right content (e.g. icon buttons) */
  headerRight?: React.ReactNode;
  /** Hide the top app bar entirely */
  noHeader?: boolean;
  children: React.ReactNode;
}

/**
 * Wraps mobile prototype screens in a phone-like frame with a top app bar.
 * Use this for all mobile app screens.
 */
export function MobileFrame({
  title,
  showBack = false,
  backLabel = "Back",
  headerRight,
  noHeader = false,
  children,
}: MobileFrameProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-8">
      {/* Phone frame */}
      <div className="relative flex h-[812px] w-[375px] flex-col overflow-hidden rounded-[44px] border-[8px] border-foreground/10 bg-background shadow-2xl">
        {/* Status bar */}
        <div className="flex h-12 shrink-0 items-center justify-between bg-background px-8 pt-2">
          <span className="text-xs font-semibold tabular-nums">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-4 rounded-full bg-foreground/70" />
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
            <div className="h-2 w-2.5 rounded-sm border border-foreground/70">
              <div className="m-px h-full w-[65%] rounded-sm bg-foreground/70" />
            </div>
          </div>
        </div>

        {/* Top app bar */}
        {!noHeader && (
          <div className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
            {showBack && (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                aria-label={`Go back to ${backLabel}`}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm">{backLabel}</span>
              </button>
            )}
            {title && (
              <h1
                className={`flex-1 text-center text-base font-semibold ${showBack ? "-translate-x-4" : ""}`}
              >
                {title}
              </h1>
            )}
            {headerRight && (
              <div className="ml-auto flex items-center">{headerRight}</div>
            )}
          </div>
        )}

        {/* Scrollable screen content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        {/* Home indicator */}
        <div className="flex h-8 shrink-0 items-end justify-center pb-2">
          <div className="h-1 w-32 rounded-full bg-foreground/20" />
        </div>
      </div>
    </div>
  );
}
