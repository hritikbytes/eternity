"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error("[Global Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-semibold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            An unexpected error occurred. Please try again, or contact support if the problem persists.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 font-mono mt-2">Error ID: {error.digest}</p>
          )}
        </div>
        <Button onClick={reset} className="gap-2 rounded-full px-6">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
