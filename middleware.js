import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request) {
  const cookie = request.cookies.get("token");
  if (cookie == undefined) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  const { payload } = await jwtVerify(
    cookie.value,
    new TextEncoder().encode(process.env.JWT_Secreet)
  );
  if (payload) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
