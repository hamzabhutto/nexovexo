import FeatureRow from "@/components/FeatureRow";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import OpsOrbit from "@/components/OpsOrbit";

// Visual mock panels for each specialty row. Kept calm and monochrome-leaning
// with a single accent, so the page has breathing room.

function ScanVisual() {
  const rows = [
    { label: "dependencies", ok: true },
    { label: "exposed secrets", ok: true },
    { label: "container image", ok: true },
    { label: "deploy config", ok: true },
  ];
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Pre-release check</span>
        <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-semibold text-green-400">
          passing
        </span>
      </div>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
            <span className="text-sm text-muted">{r.label}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/15 text-green-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentVisual() {
  const perms = [
    { label: "read repository", on: true },
    { label: "run tests", on: true },
    { label: "deploy to prod", on: false },
    { label: "rotate secrets", on: false },
  ];
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-violet/15 text-brand-violet">
          <Icon name="agent" className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium text-foreground">Agent permissions</span>
      </div>
      <div className="space-y-2.5">
        {perms.map((p) => (
          <div key={p.label} className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
            <span className="text-sm text-muted">{p.label}</span>
            <span className={`relative h-5 w-9 rounded-full transition-colors ${p.on ? "bg-brand-cyan" : "bg-surface-3"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${p.on ? "left-4" : "left-0.5"}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformVisual() {
  const stages = ["commit", "build", "test", "scan", "deploy"];
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
      <span className="text-sm font-medium text-foreground">CI/CD pipeline</span>
      <div className="mt-5 flex items-center">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/10 text-xs font-semibold text-brand-blue">
                {i + 1}
              </span>
              <span className="text-[11px] text-muted">{s}</span>
            </div>
            {i < stages.length - 1 && (
              <span className="mx-1.5 h-px w-6 bg-gradient-to-r from-brand-blue/50 to-brand-blue/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const rows = [
  {
    eyebrow: "AI-Aware DevSecOps",
    title: <>Catch risk <span className="brand-text">before you release</span></>,
    body: "We check code dependencies, exposed secrets, container images and deployment configs before every release — bringing AI-assisted analysis into your pipeline without slowing you down.",
    points: ["Dependency & secret scanning", "Container & config auditing", "Fits into your existing pipeline"],
    visual: <ScanVisual />,
  },
  {
    eyebrow: "AI-Assisted Operations",
    title: <>Understand failures, <span className="brand-text">faster</span></>,
    body: "AI helps investigate logs, understand deployment failures and surface the likely root cause in seconds — while a human stays in the loop before any consequential action.",
    points: ["Rapid incident triage", "Log investigation & root cause", "Human-in-the-loop safeguards"],
    visual: <OpsOrbit />,
  },
  {
    eyebrow: "Secure AI-Agent Operations",
    title: <>Give AI agents power, <span className="brand-text">keep control</span></>,
    body: "As you introduce AI agents into your workflows, we help you scope their permissions, protect credentials, and keep a clear audit trail of every action they take.",
    points: ["Scoped agent permissions", "Credential protection", "Full action auditing"],
    visual: <AgentVisual />,
  },
  {
    eyebrow: "Platform Engineering & Cloud",
    title: <>Infrastructure that <span className="brand-text">scales with you</span></>,
    body: "We architect and operate cloud infrastructure, CI/CD pipelines and internal developer platforms that reduce friction for your engineers across AWS, GCP and Azure.",
    points: ["CI/CD & infrastructure as code", "AWS · GCP · Azure", "Developer platforms"],
    visual: <PlatformVisual />,
  },
];

export default function Specialty() {
  return (
    <section id="specialty" className="relative scroll-mt-24 py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
              Our speciality
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Where we go deep
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              AI-aware security, operations and platform engineering — the work
              that sets us apart.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 space-y-24 sm:space-y-28">
          {rows.map((r, i) => (
            <FeatureRow key={r.eyebrow} index={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
