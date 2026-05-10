"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { ProfileCard } from "./profile-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MatchProfile } from "../types/dashboard.types";

import { searchProfiles } from "@/features/search/actions/search-profiles";


export function DashboardGrid() {
  const [profiles, setProfiles] = useState<MatchProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchMatches() {
      try {
        const result = await searchProfiles({
          ageRange: [18, 50],
          religion: [],
          caste: [],
          profession: [],
          education: [],
          income: [],
          maritalStatus: [],
          page: 1,
        });
        if (isMounted) {
          setProfiles(result.data);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchMatches();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSkip = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Search & Filters Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, profession, or location..." 
            className="pl-9 bg-muted/50 border-none"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-heading font-semibold text-foreground">Your Top Matches</h2>
        <p className="text-muted-foreground text-sm mt-1">Based on your preferences and location.</p>
      </div>

      {/* Grid or Skeleton or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-2 rounded-[2rem] overflow-hidden border border-border/40 bg-card shadow-sm">
              <Skeleton className="aspect-[3/4] w-full" />
              <div className="flex h-16 divide-x divide-border/30 bg-card/50">
                <Skeleton className="flex-1 h-full rounded-none" />
                <Skeleton className="flex-1 h-full rounded-none" />
                <Skeleton className="flex-1 h-full rounded-none" />
              </div>
            </div>
          ))}
        </div>
      ) : profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${parseInt(profile.id) * 100}ms` }}>
              <ProfileCard 
                profile={profile} 
                onSkip={handleSkip}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-card rounded-3xl border border-border/50 border-dashed">
          <h3 className="text-xl font-heading font-semibold mb-2">No more matches</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            You&apos;ve viewed all your top matches for today. Broaden your preferences to see more profiles.
          </p>
          <Button>Update Preferences</Button>
        </div>
      )}
    </div>
  );
}
