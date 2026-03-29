import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  let supabaseResponse: ReturnType<typeof NextResponse.next> | Awaited<ReturnType<typeof updateSession>>["supabaseResponse"];
  let user = null;
  let userRole: string | null = null;

  try {
    const session = await updateSession(request);
    supabaseResponse = session.supabaseResponse;
    user = session.user;

    // Read user role from app_metadata in JWT claims
    if (user) {
      const {
        data: { session: authSession },
      } = await session.supabase.auth.getSession();
      if (authSession?.access_token) {
        const payload = JSON.parse(atob(authSession.access_token.split(".")[1]));
        userRole = payload.app_metadata?.user_role ?? payload.user_role ?? "user";
      } else {
        userRole = "user";
      }
    }
  } catch {
    // If Supabase is unavailable, allow the request through without auth
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const isAuthenticated = !!user;
  const isAdmin = userRole === "admin";
  supabaseResponse = supabaseResponse ?? NextResponse.next();

  // --- Auth pages: redirect authenticated users away ---
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      const redirectTo = isAdmin ? "/admin/dashboard" : "/dashboard";
      const url = request.nextUrl.clone();
      url.pathname = redirectTo;
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // --- Dashboard routes: require authentication; redirect admins to admin dashboard ---
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // --- Admin routes: require admin role ---
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (!isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // --- Public routes: pass through ---
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
