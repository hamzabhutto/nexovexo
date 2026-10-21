"use client";

import { useEffect, useState } from "react";
import ResourceManager, { type FieldConfig, type ColumnConfig } from "@/components/ResourceManager";

type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  icon: string;
  features: string;
  order: number;
  published: boolean;
};

const icons = ["code", "cloud", "spark", "mobile", "design", "shield", "shield-scan", "pulse", "agent", "layers", "chat", "brain", "blocks", "server", "plug"];

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true, help: "Lowercase, dashes only." },
  { name: "icon", label: "Icon", type: "select", options: icons },
  { name: "order", label: "Order", type: "number" },
  { name: "summary", label: "Summary", type: "text", required: true, full: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "features", label: "Features", type: "textarea", full: true, help: "One per line." },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<ServiceRow>[] = [
  {
    header: "Service",
    render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted">{r.summary}</div>
      </div>
    ),
  },
  { header: "Icon", hideOnMobile: true, render: (r) => <span className="text-muted">{r.icon}</span> },
  {
    header: "Status",
    render: (r) => (
      <span className={`rounded-full border px-2 py-0.5 text-[10px] ${r.published ? "border-brand-cyan/40 text-brand-cyan" : "border-border text-muted"}`}>
        {r.published ? "Published" : "Draft"}
      </span>
    ),
  },
];

export default function ServicesPage() {
  const [items, setItems] = useState<ServiceRow[] | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  if (items === null) return <div className="py-20 text-center text-sm text-muted">Loading…</div>;

  return (
    <ResourceManager<ServiceRow>
      title="Services"
      description="Edit the services shown on your website."
      endpoint="/api/services"
      items={items}
      fields={fields}
      columns={columns}
      emptyLabel="No services yet."
      defaults={{ icon: "code", published: true, order: 0 }}
    />
  );
}
