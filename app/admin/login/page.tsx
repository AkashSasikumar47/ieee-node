import { AppHeader } from "@/components/app-header";
import { LoginForm } from "@/components/login-form";
import { safeReturnTo } from "@/lib/return-to";

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const { error, next } = await searchParams;

  return (
    <div className="flex-1">
      <AppHeader />
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Admins only. Everyone else can just read the feed.
          </p>
        </div>
        <LoginForm
          error={typeof error === "string" ? error : undefined}
          next={safeReturnTo(next)}
        />
      </main>
    </div>
  );
}
