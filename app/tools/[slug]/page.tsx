import type { Metadata } from "next"; import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout"; import { tools, getTool } from "@/lib/tools"; import { content } from "@/lib/content"; import { SITE } from "@/lib/site";
type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => tools.map((t) => ({ slug: t.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const t = getTool((await params).slug); if (!t) return {}; const url = `${SITE.url}/tools/${t.slug}`;
  return { title: t.title, description: t.description, alternates: { canonical: url }, openGraph: { title: t.title, description: t.description, url, type: "website" }, twitter: { card: "summary_large_image", title: t.title, description: t.description } };
}
export default async function ToolPage({ params }: P) {
  const t = getTool((await params).slug); if (!t) notFound();
  return <ToolLayout tool={t} sections={content[t.slug] ?? [{ h: `About the ${t.name}`, p: [t.description] }]} />;
}
