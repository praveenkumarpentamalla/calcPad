const P: Record<string, string> = { Creator: "M6 4l14 8-14 8z", Finance: "M19 5L5 19M7.5 8.5a2 2 0 100-4 2 2 0 000 4zM16.5 19.5a2 2 0 100-4 2 2 0 000 4z", Everyday: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z", "Text & Productivity": "M4 7V5h16v2M9 19h6M12 5v14" };
export default function CatIcon({ c }: { c: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[c]} /></svg>;
}
