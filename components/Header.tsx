import Link from "next/link"; import { SITE } from "@/lib/site";
export default function Header() {
  return (<header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
    <Link href="/" className="font-bold">{SITE.name}</Link>
    <nav className="flex gap-4 text-sm"><Link href="/#tools">Tools</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav></div></header>);
}
