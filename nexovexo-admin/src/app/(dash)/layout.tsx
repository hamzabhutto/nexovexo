import { requireSession } from "@/lib/require-auth";
import Sidebar from "@/components/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar userName={session.name} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
