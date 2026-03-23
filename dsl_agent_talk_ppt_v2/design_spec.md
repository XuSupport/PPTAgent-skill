# Design Spec

## Canvas
- Aspect ratio: 16:9
- SVG canvas: 1600 x 900
- Use fixed-layout slide thinking, not responsive web thinking

## Style Decision
- Selected direction: Option C / Narrative Compiler
- Tone: engineering keynote
- Goal: strong thesis first, then structured support

## Visual System
- Background: deep navy `#08111F` to slate blue `#0E233A`
- Primary text: white `#FFFFFF`
- Secondary text: cool gray `#B8C7D9`
- Accent: amber-orange `#F59E0B`, `#F8B84E`, `#FFD166`
- Card fill: dark blue `#11253B`
- Card stroke: muted line `#1F3A56`

## Typography
- Font family: `Aptos`, `PingFang SC`, `Microsoft YaHei`, sans-serif
- Hero title: 56-72 px
- Section title: 26-32 px
- Card title: 20-24 px
- Body: 16-20 px
- Footer: 12-14 px

## Layout Rules
- Each slide must have one dominant thesis area
- At most 1 hero block + 2 secondary emphasis zones
- Use cards, rails, and grouped modules instead of noisy backgrounds
- Background decoration must stay weaker than content
- Prefer left-heavy composition for thesis slides, centered rails for process slides

## Text Budgets
- Slide title: <= 22 Chinese characters if possible
- Subtitle: <= 34 Chinese characters or equivalent info
- Hero block: 2-3 lines, 12-18 Chinese characters each
- Card title: 8-14 Chinese characters
- Card body: 2 lines preferred, 14-22 Chinese characters each
- Footer source line: 1 compact line

## Allowed Decoration
- One accent underline or accent rail per page
- Subtle panel borders
- Sparse process arrows

## Forbidden Noise
- No oversized background words
- No dense grids behind body content
- No multiple glowing zones competing for attention
- No more than one bright accent block per slide unless clearly justified

## Page Family Guidance
- Title/thesis pages: large left thesis + right support cards
- Method pages: process rail + 3-5 stage modules
- Comparison or role pages: 3-column responsibility layout
- Metrics pages: indicator cards + small loop diagram
