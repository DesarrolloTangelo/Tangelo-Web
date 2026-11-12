/* Tangelo: microinteracciones progresivas, sin librerías externas. */
(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-animations');
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
