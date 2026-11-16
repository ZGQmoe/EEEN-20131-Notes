/* Small helpers shared by every chapter's question bank: source tags, parameter pools, one-part questions. */
(function () {
  "use strict";
  const { pick, F, mcq } = QUIZ;
  const TAGS = { EXAM: ["exam", "真题"], CHK: ["off", "已对照官方解答"], AI: ["ai", "AI 解答"], OFF: ["off", "官方解答"], LEC: ["", "讲义 Problem"], OWN: ["ai", "自编"], BEYOND: ["", "超出考试范围"] };
  const fresh = "同题型，数字已更换，不是原题。";
  const state = {};
  /* first -> pool[0]; otherwise an entry different from the one shown last time */
  const draw = (id, pool, first) => (state[id] = first || pool.length < 2 ? pool[0] : pick(pool.filter((v) => v !== state[id])));
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /* n*pi/d as TeX */
  const piFrac = (n, d) => { const f = F(n, d); return f.d === 1 ? (f.n === 1 ? "" : f.n) + "\\pi" : "\\tfrac{" + (f.n === 1 ? "" : f.n) + "\\pi}{" + f.d + "}"; };
  const part = (q, good, bad, hints, sol, fill) => ({ q, ...mcq(good, bad, fill), hints, sol });
  /* a question type whose parameters come from a pool; make(params) returns one part or { stem, figs, parts } */
  const T = (id, title, pool, make, tags) => ({ id, title, tags: tags || [], vary: pool.length > 1, gen(first) {
    const p = make(draw(id, pool, first), first);
    return { stem: p.stem || "", figs: p.figs, note: p.note, parts: p.parts || [{ q: p.q, ...mcq(p.good, p.bad, p.fill), hints: p.hints, sol: p.sol, marks: p.marks }] };
  } });
  window.BANKLIB = { ...TAGS, TAGS, fresh, draw, gcd, piFrac, part, T };
})();
