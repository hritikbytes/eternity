"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Server-side validation schemas.
 * Client-side Zod schemas run in the browser and can be bypassed.
 * These duplicate the critical constraints on the server to prevent
 * malicious FormData from reaching Supabase.
 */
const signInServerSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(6).max(128),
});

const signUpServerSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
});

/**
 * Allowed redirect destinations after login.
 * Prevents open-redirect attacks via the `next` parameter.
 */
function sanitizeRedirect(raw: string): string {
  // Only allow relative paths starting with /
  // Block protocol-relative URLs (//evil.com) and absolute URLs
  if (!raw.startsWith("/") || raw.startsWith("//")) {
    return "/dashboard";
  }
  return raw;
}

export async function signIn(formData: FormData) {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");
  const rawNext = formData.get("next");

  // Server-side validation — reject bad input before it hits Supabase
  const parsed = signInServerSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    return { error: "Invalid email or password format." };
  }

  const next = sanitizeRedirect(
    typeof rawNext === "string" ? rawNext : "/dashboard"
  );

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Generic message — don't reveal whether the account exists
    return { error: "Invalid email or password." };
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(formData: FormData) {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  const parsed = signUpServerSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    return { error: "Invalid email or password format." };
  }

  const supabase = await createClient();

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Deliberately vague — don't confirm whether the email exists
  return { success: "Please check your email to verify your account." };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
