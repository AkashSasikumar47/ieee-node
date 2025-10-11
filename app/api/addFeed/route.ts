import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const sheetWebhook = process.env.NEXT_PUBLIC_SHEET_WEBHOOK;
    if (!sheetWebhook) {
      return NextResponse.json(
        { status: "error", error: "Sheet Webhook not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(sheetWebhook, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: "error", error: "Invalid JSON from Apps Script" };
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", error: "Failed to post to Google Sheet" },
      { status: 500 },
    );
  }
}
