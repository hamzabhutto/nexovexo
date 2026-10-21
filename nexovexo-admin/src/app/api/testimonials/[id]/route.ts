import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";
import { revalidatePublicSite } from "@/lib/revalidate";

const schema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  role: z.string().trim().max(120).optional(),
  company: z.string().trim().max(160).optional(),
  quote: z.string().trim().min(1).max(1000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
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
    const updated = await prisma.testimonial.update({ where: { id }, data: parsed.data });
    await revalidatePublicSite();
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Could not update testimonial" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    await revalidatePublicSite();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete testimonial" }, { status: 400 });
  }
}
