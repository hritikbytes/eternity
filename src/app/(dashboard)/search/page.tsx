import { SearchClient } from "@/features/search/components/search-client";

export const metadata = {
  title: "Advanced Search | Eternity",
  description: "Search and filter through millions of verified matrimonial profiles.",
};

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold">Discover Matches</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Use our advanced filtering system to find profiles that exactly match your preferences.
        </p>
      </div>
      
      <SearchClient />
    </div>
  );
}
