import { LogoMark } from "./Logo";
import BentoStats from "./BentoStats";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border bg-surface/30">
      <div className="glow left-1/2 -bottom-40 h-80 w-[700px] -translate-x-1/2 bg-brand-blue/20" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12" />
          <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            The numbers <span className="brand-text">behind the work</span>
          </h3>
          <p className="mt-3 max-w-md text-sm text-muted">
            A snapshot of how we deliver.
          </p>
        </div>

        <div className="mt-12">
          <BentoStats />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-dim">
            © {year} NexoVexo. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-dim">
            <a href="/#services" className="transition-colors hover:text-brand-cyan">Services</a>
            <a href="/#work" className="transition-colors hover:text-brand-cyan">Work</a>
            <a href="/book" className="transition-colors hover:text-brand-cyan">Book a call</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
