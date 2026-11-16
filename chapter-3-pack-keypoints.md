<!-- AI-assisted revision sheet: Signals_and_System_02Oct.pdf, Chapter 3. For a second pass, not a first reading. -->

# Chapter 3 — 要点

学过一遍、记忆模糊时用。每条：一句直觉 · 定义 · 怎么检查 · 最容易错的地方。完整内容在[笔记](./chapter-3-systems-and-properties.md)。

---

<a id="interconnect"></a>

## 系统和连接

系统 $S$ 把一整条输入信号 $x$ 变成一整条输出信号 $y=Sx$。一个输入只能对应一个输出。

- 串联：$y=S_{2}S_{1}x$，先过 $S_{1}$ 再过 $S_{2}$
- 并联：$y=(S_{1}+S_{2})x=S_{1}x+S_{2}x$
- Gain system $P_{k}$：$y(t)=k\thinspace x(t)$

易错：串联顺序一般不能交换。$S_{1}$：$x(t-1)$，$S_{2}$：$t\thinspace x(t-2)$，则 $S_{2}S_{1}x=t\thinspace x(t-3)$，而 $S_{1}S_{2}x=(t-1)\thinspace x(t-3)$。

---

<a id="memoryless"></a>

## Memoryless

输出只看“此刻”的输入。

```math
y(t)\ \text{只取决于}\ x(t)
```

检查：找一个 $t$，看输出读的是不是别的时刻的输入。

- $y(t)=\sin(x(t))$、$y(t)=\cos(3t)\thinspace x(t)$、saturation：memoryless
- $y(t)=x(t-1)$、$y(t)=x(2t)$、积分、求导：有 memory

易错：

- “每个时刻只用输入的一个值”不够，必须是同一时刻的值。$y(2)=x(4)$ 就说明有 memory
- $t=0$ 时 $x(2t)$ 正好读 $x(0)$，不能当例子
- memoryless 不保证 time-invariant：$\cos(3t)\thinspace x(t)$

---

<a id="invertible"></a>

## Invertibility

能不能从输出唯一地恢复输入。

```math
S^{-1}S=SS^{-1}=P_{1}
```

- $P_{k}^{-1}=P_{1/k}$（$k\ne 0$）；$P_{0}$ 不可逆
- 积分和求导互逆：$DI=P_{1}$
- 延迟 $x(t-1)$ 的逆是超前 $y(t+1)$：存在，但 noncausal

易错：两个不同的输入给出同一个输出，就不可逆，例如 $y=x^{2}$。“存在逆”和“逆能实时实现”是两回事。

---

<a id="causal"></a>

## Causality

系统不需要知道未来。

```math
x_{1}(\tau)=x_{2}(\tau)\ \text{for all}\ \tau\le t_{0}
\ \Rightarrow\ y_{1}(t_{0})=y_{2}(t_{0}),\qquad\text{对每一个}\ t_{0}
```

检查：有没有某个时刻，输出读的输入时刻比它晚。有一个就不是 causal。

- memoryless $\Rightarrow$ causal；反过来不成立
- 有 memory 不等于 noncausal：$x(t-1)$ 是 causal 的

易错：正的和负的 $t$ 都要看。

- $x(2t)$：$t>0$ 时读未来，反例取 $y(1)=x(2)$；$y(-2)=x(-4)$ 读的是过去，不是反例
- $x(t/3)$：$t<0$ 时读未来，反例取 $y(-3)=x(-1)$；只看 $t\ge 0$ 会误判成 causal

---

<a id="stable"></a>

## Stability

讲义用能量定义：有限能量进，有限能量出。

```math
E_{x}=\int_{-\infty}^{\infty}\lvert x(t)\rvert^{2}\thinspace dt<\infty
\ \Rightarrow\
E_{y}=\int_{-\infty}^{\infty}\lvert y(t)\rvert^{2}\thinspace dt<\infty
```

带时间方向的说法：输入关掉以后，

- 输出趋于 0：stable
- 输出不趋于 0 但有界：marginally stable（integrator）
- 都不是：unstable（$y(t)=t\int_{-\infty}^{t}x(\tau)\thinspace d\tau$）

易错：输出有界不等于能量有限。无论输入是什么，输出在 $t<0$ 上恒为 1 的系统，能量无穷，不 stable。

---

<a id="ti"></a>

## Time invariance

同一个实验换个时间做，结果只是整体平移。

```math
x(t-t_{0})\ \mapsto\ y(t-t_{0})\qquad\text{对每一个}\ t_{0}
```

检查，两条路各写一遍：

1. 把 $x(t)$ 换成 $x(t-d)$ 再过系统
2. 把 $y(t)$ 里的 $t$ 全部换成 $t-d$

相同才是 time-invariant。

- $x(2t)$：第 1 条 $x(2t-d)$，第 2 条 $x(2(t-d))$，不同
- $t\thinspace x(t)$：第 1 条 $t\thinspace x(t-d)$，第 2 条 $(t-d)\thinspace x(t-d)$，不同

易错：按固定时刻切换的系统是 time-varying；按输入的值切换的系统可以是 time-invariant。

---

<a id="linear"></a>

## Linearity

叠加原理。

```math
S(k_{1}x_{1}+k_{2}x_{2})=k_{1}Sx_{1}+k_{2}Sx_{2}
```

最快的两个检查：

1. 零输入是不是给出零输出
2. 输入放大 2 倍，输出是不是正好放大 2 倍

- 延迟、积分、求导、乘固定的时间函数：linear
- $x^{2}$、$\sin(x)$、saturation、$a\thinspace x+b$（$b\ne 0$）：nonlinear

用法：把新输入写成已知输入的组合，输出用同样的系数组合。

易错：

- $y=ax+b$ 的图像是直线，但系统不是线性的
- 只给了线性、没给 time-invariance 时，不能把输出跟着输入一起平移。$\cos(2t-1)$ 要用 Euler 公式拆成复指数再逐项映射
- 有限的几对输入输出只能否定线性，不能证明线性
