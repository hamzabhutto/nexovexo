"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type FieldType = "text" | "textarea" | "select" | "number" | "boolean";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
  full?: boolean;
};

export type ColumnConfig<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
};

type Row = { id: string } & Record<string, unknown>;

type Props<T extends Row> = {
  title: string;
  description: string;
  endpoint: string;
  items: T[];
  fields: FieldConfig[];
  columns: ColumnConfig<T>[];
  emptyLabel: string;
  defaults?: Record<string, unknown>;
  canCreate?: boolean;
};

export default function ResourceManager<T extends Row>({
  title,
  description,
  endpoint,
  items,
  fields,
  columns,
  emptyLabel,
  defaults = {},
  canCreate = true,
}: Props<T>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function startCreate() {
    const initial: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "boolean") initial[f.name] = defaults[f.name] ?? false;
      else if (f.type === "number") initial[f.name] = defaults[f.name] ?? 0;
      else initial[f.name] = defaults[f.name] ?? (f.type === "select" ? f.options?.[0] ?? "" : "");
    }
    setValues(initial);
    setEditing(null);
    setError("");
    setOpen(true);
  }

  function startEdit(row: T) {
    const initial: Record<string, unknown> = {};
    for (const f of fields) initial[f.name] = row[f.name] ?? (f.type === "boolean" ? false : "");
    setValues(initial);
    setEditing(row);
    setError("");
    setOpen(true);
  }

  async function save() {
    setSaving(true);
    setError("");
    const payload: Record<string, unknown> = { ...values };
    for (const f of fields) if (f.type === "number") payload[f.name] = Number(payload[f.name] ?? 0);

    const url = editing ? `${endpoint}/${editing.id}` : endpoint;
    const method = editing ? "PATCH" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Save failed");
      }
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: T) {
    if (!confirm(`Delete this ${title.toLowerCase().replace(/s$/, "")}? This cannot be undone.`)) return;
    const res = await fetch(`${endpoint}/${row.id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Could not delete.");
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>
        {canCreate && (
          <button onClick={startCreate} className="btn-primary shrink-0 rounded-full px-4 py-2 text-sm font-semibold">
            + Add new
          </button>
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        {items.length === 0 ? (
          <div className="bg-surface/40 p-10 text-center text-sm text-muted">{emptyLabel}</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                {columns.map((c) => (
                  <th key={c.header} className={`px-4 py-3 font-medium ${c.hideOnMobile ? "hidden md:table-cell" : ""}`}>
                    {c.header}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t border-border bg-surface/20">
                  {columns.map((c) => (
                    <td key={c.header} className={`px-4 py-3 align-top ${c.hideOnMobile ? "hidden md:table-cell" : ""}`}>
                      {c.render(row)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right align-top">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(row)} className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted hover:text-foreground">
                        Edit
                      </button>
                      <button onClick={() => remove(row)} className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-red-400/80 hover:text-red-400">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={() => !saving && setOpen(false)}>
          <div className="my-8 w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? `Edit ${title.replace(/s$/, "")}` : `New ${title.replace(/s$/, "")}`}</h2>
              <button onClick={() => !saving && setOpen(false)} className="text-muted hover:text-foreground" aria-label="Close">✕</button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-sm font-medium">
                    {f.label}
                    {f.required && <span className="text-brand-cyan"> *</span>}
                  </label>
                  <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((s) => ({ ...s, [f.name]: v }))} />
                  {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
                </div>
              ))}
            </div>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} disabled={saving} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted hover:text-foreground disabled:opacity-60">
                Cancel
              </button>
              <button onClick={save} disabled={saving} className="btn-primary rounded-full px-6 py-2 text-sm font-semibold disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Save changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldConfig; value: unknown; onChange: (v: unknown) => void }) {
  const base = "w-full rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

  if (field.type === "textarea")
    return <textarea rows={4} value={(value as string) ?? ""} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={`${base} resize-none`} />;

  if (field.type === "select")
    return (
      <select value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={base}>
        {field.options?.map((o) => (
          <option key={o} value={o} className="bg-surface">{o}</option>
        ))}
      </select>
    );

  if (field.type === "boolean")
    return (
      <label className="flex cursor-pointer items-center gap-2.5">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--brand-blue)]" />
        <span className="text-sm text-muted">{Boolean(value) ? "Enabled" : "Disabled"}</span>
      </label>
    );

  return <input type={field.type === "number" ? "number" : "text"} value={(value as string | number) ?? ""} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={base} />;
}
