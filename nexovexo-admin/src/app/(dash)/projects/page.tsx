"use client";

import { useEffect, useState } from "react";
import ResourceManager, { type FieldConfig, type ColumnConfig } from "@/components/ResourceManager";

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  coverColor: string;
  techStack: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  order: number;
  status: string;
  stage: string;
  progress: number;
};

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, help: "Lowercase, dashes only." },
  { name: "client", label: "Client", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "status", label: "Status", type: "select", options: ["completed", "in_progress", "pending", "on_hold"] },
  { name: "stage", label: "Stage", type: "select", options: ["discovery", "design", "development", "review", "launched"] },
  { name: "progress", label: "Progress %", type: "number", help: "0 to 100" },
  { name: "coverColor", label: "Accent", type: "select", options: ["cyan", "blue", "violet"] },
  { name: "order", label: "Order", type: "number" },
  { name: "summary", label: "Summary", type: "text", required: true, full: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "techStack", label: "Tech stack", type: "text", full: true, help: "Comma-separated." },
  { name: "liveUrl", label: "Live URL", type: "text" },
  { name: "featured", label: "Featured", type: "boolean" },
  { name: "published", label: "Published (show on site)", type: "boolean" },
];

const statusColor: Record<string, string> = {
  completed: "border-green-500/40 text-green-400",
  in_progress: "border-brand-blue/40 text-brand-cyan",
  pending: "border-amber-500/40 text-amber-400",
  on_hold: "border-border text-muted",
};

const columns: ColumnConfig<ProjectRow>[] = [
  {
    header: "Project",
    render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted">{r.client || r.category}</div>
      </div>
    ),
  },
  {
    header: "Status",
    render: (r) => (
      <span className={`rounded-full border px-2 py-0.5 text-[10px] capitalize ${statusColor[r.status] ?? statusColor.on_hold}`}>
        {r.status.replace("_", " ")}
      </span>
    ),
  },
  { header: "Stage", hideOnMobile: true, render: (r) => <span className="capitalize text-muted">{r.stage}</span> },
  {
    header: "Progress",
    render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-3">
          <div className="h-full brand-gradient" style={{ width: `${r.progress}%` }} />
        </div>
        <span className="text-xs text-muted">{r.progress}%</span>
      </div>
    ),
  },
  {
    header: "Live",
    hideOnMobile: true,
    render: (r) => (
      <span className={`rounded-full border px-2 py-0.5 text-[10px] ${r.published ? "border-brand-cyan/40 text-brand-cyan" : "border-border text-muted"}`}>
        {r.published ? "Published" : "Draft"}
      </span>
    ),
  },
];

export default function ProjectsPage() {
  const [items, setItems] = useState<ProjectRow[] | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  if (items === null) return <Loading />;

  return (
    <ResourceManager<ProjectRow>
      title="Projects"
      description="Track delivery status, stages and what shows on the site."
      endpoint="/api/projects"
      items={items}
      fields={fields}
      columns={columns}
      emptyLabel="No projects yet. Add your first one."
      defaults={{ coverColor: "blue", published: true, order: 0, status: "completed", stage: "launched", progress: 100 }}
    />
  );
}

function Loading() {
  return <div className="py-20 text-center text-sm text-muted">Loading…</div>;
}
