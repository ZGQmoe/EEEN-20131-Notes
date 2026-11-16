/* TeX string helpers shared by every chapter's question bank. */
(function () {
  "use strict";
  const { ntex } = QUIZ;
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

  window.TEX = { M, sh, dl, us, win, sumTex, lin, expTex, pieceTex, wrap, wrapSq, casesTex, argTex, xat, setTex };
})();
