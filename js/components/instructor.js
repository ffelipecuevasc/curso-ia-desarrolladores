/**
 * instructor.js · Sección del instructor.
 * Retrato a la izquierda; a la derecha, en bloques con aire propio:
 * nombre y rol → cifras → credenciales → formación y trayectoria → enlaces.
 */
import { INSTRUCTOR } from '../data/instructor.js';
import { escapeHtml } from '../utils/dom.js';
import { claudeLogo, icon } from '../utils/icons.js';

const portraitMarkup = () => {
  const initials = `<span class="portrait__initials" aria-hidden="true">${escapeHtml(INSTRUCTOR.initials)}</span>`;
  if (!INSTRUCTOR.photoAvailable) {
    return `<figure class="portrait portrait--initials" role="img" aria-label="${escapeHtml(INSTRUCTOR.name)}">${initials}</figure>`;
  }
  // Si la imagen falla, se muestran las iniciales en su lugar.
  return `
    <figure class="portrait">
      <img src="${encodeURI(INSTRUCTOR.photo)}" alt="Retrato de ${escapeHtml(INSTRUCTOR.name)}" width="720" height="900" loading="lazy" decoding="async"
        onerror="this.closest('.portrait').classList.add('portrait--initials'); this.replaceWith(Object.assign(document.createElement('span'), { className: 'portrait__initials', textContent: '${escapeHtml(INSTRUCTOR.initials)}' }))" />
    </figure>`;
};

export function renderInstructor(section) {
  section.innerHTML = `
    <div class="container-page">
      <div class="instructor">
        <div class="instructor__media">${portraitMarkup()}</div>

        <div class="instructor__body">
          <header class="instructor__head">
            <p class="kicker kicker--rule">Instructor</p>
            <h2 class="instructor__name" id="instructor-title">${escapeHtml(INSTRUCTOR.name)}</h2>
            <p class="instructor__fullname">${escapeHtml(INSTRUCTOR.fullName)}</p>
            <p class="instructor__role">${escapeHtml(INSTRUCTOR.role)}</p>
          </header>

          <dl class="instructor__metrics">
            ${INSTRUCTOR.metrics
              .map(
                (metric) => `
                  <div class="metric">
                    <dt class="metric__label">${escapeHtml(metric.label)}</dt>
                    <dd class="metric__value">${escapeHtml(metric.value)}</dd>
                  </div>`,
              )
              .join('')}
          </dl>

          <section class="instructor__block" aria-labelledby="instructor-cred">
            <h3 class="instructor__label" id="instructor-cred">Credenciales</h3>
            <ul class="instructor__pills">
              ${INSTRUCTOR.credentials
                .map(
                  (cred) =>
                    `<li class="pill${cred.featured ? ' credential--featured' : ''}">${cred.featured ? claudeLogo({ decorative: true, className: '' }) : ''}${escapeHtml(cred.label)}</li>`,
                )
                .join('')}
            </ul>
          </section>

          <dl class="instructor__facts">
            <div>
              <dt class="instructor__label">Formación</dt>
              <dd>${escapeHtml(INSTRUCTOR.education)}</dd>
            </div>
            <div>
              <dt class="instructor__label">Trayectoria docente</dt>
              <dd>${INSTRUCTOR.career.map(escapeHtml).join(' · ')}</dd>
            </div>
            <div>
              <dt class="instructor__label">Comunidad</dt>
              <dd>${escapeHtml(INSTRUCTOR.community)}</dd>
            </div>
          </dl>

          <div class="instructor__links">
            ${INSTRUCTOR.links
              .map(
                (link) => `
                  <a class="btn btn--ghost normal-case tracking-normal text-sm" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
                    ${icon(link.kind === 'web' ? 'language' : 'link')}${escapeHtml(link.label)}
                    <span class="visually-hidden">(se abre en una pestaña nueva)</span>
                  </a>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>`;
}
