import { prisma } from "@/lib/prisma";
import ConsultationList, { type Consultation } from "@/components/ConsultationList";

export const dynamic = "force-dynamic";

export default async function ConsultationsPage() {
  const items = (await prisma.consultation.findMany({ orderBy: { createdAt: "desc" } })) as unknown as Consultation[];
  return <ConsultationList items={items} />;
}
