import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  company: z.string().trim().max(160).optional().default(""),
  topic: z.string().trim().max(160).optional().default(""),
  date: z.string().trim().min(1, "Please pick a date").max(20),
  slot: z.string().trim().min(1, "Please pick a time slot").max(40),
  notes: z.string().trim().max(2000).optional().default(""),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  try {
    await prisma.consultation.create({ data: parsed.data });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not book your consultation. Please try again." },
      { status: 500 }
    );
  }
}
