const fs = require("fs");
const path = require("path");
const pptxgen = require("../deeppresenter/html2pptx/node_modules/pptxgenjs");

const root = process.cwd();
const slidesDir = path.join(root, "slides");
const outputsDir = path.join(root, "outputs");

const theme = {
  bg: "#07131F",
  bg2: "#0F2438",
  bg3: "#112A43",
  panel: "#102033",
  panel2: "#122943",
  panel3: "#162E48",
  ink: "#F8FBFF",
  muted: "#B8C6D6",
  faint: "#8EA0B3",
  line: "#234764",
  line2: "#2E5679",
  amber: "#FFB547",
  gold: "#FFD58C",
  cyan: "#63D4FF",
  cyan2: "#3AA8FF",
  jade: "#43E2B6",
  violet: "#9C87FF",
  rose: "#FF7C66",
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function textBlock(items, x, y, options = {}) {
  const {
    size = 18,
    weight = 400,
    color = theme.ink,
    lineHeight = 1.35,
    anchor = "start",
  } = options;
  return items
    .map((line, idx) => {
      const attrs = anchor === "middle" ? ` text-anchor="middle"` : "";
      return `<text x="${x}" y="${y + idx * size * lineHeight}"${attrs} font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(line)}</text>`;
    })
    .join("\n");
}

function wrap(content, options = {}) {
  const {
    bg1 = theme.bg,
    bg2 = theme.bg2,
    glow1 = theme.cyan,
    glow2 = theme.amber,
    grid = false,
    extraDefs = "",
  } = options;
  const gridLines = grid
    ? `
      <g stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1">
        <line x1="260" y1="0" x2="260" y2="900"/>
        <line x1="800" y1="0" x2="800" y2="900"/>
        <line x1="1338" y1="0" x2="1338" y2="900"/>
        <line x1="0" y1="220" x2="1600" y2="220"/>
        <line x1="0" y1="540" x2="1600" y2="540"/>
      </g>`
    : "";
  return `<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
      <linearGradient id="warmGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${theme.gold}"/>
        <stop offset="55%" stop-color="${theme.amber}"/>
        <stop offset="100%" stop-color="#FF8A3D"/>
      </linearGradient>
      <linearGradient id="coolGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${theme.cyan2}"/>
        <stop offset="100%" stop-color="${theme.cyan}"/>
      </linearGradient>
      <linearGradient id="jadeGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#2EC89B"/>
        <stop offset="100%" stop-color="${theme.jade}"/>
      </linearGradient>
      <linearGradient id="violetGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${theme.violet}"/>
        <stop offset="100%" stop-color="#C3AEFF"/>
      </linearGradient>
      <radialGradient id="glowA" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="${glow1}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${glow1}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="${glow2}" stop-opacity="0.16"/>
        <stop offset="100%" stop-color="${glow2}" stop-opacity="0"/>
      </radialGradient>
      ${extraDefs}
    </defs>
    <rect width="1600" height="900" fill="url(#bgGrad)"/>
    <circle cx="1360" cy="180" r="250" fill="url(#glowA)"/>
    <circle cx="220" cy="790" r="260" fill="url(#glowB)"/>
    ${gridLines}
    ${content}
  </svg>`;
}

function header(eyebrow, titleLines, subtitle, lineWidth = 520, color = theme.amber) {
  return `
    <text x="88" y="92" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="800" fill="${color}">${esc(eyebrow)}</text>
    ${textBlock(titleLines, 88, 168, { size: 58, weight: 900, color: theme.ink, lineHeight: 1.08 })}
    <text x="88" y="298" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="${theme.muted}">${esc(subtitle)}</text>
    <rect x="88" y="326" width="${lineWidth}" height="8" rx="4" fill="url(#warmGrad)"/>
  `;
}

function panel(x, y, w, h, inner, options = {}) {
  const { fill = theme.panel2, stroke = theme.line, rx = 24, opacity = 1 } = options;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="2"/>${inner}`;
}

function outlinePanel(x, y, w, h, inner, options = {}) {
  const { stroke = theme.line2, rx = 24 } = options;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${stroke}" stroke-width="2"/>${inner}`;
}

function accentPanel(x, y, w, h, inner, options = {}) {
  const { fill = "url(#warmGrad)", stroke = "url(#warmGrad)", rx = 24 } = options;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>${inner}`;
}

function chip(x, y, w, h, label, options = {}) {
  const { fill = theme.panel3, stroke = theme.line2, text = theme.ink } = options;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${x + w / 2}" y="${y + h / 2 + 8}" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="800" fill="${text}">${esc(label)}</text>
  `;
}

function footer(source, note) {
  return `
    <line x1="88" y1="846" x2="1512" y2="846" stroke="${theme.line}" stroke-width="1.5"/>
    <text x="88" y="872" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="12" fill="${theme.faint}">${esc(source)}</text>
    <text x="1512" y="872" text-anchor="end" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="12" fill="${theme.faint}">${esc(note)}</text>
  `;
}

function slide1() {
  return wrap(`
    <text x="918" y="252" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="168" font-weight="900" fill="#E9F4FF" fill-opacity="0.07">COMPILER</text>
    <text x="1024" y="392" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="168" font-weight="900" fill="#E9F4FF" fill-opacity="0.05">SYSTEM</text>
    <text x="88" y="92" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="800" fill="${theme.amber}">01 / POSITIONING</text>
    ${textBlock(["强约束 DSL", "智能体搭建经验"], 88, 174, { size: 72, weight: 900, color: theme.ink, lineHeight: 1.04 })}
    <text x="88" y="342" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="26" fill="${theme.muted}">问题不是“模型会不会写”，而是“系统能不能稳定交付”。</text>
    <rect x="88" y="372" width="524" height="8" rx="4" fill="url(#warmGrad)"/>

    ${panel(88, 438, 530, 208, `
      <text x="122" y="494" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="800" fill="${theme.gold}">主张</text>
      ${textBlock(["我们不是在做懂语法的聊天助手", "而是在做把自然语言", "稳定编译成 DSL 的工程系统"], 122, 556, { size: 34, weight: 850, color: theme.ink, lineHeight: 1.2 })}
    `, { fill: "#11253D", stroke: theme.line2, rx: 28 })}

    ${accentPanel(1042, 118, 370, 156, `
      <text x="1074" y="170" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="21" font-weight="900" fill="${theme.bg}">结论</text>
      ${textBlock(["首轮像不像不重要", "最终能交付才重要"], 1074, 222, { size: 26, weight: 900, color: theme.bg, lineHeight: 1.28 })}
    `, { rx: 26 })}

    <path d="M914 316 L914 684" stroke="${theme.line2}" stroke-width="2.5"/>
    <path d="M914 390 H1164" stroke="${theme.line2}" stroke-width="2.5"/>
    <path d="M914 514 H1164" stroke="${theme.line2}" stroke-width="2.5"/>
    <path d="M914 638 H1164" stroke="${theme.line2}" stroke-width="2.5"/>
    <circle cx="914" cy="390" r="14" fill="url(#coolGrad)"/>
    <circle cx="914" cy="514" r="14" fill="url(#violetGrad)"/>
    <circle cx="914" cy="638" r="14" fill="url(#jadeGrad)"/>
    <text x="956" y="366" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="800" fill="${theme.ink}">约束编排</text>
    <text x="956" y="398" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">把语法、字段、禁令和流程显式化</text>
    <text x="956" y="490" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="800" fill="${theme.ink}">校验修复</text>
    <text x="956" y="522" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">把错误拉回可执行区间</text>
    <text x="956" y="614" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="800" fill="${theme.ink}">闭环交付</text>
    <text x="956" y="646" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">最终输出可验证、可追责结果</text>

    ${chip(88, 706, 316, 60, "自然语言 -> 逻辑蓝图", { fill: "#11253D", stroke: theme.line2 })}
    ${chip(424, 706, 294, 60, "DSL 翻译 -> 整流", { fill: "#11253D", stroke: theme.line2 })}
    ${chip(738, 706, 302, 60, "修复 -> 回归验证", { fill: "#11253D", stroke: theme.line2 })}
    ${chip(1060, 706, 352, 60, "可交付结果", { fill: "url(#warmGrad)", stroke: "url(#warmGrad)", text: theme.bg })}

    ${footer("来源：原始大纲；OpenAI Structured Outputs；ReAct；Self-Refine；NIST AI RMF。", "开场 / 动态编译器定位")}
  `, { glow1: theme.cyan, glow2: theme.amber });
}

function slide2() {
  return wrap(`
    ${header("02 / WHY THIS MATTERS", ["为什么值得做", "这类智能体"], "真正的矛盾不是“没有能力”，而是“不会 DSL 的人无法稳定拿到结果”。", 520, theme.cyan)}
    ${accentPanel(88, 374, 1424, 132, `
      ${textBlock(["目标不是让 AI 会写 DSL", "而是让组织稳定获得 DSL 结果"], 800, 438, { size: 42, weight: 900, color: theme.bg, lineHeight: 1.16, anchor: "middle" })}
    `, { rx: 30 })}

    ${panel(88, 548, 328, 188, `
      <text x="120" y="594" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.cyan}">POINT 01</text>
      <text x="120" y="640" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">业务需求真实存在</text>
      ${textBlock(["大家知道想查什么", "但不会写底层 DSL"], 120, 688, { size: 20, color: theme.muted })}
    `, { fill: "#12263F", stroke: theme.line2 })}
    ${panel(446, 548, 328, 188, `
      <text x="478" y="594" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.violet}">POINT 02</text>
      <text x="478" y="640" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">DSL 高度敏感</text>
      ${textBlock(["字段、类型、顺序", "都会影响最终能否执行"], 478, 688, { size: 20, color: theme.muted })}
    `, { fill: "#12263F", stroke: theme.line2 })}
    ${panel(804, 548, 328, 188, `
      <text x="836" y="594" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.jade}">POINT 03</text>
      <text x="836" y="640" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">专家交付不可扩展</text>
      ${textBlock(["依赖少数专家手工编写", "成本高且响应慢"], 836, 688, { size: 20, color: theme.muted })}
    `, { fill: "#12263F", stroke: theme.line2 })}
    ${panel(1162, 548, 350, 188, `
      <text x="1194" y="594" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.gold}">POINT 04</text>
      <text x="1194" y="640" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">组织需要稳定分发</text>
      ${textBlock(["结果必须可校验", "也必须可交付、可追责"], 1194, 688, { size: 20, color: theme.muted })}
    `, { fill: "#12263F", stroke: theme.line2 })}

    ${footer("来源：原始大纲第一部分。", "核心判断 / 为什么这件事重要")}
  `, { bg1: "#081421", bg2: "#13314A", glow1: theme.cyan, glow2: theme.jade });
}

function slide3() {
  return wrap(`
    ${header("03 / FAILURE MODES", ["为什么直接让大模型生成", "几乎一定不够"], "在真实环境里，错误不是“偏了一点”，而是会让系统直接不可执行。", 600, theme.rose)}
    <rect x="88" y="374" width="1424" height="96" rx="24" fill="#131D31" stroke="#4C2F38" stroke-width="2"/>
    <text x="124" y="432" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="30" font-weight="900" fill="${theme.ink}">真正的问题不是生成得不够像，而是错误会突破执行边界。</text>
    <text x="1170" y="432" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.rose}">高错误代价</text>

    ${panel(88, 518, 332, 222, `
      <text x="120" y="566" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.rose}">RISK 01</text>
      <text x="120" y="614" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">旧知识迁移</text>
      ${textBlock(["SQL、Python 的习惯", "会被自动带进私有 DSL"], 120, 662, { size: 20, color: theme.muted })}
    `, { fill: "#162133", stroke: "#4C2F38" })}
    ${panel(446, 518, 332, 222, `
      <text x="478" y="566" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.rose}">RISK 02</text>
      <text x="478" y="614" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">确定性要求极高</text>
      ${textBlock(["字段、类型、保留字", "任何一项出错都可能失败"], 478, 662, { size: 20, color: theme.muted })}
    `, { fill: "#162133", stroke: "#4C2F38" })}
    ${panel(804, 518, 332, 222, `
      <text x="836" y="566" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.rose}">RISK 03</text>
      <text x="836" y="614" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">单体 Agent 过载</text>
      ${textBlock(["理解、规划、生成、修复", "全压一体就会难定位"], 836, 662, { size: 20, color: theme.muted })}
    `, { fill: "#162133", stroke: "#4C2F38" })}
    ${panel(1162, 518, 350, 222, `
      <text x="1194" y="566" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.rose}">RISK 04</text>
      <text x="1194" y="614" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">错误不可拆解</text>
      ${textBlock(["系统看起来很聪明", "但交付链路并不稳定"], 1194, 662, { size: 20, color: theme.muted })}
    `, { fill: "#162133", stroke: "#4C2F38" })}

    <rect x="88" y="776" width="1424" height="54" rx="18" fill="#1E2437" stroke="#4C2F38" stroke-width="2"/>
    <text x="800" y="811" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.rose}">只要任务高约束且高代价，单轮直接生成就不是一个可靠策略。</text>
    ${footer("来源：原始大纲第二部分。", "风险页 / 为什么单轮生成不够")}
  `, { bg1: "#0C1521", bg2: "#16253C", glow1: theme.rose, glow2: theme.amber });
}

function slide4() {
  return wrap(`
    ${header("04 / PRUNING", ["第一层经验：准备工作", "不是补知识，而是做剪枝"], "准备阶段真正拉开差距的，不是“学更多”，而是“少乱想”。", 560, theme.jade)}
    ${chip(106, 372, 320, 60, "不是加知识，是做剪枝", { fill: "#0F2740", stroke: "url(#jadeGrad)", text: theme.jade })}

    <rect x="468" y="372" width="664" height="84" rx="24" fill="#13263E" stroke="${theme.line2}" stroke-width="2"/>
    <text x="800" y="425" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.ink}">原始知识池</text>
    <text x="800" y="456" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">手册、样例、别名、习惯写法、错误案例、历史经验</text>

    <path d="M608 458 L704 544" stroke="url(#coolGrad)" stroke-width="3" fill="none"/>
    <path d="M800 458 L800 544" stroke="url(#violetGrad)" stroke-width="3" fill="none"/>
    <path d="M992 458 L896 544" stroke="url(#warmGrad)" stroke-width="3" fill="none"/>

    <rect x="500" y="544" width="220" height="120" rx="26" fill="#12263F" stroke="url(#coolGrad)" stroke-width="2"/>
    <rect x="690" y="544" width="220" height="120" rx="26" fill="#12263F" stroke="url(#violetGrad)" stroke-width="2"/>
    <rect x="880" y="544" width="220" height="120" rx="26" fill="#12263F" stroke="url(#warmGrad)" stroke-width="2"/>
    <text x="610" y="588" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.ink}">规格脱水</text>
    <text x="610" y="620" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="17" fill="${theme.muted}">签名、参数、类型</text>
    <text x="800" y="588" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.ink}">负向清单</text>
    <text x="800" y="620" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="17" fill="${theme.muted}">哪些写法绝对禁止</text>
    <text x="990" y="588" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.ink}">字段字典</text>
    <text x="990" y="620" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="17" fill="${theme.muted}">业务词到原子字段</text>

    <path d="M610 664 C650 720 722 744 800 760" stroke="url(#coolGrad)" stroke-width="3" fill="none"/>
    <path d="M800 664 L800 748" stroke="url(#violetGrad)" stroke-width="3" fill="none"/>
    <path d="M990 664 C950 720 878 744 800 760" stroke="url(#warmGrad)" stroke-width="3" fill="none"/>

    ${accentPanel(418, 752, 764, 70, `
      <text x="800" y="798" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="28" font-weight="900" fill="${theme.bg}">得到可执行、可校验、可修复的 DSL 上下文</text>
    `, { rx: 24 })}

    ${footer("来源：原始大纲第三部分。", "方法页 / 剪枝是稳定性的起点")}
  `, { bg1: "#091721", bg2: "#14304B", glow1: theme.jade, glow2: theme.amber });
}

function slide5() {
  return wrap(`
    ${header("05 / PIPELINE", ["第二层经验：不要做万能 Agent", "要做分层流水线"], "把复杂问题拆成不同职责的模块，系统才会稳定演进。", 620, theme.cyan)}
    <rect x="88" y="384" width="1424" height="142" rx="30" fill="#0F1D31" stroke="${theme.line2}" stroke-width="2"/>
    ${chip(120, 430, 204, 54, "意图降维", { fill: "#13263F", stroke: theme.line2 })}
    <text x="344" y="466" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="30" fill="${theme.amber}">→</text>
    ${chip(396, 430, 204, 54, "逻辑蓝图", { fill: "#13263F", stroke: theme.line2 })}
    <text x="620" y="466" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="30" fill="${theme.amber}">→</text>
    ${chip(672, 430, 204, 54, "语法翻译", { fill: "#13263F", stroke: theme.line2 })}
    <text x="896" y="466" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="30" fill="${theme.amber}">→</text>
    ${chip(948, 430, 204, 54, "静态整流", { fill: "#13263F", stroke: theme.line2 })}
    <text x="1172" y="466" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="30" fill="${theme.amber}">→</text>
    ${chip(1224, 430, 250, 54, "动态自愈", { fill: "url(#warmGrad)", stroke: "url(#warmGrad)", text: theme.bg })}

    <text x="122" y="560" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.faint}">拆分价值</text>
    ${panel(88, 590, 418, 190, `
      ${textBlock(["Planner 负责画逻辑图纸", "不直接写 DSL"], 122, 652, { size: 28, weight: 850, color: theme.ink, lineHeight: 1.22 })}
      <text x="122" y="746" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">故意把每个模块的职责做窄，系统才会稳定。</text>
    `, { fill: "#12263F" })}
    ${panel(534, 590, 418, 190, `
      ${textBlock(["Engineer 只做确定映射", "规则和修复回路显式化"], 568, 652, { size: 28, weight: 850, color: theme.ink, lineHeight: 1.22 })}
      <text x="568" y="746" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">复杂性通过流程拆解，而不是交给单体智能体硬扛。</text>
    `, { fill: "#12263F" })}
    ${accentPanel(980, 590, 524, 190, `
      <text x="1014" y="646" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.bg}">理论锚点</text>
      ${textBlock(["ReAct：规划与行动分层", "Self-Refine：反馈、修复、再验证"], 1014, 700, { size: 24, weight: 850, color: theme.bg, lineHeight: 1.3 })}
    `)}

    ${footer("来源：原始大纲第四部分；ReAct；Self-Refine。", "架构页 / 分层流水线")}
  `, { bg1: "#08131E", bg2: "#112940", glow1: theme.cyan, glow2: theme.violet });
}

function slide6() {
  return wrap(`
    ${header("06 / PROMPT RESPONSIBILITIES", ["第三层经验：Prompt 设计", "不是写长文"], "Prompt 的价值，不是让模型更万能，而是让它只承担该承担的认知任务。", 600, theme.violet)}
    <line x1="800" y1="374" x2="800" y2="786" stroke="${theme.line2}" stroke-width="2"/>
    <text x="88" y="392" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.rose}">反模式</text>
    <text x="840" y="392" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.jade}">正确做法</text>

    ${panel(88, 422, 654, 286, `
      ${textBlock(["把场景知识、字段字典、语法规则", "禁令、示例、修复策略", "全部塞进同一个超长 Prompt"], 122, 494, { size: 32, weight: 850, color: theme.ink, lineHeight: 1.2 })}
      <text x="122" y="648" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">结果：注意力被稀释，错误难定位，测试也不可控。</text>
    `, { fill: "#171F31", stroke: "#4C2F38" })}

    ${panel(858, 422, 654, 286, `
      ${chip(896, 470, 136, 48, "role", { fill: "#15263B", stroke: "url(#coolGrad)" })}
      ${chip(1052, 470, 152, 48, "rules", { fill: "#15263B", stroke: "url(#violetGrad)" })}
      ${chip(1224, 470, 198, 48, "constraints", { fill: "#15263B", stroke: "url(#jadeGrad)" })}
      ${chip(1442, 470, 88, 48, "tests", { fill: "#15263B", stroke: "url(#warmGrad)" })}
      ${textBlock(["每个 Prompt 只承担一类职责", "规则与约束用结构化段落隔离", "然后进入测试循环逐类修复"], 896, 570, { size: 28, weight: 850, color: theme.ink, lineHeight: 1.26 })}
      <text x="896" y="686" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">Prompt 可以优化，但不能替代工程验证与验收。</text>
    `, { fill: "#12263F", stroke: theme.line2 })}

    ${accentPanel(238, 744, 1124, 58, `
      <text x="800" y="782" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.bg}">Prompt 工程的核心不是写长，而是拆责、隔离、回测。</text>
    `, { rx: 18 })}

    ${footer("来源：原始大纲第五部分。", "对比页 / Prompt 是工程而不是灵感")}
  `, { bg1: "#0A1220", bg2: "#10263D", glow1: theme.violet, glow2: theme.rose });
}

function slide7() {
  return wrap(`
    ${header("07 / BOUNDARIES", ["第四层经验：真正值钱的", "是模型、代码、人的职责边界"], "不要试图让模型负责全部事情，边界不清就不会稳定。", 690, theme.amber)}
    <circle cx="800" cy="536" r="160" fill="${theme.amber}" fill-opacity="0.16"/>
    <circle cx="612" cy="652" r="164" fill="${theme.violet}" fill-opacity="0.18"/>
    <circle cx="988" cy="652" r="164" fill="${theme.cyan}" fill-opacity="0.18"/>
    <circle cx="800" cy="618" r="78" fill="#10233A" stroke="${theme.line2}" stroke-width="2"/>
    ${textBlock(["稳定", "交付"], 800, 602, { size: 24, weight: 900, color: theme.ink, lineHeight: 1.24, anchor: "middle" })}

    <text x="800" y="462" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="26" font-weight="900" fill="${theme.ink}">人</text>
    <text x="612" y="694" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="26" font-weight="900" fill="${theme.ink}">模型</text>
    <text x="988" y="694" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="26" font-weight="900" fill="${theme.ink}">代码</text>

    <text x="704" y="400" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">高风险确认 / 歧义拍板 / 验收</text>
    <text x="448" y="744" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">理解模糊需求 / 多步拆解 / 错误归因</text>
    <text x="984" y="744" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">白名单校验 / 类型补齐 / 格式清洗 / 调用</text>

    ${panel(88, 430, 306, 162, `
      <text x="122" y="478" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="900" fill="${theme.violet}">交给模型</text>
      ${textBlock(["理解模糊需求", "拆解复杂逻辑", "辅助归因错误"], 122, 532, { size: 24, weight: 850, color: theme.ink, lineHeight: 1.24 })}
    `, { fill: "#12263F", stroke: "url(#violetGrad)" })}
    ${panel(1206, 420, 306, 188, `
      <text x="1240" y="478" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="900" fill="${theme.cyan}">交给代码</text>
      ${textBlock(["校验边界", "规则执行", "修复流水线"], 1240, 530, { size: 22, weight: 850, color: theme.ink, lineHeight: 1.28 })}
    `, { fill: "#12263F", stroke: "url(#coolGrad)" })}

    ${accentPanel(478, 760, 644, 60, `
      <text x="800" y="799" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" font-weight="900" fill="${theme.bg}">高风险确认与最终拍板必须保留给人。</text>
    `, { rx: 18 })}

    ${footer("来源：原始大纲第六部分；NIST AI RMF。", "系统图 / 职责边界")}
  `, { bg1: "#091320", bg2: "#102840", glow1: theme.cyan, glow2: theme.amber });
}

function slide8() {
  return wrap(`
    ${header("08 / DELIVERY RATE", ["第五层经验：不要只看首轮命中率", "要看闭环交付率"], "企业真正关心的不是第一次有多漂亮，而是最后能不能交付。", 760, theme.jade)}

    ${panel(88, 376, 310, 156, `
      <text x="122" y="424" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.gold}">KPI 01</text>
      <text x="122" y="478" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="42" font-weight="900" fill="${theme.ink}">首轮正确率</text>
      <text x="122" y="514" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">它重要，但不能代表最终价值。</text>
    `, { fill: "#12263F" })}
    ${panel(420, 376, 310, 156, `
      <text x="454" y="424" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.cyan}">KPI 02</text>
      <text x="454" y="478" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="42" font-weight="900" fill="${theme.ink}">修复成功率</text>
      <text x="454" y="514" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">衡量系统能否把错误拉回执行区间。</text>
    `, { fill: "#12263F" })}
    ${accentPanel(752, 376, 760, 156, `
      <text x="786" y="424" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.bg}">KPI 03</text>
      <text x="786" y="478" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="42" font-weight="900" fill="${theme.bg}">最终可交付率</text>
      <text x="786" y="514" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.bg}">企业最终会为这个指标买单，而不是为一次 Demo 命中买单。</text>
    `)}

    ${panel(88, 568, 860, 236, `
      <text x="122" y="616" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.ink}">闭环路径</text>
      ${chip(122, 658, 140, 46, "生成", { fill: "#15263B", stroke: theme.line2 })}
      <text x="280" y="690" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="${theme.amber}">→</text>
      ${chip(320, 658, 140, 46, "校验", { fill: "#15263B", stroke: theme.line2 })}
      <text x="478" y="690" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="${theme.amber}">→</text>
      ${chip(518, 658, 140, 46, "修复", { fill: "#15263B", stroke: theme.line2 })}
      <text x="676" y="690" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="24" fill="${theme.amber}">→</text>
      ${chip(716, 658, 188, 46, "回归验证", { fill: "#15263B", stroke: theme.line2 })}
      <path d="M736 646 C690 610 552 606 392 640" stroke="url(#coolGrad)" stroke-width="2.5" fill="none"/>
      <text x="548" y="614" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="16" font-weight="800" fill="${theme.faint}">失败就回到修复</text>
      <text x="122" y="756" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">复杂系统里“完全零错”几乎不现实，真正优秀的系统能把局部误差拉回可执行区间。</text>
    `, { fill: "#101D31" })}

    ${panel(980, 568, 532, 236, `
      <text x="1014" y="616" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.ink}">评价口径</text>
      ${textBlock(["首轮正确率：看前端表现", "校验通过率：看边界约束是否到位", "修复成功率：看闭环是否成立", "人工介入率：看人是否被放在正确位置"], 1014, 674, { size: 21, weight: 800, color: theme.ink, lineHeight: 1.36 })}
    `, { fill: "#12263F", stroke: theme.line2 })}

    ${footer("来源：原始大纲第七部分；Self-Refine。", "看板页 / 企业只为闭环交付率买单")}
  `, { bg1: "#08131F", bg2: "#12304A", glow1: theme.jade, glow2: theme.cyan });
}

function slide9() {
  return wrap(`
    ${header("09 / TRANSFERABLE PATTERN", ["第六层经验：这不是 Demo 方法", "而是一套可复制范式"], "只要任务满足“强约束 + 高错误代价 + 可校验产物”，这套方法就能迁移。", 720, theme.violet)}
    <rect x="88" y="372" width="940" height="430" rx="30" fill="#0F1D31" stroke="${theme.line2}" stroke-width="2"/>
    <line x1="558" y1="404" x2="558" y2="770" stroke="${theme.line2}" stroke-width="2"/>
    <line x1="122" y1="588" x2="994" y2="588" stroke="${theme.line2}" stroke-width="2"/>
    <text x="516" y="430" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.faint}">高约束</text>
    <text x="516" y="754" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.faint}">低约束</text>
    <text x="132" y="578" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.faint}">低错误代价</text>
    <text x="838" y="578" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.faint}">高错误代价</text>
    <text x="144" y="450" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.ink}">高约束 / 低代价</text>
    <text x="612" y="450" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.ink}">高约束 / 高代价</text>
    <text x="144" y="628" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.ink}">低约束 / 低代价</text>
    <text x="612" y="628" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.ink}">低约束 / 高代价</text>

    <circle cx="338" cy="498" r="14" fill="${theme.cyan}"/><text x="366" y="505" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.ink}">普通脚本生成</text>
    <circle cx="744" cy="502" r="14" fill="${theme.amber}"/><text x="772" y="509" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.ink}">PromQL / 告警规则</text>
    <circle cx="304" cy="690" r="14" fill="${theme.jade}"/><text x="332" y="697" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.ink}">常规问答</text>
    <circle cx="756" cy="690" r="14" fill="${theme.violet}"/><text x="784" y="697" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.ink}">编排 DSL / 安全策略</text>
    <circle cx="692" cy="550" r="14" fill="#E2E8F0"/><text x="720" y="557" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="800" fill="${theme.ink}">SQL / 类 SQL</text>

    ${panel(1060, 372, 452, 214, `
      <text x="1094" y="426" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.gold}">迁移条件</text>
      ${textBlock(["字段、类型、结构具有强约束", "结果必须可执行、可校验、可追责", "错误一旦发生代价足够高"], 1094, 484, { size: 24, weight: 850, color: theme.ink, lineHeight: 1.32 })}
    `, { fill: "#12263F" })}
    ${panel(1060, 610, 452, 192, `
      <text x="1094" y="662" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.violet}">迁移价值</text>
      ${textBlock(["重点不在语言长得像不像", "而在于能否稳定翻译成", "高确定性、可交付产物"], 1094, 724, { size: 26, weight: 900, color: theme.ink, lineHeight: 1.24 })}
    `, { fill: "#101D31", stroke: "url(#violetGrad)" })}

    ${footer("来源：原始大纲第八部分。", "矩阵页 / 把个案提升成通用范式")}
  `, { bg1: "#08131F", bg2: "#10273F", glow1: theme.violet, glow2: theme.cyan });
}

function slide10() {
  return wrap(`
    <text x="1022" y="244" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="156" font-weight="900" fill="#EAF5FF" fill-opacity="0.06">SYSTEM</text>
    ${header("10 / MANIFESTO", ["最后总结：我们不是在做聊天机器人", "而是在做动态编译系统"], "强约束工业场景里，真正决定上限的从来不只是模型能力。", 760, theme.amber)}

    ${panel(88, 392, 442, 298, `
      <text x="122" y="442" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.gold}">结论 01 / 02</text>
      ${textBlock(["先让任务可控", "不要先让模型万能", "", "复杂性必须靠分层架构管理", "不能靠一个超级 Agent 硬扛"], 122, 500, { size: 28, weight: 850, color: theme.ink, lineHeight: 1.22 })}
    `, { fill: "#12263F" })}
    ${panel(558, 392, 442, 298, `
      <text x="592" y="442" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.cyan}">结论 03 / 04</text>
      ${textBlock(["能靠工程手段焊死的边界", "不要继续交给 Prompt", "", "企业最终会为交付闭环买单", "不会为一次首轮命中买单"], 592, 500, { size: 28, weight: 850, color: theme.ink, lineHeight: 1.22 })}
    `, { fill: "#12263F" })}
    ${panel(1028, 392, 476, 298, `
      <text x="1062" y="442" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="22" font-weight="900" fill="${theme.violet}">最终收束</text>
      ${textBlock(["这是一套以 LLM 为核心", "以工程约束为骨架", "以校验修复为闭环的动态编译系统"], 1062, 512, { size: 30, weight: 900, color: theme.ink, lineHeight: 1.2 })}
      <text x="1062" y="652" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" fill="${theme.muted}">只有知识、流程、职责、错误都被工程化，智能体才能真正落地。</text>
    `, { fill: "#101D31", stroke: theme.line2 })}

    ${accentPanel(88, 734, 1416, 74, `
      <text x="796" y="782" text-anchor="middle" font-family="Aptos, PingFang SC, Microsoft YaHei, sans-serif" font-size="34" font-weight="900" fill="${theme.bg}">不是让模型更像人，而是让系统更像可交付的编译器。</text>
    `, { rx: 24 })}

    ${footer("来源：原始大纲第九部分与结语；OpenAI Structured Outputs；ReAct；Self-Refine；NIST AI RMF。", "总结页 / 动态编译系统")}
  `, { bg1: "#08131F", bg2: "#10253C", glow1: theme.amber, glow2: theme.cyan });
}

const slideRenderers = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10];

fs.mkdirSync(slidesDir, { recursive: true });
fs.mkdirSync(outputsDir, { recursive: true });

slideRenderers.forEach((render, idx) => {
  fs.writeFileSync(path.join(slidesDir, `slide_${String(idx + 1).padStart(2, "0")}.svg`), render(), "utf8");
});

async function buildPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Codex";
  pptx.company = "OpenAI";
  pptx.subject = "强约束 DSL 智能体搭建经验 v2";
  pptx.title = "强约束 DSL 智能体搭建经验 v2";
  pptx.lang = "zh-CN";

  slideRenderers.forEach((_, idx) => {
    const slide = pptx.addSlide();
    slide.background = { color: "07131F" };
    slide.addImage({
      path: path.join(slidesDir, `slide_${String(idx + 1).padStart(2, "0")}.svg`),
      x: 0,
      y: 0,
      w: 13.333,
      h: 7.5,
    });
  });

  await pptx.writeFile({ fileName: path.join(outputsDir, "dsl-agent-experience-deck-v2.pptx") });
}

buildPptx().catch((err) => {
  console.error(err);
  process.exit(1);
});
