"use client";

import { useEffect, useState } from "react";
import ResourceManager, { type FieldConfig, type ColumnConfig } from "@/components/ResourceManager";

type Row = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  order: number;
  published: boolean;
};

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "quote", label: "Quote", type: "textarea", required: true, full: true },
  { name: "order", label: "Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<Row>[] = [
  {
    header: "Client",
    render: (r) => (
      <div>
        <div className="font-medium">{r.name}</div>
        <div className="text-xs text-muted">{[r.role, r.company].filter(Boolean).join(", ")}</div>
      </div>
    ),
  },
  { header: "Quote", hideOnMobile: true, render: (r) => <span className="line-clamp-2 text-muted">{r.quote}</span> },
  { header: "Rating", render: (r) => <span className="text-brand-cyan">{"★".repeat(r.rating)}</span> },
];

export default function TestimonialsPage() {
  const [items, setItems] = useState<Row[] | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  if (items === null) return <div className="py-20 text-center text-sm text-muted">Loading…</div>;

  return (
    <ResourceManager<Row>
      title="Testimonials"
      description="Client quotes shown on your website."
      endpoint="/api/testimonials"
      items={items}
      fields={fields}
      columns={columns}
      emptyLabel="No testimonials yet."
      defaults={{ rating: 5, published: true, order: 0 }}
    />
  );
}
