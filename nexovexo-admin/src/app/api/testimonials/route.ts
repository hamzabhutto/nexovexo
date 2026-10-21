import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  quote: z.string().trim().min(1).max(1000),
  rating: z.number().int().min(1).max(5).optional().default(5),
  order: z.number().int().optional().default(0),
  published: z.boolean().optional().default(true),
});

export async function GET() {
  const denied = await guardApi();
  if (denied) return denied;
  return NextResponse.json(await prisma.testimonial.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(request: Request) {
  const denied = await guardApi();
  if (denied) return denied;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  return NextResponse.json(await prisma.testimonial.create({ data: parsed.data }), { status: 201 });
}
