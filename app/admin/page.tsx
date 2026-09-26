import { redirect } from "next/navigation";
import { AdminConsole } from "@/components/admin-console";
import { AppHeader } from "@/components/app-header";
import { getAdminClient } from "@/lib/auth";

export default async function AdminPage() {
  const supabase = await getAdminClient();
  if (!supabase) redirect("/admin/login");

  const { data, error } = await supabase
    .from("ieee_node_posts")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) console.error("Failed to load posts for admin:", error.message);

  return (
    <div className="min-h-dvh">
      <AppHeader subtitle="Admin" />
      <main className="mx-auto max-w-md px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <AdminConsole posts={data ?? []} />
      </main>
    </div>
  );
}
