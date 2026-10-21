import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Public data accessors. Each is wrapped in the Next.js data cache and tagged
// so the admin can revalidate on demand (via /api/revalidate). This keeps the
// public pages fast (served from cache) while still reflecting edits quickly.

// Shared cache tag — revalidating "content" refreshes all public data.
export const CONTENT_TAG = "content";

export const getServices = unstable_cache(
  async () =>
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ["services"],
  { tags: [CONTENT_TAG], revalidate: 300 }
);

export const getProjects = unstable_cache(
  async () =>
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
  ["projects"],
  { tags: [CONTENT_TAG], revalidate: 300 }
);

export const getFeaturedProjects = unstable_cache(
  async () =>
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
    }),
  ["featured-projects"],
  { tags: [CONTENT_TAG], revalidate: 300 }
);

export const getTestimonials = unstable_cache(
  async () =>
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ["testimonials"],
  { tags: [CONTENT_TAG], revalidate: 300 }
);

export const getSiteStats = unstable_cache(
  async () =>
    prisma.siteStat.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ["site-stats"],
  { tags: [CONTENT_TAG], revalidate: 300 }
);

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
