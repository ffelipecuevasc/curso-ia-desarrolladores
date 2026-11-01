/**
 * footer.js · Pie del sitio (4 columnas) a partir de data/course.js,
 * data/instructor.js y data/links.js.
 */
import { COURSE } from '../data/course.js';
import { programButton } from './program-button.js';
import { INSTRUCTOR } from '../data/instructor.js';
import { FOOTER_LINKS } from '../data/links.js';
import { escapeHtml } from '../utils/dom.js';
import { icon } from '../utils/icons.js';

const externalLink = ({ titulo, url }) => `
  <li>
    <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
      ${escapeHtml(titulo)}${icon('external')}<span class="visually-hidden">(se abre en una pestaña nueva)</span>
    </a>
  </li>`;

export function renderFooter(footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container-page">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.3fr_1fr]">
        <div class="flex flex-col gap-3">
          <a class="brand" href="#inicio">${icon('logo', { className: 'size-8' })}<span>${escapeHtml(COURSE.brand)}</span></a>
          <p class="text-text-muted max-w-[42ch]">${escapeHtml(COURSE.footerSummary)}</p>
          <p class="text-sm text-text-soft">${escapeHtml(COURSE.organization)}</p>
        </div>

        <nav aria-labelledby="footer-instructor">
          <h2 class="footer-title" id="footer-instructor">Instructor</h2>
          <p class="text-heading font-semibold mb-1">${escapeHtml(INSTRUCTOR.name)}</p>
          <ul class="footer-links">
            ${INSTRUCTOR.links.map((link) => externalLink({ titulo: link.label, url: link.url })).join('')}
          </ul>
        </nav>

        <nav aria-labelledby="footer-links">
          <h2 class="footer-title" id="footer-links">Enlaces de interés</h2>
          <ul class="footer-links">${externalLink(FOOTER_LINKS.academy)}</ul>
          <p class="footer-sub">Cursos recomendados</p>
          <ul class="footer-links">${FOOTER_LINKS.recommendedCourses.map(externalLink).join('')}</ul>
          <p class="footer-sub">Documentación y estándares abiertos</p>
          <ul class="footer-links">
            ${externalLink({ titulo: 'Documentación oficial de Claude Code', url: FOOTER_LINKS.docs.url })}
            ${FOOTER_LINKS.standards.map(externalLink).join('')}
          </ul>
        </nav>

        <div class="flex flex-col items-start gap-3">
          <h2 class="footer-title">Programa</h2>
          ${programButton({ variant: 'primary', className: 'whitespace-nowrap' })}
          <a class="btn btn--ghost" href="#inicio">${icon('arrowUp')}Volver arriba</a>
        </div>
      </div>

      <div class="footer-bottom flex flex-col gap-2 md:flex-row md:justify-between">
        <p>© ${year} ${escapeHtml(INSTRUCTOR.name)} · ${escapeHtml(COURSE.title)} — ${escapeHtml(COURSE.subtitle)}.</p>
        <p>Claude y Claude Code son marcas de Anthropic. Íconos: Material Symbols (Apache 2.0).</p>
      </div>
    </div>`;
}
