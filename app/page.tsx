import Link from "next/link"; import SearchTools from "@/components/SearchTools"; import AdSlot from "@/components/AdSlot"; import FAQ from "@/components/FAQ"; import JsonLd from "@/components/JsonLd";
import { tools, categories } from "@/lib/tools"; import { SITE } from "@/lib/site";
const faqs = [{ q: "Are the tools really free?", a: "Yes. There is no sign-up and no limit." }, { q: "Is my data stored?", a: "No. Calculations run in your browser." }, { q: "Are results financial advice?", a: "No. They are estimates for planning only." }];
export default function Home() {
  return (<div className="mx-auto max-w-6xl px-4 py-12">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, potentialAction: { "@type": "SearchAction", target: `${SITE.url}/?q={q}`, "query-input": "required name=q" } }} />
    <section className="py-8"><h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Free calculators for creators and your money</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">Estimate YouTube income, plan a mortgage or build a strong password. No sign-up, nothing stored.</p></section>
    {/* ADSENSE_TOP_BANNER (below hero) */}<AdSlot name="ADSENSE_TOP_BANNER" />
    <h2 className="mb-4 text-2xl font-semibold">Featured tools</h2><SearchTools tools={tools} />
    <section className="mt-12"><h2 className="mb-4 text-2xl font-semibold">Categories</h2><div className="grid gap-3 sm:grid-cols-3">{categories.map((c) => (<div key={c} className="card p-4"><h3 className="font-semibold">{c}</h3><ul className="mt-2 space-y-1 text-sm">{tools.filter((t) => t.category === c).map((t) => <li key={t.slug}><Link className="text-indigo-600 hover:underline dark:text-indigo-400" href={`/tools/${t.slug}`}>{t.name}</Link></li>)}</ul></div>))}</div></section>
    {/* ADSENSE_BEFORE_FAQ */}<AdSlot name="ADSENSE_BEFORE_FAQ" /><FAQ faqs={faqs} /></div>);
}
