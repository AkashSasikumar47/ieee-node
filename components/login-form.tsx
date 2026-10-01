"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@ieee/ui/components/alert";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";

const ERRORS: Record<string, string> = {
  credentials: "Incorrect email or password",
  admin: "This account is not an admin",
};

export function LoginForm({
  error,
  next,
}: {
  error?: string;
  next?: string | null;
}) {
  const [pending, setPending] = useState(false);
  const message = error ? (ERRORS[error] ?? ERRORS.credentials) : "";

  return (
    <form
      method="post"
      action="/api/auth/login"
      onSubmit={() => setPending(true)}
      className={`flex flex-col gap-4 ${message ? "animate-shake" : ""}`}
    >
      {next && <input type="hidden" name="next" value={next} />}
      {message && (
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          className="h-12 text-base"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-12 text-base"
        />
      </div>
      <Button type="submit" size="lg" className="h-12" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
