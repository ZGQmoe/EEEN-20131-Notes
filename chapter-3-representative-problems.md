<!-- AI-assisted practice set: based on Chapter 3 discussion, Signals_and_System_02Oct.pdf, and SnS_Systems.pdf slides 1-34. -->

# Chapter 3 — Representative Problems

[Concept map](./chapter-3-systems-and-properties.md#map) · selected D0/D+1/D+3 redo set

Current scope: through stability. Not a completion record.

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

$$
P_k^{-1}=P_{1/k}.
$$

For $k=0$:

$$
P_0x=0\quad\forall x.
$$

One zero output cannot identify the original input → not invertible.

Rectifier counterexample:

$$
x_1(t)=-1,
\qquad
x_2(t)=-2,
$$

$$
x_1\ne x_2,
\qquad
Rx_1=Rx_2=0.
$$

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

$$
DI_0x
=\frac{d}{dt}\int_0^t x(\tau)d\tau
=x(t).
$$

But:

$$
I_0Dx
=\int_0^t x'(\tau)d\tau
=x(t)-x(0).
$$

Differentiation removes the constant offset.

Example:

$$
x(t)=t^2+3
\xrightarrow{D}
2t
\xrightarrow{I}
t^2.
$$

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

$$
E_{Bx}=\int_{-\infty}^{\infty}|x(-t)|^2dt.
$$

Let $\tau=-t$:

$$
d\tau=-dt,
\qquad
t:-\infty\to\infty
\Rightarrow
\tau:\infty\to-\infty.
$$

$$
\begin{aligned}
E_{Bx}
&=\int_{\infty}^{-\infty}|x(\tau)|^2(-d\tau)\\
&=\int_{-\infty}^{\infty}|x(\tau)|^2d\tau\\
&=E_x.
\end{aligned}
$$

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

$$
\begin{aligned}
y(t)
&=\int_{-\infty}^{t_0}x(\tau)d\tau
+\int_{t_0}^{t}0\,d\tau\\
&=C.
\end{aligned}
$$

Choose

$$
t_1=t_0,
\qquad
M=|C|.
$$

Then

$$
|y(t)|\le M,
\qquad
\forall t\ge t_1.
$$

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

$$
\int_{-\infty}^{t}x(\tau)d\tau
=
\begin{cases}
0,&t<0\\
t,&0\le t<1\\
1,&t\ge1.
\end{cases}
$$

Hence:

$$
y(t)=
\begin{cases}
0,&t<0\\
t^2,&0\le t<1\\
t,&t\ge1.
\end{cases}
$$

After switch-off:

$$
y(t)=t\to\infty.
$$

No finite eventual bound $M$ → unstable.

Also:

$$
E_x=1<\infty,
\qquad
E_y\ge\int_1^\infty t^2dt=\infty.
$$

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
v_{\mathrm{in}}(t)=
\begin{cases}
1\ \mathrm V,&0\le t<RC\\
0,&\text{otherwise},
\end{cases}
$$

with zero initial output, find $v_{\mathrm{out}}$ and test finite-energy stability.

<details>
<summary>Answer</summary>

During the pulse:

$$
v_{\mathrm{out}}(t)=-\frac{t}{RC},
\qquad
0\le t<RC.
$$

At switch-off:

$$
v_{\mathrm{out}}(RC)=-1\ \mathrm V.
$$

After switch-off:

$$
\frac{dv_{\mathrm{out}}}{dt}=0
\Rightarrow
v_{\mathrm{out}}(t)=-1\ \mathrm V.
$$

$$
E_{\mathrm{in}}=(1\ \mathrm V)^2RC<\infty,
$$

$$
E_{\mathrm{out}}
\ge\int_{RC}^{\infty}(1\ \mathrm V)^2dt
=\infty.
$$

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

[Back to concept map](./chapter-3-systems-and-properties.md#map)
