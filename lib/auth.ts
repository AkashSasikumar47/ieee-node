import { createClient } from "@ieee/supabase/server";

export async function getAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: isAdmin } = await supabase.rpc("ieee_shared_is_admin");
  return isAdmin ? supabase : null;
}
