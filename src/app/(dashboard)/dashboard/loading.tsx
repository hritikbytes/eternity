import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8" aria-label="Loading matches">
      {/* Fake search bar */}
      <Skeleton className="h-16 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded" />
      </div>
      {/* Fake card grid matching the real layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-[2rem] overflow-hidden border border-border/40 bg-card shadow-sm"
          >
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="flex h-16 divide-x divide-border/30">
              <Skeleton className="flex-1 h-full rounded-none" />
              <Skeleton className="flex-[2] h-full rounded-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
