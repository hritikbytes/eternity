import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-heading text-2xl font-semibold"
          aria-label="Eternity Matrimony home"
        >
          <HeartHandshake className="h-8 w-8" />
          <span>Eternity</span>
        </Link>

        <div className="space-y-3">
          <p className="text-7xl font-heading font-medium text-primary">404</p>
          <h1 className="text-2xl font-heading font-semibold text-foreground">Page not found</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className={buttonVariants({ className: "rounded-full px-6" })}>
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline", className: "rounded-full px-6" })}
          >
            View Matches
          </Link>
        </div>
      </div>
    </div>
  );
}
