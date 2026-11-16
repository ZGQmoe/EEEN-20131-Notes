/* Chapter 6 question bank, part 1: lecture-note Problems (6.6.x), exam questions, mock papers.
   Convolutions with impulses and steps are computed from the signal definitions and offered as plots. */
(function () {
  "use strict";
  const { mcq, ntex, F, ftex, plotTerms } = QUIZ;
  const { M, sh, dl, us, sumTex, casesTex } = TEX, R = String.raw;
  const { EXAM, CHK, AI, OFF, LEC, OWN, fresh, part, T } = BANKLIB;
  const BIG = 99;

  /* ---------- h made of shifted impulses: [{ c, d }] means sum of c * delta(t - d) ---------- */
  const hTex = (h) => sumTex(h.map((k) => ({ c: k.c, tex: dl(k.d) })));
  const yTex = (h) => sumTex(h.map((k) => ({ c: k.c, tex: "x(" + sh(k.d) + ")" })));
  function partImpulseConv(x, h, marks, extra) {
    const b = PLOT.bps(x), ds = h.map((k) => k.d), lo = Math.floor(Math.min(...b) + Math.min(...ds, ...ds.map((d) => -d))) - 1, hi = Math.ceil(Math.max(...b) + Math.max(...ds, ...ds.map((d) => -d))) + 1;
    const peak = Math.max(...h.map((k) => Math.abs(k.c))) * Math.max(...b.map((t) => Math.abs(PLOT.ev(x, t - 1e-6))), ...b.map((t) => Math.abs(PLOT.ev(x, t + 1e-6)))) * 1.25 + 0.4;
    const out = (list) => plotTerms(list.map((k) => ({ pcs: x, c: k.c, d: k.d })), lo, hi, [-peak, peak]);
    const swap = h.map((k, i) => ({ c: h[(i + 1) % h.length].c, d: k.d }));
    const o = mcq(out(h), [out(h.map((k) => ({ c: k.c, d: -k.d }))), out(swap), out(h.map((k, i) => (i === h.length - 1 ? { c: -k.c, d: k.d } : k))), out(h.slice(0, 1)), out(h.map((k) => ({ c: 1, d: k.d })))], (g) => out(h.map((k) => ({ c: k.c, d: k.d + g }))));
    return { q: "Use the convolution between the signals \\(x\\) and \\(h\\) to find the output of the system. 哪一张是 \\(y=x\\ast h\\)？", marks, ...o,
      hints: [R`\(x\ast\delta(t-t_0)=x(t-t_0)\)：和一个平移的 impulse 卷积，就是把 \(x\) 平移过去。再用分配律逐项处理。`, R`\(y(t)=${yTex(h)}\)。注意 \(\delta(t+a)\) 给出的是 \(x(t+a)\)，向左移。`],
      sol: R`\(y=x\ast h=${yTex(h)}\)。每个 impulse 把 \(x\) 复制到它所在的位置，系数照乘。` + (extra || "") };
  }
  function partsCausalStableImp(h, m1, m2) {
    const early = h.filter((k) => k.d < 0), sum = h.reduce((s, k) => s + Math.abs(k.c), 0);
    return [
      { ...(early.length
        ? part("Determine whether the system \\(S\\) is causal.", R`不是。\(h(t)\) 在 \(t=${early[0].d}\) 处有 impulse，\(t\lt 0\) 时不恒为零`, ["是。impulse 只在个别时刻非零", "是。因为输入 \\(x\\) 从有限的时刻才开始", "不是。因为系统有 memory"], ["LTI 系统 causal 的条件：\\(h(t)=0\\) for all \\(t\\lt 0\\)。"], R`\(${dl(early[0].d)}\) 位于负的时刻，\(h\) 在 \(t\lt 0\) 上不恒为零，所以不是 causal。它让输出里出现 \(x(${sh(early[0].d)})\)，用到了未来的输入。`)
        : part("Determine whether the system \\(S\\) is causal.", R`是。\(h(t)=0\) for all \(t\lt 0\)`, ["不是。因为系统有 memory", "不是。因为 impulse 不是普通函数", "是。因为输入是有限长的"], ["LTI 系统 causal 的条件：\\(h(t)=0\\) for all \\(t\\lt 0\\)。"], "所有 impulse 都在 \\(t\\ge 0\\)，输出只用到当前和过去的输入。")), marks: m1 },
      { ...part("Determine whether the system \\(S\\) is stable.", R`是。\(\int_{-\infty}^{\infty}|h(t)|dt=${sum}\)，有限`, [R`不是。impulse 的高度是无穷大，所以 \(\int|h|\) 发散`, "不是。因为系统不是 causal", R`是。因为 \(h(t)\to 0\)（\(t\to\infty\)）`], ["LTI 系统 stable 的条件：\\(h\\) absolutely integrable，\\(\\int|h(t)|dt\\lt\\infty\\)。", "每个 impulse 的面积是它的系数。"], R`impulse 的面积是有限的：\(\int|h|=${h.map((k) => Math.abs(k.c)).join("+")}=${sum}\)。输出只是输入的几份平移之和，有限能量进、有限能量出。causal 与否和 stable 无关。`), marks: m2 },
    ];
  }
  const TRI1 = [[-1, 0, "lin", 1, 1], [0, 1, "lin", -1, 1]];
  const IMP = [ // [x, h] pools for impulse convolutions
    { x: [[-1, 1, "lin", 1, 0]], h: [{ c: 1, d: -3 }, { c: 1, d: 3 }] },
    { x: [[0, 1, "lin", 1, 1], [1, 2, "lin", -1, 2]], h: [{ c: 1, d: -2 }, { c: 2, d: -1 }] },
    { x: TRI1, h: [{ c: 2, d: -2 }, { c: -1, d: 2 }] },
    { x: [[0, 2, "lin", 0, 1]], h: [{ c: 1, d: 0 }, { c: -1, d: 3 }] },
    { x: [[0, 1, "lin", 2, 0]], h: [{ c: 2, d: 1 }, { c: 1, d: 3 }] },
    { x: TRI1, h: [{ c: 1, d: -1 }, { c: -2, d: 2 }] },
  ];
  const impStem = (v) => R`Let us consider the linear time-invariant (LTI) system \(S\) whose impulse response is given by \[h(t)=${hTex(v.h)}\quad\text{for all }t\in\mathbb{R},\] with input \(x\) given by \[x(t)=${casesTex(v.x)}\]`;

  /* ---------- rectangle convolved with a delayed step (Jan 2024) ---------- */
  function partStepConv(a, b, A, d, marks) {
    const s = a + d, e = b + d, top = A * (b - a), lo = Math.min(a, 0) - 1, hi = e + 3, yr = [-0.3 * top - 0.2, top * 1.5 + 0.3];
    const P = (pcs) => plotTerms([{ pcs }], lo, hi, yr);
    const good = [[s, e, "lin", A, -A * s], [e, BIG, "lin", 0, top]];
    const o = mcq(P(good), [P([[a, b, "lin", A, -A * a], [b, BIG, "lin", 0, top]]), P([[s, e, "lin", 0, A]]), P([[s, e, "lin", A, -A * s], [e, e + (b - a), "lin", -A, A * (e + b - a)]]), P([[s, e, "lin", A, -A * s]])]);
    return { q: "Use the convolution between the signal \\(x\\) and \\(h\\) to find the output of the system. 哪一张是 \\(y\\)？", marks, ...o,
      hints: [R`\(y(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau\)。\(x(\tau)\) 只在 \(${a}\le\tau\lt ${b}\) 上非零，\(h(t-\tau)=u(t-\tau-${d})\) 只在 \(\tau\le t-${d}\) 时为 1。`, R`分三种情况看重叠：\(t-${d}\lt ${a}\)；\(${a}\le t-${d}\lt ${b}\)；\(t-${d}\ge ${b}\)。`],
      sol: R`重叠区间是 \(${a}\le\tau\le\min(t-${d},${b})\)。\(t\lt ${s}\)：没有重叠，\(y=0\)。\(${s}\le t\lt ${e}\)：\(y=${A === 1 ? "" : A}(${sh(s)})\)。\(t\ge ${e}\)：整个脉冲都在积分范围里，\(y=${top}\)，之后一直保持。和 step 卷积相当于对输入做积分并延迟 \(${d}\)，所以输出不会回到 0。` };
  }

  /* ---------- h(t) = u(t) + c delta(t + d) with x(t) = t on [0,1) (Jan 2025) ---------- */
  const RAMP = [[0, 1, "lin", 1, 0]], INT = [[0, 1, "quad", 0.5, 0, 0], [1, BIG, "lin", 0, 0.5]];
  function partStepPlusImpulse(c, d, marks) {
    const lo = Math.min(-d, 0) - 1.5, hi = Math.max(-d, 0) + 3.5, yr = [-0.4, Math.abs(c) + 0.9];
    const P = (terms) => plotTerms(terms, lo, hi, yr), imp = (dd) => ({ pcs: RAMP, c, d: dd });
    const o = mcq(P([{ pcs: INT }, imp(-d)]), [P([{ pcs: INT }]), P([{ pcs: INT }, imp(d)]), P([{ pcs: [[0, 1, "quad", 0.5, 0, 0]] }, imp(-d)]), P([imp(-d)]), P([{ pcs: [[0, 1, "lin", 1, 0], [1, BIG, "lin", 0, 1]] }, imp(-d)])]);
    const sgn = d > 0 ? "+" : "-", ad = Math.abs(d);
    return { q: "Use the convolution between the signals \\(x\\) and \\(h\\) to find the output of the system. 哪一张是 \\(y\\)？", marks, ...o,
      hints: [R`分配律：\(y=x\ast u+${c === 1 ? "" : c}\,x\ast\delta(t${sgn}${ad})\)。两项分开算。`, R`\(x\ast u\) 是 \(x\) 的积分 \(\int_{-\infty}^{t}x(\tau)d\tau\)；\(x\ast\delta(t${sgn}${ad})=x(t${sgn}${ad})\)。`],
      sol: R`\(y_1=x\ast u\)：\(t\lt 0\) 为 0；\(0\le t\lt 1\) 为 \(\int_0^t\tau\,d\tau=\tfrac{t^2}{2}\)；\(t\ge 1\) 保持 \(\tfrac12\)。\(y_2=${c === 1 ? "" : c}x(t${sgn}${ad})\)：把 \(x\) ${d > 0 ? "左" : "右"}移 \(${ad}\)。\(y=y_1+y_2\)。积分那一项在输入结束后停在 \(\tfrac12\)，不会回到 0。` };
  }

  /* ---------- impulse responses with known causality / stability ---------- */
  const HS = [
    { tex: R`h(t)=e^{t}u(-t)`, c: 0, s: 1, why: R`\(t\lt 0\) 时 \(h(t)=e^{t}\ne 0\)，不是 causal。\(\int_{-\infty}^{0}e^{t}dt=1\)，absolutely integrable，stable。` },
    { tex: R`h(t)=e^{t}u(t)`, c: 1, s: 0, why: R`\(t\lt 0\) 时为 0，causal。\(t\to+\infty\) 时指数增长，\(\int|h|\) 发散，不 stable。` },
    { tex: R`h(t)=e^{-3t}u(-t)`, c: 0, s: 0, why: R`\(t\lt 0\) 时非零，不是 causal。\(t\to-\infty\) 时 \(e^{-3t}\) 指数增长，不 stable。指数上的负号在负时间轴上是增长。` },
    { tex: R`h(t)=e^{-2t}\cos(2t)u(t)`, c: 1, s: 1, why: R`causal。\(\int|h|\le\int_0^\infty e^{-2t}dt=\tfrac12\)，stable。` },
    { tex: R`h(t)=e^{2t}\cos(2t)u(t)`, c: 1, s: 0, why: "causal。振荡在增长，绝对面积发散，不 stable。振荡不会抵消增长。" },
    { tex: R`h(t)=e^{-|t|}`, c: 0, s: 1, why: R`\(t\lt 0\) 时非零，不是 causal。\(\int|h|=2\int_0^\infty e^{-t}dt=2\)，stable。` },
    { tex: R`h(t)=e^{-t}u(t-2)`, c: 1, s: 1, why: R`\(t\lt 2\) 时为 0，当然 \(t\lt 0\) 时也为 0，causal。延迟启动不影响 causal。\(\int_2^\infty e^{-t}dt=e^{-2}\)，stable。` },
    { tex: R`h(t)=e^{-6t}u(3-t)`, c: 0, s: 0, why: R`在 \(t\le 3\) 上非零，包括所有负时刻，不是 causal。\(t\to-\infty\) 时 \(e^{-6t}\) 增长，不 stable。` },
    { tex: R`h(t)=te^{-t}u(t)`, c: 1, s: 1, why: R`causal。\(\int_0^\infty te^{-t}dt=1\)，stable。` },
    { tex: R`h(t)=\begin{cases}e^{2t},&t\lt 0\\e^{-3t},&t\ge 0\end{cases}`, c: 0, s: 1, why: R`\(t\lt 0\) 时 \(h=e^{2t}\ne 0\)，不是 causal。\(\int|h|=\int_{-\infty}^{0}e^{2t}dt+\int_0^\infty e^{-3t}dt=\tfrac12+\tfrac13=\tfrac56\)，stable。` },
  ];
  const CS = ["causal，stable", "causal，不 stable", "不 causal，stable", "不 causal，不 stable"];
  const csIndex = (v) => (v.c ? 0 : 2) + (v.s ? 0 : 1);
  const hParts = (v, m1, m2) => [
    { ...part("Is the system causal? Justify your answer.", v.c ? R`是。\(h(t)=0\) for all \(t\lt 0\)` : R`不是。\(t\lt 0\) 时 \(h(t)\ne 0\)`, v.c ? [R`不是。\(h\) 在 \(t=0\) 之后才非零`, "不是。因为 \\(h\\) 是指数函数", "是。因为 \\(h\\) 是有界的"] : [R`是。\(h(t)\to 0\)（\(t\to-\infty\)）`, "是。因为指数函数处处连续", "不是。因为 \\(h\\) 不是有限长的"], ["LTI 系统 causal 的条件：\\(h(t)=0\\) for all \\(t\\lt 0\\)。"], v.why), marks: m1 },
    { ...part("Is the system stable? Justify your answer.", v.s ? R`是。\(\int_{-\infty}^{\infty}|h(t)|dt\) 有限` : R`不是。\(\int_{-\infty}^{\infty}|h(t)|dt\) 发散`, v.s ? ["不是。stable 的系统必须是有限长的 \\(h\\)，这个不是", "不是。因为 \\(h\\) 在某些时刻取负值或不为零", R`是。因为 \(h(0)\) 是有限值`] : ["是。因为 \\(h\\) 在每个时刻都是有限值", "是。因为指数里有负号", "不是。因为系统有 memory"], ["LTI 系统 stable 的条件：\\(h\\) absolutely integrable。", "看 \\(h\\) 非零的那一侧：\\(|h|\\) 是衰减还是增长？"], v.why), marks: m2 },
  ];

  /* ---------- lecture-note Problems ---------- */
  const SIFT = [[R`\cos(t)`, "-\\infty", "\\infty", 0, 1, "impulse 在 \\(t=0\\)，在积分范围内：\\(\\cos 0=1\\)。"], [R`\sin(2\pi t)`, "0", "5", -3, 0, "impulse 在 \\(t=-3\\)，在 \\([0,5]\\) 之外，积分为 0。"], [R`\sin(2\pi t)`, "0", "5", 3, 0, "impulse 在 \\(t=3\\)，在范围内：\\(\\sin 6\\pi=0\\)。结果也是 0，但原因和上一个不同。"], ["t^2", "0", "5", 2, 4, "impulse 在 \\(t=2\\)，在范围内：\\(2^2=4\\)。"], ["(t^2+1)", "0", "5", -1, 0, "impulse 在 \\(t=-1\\)，在 \\([0,5]\\) 之外，积分为 0。"], ["2t", "-2", "2", 1, 2, "impulse 在 \\(t=1\\)，在范围内：\\(2\\cdot1=2\\)。"], ["(t+3)", "1", "4", 5, 0, "impulse 在 \\(t=5\\)，在 \\([1,4]\\) 之外，积分为 0。"]];
  const basics = [
    T("b661", "Problem 6.6.1 · 带 impulse 的积分", SIFT, ([f, lo, hi, t0, val, why], first) => ({ q: R`Evaluate \(\displaystyle\int_{${lo}}^{${hi}}${f}\,${dl(t0)}\,dt\).`, good: M(String(val)), bad: [M(val === 0 ? "1" : "0"), M("\\infty"), M(String(val === 0 ? -1 : val + 1)), M(String(t0 || 2))], hints: [R`sifting property：\(\int_a^b f(t)\delta(t-t_0)dt=f(t_0)\)，前提是 \(a\lt t_0\lt b\)。`, R`这里 impulse 在 \(t=${t0}\)。它在积分范围里吗？`], sol: why, note: first ? "" : "讲义原题有三个积分，这里一次出一个。" }), [LEC, OFF]),
    T("b662", "Problem 6.6.2 · 和平移的 impulse 卷积", [IMP[1], IMP[4], IMP[5]], (v, first) => ({ stem: R`Determine and sketch the convolution of \[x(t)=${casesTex(v.x)}\] and \(h(t)=${hTex(v.h)}\).`, note: first ? "" : fresh, parts: [partImpulseConv(v.x, v.h)] }), [LEC, OFF]),
    T("b663", "Problem 6.6.3 · 翻转并平移后的 \\(h(t-\\tau)\\)", [[4, 5], [1, 3], [2, 6], [0, 2]], ([p, q], first) => { const o = (A, B) => R`\(A=${A},\ B=${B}\)`, tm = (v) => (v === 0 ? "t" : "t-" + v); return { stem: R`Let \(h(t)=e^{2t}u(-t+${p})+e^{-2t}u(t-${q})\). 对任意给定的 \(t\)，\(h(t-\tau)\) 作为 \(\tau\) 的函数：\(\tau\lt A\) 时为 \(e^{-2(t-\tau)}\)，\(A\le\tau\lt B\) 时为 0，\(\tau\gt B\) 时为 \(e^{2(t-\tau)}\)。`, note: first ? "" : fresh, parts: [part("\\(A\\) 和 \\(B\\) 是：", o(tm(q), tm(p)), [o(tm(p), tm(q)), o("t+" + q, "t+" + p), o(q, p)], [R`把 \(h\) 里的 \(t\) 全部换成 \(t-\tau\)，再看两个 step 各在什么条件下为 1。`, R`\(u(-(t-\tau)+${p})=1\iff\tau\ge t-${p}\)；\(u(t-\tau-${q})=1\iff\tau\le t-${q}\)。`], R`\(e^{-2(t-\tau)}\) 那一支在 \(\tau\le t-${q}\) 时非零，\(e^{2(t-\tau)}\) 那一支在 \(\tau\ge t-${p}\) 时非零，中间为 0。所以 \(A=${tm(q)}\)，\(B=${tm(p)}\)。翻转之后，原来在右边的那一支跑到了左边。`)] }; }, [LEC, OFF]),
    T("b664", "Problem 6.6.4 · 两个矩形脉冲的卷积", [0.5, 0.25, 0.75, 1], (al, first) => { const P = (pcs) => plotTerms([{ pcs }], -0.5, 2.5, [-0.2, 1.3]); const trap = (a, hgt) => [[0, a, "lin", hgt / a, 0], ...(a < 1 ? [[a, 1, "lin", 0, hgt]] : []), [1, 1 + a, "lin", -hgt / a, (hgt * (1 + a)) / a]];
      const o = mcq(P(trap(al, al)), [P(trap(al, 1)), P([[0, 1 + al, "lin", 0, al]]), P(trap(al === 1 ? 0.5 : 1, al === 1 ? 0.5 : 1)), P([[0, (1 + al) / 2, "lin", (2 * al) / (1 + al), 0], [(1 + al) / 2, 1 + al, "lin", (-2 * al) / (1 + al), 2 * al]])]);
      return { stem: R`\(x(t)=1\) for \(0\le t\lt 1\) and \(0\) otherwise; \(h(t)=x(t/\alpha)\) with \(\alpha=${ntex(al)}\).`, note: first ? "讲义原题的 \\(\\alpha\\) 是一般的 \\(0\\lt\\alpha\\le 1\\)，这里取具体值。" : fresh, parts: [
        { q: "哪一张是 \\(y=x\\ast h\\)？", ...o, hints: [R`\(h\) 是宽 \(${ntex(al)}\)、高 1 的矩形。\(y(t)\) 等于两个矩形在时刻 \(t\) 的重叠长度。`, R`重叠长度先从 0 增加到 \(${ntex(al)}\)，${al < 1 ? "保持一段，" : ""}再减回 0。总宽度是两个宽度之和。`], sol: R`\(y(t)=t\)（\(0\le t\lt ${ntex(al)}\)）` + (al < 1 ? R`，\(${ntex(al)}\)（\(${ntex(al)}\le t\lt 1\)）` : "") + R`，\(${ntex(1 + al)}-t\)（\(1\le t\lt ${ntex(1 + al)}\)），其余为 0。高度是较窄那个矩形的宽度，不是 1。` },
        part(R`If \(\frac{dy}{dt}\) contains only three discontinuities, what is the value of \(\alpha\)?`, M("1"), [M("\\tfrac12"), M("\\tfrac13"), M("2")], ["一般情况下 \\(y\\) 是梯形，斜率在四个地方跳变。", "什么时候梯形的平顶消失？"], R`梯形的斜率在 \(0,\ \alpha,\ 1,\ 1+\alpha\) 四处跳变。\(\alpha=1\) 时平顶消失，变成三角形，只剩三处。`)] }; }, [LEC, OFF]),
    T("b665", "Problem 6.6.5 · 卷积和求导", [[3, 5, 3], [1, 2, 2], [0, 2, 1], [2, 3, 4]], ([a, b, k], first) => { const ex = (t0) => "e^{-" + (k === 1 ? "" : k) + (t0 === 0 ? "t" : "(" + sh(t0) + ")") + "}", fr = (s) => (k === 1 ? s : R`\tfrac{1}{${k}}\big(` + s + R`\big)`);
      return { stem: R`\(x(t)=${us(a)}-${us(b)}\) and \(h(t)=e^{-${k === 1 ? "" : k}t}u(t)\). Let \(y=x\ast h\) and \(g=\frac{dx}{dt}\ast h\).`, note: first ? "" : fresh, parts: [
        part(R`\(${a}\le t\lt ${b}\) 时 \(y(t)\) 是：`, M(fr("1-" + ex(a))), [M(fr(ex(a))), M(fr("1-" + ex(0))), M("1-" + ex(a)), M(fr("1+" + ex(a)))], [R`只有已经发生的那部分输入有贡献：\(y(t)=\int_{${a}}^{t}e^{-${k === 1 ? "" : k}(t-\tau)}d\tau\)。`], R`\(\int_{${a}}^{t}e^{-${k === 1 ? "" : k}(t-\tau)}d\tau=${fr("1-" + ex(a))}\)。`),
        part(R`\(t\ge ${b}\) 时 \(y(t)\) 是：`, M(fr(ex(b) + "-" + ex(a))), [M("0"), M(fr("1-e^{-" + k * (b - a) + "}")), M(fr(ex(b))), M(fr(ex(a) + "-" + ex(b)))], [R`整个脉冲都已经过去：\(y(t)=\int_{${a}}^{${b}}e^{-${k === 1 ? "" : k}(t-\tau)}d\tau\)。`], R`\(\int_{${a}}^{${b}}e^{-${k === 1 ? "" : k}(t-\tau)}d\tau=${fr(ex(b) + "-" + ex(a))}\)。输入已经结束，但输出还在按指数衰减。`),
        part("\\(g(t)\\) 是：", M("h(" + sh(a) + ")-h(" + sh(b) + ")"), [M("h(" + sh(a) + ")+h(" + sh(b) + ")"), M(dl(a) + "-" + dl(b)), M("h(" + sh(b) + ")-h(" + sh(a) + ")")], [R`\(\frac{dx}{dt}=${dl(a)}-${dl(b)}\)。和 impulse 卷积就是平移。`], R`\(g=\big(${dl(a)}-${dl(b)}\big)\ast h=h(${sh(a)})-h(${sh(b)})\)。`),
        part("\\(g\\) 和 \\(y\\) 的关系是：", R`\(g=\dfrac{dy}{dt}\)`, [R`\(g=y\)`, R`\(g=\displaystyle\int_{-\infty}^{t}y(\tau)d\tau\)`, R`\(g=-\dfrac{dy}{dt}\)`], ["convolution 的性质 P7：\\(D(x_1\\ast x_2)=Dx_1\\ast x_2\\)。"], "\\(\\frac{dx}{dt}\\ast h=\\frac{d}{dt}(x\\ast h)\\)。先对输入求导再卷积，等于先卷积再求导。这也给了一条算 \\(y\\) 的捷径：矩形求导是两个 impulse，卷积后再积分回来。")] }; }, [LEC, OFF]),
    T("b666", "Problem 6.6.6 · 由 \\(h\\) 判断 causal 和 stable", [1, 2, 3, 4, 5, 6, 7, 8], (i) => ({ stem: R`\[${HS[i].tex}\]`, note: "讲义原题有八个 \\(h\\)，这里一次出一个。", parts: [part("这个 LTI 系统：", CS[csIndex(HS[i])], CS.filter((_, k) => k !== csIndex(HS[i])), ["causal：\\(h(t)=0\\) for all \\(t\\lt 0\\)。stable：\\(\\int|h(t)|dt\\lt\\infty\\)。", "先确定 \\(h\\) 在哪一侧非零，再看 \\(|h|\\) 在那一侧的无穷远处是衰减还是增长。"], HS[i].why)] }), [LEC, OFF]),
    T("b667", "Problem 6.6.7 · 一阶 ODE 的输出", [0], () => ({ stem: R`Causal LTI system \(\frac{dy}{dt}(t)+4y(t)=x(t)\), initially at rest.`, parts: [
      part(R`输入 \(x(t)=e^{-(1+3j)t}u(t)\) 的输出是：`, R`\(y(t)=\dfrac{e^{-(1+3j)t}-e^{-4t}}{3-3j}\,u(t)\)`, [R`\(y(t)=\dfrac{e^{-(1+3j)t}}{3-3j}\,u(t)\)`, R`\(y(t)=\dfrac{e^{-(1+3j)t}-e^{-4t}}{5+3j}\,u(t)\)`, R`\(y(t)=\big(e^{-(1+3j)t}-e^{-4t}\big)u(t)\)`], [R`integrating factor \(e^{4t}\)：\(y(t)=e^{-4t}\int_0^te^{4\tau}x(\tau)d\tau\)。`, R`\(\int_0^te^{(3-3j)\tau}d\tau=\dfrac{e^{(3-3j)t}-1}{3-3j}\)。`], R`\(y(t)=e^{-4t}\dfrac{e^{(3-3j)t}-1}{3-3j}=\dfrac{e^{-(1+3j)t}-e^{-4t}}{3-3j}\)（\(t\ge 0\)）。第二个指数是满足 initial rest 所需的 transient，漏掉它 \(y(0)\) 就不是 0。`),
      part(R`输入 \(x(t)=e^{-t}\cos(3t)u(t)\) 的输出是：`, R`\(y(t)=\tfrac16\big[e^{-t}(\cos 3t+\sin 3t)-e^{-4t}\big]u(t)\)`, [R`\(y(t)=\tfrac16\big[e^{-t}(\cos 3t-\sin 3t)-e^{-4t}\big]u(t)\)`, R`\(y(t)=\tfrac16e^{-t}(\cos 3t+\sin 3t)\,u(t)\)`, R`\(y(t)=\tfrac13\big[e^{-t}\cos 3t-e^{-4t}\big]u(t)\)`], ["实输入是上一问复输入的实部，方程系数是实数，所以输出也取实部。", R`\(\dfrac{1}{3-3j}=\dfrac{1+j}{6}\)。`], R`\(y_r=\mathrm{Re}\,y_c\)，用 \(\tfrac{1}{3-3j}=\tfrac{1+j}{6}\) 和 \(e^{-(1+3j)t}=e^{-t}(\cos 3t-j\sin 3t)\) 展开取实部。\(t=0\) 时结果为 0，可以用来检查。`)] }), [LEC, OFF]),
    T("b668", "Problem 6.6.8–6.6.9 · ODE 系统是否 linear、time-invariant", [["Dy+y=x^2", 2, R`输入平方使它 nonlinear：\(x\) 和 \(-x\) 产生同样的输出。系数是常数，延迟输入后输出跟着延迟，time-invariant。`], ["D^2y+3Dy+2y=5x", 0, "常系数线性 ODE，在 zero initial condition 下既 linear 又 time-invariant。"], ["Dy=x", 0, R`就是 integrator \(y(t)=\int_{-\infty}^{t}x(\tau)d\tau\)，linear 且 time-invariant。`]], ([e, k, why]) => ({ stem: R`\[${e}\]（zero initial conditions）`, parts: [part("这个系统是：", ["linear 且 time-invariant", "linear 但 time-varying", "nonlinear 但 time-invariant", "nonlinear 且 time-varying"][k], ["linear 且 time-invariant", "linear 但 time-varying", "nonlinear 但 time-invariant", "nonlinear 且 time-varying"].filter((_, i) => i !== k), ["linear：方程里 \\(x\\) 和 \\(y\\) 是否只以一次项出现。", "time-invariant：系数是不是常数。"], why)] }), [LEC, OFF]),
    T("b6610", "Problem 6.6.10 · DC gain", [[0, 1, 4, 5], [3, 2, 1, 6], [0, 2, 6, 3], [1, 3, 2, 8], [0, 5, 2, 10]], ([p, q, r, c], first) => { const term = (k, s) => (k === 0 ? "" : (k === 1 ? "" : k) + s), ode = [term(p, "D^2y"), term(q, "Dy"), term(r, "y")].filter(Boolean).join("+") + "=" + term(c, "x"); return { q: R`What is the steady state gain (DC gain) of \(${ode}\)?`, good: M(ftex(F(c, r))), bad: [M(ftex(F(c, p || q))), M(ftex(F(r, c))), M(String(c)), M(ftex(F(c, p + q + r)))], hints: ["输入恒定时，稳态输出也恒定，它的各阶导数都是 0。", R`把所有带 \(D\) 的项去掉。`], sol: R`稳态时导数项为 0：\(${term(r, "Y_0")}=${term(c, "X_0")}\)，DC gain \(=\tfrac{Y_0}{X_0}=${ftex(F(c, r))}\)。前提是 transient 会衰减掉。`, note: first ? "" : fresh, fill: (g) => M(ftex(F(c + g, r))) }; }, [LEC, OFF]),
  ];

  /* ---------- exam questions ---------- */
  const impExam = (id, title, tags, pool, withProps, marks, extra) => T(id, title, pool, (v, first) => ({ stem: impStem(v), note: first ? "数字和真题一致。" : fresh, parts: [partImpulseConv(v.x, v.h, marks, first ? extra : ""), ...(withProps ? partsCausalStableImp(v.h, 2, 2) : [])] }), tags);
  const exam = [
    impExam("e671", "Problem 6.7.1 (Jan 2023) · 和两个 impulse 卷积", [EXAM, AI], [IMP[0], IMP[3], IMP[4], IMP[5]], true, 6),
    T("e672", "Problem 6.7.2 (Jan 2024) · 矩形和延迟的 step 卷积", [[0, 1, 1, 3], [0, 2, 1, 1], [1, 2, 2, 2], [-1, 1, 1, 2]], ([a, b, A, d], first) => ({ stem: R`LTI system \(S\) with impulse response \(h(t)=${us(d)}\) for all \(t\in\mathbb{R}\), and input \[x(t)=\begin{cases}${A},&${a}\le t\lt ${b},\\0,&\text{otherwise.}\end{cases}\]`, note: first ? "数字和真题一致。" : fresh, parts: [partStepConv(a, b, A, d, 6)] }), [EXAM, CHK]),
    T("e673", "Problem 6.7.3 (Jan 2024) · \\(h(t)=e^{t}u(-t)\\)", [0, 2, 5, 7, 6], (i, first) => ({ stem: R`LTI system \(S\) whose impulse response is \[${HS[i].tex}\quad\text{for all }t\in\mathbb{R}.\]`, note: first ? "和真题一致。" : fresh, parts: hParts(HS[i], 2, 2) }), [EXAM, CHK]),
    T("e674", "Problem 6.7.4 (Jan 2025) · \\(h(t)=u(t)+\\delta(t+1)\\)", [[1, 1], [1, -1], [2, 1], [1, 2]], ([c, d], first) => ({ stem: R`LTI system \(S\) with impulse response \(h(t)=u(t)+${c === 1 ? "" : c}${dl(-d)}\) for all \(t\in\mathbb{R}\), and input \[x(t)=\begin{cases}t,&0\le t\lt 1,\\0,&\text{otherwise.}\end{cases}\]`, note: first ? "数字和真题一致。" : fresh, parts: [partStepPlusImpulse(c, d, 6)] }), [EXAM, CHK]),
    T("e6b25", "2024-25 卷 Q2(b)(i)(ii) · 双边指数的 \\(h\\)", [9, 5, 0, 2], (i, first) => ({ stem: R`Consider the continuous-time LTI system whose impulse response \(h\) is given by \[${HS[i].tex}\]`, note: first ? "和真题一致。这道题的后三问是 Fourier transform，放在第 7 章。" : fresh, parts: hParts(HS[i], 2, 2) }), [EXAM, CHK]),
    T("e6a26", "2025-26 卷 Q2(a) · 证明 \\(h(t)=0\\ (t\\lt 0)\\) 时系统 causal", [0], () => ({ stem: R`Using the convolution expression, show that an LTI system is causal if its impulse response satisfies \(h(t)=0\) for all \(t\lt 0\). [6 marks] 证明从 \(y(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau\) 出发。`, parts: [
      part(R`被积函数里的 \(h(t-\tau)\) 在什么条件下一定为 0？`, R`\(\tau\gt t\)`, [R`\(\tau\lt t\)`, R`\(\tau\lt 0\)`, R`\(t\lt 0\)`], [R`\(h\) 的自变量小于 0 时为 0。这里自变量是 \(t-\tau\)。`], R`\(t-\tau\lt 0\iff\tau\gt t\)。`),
      part("所以积分可以写成：", R`\(y(t)=\displaystyle\int_{-\infty}^{t}x(\tau)h(t-\tau)d\tau\)，只用到 \(\tau\le t\) 的输入`, [R`\(y(t)=\displaystyle\int_{t}^{\infty}x(\tau)h(t-\tau)d\tau\)，只用到 \(\tau\ge t\) 的输入`, R`\(y(t)=\displaystyle\int_{0}^{t}x(\tau)h(t-\tau)d\tau\)，只用到 \(0\le\tau\le t\) 的输入`, R`\(y(t)=\displaystyle\int_{-\infty}^{0}x(\tau)h(t-\tau)d\tau\)，只用到 \(\tau\le 0\) 的输入`], [R`把积分拆成 \(\int_{-\infty}^{t}+\int_{t}^{\infty}\)，第二段的被积函数恒为 0。`], R`\(\int_t^\infty\) 那一段里 \(h(t-\tau)=0\)，整段消失。剩下 \(y(t)=\int_{-\infty}^{t}x(\tau)h(t-\tau)d\tau\)：\(y(t)\) 只取决于 \(\tau\le t\) 的输入，这正是 causal 的定义。和官方解答的写法一致。`)] }), [EXAM, CHK]),
    impExam("e6b26", "2025-26 卷 Q2(b) · 三角形输入和两个 impulse", [EXAM, CHK], [IMP[2], IMP[5], IMP[1]], false, 6, R`<br><b>和官方解答有一处不一致</b>：2025-26 Official Solutions 的草图把 \(t=2\) 处的三角形画在了横轴上方（高 1）。\(h\) 里那一项是 \(-\delta(t-2)\)，对应 \(-x(t-2)\)，应该朝下。\(t=-2\) 处高 2 的三角形一致。建议问老师确认。`),
  ];

  /* ---------- mock papers ---------- */
  const mk = (id, title, pool, make) => T(id, title, pool, make, [OWN]);
  const mocks = [
    { name: "模拟卷 A · 易", time: "建议 20 分钟", types: [
      mk("m6A1", "A1 · 和 impulse 卷积", [IMP[4], IMP[3], IMP[1]], (v) => ({ stem: impStem(v), parts: [partImpulseConv(v.x, v.h, 6), ...partsCausalStableImp(v.h, 2, 2)] })),
      mk("m6A2", "A2 · DC gain", [[0, 1, 2, 6], [0, 3, 5, 10], [0, 2, 4, 3]], ([p, q, r, c]) => ({ q: R`Find the DC gain of \(${q === 1 ? "" : q}Dy+${r}y=${c}x\).`, good: M(ftex(F(c, r))), bad: [M(ftex(F(c, q))), M(ftex(F(r, c))), M(String(c))], hints: ["稳态时导数为 0。"], sol: R`\(${r}Y_0=${c}X_0\)，DC gain \(=${ftex(F(c, r))}\)。`, marks: 4, fill: (g) => M(ftex(F(c + g, r))) })),
    ] },
    { name: "模拟卷 B · 真题难度", time: "建议 25 分钟", types: [
      mk("m6B1", "B1 · 矩形和延迟的 step", [[0, 2, 1, 2], [1, 3, 1, 1], [0, 1, 2, 2]], ([a, b, A, d]) => ({ stem: R`\(h(t)=${us(d)}\)，\(x(t)=${A}\) for \(${a}\le t\lt ${b}\)，otherwise \(0\).`, parts: [partStepConv(a, b, A, d, 6)] })),
      mk("m6B2", "B2 · causal 和 stable", [6, 3, 8, 1], (i) => ({ stem: R`\[${HS[i].tex}\]`, parts: hParts(HS[i], 2, 2) })),
    ] },
    { name: "模拟卷 C · 偏难", time: "建议 30 分钟", types: [
      mk("m6C1", "C1 · step 加 impulse", [[2, -1], [1, 2], [2, 1]], ([c, d]) => ({ stem: R`\(h(t)=u(t)+${c === 1 ? "" : c}${dl(-d)}\)，\(x(t)=t\) for \(0\le t\lt 1\)，otherwise \(0\).`, parts: [partStepPlusImpulse(c, d, 6)] })),
      mk("m6C2", "C2 · causal 和 stable", [7, 9, 4, 2], (i) => ({ stem: R`\[${HS[i].tex}\]`, parts: hParts(HS[i], 2, 2) })),
      mk("m6C3", "C3 · 二阶系统的 DC gain", [[2, 3, 4, 6], [1, 5, 2, 9], [3, 1, 6, 4]], ([p, q, r, c]) => ({ q: R`Find the DC gain of \(${p === 1 ? "" : p}D^2y+${q === 1 ? "" : q}Dy+${r}y=${c}x\).`, good: M(ftex(F(c, r))), bad: [M(ftex(F(c, p))), M(ftex(F(c, p + q + r))), M(ftex(F(r, c)))], hints: ["稳态时所有导数项为 0。"], sol: R`\(${r}Y_0=${c}X_0\)，DC gain \(=${ftex(F(c, r))}\)。`, marks: 4, fill: (g) => M(ftex(F(c + g, r))) })),
    ] },
  ];

  window.BANK = Object.assign(window.BANK || {}, { basics, exam, mocks, ch6: { HS, CS, csIndex, TRI1, hTex } });
})();
