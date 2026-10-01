"use client";
import Link from "next/link"; import { useState } from "react"; import type { Tool } from "@/lib/tools";
const tries: [string, string][] = [["Calculate my EMI", "emi-calculator"], ["Generate a password", "password-generator"], ["Calculate age", "age-calculator"]];
export default function ToolSearch({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState(""), [open, setOpen] = useState(false);
  const hits = q.trim() ? tools.filter((t) => `${t.name} ${t.short} ${t.category} ${t.slug}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : [];
  return (<div className="relative max-w-xl"><label htmlFor="ts" className="mb-2 block font-medium">What do you want to do?</label>
    <input id="ts" role="combobox" aria-expanded={open && hits.length > 0} aria-controls="ts-list" autoComplete="off" className="input !min-h-[3.4rem] !text-base" placeholder="Search calculators, generators, converters..." value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} />
    {open && hits.length > 0 && <ul id="ts-list" role="listbox" className="card absolute z-20 mt-2 w-full p-1.5">{hits.map((t) => (<li key={t.slug} role="option" aria-selected="false"><Link href={`/tools/${t.slug}`} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-[var(--bg2)]"><span>{t.name}</span><span className="badge">{t.category}</span></Link></li>))}</ul>}
    <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">Try: {tries.map(([l, s]) => <Link key={s} href={`/tools/${s}`} className="badge hover:bg-[#C7D2FE]">{l}</Link>)}</p></div>);
}
