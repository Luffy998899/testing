import { NextRequest } from "next/server";

export function isAdminRequest(request: NextRequest) {
  const expectedToken = process.env.ADMIN_SESSION_TOKEN;
  const sessionCookie = request.cookies.get("f19_admin_session")?.value;

  if (!expectedToken) {
    return false;
  }

  return sessionCookie === expectedToken;
}
