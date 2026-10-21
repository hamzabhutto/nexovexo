import { prisma } from "@/lib/prisma";

// Public data accessors used by the marketing site. These always run on the
// server and only return published records.

export async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
  });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getSiteStats() {
  return prisma.siteStat.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function splitCommas(value: string): string[] {
  return value
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
}
