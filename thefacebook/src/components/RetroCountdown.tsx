import { useEffect, useState } from "react";

const next = (m: number, d: number) => {
  const now = new Date();
  let t = new Date(now.getFullYear(), m, d);
  if (t.getTime() <= now.getTime()) t = new Date(now.getFullYear() + 1, m, d);
  return t;
};

const parts = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
};

const Counter = ({ label, target }: { label: string; target: Date }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  const p = parts(target.getTime() - now);
  return (
    <div className="border border-border bg-muted p-2 text-center">
      <div className="font-bold text-primary">{label}</div>
      <div className="font-mono text-lg text-accent">{p.d} días</div>
      <div className="font-mono">{String(p.h).padStart(2, "0")}:{String(p.m).padStart(2, "0")}:{String(p.s).padStart(2, "0")}</div>
    </div>
  );
};

const RetroCountdown = () => (
  <div className="grid grid-cols-2 gap-2">
    <Counter label="🎄 Navidad (25 dic)" target={next(11, 25)} />
    <Counter label="🎆 Año Nuevo (1 ene)" target={next(0, 1)} />
  </div>
);
export default RetroCountdown;
