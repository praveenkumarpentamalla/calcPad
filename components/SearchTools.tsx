"use client";
import Link from "next/link"; import { useState } from "react"; import type { Tool } from "@/lib/tools"; import Tilt from "./Tilt";
const glyph = { Creator: "▶", Finance: "%", "Text & Utility": "Aa" } as const;
export default function SearchTools({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState(""); const hits = tools.filter((t) => (t.name + t.short + t.category).toLowerCase().includes(q.toLowerCase()));
  return (<div><input aria-label="Search tools" className="input max-w-md" placeholder="Search tools, e.g. mortgage, YouTube, QR…" value={q} onChange={(e) => setQ(e.target.value)} />
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{hits.map((t) => (<li key={t.slug}><Tilt><Link href={`/tools/${t.slug}`} className="card group flex h-full items-start gap-3 p-4">
      <span className="icon-tile shrink-0">{glyph[t.category]}</span><span><span className="block font-semibold">{t.name}</span><span className="block text-sm text-muted">{t.short}</span><span className="mt-2 inline-block text-xs font-medium text-[var(--brand)] transition group-hover:translate-x-1">Open tool →</span></span></Link></Tilt></li>))}
    {!hits.length && <li className="text-sm text-muted">No tools match. Try a shorter word.</li>}</ul></div>);
}
