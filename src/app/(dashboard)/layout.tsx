"use client";

import { HeartHandshake, LayoutGrid, Search, Bell, UserCircle, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/UserAvatar";
import { signOut } from "@/features/auth/actions/auth.actions";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Matches", icon: LayoutGrid },
  { href: "/search", label: "Search", icon: Search },
  { href: "/requests", label: "Requests", icon: Bell },
  { href: "/profile", label: "My Profile", icon: UserCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ───── Top Navigation ───── */}
      <header className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 text-primary font-heading text-xl font-semibold group"
          >
            <HeartHandshake className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:inline">Eternity</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-muted-foreground hover:text-destructive h-9 px-3"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              <span className="text-xs">Sign Out</span>
            </Button>

            <UserAvatar />

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-foreground p-2 -mr-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                );
              })}
              <div className="pt-2 mt-1 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-destructive px-4 py-3 h-auto"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ───── Main Content ───── */}
      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-10">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </main>
    </div>
  );
}
