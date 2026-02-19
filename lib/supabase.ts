import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "Event" | "Meeting" | "Workshop";
  created_at: string;
}
