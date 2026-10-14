# EEEN20131 course workflow

## Scope and sources

- Maintain this repository only for EEEN20131 Signals and Systems.
- Use the current Canvas Modules release state for date-dependent lecture, tutorial, lab, assessment, and deadline claims.
- Use `Signals_and_System_02Oct.pdf` as the current full lecture-note reference until Canvas publishes a newer verified version.
- Keep Canvas status, the course teaching plan, and the user's confirmed progress distinct.

## Chapter workflow

1. The user reads the original lecture notes first.
2. During reading, check the user's explanation section by section; correct errors, connect concepts, and explain questions. Do not pre-write the chapter note.
3. After the user confirms the chapter reading is finished, complete every standard problem, exam question, and then advanced problem unless the user explicitly changes the order. Never infer completion.
4. Only after the user asks for the chapter write-up, create:
   - one concise, math-first concept note;
   - one separate representative-problem file based on the user's actual questions and useful methods;
   - only necessary diagrams, in a consistent style;
   - bidirectional links between concepts and representative problems;
   - a branching mind map, not a long numbered contents list.
5. Keep wording minimal: fragments, formulas, and short labels over prose; avoid gratuitous tables and excessive subheadings.
6. Check GitHub math compatibility, local links, SVG/XML, and the rendered GitHub page.
7. Commit or push only when the user explicitly asks.

## Note style / release checks

- Style reference: Chapter 2 concept note.
- Visible content: fragments, labels, formulas only. No complete explanatory sentences.
- Preserve assumptions and proof steps; shorten wording, not reasoning.
- Preserve anchors, concept/problem split, mind map and links; no repeated checklist or extra table.
- Keep the ordinary subject structure. User questions/traps belong beneath the relevant concept; no separate supplement, weakness report, or extra knowledge hierarchy.
- Representative problems stay in the existing problem file: full given data, task, essential solution, assumptions and concept links. Integrate related cases into an existing topic where possible.
- Powers/subscripts: explicit braces. Conjugate: ^{\ast}. Set braces: \lbrace, \rbrace.
- Display math outside HTML: fenced math. Folded answers: tested inline display-style math; no raw double-dollar blocks inside details.
- Diagram equations: typeset vector paths; stacked fractions; proper powers/subscripts. No slash fractions or caret-style exponents.
- Every upload: inspect all changed GitHub pages, expand every answer; check errors, raw TeX, clipping and image loading.
- Local link/XML checks alone do not verify rendering.
- Release gate: pre-push formula parsing + strict local link/fence checks + visual diagram review; post-push verification against the final pushed commit SHA.
- On GitHub: check every changed note/problem page; expand every answer; inspect math renderer errors, raw TeX, image loading and clipping. A code fence or zero error count alone is not proof of displayed math.
- If a repair is pushed, repeat the post-push check against that new final SHA. Never report an earlier revision as the final verification.
- Failed/unavailable final rendering check: report unverified, not passed. Do not promise that syntax parsing proves mathematical correctness.
- No Chapter 1 note currently; inspect before claiming coverage.

## Progress boundary

- A discussed item is not automatically mastered.
- A viewed answer is not automatically a completed problem.
- Advanced Problems remain outstanding until the user confirms completion.
