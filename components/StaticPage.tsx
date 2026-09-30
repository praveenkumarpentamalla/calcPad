import RelatedTools from "./RelatedTools";
export default function StaticPage({ title, paras }: { title: string; paras: string[] }) {
  return (<div className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-3xl font-bold">{title}</h1>{paras.map((p) => <p key={p} className="mt-4 leading-relaxed">{p}</p>)}<RelatedTools /></div>);
}
