<!-- AI-assisted partial note: Signals_and_System_02Oct.pdf, pp. 115-117, through §7.2.1; user's source-reading reasoning sequence. -->

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

Conjugate symmetry ≠ equal coefficients · phases: nonzero coefficients only

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
