import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallerySchema } from "@/lib/schemas";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  const data = await db.listGallery();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = gallerySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const created = await db.addGalleryItem({ id: crypto.randomUUID(), ...parsed.data });
  return NextResponse.json({ data: created }, { status: 201 });
}
