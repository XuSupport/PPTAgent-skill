# Web Sources

## Core References

1. OpenAI, *Introducing Structured Outputs in the API*  
   https://openai.com/index/introducing-structured-outputs-in-the-api/
   - 用于支撑“Prompt 不够，必须引入确定性约束与 constrained decoding”的观点

2. Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models*  
   https://arxiv.org/abs/2210.03629
   - 用于支撑“规划与行动拆分、通过外部环境获取信息”的 agent 方法论背景

3. Madaan et al., *Self-Refine: Iterative Refinement with Self-Feedback*  
   https://arxiv.org/abs/2303.17651
   - 用于支撑“不要只看首轮生成，要构建反馈-修复-再验证”的闭环思想

4. NIST, *AI Risk Management Framework*  
   https://www.nist.gov/itl/ai-risk-management-framework
   - 用于支撑高风险系统中的可治理性、可验证性、人类介入与责任边界

## How They Will Be Used

- 用 OpenAI Structured Outputs 解释“约束输出 + 确定性工程”的必要性
- 用 ReAct 解释“不要让单体 Agent 包揽全部职责”
- 用 Self-Refine 解释“动态自愈闭环”的合理性
- 用 NIST AI RMF 解释“模型、代码、人”边界与 HITL 的必要性
