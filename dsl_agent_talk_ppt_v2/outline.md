# Outline

## Slide 1

### Core Insight
这类系统不是“懂语法的聊天助手”，而是把自然语言稳定编译成可执行 DSL 的工程系统。

### Evidence
- 原始大纲的总论和结语都指向“动态编译系统”这一定位
- 技术分享场景需要一页先把定位拉高，再让后面每层经验有统一主线

### Visual Direction
- 叙事开场页
- 强标题 + 编译路径 + 一句话判断

## Slide 2

### Core Insight
真正的业务矛盾不在“没有能力”，而在“不会 DSL 的人无法稳定获得可执行结果”。

### Evidence
- 业务人员会提需求，但不会 DSL
- DSL 语法、字段、类型、执行顺序约束都很高
- 专家手工编写成本高、无法规模化

### Visual Direction
- 问题-约束-目标三段式

## Slide 3

### Core Insight
直接让大模型生成，在企业真实环境里几乎一定不够。

### Evidence
- 模型会迁移旧知识，生成错误 DSL 习惯
- 这类任务对确定性要求极高
- 单体 Agent 责任过重，错误难定位

### Visual Direction
- 三个失败原因并列卡片

## Slide 4

### Core Insight
准备阶段的本质不是“补知识”，而是“做剪枝”。

### Evidence
- 语法规格脱水
- 负向清单
- 原子字段字典

### Visual Direction
- 三层剪枝卡片 + 结论条

## Slide 5

### Core Insight
最稳的做法不是造万能 Agent，而是做分层流水线。

### Evidence
- 意图降维
- 逻辑蓝图
- 语法翻译
- 静态整流
- 动态自愈

### Visual Direction
- 主流水线架构图

## Slide 6

### Core Insight
Prompt 设计不是写长文，而是做职责隔离。

### Evidence
- 每个 Agent 的 Prompt 要短而专
- 规则要结构化隔离
- Prompt 必须进入测试循环
- 模型可以辅助优化，但不能替代 Prompt 工程

### Visual Direction
- Prompt 反模式 vs 正确做法对照

## Slide 7

### Core Insight
真正值钱的是“模型、代码、人”的职责边界。

### Evidence
- 模型负责概率性认知任务
- 代码负责确定性执行任务
- 人留在高风险确认与验收节点
- 这也是 HITL 的价值

### Visual Direction
- 三栏职责边界图

## Slide 8

### Core Insight
企业场景真正关心的，不是首轮命中率，而是闭环交付率。

### Evidence
- 首轮语法正确率
- 校验通过率
- 自动修复成功率
- 人工介入率
- 最终可交付率

### Visual Direction
- 指标体系 + 闭环漏斗

## Slide 9

### Core Insight
这不是 AiSPL 特例，而是一套可复制到强约束生成任务的通用范式。

### Evidence
- 企业 SQL / 类 SQL
- PromQL / 告警规则
- 自动化测试脚本
- 规则引擎条件
- 运维编排 DSL / 安全策略语言

### Visual Direction
- 范式扩散图

## Slide 10

### Core Insight
最终我们搭建的不是聊天机器人，而是以 LLM 为核心、以工程约束为骨架、以校验修复为闭环的动态编译系统。

### Evidence
- 任务可控
- 流程分层
- 职责边界
- 闭环交付
- 理论锚点：Structured Outputs、ReAct、Self-Refine、NIST AI RMF

### Visual Direction
- 强总结页
- 路径收束 + 四条总结 + 参考来源
