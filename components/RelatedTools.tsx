import Link from "next/link"; import { related, tools } from "@/lib/tools";
export default function RelatedTools({ slug }: { slug?: string }) {
  const list = slug ? related(slug, 6) : tools.slice(0, 6);
  return (<section className="mt-10"><h2 className="text-xl font-semibold">Related Tools</h2>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map((t) => (<li key={t.slug}><Link href={`/tools/${t.slug}`} className="card block p-4 hover:border-indigo-500"><span className="font-medium">{t.name}</span><span className="block text-sm text-slate-500">{t.short}</span></Link></li>))}</ul></section>);
}
