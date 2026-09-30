// Placeholder only. Replace the inner div with your AdSense <ins> unit after approval.
export default function AdSlot({ name, className = "" }: { name: string; className?: string }) {
  return (<aside aria-label="Advertisement" data-ad-slot={name} className={`my-6 flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 dark:border-slate-700 ${className}`}>
    {/* {name} */}
    Ad space
  </aside>);
}
