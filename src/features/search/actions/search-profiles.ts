"use server";

import { createClient } from "@/lib/supabase/server";
import { SearchFilters } from "../types/search.types";
import { MatchProfile } from "@/features/dashboard/types/dashboard.types";

const PAGE_SIZE = 12;

export async function searchProfiles(filters: SearchFilters): Promise<{ data: MatchProfile[], count: number }> {
  const supabase = await createClient();

  // 2. Start Base Query
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' });

  // 3. Apply Dynamic Filters
  
  // Age Range -> Date of Birth conversion
  if (filters.ageRange && filters.ageRange.length === 2) {
    const today = new Date();
    
    // min age 18 -> born BEFORE (today - 18 years)
    const maxDate = new Date(today.getFullYear() - filters.ageRange[0], today.getMonth(), today.getDate()).toISOString();
    // max age 50 -> born AFTER (today - 50 years)
    const minDate = new Date(today.getFullYear() - filters.ageRange[1], today.getMonth(), today.getDate()).toISOString();
    
    query = query
      .lte('date_of_birth', maxDate)
      .gte('date_of_birth', minDate);
  }

  if (filters.religion && filters.religion.length > 0) {
    query = query.in('religion', filters.religion);
  }

  if (filters.caste && filters.caste.length > 0) {
    query = query.in('community', filters.caste); // mapped to community
  }

  if (filters.education && filters.education.length > 0) {
    query = query.in('education', filters.education);
  }

  if (filters.income && filters.income.length > 0) {
    query = query.in('annual_income', filters.income);
  }

  if (filters.maritalStatus && filters.maritalStatus.length > 0) {
    query = query.in('marital_status', filters.maritalStatus);
  }

  if (filters.city && filters.city.trim() !== '') {
    // Escape LIKE special characters to prevent pattern injection
    const sanitizedCity = filters.city.replace(/[%_\\]/g, "\\$&");
    query = query.ilike('location_city', `%${sanitizedCity}%`);
  }

  // 4. Pagination
  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  
  query = query
    .order('created_at', { ascending: false }) 
    .range(from, to);

  try {
    const { data, error, count } = await query;

    if (error) {
      console.error("Search Query Error:", error);
      throw new Error("Failed to execute search query");
    }

    const formattedData: MatchProfile[] = (data || []).map((row) => {
      // Calculate age from DOB
      let age = 0;
      if (row.date_of_birth) {
        const dob = new Date(row.date_of_birth);
        const ageDifMs = Date.now() - dob.getTime();
        const ageDate = new Date(ageDifMs);
        age = Math.abs(ageDate.getUTCFullYear() - 1970);
      }

      return {
        id: row.id,
        name: `${row.first_name || ""} ${row.last_name || ""}`.trim() || "Unknown",
        age,
        profession: row.profession || "Not specified",
        location: `${row.location_city || ""}${row.location_country ? `, ${row.location_country}` : ""}`.trim() || "Not specified",
        imageUrl: row.avatar_url ? row.avatar_url.split(',')[0] : "/images/placeholder.jpg",
        matchPercentage: Math.floor(Math.random() * (99 - 70 + 1)) + 70,
        isPremium: row.is_premium || false,
        isVerified: true, // Assuming true for now
        religion: row.religion || "",
        education: row.education || "",
        bio: row.bio || undefined,
      };
    });

    return { data: formattedData, count: count || 0 };
  } catch (error) {
    console.error("Search Action Failed:", error);
    return { data: [], count: 0 };
  }
}
