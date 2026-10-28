<!-- AI-assisted partial note: Signals_and_System_02Oct.pdf, pp. 115-120, through convergence; user's source-reading reasoning sequence. Orthogonality derivation: finite sums; extension to infinite series requires justification of termwise integration. -->

# Chapter 7 — Fourier Analysis

## Fourier Series

```math
\boxed{
\underbrace{
x(t)=\underbrace{\sum_{k=-\infty}^{\infty}
\underbrace{x_{k}}_{\text{coefficient}}
\underbrace{e^{j2\pi kf_{0}t}}_{\text{frequency }kf_{0}}}_{\text{Fourier series}}
}_{\text{synthesis equation}}
}
```

```math
x_{k}\in\mathbb C,\qquad k=0,\pm1,\pm2,\ldots,\qquad
f_{0}=\frac{1}{T_{0}},\qquad t\in\mathbb R
```

<a id="harmonics"></a>

**Period → harmonics → weighted sum**

```math
x(t+T_{0})=x(t),\qquad
\phi_{k}(t)=e^{j2\pi kf_{0}t},\qquad
\boxed{f_{k}=kf_{0}}
```

```math
\begin{aligned}
k=0&:\quad \phi_{0}(t)=1 &&\text{DC / offset}\\
k=\pm1&:\quad e^{\pm j2\pi f_{0}t} &&\text{fundamental pair}\\
k=\pm2&:\quad e^{\pm j2\pi(2f_{0})t} &&\text{second harmonic pair}
\end{aligned}
```

```math
\phi_{k}(t+T_{0})=\phi_{k}(t)\underbrace{e^{j2\pi k}}_{1}
=\phi_{k}(t),\qquad T_{k}=\frac{T_{0}}{|k|}\quad(k\ne0)
```

```math
\underbrace{\cos(2\pi t)}_{T=1\,\mathrm{s}}
+\underbrace{\tfrac12\cos(4\pi t)}_{T=\frac12\,\mathrm{s}}
\quad\xrightarrow{\ t\mapsto t+1\ }\quad\text{same sum}
```

```math
T_{0}\longrightarrow\{kf_{0}:k\in\mathbb Z\},
\qquad x_{k}=0\longrightarrow\text{absent component}
```

```math
\underbrace{\{x_{k}\}\longrightarrow x(t)}_{\text{synthesis}}
\qquad
\underbrace{x(t)\longrightarrow\{x_{k}\}}_{\text{analysis}}
```

Constant: $\forall T>0,\ x(t+T)=x(t)$ → no smallest period; arbitrary $T_{0}>0$

↔ [Periodic signals / complex exponential](./chapter-2-signals-and-properties.md)

<a id="coefficients"></a>

**Coefficient → magnitude / phase**

```math
\boxed{x_{k}=|x_{k}|e^{j\phi_{k}}}
\quad\Longrightarrow\quad
x_{k}e^{j2\pi kf_{0}t}
=\underbrace{|x_{k}|}_{\text{magnitude}}
e^{j(2\pi kf_{0}t+\underbrace{\phi_{k}}_{\text{phase offset}})}
```

$x_{k}\ne0:\ \phi_{k}=\angle x_{k}$ · phase inside coefficient

Grid voltage: fundamental + higher harmonics → distortion; higher-harmonic contribution relative to fundamental

<a id="real-signals"></a>

**Real signal → conjugate pairs → real cosines**

```math
x:\mathbb R\to\mathbb R
\quad\Longrightarrow\quad
\boxed{x_{-k}=x_{k}^{\ast}}
\quad\Longrightarrow\quad
\begin{aligned}
|x_{-k}|&=|x_{k}|\\
\angle x_{-k}&\equiv-\angle x_{k}\pmod{2\pi}\\
x_{0}&\in\mathbb R
\end{aligned}
```

**Real-valued ≠ even waveform · conjugate symmetry ≠ equal coefficients**

```math
\boxed{x_{k}=a+jb\quad\Longrightarrow\quad x_{-k}=a-jb}
\qquad x_{-k}=x_{k}\iff x_{k}\in\mathbb R
```

Phases: nonzero coefficients only

```math
x_{15}=\frac{\sqrt3}{40}-\frac{j}{40},\qquad
x_{-15}=\frac{\sqrt3}{40}+\frac{j}{40}=x_{15}^{\ast}\ne x_{15}
```

```math
\begin{aligned}
x(t)
&=x_{0}+\sum_{k=1}^{\infty}
\left(x_{k}e^{j2\pi kf_{0}t}+x_{k}^{\ast}e^{-j2\pi kf_{0}t}\right)\\
&=x_{0}+2\sum_{k=1}^{\infty}\mathrm{Re}\left\{x_{k}e^{j2\pi kf_{0}t}\right\}\\
&=\boxed{x_{0}+\sum_{k=1}^{\infty}
\underbrace{2|x_{k}|}_{\text{cosine amplitude}}
\cos\left(2\pi kf_{0}t+\underbrace{\angle x_{k}}_{\text{cosine phase}}\right)}.
\end{aligned}
```

Cosine form: nonzero pairs; zero pairs omitted

```math
\underbrace{2\cos\theta}_{\text{amplitude }2}
=2\frac{e^{j\theta}+e^{-j\theta}}{2}
=\underbrace{e^{j\theta}+e^{-j\theta}}_{\text{coefficients }1,1}
```

```math
3+2\cos(2\pi t)
\quad\Longrightarrow\quad x_{0}=3,\quad x_{1}=x_{-1}=1
```

Complex-valued counterexample:

```math
x(t)=e^{j2\pi t}:\qquad x_{1}=1,\quad x_{-1}=0
```

---

## Fourier Series Analysis

**Target: extract the coefficient**

$$
x(t)=\cdots+
\underbrace{x_{k}}_{\text{unknown coefficient}}
\underbrace{e^{j2\pi kf_{0}t}}_{\text{known component}}
+\cdots
$$

$$
\underbrace{x_{k}e^{j2\pi kf_{0}t}}_{\text{target component}}
\;\times\;
\underbrace{e^{-j2\pi kf_{0}t}}_{\text{cancel its exponential}}
=\boxed{x_{k}}
$$

```math
\int_{0}^{T_{0}}|x(t)|\,dt<\infty,
\qquad
\boxed{x_{k}=\frac{1}{T_{0}}\int_{0}^{T_{0}}
x(t)e^{-j2\pi kf_{0}t}\,dt}
```

Fixed $k$: target coefficient · $n$: component index

```math
\underbrace{x_{n}e^{j2\pi nf_{0}t}}_{\text{component }n}
\underbrace{e^{-j2\pi kf_{0}t}}_{\text{target }k}
=x_{n}e^{j2\pi(n-k)f_{0}t}
```

```math
\frac{1}{T_{0}}\int_{0}^{T_{0}}
x_{n}e^{j2\pi(n-k)f_{0}t}\,dt
=\begin{cases}
x_{k},&n=k\\
0,&n\ne k
\end{cases}
```

```math
x(t)=3+2e^{j2\pi t}+5e^{j4\pi t},\qquad T_{0}=1,\quad k=1
```

```math
\begin{aligned}
x_{1}
&=\int_{0}^{1}x(t)e^{-j2\pi t}\,dt\\
&=\int_{0}^{1}\left(3e^{-j2\pi t}+2+5e^{j2\pi t}\right)dt\\
&=\underbrace{0}_{\text{one cycle}}+
\underbrace{2}_{\text{constant}}+
\underbrace{0}_{\text{one cycle}}=\boxed{2}.
\end{aligned}
```

```math
e^{j2\pi t}=\cos(2\pi t)+j\sin(2\pi t),\qquad
\int_{0}^{1}\cos(2\pi t)dt=\int_{0}^{1}\sin(2\pi t)dt=0
```

---

**Sinusoid → visible harmonics → coefficient check**

```math
A\sin(2\pi mf_{0}t+\phi)
=\underbrace{\frac{Ae^{j\phi}}{2j}}_{x_{m}}e^{j2\pi mf_{0}t}
+\underbrace{-\frac{Ae^{-j\phi}}{2j}}_{x_{-m}}e^{-j2\pi mf_{0}t},
\qquad m=1,2,\ldots
```

$f_{0}$: whole signal's fundamental frequency · $m$: harmonic index · $A$: amplitude, not index

```math
x(t)=\sin(2\pi f_{0}t)
\quad\Longrightarrow\quad
x_{k}=\frac{f_{0}}{2j}\int_{0}^{1/f_{0}}
\left[e^{-j2\pi(k-1)f_{0}t}-e^{-j2\pi(k+1)f_{0}t}\right]dt
```

$k\pm1$: this signal's $\pm f_{0}$ components; not a general analysis formula

```math
\begin{aligned}
k=1&:\quad k-1=0
&&\Rightarrow x_{1}=\frac{f_{0}}{2j}
\underbrace{\int_{0}^{1/f_{0}}1\,dt}_{1/f_{0}}=-\frac{j}{2}\\
k=-1&:\quad k+1=0
&&\Rightarrow x_{-1}=\frac{j}{2}\\
k\notin\{-1,1\}&:\quad k-1\ne0,\ k+1\ne0
&&\Rightarrow x_{k}=0
\end{aligned}
```

Practice: [mixed harmonics → coefficients / plot](./chapter-7-representative-problems.md#coefficients)

Match exponent → read coefficient

```math
e^{j(2\pi ft+\phi)}
=\underbrace{e^{j\phi}}_{\text{constant coefficient factor}}e^{j2\pi ft}
```

---

<a id="convergence"></a>

## Convergence

```math
\underbrace{x_N(t)=\sum_{k=-N}^{N}x_ke^{j2\pi kf_0t}}_{\text{symmetric index range}}
\quad\xrightarrow{N\to\infty}\quad
\widetilde{x}(t)\stackrel{?}{=}x(t)
```

**Sufficient condition: piecewise continuously differentiable over one period**

```math
a_0<a_1<\cdots<a_M=a_0+T_0,\qquad M<\infty
```

```math
x|_{(a_{r-1},a_r)}\text{ extends to }C^1([a_{r-1},a_r])
```

Smooth within pieces · finite break points · corners / jumps allowed

```math
\boxed{
\widetilde{x}(t)=
\begin{cases}
x(t),&x\text{ continuous at }t,\\
\frac{x(t^-)+x(t^+)}{2},&t\text{ a jump}.
\end{cases}}
```

![Smooth pieces, a continuous corner, a jump, and Fourier partial sums approaching the jump midpoint](./images/chapter-7-convergence.svg)

Practice: [real waveform → coefficient plot](./chapter-7-representative-problems.md#coefficients)

---

**Why sinusoidal components?**

```math
\frac{d}{dt}\cos(\omega t)
=\omega\cos\left(\omega t+\frac{\pi}{2}\right)
```

Stable LTI · sinusoidal steady state:

```math
A\cos(2\pi ft+\phi)
\xrightarrow{S}
A|H(f)|\cos\left(2\pi ft+\phi+\angle H(f)\right)
```

Same frequency · magnitude / phase changes · AC phasors

↔ [LTI / convolution](./chapter-6-lti-and-convolution.md)
