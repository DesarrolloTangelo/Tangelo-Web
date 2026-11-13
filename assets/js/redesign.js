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


/* V6: interactive equipment gallery, exact filenames for the 15 additional photographs. */
(() => {
  const spotlights = Array.from(document.querySelectorAll('[data-tg-spotlight]'));
  spotlights.forEach(spotlight => {
    const service = spotlight.getAttribute('data-tg-spotlight');
    const buttons = Array.from(document.querySelectorAll(`[data-tg-asset="${service}"]`));
    const heading = spotlight.querySelector('[data-tg-asset-title]');
    const detail = spotlight.querySelector('[data-tg-asset-detail]');
    const count = spotlight.querySelector('[data-tg-asset-count]');
    const image = spotlight.querySelector('img[data-tg-asset-image]');
    if (!buttons.length) return;
    // Original photos stay visible until the user installs their corresponding new photos.
    const originalImage = buttons[0].getAttribute('data-tg-asset-image') || (image ? image.getAttribute('src') : '');
    const originalAlt = buttons[0].getAttribute('data-tg-asset-image-alt') || '';
    let activeRequest = 0;
    function activate(button) {
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      if (heading) heading.textContent = button.getAttribute('data-tg-asset-title') || '';
      if (detail) detail.textContent = button.getAttribute('data-tg-asset-detail') || '';
      if (count) count.textContent = String(button.getAttribute('data-tg-asset-index') || '1').padStart(2,'0') + ' / ' + String(buttons.length).padStart(2,'0');
      if (!image) return;
      const nextSrc = button.getAttribute('data-tg-asset-image') || originalImage;
      const nextAlt = button.getAttribute('data-tg-asset-image-alt') || originalAlt;
      const request = ++activeRequest;
      if (nextSrc === image.getAttribute('src')) { image.alt = nextAlt; return; }
      image.classList.add('tg-asset-image-loading');
      const preloader = new Image();
      preloader.onload = () => {
        if (request !== activeRequest) return;
        image.src = nextSrc;
        image.alt = nextAlt;
        image.classList.remove('tg-asset-image-loading');
      };
      preloader.onerror = () => {
        if (request !== activeRequest) return;
        image.src = originalImage;
        image.alt = originalAlt;
        image.classList.remove('tg-asset-image-loading');
      };
      preloader.src = nextSrc;
    }
    buttons.forEach(button => button.addEventListener('click', () => activate(button)));
    activate(buttons.find(b => b.getAttribute('aria-pressed')==='true') || buttons[0]);
  });
})();
