"use client";
import { useEffect, useState } from "react";
type V = Record<string, string>;
type F = { k: string; q: string; hint?: string; def: string; type?: "number" | "date" | "choice"; opts?: [string, string][]; presets?: number[]; pre?: boolean; suf?: string; when?: (v: V) => boolean; pref?: boolean };
type Res = { label: string; main: string; note?: string; rows?: [string, string][]; bar?: { a: [string, number]; b: [string, number] } };
type Calc = { money?: boolean; fields: F[]; run: (v: V, c: string) => Res };
const n = (s: string) => Number(s) || 0;
const m = (x: number) => x.toLocaleString(undefined, { maximumFractionDigits: 2 });
const pmt = (p: number, r: number, y: number) => { const i = r / 1200, k = y * 12; return k <= 0 ? 0 : i ? (p * i) / (1 - Math.pow(1 + i, -k)) : p / k; };
const loan = (amt: number, v: V, c: string, label = "Your estimated monthly payment"): Res => { const e = pmt(amt, n(v.r), n(v.y)), tot = e * n(v.y) * 12; return { label, main: `${c}${m(e)} / month`, note: "Based on fixed monthly repayments. Fees and taxes are not included.", rows: [["Amount borrowed", c + m(amt)], ["Total interest", c + m(tot - amt)], ["Total amount paid", c + m(tot)]], bar: { a: ["Borrowed", amt], b: ["Interest", Math.max(tot - amt, 0)] } }; };
const rate = (def: string): F => ({ k: "r", q: "What is the interest rate?", def, suf: "%" });
const yrs = (def: string, presets: number[]): F => ({ k: "y", q: "How long will you take to repay it?", def, suf: "years", presets });
const calcs: Record<string, Calc> = {
 "youtube-money-calculator": { money: true, fields: [{ k: "v", q: "How many views do you get each month?", def: "100000" }, { k: "r", q: "How much do you earn per 1,000 views?", hint: "YouTube Studio calls this RPM. Not sure? Try a value between 1 and 5.", def: "3", pre: true, presets: [1, 3, 5] }],
  run: (v, c) => { const x = (n(v.v) / 1000) * n(v.r); return { label: "Estimated monthly earnings", main: c + m(x), note: "A rough estimate. Real earnings depend on your audience, topic and season.", rows: [["Per year", c + m(x * 12)]] }; } },
 "tiktok-money-calculator": { money: true, fields: [{ k: "v", q: "How many qualified views do you get each month?", def: "500000" }, { k: "r", q: "How much do you earn per 1,000 views?", hint: "Rates are often low and vary by region and programme.", def: "0.03", pre: true, presets: [0.02, 0.03, 0.04] }],
  run: (v, c) => { const x = (n(v.v) / 1000) * n(v.r); return { label: "Estimated monthly earnings", main: c + m(x), note: "An estimate only. Payouts depend on programme eligibility.", rows: [["Per year", c + m(x * 12)]] }; } },
 "instagram-engagement-calculator": { fields: [{ k: "l", q: "How many likes does a typical post get?", def: "500" }, { k: "c", q: "How many comments?", def: "40" }, { k: "f", q: "How many followers do you have?", def: "20000" }],
  run: (v) => ({ label: "Your engagement rate", main: m(((n(v.l) + n(v.c)) / (n(v.f) || 1)) * 100) + "%", note: "Roughly 1–3% is common for mid-size accounts, but it varies by niche.", rows: [["Interactions per post", m(n(v.l) + n(v.c))]] }) },
 "emi-calculator": { money: true, fields: [{ k: "p", q: "How much do you want to borrow?", def: "250000", pre: true }, rate("6.5"), yrs("20", [1, 3, 5, 10, 20])], run: (v, c) => loan(n(v.p), v, c) },
 "mortgage-calculator": { money: true, fields: [{ k: "p", q: "What is the price of the home?", def: "350000", pre: true }, { k: "d", q: "How much will you pay upfront?", hint: "Also called a deposit or down payment.", def: "70000", pre: true }, rate("5.5"), yrs("25", [15, 25, 30])], run: (v, c) => loan(Math.max(n(v.p) - n(v.d), 0), v, c, "Your estimated monthly mortgage payment") },
 "sip-calculator": { money: true, fields: [{ k: "p", q: "How much will you invest each month?", def: "500", pre: true }, { k: "r", q: "What yearly return do you expect?", hint: "Returns are not guaranteed.", def: "8", suf: "%" }, { k: "y", q: "For how many years?", def: "15", suf: "years", presets: [5, 10, 15, 20] }],
  run: (v, c) => { const i = n(v.r) / 1200, k = n(v.y) * 12, inv = n(v.p) * k, fv = i ? n(v.p) * ((Math.pow(1 + i, k) - 1) / i) * (1 + i) : inv; return { label: "Your estimated savings", main: c + m(fv), note: "An illustration only. Real returns go up and down.", rows: [["You put in", c + m(inv)], ["Estimated growth", c + m(fv - inv)]], bar: { a: ["You put in", inv], b: ["Growth", Math.max(fv - inv, 0)] } }; } },
 "compound-interest-calculator": { money: true, fields: [{ k: "p", q: "How much are you starting with?", def: "10000", pre: true }, { k: "r", q: "What is the yearly interest rate?", def: "5", suf: "%" }, { k: "y", q: "For how many years?", def: "10", suf: "years", presets: [5, 10, 20, 30] }, { k: "c", q: "How often is interest added?", def: "12", type: "choice", pref: true, opts: [["Yearly", "1"], ["Monthly", "12"], ["Daily", "365"]] }],
  run: (v, c) => { const a = n(v.p) * Math.pow(1 + n(v.r) / 100 / n(v.c), n(v.c) * n(v.y)); return { label: "Your balance after this time", main: c + m(a), note: "Interest is earned on your money and on past interest.", rows: [["Starting amount", c + m(n(v.p))], ["Interest earned", c + m(a - n(v.p))]], bar: { a: ["Starting amount", n(v.p)], b: ["Interest", Math.max(a - n(v.p), 0)] } }; } },
 "gst-calculator": { money: true, fields: [{ k: "mode", q: "What do you want to do?", def: "add", type: "choice", opts: [["Add tax to a price", "add"], ["Remove tax from a price", "remove"]] }, { k: "a", q: "What is the price before tax?", def: "100", pre: true, when: (v) => v.mode === "add" }, { k: "b", q: "What is the total including tax?", def: "120", pre: true, when: (v) => v.mode === "remove" }, { k: "r", q: "What is the tax rate?", hint: "GST or VAT. UK standard VAT is 20%.", def: "20", suf: "%", presets: [5, 10, 20] }],
  run: (v, c) => { const r = n(v.r) / 100; if (v.mode === "add") { const a = n(v.a); return { label: "Price including tax", main: c + m(a * (1 + r)), rows: [["Price before tax", c + m(a)], ["Tax added", c + m(a * r)]] }; } const b = n(v.b), net = b / (1 + r); return { label: "Price before tax", main: c + m(net), rows: [["Total including tax", c + m(b)], ["Tax included", c + m(b - net)]] }; } },
 "percentage-calculator": { fields: [{ k: "mode", q: "What do you want to calculate?", def: "of", type: "choice", opts: [["What's X% of a number?", "of"], ["What percentage is X of Y?", "is"], ["Increase or decrease", "chg"], ["Percentage difference", "diff"]] },
  { k: "a", q: "What percentage?", def: "15", suf: "%", when: (v) => v.mode === "of" }, { k: "b", q: "Of which number?", def: "200", when: (v) => v.mode === "of" },
  { k: "c", q: "Which number?", def: "30", when: (v) => v.mode === "is" }, { k: "d", q: "Out of which number?", def: "120", when: (v) => v.mode === "is" },
  { k: "e", q: "What was the starting number?", def: "80", when: (v) => v.mode === "chg" }, { k: "f", q: "What is the new number?", def: "100", when: (v) => v.mode === "chg" },
  { k: "g", q: "First number", def: "50", when: (v) => v.mode === "diff" }, { k: "h", q: "Second number", def: "70", when: (v) => v.mode === "diff" }],
  run: (v) => { if (v.mode === "of") return { label: `${m(n(v.a))}% of ${m(n(v.b))} is`, main: m((n(v.b) * n(v.a)) / 100) }; if (v.mode === "is") return { label: `${m(n(v.c))} is this much of ${m(n(v.d))}`, main: m((n(v.c) / (n(v.d) || 1)) * 100) + "%" };
   if (v.mode === "chg") { const p = ((n(v.f) - n(v.e)) / (n(v.e) || 1)) * 100; return { label: p >= 0 ? "Percentage increase" : "Percentage decrease", main: m(Math.abs(p)) + "%", note: "Change divided by the starting number." }; }
   const avg = (n(v.g) + n(v.h)) / 2; return { label: "Percentage difference", main: m((Math.abs(n(v.g) - n(v.h)) / (avg || 1)) * 100) + "%", note: "Difference divided by the average of both numbers." }; } },
 "salary-calculator": { money: true, fields: [{ k: "g", q: "What is your yearly salary before tax?", def: "50000", pre: true }, { k: "t", q: "About what share goes to tax?", hint: "Use the effective rate from your payslip. This is not a real tax band calculation.", def: "22", suf: "%" }],
  run: (v, c) => { const net = n(v.g) * (1 - n(v.t) / 100); return { label: "Your estimated take-home pay per month", main: c + m(net / 12), note: "An estimate using one flat tax rate.", rows: [["Per year", c + m(net)], ["Per week", c + m(net / 52)], ["Tax per year", c + m(n(v.g) - net)]], bar: { a: ["Take-home", net], b: ["Tax", Math.max(n(v.g) - net, 0)] } }; } },
 "age-calculator": { fields: [{ k: "d", q: "When were you born?", def: "1995-06-15", type: "date" }],
  run: (v) => { const b = new Date(v.d), t = new Date(); if (isNaN(+b) || b > t) return { label: "Your age", main: "Pick a past date" }; let y = t.getFullYear() - b.getFullYear(), mo = t.getMonth() - b.getMonth(), da = t.getDate() - b.getDate(); if (da < 0) { mo--; da += new Date(t.getFullYear(), t.getMonth(), 0).getDate(); } if (mo < 0) { y--; mo += 12; } return { label: "Your exact age", main: `${y} years`, rows: [["And", `${mo} months, ${da} days`], ["Days lived", m(Math.floor((+t - +b) / 864e5))]] }; } },
};
function Step({ n: k, t, right }: { n: number; t: string; right?: React.ReactNode }) {
  return <div className="mb-3 mt-6 flex items-center justify-between first:mt-0"><h3 className="flex items-center gap-2 font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--soft)] text-xs text-[var(--brand)]">{k}</span>{t}</h3>{right}</div>;
}
function Chips({ opts, val, on, label }: { opts: [string, string][]; val: string; on: (v: string) => void; label: string }) {
  return <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">{opts.map(([l, x]) => <button key={x} type="button" role="radio" aria-checked={val === x} onClick={() => on(x)} className={`chip ${val === x ? "on" : ""}`}>{l}</button>)}</div>;
}
function Field({ f, v, set, c }: { f: F; v: V; set: (k: string, x: string) => void; c: string }) {
  const id = "f-" + f.k;
  if (f.type === "choice") return <div className="mb-4"><p className="mb-2 font-medium">{f.q}</p><Chips label={f.q} opts={f.opts!} val={v[f.k]} on={(x) => set(f.k, x)} /></div>;
  return (<div className="mb-4"><label htmlFor={id} className="mb-1 block font-medium">{f.q}</label>{f.hint && <p className="mb-2 text-sm text-muted">{f.hint}</p>}
    <div className="relative">{f.pre && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">{c}</span>}
      <input id={id} className="input" style={{ paddingLeft: f.pre ? "2rem" : undefined, paddingRight: f.suf ? "4rem" : undefined }} type={f.type === "date" ? "date" : "number"} inputMode="decimal" min={f.type === "date" ? undefined : 0} value={v[f.k]} onChange={(e) => set(f.k, e.target.value)} />
      {f.suf && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">{f.suf}</span>}</div>
    {f.presets && <div className="mt-2 flex flex-wrap gap-2">{f.presets.map((p) => <button type="button" key={p} onClick={() => set(f.k, String(p))} className={`chip ${v[f.k] === String(p) ? "on" : ""}`}>{f.pre ? c : ""}{p}{f.suf === "%" ? "%" : f.suf ? ` ${f.suf}` : ""}</button>)}</div>}</div>);
}
function useCopy() { const [ok, setOk] = useState(false); return [ok, (t: string) => { navigator.clipboard.writeText(t).then(() => { setOk(true); setTimeout(() => setOk(false), 1500); }); }] as const; }
function Result({ r, onReset }: { r: Res; onReset: () => void }) {
  const [ok, copy] = useCopy(); const tot = r.bar ? r.bar.a[1] + r.bar.b[1] || 1 : 1;
  return (<div aria-live="polite" className="card p-6"><p className="text-center text-sm text-muted">{r.label}</p><p className="mt-1 break-words text-center text-4xl font-extrabold tabular-nums text-[var(--brand)] sm:text-5xl">{r.main}</p>
    {r.bar && <div className="mt-5"><div className="flex h-3 overflow-hidden rounded-full bg-[var(--bg2)]"><div style={{ width: `${(r.bar.a[1] / tot) * 100}%`, background: "var(--brand)" }} /><div style={{ width: `${(r.bar.b[1] / tot) * 100}%`, background: "var(--accent)" }} /></div>
      <p className="mt-2 flex justify-between text-xs text-muted"><span>● {r.bar.a[0]}</span><span style={{ color: "#0891B2" }}>● {r.bar.b[0]}</span></p></div>}
    {r.rows && <dl className="mt-5 divide-y divide-[var(--line)] border-t border-[var(--line)] text-sm">{r.rows.map(([a, b]) => <div key={a} className="flex justify-between py-2.5"><dt className="text-muted">{a}</dt><dd className="font-semibold tabular-nums">{b}</dd></div>)}</dl>}
    {r.note && <p className="mt-3 text-sm text-muted">{r.note}</p>}
    <div className="mt-5 flex gap-2"><button type="button" className="btn btn-primary flex-1" onClick={() => copy([`${r.label}: ${r.main}`, ...(r.rows ?? []).map(([a, b]) => `${a}: ${b}`)].join("\n"))}>{ok ? "Copied ✓" : "Copy Result"}</button><button type="button" className="btn btn-ghost" onClick={onReset}>Reset</button></div></div>);
}
function Calculator({ slug }: { slug: string }) {
  const cfg = calcs[slug]; const init = () => Object.fromEntries(cfg.fields.map((f) => [f.k, f.def]));
  const [v, setV] = useState<V>(init), [cur, setCur] = useState("$"); const set = (k: string, x: string) => setV((o) => ({ ...o, [k]: x }));
  const vis = cfg.fields.filter((f) => !f.when || f.when(v)), mode = vis.find((f) => f.k === "mode"), inputs = vis.filter((f) => f.k !== "mode" && !f.pref), prefs = vis.filter((f) => f.pref); let s = 1;
  return (<div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]"><div>
    {mode && <><Step n={s++} t="Tell us what you want to calculate" /><Field f={mode} v={v} set={set} c={cur} /></>}
    <Step n={s++} t="Enter your information" right={cfg.money ? <select aria-label="Currency" className="input !min-h-0 !w-auto !py-1 text-sm" value={cur} onChange={(e) => setCur(e.target.value)}>{["$", "£", "€", "₹"].map((x) => <option key={x}>{x}</option>)}</select> : undefined} />
    {inputs.map((f) => <Field key={f.k} f={f} v={v} set={set} c={cur} />)}
    {prefs.length > 0 && <><Step n={s++} t="Choose your preferences" />{prefs.map((f) => <Field key={f.k} f={f} v={v} set={set} c={cur} />)}</>}</div>
    <div className="lg:sticky lg:top-6 lg:self-start"><Step n={s} t="See your result" /><Result r={cfg.run(v, cur)} onReset={() => setV(init())} /></div></div>);
}
function Stat({ l, x }: { l: string; x: string | number }) { return <div className="rounded-xl bg-[var(--bg2)] p-3 text-center"><p className="text-2xl font-bold tabular-nums text-[var(--brand)]">{x}</p><p className="text-xs text-muted">{l}</p></div>; }
function TextCounter({ chars }: { chars?: boolean }) {
  const [t, setT] = useState(""), [ok, copy] = useCopy(); const w = t.trim() ? t.trim().split(/\s+/).length : 0, ns = t.replace(/\s/g, "").length;
  const st: [string, string | number][] = chars ? [["Characters", t.length], ["Without spaces", ns], ["Words", w]] : [["Words", w], ["Characters", t.length], ["Without spaces", ns], ["Sentences", (t.match(/[.!?]+/g) || []).length], ["Reading time", `${Math.ceil(w / 238)} min`]];
  return (<div><Step n={1} t="Type or paste your text" /><label htmlFor="tx" className="sr-only">Your text</label><textarea id="tx" className="input h-44" value={t} onChange={(e) => setT(e.target.value)} placeholder="Start typing or paste your text here…" />
    <Step n={2} t="See your result" /><div aria-live="polite" className="grid grid-cols-2 gap-3 sm:grid-cols-3">{st.map(([l, x]) => <Stat key={l} l={l} x={x} />)}</div>
    <div className="mt-4 flex gap-2"><button type="button" className="btn btn-primary" onClick={() => copy(st.map(([l, x]) => `${l}: ${x}`).join("\n"))}>{ok ? "Copied ✓" : "Copy Result"}</button><button type="button" className="btn btn-ghost" onClick={() => setT("")}>Clear text</button></div></div>);
}
const SETS = { up: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lo: "abcdefghijklmnopqrstuvwxyz", num: "0123456789", sym: "!@#$%^&*()-_=+?" } as const;
function rnd(k: number) { const a = new Uint32Array(1), lim = Math.floor(2 ** 32 / k) * k; do crypto.getRandomValues(a); while (a[0] >= lim); return a[0] % k; }
function Toggle({ on, set, t, d }: { on: boolean; set: (b: boolean) => void; t: string; d: string }) {
  return <button type="button" role="switch" aria-checked={on} onClick={() => set(!on)} className={`toggle ${on ? "on" : ""}`}><span><b className="block">{t}</b><span className="text-sm text-muted">{d}</span></span><i aria-hidden="true" className="knob" /></button>;
}
function Password() {
  const [len, setLen] = useState(16), [o, setO] = useState({ up: true, lo: true, num: true, sym: true, sim: false, rep: false }), [pw, setPw] = useState(""), [ok, copy] = useCopy(), [n1, setN1] = useState(0);
  const sets = (["up", "lo", "num", "sym"] as const).filter((k) => o[k]).map((k) => (o.sim ? SETS[k].replace(/[O0Il1]/g, "") : SETS[k])), pool = sets.join(""), L = Math.min(len, o.rep ? pool.length : len);
  useEffect(() => {
    if (!pool) { setPw(""); return; } let avail = pool.split(""); const out: string[] = [];
    const pick = (src: string[]) => { const c = src[rnd(src.length)]; if (o.rep) avail = avail.filter((x) => x !== c); return c; };
    sets.forEach((s) => out.push(pick(o.rep ? avail.filter((c) => s.includes(c)) : s.split(""))));
    while (out.length < L) out.push(pick(o.rep ? avail : pool.split("")));
    for (let i = out.length - 1; i > 0; i--) { const j = rnd(i + 1); [out[i], out[j]] = [out[j], out[i]]; } setPw(out.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len, o, n1]);
  const bits = L * Math.log2(pool.length || 1), [sl, col] = bits < 40 ? ["Weak", "var(--err)"] : bits < 60 ? ["Fair", "var(--warn)"] : bits < 80 ? ["Strong", "var(--ok)"] : ["Very strong", "var(--ok)"];
  const t = (k: keyof typeof o) => (b: boolean) => setO({ ...o, [k]: b });
  return (<div><h2 className="text-xl font-bold">Create Your Password</h2><p className="text-muted">Choose what you want in your password and generate a secure password instantly.</p>
    <Step n={1} t="How long should it be?" /><label htmlFor="len" className="mb-1 block font-medium">Length: {len} characters</label>
    <div className="flex items-center gap-3 text-sm text-muted">8<input id="len" type="range" min={8} max={32} value={len} onChange={(e) => setLen(+e.target.value)} />32</div>
    <Step n={2} t="What should it contain?" /><div className="grid gap-3 sm:grid-cols-2"><Toggle on={o.up} set={t("up")} t="Capital letters" d="Add A–Z" /><Toggle on={o.lo} set={t("lo")} t="Small letters" d="Add a–z" /><Toggle on={o.num} set={t("num")} t="Numbers" d="Add 0–9" /><Toggle on={o.sym} set={t("sym")} t="Symbols" d="Add characters like ! @ # $ %" /></div>
    <Step n={3} t="Optional choices" /><div className="grid gap-3 sm:grid-cols-2"><Toggle on={o.sim} set={t("sim")} t="Avoid similar characters" d="Skip confusing ones such as O, 0, I and 1." /><Toggle on={o.rep} set={t("rep")} t="Avoid repeated characters" d="Never use the same character twice." /></div>
    {o.rep && len > L && <p className="mt-2 text-sm text-muted">Shortened to {L} characters so none repeat.</p>}
    <div className="card mt-6 p-6" aria-live="polite">{pool ? <><p className="text-sm text-muted">Your password</p><p className="mt-1 break-all font-mono text-2xl font-bold text-[var(--brand)]">{pw}</p>
      <p className="mt-4 text-sm text-muted">Password strength: <b style={{ color: col }}>{sl}</b></p><div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--bg2)]"><div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, bits)}%`, background: col }} /></div>
      <p className="mt-2 text-xs text-muted">Estimated from length and variety. Generated in your browser and never stored.</p></> : <p className="text-muted">Pick at least one thing to include above.</p>}
      <div className="mt-5 flex flex-wrap gap-2"><button type="button" className="btn btn-primary" disabled={!pool} onClick={() => setN1(n1 + 1)}>{pw ? "↻ Generate Another" : "Generate Password"}</button><button type="button" className="btn btn-ghost" disabled={!pw} onClick={() => copy(pw)}>{ok ? "Copied ✓" : "Copy"}</button></div></div></div>);
}
function QR() {
  const [t, setT] = useState("https://example.com"), [src, setSrc] = useState("");
  useEffect(() => { import("qrcode").then((q) => q.toDataURL(t || " ", { width: 256, margin: 2 })).then(setSrc); }, [t]);
  return (<div><Step n={1} t="What should the QR code open?" /><label htmlFor="qr" className="mb-1 block font-medium">Website link or text</label><input id="qr" className="input" value={t} onChange={(e) => setT(e.target.value)} placeholder="https://your-website.com" />
    <Step n={2} t="Your QR code" />{src && <div className="card inline-block p-4 text-center"><img src={src} alt="Your QR code" width={256} height={256} /><a download="qr-code.png" href={src} className="btn btn-primary mt-3 w-full">Download PNG</a></div>}<p className="mt-3 text-sm text-muted">Point a phone camera at the code to open it. Test it before printing.</p></div>);
}
export default function ToolWidget({ slug }: { slug: string }) {
  if (slug === "word-counter") return <TextCounter />;
  if (slug === "character-counter") return <TextCounter chars />;
  if (slug === "password-generator") return <Password />;
  if (slug === "qr-code-generator") return <QR />;
  return calcs[slug] ? <Calculator slug={slug} /> : null;
}
