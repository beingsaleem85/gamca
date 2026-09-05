import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Prefer valid service key (non-sbp) or fallback to anon key
const keyToUse = (rawServiceKey && !rawServiceKey.startsWith("sbp_")) ? rawServiceKey : supabaseAnonKey;

export const supabase = supabaseUrl && keyToUse
  ? createClient(supabaseUrl, keyToUse)
  : null;

export interface MedicalTokenRecord {
  id?: string;
  application_id: string;
  created_at?: string;
  examination_country: string;
  city: string;
  destination_country: string;
  appointment_type: string;
  preferred_appointment_date: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  gender: string;
  marital_status: string;
  passport_number: string;
  passport_issue_date: string;
  passport_issue_place: string;
  passport_expiry_date: string;
  visa_type: string;
  position_applied: string;
  other_position?: string;
  email: string;
  phone: string;
  national_id: string;
  additional_information?: string;
  payment_screenshot_path?: string;
  status?: string;
}

export async function saveRequestToSupabase(record: MedicalTokenRecord) {
  if (!supabase) {
    console.warn("Supabase credentials not configured. Skipping database save.");
    return { success: false, message: "Supabase not configured" };
  }

  try {
    const { data, error } = await supabase
      .from("medical_token_requests")
      .insert([record])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: unknown) {
    console.error("Unexpected error saving to Supabase:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}
