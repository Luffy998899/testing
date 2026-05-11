import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallerySchema } from "@/lib/schemas";
import { isAdminRequest } from "@/lib/admin-auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = gallerySchema.partial().safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await db.updateGalleryItem(params.id, parsed.data);
  return NextResponse.json({ data: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.deleteGalleryItem(params.id);
  return NextResponse.json({ success: true });
}
