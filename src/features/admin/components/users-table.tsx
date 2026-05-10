"use client";

import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, ShieldAlert, Crown, Trash2, Loader2 } from "lucide-react";
import { deleteUser, togglePremium } from "../actions/admin-actions";
import { toast } from "sonner";

interface UserRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  is_premium: boolean;
  created_at: string;
}

export function UsersTable({ initialUsers }: { initialUsers: UserRow[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const handleTogglePremium = (id: string, currentPremium: boolean) => {
    startTransition(async () => {
      // Optimistic update
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_premium: !currentPremium } : u));
      try {
        await togglePremium(id, !currentPremium);
        toast.success(`User premium status updated`);
      } catch (error: unknown) {
        // Revert
        setUsers(prev => prev.map(u => u.id === id ? { ...u, is_premium: currentPremium } : u));
        toast.error(error instanceof Error ? error.message : "Failed to update premium status");
      }
    });
  };

  const handleDeleteUser = (id: string) => {
    if (!window.confirm("Are you sure you want to completely delete this user? This cannot be undone.")) return;
    
    startTransition(async () => {
      // Optimistic update
      setUsers(prev => prev.filter(u => u.id !== id));
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
      } catch (error: unknown) {
        // We can't perfectly revert a delete visually without fetching again, but we just refresh the page
        toast.error(error instanceof Error ? error.message : "Failed to delete user");
        window.location.reload();
      }
    });
  };

  return (
    <div className="rounded-md border border-border/50 bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar_url ? user.avatar_url.split(',')[0] : ""} />
                    <AvatarFallback>{user.first_name?.[0] || "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{user.id.split('-')[0]}...</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.role === 'admin' ? (
                  <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-none shadow-none"><ShieldAlert className="h-3 w-3 mr-1" /> Admin</Badge>
                ) : (
                  <Badge variant="secondary" className="shadow-none">User</Badge>
                )}
              </TableCell>
              <TableCell>
                {user.is_premium ? (
                  <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-none shadow-none"><Crown className="h-3 w-3 mr-1" /> Premium</Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">Standard</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {(() => {
                  const d = new Date(user.created_at);
                  const day = String(d.getDate()).padStart(2, "0");
                  const month = String(d.getMonth() + 1).padStart(2, "0");
                  const year = d.getFullYear();
                  return `${day}/${month}/${year}`;
                })()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0" 
                    disabled={isPending}
                  >
                    <span className="sr-only">Open menu</span>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                      Copy User ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleTogglePremium(user.id, user.is_premium)}>
                      {user.is_premium ? "Remove Premium" : "Grant Premium"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={user.role === 'admin'}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
