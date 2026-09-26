import { AppHeader } from "@/components/app-header";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-dvh">
      <AppHeader subtitle="Admin" />
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Admins only. Everyone else can just read the feed.
          </p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
