# PPT Agent Skill

使用单个模型按固定工作流制作 PPT，并将每一页先输出为独立 SVG，再通过预览复检逐页打磨，最后生成整套高一致性但不单调的演示文稿。

## 它能做什么

- 根据主题、文档、网页、PDF、报告或大纲生成整套 PPT
- 先给出 3 个不同风格候选页，让用户确认方向后再整套生成
- 使用本地模板库做结构参考，而不是每次从空白画布随机起稿
- 为不同页面自动分配不同页型：
  - 开场页
  - 核心判断页
  - 风险页
  - 对比页
  - 流程页
  - 系统图页
  - 指标看板页
  - 矩阵页
  - 总结页
- 在生成后自动渲染 PNG 预览图，检查重叠、压线、密度失衡和页面同构问题
- 最终输出一套更接近真实汇报场景的 `.pptx`

## 效果示例

### 开场页

![Cover Example](dsl_agent_talk_ppt_v2/previews/slide_01.png)

### 核心判断页

![Core Conclusion Example](dsl_agent_talk_ppt_v2/previews/slide_02.png)

### 风险页

![Risks Example](dsl_agent_talk_ppt_v2/previews/slide_03.png)

### 系统图页

![System Diagram Example](dsl_agent_talk_ppt_v2/previews/slide_07.png)

### 指标看板页

![Dashboard Example](dsl_agent_talk_ppt_v2/previews/slide_08.png)

### 矩阵页

![Matrix Example](dsl_agent_talk_ppt_v2/previews/slide_09.png)

## 核心特点

### 1. 模板优先，但不模板化

- 内置一组原创 SVG 母版
- 模板负责结构、节奏、模块语法
- 配色会根据当前主题重新设计
- 不会机械照搬某一个模板的颜色或文案

### 2. 风格统一，但页面必须有变化

- 整套 deck 可以统一气质、配色和字体
- 但每一页的卡片样式、信息密度、主图形方向、强调方式必须变化
- 避免“每页都是同一种深色圆角卡片”

### 3. 真正面向 PPT 交付，而不是只生成一张好看的图

- 先做上屏文案精修
- 再做 SVG
- 再渲染成 PNG 回看
- 最后做整套跨页深修

### 4. 支持强结构化内容

特别适合以下内容：

- 技术方法论分享
- 产品方案汇报
- 安全分析与漏洞说明
- 架构设计讲解
- 流程、机制、职责边界、闭环指标类主题

## 工作流

### Step 1. 明确主题和场景

先确定：

- 主题
- 受众
- 使用场景
- 页数
- 语言
- 想要的语气和风格边界

产物：

- `brief.md`
- `style_draft.md`

### Step 2. 先做风格草案，再做 3 个候选页

- 从模板库中挑选合适结构
- 基于同一页内容生成 3 个方向明显不同的候选页
- 让用户先选风格，再整套开始

产物：

- `template_choice.md`
- `concepts/option_a.svg`
- `concepts/option_b.svg`
- `concepts/option_c.svg`
- `concepts/option_a.png`
- `concepts/option_b.png`
- `concepts/option_c.png`
- `style_decision.md`

### Step 3. 先分配页型，再批量生成

在画整套之前，先写：

- 每一页是什么角色
- 每一页适合什么页型
- 每一页的信息密度如何
- 每一页主要参考哪个模板

产物：

- `outline.md`
- `page_family_plan.md`
- `screen_copy.md`
- `design_spec.md`

### Step 4. 逐页生成 SVG 并做视觉复检

每一页都经过：

1. 文案压缩
2. SVG 绘制
3. PNG 预览
4. 视觉复检
5. 修正后再进入下一页

产物：

- `slides/slide_01.svg`
- `slides/slide_02.svg`
- ...
- `previews/slide_01.png`
- `previews/slide_02.png`
- ...

### Step 5. 整套深修并导出 PPT

- 横向检查所有页面是否过于相似
- 检查是否有重叠、溢出、压边
- 检查是否存在无意义装饰
- 再输出 `.pptx`

## 输出目录说明

- `templates/`
  - 原创 SVG 模板库
- `scripts/init_ppt_workspace.py`
  - 初始化工作区
- `scripts/render_svg_preview.sh`
  - 把 SVG 渲染成 PNG 预览
- `TEMPLATE_LIBRARY.md`
  - 模板说明
- `TEMPLATE_INDEX.html`
  - 模板预览索引页

典型生成目录：

- `brief.md`
- `style_draft.md`
- `template_choice.md`
- `style_decision.md`
- `outline.md`
- `page_family_plan.md`
- `screen_copy.md`
- `design_spec.md`
- `slides/`
- `previews/`
- `outputs/`

## 适合的使用方式

你可以这样使用这个 skill：

- 提供一个主题，让它直接为你策划并生成 PPT
- 提供一个 Markdown 大纲，让它按大纲拆页并补充理论内容
- 提供一个网页、PDF 或报告，让它先提炼，再转成演示文稿
- 提供参考风格截图，让它吸收结构语法后重新设计自己的版本

## 设计原则

- 模板继承结构，不继承颜色
- 如果文本放不下，先改文案，不要先缩字号
- 装饰必须服务内容，不能只是“看起来热闹”
- 整套统一，不等于每页长得一样
- 连续三页使用同一种结构语法，视为失败信号
- 所有页面必须经过预览复检后才算完成

## 模板预览

模板索引页：

- [`templates/TEMPLATE_INDEX.html`](./templates/TEMPLATE_INDEX.html)

模板说明：

- [`templates/TEMPLATE_LIBRARY.md`](./templates/TEMPLATE_LIBRARY.md)

## 快速开始

1. 初始化工作区
2. 写 `brief.md`
3. 写 `style_draft.md`
4. 选择模板并生成 3 个候选页
5. 用户确认风格
6. 写 `outline.md`、`page_family_plan.md`、`screen_copy.md`、`design_spec.md`
7. 逐页生成 SVG 和 PNG 预览
8. 整套深修
9. 导出 `.pptx`

## 总结

`ppt-agent` 的核心不是“自动排版”本身，而是把 PPT 制作变成一条可复检、可收敛、可持续复用的工作流。

它适合那些既要结构化表达、又要视觉质量、还要真实交付稳定性的演示文稿场景。
