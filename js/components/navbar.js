/**
 * navbar.js · Barra de navegación fija.
 * Izquierda: logotipo. Centro (desktop): anclas. Derecha: descarga del
 * programa, tema y menú hamburguesa (móvil).
 */
import { COURSE, NAV_LINKS } from '../data/course.js';
import { programButton, programMenuItem } from './program-button.js';
import { icon } from '../utils/icons.js';
import { escapeHtml, qs, qsa } from '../utils/dom.js';
import { initThemeToggle, themeToggleMarkup } from './theme-toggle.js';

const linkList = (className) =>
  NAV_LINKS.map(
    (link) =>
      `<li><a class="${className}" href="${link.href}" data-nav-link>${escapeHtml(link.label)}</a></li>`,
  ).join('');

export function renderNavbar(header) {
  header.innerHTML = `
    <div class="container-page site-header__bar">
      <a class="brand" href="#inicio" aria-label="${escapeHtml(COURSE.brand)}, ir al inicio">
        ${icon('logo', { className: 'size-8' })}
        <span>${escapeHtml(COURSE.brand)}</span>
      </a>

      <nav class="hidden lg:block mx-auto" aria-label="Principal">
        <ul class="flex items-center gap-8 list-none m-0 p-0">${linkList('nav-link')}</ul>
      </nav>

      <div class="ml-auto lg:ml-0 flex items-center gap-2">
        ${programButton({ className: 'hidden sm:inline-flex' })}
        ${themeToggleMarkup()}
        <button type="button" class="btn btn--ghost btn--icon lg:hidden" data-menu-toggle
          aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú">
          ${icon('menu', { className: 'size-6' })}
        </button>
      </div>
    </div>

    <div class="mobile-menu lg:hidden" id="mobile-menu" hidden>
      <nav class="container-page py-2" aria-label="Principal (móvil)">
        <ul class="list-none m-0 p-0">
          ${NAV_LINKS.map((link) => `<li><a href="${link.href}" data-nav-link>${escapeHtml(link.label)}</a></li>`).join('')}
          <li>${programMenuItem()}</li>
        </ul>
      </nav>
    </div>`;

  initThemeToggle(header);
  initMobileMenu(header);
  initScrollState(header);
  initScrollSpy(header);
}

function initMobileMenu(header) {
  const toggle = qs('[data-menu-toggle]', header);
  const menu = qs('#mobile-menu', header);

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.innerHTML = icon(open ? 'close' : 'menu', { className: 'size-6' });
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function initScrollState(header) {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Marca con aria-current el enlace de la sección visible. */
function initScrollSpy(header) {
  if (!('IntersectionObserver' in window)) return;
  const links = qsa('[data-nav-link]', header);
  const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const hash = `#${entry.target.id}`;
        links.forEach((link) => {
          if (link.getAttribute('href') === hash) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
}
