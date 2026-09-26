import type { Tables } from "@ieee/supabase/types";

export type Post = Tables<"ieee_node_posts">;

export const POST_TYPES = ["Event", "Meeting", "Workshop"] as const;

export type PostType = (typeof POST_TYPES)[number];

export type PostInput = Pick<
  Post,
  "title" | "description" | "event_date" | "type"
>;

export const TITLE_MAX = 120;
export const DESCRIPTION_MAX = 2000;
