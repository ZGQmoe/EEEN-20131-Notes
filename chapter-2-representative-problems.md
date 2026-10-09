<!-- AI-assisted practice set: based on Chapter 2 discussion and Signals_and_System_02Oct.pdf. -->

# Chapter 2 — Representative Problems

[Concept map](./chapter-2-signals-and-properties.md#map) · selected D0/D+1/D+3 redo set

Advanced Problems excluded. This file is not a completion record.

---

<a id="p1-positive-vs-increasing"></a>

## P1 — Positive ≠ Increasing

Tests: [operations / calculus](./chapter-2-signals-and-properties.md#operations)

Let $f(t)\ge0$ and

$$
g(T)=\int_{-T}^{T}f(t)\,dt,\qquad T\ge0.
$$

Show that $g$ is nondecreasing. Does $f(t)\ge0$ imply that $f$ is increasing?

<details>
<summary>Answer</summary>

For $T_1\ge T_2\ge0$,

$$
g(T_1)-g(T_2)
=\int_{-T_1}^{-T_2}f(t)\,dt
+\int_{T_2}^{T_1}f(t)\,dt
\ge0.
$$

Hence $g(T_1)\ge g(T_2)$.

If differentiable:

$$
g'(T)=f(T)+f(-T)\ge0.
$$

$f\ge0$ says values are nonnegative, not that they rise. Example: $f(t)=t^2+3$ decreases for $t<0$ and increases for $t>0$.

</details>

---

<a id="p2-energy-power-rms"></a>

## P2 — Energy / Power / RMS

Tests: [energy / power / RMS](./chapter-2-signals-and-properties.md#energy) · [complex modulus](./chapter-2-signals-and-properties.md#complex-number)

Classify each signal. Find $E_\infty$, $P_\infty$, and $x_{\mathrm{RMS}}$.

$$
x_1(t)=e^{-2t}u(t),\qquad
x_2(t)=3e^{j(4t+\pi/3)}.
$$

<details>
<summary>Answer</summary>

$$
|x_1(t)|^2=e^{-4t}u(t)
$$

$$
E_\infty=\int_0^\infty e^{-4t}dt=\frac14,\qquad
P_\infty=0,\qquad
x_{\mathrm{RMS}}=0.
$$

Finite-energy signal.

For $x_2$:

$$
|x_2|^2=x_2x_2^*
=9e^{j(4t+\pi/3)}e^{-j(4t+\pi/3)}=9.
$$

$$
E_\infty=\infty,\qquad
P_\infty=9,\qquad
x_{\mathrm{RMS}}=3.
$$

Power signal.

</details>

---

<a id="p3-time-transform"></a>

## P3 — Time Transform by Breakpoints

Tests: [time transform](./chapter-2-signals-and-properties.md#time-transform)

$x(t)$ has breakpoints

$$
\tau\in\{-2,-1,0,1,2\}.
$$

For

$$
y(t)=x\!\left[-\frac12(t+4)\right],
$$

find the new breakpoints and describe the transform.

<details>
<summary>Answer</summary>

Match $x(a(t-t_0))$:

$$
a=-\frac12,\qquad t_0=-4.
$$

Point map:

$$
t=t_0+\frac{\tau}{a}=-4-2\tau.
$$

$$
\{-2,-1,0,1,2\}
\mapsto
\{0,-2,-4,-6,-8\}.
$$

Sorted:

$$
\boxed{\{-8,-6,-4,-2,0\}}.
$$

$a<0$: reversal. $|a|=1/2$: horizontal expansion by $2$. $t_0=-4$: left shift by $4$.

</details>

---

<a id="p4-complex-periodicity"></a>

## P4 — $\sigma$ or Constant Magnitude?

Tests: [complex exponential](./chapter-2-signals-and-properties.md#complex-signal) · [periodicity](./chapter-2-signals-and-properties.md#complex-periodicity)

Determine periodicity and, when it exists, $T_0$:

$$
x_1(t)=\frac12e^{1+j10t},\qquad
x_2(t)=\frac12e^{(1+j10)t}.
$$

<details>
<summary>Answer</summary>

$$
x_1(t)=\frac e2e^{j10t}
$$

Constant magnitude; periodic:

$$
\boxed{T_0=\frac{2\pi}{10}=\frac\pi5}.
$$

$$
x_2(t)=\frac12e^t e^{j10t}
$$

$\sigma=1$: magnitude changes with $t$; not periodic.

Key distinction: $e^{1+j10t}$ versus $e^{(1+j10)t}$.

</details>

---

<a id="p5-impulse-step-energy"></a>

## P5 — Impulse $\to$ Step $\to$ Energy

Tests: [impulse](./chapter-2-signals-and-properties.md#impulse) · [energy](./chapter-2-signals-and-properties.md#energy)

Let

$$
x(t)=\delta(t+2)-\delta(t-2),
\qquad
y(t)=\int_{-\infty}^{t}x(\tau)\,d\tau.
$$

Find $y(t)$ and $E_y$.

<details>
<summary>Answer</summary>

$$
y(t)=u(t+2)-u(t-2)
=
\begin{cases}
1,&-2\le t<2\quad\text{(endpoint convention)}\\
0,&\text{elsewhere}
\end{cases}
$$

$$
E_y=\int_{-\infty}^{\infty}|y(t)|^2dt
=\int_{-2}^{2}1\,dt
=\boxed4.
$$

</details>

---

<a id="p6-pulse-forms"></a>

## P6 — Two Steps, One Pulse

Tests: [unit step](./chapter-2-signals-and-properties.md#step) · [step–impulse relation](./chapter-2-signals-and-properties.md#impulse)

For $a<b$, express a unit-height pulse between $a$ and $b$ using:

1. a difference of steps;
2. a product of steps;
3. impulses after differentiation.

<details>
<summary>Answer</summary>

$$
p(t)=u(t-a)-u(t-b)
$$

$$
p(t)=u(t-a)u(b-t)
\qquad\text{a.e.}
$$

The two forms may differ at one endpoint, depending on $u(0)$; ordinary integrals are unchanged.

$$
Dp(t)=\delta(t-a)-\delta(t-b).
$$

Open at $a$: $+1$. Close at $b$: $-1$.

</details>

---

<a id="p7-step-construction"></a>

## P7 — Level Changes

Tests: [step construction](./chapter-2-signals-and-properties.md#step-construction) · [piecewise derivative](./chapter-2-signals-and-properties.md#piecewise-derivative)

Write in step form, then differentiate:

$$
x(t)=
\begin{cases}
0,&t<0\\
1,&0\le t<1\\
-2,&1\le t<2\\
0,&t\ge2.
\end{cases}
$$

<details>
<summary>Answer</summary>

Level changes:

$$
t=0:+1,\qquad t=1:-3,\qquad t=2:+2.
$$

$$
\boxed{x(t)=u(t)-3u(t-1)+2u(t-2)}
$$

$$
\boxed{Dx(t)=\delta(t)-3\delta(t-1)+2\delta(t-2)}
$$

Coefficient = new level $-$ old level.

</details>

---

<a id="p8-piecewise-derivative"></a>

## P8 — Slopes + Jumps

Tests: [piecewise derivative](./chapter-2-signals-and-properties.md#piecewise-derivative)

Find the generalized derivative:

$$
x(t)=
\begin{cases}
0,&t<-2\\
t,&-2\le t<0\\
2-t,&0\le t<2\\
0,&t\ge2.
\end{cases}
$$

<details>
<summary>Answer</summary>

Ordinary slopes:

$$
u(t+2)-2u(t)+u(t-2).
$$

Jumps:

$$
J_{-2}=-2-0=-2,\qquad
J_0=2-0=2,\qquad
J_2=0-0=0.
$$

Therefore

$$
\boxed{
Dx(t)=u(t+2)-2u(t)+u(t-2)
-2\delta(t+2)+2\delta(t)
}.
$$

Corner at $t=2$: slope changes; no jump in $x$; no impulse in $Dx$.

</details>

---

<a id="p9-delta-properties"></a>

## P9 — Delta Sampling and Scaling

Tests: [Dirac delta](./chapter-2-signals-and-properties.md#impulse)

Simplify:

$$
y(t)=(t^2+1)[\delta(t-3)+\delta(t+1)]
$$

$$
z(t)=\delta(2t-4).
$$

<details>
<summary>Answer</summary>

Sampling:

$$
f(t)\delta(t-a)=f(a)\delta(t-a).
$$

$$
\boxed{y(t)=10\delta(t-3)+2\delta(t+1)}.
$$

Scaling:

$$
\delta(a(t-t_0))=\frac1{|a|}\delta(t-t_0).
$$

$$
\boxed{z(t)=\frac12\delta(t-2)}.
$$

$1/|a|$ preserves unit area after horizontal scaling.

</details>

---

<!-- AI-assisted addition: lecture quiz image supplied 2026-10-08 + user discussion. -->
<a id="p10-window-derivative"></a>

## P10 — Window Derivative

Tests: [operations / calculus](./chapter-2-signals-and-properties.md#operations) · [Dirac delta](./chapter-2-signals-and-properties.md#impulse) · [piecewise derivative](./chapter-2-signals-and-properties.md#piecewise-derivative)

Let

$$
x(t)=(3-t)[u(t+2)-u(t)].
$$

Find $Dx(t)$. In particular, simplify

$$
(3-t)[\delta(t+2)-\delta(t)].
$$

<details>
<summary>Answer</summary>

Product + chain rules:

$$
Dx(t)=-[u(t+2)-u(t)]
+(3-t)[\delta(t+2)-\delta(t)].
$$

Impulse locations:

$$
t+2=0\Rightarrow t=-2,
\qquad
t=0.
$$

Sampling:

$$
(3-t)\delta(t+2)=5\delta(t+2),
$$

$$
-(3-t)\delta(t)=-3\delta(t).
$$

Therefore

$$
\boxed{
Dx(t)=-[u(t+2)-u(t)]
+5\delta(t+2)-3\delta(t)
}.
$$

Jump check:

$$
t=-2:\ 5-0=+5,
\qquad
t=0:\ 0-3=-3.
$$

Quiz-image warning: the coefficient of $\delta(t+2)$ is $+5$, not $-5$.

</details>

---

[Back to concept map](./chapter-2-signals-and-properties.md#map)
