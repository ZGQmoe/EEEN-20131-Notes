# Laplace Transform — Working Note

<!-- Working note: first discussion 2026-11-12; system responses added 2026-11-16. -->

## Transform and complex frequency

```math
X(s)=\mathcal L\{x\}(s)=\int_{0}^{\infty}x(t)e^{-st}\thinspace dt,
\qquad s=\sigma+j\omega
```

```math
e^{-st}=e^{-\sigma t}e^{-j\omega t}
```

- $\sigma$: exponential weighting / convergence direction.
- $\omega$: angular frequency, $\omega=2\pi f$.
- Fourier transform: the $\sigma=0$ slice, when the integral exists.
- One-sided transform · $t=0$ as the switching or observation time · $x(t)u(t)$ for right-sided support · stored pre-switch state via initial conditions.

## Region of convergence (ROC)

<!-- Source: Signals_and_System_15Nov.pdf, §§8.2.2–8.2.3, pp. 170–172. -->

```math
\begin{aligned}
\left|x(t)e^{-(\sigma+j\omega)t}\right|
&=\left|x(t)\right|e^{-\sigma t},\\
I(\sigma)&=\int_{0}^{\infty}\left|x(t)\right|e^{-\sigma t}\thinspace dt,\\
\mathrm{ROC}&=\lbrace \sigma+j\omega: I(\sigma)<\infty,\ \omega\in\mathbb{R}\rbrace .
\end{aligned}
```

$\left|e^{-j\omega t}\right|=1$ · absolute convergence depends on $\sigma$ alone.
$\sigma_{1}>\sigma_{0}$ · $e^{-\sigma_{1}t}\leq e^{-\sigma_{0}t}$ for $t\geq 0$ · $I(\sigma_{1})\leq I(\sigma_{0})$.
Abscissa of convergence $\sigma_{x}=\inf\lbrace \sigma:I(\sigma)<\infty\rbrace$ · threshold set by $x(t)$ · test the boundary separately.

```math
x(t)=1,\ t\ge0:
\qquad X(s)=\frac{1}{s},
\qquad \mathrm{Re}(s)>0
```

```math
\begin{aligned}
x(t)&=e^{t},\quad t\geq 0,\\
I(\sigma)&=\int_{0}^{\infty}e^{(1-\sigma)t}\thinspace dt<\infty
\quad\Longleftrightarrow\quad \sigma>1,\\
X(s)&=\lim_{T\to\infty}\frac{1-e^{-(s-1)T}}{s-1}
=\frac{1}{s-1},\qquad \mathrm{Re}(s)>1 .
\end{aligned}
```

$s=1+j2$ · finite rational value · the upper-limit term keeps oscillating · outside the ROC.

```math
x(t)=1,\ 0\le t<2:
\qquad X(s)=\frac{1-e^{-2s}}{s},
\qquad \mathrm{ROC}=\mathbb C
```

At $s=0$, the displayed fraction is $0/0$; the singularity is removable and $X(0)=\int_0^2 1\thinspace dt=2$. Finite time support removes the infinite-time convergence issue.

## Inverse transform and partial fractions

<!-- Source: Signals_and_System_15Nov.pdf, §8.2.4, pp. 172–173. -->

```math
x(t),\quad t\in[0,\infty)
\quad\overset{\mathcal{L}}{\underset{\mathcal{L}^{-1}}{\rightleftarrows}}\quad
X(s),\quad \forall s\in\mathbb{C}\ \text{with}\ \mathrm{Re}(s)>\sigma_{x}.
```

Right-sided signal · whole open half-plane · inverse from any vertical line $\mathrm{Re}(s)=\sigma>\sigma_{x}$.

```math
\begin{aligned}
X(\sigma+j\omega)&=\mathcal{F}_{\omega}\{x(t)e^{-\sigma t}\},\\
x(t)&=e^{\sigma t}\mathcal{F}_{\omega}^{-1}\{X(\sigma+j\omega)\}
=\frac{1}{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}
X(s)e^{st}\thinspace ds .
\end{aligned}
```

Fixed $\sigma$ · one Fourier spectrum over all $\omega$ · inverse Fourier, then remove the weight · $ds=j\thinspace d\omega$ · Bromwich integral, for $t>0$ at continuity points.

```math
\mathcal L\{e^{-at}\}(s)
=\int_0^\infty e^{-(s+a)t}\thinspace dt
=\frac{1}{s+a},
\qquad \mathrm{Re}(s)>-a
```

Linearity lets each partial-fraction term map through a transform pair:

```math
\frac{1}{(s+1)(s+3)}
=\frac{1/2}{s+1}-\frac{1/2}{s+3}
\quad\longleftrightarrow\quad
x(t)=\frac12e^{-t}-\frac12e^{-3t},\ t\ge0
```

The table records pairs derived from the defining integral; it avoids repeating each integral.

## Laplace properties

<!-- Source: Signals_and_System_15Nov.pdf, §8.2.5, pp. 173–174. -->

| Property | Time domain ↔ Laplace domain |
| --- | --- |
| Linearity | $A x_{1}(t)+B x_{2}(t) \leftrightarrow A X_{1}(s)+B X_{2}(s)$ |
| Delay by $t_{0}\geq 0$ | $x(t-t_{0})u(t-t_{0}) \leftrightarrow e^{-s t_{0}}X(s)$ |
| Time scaling, $a>0$ | $x(at) \leftrightarrow \frac{1}{a}X\left(\frac{s}{a}\right)$ |
| Conjugation | $x(t)^{\ast} \leftrightarrow \bigl[X(s^{\ast})\bigr]^{\ast}$ |
| Convolution | $(x_{1}\ast x_{2})(t) \leftrightarrow X_{1}(s)X_{2}(s)$ |
| Differentiation | [Derivative and initial condition](#derivative-and-initial-condition) |
| Integration from zero | $\int_{0}^{t}x(\tau)\thinspace d\tau \leftrightarrow \frac{X(s)}{s}$ |

Linearity and convolution · shared ROC gives a guaranteed domain. Integration · guaranteed for $\mathrm{Re}(s)>\max(\sigma_{x},0)$.

## Derivative and initial condition

```math
\mathcal L\{x'(t)\}
=\int_0^\infty x'(t)e^{-st}\thinspace dt
=\left[x(t)e^{-st}\right]_0^\infty+sX(s)
=sX(s)-x(0^+)
```

Within the ROC, the upper boundary term vanishes; the lower boundary is $x(0^+)e^0$, subtracted. The derivative of the kernel is $-se^{-st}$, producing $+sX(s)$ after integration by parts.

## Differential equation and transfer function

For $y'(t)+2y(t)=x(t)$:

```math
sY(s)-y(0^+)+2Y(s)=X(s)
```

Zero initial condition gives:

```math
H(s)=\frac{Y(s)}{X(s)}=\frac{1}{s+2}
```

With a unit-step input, $X(s)=1/s$:

```math
Y(s)=\frac{1}{s(s+2)}
=\frac12\left(\frac1s-\frac1{s+2}\right)
\quad\longleftrightarrow\quad
y(t)=\frac12(1-e^{-2t}),\ t\ge0
```

Zero initial condition isolates the input-driven response for $H=Y/X$. Nonzero initial state contributes an additional natural response.

## LTI convolution and output poles

```math
y_{\mathrm{zs}}(t)=h(t)\ast x(t)
\quad\longleftrightarrow\quad
Y_{\mathrm{zs}}(s)=H(s)X(s),
\qquad H(s)=\mathcal L\{h(t)\}
```

Use the product identity on a shared region where the transforms are defined. Output poles can originate from either factor:

- poles of $H(s)$: system natural modes;
- poles of $X(s)$: modes supplied by the input.

For $H=1/(s+2)$ and a step input $X=1/s$, the output has a pole at $-2$ from the system transient and one at $0$ from the input's steady component.

<!-- Second lecture provenance: Transfer_functions_and_system_responses.pdf, pp. 2–17; https://canvas.manchester.ac.uk/courses/88089/files/16532001?module_item_id=4404401 -->

## First-order responses and RC

```math
\tau\dot y+y=kx,\qquad \tau>0,\qquad
H(s)=\frac{k}{\tau s+1},\qquad H(0)=k,\qquad p=-\frac{1}{\tau}
```

```math
\underbrace{Y(s)}_{\text{total}}
=\underbrace{H(s)X(s)}_{\text{zero state}}
+\underbrace{\frac{y_{0}}{s+1/\tau}}_{\text{zero input}},\qquad y_{0}=y(0^{+})
```

RC · capacitor output · KVL $x=Ri+y,\ i=C\dot y$ · $\tau=RC,\ k=1$. Initial capacitor voltage $y_{0}=V_{0}$ → $V_{0}e^{-t/(RC)}$. ↔ [RC differential equation and initial state](./chapter-6-lti-and-convolution.md#ode)

<!-- Source: Signals_and_System_15Nov.pdf, §8.1, pp. 167–169. -->

```math
RC\dot v_{C}=v_{\mathrm{in}}-v_{C}
\quad\Longrightarrow\quad
V_{C}(s)=\frac{1}{RCs}\bigl[V_{\mathrm{in}}(s)-V_{C}(s)\bigr]
\qquad \text{(zero initial voltage)}.
```

Feedback view · integrator $1/s$ · $v_{C}$ fed back into the difference · collect $V_{C}$ terms for the closed-loop transfer function · assess the poles of the whole loop.

### System and input poles

| Source in the first-order examples | Pole(s) | Time-domain term |
| --- | --- | --- |
| $H(s)=k/(\tau s+1)$ | $-1/\tau$ | $Be^{-t/\tau}$ · system transient |
| Unit step · $X(s)=1/s$ | $0$ | Constant · step steady state |
| Switched-on sine · $X(s)=\omega_{0}/(s^{2}+\omega_{0}^{2})$ | $\pm j\omega_{0}$ | Sine and cosine at $\omega_{0}$ · sinusoidal steady state |

```math
x(t)=1,\quad y(0^{+})=0
\quad\Longrightarrow\quad y(t)=\underbrace{k}_{\text{steady state}}
-\underbrace{k e^{-t/\tau}}_{\text{transient}}
```

Natural term $Be^{-t/\tau}$ · pole $\to$ decay rate $1/\tau$ · initial condition and input $\to$ coefficient $B$ · step from rest $B=-k$ · zero input $B=y_{0}$.

### Switched-on sine

```math
\frac{\omega_{0}}{s^{2}+\omega_{0}^{2}}\longleftrightarrow\sin(\omega_{0}t),
\qquad
\frac{s}{s^{2}+\omega_{0}^{2}}\longleftrightarrow\cos(\omega_{0}t),
\qquad t\geq 0
```

```math
Y=HX
\quad\longrightarrow\quad
\frac{P}{s+1/\tau}+\frac{Qs+T}{s^{2}+\omega_{0}^{2}}
\quad\longrightarrow\quad y_{\mathrm{tr}}+y_{\mathrm{ss}}
```

Partial fractions · one constant numerator for the linear factor · linear numerator for the quadratic factor · clear denominators and match powers of $s$.

```math
\begin{aligned}
x(t)&=A\sin(\omega_{0}t),\qquad t\geq 0,\\
y_{\mathrm{ss}}(t)&=A\lvert H(j\omega_{0})\rvert
\sin\bigl(\omega_{0}t+\arg H(j\omega_{0})\bigr)
\qquad\text{(stable system)}.
\end{aligned}
```

RC from rest · $\tau=0.1$ s · $x(t)=\sin(10t)$ V · $H(s)=10/(s+10)$ · $H(j10)=1/(1+j)$.

```math
y(t)=\underbrace{\frac{1}{2}e^{-10t}}_{\text{transient}}
+\underbrace{\frac{1}{\sqrt{2}}\sin(10t-\pi/4)}_{\text{steady state}},
\qquad y(0^{+})=0
```

Steady-state gain and phase measurements · wait for the transient to become negligible · after $5\tau$, about 0.67% of its initial amplitude for this exponential.

<!-- Source: Signals_and_System_15Nov.pdf, §8.3, p. 175. -->

**Unstable system** · causal $H(s)=1/(s-1)$ · ROC $\mathrm{Re}(s)>1$ · input $\sin t$ switched on from rest.

```math
H(j)=\frac{-1-j}{2},
\qquad
y(t)=\underbrace{-\frac{1}{2}(\sin t+\cos t)}_{\text{forced sinusoid}}
+\underbrace{\frac{1}{2}e^{t}}_{\text{growing natural mode}},
\qquad t\geq 0.
```

$s=j$ outside the ROC · algebraic evaluation gives the gain and phase of the sinusoidal particular solution · pole at $+1$ excited by switch-on, even from rest · growing total response · no sinusoidal steady state.

<!-- Second lecture provenance: Transfer_functions_and_system_responses.pdf, pp. 18–30. -->

## Second-order responses and RLC

```math
H(s)=\frac{k\omega_{n}^{2}}{s^{2}+2\zeta\omega_{n}s+\omega_{n}^{2}},
\qquad
p_{1,2}=-\zeta\omega_{n}\pm\omega_{n}\sqrt{\zeta^{2}-1}
```

$k=H(0)$ · $\omega_{n}$ natural angular frequency · $\zeta$ damping ratio · constant nonzero numerator $\to$ no finite zeros.

```math
\begin{aligned}
0<\zeta<1 &: \quad p=-\zeta\omega_{n}\pm j\omega_{d},
\qquad \omega_{d}=\omega_{n}\sqrt{1-\zeta^{2}} \quad \text{(underdamped)},\\
\zeta=1 &: \quad p=-\omega_{n}\ \text{(double pole)},
\qquad y_{\mathrm{tr}}=(B+Dt)e^{-\omega_{n}t}\quad\text{(critical)},\\
\zeta>1 &: \quad p_{1},p_{2}<0,\qquad
y_{\mathrm{tr}}=Be^{p_{1}t}+De^{p_{2}t}\quad\text{(overdamped)}.
\end{aligned}
```

Underdamped pole plot · horizontal coordinate $-\zeta\omega_{n}$ $\to$ envelope · vertical coordinate $\pm\omega_{d}$ $\to$ oscillation · $\lvert p\rvert=\omega_{n}$ · $\zeta=-\mathrm{Re}(p)/\omega_{n}$. Fixed $\omega_{n}$, for $0<\zeta<1$ · increasing $\zeta$ moves the pair toward the negative real axis.

```math
\begin{aligned}
y_{\mathrm{tr}}(t)&=e^{-\zeta\omega_{n}t}\bigl[B\cos(\omega_{d}t)+D\sin(\omega_{d}t)\bigr],\\
y(0^{+})&=y_{\mathrm{ss}}(0^{+})+B,\\
\dot y(0^{+})&=\dot y_{\mathrm{ss}}(0^{+})-\zeta\omega_{n}B+\omega_{d}D
\qquad(0<\zeta<1).
\end{aligned}
```

$B$ from initial output · $D$ from initial slope · $\zeta>0$ $\to$ natural terms decay. Unit step $\to y_{\mathrm{ss}}=k$ · sinusoid $\to$ steady oscillation at input $\omega_{0}$, transient oscillation at system $\omega_{d}$.

### Series RLC with capacitor output

```math
x=Ri+L\dot i+y,\quad i=C\dot y
\quad\Longrightarrow\quad LC\ddot y+RC\dot y+y=x
```

```math
y(0^{+})=i(0^{+})=0\quad\Longrightarrow\quad
H(s)=\frac{1}{LCs^{2}+RCs+1},\qquad
\omega_{n}=\frac{1}{\sqrt{LC}},\quad
2\zeta\omega_{n}=\frac{R}{L}
```

Initial state · capacitor voltage and inductor current · $\dot y(0^{+})=i(0^{+})/C$. Positive $R,L,C$ · negative root sum and positive root product · both poles in the left half-plane.

Worked example · $L=1$ H, $C=100\thinspace \mu\mathrm{F}$, $R=100\thinspace \Omega$ · $\omega_{n}=100\thinspace \mathrm{rad/s}$, $\zeta=1/2$ · input $\sin(100t)$ V from rest.

```math
\frac{10^{6}}{(s^{2}+10000)(s^{2}+100s+10000)}
=
\underbrace{\frac{-s}{s^{2}+10000}}_{\text{input poles}}
+\underbrace{\frac{(s+50)+50}{(s+50)^{2}+(50\sqrt{3})^{2}}}_{\text{system poles}}
```

Two quadratic factors · a linear numerator over each · match powers · complete the square in the system factor · split the numerator at $s+50$ for the shifted sine and cosine pairs.

```math
y(t)=\underbrace{-\cos(100t)}_{\text{steady state}}
+\underbrace{e^{-50t}\left[\cos(50\sqrt{3}\thinspace t)
+\frac{1}{\sqrt{3}}\sin(50\sqrt{3}\thinspace t)\right]}_{\text{transient}},
\qquad y(0^{+})=\dot y(0^{+})=0
```

$H(j100)=-j$ · unit gain, phase lag $\pi/2$ · same steady-state term by direct evaluation. $\omega_{0}=\omega_{n}$ in this example · $\omega_{d}=50\sqrt{3}$ · envelope $e^{-50t}$.

## Poles, zeros, stability, minimum phase

<!-- Source: Signals_and_System_15Nov.pdf, §§8.3.1–8.4.1, pp. 175–179. -->

$H(s)=B(s)/A(s)$ in reduced form · $M=\deg B$, $N=\deg A$ · system order $N$.

- $M<N$ · strictly proper · $H(s)\to0$ at high frequency.
- $M=N$ · biproper · nonzero high-frequency limit · direct feedthrough.
- $M>N$ · improper · unbounded high-frequency gain.
- Proper · $M\leq N$ · stability classification via pole locations.

- Poles: denominator roots; a pole $p=\sigma+j\omega$ corresponds to an exponential/oscillatory mode.
- Zeros: numerator roots; they shape the response and phase.
- For a causal rational system, the ROC lies right of the rightmost pole. BIBO stability requires the imaginary axis to lie inside the ROC; for proper causal rational systems this means all poles are strictly in the left half-plane.
- A simple imaginary-axis pole can give sustained natural oscillation; it is generally not BIBO stable. A right-half-plane pole or repeated imaginary-axis pole is unstable.
- A stable system is minimum phase when its inverse is stable. A right-half-plane zero becomes a right-half-plane pole in the inverse; the forward system may still be stable.

<!-- Second lecture provenance: Transfer_functions_and_system_responses.pdf, pp. 31–32. -->

### Added zero and initial undershoot

```math
\widehat H(s)=(1+\xi s)H(s),\qquad
z=-\frac{1}{\xi},\qquad
\widehat y_{\mathrm{step}}=y_{\mathrm{step}}+\xi\dot y_{\mathrm{step}}
```

Hat · modified transfer function · same poles for the example · left-half-plane poles and a right-half-plane zero $\to$ stable forward system, unstable inverse · non-minimum phase.

```math
\widehat H(s)=\frac{1-s}{s^{2}+0.25s+1},
\qquad z=+1,\qquad
\dot{\widehat y}_{\mathrm{step}}(0^{+})=-1,\qquad
\widehat y_{\mathrm{step}}(\infty)=1
```

Unit step from rest · negative initial slope via $\xi\ddot y_{\mathrm{step}}(0^{+})$ · positive final value · initial undershoot.

## Initial-value and final-value theorems

<!-- Source: Signals_and_System_15Nov.pdf, §8.2.6, p. 174; Laplace_Transform_lecture1.pdf, Initial and final value theorems. -->

```math
\underbrace{x(0^{+})}_{\text{initial value}}
=\lim_{s\to+\infty}sX(s),
\qquad
\underbrace{\lim_{t\to\infty}x(t)}_{\text{final value}}
=\lim_{s\to0^{+}}sX(s).
```

```math
sX(s)=\int_{0}^{\infty}x(t)\thinspace se^{-st}\thinspace dt
=\int_{0}^{\infty}x\!\left(\frac{u}{s}\right)e^{-u}\thinspace du,
\qquad s>0\text{ in the ROC},\quad u=st.
```

- Initial value · large positive $s$ · $u/s\to0^{+}$ · finite right limit and ordinary bounded signal as in the lecture.
- Final value · small positive $s$ · $u/s\to\infty$ for $u>0$ · finite time-domain limit required.
- Weight $se^{-st}$ · unit area · time scale $1/s$.
- Causal rational $X(s)$ · final-value check on $sX(s)$ after cancellation · every remaining pole strictly in the left half-plane.

### General proofs

```math
sX(s)-L=\int_{0}^{\infty}\bigl[x(t)-L\bigr]se^{-st}\thinspace dt,
\qquad \int_{0}^{\infty}se^{-st}\thinspace dt=1,
\qquad s>0\text{ in the ROC}.
```

**Initial value** · $L=x(0^{+})$ finite · some real $a>0$ in the absolute ROC.
Given $\varepsilon>0$, choose $\delta>0$ with $\lvert x(t)-L\rvert<\varepsilon$ for $0<t<\delta$.

```math
\begin{aligned}
\lvert sX(s)-L\rvert
&\leq \int_{0}^{\delta}\lvert x(t)-L\rvert se^{-st}\thinspace dt
 + \int_{\delta}^{\infty}\lvert x(t)-L\rvert se^{-st}\thinspace dt\\
&\leq \varepsilon+
\underbrace{s e^{-(s-a)\delta}}_{\to 0\ \text{as}\ s\to+\infty}
\underbrace{\int_{\delta}^{\infty}\lvert x(t)-L\rvert e^{-at}\thinspace dt}_{\text{finite, independent of }s},
\qquad s>a.
\end{aligned}
```

**Final value** · $x$ locally integrable · $L=\lim_{t\to\infty}x(t)$ finite · bounded tail gives absolute convergence for every $s>0$.
Given $\varepsilon>0$, choose $T$ with $\lvert x(t)-L\rvert<\varepsilon$ for $t\geq T$.

```math
\begin{aligned}
\lvert sX(s)-L\rvert
&\leq \int_{0}^{T}\lvert x(t)-L\rvert se^{-st}\thinspace dt
 + \int_{T}^{\infty}\lvert x(t)-L\rvert se^{-st}\thinspace dt\\
&\leq \underbrace{s\int_{0}^{T}\lvert x(t)-L\rvert\thinspace dt}_{\to 0\ \text{as}\ s\to0^{+}}
+\varepsilon .
\end{aligned}
```

Both bounds · limit superior of the error at most $\varepsilon$ · arbitrary $\varepsilon>0$ gives zero error in the limit.

```math
X(s)=\frac{1}{s(s+2)}
\quad\Longrightarrow\quad sX(s)=\frac{1}{s+2}
\quad\Longrightarrow\quad x(0^{+})=0,\qquad x(\infty)=\frac{1}{2}.
```

$x(t)=\sin t$ · $sX(s)=s/(s^{2}+1)\to0$ as $s\to0^{+}$ · poles at $\pm j$ · sustained oscillation · no final value.

## Focused recall prompts

1. Derive $\mathcal L[x']=sX-x(0^{+})$; identify both boundary terms.
2. Why can $1/(s-1)$ be finite at $s=1+j2$ while that point is outside the ROC?
3. Why does a finite-duration signal have no infinite-time convergence boundary?
4. From $y'+2y=x$, derive $H=Y/X$ and state the initial-condition assumption.
5. In $Y=HX$, distinguish a pole inherited from the input from a system pole.
6. State the stability test using the ROC; distinguish it from minimum-phase classification.
7. Explain what the initial-value and final-value theorems return, and when they may be used.

8. **Closed book · first-order sine.** Given $\tau\dot y+y=kx$, $x(t)=\sin(\omega_{0}t)$ for $t\geq 0$, $y(0^{+})=0$: derive $H$, decompose $Y=HX$, and recover $y_{\mathrm{tr}}$ and $y_{\mathrm{ss}}$. Check $y(0^{+})$ and verify steady-state gain and phase with $H(j\omega_{0})$.
9. **Closed book · RLC.** Given $L=1$ H, $C=100\thinspace \mu\mathrm{F}$, $R=100\thinspace \Omega$, and $\sin(100t)$ V from rest: derive $H$ from KVL, locate both pole pairs, and rebuild the two time-domain terms. Check both initial conditions.
