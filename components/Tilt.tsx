"use client";
import { useRef } from "react";
export default function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const r = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = r.current!, b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
  };
  return <div ref={r} onPointerMove={move} onPointerLeave={() => { r.current!.style.transform = ""; }} className={`tilt ${className}`}>{children}</div>;
}
