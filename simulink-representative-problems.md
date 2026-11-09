<!-- AI-assisted: worked items from the lab guide duration table + user discussion 2026-11-09. Values: f_c = 10 kHz, τ = 1/(2π·10^4). -->

# Simulink — Representative Problems

[Concept map](./simulink-magnitude-response.md#map)

---

<a id="settings"></a>

## Trial Settings Table

Links: [duration](./simulink-magnitude-response.md#duration) · [max step](./simulink-magnitude-response.md#solver)

$f_{c}=10\ \mathrm{kHz}$ · $\tau=\dfrac{1}{2\pi f_{c}}$ · find $T$, $t_{\mathrm{stop}}=10\tau+10T$, $h_{\max}=T/50$ for 100 Hz – 1 MHz

<details>
<summary>Solution</summary>

$\displaystyle \tau=\frac{1}{2\pi\cdot10^{4}}\approx15.9\ \mu\mathrm{s},\qquad 10\tau\approx159\ \mu\mathrm{s}.$

| $f$ | $T$ | $t_{\mathrm{stop}}$ | $h_{\max}$ |
|---|---|---|---|
| 100 Hz | $10^{-2}$ s | $\approx1.002\times10^{-1}$ s | $2\times10^{-4}$ s |
| 1 kHz | $10^{-3}$ s | $\approx1.016\times10^{-2}$ s | $2\times10^{-5}$ s |
| 10 kHz | $10^{-4}$ s | $\approx1.16\times10^{-3}$ s | $2\times10^{-6}$ s |
| 100 kHz | $10^{-5}$ s | $\approx2.59\times10^{-4}$ s | $2\times10^{-7}$ s |
| 1 MHz | $10^{-6}$ s | $\approx1.69\times10^{-4}$ s | $2\times10^{-8}$ s |

Low $f$: $10T$ dominates · high $f$: $10\tau$ dominates

Simulink: seconds · source frequency `2*pi*f`

</details>

---

<a id="db"></a>

## dB ↔ Ratio

Links: [gain in dB](./simulink-magnitude-response.md#gain) · [reliability](./simulink-magnitude-response.md#reliability)

(a) $A_{0}=10^{5}$ in dB · (b) $0.1\ \mathrm{dB}$ change → amplitude ratio

<details>
<summary>Solution</summary>

$\displaystyle \mathrm{(a)}\quad 20\log_{10}10^{5}=20\cdot5=100\ \mathrm{dB}.$

$\displaystyle \mathrm{(b)}\quad 0.1=20\log_{10}r\ \Rightarrow\ \log_{10}r=0.005\ \Rightarrow\ r=10^{0.005}\approx1.0116.$

$0.1\ \mathrm{dB}$ ≈ 1.2% amplitude change

Trap: base 10, exponent $M/20$ · rounding $r$ to 1 loses the answer

</details>

---

<a id="stop-time"></a>

## Why Cycles in Stop Time

Links: [duration](./simulink-magnitude-response.md#duration) · [steady state](./simulink-magnitude-response.md#steady-state)

$f=100\ \mathrm{Hz}$ · stop at $10\tau$ only → problem?

<details>
<summary>Solution</summary>

$\displaystyle 10\tau\approx0.16\ \mathrm{ms}\ \ll\ T=10\ \mathrm{ms}.$

Transient gone, but < 2% of one cycle simulated → no $y_{\max}$, $y_{\min}$

After settling: several complete cycles → read max/min · compare neighbouring cycles (≲1%)

</details>

---

<a id="step-tolerance"></a>

## Max Step vs Tolerance

Links: [solver](./simulink-magnitude-response.md#solver) · [reliability](./simulink-magnitude-response.md#reliability)

Rel tol `1e-6` · $h_{\max}=T/5$ · effect on measured gain? · purpose of halving $h_{\max}$?

<details>
<summary>Solution</summary>

$T/5$: large step · ~5 points per cycle

Steady sine smooth → error estimate small → steps reach cap

Each point accurate; peak between points → $A_{\mathrm{out}}$ low → gain low

Tolerance cannot add points for resolution → accuracy ≠ density

Halving test: $T/50\to T/100$ · $\Delta M<0.1\ \mathrm{dB}$ → resolution sufficient · larger → earlier gain was numerical error

</details>
