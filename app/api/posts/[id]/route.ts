import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/auth";
import { parsePostInput } from "@/lib/validate";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext<"/api/posts/[id]">,
) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!UUID.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
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
    .update(parsed.data)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Update failed:", error.message);
    return NextResponse.json(
      { error: "Could not update the post" },
      { status: 500 },
    );
  }
  if (!data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext<"/api/posts/[id]">,
) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!UUID.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("ieee_node_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete failed:", error.message);
    return NextResponse.json(
      { error: "Could not delete the post" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
