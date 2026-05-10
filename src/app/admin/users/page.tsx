import { getAllUsers } from "@/features/admin/actions/admin-actions";
import { UsersTable } from "@/features/admin/components/users-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const metadata = {
  title: "User Management | Admin",
};

export default async function AdminUsersPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams.q === "string" ? searchParams.q : "";
  const { data: users, count } = await getAllUsers(1, query);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all registered accounts, roles, and subscriptions. Total: {count}</p>
        </div>
      </div>

      <div className="flex gap-2 max-w-sm">
        <form className="flex w-full relative" action="/admin/users" method="GET">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            name="q"
            placeholder="Search by name..." 
            defaultValue={query}
            className="pl-9 w-full rounded-r-none"
          />
          <Button type="submit" variant="secondary" className="rounded-l-none border border-l-0 border-border/50">Search</Button>
        </form>
      </div>

      <UsersTable initialUsers={users || []} />
    </div>
  );
}
