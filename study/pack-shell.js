/* Page shell for a chapter's practice page: one part per #hash, rendered with QUIZ from window.BANK. */
window.PACKSHELL = function (cfg) {
  "use strict";
  const PARTS = Object.assign({
    concepts: ["概念题", "只考概念，题型固定。点“换一组数字”可以反复刷同一个题型。选错一次给一条提示，提示用完给完整解答。"],
    basics: ["基础题", "讲义本章的 Problems，改成了选择题。第一次出现的是讲义原题，解答按官方解答手册。"],
    exam: ["真题", "讲义本章收录的真题。第一次出现的是真题的数字；能找到 Official Solutions 的已逐问对照。"],
    tricky: ["变式", "自编。挑的是这一章里冷门但容易丢分的角度，不是把真题换个数字。"],
    mocks: ["模拟卷", "自编，题型和分值仿照真题。每一问第一次就选对才得分。"],
    extension: ["延伸", "前面都做完再看。来自讲义 Advanced problems 和少量自编，难度或范围超出考试常规。"],
  }, cfg.parts || {});
  const nav = document.querySelector("nav"), root = document.getElementById("root"), intro = document.getElementById("intro");
  nav.innerHTML = Object.entries(PARTS).map(([k, v]) => `<button role="tab" data-k="${k}">${v[0]}</button>`).join("");
  function show(k) {
    if (!PARTS[k]) k = "concepts";
    nav.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.k === k));
    intro.textContent = PARTS[k][1]; root.innerHTML = "";
    if (k === "mocks") BANK.mocks.forEach((paper, i) => {
      const h = document.createElement("h2"); h.textContent = paper.name; const s = document.createElement("small"); s.textContent = "  " + paper.time; h.appendChild(s); root.appendChild(h);
      const box = document.createElement("div"); root.appendChild(box);
      QUIZ.render(box, paper.types, { storeKey: cfg.prefix + "-mock" + i, score: true });
    });
    else QUIZ.render(root, BANK[k], { storeKey: cfg.prefix + "-" + k });
    document.querySelectorAll('a[href^="http"]').forEach((a) => (a.target = "_top"));
  }
  nav.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) location.hash = b.dataset.k; });
  addEventListener("hashchange", () => show(location.hash.slice(1)));
  show(location.hash.slice(1));
  new MutationObserver(() => setTimeout(QUIZ.redrawAll, 30)).observe(document.head, { childList: true, subtree: true, characterData: true });
  matchMedia("(prefers-color-scheme:dark)").addEventListener("change", QUIZ.redrawAll);
};
