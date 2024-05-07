export { default } from "next-auth/middleware";

console.log('pasaste por middlwware')

export const config = {
  matcher: [
    // "/api/auth/:path*",
    // "/api/products/:path*",
    // "/auth/logout",
    "/auth/products/:path*",
    // "/auth/user",
  ],
};

// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/auth/products/:path*',
// }