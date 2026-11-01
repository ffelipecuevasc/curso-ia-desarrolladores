/**
 * reveal.js · Aparición suave de elementos [data-reveal] al hacer scroll.
 * Solo oculta contenido si este script corre (clase .js-reveal en <html>),
 * así que sin JavaScript todo se ve. Con movimiento reducido, no anima.
 */
export function initReveal(root = document) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((element) => observer.observe(element));
}
