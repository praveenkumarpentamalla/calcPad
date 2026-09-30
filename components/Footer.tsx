import Link from "next/link"; import AdSlot from "./AdSlot"; import { SITE } from "@/lib/site";
const links = [["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"], ["Disclaimer", "/disclaimer"]];
export default function Footer() {
  return (<footer className="mt-16 border-t border-slate-200 dark:border-slate-800"><div className="mx-auto max-w-6xl px-4 py-8">
    {/* ADSENSE_FOOTER */}<AdSlot name="ADSENSE_FOOTER" />
    <nav className="flex flex-wrap gap-4 text-sm">{links.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}</nav>
    <p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} {SITE.name}. Results are estimates, not financial advice.</p></div></footer>);
}
