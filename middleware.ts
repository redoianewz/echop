import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Restriction only on the checkout page
  publicRoutes: req => !req.url.includes('/checkout'),
  debug: true,
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
