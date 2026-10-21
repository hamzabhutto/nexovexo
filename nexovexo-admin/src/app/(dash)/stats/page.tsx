"use client";

import { useEffect, useState } from "react";
import ResourceManager, { type FieldConfig, type ColumnConfig } from "@/components/ResourceManager";

type Row = {
  id: string;
  key: string;
  label: string;
  value: string;
  percent: number;
  color: string;
  order: number;
  published: boolean;
};

const fields: FieldConfig[] = [
  { name: "label", label: "Label", type: "text", required: true, help: "e.g. Projects delivered" },
  { name: "value", label: "Value", type: "text", required: true, help: 'Shown as-is, e.g. "40+", "99.9%", "1.2s"' },
  { name: "percent", label: "Percent (for bar/ring)", type: "number", help: "0 to 100" },
  { name: "color", label: "Color", type: "select", options: ["cyan", "blue", "violet", "teal", "pink", "amber", "green"] },
  { name: "order", label: "Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const columns: ColumnConfig<Row>[] = [
  {
    header: "Stat",
    render: (r) => (
      <div>
        <div className="font-medium">{r.label}</div>
        <div className="text-xs text-muted-dim">{r.key}</div>
      </div>
    ),
  },
  { header: "Value", render: (r) => <span className="font-display text-lg font-bold text-foreground">{r.value}</span> },
  { header: "Percent", hideOnMobile: true, render: (r) => <span className="text-muted">{r.percent}%</span> },
  { header: "Color", hideOnMobile: true, render: (r) => <span className="capitalize text-muted">{r.color}</span> },
];

export default function StatsPage() {
  const [items, setItems] = useState<Row[] | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  if (items === null) return <div className="py-20 text-center text-sm text-muted">Loading…</div>;

  return (
    <ResourceManager<Row>
      title="Stats"
      description="The numbers shown on your site (hero / footer). Editing these updates the live site."
      endpoint="/api/stats"
      items={items}
      fields={fields}
      columns={columns}
      emptyLabel="No stats configured."
      canCreate={false}
    />
  );
}
