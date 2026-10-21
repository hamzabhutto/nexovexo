import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";

const schema = z.object({
  label: z.string().trim().min(1).max(60).optional(),
  value: z.string().trim().min(1).max(20).optional(),
  percent: z.number().int().min(0).max(100).optional(),
  color: z.enum(["cyan", "blue", "violet", "teal", "pink", "amber", "green"]).optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  try {
    return NextResponse.json(await prisma.siteStat.update({ where: { id }, data: parsed.data }));
  } catch {
    return NextResponse.json({ error: "Could not update stat" }, { status: 400 });
  }
}
