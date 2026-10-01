import { redirect } from "next/navigation";
import { createClient } from "@ieee/supabase/server";
import { AdminDashboard } from "@/components/admin-dashboard";
import { AppHeader } from "@/components/app-header";
import { SignOutButton } from "@/components/sign-out-button";
import { getAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const supabase = await createClient();
  const [admin, { data, error }] = await Promise.all([
    getAdmin(supabase),
    supabase.from("ieee_node_posts").select("*"),
  ]);

  if (!admin) redirect("/admin/login");
  if (error) console.error("Failed to load posts for admin:", error.message);

  return (
    <div className="flex-1">
      <AppHeader />
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 pt-6 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-xl font-semibold">Admin</h1>
            <p className="truncate text-sm text-muted-foreground">
              {admin.email}
            </p>
          </div>
          <SignOutButton />
        </div>
        <AdminDashboard posts={data ?? []} />
      </main>
    </div>
  );
}
