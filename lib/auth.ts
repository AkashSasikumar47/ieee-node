import { createClient } from "@ieee/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

export async function getAdmin(supabase: SupabaseClient) {
  const [
    {
      data: { user },
    },
    { data: admin },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.rpc("ieee_shared_is_admin"),
  ]);
  return user && admin ? user : null;
}

export async function getAdminClient() {
  const supabase = await createClient();
  return (await getAdmin(supabase)) ? supabase : null;
}
