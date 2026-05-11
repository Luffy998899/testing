import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname === "/admin/login") {
    return res;
  }

  const expectedToken = process.env.ADMIN_SESSION_TOKEN;
  const sessionCookie = req.cookies.get("f19_admin_session")?.value;
  if (expectedToken && sessionCookie === expectedToken) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const role = session?.user?.user_metadata?.role;
  if (!session || (role !== "admin" && role !== "manager")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"]
};
