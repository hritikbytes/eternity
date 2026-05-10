"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { profileSchema } from "../types/profile.types";

/**
 * Maps the front-end form fields to the Supabase `profiles` table columns.
 */
interface ProfilePayload {
  fullName: string;
  age: number;
  gender: string;
  religion: string;
  maritalStatus: string;
  motherTongue: string;
  community?: string;
  height?: number;
  profession: string;
  education: string;
  income: string;
  city: string;
  state: string;
  bio: string;
  interests: string;
  lifestyle?: string;
  avatarUrl?: string;
  isPublic?: boolean;
}

/**
 * Upsert the profile for the currently authenticated user.
 *
 * Security:
 * - Re-validates input server-side with Zod (client schemas are bypassable)
 * - Uses auth user ID as the row ID (users can only modify their own profile)
 * - Strips HTML-like characters from free-text fields
 */
export async function upsertProfile(payload: ProfilePayload) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be signed in to save a profile." };
  }

  // ── Server-side validation ──
  const parsed = profileSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { error: firstError?.message || "Invalid profile data." };
  }

  const data = parsed.data;

  // ── Sanitize free-text fields ──
  const sanitize = (str: string) =>
    str
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trim();

  const nameParts = sanitize(data.fullName).split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const today = new Date();
  const dobYear = today.getFullYear() - data.age;
  const dateOfBirth = `${dobYear}-01-01`;

  const profileRow = {
    id: user.id,
    first_name: firstName,
    last_name: lastName,
    avatar_url: data.avatarUrl || null,
    gender: data.gender,
    date_of_birth: dateOfBirth,
    bio: sanitize(data.bio),
    religion: data.religion,
    marital_status: data.maritalStatus,
    mother_tongue: sanitize(data.motherTongue),
    community: data.community ? sanitize(data.community) : null,
    height: data.height || null,
    location_city: sanitize(data.city),
    location_country: sanitize(data.state),
    education: data.education,
    profession: sanitize(data.profession),
    annual_income: data.income,
    interests: sanitize(data.interests),
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(profileRow, { onConflict: "id" });

  if (error) {
    console.error("Failed to upsert profile:", error);
    return { error: "Failed to save profile. Please try again." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/profile");
  revalidatePath("/search");

  return { success: true };
}

/**
 * Fetch the profile of the currently authenticated user.
 */
export async function getMyProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  return data ?? null;
}

/**
 * Fetch a public profile by ID (for viewing other users).
 */
export async function getProfileById(profileId: string) {
  // Validate the ID is a UUID to prevent injection
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(profileId)) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile by ID:", error);
    return null;
  }

  return data;
}
