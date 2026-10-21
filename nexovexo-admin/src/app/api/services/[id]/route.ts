import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";

const schema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/).optional(),
  summary: z.string().trim().min(1).max(400).optional(),
  description: z.string().trim().max(5000).optional(),
  icon: z.enum(["code", "cloud", "spark", "mobile", "design", "shield", "shield-scan", "pulse", "agent", "layers", "chat", "brain", "blocks", "server", "plug"]).optional(),
  features: z.string().trim().max(2000).optional(),
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
    return NextResponse.json(await prisma.service.update({ where: { id }, data: parsed.data }));
  } catch {
    return NextResponse.json({ error: "Could not update service" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  try {
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete service" }, { status: 400 });
  }
}
