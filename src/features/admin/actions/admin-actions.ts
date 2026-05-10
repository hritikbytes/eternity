"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function checkIsAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return data?.role === 'admin';
}

export async function requireAdmin() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
}

export async function getAdminStats() {
  await requireAdmin();
  const supabase = await createClient();

  const [{ count: usersCount }, { count: premiumCount }, { count: requestsCount }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
    supabase.from('interests').select('*', { count: 'exact', head: true }),
  ]);

  return {
    totalUsers: usersCount || 0,
    premiumUsers: premiumCount || 0,
    totalRequests: requestsCount || 0,
  };
}

export async function getAllUsers(page = 1, search = "") {
  await requireAdmin();
  const supabase = await createClient();
  
  const limit = 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('profiles')
    .select('id, first_name, last_name, avatar_url, role, is_premium, created_at', { count: 'exact' });

  if (search) {
    // Escape LIKE special characters to prevent pattern injection
    const sanitized = search.replace(/[%_\\]/g, "\\$&");
    query = query.or(`first_name.ilike.%${sanitized}%,last_name.ilike.%${sanitized}%`);
  }

  const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);

  if (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }

  return { data, count: count || 0 };
}

export async function deleteUser(userId: string) {
  // Validate userId is a UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(userId)) {
    throw new Error("Invalid user ID");
  }

  await requireAdmin();
  const supabase = await createClient();

  // Protect against deleting oneself
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.id === userId) {
    throw new Error("Cannot delete your own admin account");
  }

  // NOTE: In a real app, you would also use supabase admin auth to delete the user from auth.users
  // Here we just delete the profile. We assume CASCADE deletes interests.
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user");
  }

  revalidatePath('/admin/users');
  return { success: true };
}

export async function togglePremium(userId: string, isPremium: boolean) {
  // Validate userId is a UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(userId)) {
    throw new Error("Invalid user ID");
  }

  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ is_premium: isPremium })
    .eq('id', userId);

  if (error) {
    console.error("Failed to update user premium status:", error);
    throw new Error("Failed to update user premium status");
  }

  revalidatePath('/admin/users');
  return { success: true };
}
