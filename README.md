# PPT Agent

Create full presentation decks with a single-model workflow that first produces each slide as SVG, reviews rendered previews, and only then finalizes the deck as a coherent but non-repetitive presentation.

## What It Does

- builds full PPT decks from a topic, outline, webpage, PDF, report, or source notes
- generates 3 distinct style concepts before full production, so the user can choose a direction first
- uses a local SVG template library as structural reference instead of starting from a blank canvas every time
- assigns different page families across the deck, such as:
  - cover
  - core conclusion
  - risks
  - comparison
  - process
  - system diagram
  - dashboard
  - matrix
  - summary
- renders PNG previews after SVG generation to catch overlaps, overflow, visual imbalance, and repetitive page structure
- produces a final `.pptx` that is closer to a real presentation workflow than a one-shot graphic export

## Showcase

### Cover

![Cover Example](../../dsl_agent_talk_ppt_v2/previews/slide_01.png)

### Core Conclusion

![Core Conclusion Example](../../dsl_agent_talk_ppt_v2/previews/slide_02.png)

### Risks

![Risks Example](../../dsl_agent_talk_ppt_v2/previews/slide_03.png)

### System Diagram

![System Diagram Example](../../dsl_agent_talk_ppt_v2/previews/slide_07.png)

### Dashboard

![Dashboard Example](../../dsl_agent_talk_ppt_v2/previews/slide_08.png)

### Matrix

![Matrix Example](../../dsl_agent_talk_ppt_v2/previews/slide_09.png)

## Core Features

### 1. Template-first, but not template-locked

- ships with an original SVG template library
- templates provide structure, rhythm, and module grammar
- colors are re-designed for the current topic
- the system does not blindly inherit template colors or copy

### 2. Consistent deck, varied pages

- the whole deck can share one visual mood, palette, and type system
- individual slides must still vary in card grammar, density, graphic direction, and emphasis style
- this avoids the “same dark rounded card repeated 10 times” problem

### 3. Built for real PPT delivery, not just pretty screenshots

The workflow is:

- refine screen-ready copy
- generate SVG
- render PNG previews
- review visually
- refine the full deck horizontally

### 4. Strong fit for structured content

This skill is especially strong for:

- technical methodology decks
- product strategy presentations
- security analysis and vulnerability explanations
- architecture talks
- workflows, mechanisms, boundaries, loops, and metric-heavy topics

## Workflow

### Step 1. Define the topic and context

Start by defining:

- topic
- audience
- use case
- slide count
- language
- tone and style boundaries

Artifacts:

- `brief.md`
- `style_draft.md`

### Step 2. Create a style draft and 3 concept pages

- pick structural directions from the template library
- generate 3 clearly different concepts using the same representative content
- let the user choose a direction before full production

Artifacts:

- `template_choice.md`
- `concepts/option_a.svg`
- `concepts/option_b.svg`
- `concepts/option_c.svg`
- `concepts/option_a.png`
- `concepts/option_b.png`
- `concepts/option_c.png`
- `style_decision.md`

### Step 3. Assign page families before bulk generation

Before drawing the full deck, define:

- each slide's rhetorical role
- each slide's page family
- information density
- template reference

Artifacts:

- `outline.md`
- `page_family_plan.md`
- `screen_copy.md`
- `design_spec.md`

### Step 4. Generate SVG slide by slide and review visually

Each slide goes through:

1. screen-copy compression
2. SVG construction
3. PNG preview rendering
4. visual review
5. revision before moving to the next slide

Artifacts:

- `slides/slide_01.svg`
- `slides/slide_02.svg`
- ...
- `previews/slide_01.png`
- `previews/slide_02.png`
- ...

### Step 5. Refine the full deck and export PPT

- check whether too many slides look structurally similar
- fix overlap, overflow, and edge collisions
- remove decoration that does not support the argument
- export the final `.pptx`

## Output Structure

- `templates/`
  - original SVG template library
- `scripts/init_ppt_workspace.py`
  - workspace initializer
- `scripts/render_svg_preview.sh`
  - SVG-to-PNG preview renderer
- `templates/TEMPLATE_LIBRARY.md`
  - template descriptions
- `templates/TEMPLATE_INDEX.html`
  - visual template index

Typical generated workspace:

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

## Best Use Cases

You can use this skill to:

- turn a topic into a fully planned and generated deck
- turn a Markdown outline into a complete presentation
- convert a report, webpage, or PDF into presentation-ready slides
- provide reference screenshots and let the system absorb structural ideas while redesigning the actual output

## Design Rules

- templates inherit structure, not color
- if text does not fit, rewrite the copy before shrinking the type
- decoration must support meaning, not just make the page busier
- deck consistency does not mean every slide should look the same
- three consecutive slides using the same structural grammar should be treated as a failure signal
- every page must pass preview review before it is considered done

## Template Browser

Template preview index:

- [`templates/TEMPLATE_INDEX.html`](./templates/TEMPLATE_INDEX.html)

Template descriptions:

- [`templates/TEMPLATE_LIBRARY.md`](./templates/TEMPLATE_LIBRARY.md)

## Quick Start

1. initialize a workspace
2. write `brief.md`
3. write `style_draft.md`
4. select templates and generate 3 concept pages
5. confirm the style direction
6. write `outline.md`, `page_family_plan.md`, `screen_copy.md`, and `design_spec.md`
7. generate SVG and PNG preview files slide by slide
8. refine the deck horizontally
9. export `.pptx`

## Summary

The point of `ppt-agent` is not just “automatic layout”.

Its value is turning PPT creation into a reviewable, convergent, reusable production workflow for decks that need both structural clarity and real delivery quality.
# SVGtoPPT-Agent
