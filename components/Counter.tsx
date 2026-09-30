"use client";
import { useEffect, useRef, useState } from "react";
export default function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null); const [v, setV] = useState(to);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setV(0); const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; io.disconnect(); const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min((t - t0) / 1200, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}</span>;
}
