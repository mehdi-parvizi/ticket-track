export { auth as middleware } from "@/app/auth";

export const config = {
  matcher: ["/issues/new", "/issues/:id/edit"],
};
