import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@ieee/supabase/server";

export async function POST(request: NextRequest) {
  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json(
      { error: "Incorrect email or password" },
      { status: 401 },
    );
  }

  const { data: isAdmin } = await supabase.rpc("ieee_shared_is_admin");
  if (!isAdmin) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "This account is not an admin" },
      { status: 403 },
    );
  }

  return NextResponse.json({ ok: true });
}
