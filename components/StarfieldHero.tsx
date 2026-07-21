"use client";

import { useEffect, useRef } from "react";

/**
 * Nền động cho hero: bầu trời sao ánh vàng lấp lánh + sao băng vụt qua
 * + mạng lưới điểm nối trôi chậm. Tự vẽ bằng canvas (không dùng ảnh ngoài),
 * tự tắt hoạt ảnh khi máy bật "giảm chuyển động".
 */
export function StarfieldHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const canvas = c;
    const g = ctx;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GOLD = "244,228,182";
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    let w = 0,
      h = 0,
      raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    type S = { x: number; y: number; r: number; base: number; amp: number; sp: number; ph: number; big: boolean };
    type M = { x: number; y: number; vx: number; vy: number; len: number; life: number };
    let pts: P[] = [];
    let stars: S[] = [];
    let meteors: M[] = [];
    let nextMeteor = 1200;

    function size() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(16, Math.round(Math.min(44, w / 34)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: rnd(-0.13, 0.13),
        vy: rnd(-0.13, 0.13),
        r: rnd(0.7, 1.9),
      }));
      const sn = Math.round(Math.min(520, (w * h) / 2800));
      stars = Array.from({ length: sn }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rnd(0.4, 1.8),
        base: rnd(0.22, 0.62),
        amp: rnd(0.42, 0.66),
        sp: rnd(1.3, 3.8),
        ph: rnd(0, 6.28),
        big: Math.random() < 0.14,
      }));
    }

    function makeMeteor(): M {
      const left = Math.random() < 0.5;
      const dir = left ? 1 : -1;
      return {
        x: left ? rnd(-0.05 * w, 0.25 * w) : rnd(0.75 * w, 1.05 * w),
        y: rnd(0, h * 0.45),
        vx: dir * rnd(7, 11),
        vy: rnd(2.4, 4.2),
        len: rnd(110, 200),
        life: 1,
      };
    }

    function draw(t: number) {
      g.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            g.strokeStyle = "rgba(" + GOLD + "," + (0.08 * (1 - d / 150)).toFixed(3) + ")";
            g.lineWidth = 1;
            g.beginPath();
            g.moveTo(a.x, a.y);
            g.lineTo(b.x, b.y);
            g.stroke();
          }
        }
      g.shadowBlur = 0;
      for (const p of pts) {
        g.fillStyle = "rgba(" + GOLD + ",0.4)";
        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, 6.2832);
        g.fill();
      }
      for (const s of stars) {
        const a = Math.max(0, Math.min(1, s.base + s.amp * Math.sin(t * 0.001 * s.sp + s.ph)));
        if (s.big) {
          g.shadowColor = "rgba(" + GOLD + "," + a.toFixed(3) + ")";
          g.shadowBlur = 10;
        } else g.shadowBlur = 0;
        g.fillStyle = "rgba(" + GOLD + "," + a.toFixed(3) + ")";
        g.beginPath();
        g.arc(s.x, s.y, s.r, 0, 6.2832);
        g.fill();
      }
      g.shadowBlur = 0;
      for (const m of meteors) {
        const sp = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / sp) * m.len;
        const ty = m.y - (m.vy / sp) * m.len;
        const a = Math.max(0, Math.min(1, m.life * 1.3));
        const grad = g.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, "rgba(255,246,220," + a.toFixed(3) + ")");
        grad.addColorStop(1, "rgba(" + GOLD + ",0)");
        g.strokeStyle = grad;
        g.lineWidth = 2;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(m.x, m.y);
        g.lineTo(tx, ty);
        g.stroke();
        g.shadowColor = "rgba(" + GOLD + "," + a.toFixed(3) + ")";
        g.shadowBlur = 12;
        g.fillStyle = "rgba(255,250,230," + a.toFixed(3) + ")";
        g.beginPath();
        g.arc(m.x, m.y, 1.8, 0, 6.2832);
        g.fill();
        g.shadowBlur = 0;
      }
    }

    function step(t: number) {
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      if (t > nextMeteor) {
        meteors.push(makeMeteor());
        nextMeteor = t + rnd(1800, 4400);
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.014;
        if (m.life <= 0 || m.x < -80 || m.x > w + 80 || m.y > h + 80) meteors.splice(i, 1);
      }
      draw(t);
      raf = requestAnimationFrame(step);
    }

    function start() {
      cancelAnimationFrame(raf);
      size();
      if (reduce) draw(0);
      else raf = requestAnimationFrame(step);
    }

    let tm: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(tm);
      tm = setTimeout(start, 150);
    };
    window.addEventListener("resize", onResize);
    start();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tm);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        WebkitMaskImage: "linear-gradient(180deg,#000 52%,transparent 100%)",
        maskImage: "linear-gradient(180deg,#000 52%,transparent 100%)",
      }}
    />
  );
}
