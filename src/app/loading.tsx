export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-medium tracking-wide">Loading…</p>
      </div>
    </div>
  );
}
