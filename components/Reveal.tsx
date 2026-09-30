"use client";
import { useEffect, useRef } from "react";
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = r.current!; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 }); io.observe(el); return () => io.disconnect(); }, []);
  return <div ref={r} className={`reveal ${className}`} style={{ ["--d" as string]: `${delay}s` }}>{children}</div>;
}
