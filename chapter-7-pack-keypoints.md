<!-- AI-assisted revision sheet: Signals_and_System_02Oct.pdf, Chapter 7. For a second pass, not a first reading. -->

# Chapter 7 — 要点

学过一遍、记忆模糊时用。每条：一句直觉 · 定义 · 怎么检查 · 最容易错的地方。完整内容在[笔记](./chapter-7-fourier.md)。

记号：讲义正文用频率 $f$（Hz），习题和真题用角频率 $\omega=2\pi f$（rad/s），写成 $H(j\omega)$。同一个量，两种写法。

---

<a id="fs"></a>

## Fourier series

周期信号 = 一组频率为 $kf_{0}$ 的复指数的加权和。$x_{k}$ 是第 $k$ 个 harmonic 的权重。

```math
x(t)=\sum_{k=-\infty}^{\infty}x_{k}\thinspace e^{j2\pi kf_{0}t},\qquad
x_{k}=\frac{1}{T_{0}}\int_{0}^{T_{0}}x(t)\thinspace e^{-j2\pi kf_{0}t}\thinspace dt,\qquad
f_{0}=\frac{1}{T_{0}},\quad\omega_{0}=\frac{2\pi}{T_{0}}
```

- $x_{0}$：一个周期上的平均值（DC term）
- $k=\pm1$：fundamental；$k=\pm2$：second harmonic
- $\cos(\omega_{0}t)$：$x_{\pm1}=\frac{1}{2}$
- $\sin(\omega_{0}t)$：$x_{1}=-\frac{j}{2}$，$x_{-1}=\frac{j}{2}$
- 方波，前半周期 $p$、后半周期 $q$：$x_{0}=\frac{p+q}{2}$；$k$ 奇数 $x_{k}=\frac{p-q}{jk\pi}$；$k$ 非零偶数 $x_{k}=0$

做题：

1. 信号已经是正弦的和：用 Euler 公式拆，直接读系数，不积分
2. 分段常数：按段积分，用 $e^{-jk\pi}=(-1)^{k}$ 化简
3. 分段线性：先求导变成分段常数，再用 $d_{k}=jk\omega_{0}\thinspace x_{k}$（$k\ne 0$）；$x_{0}$ 单独算

易错：

- 几个正弦相加时，$\omega_{0}$ 是各频率的最大公约数，不是最小的那个频率
- analysis equation 有 $\frac{1}{T_{0}}$，指数是负号，只积一个周期

---

<a id="real"></a>

## Real 信号

实信号的正负频率系数互为共轭，一对合成一个实正弦。

```math
x_{-k}=x_{k}^{\ast},\qquad
x_{-k}e^{-jk\omega_{0}t}+x_{k}e^{jk\omega_{0}t}=2\lvert x_{k}\rvert\cos\left(k\omega_{0}t+\angle x_{k}\right)
```

- 实正弦的幅值是 $2\lvert x_{k}\rvert$
- real 且 even：$x_{k}$ 是实数，$x_{k}=x_{-k}$
- real 且 odd：$x_{k}$ 是纯虚数，$x_{k}=-x_{-k}$，$x_{0}=0$

易错：

- 系数是虚数不代表信号是复的；看的是 $x_{-k}$ 是否等于 $x_{k}^{\ast}$
- $x_{1}=j$、$x_{-1}=j$ 不是实信号；$x_{1}=j$、$x_{-1}=-j$ 才是

---

<a id="fsprop"></a>

## 性质

| 时域 | 系数 |
|---|---|
| $Ax+By$ | $Ax_{k}+By_{k}$ |
| $x(t-t_{0})$ | $e^{-jk\omega_{0}t_{0}}x_{k}$ |
| $x(-t)$ | $x_{-k}$ |
| $x(\alpha t)$，$\alpha\gt 0$ | $x_{k}$，但 $f_{0}\to\alpha f_{0}$ |
| $x^{\ast}(t)$ | $x_{-k}^{\ast}$ |
| $x(t)\thinspace y(t)$ | $\sum_{l}x_{l}\thinspace y_{k-l}$ |

Parseval：

```math
P_{x}=\frac{1}{T_{0}}\int_{0}^{T_{0}}\lvert x(t)\rvert^{2}dt=\sum_{k=-\infty}^{\infty}\lvert x_{k}\rvert^{2}
```

易错：

- time shift 只改相位，$\lvert x_{k}\rvert$ 和功率不变
- Parseval 里 $\pm k$ 各算一次
- 加一个常数只改 $x_{0}$

---

<a id="conv"></a>

## 收敛

- 信号连续的点：series 收敛到 $x(t)$
- Jump discontinuity：收敛到左右极限的平均 $\frac{x(t^{-})+x(t^{+})}{2}$
- Gibbs phenomenon：有限项重建有跳变的信号，跳变两侧有振荡和过冲；项数增加，振荡向跳变点集中，峰值不消失，约为跳变幅度的 9%

---

<a id="ft"></a>

## Fourier transform

非周期信号的版本：频率从离散的 $kf_{0}$ 变成连续的 $f$。

```math
X(f)=\int_{-\infty}^{\infty}x(t)\thinspace e^{-j2\pi ft}\thinspace dt,\qquad
x(t)=\int_{-\infty}^{\infty}X(f)\thinspace e^{j2\pi ft}\thinspace df
```

- 存在的充分条件：$x$ absolutely integrable
- $e^{-at}u(t)$，$a\gt 0$：$\frac{1}{a+j\omega}$
- $e^{at}u(-t)$，$a\gt 0$：$\frac{1}{a-j\omega}$
- $e^{-a\lvert t\rvert}$：两者之和 $\frac{2a}{a^{2}+\omega^{2}}$
- $\delta(t-t_{0})$：$e^{-j\omega t_{0}}$
- 周期信号：$X(f)=\displaystyle\sum_{k}x_{k}\thinspace\delta(f-kf_{0})$，每个 harmonic 处一个 impulse
- 时域卷积 ↔ 频域相乘；时域相乘 ↔ 频域卷积
- 求导 ↔ 乘 $j\omega$
- real 信号：$X(-f)=X^{\ast}(f)$，只看正频率

易错：

- 套 $\frac{1}{a+j\omega}$ 之前先看指数在信号非零的一侧是不是衰减；$e^{2t}u(t)$ 没有 Fourier transform
- 用 $\omega$ 写周期信号的 transform 时是 $2\pi\sum_{k}x_{k}\thinspace\delta(\omega-k\omega_{0})$，多一个 $2\pi$

---

<a id="freq"></a>

## Frequency response

LTI 系统在频域就是逐频率相乘。$H$ 是 $h$ 的 Fourier transform。

```math
Y(f)=H(f)\thinspace X(f),\qquad \lvert Y\rvert=\lvert H\rvert\lvert X\rvert,\qquad \angle Y=\angle H+\angle X
```

正弦输入（$h$ 是实的）：

```math
x(t)=\cos(\omega_{0}t)\ \Rightarrow\ y(t)=\lvert H(j\omega_{0})\rvert\cos\left(\omega_{0}t+\angle H(j\omega_{0})\right)
```

- 频率不变，幅值乘 $\lvert H\rvert$，相位加 $\angle H$；$\sin$ 输入同理
- 等效时移：$t_{0}=-\frac{\angle H(j\omega_{0})}{\omega_{0}}$，只对这一个频率成立
- DC gain $=H(0)$
- 由 ODE 写 $H$：每个 $\frac{d}{dt}$ 换成 $j\omega$，$H=\frac{Y}{X}$
- 周期输入：$y_{k}=H(jk\omega_{0})\thinspace x_{k}$

做题（正弦过系统）：

1. 写出 $H(j\omega)$
2. 代入输入的 $\omega_{0}$，化成一个复数
3. 取模和辐角（弧度）
4. 写输出

易错：

- $H$ 是几项之和时先加成一个复数再取模；各项的模不能相加
- $\cos(100\pi t)$ 的 $\omega_{0}$ 是 $100\pi$，不是 $100$
- $RC$ 的单位：$\mu\text{F}$ 要乘 $10^{-6}$

---

<a id="filt"></a>

## Filter 与 bandwidth

- Ideal lowpass：$\lvert\omega\rvert\le\omega_{c}$ 通过，其余为 0；没有相移；noncausal，不能实时实现
- 周期输入过 ideal lowpass：只留下 $\lvert k\rvert\omega_{0}\le\omega_{c}$ 的 harmonic
- 一阶 lowpass：$H=\frac{1}{1+j\omega/\omega_{c}}$，causal、stable；cutoff 处幅值 $\frac{1}{\sqrt{2}}$，相位 $-45^{\circ}$
- 3 dB 点：$\lvert H\rvert$ 降到峰值的 $\frac{1}{\sqrt{2}}$，功率减半
- Lowpass 的 bandwidth 只报正频率一侧：$f_{c}$

易错：

- 先算 $\omega_{0}=\frac{2\pi}{T_{0}}$ 再数 harmonic；$T_{0}=\frac{\pi}{3}$ 时 $\omega_{0}=6$
- cutoff 用 Hz 给、信号用 rad/s 给时先统一单位
- 所有 harmonic 都被滤掉时输出是 $x_{0}$，不一定是 0
