import Link from "next/link"; import Tilt from "./Tilt"; import CatIcon from "./Icon"; import type { Tool } from "@/lib/tools";
export default function ToolCard({ t }: { t: Tool }) {
  return (<Tilt max={4} className="h-full"><Link href={`/tools/${t.slug}`} className="card group flex h-full flex-col p-5">
    <span className="flex items-start justify-between"><span className="icon-tile"><CatIcon c={t.category} /></span><span className="badge">{t.category}</span></span>
    <span className="mt-4 font-semibold">{t.name}</span><span className="mt-1 text-sm text-muted">{t.short}</span>
    <span className="mt-auto pt-4 text-sm font-medium text-[var(--brand)]">Open Tool <span className="inline-block transition group-hover:translate-x-1">→</span></span></Link></Tilt>);
}
