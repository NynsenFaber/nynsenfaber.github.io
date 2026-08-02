# nynsenfaber.github.io

Personal site of Fabrizio Boninsegna. Jekyll, built natively by GitHub Pages —
push to `master` and it deploys. No build step, no CI, no node_modules.

## Run it locally

```sh
bundle install          # once
bundle exec jekyll serve # http://127.0.0.1:4000, live-reloads on save
```

## Where things live

| I want to…                        | Edit                                             |
| --------------------------------- | ------------------------------------------------ |
| Add or reorder a publication      | `_data/publications.yml`                          |
| Change the home hero / bio / links| `_config.yml` → `profile:` and `links:`           |
| Edit home page prose              | `index.markdown`                                  |
| Write a blog post                 | `_posts/YYYY-MM-DD-slug.md`                       |
| Change colours, spacing, type     | `_sass/_tokens.scss`                              |
| Change page structure             | `_layouts/`, `_includes/`                         |

There is no theme gem. Everything is in `_layouts`, `_includes` and `_sass`.

### Publications

`_data/publications.yml` is the only place publications are listed — the
research page and the home page both read from it.

- **Order is the order in the file**, newest first. Nothing is sorted at build
  time, so what you see in the file is what renders.
- `type:` puts an entry in a group: `conference`, `journal`, `workshop`,
  `project`, `thesis`.
- `featured: true` gives a paper the rust highlight and puts it in *Selected
  work* on the home page and *Selected* at the top of the research page. It
  still appears once, plainly, in its normal group below.
- `award: Spotlight` adds the filled badge.
- `note:` is the one-line "why this matters", shown on featured cards only.
- `links:` are rendered as labelled buttons. `icon:` is one of `paper`, `code`,
  `video`, `slides`, `document`.

### Blog posts

Front matter:

```yaml
---
title: "Post title"
date: 2026-07-25
tags: [differential-privacy, rust]
summary: "One or two sentences. Shown on the blog index and under the title."
---
```

`layout: post` is applied automatically.

### Maths

Write LaTeX with `$$...$$`. kramdown decides inline vs display from context (on
its own line = display), and [KaTeX](https://katex.org) renders it in the
browser. KaTeX is fetched from a CDN **only on pages that actually contain
maths**, so the rest of the site loads nothing extra. Do not add MathJax script
tags to posts — it is handled globally in `assets/js/main.js`.

### Theme

Light and dark are both first-class. The site follows the visitor's OS setting
until they press the toggle in the header, after which their choice is stored in
`localStorage` and wins. Colours are CSS custom properties defined once in
`_sass/_tokens.scss` — change them there and both themes follow.

### Accessibility and layout notes

- Every outbound link is a labelled button. Icons support the label, they never
  replace it.
- Wide tables are wrapped in a focusable scroll container by `main.js`, so they
  scroll inside themselves instead of widening the page.
- All animation is disabled under `prefers-reduced-motion: reduce`.
- Verified for horizontal overflow down to a 320 px viewport.
