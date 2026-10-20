"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const topics = [
  "AI-Aware DevSecOps",
  "AI-Assisted Operations",
  "Secure AI-Agent Operations",
  "MCP Servers & Integrations",
  "AI Integration & RAG",
  "Custom Software / Web",
  "Mobile App",
  "Something else",
];

/** Build the next N selectable weekdays (skips past days). */
function useUpcomingDays(count = 14) {
  return useMemo(() => {
    const days: { value: string; weekday: string; day: string; month: string }[] = [];
    const d = new Date();
    while (days.length < count) {
      const wd = d.getDay();
      if (wd !== 0 && wd !== 6) {
        days.push({
          value: d.toISOString().slice(0, 10),
          weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
          day: d.toLocaleDateString(undefined, { day: "2-digit" }),
          month: d.toLocaleDateString(undefined, { month: "short" }),
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return days;
  }, [count]);
}

export default function BookingForm() {
  const days = useUpcomingDays(12);
  const [date, setDate] = useState(days[0]?.value ?? "");
  const [slot, setSlot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date) return setError("Please pick a date");
    if (!slot) return setError("Please pick a time slot");

    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      date,
      slot,
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center justify-center p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full brand-gradient text-3xl text-white shadow-lg shadow-brand-blue/40">
          ✓
        </div>
        <h3 className="mt-5 text-2xl font-semibold">You&apos;re booked in</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for scheduling a free consultation. We&apos;ll email you a
          confirmation and the call details shortly.
        </p>
        <a href="/" className="btn-ghost mt-7 rounded-full px-6 py-3 text-sm font-semibold">
          Back to home
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      {/* Date picker */}
      <label className="mb-3 block text-sm font-semibold">Pick a day</label>
      <div className="flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {days.map((d) => {
          const selected = d.value === date;
          return (
            <button
              type="button"
              key={d.value}
              onClick={() => setDate(d.value)}
              className={`flex min-w-[64px] flex-col items-center rounded-2xl border px-3 py-3 transition-all ${
                selected
                  ? "border-transparent brand-gradient text-white shadow-lg shadow-brand-blue/30"
                  : "border-border bg-surface-2/60 text-muted hover:border-brand-blue/40 hover:text-foreground"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wide opacity-80">{d.weekday}</span>
              <span className="text-lg font-bold">{d.day}</span>
              <span className="text-[11px] opacity-80">{d.month}</span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <label className="mb-3 mt-7 block text-sm font-semibold">Pick a time</label>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {slots.map((s) => {
          const selected = s === slot;
          return (
            <button
              type="button"
              key={s}
              onClick={() => setSlot(s)}
              className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition-all ${
                selected
                  ? "border-transparent brand-gradient text-white"
                  : "border-border bg-surface-2/60 text-muted hover:border-brand-blue/40 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Details */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Jane Doe" />
        <Field label="Email" name="email" type="email" required placeholder="jane@company.com" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" placeholder="Company Inc." />
        <div>
          <label className="mb-1.5 block text-sm font-medium">Topic</label>
          <select
            name="topic"
            defaultValue=""
            className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          >
            <option value="" disabled>Select…</option>
            {topics.map((t) => (
              <option key={t} value={t} className="bg-surface">{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium">Anything we should know?</label>
        <textarea
          name="notes"
          rows={3}
          placeholder="A sentence or two about what you'd like to discuss…"
          className="w-full resize-none rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm transition-colors placeholder:text-muted-dim focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full rounded-full px-6 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Booking…" : "Confirm free consultation"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-brand-cyan"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm transition-colors placeholder:text-muted-dim focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
      />
    </div>
  );
}
