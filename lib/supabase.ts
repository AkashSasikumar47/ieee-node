import { createClient } from "@supabase/supabase-js";

export type FeedType = "Event" | "Meeting" | "Workshop";

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: FeedType;
  created_at: string;
}

export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
