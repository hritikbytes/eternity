import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="space-y-6" aria-label="Loading search">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded" />
      </div>
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Filter sidebar skeleton */}
        <Skeleton className="h-[600px] rounded-2xl" />
        {/* Results grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-[2rem] overflow-hidden border border-border/40 bg-card shadow-sm"
            >
              <Skeleton className="aspect-[3/4] w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
