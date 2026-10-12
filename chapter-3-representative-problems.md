<!-- AI-assisted practice set: based on Chapter 3 discussion, Signals_and_System_02Oct.pdf, and SnS_Systems.pdf slides 1-34. -->

# Chapter 3 — Representative Problems

[Concept map](./chapter-3-systems-and-properties.md#map) · selected D0/D+1/D+3 redo set

Current scope: discussion through 3.5.6. Not a completion / mastery record; remaining standard, exam and advanced questions still in scope.

---

<a id="p1-invertibility"></a>

## P1 — Information Loss

Tests: [invertibility](./chapter-3-systems-and-properties.md#invertibility)

Determine invertibility:

$$
(P_kx)(t)=kx(t),
\qquad
(Rx)(t)=\max\{0,x(t)\}.
$$

<details>
<summary>Answer</summary>

For $k\ne0$:

$\displaystyle P_k^{-1}=P_{1/k}.$

For $k=0$:

$\displaystyle P_0x=0\quad\forall x.$

One zero output cannot identify the original input → not invertible.

Rectifier counterexample:

$\displaystyle x_1(t)=-1, \qquad x_2(t)=-2,$

$\displaystyle x_1\ne x_2, \qquad Rx_1=Rx_2=0.$

Many-to-one → not invertible.

</details>

---

<a id="p2-integration-differentiation"></a>

## P2 — Integration / Differentiation

Tests: [invertibility](./chapter-3-systems-and-properties.md#invertibility)

Let the anchored integrator $I_0$ be

$$
(I_0x)(t)=\int_0^t x(\tau)d\tau,
\qquad
(Dx)(t)=x'(t).
$$

Find $DI_0x$ and $I_0Dx$. Explain the lost information.

<details>
<summary>Answer</summary>

Fundamental theorem:

$\displaystyle DI_0x =\frac{d}{dt}\int_0^t x(\tau)d\tau =x(t).$

But:

$\displaystyle I_0Dx =\int_0^t x'(\tau)d\tau =x(t)-x(0).$

Differentiation removes the constant offset.

Example:

$\displaystyle x(t)=t^2+3 \xrightarrow{D} 2t \xrightarrow{I} t^2.$

$I_0D=P_1$ only on signals with fixed $x(0)=0$.

</details>

---

<a id="p3-backward-energy"></a>

## P3 — Backward Energy

Tests: [finite-energy stability](./chapter-3-systems-and-properties.md#stability)

For

$$
(Bx)(t)=x(-t),
$$

show that $E_{Bx}=E_x$.

<details>
<summary>Answer</summary>

$\displaystyle E_{Bx}=\int_{-\infty}^{\infty}|x(-t)|^2dt.$

Let $\tau=-t$:

$\displaystyle d\tau=-dt, \qquad t:-\infty\to\infty \Rightarrow \tau:\infty\to-\infty.$

$\displaystyle \begin{aligned} E_{Bx} &=\int_{\infty}^{-\infty}|x(\tau)|^2(-d\tau)\\ &=\int_{-\infty}^{\infty}|x(\tau)|^2d\tau\\ &=E_x. \end{aligned}$

Horizontal reversal preserves area.

</details>

---

<a id="p4-marginal-integrator"></a>

## P4 — Truncated Input → Constant Output

Tests: [switch-off stability](./chapter-3-systems-and-properties.md#stability)

Let

$$
y(t)=\int_{-\infty}^{t}x(\tau)d\tau,
$$

where $x(t)=0$ for all $t>t_0$. Classify the long-term response.

<details>
<summary>Answer</summary>

For $t>t_0$:

$\displaystyle \begin{aligned} y(t) &=\int_{-\infty}^{t_0}x(\tau)d\tau +\int_{t_0}^{t}0\,d\tau\\ &=C. \end{aligned}$

Choose

$\displaystyle t_1=t_0, \qquad M=|C|.$

Then

$\displaystyle |y(t)|\le M, \qquad \forall t\ge t_1.$

Bounded; not guaranteed to approach $0$ → marginally stable under the switch-off definition.

</details>

---

<a id="p5-modified-integrator"></a>

## P5 — Modified Integrator

Tests: [switch-off stability](./chapter-3-systems-and-properties.md#stability)

Consider

$$
y(t)=t\int_{-\infty}^{t}x(\tau)d\tau
$$

with

$$
x(t)=
\begin{cases}
1,&0\le t<1\\
0,&\text{otherwise}.
\end{cases}
$$

Find $y(t)$ and classify stability.

<details>
<summary>Answer</summary>

$\displaystyle \int_{-\infty}^{t}x(\tau)d\tau = \begin{cases} 0,&t<0\\ t,&0\le t<1\\ 1,&t\ge1. \end{cases}$

Hence:

$\displaystyle y(t)= \begin{cases} 0,&t<0\\ t^2,&0\le t<1\\ t,&t\ge1. \end{cases}$

After switch-off:

$\displaystyle y(t)=t\to\infty.$

No finite eventual bound $M$ → unstable.

Also:

$\displaystyle E_x=1<\infty, \qquad E_y\ge\int_1^\infty t^2dt=\infty.$

Unstable under both definitions.

</details>

---

<a id="p6-op-amp-integrator"></a>

## P6 — Ideal Op-Amp Integrator

Tests: [circuit links](./chapter-3-systems-and-properties.md#circuits) · [finite-energy stability](./chapter-3-systems-and-properties.md#stability)

An ideal inverting integrator satisfies

$$
\frac{dv_{\mathrm{out}}}{dt}
=-\frac1{RC}v_{\mathrm{in}}(t).
$$

For

$$
v_{\mathrm{in}}(t)=1\,\mathrm{V}
\quad(0\le t<RC),
\qquad
v_{\mathrm{in}}(t)=0
\quad\text{otherwise}.
$$

with zero initial output, find $v_{\mathrm{out}}$ and test finite-energy stability.

<details>
<summary>Answer</summary>

During the pulse:

$\displaystyle v_{\mathrm{out}}(t)=-\frac{t}{RC}, \qquad 0\le t<RC.$

At switch-off:

$\displaystyle v_{\mathrm{out}}(RC)=-1\,\mathrm{V}.$

After switch-off:

$\displaystyle \frac{dv_{\mathrm{out}}}{dt}=0 \Rightarrow v_{\mathrm{out}}(t)=-1\,\mathrm{V}.$

$\displaystyle E_{\mathrm{in}}=(1\,\mathrm{V})^2RC<\infty,$

$\displaystyle E_{\mathrm{out}} \ge\int_{RC}^{\infty}(1\,\mathrm{V})^2dt =\infty.$

One finite-energy counterexample → finite-energy unstable.

</details>

---

<a id="p7-circuit-properties"></a>

## P7 — Four Circuits, Two Independent Properties

Tests: [memory](./chapter-3-systems-and-properties.md#memory) · [linearity](./chapter-3-systems-and-properties.md#linearity)

Classify memory and linearity:

1. resistive voltage divider;
2. RC circuit at initial rest;
3. ideal half-wave rectifier;
4. rectifier with capacitor.

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

</details>

---

<!-- AI-assisted additions P8–P13: full notes Problems 3.5.1–3.5.6, pp. 57–60; user-requested proof steps and traps. -->

<a id="p8-system-properties"></a>

## P8 — Nine Systems (3.5.1)

Tests: [memory](./chapter-3-systems-and-properties.md#memory) · [causality](./chapter-3-systems-and-properties.md#causality) · [TI](./chapter-3-systems-and-properties.md#time-invariance) · [linearity](./chapter-3-systems-and-properties.md#linearity)

Classify all nine; justify each property. Time domain: $\mathbb R$.

Method: [four property tests](./chapter-3-systems-and-properties.md#property-method).
Recall target: negative-time causality; S6/S7 gate distinction; S9 past-side limit + chain rule.

<details>
<summary>Answer / traps</summary>

**S1 / S2**

$\displaystyle S_1x(t)=\sin(x(t)),\qquad S_2x(t)=x(\sin t)$

- S1: memoryless · causal · TI · nonlinear.
- S2: memory · noncausal · TV · linear.

S2 reads $x(0)$ at $t=\pi$; future $x(-1)$ at $t=-\pi/2$.

For $z(t)=x(t-d)$:

$\displaystyle S_2z(t)=x(\sin t-d),\qquad (S_2x)(t-d)=x(\sin(t-d))$

TV counterexample: $x(t)=t$, $d=\pi$, $t=0$: $-\pi\ne0$.

$\displaystyle S_2(ax_1+bx_2)(t)=ax_1(\sin t)+bx_2(\sin t)$

S1 homogeneity fails: $x=\pi/2$, $k=2$: $0\ne2$.

**S3 / S4**

$\displaystyle S_3x(t)=x(t-2)+x(t+2),\qquad S_4x(t)=\cos(3t)x(t)$

- S3: memory · noncausal · TI · linear.
- S4: memoryless · causal · TV · linear.

Future access $\ne$ TV; time-dependent gain $\ne$ nonlinearity.

S4 TV counterexample: $x=1$, $d=\pi/3$, $t=0$: $1\ne-1$.

**S5**

$\displaystyle S_5x(t)=\int_{-\infty}^{2t}x(\tau)d\tau=(Ix)(2t)$

Memory · noncausal · TV · linear.

$t=3$: accumulates to $6$ → future. Compression advances the accumulated result.

Read time doubles; output event time halves. $q(2t)$ changes the accumulated output's time, not the integration variable.

$\displaystyle \int_{-\infty}^{t}x(2\tau)d\tau=\frac12(Ix)(2t)$

Input compression before integration is a different operation. Signed area $\ne$ energy.

$\displaystyle \begin{aligned} S_5z(t)&=\int_{-\infty}^{2t}x(\tau-d)d\tau =\int_{-\infty}^{2t-d}x(r)dr,\\ (S_5x)(t-d)&=\int_{-\infty}^{2t-2d}x(r)dr. \end{aligned}$

TV counterexample: $x=1$ on $[0,1)$, zero otherwise; $d=1$, $t=1$: $1\ne0$.

Integral linearity: sums split; constant factors leave the integral.

**S6 / S7**

$\displaystyle S_6x(t)= \begin{cases} 0,&t<0\\ x(t)+x(t-2),&t\ge0 \end{cases}$

$\displaystyle S_7x(t)= \begin{cases} 0,&x(t)<0\\ x(t)+x(t-2),&x(t)\ge0 \end{cases}$

- S6: memory · causal · TV · linear.
- S7: memory · causal · TI · nonlinear.

S6 fixed clock gate: $x=1$, $d=1$, $t=1/2$: actual $2$, shifted output $0$.

S7 input test, not domain/codomain. Shift **condition and branches**:

$\displaystyle S_7z(t)= \begin{cases} 0,&x(t-d)<0\\ x(t-d)+x(t-d-2),&x(t-d)\ge0 \end{cases} =(S_7x)(t-d)$

Nonlinear: $x=1$ gives $S_7x=2$, but $S_7(-x)=0\ne-2$.

**S8 / S9**

$\displaystyle S_8x(t)=x(t/3),\qquad S_9x(t)=x'(t)$

- S8: memory · noncausal · TV · linear.
- S9: memory · causal · TI · linear (differentiable inputs).

S8: $t=-3$ reads $-1$ → future. Shift test: $x(t/3-d)$ vs $x(t/3-d/3)$.

S9: $x_1=0$, $x_2=t$ agree at $0$; slopes $0\ne1$ → memory.

Past-side derivative → causal; [chain-rule TI proof](./chapter-3-systems-and-properties.md#time-invariance).

</details>

---

<a id="p9-linear-ti"></a>

## P9 — Linear ≠ TI (3.5.2)

Tests: [linearity](./chapter-3-systems-and-properties.md#linearity) · [TI](./chapter-3-systems-and-properties.md#time-invariance)

Recall target: substitute $z=ax_1+bx_2$ for linearity; separately $z(t)=x(t-d)$ for TI. Do not mix probes.

$$
S_1x(t)=x(t-1),\quad S_2x(t)=t\,x(t-2),\quad S_3x(t)=x(t-1)x(t-2)
$$

<details>
<summary>Answer</summary>

- S1: linear · TI.
- S2: linear · TV.
- S3: nonlinear · TI.

$\displaystyle S_2(ax_1+bx_2)(t)=a\,t x_1(t-2)+b\,t x_2(t-2)$

$\displaystyle S_2z(t)=t x(t-2-d),\qquad (S_2x)(t-d)=(t-d)x(t-d-2)$

$z(t)=x(t-d)$; $x=1$, $d=1$: $t\ne t-1$.

$\displaystyle S_3(kx)=k^2S_3x\ne kS_3x$

$x=1$, $k=2$: $4\ne2$.

$\displaystyle S_3z(t)=x(t-1-d)x(t-2-d)=(S_3x)(t-d)$

</details>

---

<a id="p10-cascade-inverse"></a>

## P10 — Connect / Undo (3.5.3)

Tests: [interconnection](./chapter-3-systems-and-properties.md#interconnection) · [inverse](./chapter-3-systems-and-properties.md#invertibility) · [causality](./chapter-3-systems-and-properties.md#causality)

Use S1 / S2 from P9. Find parallel, both cascade orders, inverse of S1.

Recall target: parallel adds **outputs**; cascade substitutes a whole intermediate signal, not multiplies formulas.
Inverse: solve → unique? → verify both orders → causal real-time implementation?

<details>
<summary>Answer</summary>

Parallel:

$\displaystyle y(t)=x(t-1)+t x(t-2)$

S1 then S2:

$\displaystyle v(t)=x(t-1),\quad y(t)=t v(t-2)=t x(t-3)$

S2 then S1:

$\displaystyle v(t)=t x(t-2),\quad y(t)=v(t-1)=(t-1)x(t-3)$

Order matters; substitute the **whole intermediate signal**.

Inverse:

$\displaystyle y(t)=x(t-1)\quad\Rightarrow\quad x(t)=y(t+1)$

Both cascade directions recover the input. Advance → noncausal → no arbitrary-input real-time inverse.

</details>

---

<a id="p11-euler-responses"></a>

## P11 — Euler / Phase (3.5.4)

Tests: [Euler + linearity](./chapter-3-systems-and-properties.md#euler-responses)

Same linear system; **two experiments**, not two systems:

$$
e^{j2t}\xrightarrow{S}3e^{j3t},\qquad e^{-j2t}\xrightarrow{S}3e^{-j3t}
$$

Find outputs for $\cos(2t)$, $\sin(2t)$, $\cos(2t-1)$.

Recall target: known pairs $\ne$ system formula. Split → retain coefficients → replace responses → recombine. No TI supplied.

<details>
<summary>Answer / key steps</summary>

$\displaystyle a e^{j2t}+b e^{-j2t}\xrightarrow{S}3a e^{j3t}+3b e^{-j3t}$

$\displaystyle \cos(2t)\to3\cos(3t),\qquad \sin(2t)\to3\sin(3t)$

Phase:

$\displaystyle \cos(2t-1)=\frac{e^{-j}}2e^{j2t}+\frac{e^j}2e^{-j2t}$

$\displaystyle \begin{aligned} y(t) &=\frac{3e^{-j}}2e^{j3t}+\frac{3e^j}2e^{-j3t}\\ &=\frac32\left[e^{j(3t-1)}+e^{-j(3t-1)}\right]\\ &=3\cos(3t-1). \end{aligned}$

Exponent multiplication → exponent addition; conjugate sum cancels imaginary parts.

**No TI assumption.** Delay $1/2$ would predict $3\cos(3t-3/2)$, not the actual answer.

Complex scalar convention: complex-linear S. Real phase decomposition:

$\displaystyle \cos(2t-1)=\cos1\cos2t+\sin1\sin2t$

</details>

---

<a id="p12-lti-pulses"></a>

## P12 — LTI Building Blocks (3.5.5)

Tests: [LTI combinations](./chapter-3-systems-and-properties.md#lti-building-blocks)

Given: rectangle $x_1=1$ on $(0,2)$ → triangle $y_1$, support $[0,2]$, peak $y_1(1)=2$.

**Given response, not differentiation.** Find outputs for Figs. 3.12 / 3.13.

Recall target: express the **new input** using known input blocks first; only then transfer shifts / scales / sums to the output.

<details>
<summary>Answer / decomposition</summary>

$\displaystyle x_2(t)=x_1(t)-x_1(t-2) \quad\Rightarrow\quad y_2(t)=y_1(t)-y_1(t-2)$

Positive triangle on $[0,2]$; negative triangle on $[2,4]$, trough $(3,-2)$.

$\displaystyle x_3(t)=x_1(t+1)+x_1(t)-x_1(t-1)$

Input levels: $1$ on $(-1,0)$; $2$ on $(0,1)$; $0$ on $(1,2)$; $-1$ on $(2,3)$.

$\displaystyle y_3(t)=y_1(t+1)+y_1(t)-y_1(t-1)$

Plot by pointwise height addition: join

$\displaystyle (-1,0)\to(0,2)\to(1,2)\to(2,-2)\to(3,0)$

Zero outside $[-1,3]$.

Shift / amplitude / sum allowed. **No automatic time scaling or reversal of responses.**

</details>

---

<a id="p13-graph-tests"></a>

## P13 — Graph Evidence (3.5.6)

Tests: [memory](./chapter-3-systems-and-properties.md#memory) · [causality](./chapter-3-systems-and-properties.md#causality) · [TI](./chapter-3-systems-and-properties.md#time-invariance) · [linearity](./chapter-3-systems-and-properties.md#linearity)

Source: Fig. 3.14. Could S have each property?

Recall target: state what is compared—present values / full histories / shifted signals / linear combinations.
An onset or shape impression alone is not a proof.

<details>
<summary>Answer / evidence</summary>

**Not memoryless:** same present, different outputs:

$\displaystyle x_1(1.5)=x_2(1.5)=0,\qquad y_1(1.5)=0.5\ne0=y_2(1.5)$

**Could be causal:** x1 / x3 histories agree before $2$; outputs agree there too. No anticipation contradiction shown.

**Not linear:**

$\displaystyle x_3=x_1-x_2,\qquad y_3\ne y_1-y_2$

At $t=3$: actual $-1$, required $0-(-1)=+1$.

**Could be TI:** $x_2(t)=-x_1(t-2)$ includes sign reversal; TI alone does not determine its response. Cannot assume output subtraction without linearity.

Finite examples: contradiction → impossible; compatibility → **could be**, not a universal proof.

</details>

---

[Back to concept map](./chapter-3-systems-and-properties.md#map)
