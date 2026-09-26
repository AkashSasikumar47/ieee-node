import { redirect } from "next/navigation";
import { createClient } from "@ieee/supabase/server";
import { AdminConsole } from "@/components/admin-console";
import { AppHeader } from "@/components/app-header";
import { isAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const supabase = await createClient();
  const [admin, { data, error }] = await Promise.all([
    isAdmin(supabase),
    supabase
      .from("ieee_node_posts")
      .select("*")
      .order("event_date", { ascending: false }),
  ]);

  if (!admin) redirect("/admin/login");
  if (error) console.error("Failed to load posts for admin:", error.message);

  return (
    <div className="flex-1">
      <AppHeader />
      <main className="mx-auto max-w-md px-4 pt-6 pb-6">
        <AdminConsole posts={data ?? []} />
      </main>
    </div>
  );
}
