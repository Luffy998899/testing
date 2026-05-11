import { NextResponse } from "next/server";
import { z } from "zod";
import { uploadToCloudinary } from "@/lib/cloudinary";

const schema = z.object({
  fileBase64: z.string().min(20)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const uploaded = await uploadToCloudinary(parsed.data.fileBase64);
    return NextResponse.json({ data: uploaded }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
