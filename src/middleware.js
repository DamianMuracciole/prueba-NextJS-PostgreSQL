export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/api/auth/:path*",
    // "/api/products/:path*",
    // "/auth/logout",
    "/auth/products",
    // "/auth/user",
  ],
};
