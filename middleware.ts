/*
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
*/


import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // Example: Protect only /dashboard and /api/dashboard/protected
    if (req.nextUrl.pathname.startsWith("/orders") || req.nextUrl.pathname.startsWith("/api/dashboard")) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  {
    secret: process.env.SECRET,
    pages: {
      signIn: "/sign-in",
    },
  }
);


export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
