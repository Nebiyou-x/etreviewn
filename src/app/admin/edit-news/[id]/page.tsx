import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditNewsForm from "@/components/EditNewsForm";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const news = await prisma.news.findUnique({
    where: { id: params.id },
  });

  if (!news) {
    notFound();
  }

  return <EditNewsForm news={news} />;
} 