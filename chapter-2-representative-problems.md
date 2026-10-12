<!-- AI-assisted practice set: based on Chapter 2 discussion and Signals_and_System_02Oct.pdf. -->

# Chapter 2 — Representative Problems

[Concept map](./chapter-2-signals-and-properties.md#map) · selected D0/D+1/D+3 redo set

Selected examples · advanced still in scope · not a completion record

---

<a id="p1-positive-vs-increasing"></a>

## P1 — Positive ≠ Increasing

Tests: [operations / calculus](./chapter-2-signals-and-properties.md#operations)

Let $f(t)\ge0$ and

```math
g(T)=\int_{-T}^{T}f(t)\thinspace dt,\qquad T\ge0.
```

$g$: monotonicity? · $f$: monotonicity?

<details>
<summary>Answer</summary>

For $T_{1}\ge T_{2}\ge0$,

$\displaystyle g(T_{1})-g(T_{2}) =\int_{-T_{1}}^{-T_{2}}f(t)\thinspace dt +\int_{T_{2}}^{T_{1}}f(t)\thinspace dt \ge0.$

$g(T_{1})\ge g(T_{2})$

If differentiable:

$\displaystyle g'(T)=f(T)+f(-T)\ge0.$

$f\ge0$ ≠ increasing · $f=t^{2}+3$: decreasing for $t<0$

</details>

---

<a id="p2-energy-power-rms"></a>

## P2 — Energy / Power / RMS

Tests: [energy / power / RMS](./chapter-2-signals-and-properties.md#energy) · [complex modulus](./chapter-2-signals-and-properties.md#complex-number)

Class · $E_\infty$ · $P_\infty$ · $x_{\mathrm{RMS}}$

```math
x_{1}(t)=e^{-2t}u(t),\qquad
x_{2}(t)=3e^{j(4t+\pi/3)}.
```

<details>
<summary>Answer</summary>

$\displaystyle |x_{1}(t)|^{2}=e^{-4t}u(t)$

$\displaystyle E_\infty=\int_{0}^\infty e^{-4t}dt=\frac{1}{4},\qquad P_\infty=0,\qquad x_{\mathrm{RMS}}=0.$

Finite-energy signal.

For $x_{2}$:

$\displaystyle |x_{2}|^{2}=x_{2}x_{2}^{\ast} =9e^{j(4t+\pi/3)}e^{-j(4t+\pi/3)}=9.$

$\displaystyle E_\infty=\infty,\qquad P_\infty=9,\qquad x_{\mathrm{RMS}}=3.$

Power signal.

</details>

---

<a id="p3-time-transform"></a>

## P3 — Time Transform by Breakpoints

Tests: [time transform](./chapter-2-signals-and-properties.md#time-transform)

$x(t)$ has breakpoints

```math
\tau\in\lbrace -2,-1,0,1,2\rbrace .
```

For

```math
y(t)=x\negthinspace \left[-\frac{1}{2}(t+4)\right],
```

New breakpoints · transform

<details>
<summary>Answer</summary>

Match $x(a(t-t_{0}))$:

$\displaystyle a=-\frac{1}{2},\qquad t_{0}=-4.$

Point map:

$\displaystyle t=t_{0}+\frac{\tau}{a}=-4-2\tau.$

$\displaystyle \lbrace -2,-1,0,1,2\rbrace  \mapsto \lbrace 0,-2,-4,-6,-8\rbrace .$

Sorted:

$\displaystyle \boxed{\lbrace -8,-6,-4,-2,0\rbrace }.$

$a<0$: reversal · $|a|=\frac{1}{2}$: width ×2 · $t_{0}=-4$: left 4

</details>

---

<a id="p4-complex-periodicity"></a>

## P4 — $\sigma$ or Constant Magnitude?

Tests: [complex exponential](./chapter-2-signals-and-properties.md#complex-signal) · [periodicity](./chapter-2-signals-and-properties.md#complex-periodicity)

Determine periodicity and, when it exists, $T_{0}$:

```math
x_{1}(t)=\frac{1}{2}e^{1+j10t},\qquad
x_{2}(t)=\frac{1}{2}e^{(1+j10)t}.
```

<details>
<summary>Answer</summary>

$\displaystyle x_{1}(t)=\frac e2e^{j10t}$

Constant magnitude; periodic:

$\displaystyle \boxed{T_{0}=\frac{2\pi}{10}=\frac{\pi}{5}}.$

$\displaystyle x_{2}(t)=\frac{1}{2}e^{t} e^{j10t}$

$\sigma=1$: magnitude changes with $t$; not periodic.

Key distinction: $e^{1+j10t}$ versus $e^{(1+j10)t}$.

</details>

---

<a id="p5-impulse-step-energy"></a>

## P5 — Impulse $\to$ Step $\to$ Energy

Tests: [impulse](./chapter-2-signals-and-properties.md#impulse) · [energy](./chapter-2-signals-and-properties.md#energy)

Let

```math
x(t)=\delta(t+2)-\delta(t-2),
\qquad
y(t)=\int_{-\infty}^{t}x(\tau)\thinspace d\tau.
```

$y(t)$ · $E_{y}$

<details>
<summary>Answer</summary>

$\displaystyle y(t)=u(t+2)-u(t-2) = \begin{cases} 1,&-2\le t<2\quad\text{(endpoint convention)}\\ 0,&\text{elsewhere} \end{cases}$

$\displaystyle E_{y}=\int_{-\infty}^{\infty}|y(t)|^{2}dt =\int_{-2}^{2}1\thinspace dt =\boxed4.$

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

$\displaystyle p(t)=u(t-a)-u(t-b)$

$\displaystyle p(t)=u(t-a)u(b-t) \qquad\text{a.e.}$

Endpoint: $u(0)$ · same ordinary integrals

$\displaystyle Dp(t)=\delta(t-a)-\delta(t-b).$

Open $a$: $+1$ · close $b$: $-1$

</details>

---

<a id="p7-step-construction"></a>

## P7 — Level Changes

Tests: [step construction](./chapter-2-signals-and-properties.md#step-construction) · [piecewise derivative](./chapter-2-signals-and-properties.md#piecewise-derivative)

Write in step form, then differentiate:

```math
x(t)=
\begin{cases}
0,&t<0\\
1,&0\le t<1\\
-2,&1\le t<2\\
0,&t\ge2.
\end{cases}
```

<details>
<summary>Answer</summary>

Level changes:

$\displaystyle t=0:+1,\qquad t=1:-3,\qquad t=2:+2.$

$\displaystyle \boxed{x(t)=u(t)-3u(t-1)+2u(t-2)}$

$\displaystyle \boxed{Dx(t)=\delta(t)-3\delta(t-1)+2\delta(t-2)}$

Coefficient = new level $-$ old level.

</details>

---

<a id="p8-piecewise-derivative"></a>

## P8 — Slopes + Jumps

Tests: [piecewise derivative](./chapter-2-signals-and-properties.md#piecewise-derivative)

Find the generalized derivative:

```math
x(t)=
\begin{cases}
0,&t<-2\\
t,&-2\le t<0\\
2-t,&0\le t<2\\
0,&t\ge2.
\end{cases}
```

<details>
<summary>Answer</summary>

Ordinary slopes:

$\displaystyle u(t+2)-2u(t)+u(t-2).$

Jumps:

$\displaystyle J_{-2}=-2-0=-2,\qquad J_{0}=2-0=2,\qquad J_{2}=0-0=0.$

Therefore

$\displaystyle \boxed{ Dx(t)=u(t+2)-2u(t)+u(t-2) -2\delta(t+2)+2\delta(t) }.$

$t=2$: corner · no jump → no impulse

</details>

---

<a id="p9-delta-properties"></a>

## P9 — Delta Sampling and Scaling

Tests: [Dirac delta](./chapter-2-signals-and-properties.md#impulse)

Simplify:

```math
y(t)=(t^{2}+1)[\delta(t-3)+\delta(t+1)]
```

```math
z(t)=\delta(2t-4).
```

<details>
<summary>Answer</summary>

Sampling:

$\displaystyle f(t)\delta(t-a)=f(a)\delta(t-a).$

$\displaystyle \boxed{y(t)=10\delta(t-3)+2\delta(t+1)}.$

Scaling:

$\displaystyle \delta(a(t-t_{0}))=\frac{1}{|a|}\delta(t-t_{0}).$

$\displaystyle \boxed{z(t)=\frac{1}{2}\delta(t-2)}.$

$\frac{1}{|a|}$: unit area

</details>

---

<!-- AI-assisted addition: lecture quiz image supplied 2026-10-08 + user discussion. -->
<a id="p10-window-derivative"></a>

## P10 — Window Derivative

Tests: [operations / calculus](./chapter-2-signals-and-properties.md#operations) · [Dirac delta](./chapter-2-signals-and-properties.md#impulse) · [piecewise derivative](./chapter-2-signals-and-properties.md#piecewise-derivative)

Let

```math
x(t)=(3-t)[u(t+2)-u(t)].
```

Find $Dx(t)$. In particular, simplify

```math
(3-t)[\delta(t+2)-\delta(t)].
```

<details>
<summary>Answer</summary>

Product + chain rules:

$\displaystyle Dx(t)=-[u(t+2)-u(t)] +(3-t)[\delta(t+2)-\delta(t)].$

Impulse locations:

$\displaystyle t+2=0\Rightarrow t=-2, \qquad t=0.$

Sampling:

$\displaystyle (3-t)\delta(t+2)=5\delta(t+2),$

$\displaystyle -(3-t)\delta(t)=-3\delta(t).$

Therefore

$\displaystyle \boxed{ Dx(t)=-[u(t+2)-u(t)] +5\delta(t+2)-3\delta(t) }.$

Jump check:

$\displaystyle t=-2:\ 5-0=+5, \qquad t=0:\ 0-3=-3.$

Quiz correction: $\delta(t+2)$ coefficient $+5$

</details>

---

[Back to concept map](./chapter-2-signals-and-properties.md#map)
