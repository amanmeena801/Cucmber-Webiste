import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "WARNING: Missing Supabase environment variables (SUPABASE_URL / SUPABASE_ANON_KEY). Cloud operations will fail."
  );
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export interface Inquiry {
  id?: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  crop: string;
  qty: string;
  msg: string;
  created_at?: string;
}

// Save a new inquiry to Supabase
export async function saveInquiry(inquiry: Inquiry): Promise<number> {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please define SUPABASE_URL and SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase
    .from("inquiries")
    .insert([
      {
        name: inquiry.name,
        company: inquiry.company,
        email: inquiry.email,
        phone: inquiry.phone,
        crop: inquiry.crop,
        qty: inquiry.qty,
        msg: inquiry.msg,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
  return data && data[0] ? data[0].id : 0;
}

// Retrieve all inquiries from Supabase
export async function getAllInquiries(): Promise<Inquiry[]> {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please define SUPABASE_URL and SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }
  return data as Inquiry[];
}

// Delete an inquiry from Supabase
export async function deleteInquiry(id: number): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please define SUPABASE_URL and SUPABASE_ANON_KEY.");
  }

  const { error } = await supabase
    .from("inquiries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    throw error;
  }
}
