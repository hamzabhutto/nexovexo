"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type Consultation = {
  id: string;
  name: string;
  email: string;
  company: string;
  topic: string;
  date: string;
  slot: string;
  notes: string;
  status: string;
  createdAt: string | Date;
};

export default function ConsultationList({ items }: { items: Consultation[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "new" | "confirmed" | "done" | "cancelled">("all");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  async function setStatus(id: string, status: string) {
    setBusy(id);
    await fetch(`/api/consultations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    setBusy(id);
    await fetch(`/api/consultations/${id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  }

  const filters: Array<typeof filter> = ["all", "new", "confirmed", "done", "cancelled"];
  const statusColor: Record<string, string> = {
    new: "border-brand-cyan/40 text-brand-cyan",
    confirmed: "border-brand-blue/40 text-brand-cyan",
    done: "border-green-500/40 text-green-400",
    cancelled: "border-red-500/40 text-red-400",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Consultations</h1>
      <p className="mt-1 text-sm text-muted">Call bookings from the site.</p>

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
                    <span className="text-xs text-muted">booked {new Date(i.createdAt).toLocaleDateString()}</span>
                  </div>
                  <a href={`mailto:${i.email}`} className="text-sm text-brand-cyan hover:underline">{i.email}</a>
                  {i.company && <span className="ml-2 text-sm text-muted">· {i.company}</span>}
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs capitalize ${statusColor[i.status] ?? statusColor.new}`}>{i.status}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md border border-brand-blue/40 bg-brand-blue/10 px-2 py-0.5 text-brand-cyan">📅 {i.date} · {i.slot}</span>
                {i.topic && <span className="rounded-md border border-border px-2 py-0.5 text-muted">{i.topic}</span>}
              </div>

              {i.notes && <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{i.notes}</p>}

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {i.status !== "confirmed" && <button onClick={() => setStatus(i.id, "confirmed")} disabled={busy === i.id} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60">Confirm</button>}
                {i.status !== "done" && <button onClick={() => setStatus(i.id, "done")} disabled={busy === i.id} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60">Mark done</button>}
                {i.status !== "cancelled" && <button onClick={() => setStatus(i.id, "cancelled")} disabled={busy === i.id} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60">Cancel</button>}
                <a href={`mailto:${i.email}`} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-brand-cyan hover:text-foreground">Email</a>
                <button onClick={() => remove(i.id)} disabled={busy === i.id} className="ml-auto rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-400/80 hover:text-red-400 disabled:opacity-60">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
