import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";

const schema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/, "Slug: lowercase letters, numbers, dashes"),
  summary: z.string().trim().min(1).max(400),
  description: z.string().trim().max(5000).optional().default(""),
  icon: z.enum(["code", "cloud", "spark", "mobile", "design", "shield", "shield-scan", "pulse", "agent", "layers", "chat", "brain", "blocks", "server", "plug"]).optional().default("code"),
  features: z.string().trim().max(2000).optional().default(""),
  order: z.number().int().optional().default(0),
  published: z.boolean().optional().default(true),
});

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return NextResponse.json(await prisma.service.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(request: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  try {
    return NextResponse.json(await prisma.service.create({ data: parsed.data }), { status: 201 });
  } catch {
    return NextResponse.json({ error: "A service with that slug already exists" }, { status: 409 });
  }
}
