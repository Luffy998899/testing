import { NextRequest, NextResponse } from "next/server";
import { settingsSchema } from "@/lib/schemas";
import { db } from "@/lib/db";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  const data = await db.getSettings();
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = settingsSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await db.setSettings(parsed.data);
  return NextResponse.json({ data });
}
