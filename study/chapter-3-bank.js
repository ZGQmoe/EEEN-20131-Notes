/* Chapter 3 question bank, part 1: lecture-note Problems (3.5.x), exam questions (3.6.x), mock papers.
   Property answers for the Problem 3.5.1 / 3.5.2 systems follow the official solution manual table. */
(function () {
  "use strict";
  const { mcq, ntex, plotTerms } = QUIZ;
  const { M, sh, lin } = TEX, R = String.raw;
  const { EXAM, CHK, AI, OFF, LEC, OWN, fresh, draw, part, T } = BANKLIB;
  const yn = (b) => (b ? "是" : "不是");

  /* ---------- systems with known properties: [memoryless, causal, time-invariant, linear] ---------- */
  const NAMES = ["memoryless", "causal", "time-invariant", "linear"];
  const SYS = [
    { tex: R`y(t)=\sin(x(t))`, p: [1, 1, 1, 0], why: ["只用到 \\(x(t)\\) 这一个时刻的值。", "memoryless 的系统不需要未来的输入。", R`延迟输入得到 \(\sin(x(t-d))\)，正好是延迟后的输出。`, R`取恒定输入 \(x=\pi/2\)：\(S(2x)=\sin\pi=0\)，而 \(2Sx=2\)。`] },
    { tex: R`y(t)=x(\sin t)`, p: [0, 0, 0, 1], why: [R`\(t=\pi\) 时输出是 \(x(0)\)，用的不是 \(x(\pi)\)。`, R`\(t=-\pi/2\) 时输出是 \(x(-1)\)，而 \(-1\gt-\pi/2\)，是未来的输入。`, R`延迟输入得到 \(x(\sin t-d)\)，延迟输出得到 \(x(\sin(t-d))\)，不同。`, "取值的位置 \\(\\sin t\\) 由时间决定，和输入无关，所以对输入的线性组合是分配的。"] },
    { tex: R`y(t)=x(t-2)+x(t+2)`, p: [0, 0, 1, 1], why: ["用到了 \\(t\\pm2\\) 两个别的时刻。", "\\(x(t+2)\\) 是未来的输入。", R`延迟输入得到 \(x(t-d-2)+x(t-d+2)\)，就是延迟后的输出。`, "延迟、超前和相加都保持线性。"] },
    { tex: R`y(t)=\cos(3t)\,x(t)`, p: [1, 1, 0, 1], why: ["只用到 \\(x(t)\\)。乘上的 \\(\\cos(3t)\\) 是固定的时间函数，不是输入。", "memoryless，不需要未来。", R`延迟输入得到 \(\cos(3t)x(t-d)\)，延迟输出得到 \(\cos(3(t-d))x(t-d)\)，不同。`, "乘以一个和输入无关的固定函数保持线性。"] },
    { tex: R`y(t)=\displaystyle\int_{-\infty}^{2t}x(\tau)\,d\tau`, p: [0, 0, 0, 1], why: ["积分用到了很多时刻的输入。", R`\(t=1\) 时积分上限是 \(2\)，包含了 \((1,2]\) 上的未来输入。`, R`延迟输入得到上限 \(2t-d\)，延迟输出得到上限 \(2t-2d\)，不同。`, "积分是线性运算，上限是 \\(2t\\) 不影响这一点。"] },
    { tex: R`y(t)=\begin{cases}0,&t\lt 0\\x(t)+x(t-2),&t\ge 0\end{cases}`, p: [0, 1, 0, 1], why: ["用到了 \\(x(t-2)\\)。", "只用到当前和过去的输入。", R`开关固定在 \(t=0\)。恒定输入 \(x=1\) 延迟后不变，输出还是 \(2u(t)\)，而延迟后的原输出是 \(2u(t-1)\)。`, R`等于 \(u(t)[x(t)+x(t-2)]\)：乘一个固定的 step、加延迟，都保持线性。`] },
    { tex: R`y(t)=\begin{cases}0,&x(t)\lt 0\\x(t)+x(t-2),&x(t)\ge 0\end{cases}`, p: [0, 1, 1, 0], why: ["用到了 \\(x(t-2)\\)。", "只用到当前和过去的输入。", "开关由输入的值决定，不是由时间决定。延迟输入后整条规则一起延迟。", R`\(x=1\) 时输出 \(2\)；\(-x\) 时输出 \(0\ne-2\)。`] },
    { tex: R`y(t)=x(t/3)`, p: [0, 0, 0, 1], why: [R`\(t=3\) 时输出是 \(x(1)\)。`, R`\(t=-3\) 时输出是 \(x(-1)\)，而 \(-1\gt-3\)，是未来的输入。只看 \(t\ge0\) 会漏掉这个反例。`, R`延迟输入得到 \(x(t/3-d)\)，延迟输出得到 \(x((t-d)/3)\)，不同。`, "在固定位置取值，对线性组合是分配的。"] },
    { tex: R`y(t)=\dfrac{dx}{dt}(t)`, p: [0, 1, 1, 1], why: [R`\(x(t)=0\) 和 \(x(t)=t\) 在 \(t=0\) 处的值相同，导数却是 \(0\) 和 \(1\)。斜率不能只从当前值得到。`, "导数可以用左极限 \\(\\lim_{h\\downarrow0}\\frac{x(t)-x(t-h)}{h}\\) 得到，只用当前和过去的值（官方解答的说明，针对可微输入）。", "\\(\\frac{d}{dt}x(t-d)=\\dot x(t-d)\\)。", "求导是线性运算。"] },
  ];
  const tupleText = (p, names) => names.map((n, i) => n + "：" + yn(p[i])).join(" · ");
  function partTuple(sys, flipsFirst) {
    const flip = (i) => sys.p.map((v, k) => (k === i ? 1 - v : v));
    const order = [...(flipsFirst || []), 0, 1, 2, 3].filter((v, i, a) => a.indexOf(v) === i);
    const o = mcq(tupleText(sys.p, NAMES), order.map((i) => tupleText(flip(i), NAMES)));
    return { q: "这个系统的四个性质是：", ...o,
      hints: ["四个检查：memoryless 看 \\(y(t)\\) 是否只用 \\(x(t)\\)；causal 看是否不需要 \\(t\\) 之后的输入（正的和负的 \\(t\\) 都要看）；time-invariant 比较“先延迟输入”和“先过系统再延迟输出”；linear 先试零输入和把输入放大 2 倍。", "四个里有 " + sys.p.filter(Boolean).length + " 个“是”。"],
      sol: NAMES.map((n, i) => "<b>" + n + "：" + yn(sys.p[i]) + "。</b>" + sys.why[i]).join("<br>") };
  }

  /* ---------- time-warp systems y(t) = x(g(t)) (Jan 2023, Jan 2024 type) ---------- */
  const WARP = {
    sq: { y: "x(t^2)", at: (t) => "x(" + ntex(t * t) + ")", mem: 2, fut: 2, past: 0.5, shiftIn: "x(t^2-d)", shiftOut: "x((t-d)^2)", halfOk: "0\\lt t\\lt 1", extra: R`\(t\lt 0\) 时 \(t^2\gt t\)，同样用到未来。` },
    2: { y: "x(2t)", a: 2 }, 3: { y: "x(3t)", a: 3 }, 0.5: { y: "x(t/2)", a: 0.5 }, [1 / 3]: { y: "x(t/3)", a: 1 / 3 },
  };
  Object.values(WARP).forEach((w) => {
    if (!w.a) return;
    const a = w.a, big = a > 1;
    w.at = (t) => "x(" + ntex(a * t) + ")"; w.mem = 2; w.fut = big ? 1 : -2; w.past = big ? -1 : 2;
    const n = Math.round(1 / a);
    w.shiftIn = big ? "x(" + a + "t-d)" : "x(t/" + n + "-d)"; w.shiftOut = big ? "x(" + a + "(t-d))" : "x((t-d)/" + n + ")";
    w.halfOk = big ? "t\\lt 0" : "t\\gt 0"; w.extra = "";
  });
  const ev1 = (w, t) => R`\(y(${ntex(t)})=${w.at(t)}\)`;
  function warpParts(w, marks) {
    const m = marks || [];
    return [
      part("State the definition of memoryless systems and discuss whether this system is memoryless.", "不是 memoryless。例如 " + ev1(w, w.mem) + "，输出用到了别的时刻的输入",
        ["是 memoryless。每个时刻的输出只由输入的一个值决定", "是 memoryless。系统里没有积分，也没有延迟", "不是 memoryless。因为 " + ev1(w, 0)],
        ["Definition 3.4.1：输出在时刻 \\(t\\) 的值只取决于输入在同一时刻 \\(t\\) 的值。", "“只用到输入的一个值”还不够，这个值必须是 \\(x(t)\\)。找一个 \\(t\\)，看输出读的是哪个时刻的输入。"],
        "定义：\\(y(t)\\) 只取决于 \\(x(t)\\)。这里 " + ev1(w, w.mem) + "，读的是另一个时刻，所以不是 memoryless。\\(t=0\\) 时正好读 \\(x(0)\\)，不能当反例。"),
      part("State the definition of causal systems and discuss whether this system is causal.", "不是 causal。例如 " + ev1(w, w.fut) + "，用到了未来的输入",
        [R`是 causal。\(${w.halfOk}\) 时输出只用到过去的输入`, "不是 causal。例如 " + ev1(w, w.past), "不是 causal。因为系统不是 memoryless"],
        ["Definition 3.4.7：对任意时刻 \\(t_0\\)，输出 \\(y(t_0)\\) 只取决于 \\(\\tau\\le t_0\\) 的输入。只要有一个时刻需要未来的输入，就不是 causal。", R`正的和负的 \(t\) 都要检查。反例要满足“读取的时刻比 \(t\) 晚”。`],
        "只要存在一个时刻用到未来就不是 causal。" + ev1(w, w.fut) + R`，读取的时刻在 \(t=${ntex(w.fut)}\) 之后。` + w.extra + ev1(w, w.past) + " 读的是过去，不能当反例。有 memory 也不等于 noncausal。"),
      part("State the definition of time-invariant systems and discuss whether this system is time-invariant.", R`不是 time-invariant。输入延迟 \(d\) 得到 \(${w.shiftIn}\)，输出延迟 \(d\) 得到 \(${w.shiftOut}\)，两者不同`,
        [R`是 time-invariant。延迟输入和延迟输出得到的都是 \(${w.shiftOut}\)`, "不是 time-invariant。因为系统不是 causal", "是 time-invariant。因为系统是线性的"],
        ["Definition 3.4.15：输入延迟 \\(t_0\\)，输出也恰好延迟 \\(t_0\\)，对任意 \\(t_0\\) 成立。", R`分别写出两条路：把 \(x(t)\) 换成 \(x(t-d)\) 再过系统；把 \(y(t)\) 里的 \(t\) 换成 \(t-d\)。`],
        R`先延迟输入：系统把自己的时间变量代进去，得到 \(${w.shiftIn}\)。先过系统再延迟输出：\(y(t-d)=${w.shiftOut}\)。两者不同，所以是 time-varying。causal 和 linear 都和这个性质无关。`),
    ].map((p, i) => ({ ...p, marks: m[i] }));
  }
  const warpType = (id, title, tags, pool, extra) => T(id, title, pool, (k, first) => { const w = WARP[k]; const ps = warpParts(w, [4, 4, 4]); if (first && extra) ps[1].sol += extra; return { stem: R`Consider the continuous-time system that maps the input signal \(x\) into the output signal \(y\) given by \(y(t)=${w.y}\) for all \(t\in\mathbb{R}\).`, note: first ? "和真题一致。" : fresh, parts: ps }; }, tags);

  /* ---------- Jan 2025: a linear system known through three input-output pairs (Figure 3.16) ---------- */
  const X1 = [[0, 1, "lin", 0, 1]], Y1 = [[0, 1, "lin", 1, 0]];
  const X2 = [[1, 3, "lin", 0, 1]], Y2 = [[0, 1, "lin", 0, 1], [1, 3, "lin", -1, 2]];
  const X3 = [[1, 2, "lin", 0, 1]], Y3 = [[1, 2, "lin", 1, -1], [2, 3, "lin", 0, 1]];
  const fig = (pcs, label, y) => ({ terms: [{ pcs }], x0: -0.5, x1: 4.5, y: y || [-1.4, 1.6], label });
  const FIG316 = [fig(X1, "x1"), fig(Y1, "y1"), fig(X2, "x2"), fig(Y2, "y2"), fig(X3, "x3"), fig(Y3, "y3")];
  const combo = (c1, c3, tex) => (c1 === 1 ? "" : c1 === -1 ? "-" : c1) + tex + "_1" + (c3 < 0 ? "-" : "+") + (Math.abs(c3) === 1 ? "" : Math.abs(c3)) + tex + "_3";
  function pairsParts(c1, c3, first) {
    const yr = [-2.6, 4.6], out = (a, b, B) => plotTerms([{ pcs: Y1, c: a }, { pcs: B || Y3, c: b }], -0.5, 4.5, yr);
    const o = mcq(out(c1, c3), [out(c1, 1), out(c3, c1), out(c1, c3, Y2), out(1, 1), out(c1, -c3)]);
    return [
      { ...part("Discuss whether the system could be memoryless.", R`不可能。\(x_1(0.25)=x_1(0.75)=1\)，但 \(y_1(0.25)\ne y_1(0.75)\)`, [R`可能。\(x_1\) 和 \(y_1\) 都只在 \(0\) 到 \(1\) 之间非零`, "可能。题目已经说了系统是线性的", "不可能。因为线性系统一定有 memory"], ["memoryless：同样的输入值只能对应同样的输出值。找输入值相同、输出却不同的两处。"], R`\(x_1\) 在 \((0,1)\) 上恒为 1，\(y_1\) 却从 0 升到 1，输出不只由当前输入值决定。这是官方解答的写法。更强的证据：\(t=0.5\) 时 \(x_2=x_3=0\)，但 \(y_2=1\)、\(y_3=0\)。`), marks: 3 },
      { ...part("Discuss whether this system could be causal.", R`不可能。\(x_2\) 和 \(x_3\) 在 \(t\lt 2\) 上完全相同，但 \(y_2\) 和 \(y_3\) 在 \(t\lt 2\) 上不同`, [R`可能。\(y_1\) 和 \(y_3\) 都没有早于各自的输入出现`, R`不可能。因为 \(y_1\) 在 \(x_1\) 结束后变回了 0`, "不可能。因为系统不是 memoryless"], ["causal：两个输入在某个时刻之前完全相同，那么它们的输出在那个时刻之前也必须相同。", R`比较 \(x_2\) 和 \(x_3\)：它们到哪个时刻为止是一样的？`], R`\(x_2\) 和 \(x_3\) 在 \(t\lt 2\) 上都是“\(1\) 到 \(2\) 之间为 1，其余为 0”。但 \(y_2\) 在 \((0,1)\) 上是 1，\(y_3\) 是 0。系统在 \(t\lt 2\) 时就“知道”了 \(t\ge 2\) 的输入，所以不可能是 causal。和官方解答一致。`), marks: 3 },
      { ...part("Discuss whether this system could be time-invariant.", R`不可能。\(x_2(t)=x_3(t)+x_3(t-1)\)，但 \(y_2(t)\ne y_3(t)+y_3(t-1)\)`, [R`可能。\(x_3\) 是 \(x_1\) 延迟 1，而 \(y_3\) 在 \(1\) 到 \(2\) 之间正好是 \(y_1\) 延迟 1`, "不可能。因为系统不是 causal", "可能。三个输出都从整数时刻开始变化"], ["time-invariant：延迟后的输入必须给出同样延迟后的输出。题目还给了线性，可以把一个输入拆成另一个输入的延迟之和。", R`\(x_2\) 的宽度是 2，\(x_3\) 的宽度是 1。`], R`线性加 time-invariant 会要求 \(y_2=y_3+y_3(t-1)\)，而图里不是。和官方解答一致。还有一个更直接的反例：\(x_3(t)=x_1(t-1)\)，time-invariant 要求 \(y_3(t)=y_1(t-1)\)，它在 \(t\gt 2\) 应为 0，但 \(y_3\) 在 \((2,3)\) 上是 1。`), marks: 3 },
      { q: R`What is the output of the system for the input \(x_4\)（上面最后一张图）？`, marks: 5, ...o,
        hints: [R`先把 \(x_4\) 写成已知输入的组合。\(x_1\) 占 \((0,1)\)，\(x_3\) 占 \((1,2)\)。`, R`\(x_4=${combo(c1, c3, "x")}\)。系统是线性的，输出用同样的系数组合。`],
        sol: R`\(x_4=${combo(c1, c3, "x")}\)，由线性 \(y_4=${combo(c1, c3, "y")}\)：\(0\le t\lt 1\) 上是 \(${lin(c1, 0)}\)，\(1\le t\lt 2\) 上是 \(${lin(c3, -c3)}\)，\(2\le t\lt 3\) 上是 \(${c3}\)。` + (first ? R`<br><b>和官方解答有一处不一致</b>：2024-25 Official Solutions 先写了 \(y_4=y_1+2y_3\)，但最后展开的分段式子是 \(t-1\) 和 \(1\)，漏了系数 2，相当于 \(y_1+y_3\)。按线性应为 \(2(t-1)\) 和 \(2\)。建议问老师确认。` : "") },
    ];
  }
  const pairsType = (id, title, tags, pool) => T(id, title, pool, ([c1, c3], first) => ({ stem: R`A linear system \(S\) has the input–output pairs \((x_1,y_1)\), \((x_2,y_2)\), \((x_3,y_3)\) shown below. The signals are zero at any other time. 最后一张图是输入 \(x_4\)。`, figs: [...FIG316, { terms: [{ pcs: X1, c: c1 }, { pcs: X3, c: c3 }], x0: -0.5, x1: 4.5, y: [-2.6, 4.6], label: "x4" }], note: first ? "和真题一致。" : "同一组输入输出对，换了 \\(x_4\\)。", parts: pairsParts(c1, c3, first) }), tags);

  /* ---------- Jan 2026: y(t) = c for t < 0, x(t + k) for t >= 0 ---------- */
  function switchParts(c, k) {
    const sys = R`x(${sh(-k)})`, fut = k > 0;
    return [
      { ...(fut
        ? part("Is the system causal? Justify your answer.", R`不是。例如 \(y(1)=x(${1 + k})\)，用到了未来的输入`, [R`是。\(t\lt 0\) 时输出是常数，不依赖输入`, R`不是。因为 \(t\lt 0\) 时输出和输入无关`, "是。因为系统有 memory"], ["只要有一个时刻的输出需要未来的输入，就不是 causal。", R`看 \(t\ge 0\) 的那一支：\(y(t)=${sys}\) 读的是哪个时刻？`], R`\(t\ge 0\) 时 \(y(t)=${sys}\)，读的是 \(t+${k}\)，在未来。例如 \(y(1)=x(${1 + k})\)。` + (k === 1 ? "官方解答用的就是这个例子。" : ""))
        : part("Is the system causal? Justify your answer.", R`是。\(t\lt 0\) 时输出不依赖输入；\(t\ge 0\) 时读的是 \(${sys}\)，是过去的输入`, [R`不是。例如 \(y(1)=x(${1 + k})\)，用到了别的时刻的输入`, R`不是。\(t\lt 0\) 时输出恒为 \(${c}\)，和输入无关`, "是。因为系统是 memoryless"], ["causal 要求不需要未来的输入。用到过去的输入是允许的。", R`\(${sys}\) 读的时刻比 \(t\) 早还是晚？`], R`\(t\ge 0\) 时读的是 \(t-${-k}\)，在过去；\(t\lt 0\) 时输出是常数，不需要任何输入。所以是 causal。有 memory 不等于 noncausal。`)), marks: 3 },
      { ...part("Is the system time-invariant? Justify your answer.", R`不是。切换点固定在 \(t=0\)：输入延迟后，输出里“\(t\lt 0\) 恒为 \(${c}\)”这一段不会跟着移动`, [R`是。\(${sys}\) 只是把输入平移，平移是 time-invariant 的`, fut ? "不是。因为系统不是 causal" : "不是。因为系统有 memory", R`是。\(t\lt 0\) 时输出和输入无关，所以延迟输入没有影响`], ["比较两条路：延迟输入再过系统；先过系统再延迟输出。", R`把输出延迟 \(d\gt 0\) 后，恒为 \(${c}\) 的那一段会延伸到 \(t\lt d\)。延迟输入再过系统呢？`], R`延迟输入再过系统：\(t\lt 0\) 仍然恒为 \(${c}\)，切换点还在 0。延迟输出：切换点移到了 \(t=d\)。两者不同，所以是 time-varying。官方解答用一个脉冲输入画图说明了同一件事。`), marks: 4 },
      { ...part("Is the system linear? Justify your answer.", R`不是。\(t\lt 0\) 时输出恒为 \(${c}\)，输入为零时输出不是零，输入放大后这一段也不跟着放大`, [R`是。\(${sys}\) 对输入是线性的`, "不是。因为系统是 time-varying", "是。输出里没有输入的平方或乘积"], ["线性系统必须满足：零输入给出零输出；输入放大 \\(k\\) 倍，输出也放大 \\(k\\) 倍。", R`看 \(t\lt 0\) 的那一支。`], R`\(t\lt 0\) 时输出是 \(${c}\)，和输入无关。输入取 0 时输出不是 0，scaling 不成立。官方解答的理由相同：负时刻的输出恒定，不可缩放。time-varying 的系统可以是线性的，两者无关。`), marks: 4 },
      { ...part("Is the system stable? Justify your answer.", R`不是。无论输入是什么，输出在 \(t\lt 0\) 上恒为 \(${c}\)，能量是无穷大`, ["是。有限能量的输入只是被平移，能量不变", fut ? "不是。因为系统不是 causal" : "不是。因为系统不是 linear", R`是。输出有界：\(|y(t)|\) 不会超过 \(${Math.abs(c)}\) 和 \(|x|\) 的最大值`], ["Definition 3.4.11：有限能量的输入必须产生有限能量的输出。", R`算 \(\int_{-\infty}^{0}|y(t)|^2dt\)。`], R`\(\int_{-\infty}^{0}${c * c}\,dt=\infty\)，任何输入都得到无穷能量的输出，所以不是 finite-energy stable。输出有界不等于能量有限。和官方解答一致。`), marks: 3 },
    ];
  }
  const switchType = (id, title, tags, pool) => T(id, title, pool, ([c, k], first) => ({ stem: R`Consider the system \(S\) that maps the input signal \(x\) into the output signal \(y\), given by \[y(t)=\begin{cases}${c},&t\lt 0,\\x(${sh(-k)}),&t\ge 0.\end{cases}\]`, note: first ? "和真题一致。" : fresh, parts: switchParts(c, k) }), tags);

  /* ---------- lecture-note Problems ---------- */
  const TWO = ["linear 且 time-invariant", "linear 但 time-varying", "nonlinear 但 time-invariant", "nonlinear 且 time-varying"];
  const P352 = [
    [R`y(t)=x(t-1)`, 0, R`延迟对线性组合分配：\(S(\alpha x+\beta z)(t)=\alpha x(t-1)+\beta z(t-1)\)。延迟输入得到 \(x(t-1-d)\)，就是延迟后的输出。`],
    [R`y(t)=t\,x(t-2)`, 1, R`乘以固定的时间函数 \(t\) 保持线性。但延迟输入得到 \(t\,x(t-2-d)\)，延迟输出得到 \((t-d)x(t-d-2)\)，不同。`],
    [R`y(t)=x(t-1)\,x(t-2)`, 2, R`\(S(\alpha x)=\alpha^2x(t-1)x(t-2)\ne\alpha Sx\)，nonlinear。延迟输入得到 \(x(t-1-d)x(t-2-d)\)，就是延迟后的输出。`],
    [R`y(t)=t^2x(t)`, 1, R`乘以固定的 \(t^2\) 保持线性；延迟输入得到 \(t^2x(t-d)\)，延迟输出得到 \((t-d)^2x(t-d)\)，不同。`],
    [R`y(t)=x^2(t-3)`, 2, R`\(S(2x)=4Sx\)，nonlinear。延迟输入得到 \(x^2(t-3-d)\)，就是延迟后的输出。`],
    [R`y(t)=t\,x^2(t)`, 3, R`平方使它 nonlinear；乘了 \(t\) 使它 time-varying。`],
  ];
  const Y351 = [[0, 1, "lin", 2, 0], [1, 2, "lin", -2, 4]], X351 = [[0, 2, "lin", 0, 1]];
  const P355 = [[{ d: 0, c: 1 }, { d: 2, c: -1 }], [{ d: -1, c: 1 }, { d: 0, c: 1 }, { d: 1, c: -1 }], [{ d: 0, c: 2 }, { d: 1, c: -1 }], [{ d: 0, c: 1 }, { d: 2, c: 1 }], [{ d: -1, c: -1 }, { d: 1, c: 1 }]];
  const termTex = (ts, n) => ts.map((k, i) => (k.c < 0 ? "-" : i ? "+" : "") + (Math.abs(k.c) === 1 ? "" : Math.abs(k.c)) + n + "_1(" + sh(k.d) + ")").join("");

  const basics = [
    T("b351", "Problem 3.5.1 · 九个系统的四个性质", [0, 1, 2, 3, 4, 5, 6, 7, 8], (i) => ({ stem: R`\[${SYS[i].tex}\]`, note: "讲义原题有九个系统，这里一次出一个。", parts: [partTuple(SYS[i])] }), [LEC, OFF]),
    T("b352", "Problem 3.5.2 · linear 和 time-invariant", [0, 1, 2, 3, 4, 5], (i, first) => ({ stem: R`\[${P352[i][0]}\]`, note: i > 2 ? fresh : "", parts: [part("这个系统是：", TWO[P352[i][1]], TWO.filter((_, k) => k !== P352[i][1]), ["linear：把输入放大 \\(\\alpha\\) 倍，输出是不是也放大 \\(\\alpha\\) 倍？", "time-invariant：分别写出“延迟输入再过系统”和“延迟输出”，看是否相同。乘一个固定的时间函数和乘输入自己，效果不一样。"], P352[i][2])] }), [LEC, OFF]),
    T("b353", "Problem 3.5.3 · 并联、串联和逆系统", [[1, 2], [2, 1], [1, 3], [3, 2]], ([d1, d2], first) => { const s = d1 + d2, x = (m, d) => (m ? m + R`\,` : "") + "x(" + sh(d) + ")"; return { stem: R`\(S_1\) 把 \(x\) 映射到 \(y(t)=x(${sh(d1)})\)，\(S_2\) 把 \(x\) 映射到 \(y(t)=t\,x(${sh(d2)})\)。`, note: first ? "" : fresh, parts: [
      part(R`并联 \(S_1+S_2\) 的输出是：`, M(x("", d1) + "+" + x("t", d2)), [M(x("t", s)), M(x("", d1) + R`\cdot ` + x("t", d2)), M(x("t", d1) + "+" + x("", d2))], ["并联：同一个输入分别过两个系统，输出相加。"], R`\([(S_1+S_2)x](t)=${x("", d1)}+${x("t", d2)}\)。`),
      part(R`串联 \(S_2S_1\)（先过 \(S_1\)，再过 \(S_2\)）的输出是：`, M(x("t", s)), [M(x("(" + sh(d1) + ")", s)), M(x("t", d2)), M(x("(" + sh(d2) + ")", s))], [R`\(S_2S_1x\) 表示先算 \(v=S_1x\)，再算 \(S_2v\)。`, R`\(v(t)=x(${sh(d1)})\)，然后 \(y(t)=t\,v(${sh(d2)})\)。`], R`\(v(t)=x(${sh(d1)})\)，\(y(t)=t\,v(${sh(d2)})=${x("t", s)}\)。`),
      part(R`反过来 \(S_1S_2\)（先过 \(S_2\)，再过 \(S_1\)）的输出是：`, M(x("(" + sh(d1) + ")", s)), [M(x("t", s)), M(x("(" + sh(d2) + ")", s)), M(x("(" + sh(-d1) + ")", s))], [R`\(v(t)=t\,x(${sh(d2)})\)，然后把整个 \(v\) 延迟 \(${d1}\)。`, "延迟时，前面乘的那个 \\(t\\) 也要一起延迟。"], R`\(y(t)=v(${sh(d1)})=(${sh(d1)})\,x(${sh(s)})\)。乘数 \(t\) 也被延迟了，所以两种顺序的结果不同。\(S_2\) 是 time-varying 的，串联顺序不能交换。`),
      part(R`\(S_1\) 的逆系统是：`, R`\((S_1^{-1}y)(t)=y(t+${d1})\)，noncausal，不能实时实现`, [R`\((S_1^{-1}y)(t)=y(t-${d1})\)，causal`, R`\((S_1^{-1}y)(t)=y(t+${d1})\)，causal，可以实时实现`, "逆系统不存在"], ["逆系统要把延迟抵消掉。", "抵消延迟需要超前。超前需要什么时刻的输入？"], R`把输出超前 \(${d1}\) 就恢复了输入：\(y(t+${d1})=x(t)\)。超前要用到未来的值，所以是 noncausal，只能对已经录好的信号做。`)] }; }, [LEC, OFF]),
    T("b354", "Problem 3.5.4 · 用线性求输出", [[3, 2, 3, 1], [2, 4, 3, 2], [5, 3, 2, 1], [4, 2, 5, 3]], ([A, w1, w2, ph], first) => { const cs = (f, w, p) => A + "\\" + f + "(" + w + "t" + (p ? "-" + p : "") + ")"; return { stem: R`A continuous-time linear system \(S\) yields the pairs \(e^{j${w1}t}\mapsto ${A}e^{j${w2}t}\) and \(e^{-j${w1}t}\mapsto ${A}e^{-j${w2}t}\).`, note: first ? "" : fresh, parts: [
      part(R`输入 \(x(t)=\cos(${w1}t)\) 的输出是：`, M(cs("cos", w2)), [M(cs("cos", w1)), M(R`\tfrac{${A}}{2}\cos(${w2}t)`), M(2 * A + R`\cos(${w2}t)`)], [R`\(\cos(${w1}t)=\tfrac12\big(e^{j${w1}t}+e^{-j${w1}t}\big)\)，然后对两项分别用已知的映射。`], R`\(y(t)=\tfrac12\big(${A}e^{j${w2}t}+${A}e^{-j${w2}t}\big)=${cs("cos", w2)}\)。`),
      part(R`输入 \(x(t)=\sin(${w1}t)\) 的输出是：`, M(cs("sin", w2)), [M(cs("cos", w2)), M("-" + cs("sin", w2)), M("j" + cs("sin", w2))], [R`\(\sin(${w1}t)=\tfrac{1}{2j}\big(e^{j${w1}t}-e^{-j${w1}t}\big)\)。`], R`\(y(t)=\tfrac{1}{2j}\big(${A}e^{j${w2}t}-${A}e^{-j${w2}t}\big)=${cs("sin", w2)}\)。`),
      part(R`输入 \(x(t)=\cos(${w1}t-${ph})\) 的输出是：`, M(cs("cos", w2, ph)), [M(A + R`\cos(${w2}t-${ntex((ph * w2) / w1)})`), M(cs("cos", w2)), M(A + R`\cos(${w2}t+${ph})`)], [R`\(\cos(${w1}t-${ph})=\tfrac12\big(e^{-j${ph}}e^{j${w1}t}+e^{j${ph}}e^{-j${w1}t}\big)\)。系数 \(e^{\mp j${ph}}\) 是常数。`, "题目只给了线性，没有给 time-invariant。不能把输出当成“延迟后的余弦”。"], R`常数系数原样带到输出：\(y(t)=\tfrac{${A}}{2}\big(e^{-j${ph}}e^{j${w2}t}+e^{j${ph}}e^{-j${w2}t}\big)=${cs("cos", w2, ph)}\)。输入是 \(\cos(${w1}t)\) 延迟 \(${ntex(ph / w1)}\)，但把 \(${cs("cos", w2)}\) 也延迟 \(${ntex(ph / w1)}\) 会得到 \(${A}\cos(${w2}t-${ntex((ph * w2) / w1)})\)，那一步用了题目没给的 time-invariance。`)] }; }, [LEC, OFF]),
    T("b355", "Problem 3.5.5 · 由已知的一对构造输出", P355, (ts, first) => { const yr = [-4.6, 4.6], out = (list) => plotTerms(list.map((k) => ({ pcs: Y351, c: k.c, d: k.d })), -3, 6, yr); const o = mcq(out(ts), [out(ts.map((k, i) => (i === ts.length - 1 ? { ...k, c: -k.c } : k))), out(ts.map((k) => ({ ...k, d: -k.d }))), out(ts.slice(0, 1)), out(ts.map((k) => ({ ...k, c: Math.abs(k.c) })))], (g) => out(ts.map((k) => ({ ...k, d: k.d + g }))));
      return { stem: R`\(S\) 是 linear time-invariant 系统。输入 \(x_1\)（宽 2、高 1 的矩形）对应输出 \(y_1\)（宽 2、峰值 2 的三角形）。第三张图是新的输入 \(x\)。`, figs: [{ terms: [{ pcs: X351 }], x0: -3, x1: 6, y: [-2.6, 2.6], label: "x1" }, { terms: [{ pcs: Y351 }], x0: -3, x1: 6, y: [-2.6, 2.6], label: "y1" }, { terms: ts.map((k) => ({ pcs: X351, c: k.c, d: k.d })), x0: -3, x1: 6, y: [-2.6, 2.6], label: "x" }], note: first ? "讲义的 \\(x_2\\)。" : fresh,
        parts: [{ q: "新输入对应的输出是哪一张？", ...o, hints: [R`先把新输入写成 \(x_1\) 的平移和缩放之和。`, R`\(x(t)=${termTex(ts, "x")}\)。time-invariant 让每一项的输出跟着平移，linear 让它们按同样的系数相加。`], sol: R`\(x(t)=${termTex(ts, "x")}\)，所以 \(y(t)=${termTex(ts, "y")}\)。每个矩形换成一个同样平移、同样符号的三角形；重叠的地方相加。` }] }; }, [LEC, OFF]),
    T("b356", "Problem 3.5.6 · 从三对输入输出能推出什么", [0], () => { const p = [[0, 1, "lin", 0, 1]], q = [[0, 1, "lin", 1, 0], [1, 2, "lin", -1, 2]], f = (terms, label) => ({ terms, x0: -0.5, x1: 4.5, y: [-1.4, 1.6], label }); const names = ["memoryless", "causal", "linear", "time-invariant"], tt = (v) => names.map((n, i) => n + "：" + (v[i] ? "可能" : "不可能")).join(" · "), good = [0, 1, 0, 1];
      return { stem: R`The system \(S\) has the three input–output pairs shown below. Determine whether the system could be memoryless, causal, linear, and time-invariant.`, figs: [f([{ pcs: p }], "x1"), f([{ pcs: q }], "y1"), f([{ pcs: p, c: -1, d: 2 }], "x2"), f([{ pcs: q, c: -1, d: 2 }], "y2"), f([{ pcs: p }, { pcs: p, d: 2 }], "x3"), f([{ pcs: q }, { pcs: q, c: -1, d: 2 }], "y3")],
        parts: [part("四个性质的结论是：", tt(good), [tt([0, 1, 1, 1]), tt([0, 0, 0, 0]), tt([1, 1, 0, 1]), tt([0, 1, 0, 0])], ["有限的几对数据只能否定一个性质，不能证明它成立。没被否定的只能说“可能”。", R`检查线性：\(x_3=x_1-x_2\)。线性要求 \(y_3=y_1-y_2\)，图里是这样吗？`], R`<b>memoryless 不可能</b>：\(t=1.5\) 时 \(x_1=x_2=0\)，但 \(y_1=\tfrac12\)、\(y_2=0\)。<br><b>linear 不可能</b>：\(x_3=x_1-x_2\)，线性要求 \(y_3=y_1-y_2\)，第二个三角形应该朝上，图里朝下。<br><b>causal 可能</b>：没有哪一对输出在输入历史分开之前就不同。<br><b>time-invariant 可能</b>：\(x_2=-x_1(t-2)\) 同时含平移和变号，time-invariance 单独管不了变号，而线性已经被否定。官方解答构造了一个同时 causal 且 time-invariant 的系统来说明“可能”。`)] }; }, [LEC, OFF]),
    T("b357", "Problem 3.5.7 · 二极管 RC 包络检波器", [0], () => { const names = ["linear", "memoryless", "causal"], tt = (v) => names.map((n, i) => n + "：" + yn(v[i])).join(" · ");
      return { stem: "输入 \\(v_{in}\\) 经过理想二极管接到并联的 \\(R\\) 和 \\(C\\)，输出 \\(v_{out}\\) 是电容电压。电容初始不带电。", parts: [part("这个系统是：", tt([0, 0, 1]), [tt([1, 0, 1]), tt([0, 1, 1]), tt([0, 0, 0])], ["用电路直觉想：输入一个正脉冲和一个负脉冲，输出分别是什么？", "输入回到 0 之后，电容上的电压马上消失吗？"], "<b>不是 linear</b>：正脉冲给电容充电，产生输出；负脉冲时二极管截止，输出为 0，\\(S(-v_{in})\\ne-S(v_{in})\\)。<br><b>不是 memoryless</b>：脉冲结束后输入为 0，输出却还在按 \\(e^{-t/RC}\\) 放电；当前输入相同，输出取决于之前有没有充过电。<br><b>是 causal</b>：电容电压只由初始状态和到当前为止的输入决定。")] }; }, [LEC, OFF]),
  ];

  /* ---------- exam questions ---------- */
  const exam = [
    warpType("e361", "Problem 3.6.1 (Jan 2023) · \\(y(t)=x(t^2)\\)", [EXAM, AI], ["sq", 3, 1 / 3, 0.5]),
    warpType("e362", "Problem 3.6.2 (Jan 2024) · \\(y(t)=x(2t)\\)", [EXAM, CHK], [2, 0.5, 3, 1 / 3], R`<br><b>关于官方解答</b>：2023-24 Official Solutions 的结论和这里一致（不是 memoryless、不是 causal、不是 time-invariant），但它举的例子是 \(y(2)=u(1)\) 和 \(y(-2)=u(-1)\)，这两个式子对应的是 \(u(t/2)\)，不是卷面上的 \(u(2t)\)。对 \(u(2t)\)，\(y(-2)=u(-4)\) 读的是过去，不能说明 noncausal。`),
    pairsType("e363", "Problem 3.6.3 (Jan 2025) · 由输入输出对判断线性系统", [EXAM, CHK], [[1, 2], [2, 1], [1, -1], [2, 2], [-1, 2]]),
    switchType("e364", "Problem 3.6.4 (Jan 2026) · 分段定义的系统", [EXAM, CHK], [[1, 1], [2, 1], [1, 2], [-1, 1], [1, -1], [3, 2]]),
  ];

  /* ---------- mock papers ---------- */
  const mk = (id, title, pool, make) => T(id, title, pool, make, [OWN]);
  const mocks = [
    { name: "模拟卷 A · 易", time: "建议 20 分钟", types: [
      mk("m3A1", "A1 · 时间缩放系统", [3, 0.5, 2, 1 / 3], (k) => ({ stem: R`Consider the system \(y(t)=${WARP[k].y}\) for all \(t\in\mathbb{R}\).`, parts: warpParts(WARP[k], [4, 4, 4]) })),
      mk("m3A2", "A2 · linear 和 time-invariant", [3, 0, 2, 1, 4], (i) => ({ stem: R`\[${P352[i][0]}\]`, parts: [{ ...part("这个系统是：", TWO[P352[i][1]], TWO.filter((_, k) => k !== P352[i][1]), ["先试把输入放大 \\(\\alpha\\) 倍。", "再比较延迟输入和延迟输出。"], P352[i][2]), marks: 4 }] })),
    ] },
    { name: "模拟卷 B · 真题难度", time: "建议 25 分钟", types: [
      mk("m3B1", "B1 · 线性系统的输入输出对", [[2, 1], [1, 2], [2, 2], [1, -1]], ([c1, c3]) => ({ stem: R`A linear system \(S\) has the input–output pairs shown below. 最后一张图是输入 \(x_4\)。`, figs: [...FIG316, { terms: [{ pcs: X1, c: c1 }, { pcs: X3, c: c3 }], x0: -0.5, x1: 4.5, y: [-2.6, 4.6], label: "x4" }], parts: pairsParts(c1, c3, false) })),
      mk("m3B2", "B2 · 四个性质", [5, 3, 6, 2, 7], (i) => ({ stem: R`\[${SYS[i].tex}\]`, parts: [{ ...partTuple(SYS[i]), marks: 6 }] })),
    ] },
    { name: "模拟卷 C · 偏难", time: "建议 30 分钟", types: [
      mk("m3C1", "C1 · 分段定义的系统", [[2, 2], [1, -1], [-1, 1], [3, 1], [2, -2]], ([c, k]) => ({ stem: R`\[y(t)=\begin{cases}${c},&t\lt 0,\\x(${sh(-k)}),&t\ge 0.\end{cases}\]`, parts: switchParts(c, k) })),
      mk("m3C2", "C2 · 只有线性时怎么求输出", [[2, 3, 2, 2], [4, 5, 2, 1], [3, 2, 5, 3]], ([A, w1, w2, ph]) => ({ stem: R`A linear system yields \(e^{j${w1}t}\mapsto ${A}e^{j${w2}t}\) and \(e^{-j${w1}t}\mapsto ${A}e^{-j${w2}t}\).`, parts: [{ ...part(R`输入 \(x(t)=\cos(${w1}t-${ph})\) 的输出是：`, M(A + R`\cos(${w2}t-${ph})`), [M(A + R`\cos(${w2}t-${ntex((ph * w2) / w1)})`), M(A + R`\cos(${w2}t)`), M(A + R`\cos(${w1}t-${ph})`)], ["用 Euler 公式把余弦拆成两个复指数，常数相位留在系数里。", "题目没有给 time-invariance。"], R`\(\cos(${w1}t-${ph})=\tfrac12\big(e^{-j${ph}}e^{j${w1}t}+e^{j${ph}}e^{-j${w1}t}\big)\)，逐项映射后得到 \(${A}\cos(${w2}t-${ph})\)。`), marks: 5 }] })),
    ] },
  ];

  window.BANK = Object.assign(window.BANK || {}, { basics, exam, mocks, ch3: { SYS, NAMES, partTuple, WARP, yn } });
})();
