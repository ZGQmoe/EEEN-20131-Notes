# EEEN20131 Signals and Systems — Progress

> 本文件是课程正式进度台账。只有用户明确确认的内容才记为完成；讨论过、看过答案或由助手推测的内容不算掌握。

## 已确认完成

- Chapter 7 Fourier Series 已阅读到该部分末尾（约 §7.2）。这里只确认阅读进度，不代表全部推导和题目已经掌握。
- 已能说明 Parseval 的基本含义：时域平均功率等于 Fourier series coefficients 的模平方和；完整闭卷推导尚未确认。

- Lab 2 preparation exercise（Measuring the magnitude response in Simulink, v1.1）：用户 2026-11-09 确认已通读全部内容，Section 5 手算表全部正确。

## 未完成与卡点

- Lab 2 prep 错题：0.1 dB → 幅度比反解写反（应为 $10^{0.1/20}\approx1.0116$）——计算/符号；"stop time 为何含周期"只答 10τ 一半——概念缺口（复述遗漏）。
- −3 dB / Bode plot 概念：留到 Week 8 Circuit transients and Bode plots 学。

- Fourier Series 的 multiplication 与 conjugation 推导需要闭卷重做。
- Fourier Transform（约 §7.3）正在学习：absolute integrability、$\lVert x\rVert_1$ 与 $|X(f)|\leq\lVert x\rVert_1$ 已讨论，但尚未确认能够独立推导。
- Chapter 6 step response 的 RC 例子已讨论；尚未确认能够独立从 ODE 推导 $s(t)$、$h(t)$ 与 DC gain。
- Lab 1 preparation 与无提示 MATLAB 演练尚未确认完成。

## 下次从哪里继续

1. Canvas → `EEEN20131 Signals and Systems` → `Modules` → `Lab information` → `Lab 1 - Preparation.pdf`：完成其中全部准备任务并无提示重跑一遍。
2. 打开 `chapter-7-fourier.md`，闭卷重做 multiplication、conjugation 与 $|X(f)|\leq\lVert x\rVert_1$ 的推导。
3. 回到 `Signals_and_System_02Oct.pdf` 的 Fourier Transform 部分，继续尚未确认完成的内容。

## 复习回点

- Lab 2 prep D+1（2026-11-10，lab 前）：闭卷算 $r=10^{M/20}$（0.1 dB、3 dB、6 dB）；口述 $t_{\mathrm{stop}}=10\tau+10T$ 两项各管什么，用 100 Hz 举例。
- Lab 2 prep D+3（2026-11-12）：重做上面两题；口述 max step vs tolerance（点准 ≠ 点够密）。
- Lab 2 prep D+7（2026-11-16）：不看笔记重做 `simulink-representative-problems.md` 全部四题。

### 旧回点

- D+1（2026-11-03）：Lab 1 上机前闭卷回忆 MATLAB 操作流程；09:00–12:00 完成 assessed computer class。
- D+3（2026-11-05）：重做 Lab 1 中出错的操作；闭卷解释 absolute integrability 与 1-norm inequality。
- D+7（2026-11-09）：限时完成一次 MATLAB 操作与 Fourier/step-response 混合短测。

## 最后更新时间

- 2026-11-09（新增 Lab 2 prep；之前内容 2026-11-02）
- 依据：用户在课程 Chat 中明确确认的阅读与理解进度；未由用户确认的内容均保留为未完成或待检验。

## Log

| 日期 | 内容 | 状态 | 复习 |
|---|---|---|---|
| 2026-11-09 | Lab 2 prep 通读 + 讨论；2 处错题 | 用户确认通读完成 | D+1 11-10 · D+3 11-12 · D+7 11-16 |
