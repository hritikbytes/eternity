export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          gender: string | null
          date_of_birth: string | null
          bio: string | null
          height: number | null
          marital_status: string | null
          religion: string | null
          community: string | null
          mother_tongue: string | null
          location_city: string | null
          location_country: string | null
          education: string | null
          profession: string | null
          annual_income: string | null
          is_premium: boolean
          role: "user" | "admin"
          interests: string | null
        }
        Insert: {
          id: string
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          gender?: string | null
          date_of_birth?: string | null
          bio?: string | null
          height?: number | null
          marital_status?: string | null
          religion?: string | null
          community?: string | null
          mother_tongue?: string | null
          location_city?: string | null
          location_country?: string | null
          education?: string | null
          profession?: string | null
          annual_income?: string | null
          is_premium?: boolean
          role?: "user" | "admin"
          interests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          gender?: string | null
          date_of_birth?: string | null
          bio?: string | null
          height?: number | null
          marital_status?: string | null
          religion?: string | null
          community?: string | null
          mother_tongue?: string | null
          location_city?: string | null
          location_country?: string | null
          education?: string | null
          profession?: string | null
          annual_income?: string | null
          is_premium?: boolean
          role?: "user" | "admin"
          interests?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      interests: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          status: "pending" | "accepted" | "rejected" | "cancelled"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          status?: "pending" | "accepted" | "rejected" | "cancelled"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          status?: "pending" | "accepted" | "rejected" | "cancelled"
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interests_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interests_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
