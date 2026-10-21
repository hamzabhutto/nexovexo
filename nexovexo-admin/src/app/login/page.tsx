import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      <div className="glow left-1/2 top-0 h-96 w-[600px] -translate-x-1/2 brand-gradient" aria-hidden />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image src="/logo-mark-transparent.png" alt="NexoVexo" width={56} height={56} priority />
          <span className="font-display text-lg font-bold uppercase tracking-[0.16em]">
            Nexovexo <span className="text-muted-dim">Admin</span>
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur">
          <h1 className="text-xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-muted">Manage your site content and inquiries.</p>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          <a href={process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"} className="hover:text-foreground">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
