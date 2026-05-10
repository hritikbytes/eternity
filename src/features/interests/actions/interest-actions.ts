"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { InterestStatus, InterestWithProfile } from "../types/interest.types";

/**
 * Send an interest request to another profile
 */
export async function sendInterest(receiverId: string) {
  // Validate receiverId is a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(receiverId)) {
    throw new Error("Invalid profile ID");
  }

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (user.id === receiverId) {
    throw new Error("You cannot send an interest to yourself");
  }

  // Check if an interest already exists to prevent duplicates
  const { data: existing } = await supabase
    .from('interests')
    .select('id, status')
    .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
    .single();

  if (existing) {
    throw new Error(`An interest request already exists with status: ${existing.status}`);
  }

  const { error } = await supabase
    .from('interests')
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      status: 'pending'
    });

  if (error) {
    console.error("Failed to send interest:", error);
    throw new Error("Failed to send interest request");
  }

  revalidatePath('/dashboard');
  revalidatePath('/search');
  revalidatePath('/requests');
  
  return { success: true };
}

/**
 * Update the status of an existing interest (Accept, Reject, Cancel)
 */
export async function updateInterestStatus(interestId: string, newStatus: InterestStatus) {
  // Validate interestId is a UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(interestId)) {
    throw new Error("Invalid request ID");
  }

  // Validate status is one of the allowed values
  const allowedStatuses: InterestStatus[] = ['accepted', 'rejected', 'cancelled'];
  if (!allowedStatuses.includes(newStatus)) {
    throw new Error("Invalid status");
  }

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify ownership/authorization before updating
  const { data: interest, error: fetchError } = await supabase
    .from('interests')
    .select('*')
    .eq('id', interestId)
    .single();

  if (fetchError || !interest) {
    throw new Error("Interest request not found");
  }

  // Security: Only sender can cancel. Only receiver can accept/reject.
  if (newStatus === 'cancelled' && interest.sender_id !== user.id) {
    throw new Error("Unauthorized to cancel this request");
  }
  if ((newStatus === 'accepted' || newStatus === 'rejected') && interest.receiver_id !== user.id) {
    throw new Error("Unauthorized to respond to this request");
  }

  const { error: updateError } = await supabase
    .from('interests')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', interestId);

  if (updateError) {
    console.error("Failed to update interest:", updateError);
    throw new Error("Failed to update interest status");
  }

  revalidatePath('/requests');
  revalidatePath('/dashboard');
  
  return { success: true };
}

/**
 * Fetch requests received by the current user
 */
export async function getReceivedInterests(): Promise<InterestWithProfile[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('interests')
    .select(`
      *,
      profile:profiles!interests_sender_id_fkey(
        id, first_name, last_name, avatar_url, profession, location_city, date_of_birth
      )
    `)
    .eq('receiver_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching received interests:", error);
    return [];
  }

  return (data || []).map((item: Record<string, unknown>) => {
    const profile = item.profile as Record<string, unknown> | null;
    return {
      ...item,
      profile: {
        ...profile,
        age: calculateAge((profile?.date_of_birth as string) ?? null)
      }
    } as InterestWithProfile;
  });
}

/**
 * Fetch requests sent by the current user
 */
export async function getSentInterests(): Promise<InterestWithProfile[]> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('interests')
    .select(`
      *,
      profile:profiles!interests_receiver_id_fkey(
        id, first_name, last_name, avatar_url, profession, location_city, date_of_birth
      )
    `)
    .eq('sender_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching sent interests:", error);
    return [];
  }

  return (data || []).map((item: Record<string, unknown>) => {
    const profile = item.profile as Record<string, unknown> | null;
    return {
      ...item,
      profile: {
        ...profile,
        age: calculateAge((profile?.date_of_birth as string) ?? null)
      }
    } as InterestWithProfile;
  });
}

/**
 * Get the current interest status between logged in user and a specific profile
 * Used to render the correct button state (Send, Pending, Accepted)
 */
export async function checkInterestStatus(profileId: string): Promise<{ status: InterestStatus | null, isSender: boolean }> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { status: null, isSender: false };

  const { data } = await supabase
    .from('interests')
    .select('status, sender_id')
    .or(`and(sender_id.eq.${user.id},receiver_id.eq.${profileId}),and(sender_id.eq.${profileId},receiver_id.eq.${user.id})`)
    .single();

  if (!data) return { status: null, isSender: false };

  return { 
    status: data.status as InterestStatus, 
    isSender: data.sender_id === user.id 
  };
}

// Utility
function calculateAge(dateString: string | null) {
  if (!dateString) return undefined;
  const dob = new Date(dateString);
  const ageDifMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
