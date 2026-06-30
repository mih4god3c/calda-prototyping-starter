import { Server } from "lucide-react";

interface BackendNoteProps {
  /** HTTP method: GET, POST, PUT, PATCH, DELETE */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** API path, e.g. /api/users/{id} */
  path: string;
  /** Short description of what this endpoint does */
  description: string;
  /** Request shape description */
  request?: string;
  /** Response shape description */
  response?: string;
  /** Auth requirements */
  auth?: string;
  /** Additional notes */
  notes?: string;
}

/**
 * Visual component for documenting backend integrations in the prototype UI.
 *
 * Use this when you want to make a backend integration visible in the running prototype
 * (e.g. in a dev-only panel or inline annotation). For code-level docs, use // BACKEND: comments.
 */
export function BackendNote({
  method,
  path,
  description,
  request,
  response,
  auth,
  notes,
}: BackendNoteProps) {
  const methodColors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700",
    POST: "bg-green-100 text-green-700",
    PUT: "bg-orange-100 text-orange-700",
    PATCH: "bg-yellow-100 text-yellow-700",
    DELETE: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-4 text-xs">
      <div className="mb-2 flex items-center gap-2">
        <Server className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-medium text-muted-foreground uppercase tracking-wide text-[10px]">
          Backend Integration
        </span>
      </div>
      <div className="mb-1 flex items-center gap-2">
        <span
          className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${methodColors[method] ?? "bg-muted text-foreground"}`}
        >
          {method}
        </span>
        <code className="font-mono text-foreground/80">{path}</code>
      </div>
      <p className="mb-2 text-muted-foreground">{description}</p>
      {request && (
        <div className="mb-1">
          <span className="font-semibold text-foreground/70">Request: </span>
          <span className="text-muted-foreground">{request}</span>
        </div>
      )}
      {response && (
        <div className="mb-1">
          <span className="font-semibold text-foreground/70">Response: </span>
          <span className="text-muted-foreground">{response}</span>
        </div>
      )}
      {auth && (
        <div className="mb-1">
          <span className="font-semibold text-foreground/70">Auth: </span>
          <span className="text-muted-foreground">{auth}</span>
        </div>
      )}
      {notes && (
        <div className="mt-2 rounded bg-muted px-2 py-1.5 text-muted-foreground">
          {notes}
        </div>
      )}
    </div>
  );
}
