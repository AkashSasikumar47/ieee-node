import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/auth";
import { parsePostInput } from "@/lib/validate";

export async function POST(request: NextRequest) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parsePostInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("ieee_node_posts")
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    console.error("Insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not save the post" },
      { status: 500 },
    );
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
