/* Shared canvas plotting for piecewise signals. Used by the chapter labs and the practice pages.
   A signal is a list of pieces [a, b, kind, p1, p2, p3], valid on a <= t < b and zero elsewhere:
     "lin": value p1*t + p2        "exp": value p1*exp(-p2*(t - p3)) */
(function () {
  "use strict";
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const fmt = (v) => { const r = Math.round(v * 1000) / 1000; return Object.is(r, -0) ? "0" : String(r); };
  const pieceValue = (p, t) => (p[2] === "lin" ? p[3] * t + p[4] : p[3] * Math.exp(-p[4] * (t - p[5])));
  const ev = (pcs, t) => { for (const p of pcs) if (t >= p[0] && t < p[1]) return pieceValue(p, t); return 0; };
  const bps = (pcs) => [...new Set(pcs.flatMap((p) => [p[0], p[1]]))].sort((x, y) => x - y);
  const jumps = (pcs) => { const e = 1e-7; return bps(pcs).map((b) => ({ t: b, w: ev(pcs, b + e) - ev(pcs, b - e) })).filter((j) => Math.abs(j.w) > 1e-6); };

  function axes(c, v) {
    const g = c.getContext("2d"), W = c.width, H = c.height, k = W / 1640, L = 70 * k + 20, Rm = 30 * k + 6, T = 24 * k + 6, B = 50 * k + 10;
    const fs = Math.max(20, 24 * k + 8);
    g.clearRect(0, 0, W, H);
    const X = (x) => L + ((x - v.x0) / (v.x1 - v.x0)) * (W - L - Rm), Y = (y) => H - B - ((y - v.y0) / (v.y1 - v.y0)) * (H - T - B);
    g.font = fs + "px system-ui,sans-serif"; g.lineWidth = 1;
    const step = (lo, hi) => { const raw = (hi - lo) / 8, p = Math.pow(10, Math.floor(Math.log10(raw))); return [1, 2, 5, 10].map((m) => m * p).find((s) => s >= raw); };
    const sx = v.sx || step(v.x0, v.x1), sy = v.sy || step(v.y0, v.y1);
    g.strokeStyle = css("--line"); g.fillStyle = css("--muted"); g.textAlign = "center";
    for (let x = Math.ceil(v.x0 / sx - 1e-9) * sx; x <= v.x1 + 1e-9; x += sx) { g.beginPath(); g.moveTo(X(x), T); g.lineTo(X(x), H - B); g.stroke(); g.fillText(fmt(x), X(x), H - B + fs + 4); }
    g.textAlign = "right";
    for (let y = Math.ceil(v.y0 / sy - 1e-9) * sy; y <= v.y1 + 1e-9; y += sy) { g.beginPath(); g.moveTo(L, Y(y)); g.lineTo(W - Rm, Y(y)); g.stroke(); g.fillText(fmt(y), L - 8, Y(y) + fs / 3); }
    g.strokeStyle = css("--muted"); g.lineWidth = 2;
    if (v.y0 <= 0 && v.y1 >= 0) { g.beginPath(); g.moveTo(L, Y(0)); g.lineTo(W - Rm, Y(0)); g.stroke(); }
    if (v.x0 <= 0 && v.x1 >= 0) { g.beginPath(); g.moveTo(X(0), T); g.lineTo(X(0), H - B); g.stroke(); }
    g.textAlign = "left"; g.fillText(v.xl || "t", W - Rm - fs * 0.6, H - B - 8);
    return { g, X, Y, W, H, L, Rm, T, B, fs };
  }

  function curve(P, v, f, color, opt = {}) {
    const { g, X, Y } = P, N = 1500, br = opt.breaks || [];
    g.strokeStyle = color; g.lineWidth = opt.w || 4; g.setLineDash(opt.dash || []); g.beginPath();
    let pen = false, px = null;
    for (let i = 0; i <= N; i++) {
      const x = v.x0 + ((v.x1 - v.x0) * i) / N, y = f(x);
      const cut = px !== null && br.some((b) => b > px - 1e-9 && b < x + 1e-9);
      if (!isFinite(y)) { pen = false; px = x; continue; }
      const yc = Math.max(v.y0 - (v.y1 - v.y0), Math.min(v.y1 + (v.y1 - v.y0), y));
      if (!pen || cut) { g.moveTo(X(x), Y(yc)); pen = true; } else g.lineTo(X(x), Y(yc));
      px = x;
    }
    g.stroke(); g.setLineDash([]);
  }

  function arrow(P, x, w, len, label) {
    const { g, X, Y, fs } = P, c = css("--probe"), y1 = Y(w > 0 ? len : -len), y0 = Y(0), d = w > 0 ? 1 : -1;
    g.strokeStyle = c; g.fillStyle = c; g.lineWidth = 4; g.beginPath(); g.moveTo(X(x), y0); g.lineTo(X(x), y1); g.stroke();
    g.beginPath(); g.moveTo(X(x), y1 - d * 2); g.lineTo(X(x) - 10, y1 + d * 16); g.lineTo(X(x) + 10, y1 + d * 16); g.closePath(); g.fill();
    g.font = "bold " + fs + "px system-ui,sans-serif"; g.textAlign = "left"; g.fillText(label, X(x) + 12, y1 + (w > 0 ? 4 : 14));
  }

  function yrange(f, x0, x1) {
    let lo = 0, hi = 0;
    for (let i = 0; i <= 600; i++) { const y = f(x0 + ((x1 - x0) * i) / 600); if (isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } }
    const pad = (hi - lo) * 0.15 || 1;
    return [lo < 0 ? lo - pad : -pad * 0.4, hi + pad];
  }

  /* value and breakpoints of a combination: terms [{ pcs, c, d }] means sum of c * x(t - d) */
  const evTerms = (terms, t) => terms.reduce((s, k) => s + (k.c ?? 1) * ev(k.pcs, t - (k.d || 0)), 0);
  const bpsTerms = (terms) => [...new Set(terms.flatMap((k) => bps(k.pcs).map((b) => b + (k.d || 0))))].sort((x, y) => x - y);
  function drawTerms(c, spec) {
    const f = (t) => evTerms(spec.terms, t), [y0, y1] = spec.y || yrange(f, spec.x0, spec.x1);
    const v = { x0: spec.x0, x1: spec.x1, y0, y1, sx: spec.sx || 1, sy: spec.sy }, P = axes(c, v);
    curve(P, v, f, css("--blue"), { breaks: bpsTerms(spec.terms) });
    if (spec.label) { P.g.fillStyle = css("--fg"); P.g.textAlign = "left"; P.g.fillText(spec.label, P.L + 10, P.T + P.fs); }
    return P;
  }

  /* spec: { pcs, a = 1, t0 = 0, x0, x1 } draws x(a(t - t0)); a spec with `terms` draws a combination. */
  function draw(c, spec) {
    if (spec.terms) return drawTerms(c, spec);
    const a = spec.a ?? 1, t0 = spec.t0 ?? 0, f = (t) => ev(spec.pcs, a * (t - t0));
    const [y0, y1] = spec.y || yrange((t) => ev(spec.pcs, t), Math.min(...bps(spec.pcs)) - 1, Math.max(...bps(spec.pcs)) + 1);
    const v = { x0: spec.x0, x1: spec.x1, y0, y1, sx: spec.sx || (spec.x1 - spec.x0 > 14 ? 2 : 1) }, P = axes(c, v);
    curve(P, v, f, css("--blue"), { breaks: bps(spec.pcs).map((b) => t0 + b / a) });
    return P;
  }

  /* Derivative of the untransformed signal: ordinary slopes plus impulse arrows. */
  function drawDerivative(c, spec) {
    const pcs = spec.pcs, h = 1e-5;
    const d = (t) => { for (const p of pcs) if (t > p[0] + h && t < p[1] - h) return (ev(pcs, t + h) - ev(pcs, t - h)) / (2 * h); return 0; };
    let [y0, y1] = yrange(d, spec.x0, spec.x1);
    const J = jumps(pcs);
    if (J.some((j) => j.w < 0)) y0 = Math.min(y0, -2.6);
    if (J.some((j) => j.w > 0)) y1 = Math.max(y1, 2.6);
    const v = { x0: spec.x0, x1: spec.x1, y0, y1, sx: 1 }, P = axes(c, v);
    curve(P, v, d, css("--blue"), { breaks: bps(pcs) });
    J.forEach((j) => arrow(P, j.t, j.w, 1.6, fmt(j.w)));
    return P;
  }

  window.PLOT = { css, fmt, ev, bps, jumps, evTerms, axes, curve, arrow, yrange, draw, drawDerivative };
})();
