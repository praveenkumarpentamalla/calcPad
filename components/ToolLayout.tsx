import Link from "next/link"; import dynamic from "next/dynamic";
import AdSlot from "./AdSlot"; import FAQ from "./FAQ"; import RelatedTools from "./RelatedTools"; import JsonLd from "./JsonLd";
import { SITE } from "@/lib/site"; import type { Tool } from "@/lib/tools"; import type { Section } from "@/lib/content";
const ToolWidget = dynamic(() => import("./ToolWidget"), { loading: () => <p className="text-sm text-slate-500">Loading tool…</p> });
export default function ToolLayout({ tool, sections }: { tool: Tool; sections: Section[] }) {
  const url = `${SITE.url}/tools/${tool.slug}`;
  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: tool.name, url, description: tool.description, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "FAQPage", mainEntity: tool.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@type": "BreadcrumbList", itemListElement: [["Home", SITE.url], ["Tools", `${SITE.url}/#tools`], [tool.name, url]].map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) }] };
  return (<div className="mx-auto max-w-6xl px-4 py-8"><JsonLd data={ld} />
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500"><Link href="/">Home</Link> / <Link href="/#tools">Tools</Link> / {tool.name}</nav>
    <h1 className="text-3xl font-bold">{tool.name}</h1><p className="mt-2 text-muted">{tool.description}</p>
    {/* ADSENSE_TOP_BANNER */}<AdSlot name="ADSENSE_TOP_BANNER" />
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]"><div>
      {/* ADSENSE_ABOVE_TOOL */}<AdSlot name="ADSENSE_ABOVE_TOOL" />
      <section className="card p-5"><ToolWidget slug={tool.slug} /></section>
      {/* ADSENSE_AFTER_RESULT */}<AdSlot name="ADSENSE_AFTER_RESULT" />
      <article className="mt-8 space-y-6 leading-relaxed">{sections.map((s, i) => (<section key={s.h}>
        {i === 2 && <>{/* ADSENSE_IN_CONTENT */}<AdSlot name="ADSENSE_IN_CONTENT" /></>}
        <h2 className="mb-2 text-xl font-semibold">{s.h}</h2>{s.p.map((p) => <p key={p} className="mb-3">{p}</p>)}</section>))}</article>
      {/* ADSENSE_BEFORE_FAQ */}<AdSlot name="ADSENSE_BEFORE_FAQ" />
      <FAQ faqs={tool.faqs} /><RelatedTools slug={tool.slug} /></div>
    <aside className="hidden lg:block"><div className="sticky top-6">{/* ADSENSE_SIDEBAR */}<AdSlot name="ADSENSE_SIDEBAR" className="min-h-[600px]" /></div></aside></div></div>);
}
