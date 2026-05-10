"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-24 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground text-sm">
            We ran into a problem loading this page. Try again or go back to the dashboard.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline", className: "gap-2 rounded-full px-5" })}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Button onClick={reset} className="gap-2 rounded-full px-5">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
