import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";
import { revalidatePublicSite } from "@/lib/revalidate";

const schema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/).optional(),
  client: z.string().trim().max(160).optional(),
  category: z.string().trim().max(80).optional(),
  summary: z.string().trim().min(1).max(400).optional(),
  description: z.string().trim().max(5000).optional(),
  coverColor: z.enum(["cyan", "blue", "violet"]).optional(),
  techStack: z.string().trim().max(400).optional(),
  liveUrl: z.string().trim().max(300).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().int().optional(),
  status: z.enum(["completed", "in_progress", "pending", "on_hold"]).optional(),
  stage: z.enum(["discovery", "design", "development", "review", "launched"]).optional(),
  progress: z.number().int().min(0).max(100).optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  try {
    const updated = await prisma.project.update({ where: { id }, data: parsed.data });
    await revalidatePublicSite();
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Could not update project" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    await revalidatePublicSite();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete project" }, { status: 400 });
  }
}
