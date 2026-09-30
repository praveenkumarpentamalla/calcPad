"use client";
import { useEffect, useState } from "react";
type F = { k: string; label: string; def: string; type?: "number" | "date" };
type Calc = { fields: F[]; run: (v: string[]) => [string, string][] };
const n = (s: string) => Number(s) || 0;
const m = (x: number) => x.toLocaleString(undefined, { maximumFractionDigits: 2 });
const pmt = (p: number, r: number, y: number) => { const i = r / 1200, k = y * 12; return i ? (p * i) / (1 - Math.pow(1 + i, -k)) : p / k; };
const calcs: Record<string, Calc> = {
 "youtube-money-calculator": { fields: [{ k: "v", label: "Monthly views", def: "100000" }, { k: "r", label: "RPM ($ per 1,000 views)", def: "3" }], run: ([v, r]) => [["Monthly", m(n(v) / 1000 * n(r))], ["Yearly", m(n(v) / 1000 * n(r) * 12)]] },
 "tiktok-money-calculator": { fields: [{ k: "v", label: "Monthly qualified views", def: "500000" }, { k: "r", label: "Rate ($ per 1,000 views)", def: "0.03" }], run: ([v, r]) => [["Monthly", m(n(v) / 1000 * n(r))], ["Yearly", m(n(v) / 1000 * n(r) * 12)]] },
 "instagram-engagement-calculator": { fields: [{ k: "l", label: "Likes", def: "500" }, { k: "c", label: "Comments", def: "40" }, { k: "f", label: "Followers", def: "20000" }], run: ([l, c, f]) => [["Engagement rate", m(((n(l) + n(c)) / (n(f) || 1)) * 100) + "%"]] },
 "emi-calculator": { fields: [{ k: "p", label: "Loan amount", def: "250000" }, { k: "r", label: "Annual rate %", def: "6.5" }, { k: "y", label: "Years", def: "20" }], run: ([p, r, y]) => { const e = pmt(n(p), n(r), n(y)); return [["Monthly EMI", m(e)], ["Total interest", m(e * n(y) * 12 - n(p))], ["Total payment", m(e * n(y) * 12)]]; } },
 "mortgage-calculator": { fields: [{ k: "p", label: "Home price", def: "350000" }, { k: "d", label: "Deposit / down payment", def: "70000" }, { k: "r", label: "Annual rate %", def: "5.5" }, { k: "y", label: "Term (years)", def: "25" }], run: ([p, d, r, y]) => { const L = n(p) - n(d), e = pmt(L, n(r), n(y)); return [["Loan amount", m(L)], ["Monthly payment", m(e)], ["Total interest", m(e * n(y) * 12 - L)]]; } },
 "sip-calculator": { fields: [{ k: "p", label: "Monthly investment", def: "500" }, { k: "r", label: "Expected return % / yr", def: "8" }, { k: "y", label: "Years", def: "15" }], run: ([p, r, y]) => { const i = n(r) / 1200, k = n(y) * 12, fv = i ? n(p) * ((Math.pow(1 + i, k) - 1) / i) * (1 + i) : n(p) * k; return [["Invested", m(n(p) * k)], ["Estimated value", m(fv)], ["Estimated gain", m(fv - n(p) * k)]]; } },
 "compound-interest-calculator": { fields: [{ k: "p", label: "Principal", def: "10000" }, { k: "r", label: "Annual rate %", def: "5" }, { k: "y", label: "Years", def: "10" }, { k: "c", label: "Compounds per year", def: "12" }], run: ([p, r, y, c]) => { const a = n(p) * Math.pow(1 + n(r) / 100 / (n(c) || 1), (n(c) || 1) * n(y)); return [["Final balance", m(a)], ["Interest earned", m(a - n(p))]]; } },
 "gst-calculator": { fields: [{ k: "a", label: "Amount (net)", def: "100" }, { k: "r", label: "GST / VAT rate %", def: "20" }], run: ([a, r]) => [["Tax added", m(n(a) * n(r) / 100)], ["Gross total", m(n(a) * (1 + n(r) / 100))], ["If amount is gross: net", m(n(a) / (1 + n(r) / 100))]] },
 "percentage-calculator": { fields: [{ k: "x", label: "X", def: "15" }, { k: "y", label: "Y", def: "200" }], run: ([x, y]) => [["X% of Y", m(n(y) * n(x) / 100)], ["X is what % of Y", m((n(x) / (n(y) || 1)) * 100) + "%"]] },
 "salary-calculator": { fields: [{ k: "g", label: "Gross annual salary", def: "50000" }, { k: "t", label: "Effective tax rate %", def: "22" }], run: ([g, t]) => { const net = n(g) * (1 - n(t) / 100); return [["Net yearly", m(net)], ["Net monthly", m(net / 12)], ["Net weekly", m(net / 52)]]; } },
 "age-calculator": { fields: [{ k: "d", label: "Date of birth", def: "1995-06-15", type: "date" }], run: ([d]) => { const b = new Date(d), t = new Date(); if (isNaN(+b) || b > t) return [["Age", "Enter a valid past date"]]; let y = t.getFullYear() - b.getFullYear(), mo = t.getMonth() - b.getMonth(), da = t.getDate() - b.getDate(); if (da < 0) { mo--; da += new Date(t.getFullYear(), t.getMonth(), 0).getDate(); } if (mo < 0) { y--; mo += 12; } return [["Age", `${y}y ${mo}m ${da}d`], ["Days lived", m(Math.floor((+t - +b) / 864e5))]]; } },
};
function Calculator({ slug }: { slug: string }) {
  const c = calcs[slug]; const [v, setV] = useState(c.fields.map((f) => f.def));
  return (<div><div className="grid gap-3 sm:grid-cols-2">{c.fields.map((f, i) => (<label key={f.k} className="text-sm">{f.label}<input className="input mt-1" type={f.type ?? "number"} value={v[i]} onChange={(e) => setV(v.map((x, j) => (j === i ? e.target.value : x)))} /></label>))}</div>
    <div aria-live="polite" className="mt-4 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-950">{c.run(v).map(([l, val]) => (<p key={l} className="flex justify-between"><span>{l}</span><strong>{val}</strong></p>))}</div></div>);
}
function TextCounter({ chars }: { chars?: boolean }) {
  const [t, setT] = useState(""); const w = t.trim() ? t.trim().split(/\s+/).length : 0;
  return (<div><textarea className="input h-40" value={t} onChange={(e) => setT(e.target.value)} placeholder="Type or paste text" />
    <p className="mt-3 text-sm">Words: <b>{w}</b> · Characters: <b>{t.length}</b> · Without spaces: <b>{t.replace(/\s/g, "").length}</b>{!chars && <> · Sentences: <b>{(t.match(/[.!?]+/g) || []).length}</b> · Reading time: <b>{Math.ceil(w / 238)} min</b></>}</p></div>);
}
function Password() {
  const [len, setLen] = useState(16), [pw, setPw] = useState("");
  const gen = () => { const cs = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*"; const a = new Uint32Array(len); crypto.getRandomValues(a); setPw(Array.from(a, (x) => cs[x % cs.length]).join("")); };
  useEffect(gen, [len]); // eslint-disable-line react-hooks/exhaustive-deps
  return (<div><label className="text-sm">Length: {len}<input type="range" min={8} max={64} value={len} onChange={(e) => setLen(+e.target.value)} className="w-full" /></label>
    <p className="card my-3 break-all p-3 font-mono">{pw}</p><button onClick={gen} className="rounded-lg bg-indigo-600 px-4 py-2 text-white">Generate new</button> <button onClick={() => navigator.clipboard.writeText(pw)} className="rounded-lg border px-4 py-2">Copy</button></div>);
}
function QR() {
  const [t, setT] = useState("https://example.com"), [src, setSrc] = useState("");
  useEffect(() => { import("qrcode").then((q) => q.toDataURL(t || " ", { width: 256, margin: 2 })).then(setSrc); }, [t]);
  return (<div><input className="input" value={t} onChange={(e) => setT(e.target.value)} aria-label="Text or URL" />{src && <><img src={src} alt="QR code" width={256} height={256} className="mt-3" /><a download="qr-code.png" href={src} className="mt-2 inline-block text-indigo-600 underline">Download PNG</a></>}</div>);
}
export default function ToolWidget({ slug }: { slug: string }) {
  if (slug === "word-counter") return <TextCounter />;
  if (slug === "character-counter") return <TextCounter chars />;
  if (slug === "password-generator") return <Password />;
  if (slug === "qr-code-generator") return <QR />;
  return calcs[slug] ? <Calculator slug={slug} /> : null;
}
