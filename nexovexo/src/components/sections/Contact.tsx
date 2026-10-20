"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const services = [
  "Custom Web Development",
  "Cloud & DevOps",
  "AI & Automation",
  "Mobile App Development",
  "Product Design & UX",
  "Something else",
];

const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-28">
      <div className="glow right-0 top-0 h-80 w-80 bg-brand-violet/40" aria-hidden />
      <div className="glow left-0 bottom-0 h-72 w-72 bg-brand-cyan/30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">
                Get in touch
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Let&apos;s build <span className="brand-text">something great</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Tell us about your project and we&apos;ll get back to you within one
                business day with next steps.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 space-y-3">
                <a href="mailto:hello@nexovexo.com" className="group flex items-center gap-3.5 rounded-2xl border border-border bg-surface/50 p-4 text-sm text-muted transition-all hover:border-brand-blue/40 hover:text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient text-white">@</span>
                  <span>
                    <span className="block text-xs text-muted-dim">Email us</span>
                    hello@nexovexo.com
                  </span>
                </a>
                <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/50 p-4 text-sm text-muted">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-brand-cyan">✓</span>
                  <span>
                    <span className="block text-xs text-muted-dim">Fast reply</span>
                    Within 1 business day
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="card p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full brand-gradient text-3xl text-white shadow-lg shadow-brand-blue/40">
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">Message sent</h3>
                  <p className="mt-2 text-sm text-muted">
                    Thanks for reaching out. We&apos;ll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-brand-cyan hover:text-foreground"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" name="name" required placeholder="Jane Doe" />
                    <Field label="Email" name="email" type="email" required placeholder="jane@company.com" />
                  </div>
                  <Field label="Company" name="company" placeholder="Company Inc." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField label="Service" name="service" options={services} />
                    <SelectField label="Budget" name="budget" options={budgets} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Project details
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us what you're building..."
                      className="w-full resize-none rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-dim focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                    />
                  </div>

                  {status === "error" && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full rounded-full px-6 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand-cyan"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-dim focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-foreground transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-surface">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
