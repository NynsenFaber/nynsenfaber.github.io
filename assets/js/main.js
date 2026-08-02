/* -------------------------------------------------------------------------
 * Site behaviour: theme toggle, table overflow guards, maths rendering.
 * No dependencies, no build step.
 * ---------------------------------------------------------------------- */
(function () {
  'use strict';

  var root = document.documentElement;

  /* --- Theme toggle ----------------------------------------------------
   * No stored value means "follow the OS". The first click stores an
   * explicit choice, which then wins over prefers-color-scheme in CSS.
   */
  function effectiveTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* --- Wide tables ------------------------------------------------------
   * Markdown tables get their own scroll container so a wide results table
   * never widens the page on a phone.
   */
  document.querySelectorAll('.prose table').forEach(function (table) {
    if (table.parentNode.classList.contains('table-scroll')) return;
    var box = document.createElement('div');
    box.className = 'table-scroll';
    box.setAttribute('tabindex', '0');
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Table, scrollable');
    table.parentNode.insertBefore(box, table);
    box.appendChild(table);
  });

  /* --- Maths ------------------------------------------------------------
   * kramdown emits \( ... \) and \[ ... \]. KaTeX is fetched only on pages
   * that actually contain maths, so the rest of the site pays nothing.
   */
  var KATEX_VERSION = '0.16.11';
  var CDN = 'https://cdn.jsdelivr.net/npm/katex@' + KATEX_VERSION + '/dist/';

  function hasMath() {
    var text = document.body.textContent || '';
    return text.indexOf('\\(') !== -1 || text.indexOf('\\[') !== -1;
  }

  function load(tag, attrs) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement(tag);
      Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
      el.onload = resolve;
      el.onerror = reject;
      document.head.appendChild(el);
    });
  }

  if (hasMath()) {
    load('link', {
      rel: 'stylesheet',
      href: CDN + 'katex.min.css',
      integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
      crossorigin: 'anonymous'
    });

    load('script', {
      src: CDN + 'katex.min.js',
      integrity: 'sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg',
      crossorigin: 'anonymous'
    })
      .then(function () {
        return load('script', {
          src: CDN + 'contrib/auto-render.min.js',
          integrity: 'sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk',
          crossorigin: 'anonymous'
        });
      })
      .then(function () {
        document.querySelectorAll('.prose, .hero__bio').forEach(function (el) {
          window.renderMathInElement(el, {
            delimiters: [
              { left: '\\[', right: '\\]', display: true },
              { left: '\\(', right: '\\)', display: false }
            ],
            ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'],
            throwOnError: false
          });
        });
      })
      .catch(function () { /* No maths rendering is better than a broken page. */ });
  }
})();
