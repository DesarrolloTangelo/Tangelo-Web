/* Tangelo: microinteracciones progresivas, sin librerías externas. */
(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-animations');
    document.documentElement.classList.add('tg-redesign-live');
    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08, rootMargin: '0px 0px -25px 0px'});
    items.forEach(item => observer.observe(item));
  }
  // The illustrative motion graphic does not auto-play for users asking for reduced motion.
  if (reduce) {
    document.querySelectorAll('.tg-case-player video').forEach(v => { v.pause(); v.removeAttribute('autoplay'); v.setAttribute('controls',''); });
  }
})();

/* Interactive opportunity radar: accessible, no external libraries. */
(() => {
  const tabs = Array.from(document.querySelectorAll('[data-tg-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-tg-panel]'));
  if (!tabs.length || !panels.length) return;
  const activate = (key, shouldFocus = false) => {
    tabs.forEach(tab => {
      const current = tab.dataset.tgTab === key;
      tab.setAttribute('aria-selected', String(current));
      tab.tabIndex = current ? 0 : -1;
      if (current && shouldFocus) tab.focus();
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.tgPanel !== key; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.tgTab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(tabs[next].dataset.tgTab, true);
    });
  });
})();
