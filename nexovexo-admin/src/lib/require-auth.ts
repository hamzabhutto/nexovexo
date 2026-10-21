import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "@/lib/auth";

/** Server-side guard for admin pages. Redirects to /login when not signed in. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
