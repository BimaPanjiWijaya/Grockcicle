import { cookies } from "next/headers";
import errorHandler from "./helpers/errorHandler";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value;
  if (request.nextUrl.pathname.startsWith("/api")) {
    try {
      const [bearer, accessToken] = token?.split(" ") || [];

      if (bearer !== "Bearer" || !accessToken) {
        throw { message: "Please login first", status: 401 };
      }

      const secretKey = process.env.SECRET_KEY!;
      const decoded = verify(accessToken, secretKey) as { userId: string };
      const userId = decoded.userId;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("X-User-Id", userId);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      console.log("User ID set in header:", userId);
      return response;
    } catch (error) {
      return errorHandler(error);
    }
  }
  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  const guestOnlyPaths = ["/login", "/register"];
  if (guestOnlyPaths.includes(request.nextUrl.pathname)) {
    if (token) {
      try {
        const [bearer, accessToken] = token.split(" ");
        if (bearer === "Bearer" && accessToken) {
          verify(accessToken, process.env.SECRET_KEY!);
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/api/wishlist/:path*", "/wishlist/:path*", "/login", "/register"],
};
