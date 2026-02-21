import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ status: "success" });
  }

  return NextResponse.json(
    { status: "error", error: "Invalid credentials" },
    { status: 401 },
  );
}
