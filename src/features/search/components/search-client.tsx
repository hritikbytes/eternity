"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { SearchFilters } from "../types/search.types";
import { searchProfiles } from "../actions/search-profiles";
import { MatchProfile } from "@/features/dashboard/types/dashboard.types";
import { ProfileCard } from "@/features/dashboard/components/profile-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { SlidersHorizontal, Loader2 } from "lucide-react";

export function SearchClient() {
  const [filters, setFilters] = useState<SearchFilters>({
    ageRange: [18, 50],
    religion: [],
    caste: [],
    profession: [],
    city: "",
    education: [],
    income: [],
    maritalStatus: [],
    page: 1,
  });

  const [profiles, setProfiles] = useState<MatchProfile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchProfiles = useCallback(async (currentFilters: SearchFilters) => {
    startTransition(async () => {
      try {
        const { data, count } = await searchProfiles(currentFilters);
        setProfiles(data);
        setTotalCount(count);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    });
  }, []);

  // Initial Fetch
  useEffect(() => {
    fetchProfiles(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    fetchProfiles(newFilters);
    setIsMobileFilterOpen(false); // Close mobile drawer on apply
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-border/50 pr-8">
        <div className="sticky top-24">
          <FilterSidebar initialFilters={filters} onFilterChange={handleFilterChange} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Mobile Header with Sheet Trigger */}
        <div className="flex lg:hidden items-center justify-between bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
          <p className="font-medium text-sm text-muted-foreground">
            {isPending ? "Searching..." : `Found ${totalCount} matches`}
          </p>
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[350px] overflow-y-auto">
              <SheetHeader className="text-left mb-6">
                <SheetTitle>Search Filters</SheetTitle>
                <SheetDescription>Refine your match preferences.</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-4">
                <FilterSidebar initialFilters={filters} onFilterChange={handleFilterChange} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Header Stats */}
        <div className="hidden lg:flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold">Search Results</h2>
          <p className="text-sm text-muted-foreground font-medium bg-muted/50 px-3 py-1 rounded-full">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin inline mr-2" /> : null}
            {totalCount} profiles found
          </p>
        </div>

        {/* Profiles Grid */}
        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-2 rounded-3xl overflow-hidden border border-border/50 bg-card">
                <Skeleton className="aspect-[4/5] w-full" />
                <div className="flex h-16 divide-x divide-border/50">
                  <Skeleton className="flex-1 h-full rounded-none" />
                  <Skeleton className="flex-1 h-full rounded-none" />
                </div>
              </div>
            ))}
          </div>
        ) : profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onSkip={(id) => console.log("Skipped", id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card/50 rounded-3xl border border-border/50 border-dashed">
            <h3 className="text-xl font-heading font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn&apos;t find any profiles matching your exact criteria. Try broadening your filters (like age or religion).
            </p>
            <Button variant="outline" onClick={() => handleFilterChange({ ...filters, religion: [], education: [] })}>
              Clear strict filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
