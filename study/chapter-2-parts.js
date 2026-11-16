/* Chapter 2 building blocks: TeX helpers and one builder per exam-style question part.
   Every answer is computed from the signal definition; nothing is typed in by hand. */
(function () {
  "use strict";
  const { F, fadd, fsub, fval, ftex, ntex, mcq, plotOpt } = QUIZ;
  const R = String.raw;
  const M = (s) => "\\(" + s + "\\)";

  /* ---------- TeX helpers ---------- */
  const sh = (t0) => (t0 === 0 ? "t" : t0 > 0 ? "t-" + ntex(t0) : "t+" + ntex(-t0)); // t - t0
  const dl = (t0) => "\\delta(" + sh(t0) + ")";
  const us = (t0) => "u(" + sh(t0) + ")";
  const win = (a, b) => "[" + us(a) + "-" + us(b) + "]";
  /* signed sum: terms [{ c, tex }] with numeric c; a coefficient of magnitude 1 is not printed */
  function sumTex(terms, ctex) {
    let s = "";
    terms.forEach((t, i) => {
      const mag = Math.abs(t.c), m = ctex ? ctex(mag) : ntex(mag);
      s += (t.c < 0 ? "-" : i ? "+" : "") + (mag === 1 && t.tex ? "" : m) + (t.tex || "");
    });
    return s || "0";
  }
  function lin(m, c) {
    if (m === 0) return ntex(c);
    const mt = (Math.abs(m) === 1 ? "" : ntex(Math.abs(m))) + "t";
    if (c === 0) return (m < 0 ? "-" : "") + mt;
    if (m < 0 && c > 0) return ntex(c) + "-" + mt;
    return (m < 0 ? "-" : "") + mt + (c < 0 ? "-" : "+") + ntex(Math.abs(c));
  }
  const expTex = (A, k, ts) => (A === 1 ? "" : ntex(A)) + "e^{-" + (ts === 0 ? (k === 1 ? "" : k) + "t" : (k === 1 ? "" : k) + "(" + sh(ts) + ")") + "}";
  const pieceTex = (p) => (p[2] === "lin" ? lin(p[3], p[4]) : expTex(p[3], p[4], p[5]));
  /* parenthesise a sum before multiplying it by something */
  const wrap = (s) => (/[+\-]/.test(s.replace(/^-/, "").replace(/\^\{[^}]*\}/g, "")) ? "(" + s + ")" : s);
  const wrapSq = (s) => (/^(t|[0-9]+)$/.test(s) ? s : "(" + s + ")");
  const casesTex = (pcs) => R`\begin{cases}` + pcs.map((p) => pieceTex(p) + ",&" + ntex(p[0]) + R`\le t\lt ` + ntex(p[1])).join(R`\\`) + R`\\0,&\text{otherwise}\end{cases}`;
  const argTex = (a, t0) => (a === 1 ? sh(t0) : a === -1 ? "-(" + sh(t0) + ")" : ntex(a) + "(" + sh(t0) + ")");
  const xat = (a, t0) => "x_{" + ntex(a) + "," + ntex(t0) + "}";
  const setTex = (v) => R`\lbrace ` + v.map(ntex).join(",") + R`\rbrace `;

  /* ---------- exact quantities for linear pieces ---------- */
  const val = (p, t) => p[3] * t + p[4];
  const linEnergy = (p) => { const [a, b, , m, c] = p; return fadd(fadd(F(m * m * (b ** 3 - a ** 3), 3), F(m * c * (b * b - a * a))), F(c * c * (b - a))); };
  const linArea = (p) => { const [a, b, , m, c] = p; return fadd(F(m * (b * b - a * a), 2), F(c * (b - a))); };
  const bps = PLOT.bps;
  /* jumps of a signal made only of linear pieces, as exact numbers */
  function linJumps(pcs) {
    return bps(pcs).map((t) => {
      const l = pcs.find((p) => p[1] === t), r = pcs.find((p) => p[0] === t);
      const lv = l ? val(l, t) : 0, rv = r ? val(r, t) : 0;
      return { t, l: lv, r: rv, w: rv - lv };
    });
  }
  const viewOf = (pts) => [Math.floor(Math.min(...pts)) - 1, Math.ceil(Math.max(...pts)) + 1];

  /* ---------- part builders ---------- */
  function partEnergyLin(pcs, marks) {
    const es = pcs.map(linEnergy), E = es.reduce(fadd), I = pcs.map(linArea).reduce(fadd);
    const integrals = pcs.map((p) => R`\int_{${ntex(p[0])}}^{${ntex(p[1])}}${wrapSq(pieceTex(p))}^2dt`).join("+");
    const o = mcq(M(ftex(E)), [
      M(ftex(F(Math.abs(I.n), I.d))),
      es.length > 1 ? M(ftex(F(Math.abs(fsub(es[0], es[1]).n), fsub(es[0], es[1]).d))) : null,
      M(ftex(fadd(E, pcs.map((p) => F(p[1] - p[0])).reduce(fadd)))),
    ], (g) => M(ftex(fadd(E, F(g, 3)))));
    return { q: "Compute the energy of the signal.", marks, ...o,
      hints: [R`把非零的每一段分开，对 \(|x(t)|^2\) 积分：\(E_\infty=${integrals}\)。取负值的段平方后也是正的。`,
        R`各段的结果依次是 \(${es.map(ftex).join(",\\ ")}\)，再相加。`],
      sol: R`\(E_\infty=${integrals}=${es.map(ftex).join("+")}=${ftex(E)}\)。` };
  }

  function partSketch(pcs, marks) {
    const b = bps(pcs), m = Math.max(...b.map(Math.abs)) + 2, x0 = -m, x1 = m;
    const neg = pcs.map((p) => [p[0], p[1], "lin", -p[3], -p[4]]);
    const o = mcq(plotOpt(pcs, 1, 0, x0, x1), [plotOpt(pcs, -1, 0, x0, x1), plotOpt(pcs, 1, 1, x0, x1), pcs.every((p) => p[2] === "lin") ? plotOpt(neg, 1, 0, x0, x1) : null], (g) => plotOpt(pcs, 1, -g, x0, x1));
    const ends = pcs.map((p) => R`\(${ntex(p[0])}\le t\lt ${ntex(p[1])}\)：从 \(${ntex(PLOT.ev(pcs, p[0]))}\) 到 \(${ntex(Math.round(PLOT.ev(pcs, p[1] - 1e-9) * 1000) / 1000)}\)`).join("；");
    return { q: "Sketch the signal \\(x\\). 哪一张是对的？", marks, ...o,
      hints: ["先在横轴上标出断点，再算每一段两端的高度。", "每段两端的高度：" + ends + "。"],
      sol: "每段两端的高度：" + ends + "。信号在其余时间为 0，有跳变的地方不连线。" };
  }

  function partTransform(pcs, a, t0, marks) {
    const cand = [[a, -t0], [1 / a, t0], [-a, t0], [a, t0 * a], [1 / a, -t0], [a, t0 + 1], [a, t0 - 1]];
    const b = bps(pcs), all = [[a, t0], ...cand.slice(0, 4)].flatMap(([A, T]) => b.map((x) => T + x / A));
    const [x0, x1] = viewOf(all);
    const o = mcq(plotOpt(pcs, a, t0, x0, x1), cand.map(([A, T]) => plotOpt(pcs, A, T, x0, x1)), (g) => plotOpt(pcs, a, t0 + g + 1, x0, x1));
    const map = b.map((x) => ntex(x) + R`\to ` + ntex(t0 + x / a)).join(R`,\ `);
    const note = (a < 0 ? "\\(a\\lt 0\\)，左右翻转；" : "") + (Math.abs(a) > 1 ? "\\(|a|\\gt 1\\)，变窄；" : Math.abs(a) < 1 ? "\\(|a|\\lt 1\\)，变宽；" : "") + "高度不变。";
    return { q: R`Sketch the signal \(${xat(a, t0)}\) defined by \(${xat(a, t0)}(t)=x\big(${argTex(a, t0)}\big)\). 哪一张是对的？`, marks, ...o,
      hints: [R`这里 \(a=${ntex(a)},\ t_0=${ntex(t0)}\)。原信号上位于 \(\tau\) 的点搬到 \(t=t_0+\tau/a\)。`, R`断点逐个搬：\(${map}\)。`],
      sol: R`\(t=t_0+\tau/a\)：\(${map}\)。` + note };
  }

  /* impulses of the derivative, for signals whose jumps are given as [{ t, w }] with numeric w */
  function partImpulses(J, slopesTex, marks, extra) {
    const real = J.filter((j) => j.w !== 0), cont = J.filter((j) => j.w === 0);
    const tex = (list) => M(sumTex(list.map((j) => ({ c: j.w, tex: dl(j.t) }))));
    const flipLast = real.map((j, i) => (i === real.length - 1 ? { ...j, w: -j.w } : j));
    const flipAll = real.map((j) => ({ ...j, w: -j.w }));
    const dropFirst = real.slice(1);
    const spurious = cont.length ? [...real, { t: cont[0].t, w: cont[0].dslope || 1 }].sort((x, y) => x.t - y.t) : real.map((j, i) => (i === 0 ? { ...j, w: -j.w } : j));
    const o = mcq(tex(real), [tex(flipLast), tex(spurious), dropFirst.length ? tex(dropFirst) : null, tex(flipAll)], (g) => tex(real.map((j, i) => (i === g % real.length ? { ...j, w: j.w + 1 } : j))));
    const list = J.map((j) => R`\(t=${ntex(j.t)}\)：\(${ntex(j.l)}\to ${ntex(j.r)}\)，跳变 \(${ntex(j.w)}\)`).join("；");
    return { q: R`Find the derivative of the signal \(x\). 导数 = 段内斜率 + impulse，其中 impulse 部分是哪一个？`, marks, ...o,
      hints: ["每个断点算跳变量 = 右边的值 − 左边的值，信号外面是 0。值没有跳的断点不产生 impulse。", "各断点：" + list + "。"],
      sol: "各断点：" + list + R`。所以 \(\dot x(t)=${sumTex(real.map((j) => ({ c: j.w, tex: dl(j.t) })))}${slopesTex}\)。` + (extra || "") };
  }
  function partDerivativeLin(pcs, marks, extra) {
    const J = linJumps(pcs);
    J.forEach((j) => { const l = pcs.find((p) => p[1] === j.t), r = pcs.find((p) => p[0] === j.t); j.dslope = (r ? r[3] : 0) - (l ? l[3] : 0); });
    const sl = pcs.filter((p) => p[3] !== 0).map((p) => ({ c: p[3], tex: win(p[0], p[1]) }));
    return partImpulses(J, sl.length ? (sl[0].c < 0 ? "" : "+") + sumTex(sl) : "", marks, extra);
  }

  function partStepWindows(pcs, marks) {
    const term = (p, w) => (pieceTex(p) === "1" ? "" : wrap(pieceTex(p)) + R`\,`) + w;
    const good = pcs.map((p) => term(p, win(p[0], p[1]))).join("+");
    const plus = pcs.map((p) => term(p, "[" + us(p[0]) + "+" + us(p[1]) + "]")).join("+");
    const never = pcs.map((p) => term(p, us(p[0]))).join("+");
    const rev = pcs.map((p) => term(p, win(p[1], p[0]))).join("+");
    const o = mcq(M("x(t)=" + good), [M("x(t)=" + never), M("x(t)=" + rev), M("x(t)=" + plus)]);
    return { q: "Write the signal \\(x\\) using unit step signals.", marks, ...o,
      hints: [R`\(u(t-a)-u(t-b)\) 是一个只在 \(a\le t\lt b\) 上为 1 的窗口。`, "每一段的表达式乘上它自己的窗口，再相加。代一个段内的点和一个段外的点检查。"],
      sol: R`每段乘窗口再相加：\(x(t)=${good}\)。只写 \(u(t-a)\) 不减 \(u(t-b)\) 的话，这一段永远关不掉。` };
  }
  /* staircase signals: one step per jump */
  function partStepJumps(pcs, marks) {
    const J = linJumps(pcs).filter((j) => j.w !== 0);
    const tex = (list) => M("x(t)=" + sumTex(list.map((j) => ({ c: j.w, tex: us(j.t) }))));
    const levels = pcs.map((p) => ({ t: p[0], w: p[4] })).filter((j) => j.w !== 0);
    const o = mcq(tex(J), [tex(levels), tex(J.map((j) => ({ ...j, w: -j.w }))), tex(J.slice(0, -1))], (g) => tex(J.map((j, i) => (i === g % J.length ? { ...j, w: j.w + 1 } : j))));
    return { q: "Write the signal \\(x\\) using unit step signals.", marks, ...o,
      hints: ["每个 step 负责一次跳变：系数是跳变量，不是那一段的高度。", "跳变量依次是 " + J.map((j) => R`\(t=${ntex(j.t)}\)：\(${ntex(j.w)}\)`).join("，") + "。"],
      sol: R`每次跳变一个 step，系数 = 右值 − 左值：\(x(t)=${sumTex(J.map((j) => ({ c: j.w, tex: us(j.t) })))}\)。` };
  }

  /* ---------- ramp-then-exponential family (Jan 2026 type): t on [0,T), A e^{-k(t-T)} on [T,T2) ---------- */
  const expLinPcs = (T, T2, A, k) => [[0, T, "lin", 1, 0], [T, T2, "exp", A, k, T]];
  function partEnergyExpLin(T, T2, A, k, marks) {
    const L = T2 - T, tex = (base, coef, ex) => ftex(base) + "+" + (coef.n === 1 && coef.d === 1 ? "" : ftex(coef)) + R`\left(1-e^{-${ex}}\right)`;
    const o = mcq(M(tex(F(T ** 3, 3), F(A * A, 2 * k), 2 * k * L)), [
      M(tex(F(T ** 3, 3), F(A * A, k), k * L)), M(tex(F(T ** 3, 3), F(A * A, 2 * k), k * L)), M(tex(F(T * T, 2), F(A * A, 2 * k), 2 * k * L)), M(tex(F(T ** 3, 3), F(A * A, k), 2 * k * L)),
    ]);
    return { q: "Compute the energy of the signal.", marks, ...o,
      hints: [R`分两段：\(\int_0^{${T}}t^2dt+\int_{${T}}^{${T2}}\big|${expTex(A, k, T)}\big|^2dt\)。`, R`\(\big|${expTex(A, k, T)}\big|^2=${A * A}e^{-${2 * k}(${sh(T)})}\)：系数平方，指数乘 2。`],
      sol: R`\(\int_0^{${T}}t^2dt=${ftex(F(T ** 3, 3))}\)；\(\int_{${T}}^{${T2}}${A * A}e^{-${2 * k}(${sh(T)})}dt=${ftex(F(A * A, 2 * k))}\left(1-e^{-${2 * k * L}}\right)\)。相加：\(E_\infty=${tex(F(T ** 3, 3), F(A * A, 2 * k), 2 * k * L)}\approx ${(T ** 3 / 3 + (A * A) / (2 * k) * (1 - Math.exp(-2 * k * L))).toFixed(3)}\)。` };
  }
  function partImpulseExpLin(T, T2, A, k, marks) {
    const L = T2 - T, w = (sign, ex) => sign + (A === 1 ? "" : A) + (ex ? "e^{-" + ex + "}" : A === 1 ? "1" : "");
    const opt = (wt, t) => R`系数 \(${wt}\)，位置 \(t=${t}\)`;
    const o = mcq(opt(w("-", k * L), T2), [opt(w("", k * L), T2), opt(w("-", 0), T2), k * T2 !== k * L ? opt(w("-", k * T2), T2) : null, opt(w("-", k * L), T), opt(w("", 0), T)]);
    return { q: "The derivative of the signal \\(x\\) contains an impulse signal. Find its magnitude and time shift.", marks, ...o,
      hints: [R`逐个断点看信号有没有跳：\(t=0\)、\(t=${T}\)、\(t=${T2}\)。`, R`\(t=0\)：\(0\to 0\)。\(t=${T}\)：\(${T}\to ${A}\)。\(t=${T2}\)：\(${expTex(A, k, T)}\) 在 \(t=${T2}\) 的值 \(\to 0\)。`],
      sol: R`信号在 \(t=0\) 和 \(t=${T}\) 处连续，只在 \(t=${T2}\) 处从 \(${w("", k * L)}\) 跳到 0。跳变量 = 右值 − 左值 \(=${w("-", k * L)}\approx ${(-A * Math.exp(-k * L)).toFixed(4)}\)，所以 impulse 是 \(${w("-", k * L)}\,${dl(T2)}\)。` };
  }

  window.CH2 = { M, sh, dl, us, win, sumTex, lin, expTex, pieceTex, casesTex, argTex, xat, setTex, val, linEnergy, linJumps, viewOf,
    partEnergyLin, partSketch, partTransform, partImpulses, partDerivativeLin, partStepWindows, partStepJumps, expLinPcs, partEnergyExpLin, partImpulseExpLin };
})();
