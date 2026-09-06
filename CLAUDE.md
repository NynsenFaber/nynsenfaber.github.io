# nynsenfaber.github.io

Personal site of Fabrizio Boninsegna. Jekyll, built natively by GitHub Pages —
push to `master` and it deploys. No CI, no node_modules. `github-pages` gem
pins the Jekyll version (see `Gemfile`); don't add plugins outside the
`jekyll_plugins` group, GitHub Pages won't run them.

## Workflow

```sh
bundle install                    # once, or after Gemfile changes
bundle exec jekyll serve          # http://127.0.0.1:4000, live-reloads on save
bundle exec jekyll build          # build only, into _site/ (gitignored)
```

Before pushing any change, run `bundle exec jekyll build` and confirm it
exits clean — there's no CI to catch a broken build, `master` is live.

## Where things live

| I want to…                          | Edit                                 |
| ------------------------------------ | ------------------------------------- |
| Add or reorder a publication         | `_data/publications.yml`              |
| Change the home hero / bio / links   | `_config.yml` → `profile:` and `links:` |
| Edit home page prose                 | `index.markdown`                      |
| Write a blog post                    | `_posts/YYYY-MM-DD-slug.md`           |
| Change colours, spacing, type        | `_sass/_tokens.scss`                  |
| Change page structure                | `_layouts/`, `_includes/`             |

No theme gem — everything is in `_layouts`, `_includes`, `_sass`.

### Publications

`_data/publications.yml` is the only place publications are listed — the
research page and the home page both read from it. Fields:

- **Order is the order in the file** — newest first, nothing sorted at build
  time.
- `type:` groups the entry: `conference`, `journal`, `workshop`, `project`,
  `thesis`.
- `featured: true` gives a rust highlight and puts it in *Selected work* on
  the home page and *Selected* at the top of the research page. It still
  appears once, plainly, in its normal group below.
- `award: Spotlight` adds the filled badge.
- `note:` is the one-line "why this matters", shown on featured cards only.
- `links:` render as labelled buttons. `icon:` is one of `paper`, `code`,
  `video`, `slides` (publications), or `document` (used for CV-style links).

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

`layout: post` is applied automatically via `_config.yml` defaults — don't
set it by hand.

### Maths

Write LaTeX with `$$...$$`. kramdown decides inline vs display from context
(own line = display) and emits `\(...\)` / `\[...\]`, which
[KaTeX](https://katex.org) renders client-side. `assets/js/main.js` fetches
KaTeX from a CDN only on pages that actually contain maths, so the rest of
the site loads nothing extra — never add a MathJax script tag to a post, it's
handled globally there.

### Theme

Light and dark are both first-class. The site follows the visitor's OS
setting until they hit the header toggle, after which the choice is saved to
`localStorage` and wins. Colours are CSS custom properties defined once in
`_sass/_tokens.scss` — change them there and both themes follow.

### Accessibility and layout

- Every outbound link is a labelled button — icons support the label, never
  replace it.
- Wide tables get a focusable scroll container from `main.js`, so they scroll
  inside themselves instead of widening the page.
- All animation is disabled under `prefers-reduced-motion: reduce`.
- Verified for horizontal overflow down to a 320 px viewport.
