# Screen Copy

## Slide 1

### Slide Title
强约束 DSL 智能体搭建经验

### Slide Subtitle
问题不是“模型会不会写”，而是“系统能不能稳定交付”。

### Hero Lines
- 我们不是在做懂语法的聊天助手
- 而是在做动态编译系统
- 目标是把自然语言稳定编译成可执行 DSL

### Sections

#### Section A
- Title: 编译路径
- Bullet 1: 自然语言 -> 逻辑蓝图 -> 初版 DSL
- Bullet 2: 静态规整 -> 校验修复 -> 最终交付

#### Section B
- Title: 结论
- Bullet 1: 首轮像不像不重要，最终能交付才重要
- Bullet 2: 这是一套工程系统，不是一段聪明 Prompt

### Footer
- Source line: 来源：原始大纲；OpenAI Structured Outputs；ReAct；Self-Refine；NIST AI RMF。
- Note line: 开场页用于统一全场主线。

## Slide 2

### Slide Title
为什么我们要做这类智能体

### Slide Subtitle
真正的矛盾不是“没有能力”，而是“不会 DSL 的人无法稳定拿到结果”。

### Sections

#### Section A
- Title: 现实矛盾
- Bullet 1: 业务人员知道想查什么，但不会写底层 DSL
- Bullet 2: DSL 表达力强，但字段、类型、顺序都高度敏感

#### Section B
- Title: 传统方式
- Bullet 1: 依赖少数专家手工编写，成本高且响应慢
- Bullet 2: 无法把经验规模化沉淀成可复用能力

#### Section C
- Title: 真正目标
- Bullet 1: 让不会 DSL 的人也能稳定得到可执行结果
- Bullet 2: 结果必须可校验、可交付、可追责

### Footer
- Source line: 来源：原始大纲第一部分。
- Note line: 这一页回答“为什么值得做”。

## Slide 3

### Slide Title
为什么直接让大模型生成几乎一定不够

### Slide Subtitle
在真实环境里，错误不是“偶尔理解偏了”，而是会直接让系统不可执行。

### Cards

#### Card 1
- Title: 旧知识迁移
- Line 1: 模型会把 SQL、Python 等习惯
- Line 2: 自动带进私有 DSL

#### Card 2
- Title: 确定性要求极高
- Line 1: 字段、类型、保留字、时间格式
- Line 2: 任何一项出错都可能执行失败

#### Card 3
- Title: 单体 Agent 失稳
- Line 1: 理解、规划、生成、修复全压一体
- Line 2: 错误很难拆解也很难定位

### Footer
- Source line: 来源：原始大纲第二部分。
- Note line: 这一页负责把问题从“模型能力”转成“系统稳定性”。

## Slide 4

### Slide Title
第一层经验：准备工作不是补知识，而是做剪枝

### Slide Subtitle
准备阶段真正拉开差距的，不是“学更多”，而是“少乱想”。

### Cards

#### Card 1
- Title: 语法规格脱水
- Line 1: 把手册变成签名、参数和类型
- Line 2: 把描述性知识变成执行性知识

#### Card 2
- Title: 负向清单
- Line 1: 先明确哪些写法绝对禁止
- Line 2: 再给出在本 DSL 中的正确替代

#### Card 3
- Title: 原子字段字典
- Line 1: 把业务词映射成标准字段与逻辑
- Line 2: 让下游模块不再猜字段

### Hero Lines
- 我们不是在给 AI 加知识
- 而是在给 AI 剪枝

### Footer
- Source line: 来源：原始大纲第三部分。
- Note line: 这一页是后续所有稳定性的前提。

## Slide 5

### Slide Title
第二层经验：不要做万能 Agent，要做分层流水线

### Slide Subtitle
把复杂问题拆成不同职责的模块，系统才会稳定演进。

### Sections

#### Section A
- Title: 五段流水线
- Bullet 1: 意图降维 -> 逻辑蓝图 -> 语法翻译
- Bullet 2: 静态整流 -> 动态自愈

#### Section B
- Title: 拆分价值
- Bullet 1: Planner 负责画图纸，不直接写 DSL
- Bullet 2: Engineer 只做稳定映射，故意把职责做窄

#### Section C
- Title: 理论锚点
- Bullet 1: ReAct 支撑“规划与行动分层”
- Bullet 2: Self-Refine 支撑“反馈-修复-再验证”

### Footer
- Source line: 来源：原始大纲第四部分；ReAct；Self-Refine。
- Note line: 这一页是全套方法的架构骨架。

## Slide 6

### Slide Title
第三层经验：Prompt 设计不是写长文，而是做职责隔离

### Slide Subtitle
Prompt 真正的价值，不是让模型更万能，而是让它只承担该承担的认知任务。

### Sections

#### Section A
- Title: 正确做法
- Bullet 1: 每个 Agent 的 Prompt 要短而专
- Bullet 2: 用 role、rules、constraints 做结构化隔离

#### Section B
- Title: 工程化迭代
- Bullet 1: Prompt 必须进入测试循环，而不是一次写完
- Bullet 2: 每次只修一类错误，再回测验证

#### Section C
- Title: 边界意识
- Bullet 1: 模型可以参与优化 Prompt
- Bullet 2: 但不能替代 Prompt 工程和验收

### Footer
- Source line: 来源：原始大纲第五部分。
- Note line: 这一页解释为什么“Prompt 技巧”不是第一变量。

## Slide 7

### Slide Title
第四层经验：真正值钱的是模型与代码的职责边界

### Slide Subtitle
不要试图让模型负责全部事情，边界不清就不会稳定。

### Sections

#### Section A
- Title: 交给模型
- Bullet 1: 理解模糊需求、多步拆解、错误归因
- Bullet 2: 这些都属于概率性认知任务

#### Section B
- Title: 交给代码
- Bullet 1: 白名单校验、类型补齐、格式清洗、接口调用
- Bullet 2: 这些都属于确定性执行任务

#### Section C
- Title: 交给人
- Bullet 1: 高风险确认、歧义拍板、下发前验收
- Bullet 2: 这也是 HITL 的关键价值

### Hero Lines
- 模型做逻辑
- 代码做规范
- 人做决策

### Footer
- Source line: 来源：原始大纲第六部分；NIST AI RMF。
- Note line: 这一页负责把责任边界讲透。

## Slide 8

### Slide Title
第五层经验：不要只看首轮命中率，要看闭环交付率

### Slide Subtitle
企业真正关心的不是第一次有多漂亮，而是最后能不能交付。

### Sections

#### Section A
- Title: 核心指标
- Bullet 1: 首轮语法正确率、校验通过率、自动修复成功率
- Bullet 2: 平均修复轮次、人工介入率、最终可交付率

#### Section B
- Title: 为什么闭环更重要
- Bullet 1: 复杂系统里完全零错几乎不现实
- Bullet 2: 真正优秀的系统能把局部误差拉回可执行区间

#### Section C
- Title: 理论锚点
- Bullet 1: Self-Refine 证明迭代反馈能提升最终质量
- Bullet 2: 真实校验环境是闭环系统的必要前提

### Footer
- Source line: 来源：原始大纲第七部分；Self-Refine。
- Note line: 这一页定义企业级评价标准。

## Slide 9

### Slide Title
第六层经验：这不是 Demo 方法，而是一套可复制范式

### Slide Subtitle
只要任务满足“强约束 + 高错误代价 + 可校验产物”，这套方法就能迁移。

### Cards

#### Card 1
- Title: 可迁移场景
- Line 1: SQL / 类 SQL、PromQL、告警规则
- Line 2: 测试脚本、规则引擎、编排 DSL

#### Card 2
- Title: 共同特征
- Line 1: 字段、类型、结构都有强约束
- Line 2: 结果必须可执行、可校验、可追责

#### Card 3
- Title: 迁移价值
- Line 1: 重点不在语言长得像不像
- Line 2: 而在能否稳定翻译成高确定性产物

### Footer
- Source line: 来源：原始大纲第八部分。
- Note line: 这一页把方法从个案拉到范式。

## Slide 10

### Slide Title
最后总结：我们不是在做聊天机器人，而是在做动态编译器

### Slide Subtitle
强约束工业场景里，真正决定上限的从来不只是模型能力。

### Sections

#### Section A
- Title: 四条结论
- Bullet 1: 先让任务可控，不要先让模型万能
- Bullet 2: 用分层架构管理复杂性

#### Section B
- Title: 四条结论
- Bullet 1: 能靠工程手段焊死的边界，不要继续交给 Prompt
- Bullet 2: 关注最终交付，不只关注第一次生成

#### Section C
- Title: 最终收束
- Bullet 1: 这是以 LLM 为核心、以工程约束为骨架的动态编译系统
- Bullet 2: 只有知识、流程、职责、错误都被工程化，智能体才能真正落地

### Footer
- Source line: 来源：原始大纲第九部分与结语；OpenAI Structured Outputs；ReAct；Self-Refine；NIST AI RMF。
- Note line: 结束页同时承担观点收束和理论回钩。
