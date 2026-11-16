/* Multiple-choice practice engine.
   A question type is { id, title, tags, vary, gen(first) }.
   gen(first) returns { stem, given?, note?, parts: [{ q, opts, ans, hints, sol, marks? }] }.
   first === true asks for the original numbers; false asks for a fresh set.
   An option is an HTML string or { plot: spec, key } drawn with PLOT.draw.
   Flow per part: a wrong pick strikes that option and reveals the next hint; when the hints
   run out the full solution is shown. Results are kept in this browser only. */
(function () {
  "use strict";
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const int = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

  /* exact fractions */
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
  const fadd = (x, y) => F(x.n * y.d + y.n * x.d, x.d * y.d);
  const fsub = (x, y) => F(x.n * y.d - y.n * x.d, x.d * y.d);
  const fmul = (x, y) => F(x.n * y.n, x.d * y.d);
  const fval = (x) => x.n / x.d;
  const ftex = (x) => (x.d === 1 ? String(x.n) : (x.n < 0 ? "-" : "") + "\\tfrac{" + Math.abs(x.n) + "}{" + x.d + "}");
  /* a number that is an integer or a half/third/quarter, as TeX */
  const ntex = (v) => { for (const d of [1, 2, 3, 4, 5, 6]) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return ftex(F(Math.round(v * d), d)); return String(Math.round(v * 1000) / 1000); };

  const keyOf = (o) => (typeof o === "string" ? o : o.key || JSON.stringify(o));
  /* Build up to four distinct options with the correct one shuffled in. */
  function mcq(correct, wrongs, fill) {
    const seen = new Set([keyOf(correct)]), out = [];
    for (const w of wrongs) { if (out.length >= 3) break; if (w == null) continue; const k = keyOf(w); if (seen.has(k)) continue; seen.add(k); out.push(w); }
    let guard = 0;
    while (out.length < 3 && fill && guard++ < 60) { const w = fill(guard); if (w == null) continue; const k = keyOf(w); if (!seen.has(k)) { seen.add(k); out.push(w); } }
    const opts = shuffle([correct, ...out]);
    return { opts, ans: opts.indexOf(correct) };
  }
  /* A plot option; two plots that look the same get the same key so they are not offered twice. */
  function plotOpt(pcs, a, t0, x0, x1) {
    const sig = []; for (let i = 0; i <= 80; i++) sig.push(Math.round(PLOT.ev(pcs, a * (x0 + ((x1 - x0) * i) / 80 + 0.0131 - t0)) * 50));
    return { plot: { pcs, a, t0, x0, x1 }, key: "plot:" + sig.join(",") };
  }

  /* A plot option for a combination of shifted, scaled signals: terms [{ pcs, c, d }]. */
  function plotTerms(terms, x0, x1, y) {
    const sig = []; for (let i = 0; i <= 80; i++) sig.push(Math.round(PLOT.evTerms(terms, x0 + ((x1 - x0) * i) / 80 + 0.0131) * 50));
    return { plot: { terms, x0, x1, y }, key: "plot:" + sig.join(",") };
  }

  function renderMath(el) {
    if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }], throwOnError: false });
  }

  const LABEL = { ok: "✓ 一次做对", hint: "✓ 用了提示", sol: "看了解答", none: "未做" };
  let uid = 0;

  function render(root, types, o = {}) {
    const storeKey = o.storeKey || "pack-quiz";
    let store = {}; try { store = JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch (e) { store = {}; }
    const save = () => { try { localStorage.setItem(storeKey, JSON.stringify(store)); } catch (e) {} };
    const stats = document.createElement("div"); stats.className = "stats"; root.appendChild(stats);
    const scoreEl = o.score ? document.createElement("div") : null;
    const live = new Map();
    const showStats = () => {
      const n = types.filter((t) => store[t.id] === "ok" || store[t.id] === "hint").length;
      stats.textContent = "做对 " + n + " / " + types.length + " 题 · 记录只保存在这个浏览器里";
      if (scoreEl) {
        let got = 0, all = 0, open = 0;
        live.forEach((inst) => inst.parts.forEach((p) => { all += p.marks || 0; if (!p.done) open++; else if (p.wrong === 0) got += p.marks || 0; }));
        scoreEl.className = "score"; scoreEl.textContent = "得分 " + got + " / " + all + (open ? "（还有 " + open + " 问没答）" : "") + " · 第一次就选对才得分";
      }
    };

    types.forEach((type) => {
      const card = document.createElement("details"); card.className = "qcard"; if (o.open) card.open = true;
      card.innerHTML = '<summary><b></b><span class="tags"></span><span class="st"></span></summary><div class="qbody"></div>';
      card.querySelector("b").innerHTML = type.title;
      card.querySelector(".tags").innerHTML = (type.tags || []).map((t) => '<span class="tag ' + t[0] + '">' + t[1] + "</span>").join("");
      const st = card.querySelector(".st"), body = card.querySelector(".qbody");
      const setStatus = (v) => { st.className = "st " + (v || ""); st.textContent = LABEL[v || "none"]; };
      setStatus(store[type.id]);
      root.appendChild(card);
      renderMath(card.querySelector("summary"));

      function build(first) {
        const inst = type.gen(first); live.set(type.id, inst);
        body.innerHTML = "";
        const stem = document.createElement("div"); stem.className = "stem"; stem.innerHTML = inst.stem; body.appendChild(stem);
        if (inst.figs) { const g = document.createElement("div"); g.className = "figs"; inst.figs.forEach((f) => { const c = document.createElement("canvas"); c.width = 640; c.height = 300; g.appendChild(c); PLOT.draw(c, f); c._spec = f; }); body.appendChild(g); }
        if (inst.given) { const g = document.createElement("div"); g.className = "given"; const c = document.createElement("canvas"); c.width = 1120; c.height = 400; g.appendChild(c); body.appendChild(g); (inst.given.deriv ? PLOT.drawDerivative : PLOT.draw)(c, inst.given); c._spec = inst.given; }
        inst.parts.forEach((p) => {
          p.wrong = 0; p.done = false; p.neededSol = false;
          const el = document.createElement("div"); el.className = "part";
          const name = "q" + ++uid;
          el.innerHTML = '<div class="pq"></div><div class="opts"></div><button type="button">提交</button><div class="fb"></div>';
          el.querySelector(".pq").innerHTML = p.q + (p.marks ? ' <span class="muted">[' + p.marks + " 分]</span>" : "");
          const box = el.querySelector(".opts"), fb = el.querySelector(".fb"), btn = el.querySelector("button");
          const labels = p.opts.map((opt, i) => {
            const lab = document.createElement("label"); lab.className = "opt";
            lab.innerHTML = '<input type="radio" name="' + name + '" value="' + i + '"><span></span>';
            if (typeof opt === "string") lab.querySelector("span").innerHTML = opt;
            else { box.classList.add("plots"); const c = document.createElement("canvas"); c.width = 640; c.height = 320; lab.querySelector("span").replaceWith(c); PLOT.draw(c, opt.plot); c._spec = opt.plot; }
            box.appendChild(lab); return lab;
          });
          const finish = (how) => {
            p.done = true; btn.disabled = true; labels.forEach((l) => (l.querySelector("input").disabled = true)); labels[p.ans].classList.add("right");
            const s = document.createElement("div"); s.className = "s"; s.innerHTML = (how === "sol" ? "<b>完整解答</b>：" : "<b>解答</b>：") + p.sol; fb.appendChild(s); renderMath(s);
            if (inst.parts.every((x) => x.done)) {
              const worst = inst.parts.some((x) => x.neededSol) ? "sol" : inst.parts.some((x) => x.wrong > 0) ? "hint" : "ok";
              store[type.id] = worst; save(); setStatus(worst);
            }
            showStats();
          };
          btn.onclick = () => {
            const sel = el.querySelector("input:checked"); if (!sel) return;
            const i = +sel.value;
            if (i === p.ans) { const y = document.createElement("div"); y.innerHTML = '<span class="yes">对。</span>'; fb.appendChild(y); finish("ok"); return; }
            p.wrong++; labels[i].classList.add("wrong"); sel.checked = false; sel.disabled = true;
            if (p.wrong <= p.hints.length) {
              const h = document.createElement("div"); h.className = "h"; h.innerHTML = '<span class="no">不对。</span><b>提示 ' + p.wrong + "</b>：" + p.hints[p.wrong - 1]; fb.appendChild(h); renderMath(h);
            } else { const n = document.createElement("div"); n.innerHTML = '<span class="no">不对。提示用完了。</span>'; fb.appendChild(n); p.neededSol = true; finish("sol"); }
          };
          body.appendChild(el);
        });
        const foot = document.createElement("div"); foot.className = "foot";
        if (type.vary) { const b = document.createElement("button"); b.type = "button"; b.textContent = "换一组数字"; b.onclick = () => build(false); foot.appendChild(b); }
        if (inst.note) { const s = document.createElement("span"); s.innerHTML = inst.note; foot.appendChild(s); }
        if (foot.children.length) body.appendChild(foot);
        renderMath(body); showStats();
      }
      build(true);
    });
    if (scoreEl) root.appendChild(scoreEl);
    showStats();
  }

  /* redraw every canvas when the host page re-themes us */
  function redrawAll() { document.querySelectorAll("canvas").forEach((c) => { if (c._spec) (c._spec.deriv ? PLOT.drawDerivative : PLOT.draw)(c, c._spec); }); }

  window.QUIZ = { pick, shuffle, int, F, fadd, fsub, fmul, fval, ftex, ntex, mcq, plotOpt, plotTerms, render, renderMath, redrawAll };
})();
