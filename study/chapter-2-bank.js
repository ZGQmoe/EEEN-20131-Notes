/* Chapter 2 question bank, part 1: lecture-note Problems (2.6.x), exam questions (2.7.x), mock papers.
   The first instance of each exam question uses the numbers of the real paper; "换一组数字" keeps the
   question type and draws another signal from a small hand-checked pool. */
(function () {
  "use strict";
  const { pick, int, F, fadd, ftex, ntex, mcq } = QUIZ;
  const C = CH2, M = C.M, R = String.raw;
  const { EXAM, CHK, AI, OFF, LEC, OWN, fresh, draw, piFrac, gcd } = BANKLIB;

  /* ---------- signal pools ---------- */
  const TRI = [ // triangle-type signals with two transforms each (2.7.3)
    { pcs: [[0, 2, "lin", 1, 0], [2, 4, "lin", -1, 4]], tr: [[2, 2], [-1, -2]] },
    { pcs: [[0, 1, "lin", 2, 0], [1, 3, "lin", -1, 3]], tr: [[0.5, -1], [-2, 3]] },
    { pcs: [[-2, 0, "lin", 1, 2], [0, 2, "lin", -1, 2]], tr: [[2, 1], [-1, 3]] },
    { pcs: [[0, 3, "lin", 1, 0], [3, 4, "lin", -3, 12]], tr: [[-1, 1], [0.5, 2]] },
  ];
  const LIN24 = { pcs: [[-2, 0, "lin", 1, 0], [0, 2, "lin", -1, 2]], tr: [-2, 1] };
  const LIN25 = { pcs: [[-2, 0, "lin", -1, 3], [0, 3, "lin", 1, 0]], tr: [-1, 2] };
  const LINPOOL = [
    { pcs: [[-1, 0, "lin", 1, 2], [0, 2, "lin", -1, 2]], tr: [-1, 1] },
    { pcs: [[0, 1, "lin", 2, 1], [1, 3, "lin", -1, 3]], tr: [2, -1] },
    { pcs: [[-3, 0, "lin", -1, 0], [0, 1, "lin", 0, 2]], tr: [-1, -1] },
    { pcs: [[-1, 1, "lin", -1, 1], [1, 2, "lin", 1, 0]], tr: [0.5, 2] },
    { pcs: [[-2, 0, "lin", 1, 3], [0, 2, "lin", -2, 4]], tr: [-2, 1] },
  ];
  const EXPLIN = [ // [T, T2, A, k, shift]
    [2, 7, 2, 1, 2], [1, 4, 1, 2, 1], [3, 5, 3, 1, 2], [2, 4, 2, 3, -1],
  ];
  const STAIR = [
    { pcs: [[0, 1, "lin", 0, 1], [1, 2, "lin", 0, -2]], s: 1 },
    { pcs: [[0, 2, "lin", 0, 1], [2, 3, "lin", 0, 3]], s: 1 },
    { pcs: [[-1, 1, "lin", 0, 2], [1, 2, "lin", 0, -1]], s: 2 },
    { pcs: [[0, 1, "lin", 0, -1], [1, 3, "lin", 0, 2]], s: -1 },
    { pcs: [[-2, 0, "lin", 0, 3], [0, 1, "lin", 0, 1]], s: 1 },
  ];
  const letX = (pcs) => R`Let \(x\) be the signal defined by \[x(t)=${C.casesTex(pcs)}\]`;

  /* ---------- shared single-part builders ---------- */
  function partExpEnergy(A, k, marks) {
    const E = F(A * A, 2 * k);
    const o = mcq(M(ftex(E)), [M(ftex(F(A * A, k))), A > 1 ? M(ftex(F(A, 2 * k))) : M(ftex(F(1, k * k))), M("\\infty")], (g) => M(ftex(F(A * A, 2 * k + g))));
    return { q: R`Find the energy of the signal \(x(t)=${C.expTex(A, k, 0)}u(t)\) for all \(t\in\mathbb{R}\), where \(u\) is the unit step signal.`, marks, ...o,
      hints: [R`\(u(t)\) 让积分从 0 开始：\(E_\infty=\int_0^\infty|x(t)|^2dt\)。`, R`\(|${C.expTex(A, k, 0)}|^2=${A * A === 1 ? "" : A * A}e^{-${2 * k}t}\)：系数平方，指数乘 2。`],
      sol: R`\(E_\infty=\int_0^\infty ${A * A === 1 ? "" : A * A}e^{-${2 * k}t}dt=${ftex(E)}\)。` };
  }
  function partPeriodDef(marks) {
    const good = R`The smallest positive \(T\) such that \(x(t)=x(t+T)\) for all \(t\in\mathbb{R}\).`;
    const o = mcq(good, [R`Any \(T\gt 0\) such that \(x(t)=x(t+T)\) for all \(t\in\mathbb{R}\).`, R`The smallest positive \(T\) such that \(x(t)=x(t+T)\) for some \(t\in\mathbb{R}\).`, R`The length of time over which the signal is nonzero.`]);
    return { q: "Define the fundamental period of a periodic signal.", marks, ...o,
      hints: ["答案里要同时有三个要素：对所有 \\(t\\) 成立、\\(T\\) 是正数、取其中最小的。", "只说“某个 \\(T\\)”得到的是 period，不是 fundamental period。"],
      sol: "周期条件 \\(x(t)=x(t+T)\\) 对所有 \\(t\\) 成立；满足它的最小正数 \\(T\\) 是 fundamental period \\(T_0\\)。官方解答（2023-24 卷 Q1a）同样写的是 smallest positive number。" };
  }
  function partShiftPlot(pcs, s, marks) {
    const p = C.partTransform(pcs, 1, s, marks);
    p.q = R`Sketch the time-shifted signal \(${C.xat(1, s)}\) given by \(${C.xat(1, s)}(t)=x(${C.sh(s)})\). 哪一张是对的？`;
    return p;
  }
  function partPairEnergy(p, q, marks) {
    const o = mcq(M(String(p + q)), [M("0"), M(String((p + q) ** 2)), M("2"), M(String(Math.abs(q - p) || 1))], (g) => M(String(p + q + g)));
    return { q: R`Consider \(w(t)=${C.dl(-p)}-${C.dl(q)}\) and \(y(t)=\int_{-\infty}^{t}w(\tau)d\tau\). Calculate \(E_\infty\) for the signal \(y\).`, marks, ...o,
      hints: ["impulse 积分得到 step：\\(\\int_{-\\infty}^{t}\\delta(\\tau-t_0)d\\tau=u(t-t_0)\\)。", R`\(y(t)=${C.us(-p)}-${C.us(q)}\)，在 \(${-p}\le t\lt ${q}\) 上为 1。`],
      sol: R`\(y(t)=${C.us(-p)}-${C.us(q)}\)，是一个高 1、从 \(${-p}\) 到 \(${q}\) 的矩形。\(E_\infty=\int_{${-p}}^{${q}}1\,dt=${p + q}\)。` };
  }
  function partSumPeriod(w1, w2, marks, tex) {
    const g = gcd(w1, w2), T0 = piFrac(2, g), per = "周期，\\(T_0=";
    const o = mcq(per + T0 + "\\)", [per + piFrac(2, w1) + "\\)", per + piFrac(2, w2) + "\\)", "不是周期信号", per + piFrac(2, w1 * w2) + "\\)"]);
    return { q: R`Determine whether \(x(t)=${tex}\) is periodic. If it is, state its fundamental period.`, marks, ...o,
      hints: [R`两个分量的周期是 \(T_1=${piFrac(2, w1)}\) 和 \(T_2=${piFrac(2, w2)}\)。`, R`找最小的正整数 \(m,n\) 使 \(mT_1=nT_2\)，即 \(${w2}m=${w1}n\)。`],
      sol: R`\(mT_1=nT_2\Rightarrow ${w2}m=${w1}n\)，最小解 \(m=${w1 / g},\ n=${w2 / g}\)，所以 \(T_0=${w1 / g}\cdot${piFrac(2, w1)}=${T0}\)。` };
  }
  function partEP(kind, A, k) {
    const pair = (e, p) => R`\(E_\infty=${e},\ P_\infty=${p}\)`;
    let x, good, wrongs, h, sol;
    if (kind === "decay") { x = C.expTex(A, k, 0) + "u(t)"; const E = ftex(F(A * A, 2 * k)); good = pair(E, "0"); wrongs = [pair(E, E), pair("\\infty", "0"), pair(ftex(F(A * A, k)), "0")]; h = ["信号衰减到 0，先算能量积分是否收敛。", "能量有限时，平均功率一定是 0。"]; sol = R`\(E_\infty=\int_0^\infty ${A * A === 1 ? "" : A * A}e^{-${2 * k}t}dt=${E}\)，有限，所以 \(P_\infty=0\)。`; }
    else if (kind === "cexp") { x = (A === 1 ? "" : A) + "e^{-j(" + k + "t+\\pi/2)}"; good = pair("\\infty", String(A * A)); wrongs = [pair("\\infty", ftex(F(A * A, 2))), pair(String(A * A), "0"), pair("\\infty", String(A))]; h = [R`先求模：\(|x(t)|=${A}\)，对所有 \(t\) 都一样。`, "模恒定不衰减，能量无穷；平均功率是 \\(|x|^2\\) 的平均值。"]; sol = R`\(|x(t)|^2=${A * A}\) 恒定。\(E_\infty=\infty\)，\(P_\infty=\lim\frac{1}{2T}\int_{-T}^{T}${A * A}\,dt=${A * A}\)。`; }
    else if (kind === "two") { x = "e^{-" + (k === 1 ? "" : k) + "|t|}"; const E = ftex(F(1, k)); good = pair(E, "0"); wrongs = [pair(ftex(F(1, 2 * k)), "0"), pair("\\infty", "0"), pair(E, E)]; h = [R`\(|x(t)|^2=e^{-${2 * k}|t|}\) 是偶函数，算 \(t\gt 0\) 的一半再乘 2。`, "能量有限时，平均功率是 0。"]; sol = R`\(E_\infty=2\int_0^\infty e^{-${2 * k}t}dt=${E}\)，\(P_\infty=0\)。`; }
    else { x = (A === 1 ? "" : A) + "\\cos(" + (k === 1 ? "" : k) + "t)"; const P = ftex(F(A * A, 2)); good = pair("\\infty", P); wrongs = [pair("\\infty", String(A * A)), pair(P, "0"), pair("\\infty", "0")]; h = ["周期信号不衰减，总能量无穷。", R`用 \(\cos^2\theta=\frac{1+\cos2\theta}{2}\)，平方的平均值是多少？`]; sol = R`\(E_\infty=\infty\)。\(\cos^2\) 的平均值是 \(\tfrac12\)，所以 \(P_\infty=${P}\)，和频率无关。`; }
    const o = mcq(good, wrongs);
    return { q: R`Determine the values for \(E_\infty\) and \(P_\infty\) for \(x(t)=${x}\).`, ...o, hints: h, sol };
  }

  /* ---------- lecture-note Problems 2.6.x ---------- */
  const CART = [["\\sqrt2e^{j9\\pi/4}", "1+j", "1-j", "-1+j", "\\sqrt2+j\\sqrt2", "\\(9\\pi/4=2\\pi+\\pi/4\\)，所以等于 \\(\\sqrt2e^{j\\pi/4}=\\sqrt2(\\tfrac{\\sqrt2}{2}+j\\tfrac{\\sqrt2}{2})=1+j\\)。"],
    ["\\tfrac13e^{j\\pi}", "-\\tfrac13", "\\tfrac13", "j\\tfrac13", "-j\\tfrac13", "\\(e^{j\\pi}=\\cos\\pi+j\\sin\\pi=-1\\)。"],
    ["e^{j\\pi/3}", "\\tfrac12+j\\tfrac{\\sqrt3}{2}", "\\tfrac{\\sqrt3}{2}+j\\tfrac12", "\\tfrac12-j\\tfrac{\\sqrt3}{2}", "-\\tfrac12+j\\tfrac{\\sqrt3}{2}", "\\(\\cos\\tfrac\\pi3=\\tfrac12\\)，\\(\\sin\\tfrac\\pi3=\\tfrac{\\sqrt3}{2}\\)。"],
    ["\\sqrt2e^{-j9\\pi/4}", "1-j", "1+j", "-1-j", "\\sqrt2-j\\sqrt2", "等于 \\(\\sqrt2e^{-j\\pi/4}=1-j\\)，和 \\(\\sqrt2e^{j9\\pi/4}\\) 互为共轭。"],
    ["2e^{j\\pi/2}", "2j", "2", "-2j", "-2", "\\(e^{j\\pi/2}=j\\)。"],
    ["4e^{-j\\pi}", "-4", "4", "-4j", "4j", "\\(e^{-j\\pi}=-1\\)。"],
    ["2e^{j2\\pi/3}", "-1+j\\sqrt3", "1+j\\sqrt3", "-\\sqrt3+j", "-1-j\\sqrt3", "\\(\\cos\\tfrac{2\\pi}{3}=-\\tfrac12\\)，\\(\\sin\\tfrac{2\\pi}{3}=\\tfrac{\\sqrt3}{2}\\)。"],
    ["\\sqrt2e^{j5\\pi/4}", "-1-j", "1+j", "-1+j", "1-j", "\\(5\\pi/4\\) 在第三象限，实部虚部都是负的。"],
    ["3e^{j5\\pi/2}", "3j", "-3j", "3", "-3", "\\(5\\pi/2=2\\pi+\\pi/2\\)。"]];
  const POLAR = [["(1-j)^2", "2e^{-j\\pi/2}", "2e^{j\\pi/2}", "\\sqrt2e^{-j\\pi/2}", "2e^{-j\\pi/4}", "先展开：\\((1-j)^2=1-2j+j^2=-2j\\)，模 2，辐角 \\(-\\pi/2\\)。"],
    ["-2", "2e^{j\\pi}", "2e^{-j\\pi}", "-2e^{j0}", "2e^{j0}", "模是 2。范围 \\(-\\pi\\lt\\theta\\le\\pi\\) 里负实数的辐角取 \\(\\pi\\)，不取 \\(-\\pi\\)；模不能是负数。"],
    ["1+j", "\\sqrt2e^{j\\pi/4}", "2e^{j\\pi/4}", "\\sqrt2e^{-j\\pi/4}", "\\sqrt2e^{j3\\pi/4}", "\\(r=\\sqrt{1+1}=\\sqrt2\\)，第一象限，\\(\\theta=\\pi/4\\)。"],
    ["j5", "5e^{j\\pi/2}", "5e^{j\\pi}", "5e^{-j\\pi/2}", "5e^{j0}", "正虚轴上，\\(\\theta=\\pi/2\\)。"],
    ["\\sqrt2+j\\sqrt2", "2e^{j\\pi/4}", "\\sqrt2e^{j\\pi/4}", "4e^{j\\pi/4}", "2e^{j\\pi/2}", "\\(r=\\sqrt{2+2}=2\\)。"],
    ["-1-j", "\\sqrt2e^{-j3\\pi/4}", "\\sqrt2e^{j5\\pi/4}", "\\sqrt2e^{j3\\pi/4}", "\\sqrt2e^{-j\\pi/4}", "第三象限。\\(5\\pi/4\\) 超出了 \\((-\\pi,\\pi]\\)，要写成 \\(-3\\pi/4\\)。"],
    ["-3j", "3e^{-j\\pi/2}", "3e^{j3\\pi/2}", "3e^{j\\pi/2}", "-3e^{j\\pi/2}", "负虚轴上，\\(\\theta=-\\pi/2\\)。"],
    ["1-j\\sqrt3", "2e^{-j\\pi/3}", "2e^{j\\pi/3}", "2e^{-j\\pi/6}", "4e^{-j\\pi/3}", "\\(r=\\sqrt{1+3}=2\\)，第四象限，\\(\\tan\\theta=-\\sqrt3\\)。"]];
  const conv = (id, title, pool, q, hints) => ({ id, title, tags: [LEC, OFF], vary: true, gen(first) {
    const v = draw(id, pool, first), o = mcq(M(v[1]), [M(v[2]), M(v[3]), M(v[4])]);
    return { stem: q(v[0]), note: first ? "" : fresh, parts: [{ q: "选出正确的一项。", ...o, hints, sol: v[5] }] };
  } });

  const basics = [
    conv("b261", "Problem 2.6.1 · 极坐标 → 直角坐标", CART, (e) => R`Express \(${e}\) in Cartesian form \((x+jy)\).`, ["\\(re^{j\\theta}=r\\cos\\theta+jr\\sin\\theta\\)。", "角度先减掉 \\(2\\pi\\) 的整数倍，再看落在哪个象限。"]),
    conv("b262", "Problem 2.6.2 · 直角坐标 → 极坐标", POLAR, (e) => R`Express \(${e}\) in polar form \((re^{j\theta}\), with \(-\pi\lt\theta\le\pi)\).`, ["\\(r=\\sqrt{x^2+y^2}\\ge 0\\)，\\(\\theta\\) 按象限取。", "检查 \\(\\theta\\) 是否落在 \\((-\\pi,\\pi]\\) 里。"]),
    { id: "b263", title: "Problem 2.6.3 · \\(E_\\infty\\) 和 \\(P_\\infty\\)", tags: [LEC, OFF], vary: true, gen(first) {
      const v = draw("b263", [["decay", 1, 2], ["cexp", 1, 2], ["two", 1, 1], ["cos", 1, 1], ["decay", 2, 3], ["cexp", 3, 4], ["two", 1, 2], ["cos", 4, 5], ["decay", 3, 1], ["cos", 2, 3]], first);
      return { stem: "讲义原题有四个信号，这里一次出一个。", note: first ? "" : fresh, parts: [partEP(v[0], v[1], v[2])] };
    } },
    { id: "b264", title: "Problem 2.6.4 · 哪些时刻一定为 0", tags: [LEC, OFF], vary: true, gen(first) {
      const v = draw("b264", [[-1, -1, 3], [3, 0, 3], [0.5, 0, 3], [-1, -2, 3], [2, 1, 4], [-2, 0, 2], [-0.5, 1, 1]], first), [a, t0, c] = v, b = t0 + c / a;
      const opt = (gt, val) => M("t" + (gt ? "\\gt " : "\\lt ") + ntex(val));
      const o = mcq(opt(a < 0, b), [opt(a > 0, b), opt(a < 0, t0 + c * a), opt(a < 0, t0 - c / a), opt(a > 0, c)], (g) => opt(a < 0, b + g));
      return { stem: R`Let \(x\) be a signal with \(x(t)=0\) for all \(t\lt ${c}\). Determine the values of \(t\) where \(${C.xat(a, t0)}(t)=x\big(${C.argTex(a, t0)}\big)\) is guaranteed to be zero.`, note: first ? "" : fresh,
        parts: [{ q: "一定为 0 的范围是：", ...o, hints: [R`\(${C.xat(a, t0)}(t)\) 读的是原信号在 \(${C.argTex(a, t0)}\) 处的值。这个位置小于 \(${c}\) 时结果一定是 0。`, R`解不等式 \(${C.argTex(a, t0)}\lt ${c}\)。` + (a < 0 ? "两边除以负数，不等号要反向。" : "")],
          sol: R`\(${C.argTex(a, t0)}\lt ${c}\Rightarrow t${a < 0 ? "\\gt " : "\\lt "}${ntex(b)}\)。` }] };
    } },
    { id: "b265", title: "Problem 2.6.5 · 判断周期", tags: [LEC, OFF], vary: true, gen(first) {
      const v = draw("b265", [["sum", 10, 4], ["exp", 10], ["const", 10], ["grow", 10], ["exp", 5], ["sum", 6, 9], ["grow", 3], ["const", 4], ["sum", 4, 6], ["exp", 8]], first);
      if (v[0] === "sum") return { stem: "讲义原题有五个信号，这里一次出一个。", note: first ? "" : fresh, parts: [partSumPeriod(v[1], v[2], 0, R`2\cos(${v[1]}t+1)-\sin(${v[2]}t-1)`)] };
      const w = v[1], per = "周期，\\(T_0=", T0 = piFrac(2, w);
      const x = v[0] === "exp" ? "4e^{-j" + w + "t}" : v[0] === "const" ? "\\tfrac12e^{1+j" + w + "t}" : "\\tfrac12e^{(1+j" + w + ")t}";
      const good = v[0] === "grow" ? "不是周期信号" : per + T0 + "\\)";
      const o = mcq(good, [v[0] === "grow" ? per + T0 + "\\)" : "不是周期信号", per + piFrac(1, w) + "\\)", per + piFrac(4, w) + "\\)", per + piFrac(w, 2).replace("\\pi", "") + "/\\pi\\)"]);
      return { stem: R`Determine whether \(x(t)=${x}\) is periodic. If it is, state its fundamental period.`, note: first ? "" : fresh,
        parts: [{ q: "选出正确的一项。", ...o, hints: ["先把指数里的实部和虚部分开：实部有没有乘 \\(t\\)？", R`\(Ae^{j\omega t}\) 的 \(T_0=2\pi/|\omega|\)，常数系数不影响周期；带 \(e^{\sigma t}\)（\(\sigma\ne 0\)）就不周期。`],
          sol: v[0] === "grow" ? R`\(x(t)=\tfrac12e^{t}e^{j${w}t}\)，模 \(\tfrac12e^{t}\) 一直在变，不是周期信号。` : v[0] === "const" ? R`\(x(t)=\tfrac{e}{2}e^{j${w}t}\)，\(e^{1}\) 只是常数系数。周期，\(T_0=\tfrac{2\pi}{${w}}=${T0}\)。` : R`模恒为 4。周期，\(T_0=\tfrac{2\pi}{${w}}=${T0}\)。` }] };
    } },
    { id: "b266", title: "Problem 2.6.6 · impulse 对积分后的能量", tags: [LEC, OFF], vary: true, gen(first) {
      const v = draw("b266", [[2, 2], [1, 3], [3, 1], [1, 2], [4, 1]], first);
      return { stem: "", note: first ? "" : fresh, parts: [partPairEnergy(v[0], v[1], 0)] };
    } },
    { id: "b267", title: "Problem 2.6.7 · 矩形脉冲和它的导数", tags: [LEC, OFF], vary: true, gen(first) {
      const v = draw("b267", [["a", "b"], [1, 3], [-2, 1], [0, 4], [-3, -1]], first), sym = typeof v[0] === "string";
      const U = (s, x) => (sym ? "u(" + (s > 0 ? "t-" + x : x + "-t") + ")" : s > 0 ? C.us(x) : "u(" + ntex(x) + "-t)"), D = (x) => (sym ? "\\delta(t-" + x + ")" : C.dl(x));
      const [a, b] = v, o1 = mcq(M(U(1, a) + U(-1, b)), [M(U(1, a) + U(1, b)), M(U(-1, a) + U(-1, b)), M(U(1, a) + "+" + U(-1, b))]);
      const o2 = mcq(M(D(a) + "-" + D(b)), [M(D(a) + "+" + D(b)), M(D(b) + "-" + D(a)), M(U(1, a) + "-" + U(1, b))]);
      return { stem: R`The signal \(x\) is given by \(x(t)=1\) for \(${sym ? "a" : a}\le t\lt ${sym ? "b" : b}\), and \(0\) otherwise.`, note: first ? "" : fresh, parts: [
        { q: "哪个 step 的乘积表示这个信号？", ...o1, hints: [R`\(u(t-a)\) 在 \(t\ge a\) 时为 1。什么样的 step 在 \(t\le b\) 时为 1？`, "两个因子同时为 1 的区间要正好是脉冲所在的区间。"], sol: R`\(${U(1, a)}\) 在左端打开，\(${U(-1, b)}\) 在右端关闭，乘积只在两者之间为 1。官方解答补充：乘积写法在右端点这一个点上的取值和定义不同，但单点不影响能量和广义导数。` },
        { q: "它的导数是：", ...o2, hints: ["把脉冲写成两个 step 的差再逐项求导，或者直接看两处跳变。", "左端向上跳 1，右端向下跳 1。"], sol: R`\(x(t)=${U(1, a)}-${U(1, b)}\)，所以 \(\dot x(t)=${D(a)}-${D(b)}\)。` }] };
    } },
    { id: "b268", title: "Problem 2.6.8 · 台阶信号：step 表示与求导", tags: [LEC, OFF], vary: true, gen(first) {
      const v = draw("b268", STAIR, first);
      return { stem: R`Consider the signal \[x(t)=${C.casesTex(v.pcs)}\]`, note: first ? "" : fresh, parts: [C.partSketch(v.pcs), C.partDerivativeLin(v.pcs), C.partStepJumps(v.pcs)] };
    } },
    { id: "b269", title: "Problem 2.6.9 · 分段信号：能量、断点、与 impulse 相乘", tags: [LEC, OFF], vary: true, gen(first) {
      const pcs = [[-2, -1, "lin", 1, 1], [-1, 0, "lin", 0, 1], [0, 1, "lin", 0, 3], [1, 2, "lin", -2, 3]];
      const v = draw("b269", [[-0.5, -4, -1.5], [1, 1, 0.5], [-1, -2, -0.5], [2, -1, 1.5]], first), [a, t0, t1] = v;
      const b = [-2, -1, 0, 1, 2], img = (A, T) => b.map((x) => T + x / A).sort((p, q) => p - q);
      const o1 = mcq(M(C.setTex(img(a, t0))), [M(C.setTex(img(a, -t0))), M(C.setTex(img(1 / a, t0))), M(C.setTex(b.map((x) => a * (x - t0)).sort((p, q) => p - q)))], (g) => M(C.setTex(img(a, t0 + g))));
      const xv = PLOT.ev(pcs, t1), term = (c) => (c === 0 ? "0" : C.sumTex([{ c, tex: C.dl(t1) }]));
      const o2 = mcq(M(term(xv)), [M(ntex(xv)), M(term(1)), M(term(-xv || 2))], (g) => M(term(xv + g)));
      return { stem: letX(pcs), note: first ? "" : fresh + "信号本身不变，换的是变换参数和 impulse 的位置。", parts: [
        C.partEnergyLin(pcs),
        { q: R`\(${C.xat(a, t0)}(t)=x\big(${C.argTex(a, t0)}\big)\) 的断点位置是：`, ...o1, hints: [R`原断点 \(\tau\in${C.setTex(b)}\)，每个搬到 \(t=t_0+\tau/a\)。`, R`这里 \(t=${ntex(t0)}${1 / a < 0 ? "-" : "+"}${Math.abs(1 / a) === 1 ? "" : ntex(Math.abs(1 / a))}\tau\)。`], sol: R`\(t=t_0+\tau/a\)，五个断点搬到 \(${C.setTex(img(a, t0))}\)。完整的图见官方解答手册 Problem 2.6.9，也可以在笔记页的交互图里核对。` },
        { q: R`\(x(t)\,${C.dl(t1)}\) 等于：`, ...o2, hints: [R`Sampling property：\(x(t)\delta(t-t_1)=x(t_1)\delta(t-t_1)\)，结果仍然是一个 impulse。`, R`只需要 \(x(${ntex(t1)})\)。先看 \(t=${ntex(t1)}\) 落在哪一段。`], sol: R`\(x(${ntex(t1)})=${ntex(xv)}\)，所以结果是 \(${term(xv)}\)。` + (xv === 0 ? "系数为 0，这个 impulse 消失。" : "") }] };
    } },
  ];

  /* ---------- exam questions 2.7.x ---------- */
  const noteOf = (first) => (first ? "数字和真题一致。" : fresh);
  const linExam = (id, title, base, dMarks, extra) => ({ id, title, tags: [EXAM, CHK], vary: true, gen(first) {
    const v = draw(id, [base, ...LINPOOL], first);
    return { stem: letX(v.pcs), note: noteOf(first), parts: [C.partEnergyLin(v.pcs, 3), C.partSketch(v.pcs, 1), C.partTransform(v.pcs, v.tr[0], v.tr[1], 3), C.partDerivativeLin(v.pcs, dMarks, first ? extra : "")] };
  } });
  const exam = [
    { id: "e271", title: "Problem 2.7.1 (Jan 2023) · 能量", tags: [EXAM, AI], vary: true, gen(first) {
      const v = draw("e271", [[1, 3], [1, 5], [2, 1], [3, 2], [2, 4], [1, 7]], first);
      return { stem: "", note: noteOf(first), parts: [partExpEnergy(v[0], v[1], 3)] };
    } },
    { id: "e272", title: "Problem 2.7.2 (Jan 2024) · 定义", tags: [EXAM, CHK], vary: false, gen() { return { stem: "", parts: [partPeriodDef(2)] }; } },
    { id: "e273", title: "Problem 2.7.3 (Jan 2023) · 画变换后的信号", tags: [EXAM, AI], vary: true, gen(first) {
      const v = draw("e273", TRI, first);
      return { stem: R`A continuous-time signal \(x\) is defined by \[x(t)=${C.casesTex(v.pcs)}\]`, note: noteOf(first), parts: [C.partSketch(v.pcs, 1), C.partTransform(v.pcs, v.tr[0][0], v.tr[0][1], 3), C.partTransform(v.pcs, v.tr[1][0], v.tr[1][1], 3)] };
    } },
    linExam("e274", "Problem 2.7.4 (Jan 2024) · 能量、画图、求导", LIN24, 3, "官方评分里这一问是 4 分（两个 impulse 各 1 分，分段斜率 2 分），讲义印的是 3 分。"),
    linExam("e275", "Problem 2.7.5 (Jan 2025) · 能量、画图、求导", LIN25, 4, "<b>和官方解答有一处不一致</b>：2024-25 Official Solutions 手写的最后一项是 \\(+3\\delta(t-3)\\)。信号在 \\(t=3\\) 处从 3 降到 0，按讲义的规则跳变量是 \\(-3\\)，这里保留 \\(-3\\delta(t-3)\\)。建议问老师确认。"),
    { id: "e276", title: "Problem 2.7.6 (Jan 2026) · 指数段：能量、平移、step、impulse", tags: [EXAM, CHK], vary: true, gen(first) {
      const [T, T2, A, k, s] = draw("e276", EXPLIN, first), pcs = C.expLinPcs(T, T2, A, k);
      return { stem: R`Consider the signal \(x\) defined by \[x(t)=${C.casesTex(pcs)}\]`, note: noteOf(first), parts: [C.partEnergyExpLin(T, T2, A, k, 3), partShiftPlot(pcs, s, 2), C.partStepWindows(pcs, 3), C.partImpulseExpLin(T, T2, A, k, 3)] };
    } },
  ];

  /* ---------- mock papers: same part builders, fresh numbers each time ---------- */
  const mk = (id, title, vary, gen) => ({ id, title, tags: [OWN], vary, gen });
  function partEnergyDef(marks) {
    const o = mcq(R`\(E_\infty=\displaystyle\int_{-\infty}^{\infty}|x(t)|^2dt\)`, [R`\(E_\infty=\displaystyle\int_{-\infty}^{\infty}x(t)\,dt\)`, R`\(E_\infty=\displaystyle\int_{-\infty}^{\infty}|x(t)|\,dt\)`, R`\(E_\infty=\displaystyle\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2dt\)`]);
    return { q: "State the definition of the total energy \\(E_\\infty\\) of a signal \\(x\\).", marks, ...o, hints: ["能量来自电阻上的功率 \\(v^2/R\\) 对时间的累加，所以被积函数是平方。", "带 \\(\\frac{1}{2T}\\) 的那个是平均功率 \\(P_\\infty\\)。"], sol: "\\(E_\\infty=\\int_{-\\infty}^{\\infty}|x(t)|^2dt\\)。模号对复信号是必须的。" };
  }
  const mocks = [
    { name: "模拟卷 A · 易", time: "建议 20 分钟", types: [
      mk("mA1", "A1 · 定义", false, () => ({ stem: "", parts: [partEnergyDef(2)] })),
      mk("mA2", "A2 · 能量", true, (first) => { const v = draw("mA2", [[1, 4], [2, 3], [1, 6], [3, 1]], first); return { stem: "", parts: [partExpEnergy(v[0], v[1], 3)] }; }),
      mk("mA3", "A3 · 台阶信号", true, (first) => { const v = draw("mA3", [STAIR[1], STAIR[2], STAIR[3], STAIR[4]], first); return { stem: letX(v.pcs), parts: [C.partSketch(v.pcs, 1), C.partEnergyLin(v.pcs, 3), partShiftPlot(v.pcs, v.s, 2), C.partStepJumps(v.pcs, 3), C.partDerivativeLin(v.pcs, 3)] }; }),
    ] },
    { name: "模拟卷 B · 真题难度", time: "建议 25 分钟", types: [
      mk("mB1", "B1 · 定义", false, () => ({ stem: "", parts: [partPeriodDef(2)] })),
      mk("mB2", "B2 · 能量与功率", true, (first) => { const v = draw("mB2", [["cexp", 2, 3], ["cos", 2, 5], ["cexp", 3, 2], ["two", 1, 3]], first), p = partEP(v[0], v[1], v[2]); p.marks = 3; return { stem: "", parts: [p] }; }),
      mk("mB3", "B3 · 分段线性信号", true, (first) => { const v = draw("mB3", [{ pcs: [[-1, 1, "lin", 1, 2], [1, 3, "lin", -1, 3]], tr: [-2, 1] }, ...LINPOOL], first); return { stem: letX(v.pcs), parts: [C.partEnergyLin(v.pcs, 3), C.partSketch(v.pcs, 1), C.partTransform(v.pcs, v.tr[0], v.tr[1], 3), C.partDerivativeLin(v.pcs, 4)] }; }),
    ] },
    { name: "模拟卷 C · 偏难", time: "建议 35 分钟", types: [
      mk("mC1", "C1 · 周期", true, (first) => { const v = draw("mC1", [[4, 6], [6, 9], [10, 4], [8, 12], [6, 15]], first); return { stem: "", parts: [partSumPeriod(v[0], v[1], 3, R`\cos(${v[0]}t)+\sin(${v[1]}t)`)] }; }),
      mk("mC2", "C2 · 斜坡加指数", true, (first) => { const [T, T2, A, k, s] = draw("mC2", [EXPLIN[2], EXPLIN[1], EXPLIN[3], EXPLIN[0]], first), pcs = C.expLinPcs(T, T2, A, k); return { stem: letX(pcs), parts: [C.partEnergyExpLin(T, T2, A, k, 3), C.partStepWindows(pcs, 3), C.partTransform(pcs, -1, s, 3), C.partImpulseExpLin(T, T2, A, k, 4)] }; }),
      mk("mC3", "C3 · impulse 对", true, (first) => { const v = draw("mC3", [[1, 3], [2, 5], [3, 2], [1, 4]], first); return { stem: "", parts: [partPairEnergy(v[0], v[1], 3)] }; }),
    ] },
  ];

  window.BANK = Object.assign(window.BANK || {}, { basics, exam, mocks, lib: { partExpEnergy, partSumPeriod, partPairEnergy } });
})();
