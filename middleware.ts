import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }: { req: any; token: any }) => {
      const pathName = req.nextUrl.pathname;

      if (pathName.startsWith("/api/admin") || pathName.startsWith("/admin")) {
        if (token?.user.role == "admin") {
          return true;
        } else {
          return false;
        }
      } else if (token) {
        return true;
      }
      return false;
    },
  },
});

export const config = {
  matcher: [
    "/api/orders/:path*",
    "/api/admin/orders/:path*",
    "/api/admin/products/create",
    "/api/admin/users/:path*",
    "/checkout/:path*",
    "/admin/:path*",
    "/shipping",
    "/admin/:path*",
  ],
};
