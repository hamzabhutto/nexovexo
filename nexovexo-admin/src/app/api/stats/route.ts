import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return NextResponse.json(await prisma.siteStat.findMany({ orderBy: { order: "asc" } }));
}
