<!-- AI-assisted practice set: based on Chapter 3 discussion, Signals_and_System_02Oct.pdf, and SnS_Systems.pdf slides 1-34. -->

# Chapter 3 — Representative Problems

[Concept map](./chapter-3-systems-and-properties.md#map) · selected D0/D+1/D+3 redo set

Scope: through 3.5.6 + 3.5.7 circuit discussion · discussion ≠ completion / mastery · standard / exam / advanced still in scope

---

<a id="p1-invertibility"></a>

## P1 — Information Loss

Tests: [invertibility](./chapter-3-systems-and-properties.md#invertibility)

Invertibility:

```math
(P_{k}x)(t)=kx(t),
\qquad
(Rx)(t)=\max\lbrace 0,x(t)\rbrace .
```

<details>
<summary>Answer</summary>

For $k\ne0$:

$\displaystyle P_{k}^{-1}=P_{1/k}.$

For $k=0$:

$\displaystyle P_{0}x=0\quad\forall x.$

Zero output → nonunique input → no inverse

Rectifier counterexample:

$\displaystyle x_{1}(t)=-1, \qquad x_{2}(t)=-2,$

$\displaystyle x_{1}\ne x_{2}, \qquad Rx_{1}=Rx_{2}=0.$

Many-to-one → not invertible.

</details>

---

<a id="p2-integration-differentiation"></a>

## P2 — Integration / Differentiation

Tests: [invertibility](./chapter-3-systems-and-properties.md#invertibility)

Let the anchored integrator $I_{0}$ be

```math
(I_{0}x)(t)=\int_{0}^{t} x(\tau)d\tau,
\qquad
(Dx)(t)=x'(t).
```

$DI_{0}x$ · $I_{0}Dx$ · information loss

<details>
<summary>Answer</summary>

Fundamental theorem:

$\displaystyle DI_{0}x =\frac{d}{dt}\int_{0}^{t} x(\tau)d\tau =x(t).$

But:

$\displaystyle I_{0}Dx =\int_{0}^{t} x'(\tau)d\tau =x(t)-x(0).$

Derivative → lost constant

Example:

$\displaystyle x(t)=t^{2}+3 \xrightarrow{D} 2t \xrightarrow{I} t^{2}.$

$I_{0}D=P_{1}$: $x(0)=0$

</details>

---

<a id="p3-backward-energy"></a>

## P3 — Backward Energy

Tests: [finite-energy stability](./chapter-3-systems-and-properties.md#stability)

For

```math
(Bx)(t)=x(-t),
```

$E_{Bx}=E_{x}$?

<details>
<summary>Answer</summary>

$\displaystyle E_{Bx}=\int_{-\infty}^{\infty}|x(-t)|^{2}dt.$

Let $\tau=-t$:

$\displaystyle d\tau=-dt, \qquad t:-\infty\to\infty \Rightarrow \tau:\infty\to-\infty.$

$\displaystyle \begin{aligned} E_{Bx} &=\int_{\infty}^{-\infty}|x(\tau)|^{2}(-d\tau)\\ &=\int_{-\infty}^{\infty}|x(\tau)|^{2}d\tau\\ &=E_{x}. \end{aligned}$

Reversal → same area

</details>

---

<a id="p4-marginal-integrator"></a>

## P4 — Truncated Input → Constant Output

Tests: [switch-off stability](./chapter-3-systems-and-properties.md#stability)

Let

```math
y(t)=\int_{-\infty}^{t}x(\tau)d\tau,
```

$x(t)=0$ for $t>t_{0}$ · long-term response?

<details>
<summary>Answer</summary>

For $t>t_{0}$:

$\displaystyle \begin{aligned} y(t) &=\int_{-\infty}^{t_{0}}x(\tau)d\tau +\int_{t_{0}}^{t}0\thinspace d\tau\\ &=C. \end{aligned}$

Choose

$\displaystyle t_{1}=t_{0}, \qquad M=|C|.$

Then

$\displaystyle |y(t)|\le M, \qquad \forall t\ge t_{1}.$

Bounded · persistent constant → marginal (switch-off)

</details>

---

<a id="p5-modified-integrator"></a>

## P5 — Modified Integrator

Tests: [switch-off stability](./chapter-3-systems-and-properties.md#stability)

Consider

```math
y(t)=t\int_{-\infty}^{t}x(\tau)d\tau
```

with

```math
x(t)=
\begin{cases}
1,&0\le t<1\\
0,&\text{otherwise}.
\end{cases}
```

$y(t)$ · stability

<details>
<summary>Answer</summary>

$\displaystyle \int_{-\infty}^{t}x(\tau)d\tau = \begin{cases} 0,&t<0\\ t,&0\le t<1\\ 1,&t\ge1. \end{cases}$

Hence:

$\displaystyle y(t)= \begin{cases} 0,&t<0\\ t^{2},&0\le t<1\\ t,&t\ge1. \end{cases}$

After switch-off:

$\displaystyle y(t)=t\to\infty.$

No eventual bound → unstable

Also:

$\displaystyle E_{x}=1<\infty, \qquad E_{y}\ge\int_{1}^\infty t^{2}dt=\infty.$

Unstable under both definitions.

</details>

---

<a id="p6-op-amp-integrator"></a>

## P6 — Ideal Op-Amp Integrator

Tests: [circuit links](./chapter-3-systems-and-properties.md#circuits) · [finite-energy stability](./chapter-3-systems-and-properties.md#stability)

An ideal inverting integrator satisfies

```math
\frac{dv_{\mathrm{out}}}{dt}
=-\frac{1}{RC}v_{\mathrm{in}}(t).
```

For

```math
v_{\mathrm{in}}(t)=1\thinspace \mathrm{V}
\quad(0\le t<RC),
\qquad
v_{\mathrm{in}}(t)=0
\quad\text{otherwise}.
```

Initial rest · $v_{\mathrm{out}}$ · finite-energy stability

<details>
<summary>Answer</summary>

During the pulse:

$\displaystyle v_{\mathrm{out}}(t)=-\frac{t}{RC}, \qquad 0\le t<RC.$

At switch-off:

$\displaystyle v_{\mathrm{out}}(RC)=-1\thinspace \mathrm{V}.$

After switch-off:

$\displaystyle \frac{dv_{\mathrm{out}}}{dt}=0 \Rightarrow v_{\mathrm{out}}(t)=-1\thinspace \mathrm{V}.$

$\displaystyle E_{\mathrm{in}}=(1\thinspace \mathrm{V})^{2}RC<\infty,$

$\displaystyle E_{\mathrm{out}} \ge\int_{RC}^{\infty}(1\thinspace \mathrm{V})^{2}dt =\infty.$

Finite-energy counterexample → unstable

</details>

---

<a id="p7-circuit-properties"></a>

## P7 — Circuit Properties

Tests: [memory](./chapter-3-systems-and-properties.md#memory) · [linearity](./chapter-3-systems-and-properties.md#linearity) · [causality](./chapter-3-systems-and-properties.md#causality) · [envelope detector](./chapter-3-systems-and-properties.md#envelope-detector)

Classify memory and linearity:

1. resistive voltage divider;
2. RC circuit at initial rest;
3. ideal half-wave rectifier;
4. rectifier with capacitor.

3.5.7: ideal diode → parallel $C,R$ · output across $C$

![Envelope detector circuit](./images/chapter-3-rectifier-capacitor.svg)

Input–output relation · memory · linearity · causality

Model: input-side anode · output-side cathode · fixed initial state

<details>
<summary>Answer</summary>

1. linear · memoryless
2. linear · has memory
3. nonlinear · memoryless
4. nonlinear · has memory

Reasons:

- resistor divider: instantaneous proportional gain;
- capacitor: stored voltage;
- diode: switching / failed superposition.

**Envelope detector (3.5.7)**

$\displaystyle v_{\mathrm{out}}=v_C$ · diode on → charge · diode off → discharge

$\displaystyle v_{\mathrm{in}}>v_C:\quad v_C\to v_{\mathrm{in}}$ · ideal charging

$\displaystyle v_{\mathrm{in}}<v_C:\quad \frac{dv_C}{dt}=-\frac{v_C}{RC}$

$\displaystyle v_C(t)=v_C(t_0)e^{-\frac{t-t_0}{RC}}$ · off interval $t_0\le t<t_1$

Memory: same present input · different charging histories → different $v_C$

$\displaystyle S(-x)=0\ne-Sx$ · positive pulse · initial rest → nonlinear

Causal: fixed initial state + past charging + present input · no future samples

No formula → state / conduction analysis · no $+a$ ≠ causal proof

</details>

---

<!-- AI-assisted additions P8–P13: full notes Problems 3.5.1–3.5.6, pp. 57–60; user-requested proof steps and traps. -->

<a id="p8-system-properties"></a>

## P8 — Nine Systems (3.5.1)

Tests: [memory](./chapter-3-systems-and-properties.md#memory) · [causality](./chapter-3-systems-and-properties.md#causality) · [TI](./chapter-3-systems-and-properties.md#time-invariance) · [linearity](./chapter-3-systems-and-properties.md#linearity)

Nine systems · four properties · $t\in\mathbb R$

Method: [four property tests](./chapter-3-systems-and-properties.md#property-method).
Focus: negative $t$ · S6/S7 gate · S9 limit + chain rule

<details>
<summary>Answer / traps</summary>

**S1 / S2**

$\displaystyle S_{1}x(t)=\sin(x(t)),\qquad S_{2}x(t)=x(\sin t)$

- S1: memoryless · causal · TI · nonlinear.
- S2: memory · noncausal · TV · linear.

S2: $t=\pi$ → $x(0)$ · $t=-\frac{\pi}{2}$ → future $x(-1)$

For $z(t)=x(t-d)$:

$\displaystyle S_{2}z(t)=x(\sin t-d),\qquad (S_{2}x)(t-d)=x(\sin(t-d))$

TV counterexample: $x(t)=t$, $d=\pi$, $t=0$: $-\pi\ne0$.

$\displaystyle S_{2}(ax_{1}+bx_{2})(t)=ax_{1}(\sin t)+bx_{2}(\sin t)$

S1 homogeneity fails: $x=\pi/2$, $k=2$: $0\ne2$.

**S3 / S4**

$\displaystyle S_{3}x(t)=x(t-2)+x(t+2),\qquad S_{4}x(t)=\cos(3t)x(t)$

- S3: memory · noncausal · TI · linear.
- S4: memoryless · causal · TV · linear.

Future ≠ TV · time-dependent gain ≠ nonlinear

S4 TV counterexample: $x=1$, $d=\pi/3$, $t=0$: $1\ne-1$.

**S5**

$\displaystyle S_{5}x(t)=\int_{-\infty}^{2t}x(\tau)d\tau=(Ix)(2t)$

Memory · noncausal · TV · linear.

$t=3$ → accumulation to $6$ → future

$q=Ix$ · $q(2t)$: read time ×2 · output time ×$\frac{1}{2}$

$\displaystyle \int_{-\infty}^{t}x(2\tau)d\tau=\frac{1}{2}(Ix)(2t)$

Input compression ≠ output compression · signed area ≠ energy

$\displaystyle \begin{aligned} S_{5}z(t)&=\int_{-\infty}^{2t}x(\tau-d)d\tau =\int_{-\infty}^{2t-d}x(r)dr,\\ (S_{5}x)(t-d)&=\int_{-\infty}^{2t-2d}x(r)dr. \end{aligned}$

TV counterexample: $x=1$ on $[0,1)$, zero otherwise; $d=1$, $t=1$: $1\ne0$.

Integral: sum splits · constant factors out

**S6 / S7**

$\displaystyle S_{6}x(t)= \begin{cases} 0,&t<0\\ x(t)+x(t-2),&t\ge0 \end{cases}$

$\displaystyle S_{7}x(t)= \begin{cases} 0,&x(t)<0\\ x(t)+x(t-2),&x(t)\ge0 \end{cases}$

- S6: memory · causal · TV · linear.
- S7: memory · causal · TI · nonlinear.

S6 fixed clock gate: $x=1$, $d=1$, $t=1/2$: actual $2$, shifted output $0$.

S7: input gate ≠ domain/codomain · shift condition + branches

$\displaystyle S_{7}z(t)= \begin{cases} 0,&x(t-d)<0\\ x(t-d)+x(t-d-2),&x(t-d)\ge0 \end{cases} =(S_{7}x)(t-d)$

$x=1$: $S_{7}x=2$ · $S_{7}(-x)=0\ne-2$

**S8 / S9**

$\displaystyle S_{8}x(t)=x(t/3),\qquad S_{9}x(t)=x'(t)$

- S8: memory · noncausal · TV · linear.
- S9: memory · causal · TI · linear (differentiable inputs).

S8: $t=-3$ → read $-1$ → future · $x(\frac{t}{3}-d)$ vs $x(\frac{t-d}{3})$

S9: $x_{1}=0$, $x_{2}=t$ · same value at $0$ · slopes $0\ne1$

Past-side derivative → causal; [chain-rule TI proof](./chapter-3-systems-and-properties.md#time-invariance).

</details>

---

<a id="p9-linear-ti"></a>

## P9 — Linear ≠ TI (3.5.2)

Tests: [linearity](./chapter-3-systems-and-properties.md#linearity) · [TI](./chapter-3-systems-and-properties.md#time-invariance)

Linear probe: $z=ax_{1}+bx_{2}$ · TI probe: $z(t)=x(t-d)$

```math
S_{1}x(t)=x(t-1),\quad S_{2}x(t)=t\thinspace x(t-2),\quad S_{3}x(t)=x(t-1)x(t-2)
```

<details>
<summary>Answer</summary>

- S1: linear · TI.
- S2: linear · TV.
- S3: nonlinear · TI.

$\displaystyle S_{2}(ax_{1}+bx_{2})(t)=a\thinspace t x_{1}(t-2)+b\thinspace t x_{2}(t-2)$

$\displaystyle S_{2}z(t)=t x(t-2-d),\qquad (S_{2}x)(t-d)=(t-d)x(t-d-2)$

$z(t)=x(t-d)$; $x=1$, $d=1$: $t\ne t-1$.

$\displaystyle S_{3}(kx)=k^{2}S_{3}x\ne kS_{3}x$

$x=1$, $k=2$: $4\ne2$.

$\displaystyle S_{3}z(t)=x(t-1-d)x(t-2-d)=(S_{3}x)(t-d)$

</details>

---

<a id="p10-cascade-inverse"></a>

## P10 — Connect / Undo (3.5.3)

Tests: [interconnection](./chapter-3-systems-and-properties.md#interconnection) · [inverse](./chapter-3-systems-and-properties.md#invertibility) · [causality](./chapter-3-systems-and-properties.md#causality)

P9 S1/S2 · parallel · both cascades · S1 inverse

Parallel: output sum · cascade: whole-signal substitution
Inverse: solve → unique? → both orders → causality

<details>
<summary>Answer</summary>

Parallel:

$\displaystyle y(t)=x(t-1)+t x(t-2)$

S1 then S2:

$\displaystyle v(t)=x(t-1),\quad y(t)=t v(t-2)=t x(t-3)$

S2 then S1:

$\displaystyle v(t)=t x(t-2),\quad y(t)=v(t-1)=(t-1)x(t-3)$

Order matters · whole intermediate signal

Inverse:

$\displaystyle y(t)=x(t-1)\quad\Rightarrow\quad x(t)=y(t+1)$

Both orders → identity · advance → noncausal → no real-time inverse

</details>

---

<a id="p11-euler-responses"></a>

## P11 — Euler / Phase (3.5.4)

Tests: [Euler + linearity](./chapter-3-systems-and-properties.md#euler-responses)

Same linear $S$ · two known pairs

```math
e^{j2t}\xrightarrow{S}3e^{j3t},\qquad e^{-j2t}\xrightarrow{S}3e^{-j3t}
```

Outputs: $\cos(2t)$ · $\sin(2t)$ · $\cos(2t-1)$

Known pairs ≠ formula · split → coefficients → responses → recombine · no TI

<details>
<summary>Answer / key steps</summary>

$\displaystyle a e^{j2t}+b e^{-j2t}\xrightarrow{S}3a e^{j3t}+3b e^{-j3t}$

$\displaystyle \cos(2t)\to3\cos(3t),\qquad \sin(2t)\to3\sin(3t)$

Phase:

$\displaystyle \cos(2t-1)=\frac{e^{-j}}2e^{j2t}+\frac{e^{j}}2e^{-j2t}$

$\displaystyle \begin{aligned} y(t) &=\frac{3e^{-j}}2e^{j3t}+\frac{3e^{j}}2e^{-j3t}\\ &=\frac{3}{2}\left[e^{j(3t-1)}+e^{-j(3t-1)}\right]\\ &=3\cos(3t-1). \end{aligned}$

Exponent product → exponent sum · conjugate sum → real

TI shortcut (invalid): $3\cos(3t-\frac{3}{2})$ ≠ actual $3\cos(3t-1)$

Complex-linear $S$ · real phase decomposition:

$\displaystyle \cos(2t-1)=\cos1\cos2t+\sin1\sin2t$

</details>

---

<a id="p12-lti-pulses"></a>

## P12 — LTI Building Blocks (3.5.5)

Tests: [LTI combinations](./chapter-3-systems-and-properties.md#lti-building-blocks)

Given: rectangle $(0,2)$, height 1 → triangle $[0,2]$, peak $(1,2)$

Given response ≠ differentiation · Figs. 3.12 / 3.13

New input → known blocks → same output shifts / scales / sums

<details>
<summary>Answer / decomposition</summary>

$\displaystyle x_{2}(t)=x_{1}(t)-x_{1}(t-2) \quad\Rightarrow\quad y_{2}(t)=y_{1}(t)-y_{1}(t-2)$

Triangles: $[0,2]$ positive · $[2,4]$ negative · trough $(3,-2)$

$\displaystyle x_{3}(t)=x_{1}(t+1)+x_{1}(t)-x_{1}(t-1)$

Input levels: $1$ on $(-1,0)$; $2$ on $(0,1)$; $0$ on $(1,2)$; $-1$ on $(2,3)$.

$\displaystyle y_{3}(t)=y_{1}(t+1)+y_{1}(t)-y_{1}(t-1)$

Plot by pointwise height addition: join

$\displaystyle (-1,0)\to(0,2)\to(1,2)\to(2,-2)\to(3,0)$

Support: $[-1,3]$

Shift / amplitude / sum ✓ · time scaling / reversal not guaranteed

</details>

---

<a id="p13-graph-tests"></a>

## P13 — Graph Evidence

Tests: [memory](./chapter-3-systems-and-properties.md#memory) · [causality](./chapter-3-systems-and-properties.md#causality) · [TI](./chapter-3-systems-and-properties.md#time-invariance) · [linearity](./chapter-3-systems-and-properties.md#linearity)

Given input–output pairs · properties ruled out?

Compare: present / history / shifts / combinations

<details>
<summary>Answer / evidence</summary>

**Memoryless:** same time · same input · different output

$\displaystyle x_{a}(t_{0})=x_{b}(t_{0}),\quad y_{a}(t_{0})\ne y_{b}(t_{0})\Rightarrow\text{memory}$

**Causal:** same entire history · different current output

$\displaystyle x_{a}(\tau)=x_{b}(\tau)\ (\forall\tau\le t_{0}),\quad y_{a}(t_{0})\ne y_{b}(t_{0})\Rightarrow\text{noncausal}$

Different pasts → different outputs: compatible with causality

**Linear:** exact input combination → required output combination

$\displaystyle x_{c}=a x_{a}+b x_{b},\quad y_{c}\ne a y_{a}+b y_{b}\Rightarrow\text{nonlinear}$

**TI:** exact input shift → required output shift

$\displaystyle x_{b}(t)=x_{a}(t-d),\quad y_{b}(t)\ne y_{a}(t-d)\Rightarrow\text{TV}$

Shift + sign change → TI alone insufficient

**LTI:** shifted blocks → shifted responses

$\displaystyle x_{c}(t)=\sum_{k}a_{k}x_{a}(t-d_{k})\quad\Rightarrow_{\mathrm{LTI}}\quad y_{c}(t)=\sum_{k}a_{k}y_{a}(t-d_{k})$

Failed LTI prediction → not LTI · linear vs TI: unresolved individually

Pulse count / triangular shape / early onset alone ≠ proof

One contradiction → impossible · compatible pairs ≠ universal proof

</details>

---

<!-- AI-assisted addition: “判断无记忆系统” chat, 14 Oct 2026; circuit / real-time vs offline questions. Model assumptions explicit; discussion ≠ mastery. -->

<!-- AI-assisted abstraction, 21 Oct 2026: graph comparisons and joint-property logic from discussion. Original Fig. 3.14 / SolutionManual_SaSv2.pdf pp. 49–50 use inconsistent x2 supports; no source-specific classification asserted here. -->

[Back to concept map](./chapter-3-systems-and-properties.md#map)
