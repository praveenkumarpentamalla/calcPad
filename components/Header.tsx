"use client";
import Link from "next/link"; import { useEffect, useState } from "react"; import { SITE } from "@/lib/site";
const nav = [["Tools", "/#tools"], ["How it works", "/#how"], ["Why us", "/#why"], ["About", "/about"], ["Contact", "/contact"]];
export default function Header() {
  const [s, setS] = useState(false), [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setS(scrollY > 12); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (<header className="sticky top-0 z-50 px-3 pt-3"><div className={`card mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 transition-all duration-300 ${s ? "shadow-lg" : "!shadow-none !bg-transparent !border-transparent"}`}>
    <Link href="/" className="flex items-center gap-2 font-bold"><span className="icon-tile !h-8 !w-8 !rounded-lg text-sm">F</span><span className="hidden sm:inline">{SITE.name}</span></Link>
    <nav className="hidden items-center gap-6 text-sm md:flex">{nav.map(([l, h]) => <Link key={h} href={h} className="text-muted transition hover:text-[var(--fg)]">{l}</Link>)}</nav>
    <div className="flex items-center gap-2"><Link href="/#tools" className="btn btn-primary !px-4 !py-2 text-sm">Get started</Link>
      <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="btn btn-ghost !p-2 md:hidden">☰</button></div></div>
    {open && <nav className="card mx-auto mt-2 flex max-w-6xl flex-col gap-1 p-3 md:hidden">{nav.map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/10">{l}</Link>)}</nav>}</header>);
}
