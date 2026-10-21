import { prisma } from "@/lib/prisma";
import InquiryList, { type Inquiry } from "@/components/InquiryList";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const items = (await prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" } })) as unknown as Inquiry[];
  return <InquiryList items={items} />;
}
