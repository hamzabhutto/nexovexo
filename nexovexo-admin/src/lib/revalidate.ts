/**
 * Ping the public site to refresh its cached content after an admin change.
 * Fire-and-forget: failures are logged but never block the admin operation.
 */
export async function revalidatePublicSite(): Promise<void> {
  const url = process.env.PUBLIC_SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return;

  try {
    await fetch(`${url.replace(/\/$/, "")}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
      // Short timeout so a slow/unreachable public site never hangs the admin.
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("revalidatePublicSite failed:", err);
  }
}
