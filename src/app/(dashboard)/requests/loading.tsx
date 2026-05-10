import { Skeleton } from "@/components/ui/skeleton";

export default function RequestsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8" aria-label="Loading requests">
      <div className="space-y-2">
        <Skeleton className="h-9 w-52 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-2xl border border-border/40 bg-card"
          >
            <Skeleton className="h-14 w-14 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
            </div>
            <Skeleton className="h-9 w-24 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
