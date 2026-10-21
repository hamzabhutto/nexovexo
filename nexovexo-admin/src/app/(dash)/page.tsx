import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [
    projectsTotal,
    projectsCompleted,
    projectsInProgress,
    projectsPending,
    servicesCount,
    testimonialsCount,
    inquiriesTotal,
    inquiriesNew,
    consultationsTotal,
    consultationsNew,
    pendingProjects,
    recentInquiries,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "completed" } }),
    prisma.project.count({ where: { status: "in_progress" } }),
    prisma.project.count({ where: { status: { in: ["pending", "on_hold"] } } }),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { status: "new" } }),
    prisma.consultation.count(),
    prisma.consultation.count({ where: { status: "new" } }),
    prisma.project.findMany({
      where: { status: { in: ["in_progress", "pending", "on_hold"] } },
      orderBy: { updatedAt: "desc" },
      take: 6,
    }),
    prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const cards = [
    { label: "Projects", value: projectsTotal, href: "/projects", sub: `${projectsCompleted} done · ${projectsInProgress + projectsPending} active` },
    { label: "Inquiries", value: inquiriesTotal, href: "/inquiries", badge: inquiriesNew },
    { label: "Consultations", value: consultationsTotal, href: "/consultations", badge: consultationsNew },
    { label: "Services", value: servicesCount, href: "/services" },
    { label: "Testimonials", value: testimonialsCount, href: "/testimonials" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Everything about your site at a glance.</p>

      {/* Project status band */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatusTile label="Completed" value={projectsCompleted} color="green" />
        <StatusTile label="In progress" value={projectsInProgress} color="blue" />
        <StatusTile label="Pending / on hold" value={projectsPending} color="amber" />
      </div>

      {/* Count cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-brand-blue/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{c.label}</span>
              {!!c.badge && c.badge > 0 && (
                <span className="rounded-full brand-gradient px-2 py-0.5 text-[10px] font-semibold text-white">
                  {c.badge} new
                </span>
              )}
            </div>
            <div className="mt-2 text-3xl font-bold">{c.value}</div>
            {c.sub && <div className="mt-1 text-xs text-muted-dim">{c.sub}</div>}
          </Link>
        ))}
      </div>

      {/* Pending projects */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active projects &amp; stages</h2>
          <Link href="/projects" className="text-sm font-medium text-brand-cyan hover:text-foreground">
            Manage all →
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          {pendingProjects.length === 0 ? (
            <div className="bg-surface/40 p-8 text-center text-sm text-muted">
              No active projects. Everything is delivered.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Status</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {pendingProjects.map((p) => (
                  <tr key={p.id} className="border-t border-border bg-surface/20">
                    <td className="px-4 py-3">
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-muted">{p.client || p.category}</div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 capitalize text-muted">{p.stage}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-3">
                          <div className="h-full brand-gradient" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted">{p.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Recent inquiries */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent inquiries</h2>
          <Link href="/inquiries" className="text-sm font-medium text-brand-cyan hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          {recentInquiries.length === 0 ? (
            <div className="bg-surface/40 p-8 text-center text-sm text-muted">No inquiries yet.</div>
          ) : (
            <ul className="divide-y divide-border">
              {recentInquiries.map((i) => (
                <li key={i.id} className="flex items-center justify-between bg-surface/20 px-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{i.name}</div>
                    <div className="text-xs text-muted">{i.email}{i.service ? ` · ${i.service}` : ""}</div>
                  </div>
                  <StatusBadge status={i.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusTile({ label, value, color }: { label: string; value: number; color: string }) {
  const map: Record<string, string> = {
    green: "text-green-400",
    blue: "text-brand-cyan",
    amber: "text-amber-400",
  };
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-5">
      <div className={`text-3xl font-bold ${map[color]}`}>{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "border-brand-cyan/40 text-brand-cyan",
    read: "border-border text-muted",
    archived: "border-border text-muted/60",
    completed: "border-green-500/40 text-green-400",
    in_progress: "border-brand-blue/40 text-brand-cyan",
    pending: "border-amber-500/40 text-amber-400",
    on_hold: "border-border text-muted",
    confirmed: "border-brand-blue/40 text-brand-cyan",
    done: "border-green-500/40 text-green-400",
    cancelled: "border-red-500/40 text-red-400",
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs capitalize ${map[status] ?? map.read}`}>
      {status.replace("_", " ")}
    </span>
  );
}
