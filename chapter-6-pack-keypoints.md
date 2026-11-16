<!-- AI-assisted revision sheet: Signals_and_System_02Oct.pdf, Chapter 6. For a second pass, not a first reading. -->

# Chapter 6 — 要点

学过一遍、记忆模糊时用。每条：一句直觉 · 定义 · 怎么检查 · 最容易错的地方。完整内容在[笔记](./chapter-6-lti-and-convolution.md)。

---

<a id="conv"></a>

## Convolution

把一个信号翻转、平移到 $t$，和另一个信号相乘，量重叠的面积。每个 $t$ 得到一个数。

```math
(x_{1}\ast x_{2})(t)=\int_{-\infty}^{\infty}x_{1}(\tau)\thinspace x_{2}(t-\tau)\thinspace d\tau
```

- 积分变量是 $\tau$；$t$ 在积分里是固定的
- 可交换、可结合、对加法可分配
- 单位元：$x\ast\delta=x$
- 和平移的 impulse 卷积就是平移：$x(t)\ast\delta(t-t_{0})=x(t-t_{0})$
- $\delta(t-t_{0})\ast\delta(t-t_{1})=\delta(t-t_{0}-t_{1})$
- 求导可以挪到任意一个因子上：$\frac{d}{dt}(x\ast h)=\frac{dx}{dt}\ast h=x\ast\frac{dh}{dt}$
- 和 $u$ 卷积就是积分：$(x\ast u)(t)=\displaystyle\int_{-\infty}^{t}x(\tau)\thinspace d\tau$

做题：

1. $h$ 是几个 impulse 的和：直接把 $x$ 平移、缩放、相加，不用积分
2. $x$ 是矩形：先求导变成两个 impulse，卷积后再积分回来
3. 其他：画出 $x(\tau)$ 和 $h(t-\tau)$，按重叠情况分段积分

检查：结果的起点 = 两个起点之和，终点 = 两个终点之和；面积 = 两个面积之积。

易错：

- $\delta(t+2)$ 对应 $t_{0}=-2$，信号向左移
- 卷积不是相乘：$x(t)\thinspace\delta(t-t_{0})$ 是一个 impulse，$x(t)\ast\delta(t-t_{0})$ 是整条平移后的信号
- 分段时每一段的积分上下限都不一样，要重新画重叠区间

---

<a id="lti"></a>

## LTI 与 h

LTI 系统对 $\delta$ 的响应 $h$ 决定了它对所有输入的响应。

```math
y=x\ast h,\qquad h=S\delta
```

- 来源：$x(t)=\displaystyle\int x(\tau)\thinspace\delta(t-\tau)\thinspace d\tau$，线性 + time-invariance 把每个 $\delta(t-\tau)$ 换成 $h(t-\tau)$
- Gain $P_{k}$：$h=k\thinspace\delta$
- Delay $t_{0}$：$h=\delta(t-t_{0})$
- Integrator：$h=u$
- 串联：$h_{1}\ast h_{2}$，顺序可交换
- 并联：$h_{1}+h_{2}$

易错：

- Gain $P_{k}$ 的 $h$ 是 $k\thinspace\delta$，不是“恒等于 $k$”
- 串联顺序可交换只对 LTI 系统成立

---

<a id="props"></a>

## 由 h 判断性质

三个性质都只用看 $h$。

```math
\text{memoryless}:\ h(t)=0\ (t\ne 0)\qquad
\text{causal}:\ h(t)=0\ (t\lt 0)\qquad
\text{stable}:\ \int_{-\infty}^{\infty}\lvert h(t)\rvert\thinspace dt\lt\infty
```

- causal 的理由：$y(t)=\displaystyle\int x(\tau)\thinspace h(t-\tau)\thinspace d\tau$，$h(t-\tau)=0$ 当 $\tau\gt t$，积分只到 $\tau=t$
- stable 检查：先看 $h$ 在哪一侧非零，再看 $\lvert h\rvert$ 沿那一侧是衰减还是增长
- $h$ 里的 impulse：$\lvert k\thinspace\delta\rvert$ 的面积算 $\lvert k\rvert$

| $h(t)$ | causal | stable |
|---|---|---|
| $e^{-2t}u(t)$ | 是 | 是 |
| $e^{2t}u(t)$ | 是 | 否 |
| $e^{t}u(-t)$ | 否 | 是 |
| $e^{-3t}u(-t)$ | 否 | 否 |
| $u(t)$ | 是 | 否 |
| $e^{-t}u(t-2)$ | 是 | 是 |

易错：

- 指数上的负号在 $t\lt 0$ 一侧是增长
- stable 的判据是面积有限，不是有界，也不是趋于 0
- $h$ 从 $t=2$ 才开始仍然是 causal
- 判据用 $\lvert h\rvert$：系数为负不影响

---

<a id="step"></a>

## Step response 与 DC gain

Step response $s$：输入 $u$ 时的输出。DC gain：输入常数时，输出稳定后的值和输入的比。

```math
s(t)=\int_{-\infty}^{t}h(\tau)\thinspace d\tau,\qquad h(t)=\frac{ds}{dt}(t),\qquad
\text{DC gain}=\lim_{t\to\infty}s(t)=\int_{-\infty}^{\infty}h(\tau)\thinspace d\tau
```

- 由 ODE 求 DC gain：所有导数项设为 0，剩下 $a_{0}Y_{0}=b_{0}X_{0}$
- 由 $s$ 求 $h$：求导；$s$ 有跳变的地方 $h$ 有 impulse

易错：

- “导数设为 0”的前提是输出会稳定下来。方程里没有 $y$ 本身这一项（integrator）时没有有限的 DC gain

---

<a id="ode"></a>

## ODE 表示

常系数线性 ODE 加上 causal（initial rest）才唯一确定一个 LTI 系统。

- Initial rest：输入开始之前输出为 0
- 输出 = 特解 + 齐次解；齐次解的系数由初值定
- 输入里没有 impulse 时，一阶系统的 $y$ 在输入开始的时刻连续

易错：只写特解，漏掉用来满足初值的齐次解。
