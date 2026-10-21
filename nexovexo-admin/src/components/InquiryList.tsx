"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  service: string;
  message: string;
  status: string;
  createdAt: string | Date;
};

export default function InquiryList({ items }: { items: Inquiry[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "new" | "read" | "archived">("all");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  async function setStatus(id: string, status: string) {
    setBusy(id);
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    setBusy(id);
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  }

  const filters: Array<typeof filter> = ["all", "new", "read", "archived"];

  return (
    <div>
      <h1 className="text-2xl font-bold">Inquiries</h1>
      <p className="mt-1 text-sm text-muted">Leads from your contact form.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f ? "border-transparent brand-gradient text-white" : "border-border text-muted hover:text-foreground"
            }`}
          >
            {f}
            {f !== "all" && <span className="ml-1.5 opacity-70">{items.filter((i) => i.status === f).length}</span>}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface/40 p-10 text-center text-sm text-muted">Nothing here.</div>
        ) : (
          filtered.map((i) => (
            <div key={i.id} className={`rounded-2xl border bg-surface/40 p-5 ${i.status === "new" ? "border-brand-cyan/40" : "border-border"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{i.name}</h3>
                    <span className="text-xs text-muted">{new Date(i.createdAt).toLocaleDateString()}</span>
                  </div>
                  <a href={`mailto:${i.email}`} className="text-sm text-brand-cyan hover:underline">{i.email}</a>
                  {i.company && <span className="ml-2 text-sm text-muted">· {i.company}</span>}
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs capitalize ${i.status === "new" ? "border-brand-cyan/40 text-brand-cyan" : "border-border text-muted"}`}>{i.status}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                {i.service && <span className="rounded-md border border-border px-2 py-0.5">{i.service}</span>}
                {i.budget && <span className="rounded-md border border-border px-2 py-0.5">{i.budget}</span>}
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{i.message}</p>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {i.status !== "read" && <button onClick={() => setStatus(i.id, "read")} disabled={busy === i.id} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60">Mark read</button>}
                {i.status !== "new" && <button onClick={() => setStatus(i.id, "new")} disabled={busy === i.id} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60">Mark new</button>}
                {i.status !== "archived" && <button onClick={() => setStatus(i.id, "archived")} disabled={busy === i.id} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60">Archive</button>}
                <a href={`mailto:${i.email}`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-brand-cyan hover:text-foreground">Reply</a>
                <button onClick={() => remove(i.id)} disabled={busy === i.id} className="ml-auto rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-400/80 hover:text-red-400 disabled:opacity-60">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
