export type InterestStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface InterestRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: InterestStatus;
  created_at: string;
  updated_at: string;
}

export interface InterestWithProfile extends InterestRequest {
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    profession: string | null;
    location_city: string | null;
    age?: number; // Calculated field
  };
}
