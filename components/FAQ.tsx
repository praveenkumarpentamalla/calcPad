export default function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (<section className="mt-10"><h2 className="text-xl font-semibold">Frequently asked questions</h2>
    <div className="mt-4 space-y-2">{faqs.map((f) => (<details key={f.q} className="card p-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 text-slate-600 dark:text-slate-300">{f.a}</p></details>))}</div></section>);
}
