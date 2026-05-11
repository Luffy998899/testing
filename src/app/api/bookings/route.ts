import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = bookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await db.addBooking({ id: crypto.randomUUID(), ...parsed.data, createdAt: new Date().toISOString() });
  return NextResponse.json({ success: true }, { status: 201 });
}
