import Link from "next/link"; import SearchTools from "@/components/SearchTools"; import AdSlot from "@/components/AdSlot"; import FAQ from "@/components/FAQ"; import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal"; import Tilt from "@/components/Tilt"; import Counter from "@/components/Counter";
import { tools, categories } from "@/lib/tools"; import { SITE } from "@/lib/site";
const faqs = [{ q: "Are the tools really free?", a: "Yes. There is no sign-up and no limit." }, { q: "Is my data stored?", a: "No. Calculations run in your browser." }, { q: "Are results financial advice?", a: "No. They are estimates for planning only." }];
const cats = [
 { c: categories[0], g: "▶", d: "Estimate what your content could earn and how your audience engages." },
 { c: categories[1], g: "%", d: "Loans, mortgages, savings growth, tax and salary, in plain numbers." },
 { c: categories[2], g: "Aa", d: "Everyday helpers for text, dates, passwords and QR codes." }];
const steps = [["01", "Pick a tool", "Search or browse by category."], ["02", "Enter your numbers", "Sensible defaults are pre-filled."], ["03", "Read your estimate", "Results update instantly as you type."]];
const why = [["Free, no sign-up", "Open a tool and use it. No account, no paywall."], ["Private by design", "Calculations run in your browser, not on our servers."], ["Built for US & UK", "Wording and examples suit dollars, pounds, VAT and mortgages."], ["Fast pages", "Statically generated pages that load quickly on mobile."]];
const hero = [["YouTube estimate", "$600", "/ month"], ["Loan EMI", "1,864", "/ month"], ["Engagement", "2.7%", "rate"]];
export default function Home() {
  return (<div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, potentialAction: { "@type": "SearchAction", target: `${SITE.url}/?q={q}`, "query-input": "required name=q" } }} />
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
      <div><span className="badge">● Free · No sign-up · Runs in your browser</span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Calculators that turn your numbers into <span className="grad-text">decisions</span></h1>
        <p className="mt-5 max-w-lg text-lg text-muted">Estimate creator income, plan a loan or mortgage, and use everyday tools, all in one fast place for US and UK users.</p>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="/#tools" className="btn btn-primary">Explore free tools →</Link><Link href="/#how" className="btn btn-ghost">See how it works</Link></div>
        <p className="mt-6 text-sm text-muted">For YouTubers · TikTok creators · Home buyers · Savers · Freelancers</p></div>
      <div className="stage" aria-hidden><Tilt max={10} className="stack">{hero.map(([l, v, u], i) => (<div key={l} className={`card float-card fc${i + 1}`}><p className="text-xs text-muted">{l} · example</p><p className="mt-1 text-3xl font-bold">{v}<span className="ml-1 text-sm font-medium text-muted">{u}</span></p><div className="mt-3 h-1.5 rounded-full bg-[var(--line)]"><div className="h-full rounded-full" style={{ width: `${[72, 55, 38][i]}%`, background: "linear-gradient(90deg,var(--brand),var(--brand-2))" }} /></div></div>))}</Tilt></div>
    </section>
    <div className="mx-auto max-w-6xl px-4">{/* ADSENSE_TOP_BANNER (below hero) */}<AdSlot name="ADSENSE_TOP_BANNER" /></div>
    <section className="section mx-auto max-w-6xl px-4"><Reveal><p className="eyebrow">Services</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Everything in three categories</h2></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{cats.map((x, i) => (<Reveal key={x.c} delay={i * 0.08}><Tilt className="h-full"><div className="card hover h-full p-6"><span className="icon-tile">{x.g}</span><h3 className="mt-4 text-xl font-semibold">{x.c}</h3><p className="mt-1 text-sm text-muted">{x.d}</p>
        <ul className="mt-4 space-y-1.5 text-sm">{tools.filter((t) => t.category === x.c).map((t) => <li key={t.slug}><Link className="transition hover:text-[var(--brand)]" href={`/tools/${t.slug}`}>→ {t.name}</Link></li>)}</ul></div></Tilt></Reveal>))}</div></section>
    <section id="tools" className="section mx-auto max-w-6xl px-4 !pt-0"><Reveal><p className="eyebrow">All tools</p><h2 className="mb-6 mt-2 text-3xl font-bold sm:text-4xl">Find your tool</h2><SearchTools tools={tools} /></Reveal></section>
    <section id="how" className="section mx-auto max-w-6xl px-4"><Reveal><p className="eyebrow">How it works</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Answers in three steps</h2></Reveal>
      <ol className="relative mt-10 grid gap-5 md:grid-cols-3"><div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-50 md:block" />
        {steps.map(([n, t, d], i) => (<Reveal key={n} delay={i * 0.1}><li className="card relative p-6"><span className="icon-tile">{n}</span><h3 className="mt-4 font-semibold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li></Reveal>))}</ol></section>
    <section id="why" className="section mx-auto max-w-6xl px-4 !pt-0"><Reveal><p className="eyebrow">Why choose us</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Simple, private and fast</h2></Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{why.map(([t, d], i) => (<Reveal key={t} delay={i * 0.07}><Tilt className="h-full"><div className="card hover h-full p-5"><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div></Tilt></Reveal>))}</div></section>
    <section className="mx-auto max-w-6xl px-4"><Reveal><div className="card grid grid-cols-3 divide-x divide-[var(--line)] p-6 text-center">
      {[[tools.length, "Free tools"], [categories.length, "Categories"], [0, "Sign-ups needed"]].map(([n, l]) => (<div key={l as string}><p className="grad-text text-4xl font-extrabold tabular-nums sm:text-5xl"><Counter to={n as number} /></p><p className="mt-1 text-xs text-muted sm:text-sm">{l}</p></div>))}</div></Reveal></section>
    {/* Testimonials: intentionally omitted until real reviews exist. */}
    <div className="mx-auto max-w-6xl px-4">{/* ADSENSE_BEFORE_FAQ */}<AdSlot name="ADSENSE_BEFORE_FAQ" /><FAQ faqs={faqs} />
      <Reveal><div className="card mt-14 p-8 text-center sm:p-12"><h2 className="text-2xl font-bold sm:text-3xl">Ready to run the numbers?</h2><p className="mt-2 text-muted">Pick a tool and get an estimate in seconds.</p><Link href="/#tools" className="btn btn-primary mt-6">Browse all {tools.length} tools</Link></div></Reveal></div>
  </div>);
}
