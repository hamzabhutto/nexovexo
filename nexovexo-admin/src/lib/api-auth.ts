import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

/** Guard for admin API routes. Returns a 401 response when not signed in. */
export async function guardApi(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}
