"use client";
import Link from "next/link"; import { useState } from "react"; import type { Tool } from "@/lib/tools";
export default function SearchTools({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState(""); const hits = tools.filter((t) => (t.name + t.short).toLowerCase().includes(q.toLowerCase()));
  return (<div id="tools"><input aria-label="Search tools" className="input" placeholder="Search tools, e.g. mortgage" value={q} onChange={(e) => setQ(e.target.value)} />
    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{hits.map((t) => (<li key={t.slug}><Link href={`/tools/${t.slug}`} className="card block p-4 hover:border-indigo-500"><span className="font-medium">{t.name}</span><span className="block text-sm text-slate-500">{t.short}</span></Link></li>))}
    {!hits.length && <li className="text-sm text-slate-500">No tools match. Try a shorter word.</li>}</ul></div>);
}
