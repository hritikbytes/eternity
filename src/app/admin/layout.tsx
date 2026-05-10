import { redirect } from "next/navigation";
import Link from "next/link";
import { checkIsAdmin } from "@/features/admin/actions/admin-actions";
import { ShieldAlert, Users, LayoutDashboard, Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Dashboard | Eternity",
  description: "Eternity Matrimonial Admin Control Panel",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-r border-border/50 bg-card p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="flex items-center gap-2 mb-8 text-primary">
          <ShieldAlert className="h-6 w-6" />
          <span className="font-heading font-bold text-xl tracking-tight">Admin<span className="text-foreground">Panel</span></span>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> User Management
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" disabled>
            <Settings className="mr-2 h-4 w-4" /> Settings (Coming Soon)
          </Button>
        </nav>

        <div className="mt-8 pt-8 border-t border-border/50">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full justify-start">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to App
            </Button>
          </Link>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
