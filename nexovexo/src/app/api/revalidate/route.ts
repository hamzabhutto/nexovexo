import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand cache revalidation. The admin app calls this after it changes
 * content, so the public site reflects edits immediately instead of waiting
 * for the periodic ISR window. Protected by a shared secret.
 *
 * POST /api/revalidate   { "secret": "<REVALIDATE_SECRET>" }
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const provided = body?.secret ?? request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || provided !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Refresh the home page (and the book page, which has no DB content but is
  // cheap to include). Layout mode refreshes the whole route.
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, at: Date.now() });
}
