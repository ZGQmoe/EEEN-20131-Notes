<!-- AI-assisted abstraction of Chapter 6 reading questions; generic examples, not completed lecture Problems / Exam Questions / Advanced Problems. Sources: full notes §§6.2–6.5; 14 Oct slides. -->

# Chapter 6 — Representative Methods

[Concept map](./chapter-6-lti-and-convolution.md#map)

---

<a id="window"></a>

## Moving Window / Derivative

Links: [integration limits](./chapter-6-lti-and-convolution.md#convolution) · [calculus](./chapter-6-lti-and-convolution.md#convolution-algebra)

$h(t)=u(t-3)-u(t-5)$ · arbitrary continuous $x$ · find $y=x\ast h$, then $y'$

<details>
<summary>Limits → integral → derivative</summary>

$\displaystyle h(t-\tau)=1\iff3\le t-\tau<5\iff t-5<\tau\le t-3.$

$\displaystyle \boxed{y(t)=\int_{t-5}^{t-3}x(\tau)\thinspace d\tau}$

$t$: output time · $\tau$: dummy variable · $[3,5)$: support of $h$, not integration window

$\displaystyle t=8:\ y(8)=\int_3^5x(\tau)\thinspace d\tau.$

General $t$: moving window · no $t>0$ / $y>0$ requirement

**Leibniz: moving endpoints**

$\displaystyle \frac{d}{dt}\int_{a(t)}^{b(t)}x(\tau)\thinspace d\tau=x(b(t))b'(t)-x(a(t))a'(t).$

$\displaystyle \boxed{y'(t)=x(t-3)-x(t-5)}$

**Same result: differentiate $h$**

$\displaystyle h'(t)=\delta(t-3)-\delta(t-5).$

$\displaystyle (x\ast h')(t)=\int x(\tau)[\delta(t-\tau-3)-\delta(t-\tau-5)]\thinspace d\tau=x(t-3)-x(t-5)=y'(t).$

**Differentiate $x$: proof, not substitution**

Differentiable $x$:

$\displaystyle (x'\ast h)(t)=\int_{t-5}^{t-3}x'(\tau)\thinspace d\tau=x(t-3)-x(t-5)=y'(t).$

$\displaystyle \boxed{D(x\ast h)=(Dx)\ast h=x\ast(Dh)}$

One differentiated factor · same output derivative · not $x'\ast h'$

</details>

---

<a id="accumulation"></a>

## Accumulation / Final Value

Links: [responses](./chapter-6-lti-and-convolution.md#responses) · [DC gain](./chapter-6-lti-and-convolution.md#dc-gain)

```math
h(t)=2\bigl[u(t)-u(t-1)\bigr]
```

Step response · $s(0.5),s(1),s(3)$ · DC gain

<details>
<summary>Method</summary>

$\displaystyle s(t)=\int_{-\infty}^{t}h(\tau)\thinspace d\tau.$

$\displaystyle t<0:\ s(t)=0;\qquad 0\le t<1:\ s(t)=2t;\qquad t\ge1:\ s(t)=2.$

$\displaystyle s(0.5)=1,\quad s(1)=2,\quad s(3)=2,\quad K_{\mathrm{DC}}=2.$

$h(3)=0$: no new area · $s(3)=2$: retained accumulated area

$\displaystyle K_{\mathrm{DC}}=\int h=\lim s,\qquad \int_0^{\infty}s(t)\thinspace dt=\infty.$

Final height ≠ output area · constant step input ≠ constant step response

$h$ shape unrestricted; integral → step response · name from test input

Same $\int h$ → same gain; not necessarily same system

</details>

---

<a id="delay"></a>

## Cascade / Inverse

Links: [inheritance](./chapter-6-lti-and-convolution.md#inheritance) · [inverse](./chapter-6-lti-and-convolution.md#inverse)

Pure delay $d>0$ · inverse / real-time feasibility

<details>
<summary>Method</summary>

$\displaystyle S_dx(t)=x(t-d),\quad h_d(t)=\delta(t-d).$

$\displaystyle S_d^{-1}v(t)=v(t+d),\quad h_{\mathrm{inv}}(t)=\delta(t+d).$

$\displaystyle (x\ast h_d)\ast h_{\mathrm{inv}}=x\ast(h_d\ast h_{\mathrm{inv}})=x\ast\delta=x.$

Cascade → convolution · opposite shifts → zero net delay

Inverse: future samples → noncausal · mathematical existence ≠ causal implementation

</details>

---

<a id="rc"></a>

## ODE / State / Feedback

Links: [ODE](./chapter-6-lti-and-convolution.md#ode) · [Ch3 memory](./chapter-3-systems-and-properties.md#memory)

RC · zero input · initial voltage $V_0$

<details>
<summary>Method</summary>

$\displaystyle v_C'+\frac{1}{RC}v_C=0\Rightarrow v_C=Ae^{-t/(RC)}.$

$\displaystyle v_C(0)=V_0\Rightarrow v_C(t)=V_0e^{-t/(RC)},\quad t\ge0.$

Same input · different initial states → different outputs

Initial rest → zero-state LTI mapping · initial charge → additional natural response

$\displaystyle Dv_C=\frac{v_{\mathrm{in}}-v_C}{RC}$

Derivative signal → integrator → state · output feedback → subtraction

</details>

---

[Back to concept map](./chapter-6-lti-and-convolution.md#map)
