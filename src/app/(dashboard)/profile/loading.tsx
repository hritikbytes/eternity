import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4" aria-label="Loading profile">
      {/* Header card skeleton */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm">
        <Skeleton className="h-36 md:h-44 w-full rounded-none" />
        <div className="px-6 md:px-8 pb-8 -mt-16 relative">
          <Skeleton className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-background mb-5" />
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-9 w-28 rounded-lg self-start" />
          </div>
        </div>
      </div>
      {/* Details grid skeleton */}
      <div className="grid sm:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[68px] rounded-2xl" />
        ))}
      </div>
      {/* Bio skeleton */}
      <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-3">
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
      </div>
    </div>
  );
}
