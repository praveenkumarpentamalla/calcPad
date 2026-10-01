import Link from "next/link"; import ToolSearch from "@/components/ToolSearch"; import ToolCard from "@/components/ToolCard"; import AdSlot from "@/components/AdSlot"; import FAQ from "@/components/FAQ"; import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal"; import Tilt from "@/components/Tilt"; import CatIcon from "@/components/Icon";
import { tools, categories, getTool } from "@/lib/tools"; import { SITE } from "@/lib/site";
const faqs = [{ q: "Are the tools really free?", a: "Yes. There is no sign-up and no limit." }, { q: "Is my data stored?", a: "No. Calculations run in your browser." }, { q: "Are results financial advice?", a: "No. They are estimates for planning only." }];
const popular = ["password-generator", "emi-calculator", "youtube-money-calculator", "percentage-calculator", "age-calculator", "word-counter"].map(getTool).filter((t) => !!t) as typeof tools;
const catDesc: Record<string, string> = { Creator: "Estimate earnings and engagement.", Finance: "Loans, savings, tax and percentages.", Everyday: "Dates and quick codes.", "Text & Productivity": "Passwords and text counting." };
const steps = [["1", "Choose a tool", "Search, or browse by category."], ["2", "Answer a few simple questions", "Friendly defaults are pre-filled."], ["3", "See your result", "Copy it with one click."]];
const hero = [["Monthly payment", "1,864", "example"], ["Password strength", "Very strong", "example"], ["Engagement", "2.7%", "example"]];
export default function Home() {
  return (<div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, potentialAction: { "@type": "SearchAction", target: `${SITE.url}/?q={q}`, "query-input": "required name=q" } }} />
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
      <div><span className="badge">Free · No sign-up · Runs in your browser</span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Simple tools for everyday <span className="grad-text">calculations</span> and tasks.</h1>
        <p className="mt-5 max-w-lg text-lg text-muted">Calculate, generate and solve common tasks with fast, easy-to-use online tools.</p>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="/#tools" className="btn btn-primary">Explore Tools</Link><Link href="/#categories" className="btn btn-ghost">Browse Categories</Link></div>
        <div className="mt-9"><ToolSearch tools={tools} /></div></div>
      <div className="stage hidden sm:block" aria-hidden="true"><Tilt max={6} className="stack">{hero.map(([l, v, u], i) => (<div key={l} className={`card float-card fc${i + 1}`}><p className="text-xs text-muted">{l} · {u}</p><p className="mt-1 text-2xl font-bold">{v}</p><div className="mt-3 h-1.5 rounded-full bg-[var(--bg2)]"><div className="h-full rounded-full" style={{ width: `${[70, 92, 40][i]}%`, background: "linear-gradient(90deg,var(--brand),var(--accent))" }} /></div></div>))}</Tilt></div>
    </section>
    <div className="mx-auto max-w-6xl px-4">{/* ADSENSE_TOP_BANNER (below hero) */}<AdSlot name="ADSENSE_TOP_BANNER" /></div>
    <section id="tools" className="section mx-auto max-w-6xl px-4"><Reveal><p className="eyebrow">Popular Tools</p><h2 className="mt-2 text-3xl font-bold">Start with a favourite</h2></Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{popular.map((t, i) => <li key={t.slug}><Reveal delay={i * 0.05} className="h-full"><ToolCard t={t} /></Reveal></li>)}</ul></section>
    <section id="categories" className="section mx-auto max-w-6xl px-4 !pt-0"><Reveal><p className="eyebrow">Explore Our Tools</p><h2 className="mt-2 text-3xl font-bold">Find the right category</h2></Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((c) => (<Reveal key={c} className="h-full"><div className="card hover h-full p-5"><span className="icon-tile"><CatIcon c={c} /></span><h3 className="mt-4 font-semibold">{c}</h3><p className="text-sm text-muted">{catDesc[c]}</p>
        <ul className="mt-3 space-y-1.5 text-sm">{tools.filter((t) => t.category === c).map((t) => <li key={t.slug}><Link className="hover:text-[var(--brand)]" href={`/tools/${t.slug}`}>{t.name}</Link></li>)}</ul></div></Reveal>))}</div></section>
    <section id="how" className="section mx-auto max-w-6xl px-4 !pt-0"><Reveal><p className="eyebrow">How it works</p><h2 className="mt-2 text-3xl font-bold">Ask, answer, done</h2></Reveal>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">{steps.map(([n, t, d], i) => (<Reveal key={n} delay={i * 0.08}><li className="card p-5"><span className="icon-tile font-bold">{n}</span><h3 className="mt-4 font-semibold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li></Reveal>))}</ol></section>
    <div className="mx-auto max-w-6xl px-4">{/* ADSENSE_BEFORE_FAQ */}<AdSlot name="ADSENSE_BEFORE_FAQ" /><FAQ faqs={faqs} /></div>
  </div>);
}
