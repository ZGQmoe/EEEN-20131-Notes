<!-- AI-assisted revision sheet: Signals_and_System_02Oct.pdf, Chapter 2. For a second pass, not a first reading. -->

# Chapter 2 — 要点

学过一遍、记忆模糊时用。每条：一句直觉 · 公式 · 最容易错的地方。完整推导在[笔记](./chapter-2-signals-and-properties.md)。

---

<a id="signal"></a>

## 信号

麦克风录下的电压曲线整体叫信号 $x$；$x(t)$ 是它在时刻 $t$ 的高度，是一个数。

- 实信号 $x:\mathbb{R}\to\mathbb{R}$，复信号 $x:\mathbb{R}\to\mathbb{C}$
- 数乘、相加、相乘都是逐时刻做

易错：把“信号”和“某一时刻的值”混着说。讲义说取值时会写 for all $t\in\mathbb{R}$。

---

<a id="energy"></a>

## 能量 · 功率 · RMS

电阻上的瞬时功率是 $v^{2}/R$，对时间累加就是能量。去掉 $R$，对任何信号都这样定义。

```math
E_{\infty}=\int_{-\infty}^{\infty}\lvert x(t)\rvert^{2}\thinspace dt
```

```math
P_{\infty}=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}\lvert x(t)\rvert^{2}\thinspace dt,
\qquad x_{\mathrm{RMS}}=\sqrt{P_{\infty}}
```

- $E_{\infty}$ 是 $\lvert x\rvert^{2}$ 曲线下面的面积
- 能量有限 $\Rightarrow P_{\infty}=0$
- 不衰减的信号（正弦、复指数）：$E_{\infty}=\infty$，看 $P_{\infty}$
- $\lvert Ae^{j\omega t}\rvert^{2}=A^{2}$，所以 $P_{\infty}=A^{2}$；$A\cos(\omega t)$ 的 $P_{\infty}=\frac{A^{2}}{2}$

易错：

- $(e^{-3t})^{2}=e^{-6t}$，指数也要乘 2
- 取负值的段平方后是正的，一样贡献能量
- 复信号用模的平方，不是信号本身的平方
- 指数信号先确认有没有乘 $u(t)$

[能量 = 面积 · 交互图](./chapter-2-signals-and-properties.md#energy)

---

<a id="transform"></a>

## 时间变换

同一段录音放快、放慢、倒放、晚一点开始放。高度不变，只动时间轴。

```math
x_{a,t_{0}}(t)=x\negthinspace \left(a(t-t_{0})\right)
```

只需要一条：原信号上位于 $\tau$ 的点，搬到

```math
\boxed{t=t_{0}+\frac{\tau}{a}}
```

- $\lvert a\rvert>1$ 变窄，$\lvert a\rvert<1$ 变宽，$a<0$ 左右翻转
- $t_{0}>0$ 右移，$t_{0}<0$ 左移
- 能量变成原来的 $\frac{1}{\lvert a\rvert}$；平移和翻转不改变能量

易错：

- $x(-2t+4)$ 的 $t_{0}$ 不是 $4$。先提系数：$-2(t-2)$，所以 $a=-2$，$t_{0}=2$
- 不要去想“先移还是先缩”，逐个断点代公式

---

<a id="periodic"></a>

## 周期 · 奇偶

把整条曲线平移 $T$ 后和原来完全重合，就是周期信号。

```math
x(t)=x(t+T)\quad\text{for all }t\in\mathbb{R}
```

- Fundamental period $T_{0}$：满足上式的最小正数 $T$
- 周期信号 $E_{\infty}=\infty$，$P_{\infty}=\frac{1}{T_{0}}\int_{0}^{T_{0}}\lvert x(t)\rvert^{2}\thinspace dt$
- 两个周期信号相加：找最小的正整数 $m,n$ 使 $mT_{1}=nT_{2}$；$T_{1}/T_{2}$ 是无理数时和不是周期信号
- 偶：$x(t)=x(-t)$；奇：$x(t)=-x(-t)$；偶 × 奇 = 奇，在对称区间上积分为 0

易错：定义里的三个词缺一不可，最小、正数、对所有 $t$。

---

<a id="step"></a>

## Unit step · Impulse

$u$ 是开关；$\delta$ 是面积为 1、宽度趋于 0 的脉冲。

```math
u(t)=\begin{cases}0,&t<0\\1,&t\ge 0\end{cases}
```

```math
\int_{-\infty}^{\infty}\delta(t)\thinspace dt=1,
\qquad
\int_{-\infty}^{\infty}f(t)\delta(t-t_{0})\thinspace dt=f(t_{0})
```

```math
u(t)=\int_{-\infty}^{t}\delta(\tau)\thinspace d\tau,
\qquad
\delta(t)=\frac{du}{dt}(t)
```

- 窗口：$u(t-a)-u(t-b)$ 只在 $a\le t<b$ 上为 1
- 分段信号写成一行：每段表达式乘自己的窗口，再相加
- $f(t)\delta(t-t_{0})=f(t_{0})\delta(t-t_{0})$ 是信号；积分之后才是数
- 图上 impulse 画成箭头，旁边的数是面积，不是高度

易错：

- $u(0)=1$
- $u(2t-4)=u(t-2)$，缩放不改变 step；$\delta(2t)=\frac{1}{2}\delta(t)$，缩放改变 impulse 的面积

[δₙ → δ · 交互图](./chapter-2-signals-and-properties.md#impulse)

---

<a id="derivative"></a>

## 分段信号求导

信号在哪里跳了多少，导数在那里就有一个系数为跳变量的 impulse。

```math
\dot{x}(t)=\text{段内斜率}+\sum_{i}\left[x(t_{i}^{+})-x(t_{i}^{-})\right]\delta(t-t_{i})
```

- 跳变量 = 右边的值 − 左边的值；信号外面是 0
- 往下跳，系数为负
- 值没有跳、只是斜率变了：没有 impulse

易错：

- 漏掉信号开头和结尾处的跳变
- 信号结束时从正值掉到 0，系数是负的
- 在连续的断点多写了 impulse

[跳变 → impulse · 交互图](./chapter-2-signals-and-properties.md#piecewise-derivative)

---

<a id="cexp"></a>

## 复指数

复平面上绕原点转的一个点，转的同时到原点的距离可以缩小、不变或增大。

```math
e^{st}=e^{\sigma t}\left[\cos(\omega t)+j\sin(\omega t)\right],
\qquad s=\sigma+j\omega
```

- 模 $\lvert e^{st}\rvert=e^{\sigma t}$，由 $\sigma$ 决定
- Time constant $\tau=\frac{1}{\lvert\sigma\rvert}$
- 转动由 $\omega$ 决定：$f=\frac{\omega}{2\pi}$，$T_{0}=\frac{2\pi}{\lvert\omega\rvert}$
- $\sigma=0$ 才是周期信号

```math
\cos(\omega t)=\frac{e^{j\omega t}+e^{-j\omega t}}{2},
\qquad
\sin(\omega t)=\frac{e^{j\omega t}-e^{-j\omega t}}{2j}
```

易错：$e^{1+j10t}$ 是常数 $e$ 乘 $e^{j10t}$，周期；$e^{(1+j10)t}$ 带 $e^{t}$，不周期。

[复指数 · 交互图](./chapter-2-signals-and-properties.md#complex-signal)
