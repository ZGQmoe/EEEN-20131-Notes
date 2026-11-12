# Laplace Transform — Working Note

> 2026-11-12 discussion draft. Captures the concepts connected in conversation; full lecture reading and problem practice remain to be done.

## Transform and complex frequency

```math
X(s)=\mathcal L\{x\}(s)=\int_{0}^{\infty}x(t)e^{-st}\,dt,
\qquad s=\sigma+j\omega
```

```math
e^{-st}=e^{-\sigma t}e^{-j\omega t}
```

- \(\sigma\): exponential weighting / convergence direction.
- \(\omega\): angular frequency, \(\omega=2\pi f\).
- Fourier transform: the \(\sigma=0\) slice, when the integral exists.
- The one-sided integral starts at \(t=0\); multiplying by \(u(t)\) gates a signal to \(t\ge0\). A step response is \(h*u\), a different object.

## Region of convergence (ROC)

ROC is determined by convergence of the original integral; a rational expression alone is not enough.

```math
x(t)=1,\ t\ge0:
\qquad X(s)=\frac{1}{s},
\qquad \operatorname{Re}(s)>0
```

```math
x(t)=e^t,\ t\ge0:
\qquad X(s)=\frac{1}{s-1},
\qquad \operatorname{Re}(s)>1
```

At \(s=1+j2\), the fraction is finite, but the integral does not converge: this point lies outside the ROC.

```math
x(t)=1,\ 0\le t<2:
\qquad X(s)=\frac{1-e^{-2s}}{s},
\qquad \mathrm{ROC}=\mathbb C
```

At \(s=0\), the displayed fraction is \(0/0\); the singularity is removable and \(X(0)=\int_0^2 1\,dt=2\). Finite time support removes the infinite-time convergence issue.

## Inverse transform and partial fractions

```math
\mathcal L\{e^{-at}\}(s)
=\int_0^\infty e^{-(s+a)t}\,dt
=\frac{1}{s+a},
\qquad \operatorname{Re}(s)>-a
```

Linearity lets each partial-fraction term map through a transform pair:

```math
\frac{1}{(s+1)(s+3)}
=\frac{1/2}{s+1}-\frac{1/2}{s+3}
\quad\longleftrightarrow\quad
x(t)=\frac12e^{-t}-\frac12e^{-3t},\ t\ge0
```

The table records pairs derived from the defining integral; it avoids repeating each integral.

## Derivative and initial condition

```math
\mathcal L\{x'(t)\}
=\int_0^\infty x'(t)e^{-st}\,dt
=\left[x(t)e^{-st}\right]_0^\infty+sX(s)
=sX(s)-x(0^+)
```

Within the ROC, the upper boundary term vanishes; the lower boundary is \(x(0^+)e^0\), subtracted. The derivative of the kernel is \(-se^{-st}\), producing \(+sX(s)\) after integration by parts.

## Differential equation and transfer function

For \(y'(t)+2y(t)=x(t)\):

```math
sY(s)-y(0^+)+2Y(s)=X(s)
```

Zero initial condition gives:

```math
H(s)=\frac{Y(s)}{X(s)}=\frac{1}{s+2}
```

With a unit-step input, \(X(s)=1/s\):

```math
Y(s)=\frac{1}{s(s+2)}
=\frac12\left(\frac1s-\frac1{s+2}\right)
\quad\longleftrightarrow\quad
y(t)=\frac12(1-e^{-2t}),\ t\ge0
```

Zero initial condition isolates the input-driven response for \(H=Y/X\). Nonzero initial state contributes an additional natural response.

## LTI convolution and output poles

```math
y(t)=h(t)*x(t)
\quad\longleftrightarrow\quad
Y(s)=H(s)X(s),
\qquad H(s)=\mathcal L\{h(t)\}
```

Use the product identity on a shared region where the transforms are defined. Output poles can originate from either factor:

- poles of \(H(s)\): system natural modes;
- poles of \(X(s)\): modes supplied by the input.

For \(H=1/(s+2)\) and a step input \(X=1/s\), the output has a pole at \(-2\) from the system transient and one at \(0\) from the input's steady component.

## Poles, zeros, stability, minimum phase

- Poles: denominator roots; a pole \(p=\sigma+j\omega\) corresponds to an exponential/oscillatory mode.
- Zeros: numerator roots; they shape the response and phase.
- For a causal rational system, the ROC lies right of the rightmost pole. BIBO stability requires the imaginary axis to lie inside the ROC; for proper causal rational systems this means all poles are strictly in the left half-plane.
- A simple imaginary-axis pole can give sustained natural oscillation; it is generally not BIBO stable. A right-half-plane pole or repeated imaginary-axis pole is unstable.
- A stable system is minimum phase when its inverse is stable. A right-half-plane zero becomes a right-half-plane pole in the inverse; the forward system may still be stable.

## Initial-value and final-value theorems

```math
x(0^+)=\lim_{s\to\infty}sX(s),
\qquad
x(\infty)=\lim_{s\to0}sX(s)
```

These find endpoint values under their regularity/pole conditions; they do not reconstruct the full waveform. Revisit the final-value theorem when reading that lecture section.

## Focused recall prompts

1. Derive \(\mathcal L\{x'\}=sX-x(0^+)\); identify both boundary terms.
2. Why can \(1/(s-1)\) be finite at \(s=1+j2\) while that point is outside the ROC?
3. Why does a finite-duration signal have no infinite-time convergence boundary?
4. From \(y'+2y=x\), derive \(H=Y/X\) and state the initial-condition assumption.
5. In \(Y=HX\), distinguish a pole inherited from the input from a system pole.
6. State the stability test using the ROC; distinguish it from minimum-phase classification.
7. Explain what the initial-value and final-value theorems return, and when they may be used.

## Next pass

Finish the current Fourier reading first. Then read the Laplace lecture fully, work through its examples/problems, answer the recall prompts closed-book, and refine this draft. Discussion here does not by itself confirm independent mastery.
