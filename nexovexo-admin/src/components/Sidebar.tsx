"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Dashboard", exact: true },
  { href: "/projects", label: "Projects" },
  { href: "/inquiries", label: "Inquiries" },
  { href: "/consultations", label: "Consultations" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/stats", label: "Stats" },
];

export default function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex w-full flex-col border-b border-border bg-surface/40 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2.5 p-5">
        <Image src="/logo-mark-transparent.png" alt="NexoVexo" width={32} height={32} />
        <span className="font-display text-base font-bold uppercase tracking-[0.14em]">Admin</span>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:pb-0">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item.href, item.exact)
                ? "brand-gradient text-white"
                : "text-muted hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden border-t border-border p-4 md:block">
        <div className="mb-3 px-1 text-xs text-muted">
          Signed in as
          <div className="truncate font-medium text-foreground">{userName}</div>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-3 py-2 text-center text-xs font-medium text-muted hover:text-foreground"
          >
            View site ↗
          </a>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted hover:text-foreground disabled:opacity-60"
          >
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </aside>
  );
}
