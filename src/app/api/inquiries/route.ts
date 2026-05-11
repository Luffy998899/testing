import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  contact: z.string().min(6),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await db.addInquiry({ id: crypto.randomUUID(), ...parsed.data, createdAt: new Date().toISOString() });
  return NextResponse.json({ success: true }, { status: 201 });
}
