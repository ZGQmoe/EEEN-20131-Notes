<!-- AI-assisted partial note: Signals_and_System_02Oct.pdf, pp. 115-117, through the analysis equation in §7.2.2; user's source-reading reasoning sequence. Orthogonality derivation: finite sums; extension to infinite series requires justification of termwise integration. -->

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

$x_{k}\ne x(k)$ · representation of $x$, not an operation $Sx$

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

Common period $T_{0}$ ≠ common **smallest** period

```math
\underbrace{\cos(2\pi t)}_{T=1\,\mathrm{s}}
+\underbrace{\tfrac12\cos(4\pi t)}_{T=\frac12\,\mathrm{s}}
\quad\xrightarrow{\ t\mapsto t+1\ }\quad\text{same sum}
```

```math
T_{0}\longrightarrow\{kf_{0}:k\in\mathbb Z\},
\qquad x_{k}=0\longrightarrow\text{absent component}
```

Known period ≠ known composition · finite / infinite nonzero coefficients

```math
\underbrace{\{x_{k}\}\longrightarrow x(t)}_{\text{synthesis}}
\qquad
\underbrace{x(t)\longrightarrow\{x_{k}\}}_{\text{analysis}}
```

Constant: $\forall T>0,\ x(t+T)=x(t)$ → no smallest period; arbitrary $T_{0}>0$

↔ [Periodic signals / complex exponential](./chapter-2-signals-and-properties.md)

**Infinite sum → symmetric partial sums**

```math
S_{N}(t)=\sum_{k=-N}^{N}x_{k}e^{j2\pi kf_{0}t},
\qquad
\begin{aligned}
N=0&:\quad k=0\\
N=1&:\quad k=-1,0,1\\
N=2&:\quad k=-2,-1,0,1,2
\end{aligned}
```

```math
\boxed{S_{N}(t)\xrightarrow{N\to\infty}x(t)}
\qquad t\text{ fixed};\quad N\to\infty\ne t\to\infty
```

Synthesis equality: wherever the limit equals $x(t)$; not automatically at jumps

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

Magnitude: even · opposite phases modulo $2\pi$, nonzero coefficients only

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

$k$: component index, not time

$$
\underbrace{x_{k}e^{j2\pi kf_{0}t}}_{\text{target component}}
\;\times\;
\underbrace{e^{-j2\pi kf_{0}t}}_{\text{cancel its exponential}}
=\boxed{x_{k}}
$$

$$
e^{j\theta}e^{-j\theta}=1,\qquad
e^{j\theta}e^{j\theta}=e^{j2\theta}
$$

Negative exponent → cancel target oscillation · period average → remove other components

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

- $n=k$: exponent cancellation → constant $x_{k}$ → same average
- $n\ne k$: nonzero integer cycles over $T_{0}$ → zero average

**Zero after integration; not before · complete cycles, not arbitrary intervals**

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

All $k\ge2$: same zero-average argument; not extrapolation from $k=0,1$

```math
\begin{aligned}
&\cos(2\pi f_{0}t)+0.1\sin\left(2\pi15f_{0}t+\frac{\pi}{3}\right)\\
&=\underbrace{\frac12}_{x_{1}}e^{j2\pi f_{0}t}
+\underbrace{\frac12}_{x_{-1}}e^{-j2\pi f_{0}t}\\
&\quad+\underbrace{\frac{0.1e^{j\pi/3}}{2j}}_{x_{15}}e^{j2\pi15f_{0}t}
+\underbrace{-\frac{0.1e^{-j\pi/3}}{2j}}_{x_{-15}}e^{-j2\pi15f_{0}t}
\end{aligned}
```

Match exponent → read coefficient · negative frequency ≠ negative coefficient

```math
e^{j(2\pi ft+\phi)}
=\underbrace{e^{j\phi}}_{\text{constant coefficient factor}}e^{j2\pi ft}
```

Phase retained inside coefficient; same waveform

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
