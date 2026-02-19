import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  try {
    const body = await req.json();
    const { title, description, date, type } = body;

    if (!title || !description || !date || !type) {
      return NextResponse.json(
        { status: "error", error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("node_feed")
      .insert([{ title, description, date, type }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { status: "error", error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", error: "Failed to add feed item" },
      { status: 500 },
    );
  }
}
