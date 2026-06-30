import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  /** Icon from lucide-react */
  icon: LucideIcon;
  /** Short, scannable title */
  title: string;
  /** One or two sentence description telling the user what to do */
  description: string;
  /** Primary call to action */
  action?: EmptyStateAction;
  /** Secondary call to action */
  secondaryAction?: EmptyStateAction;
  className?: string;
}

/**
 * Standard empty state component. Use on every list or data view
 * when there are no items to show.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className ?? ""}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-base font-semibold">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">{description}</p>
      {(action || secondaryAction) && (
        <div className="flex flex-col gap-2 sm:flex-row">
          {action && (
            action.href ? (
              <Link href={action.href} className={buttonVariants({ variant: "default" })}>
                {action.label}
              </Link>
            ) : (
              <Button onClick={action.onClick}>{action.label}</Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href} className={buttonVariants({ variant: "outline" })}>
                {secondaryAction.label}
              </Link>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
