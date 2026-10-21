import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";
import { revalidatePublicSite } from "@/lib/revalidate";

const schema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/, "Slug: lowercase letters, numbers, dashes"),
  client: z.string().trim().max(160).optional().default(""),
  category: z.string().trim().max(80).optional().default("Web"),
  summary: z.string().trim().min(1).max(400),
  description: z.string().trim().max(5000).optional().default(""),
  coverColor: z.enum(["cyan", "blue", "violet"]).optional().default("blue"),
  techStack: z.string().trim().max(400).optional().default(""),
  liveUrl: z.string().trim().max(300).optional().default(""),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
  status: z.enum(["completed", "in_progress", "pending", "on_hold"]).optional().default("completed"),
  stage: z.enum(["discovery", "design", "development", "review", "launched"]).optional().default("launched"),
  progress: z.number().int().min(0).max(100).optional().default(100),
});

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return NextResponse.json(await prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] }));
}

export async function POST(request: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  try {
    const created = await prisma.project.create({ data: parsed.data });
    await revalidatePublicSite();
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "A project with that slug already exists" }, { status: 409 });
  }
}
