import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guardApi } from "@/lib/api-auth";

const schema = z.object({ status: z.enum(["new", "read", "archived"]) });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  try {
    return NextResponse.json(await prisma.contactInquiry.update({ where: { id }, data: parsed.data }));
  } catch {
    return NextResponse.json({ error: "Could not update inquiry" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardApi();
  if (denied) return denied;
  const { id } = await params;
  try {
    await prisma.contactInquiry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete inquiry" }, { status: 400 });
  }
}
