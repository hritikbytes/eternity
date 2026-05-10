import { RequestsList } from "@/features/interests/components/requests-list";

export const metadata = {
  title: "Interest Requests | Eternity",
  description: "Manage your received and sent interest requests.",
};

export default function RequestsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold">Interest Requests</h1>
        <p className="text-muted-foreground mt-2">
          Manage profiles who are interested in you, and track the requests you&apos;ve sent to others.
        </p>
      </div>

      <RequestsList />
    </div>
  );
}
