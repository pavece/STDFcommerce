import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => token?.userRole === "admin",
  },
});

export const config = { matcher: ["/checkout"] };
