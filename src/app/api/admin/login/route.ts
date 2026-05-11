import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSessionToken = process.env.ADMIN_SESSION_TOKEN;

  if (!adminEmail || !adminPassword || !adminSessionToken) {
    return NextResponse.json(
      { error: "Admin auth is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_TOKEN." },
      { status: 500 }
    );
  }

  if (parsed.data.email !== adminEmail || parsed.data.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("f19_admin_session", adminSessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
