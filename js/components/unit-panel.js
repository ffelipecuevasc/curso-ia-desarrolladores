/**
 * unit-panel.js · Contenido desplegable de una unidad: 4 pestañas
 * (Resumen, Conceptos, Taller = panel corto + guía PDF, Recursos = material + videos).
 * Lo que ya está en la guía del taller, las láminas o el programa no se repite aquí.
 * Todo se genera desde js/data/units/uXX.js: para agregar un concepto,
 * un material o un video, basta con editar ese archivo.
 */
import { unitCode } from '../data/units/index.js';
import { attr, escapeHtml, qsa, rich } from '../utils/dom.js';
import { icon, iconImage } from '../utils/icons.js';
import { isPreview } from '../utils/schedule.js';

/** id de la tarjeta de material que es la guía del taller (se descarga desde Taller). */
export const GUIDE_ID = 'guia';

/** Valor de `variante` (campo opcional de un material) que lo muestra como tarjeta destacada. */
export const PRESENTATION_VARIANT = 'presentacion';

/** Rótulos de interfaz de la tarjeta destacada. El título, la descripción y el peso salen de los datos. */
const PRESENTATION_LABELS = {
  kind: 'Presentación de clases',
  unavailable: 'Disponible después de la clase',
};

/** Valor de `destino` (campo opcional de un material) que lo lleva a la pestaña Taller. */
export const WORKSHOP_DEST = 'taller';

export const TABS = [
  { key: 'resumen', label: 'Resumen', icon: 'article' },
  { key: 'conceptos', label: 'Conceptos', icon: 'lightbulb' },
  { key: 'taller', label: 'Taller', icon: 'science' },
  { key: 'recursos', label: 'Recursos', icon: 'folder' },
];

const list = (items, className = 'prose-list') =>
  items?.length ? `<ul class="${className}">${items.map((item) => `<li>${rich(item)}</li>`).join('')}</ul>` : '';

const block = (title, content) =>
  content ? `<section class="content-block"><h5 class="content-title">${escapeHtml(title)}</h5>${content}</section>` : '';

/* ---------------------------------------------------------------- Resumen */
const externalLink = ({ titulo, url }) =>
  `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(titulo)}${icon('external')}<span class="visually-hidden"> (se abre en una pestaña nueva)</span></a>`;

function summaryTab(unit) {
  // Antes de la clase: texto y enlace. El bloque de código queda en los datos (y en la guía).
  const requirements = (unit.requisitos ?? [])
    .map(
      (req) => `
        <div class="callout">${icon('info')}
          <div class="flex flex-col gap-2 min-w-0">
            <p><strong>${escapeHtml(req.titulo)}.</strong> ${rich(req.texto)}</p>
            ${req.enlace ? `<p>${externalLink(req.enlace)}</p>` : ''}
          </div>
        </div>`,
    )
    .join('');

  // Avisos internos: solo en la vista previa del instructor.
  const pending = isPreview
    ? (unit.pendientes ?? [])
        .map(
          (item) => `
            <div class="callout callout--pending">${icon('warning')}
              <p><strong>Pendiente · ${escapeHtml(item.titulo)}.</strong> ${rich(item.texto)}</p>
            </div>`,
        )
        .join('')
    : '';

  return `
    <p class="lead-text">${rich(unit.foco)}</p>
    <p class="level-line tabular">${icon('flag')}<span>Nivel <strong>${escapeHtml(unit.nivel)}</strong> de 100</span></p>
    ${pending ? `<section class="content-block flex flex-col gap-3">${pending}</section>` : ''}
    ${block('Objetivos', list(unit.objetivos, 'prose-list prose-list--check'))}
    ${block('Herramientas', `<ul class="flex flex-wrap gap-2 list-none m-0 p-0">${unit.herramientas.map((tool) => `<li class="tag">${rich(tool)}</li>`).join('')}</ul>`)}
    ${requirements ? `<section class="content-block flex flex-col gap-3"><h5 class="content-title">Antes de la clase</h5>${requirements}</section>` : ''}`;
}

/* -------------------------------------------------------------- Conceptos */
function conceptsTab(unit) {
  const chip = (concept, kind, index) => `
    <li>
      <button type="button" class="chip chip--${kind}" data-concept="${unit.id}/${concept.slug}"
        aria-haspopup="dialog">
        ${kind === 'core' ? `<span class="chip__code">C${index + 1}</span>` : icon('flag')}
        <span>${escapeHtml(concept.titulo)}</span>
      </button>
    </li>`;

  return `
    <section class="concept-group">
      <div class="concept-group__head">
        <h5 class="concept-group__title">Conceptos obligatorios</h5>
        <p class="concept-group__hint">Lo que debes dominar para el laboratorio y el entregable.</p>
      </div>
      <ul class="chips">${unit.conceptos.obligatorios.map((c, i) => chip(c, 'required', i)).join('')}</ul>
    </section>
    <section class="concept-group">
      <div class="concept-group__head">
        <h5 class="concept-group__title">Conceptos fundamentales</h5>
        <p class="concept-group__hint">La base teórica de la unidad (C1 a C4 de la clase).</p>
      </div>
      <ul class="chips">${unit.conceptos.fundamentales.map((c, i) => chip(c, 'core', i)).join('')}</ul>
    </section>
    <p class="mt-6 text-sm text-text-soft">Toca un concepto para ver su explicación, un ejemplo y la fuente oficial.</p>`;
}

/* ------------------------------------------------------------ Laboratorio */
/** Botón grande de la guía; deshabilitado (nunca un enlace roto) si no está disponible. */
function guideButton(unit) {
  const guide = unit.material?.find((item) => item.id === GUIDE_ID);
  if (guide?.disponible) {
    return `<a class="btn btn--primary btn--lg" href="${encodeURI(guide.archivo)}" download>
      ${icon('download')}<span>Descargar la guía <span class="btn__hint">(PDF)</span></span></a>`;
  }
  return `<button type="button" class="btn btn--disabled btn--lg" disabled>${icon('hourglass')}<span>Guía disponible pronto</span></button>`;
}

function labTab(unit) {
  const lab = unit.laboratorio;
  // Pasos, errores frecuentes y plan B siguen en los datos, pero viven en la guía PDF.
  const workshopItems = (unit.material ?? []).filter((item) => item.id !== GUIDE_ID && isWorkshopMaterial(item));
  const workshopMaterial = workshopItems.length
    ? `<section class="content-block"><h5 class="content-title">Material del taller</h5><ul class="resource-grid">${workshopItems.map(materialCard).join('')}</ul></section>`
    : '';
  return `
    <div class="lab-panel">
      <h5 class="lab-panel__title">${escapeHtml(lab.nombre)}</h5>
      <ul class="lab-facts" aria-label="Datos del taller">
        ${lab.modalidad ? `<li>${icon('groups')}<span>${escapeHtml(lab.modalidad)}</span></li>` : ''}
        <li class="tabular">${icon('schedule')}<span>${lab.duracion} min</span></li>
        <li class="lab-facts__deliverable">${icon('assignment')}<span>Entregable: <strong>${escapeHtml(unit.entregable.nombre)}</strong></span></li>
      </ul>
      <p class="lab-panel__summary">${rich(lab.resumen || lab.objetivo)}</p>
      ${guideButton(unit)}
    </div>${workshopMaterial}`;
}

/* --------------------------------------------------------------- Material */
const MATERIAL_ICONS = { pdf: 'pdf', png: 'image', jpg: 'image', webp: 'image', enlace: 'link' };

/**
 * Tarjeta destacada de la presentación de clases (variante 'presentacion'): ocupa todo el ancho
 * de la grilla. Sin archivo disponible queda atenuada y sin enlace (nunca un enlace roto).
 * El ícono de PDF conserva su color oficial (excepción de color; ver ICON_FILES en icons.js).
 */
function presentationCard(item) {
  const available = Boolean(item.disponible && item.archivo);
  const pills = [
    `<span class="material-pill">${escapeHtml(PRESENTATION_LABELS.kind)}</span>`,
    available && item.peso ? `<span class="material-pill material-pill--file tabular">PDF · ${escapeHtml(item.peso)}</span>` : '',
  ].join('');
  const action = available
    ? `<a class="btn btn--primary presentation-card__action" href="${encodeURI(item.archivo)}" download>${icon('download')}<span>Descargar<span class="visually-hidden"> ${escapeHtml(item.titulo)} (PDF)</span></span></a>`
    : `<p class="presentation-card__soon">${icon('hourglass')}<span>${escapeHtml(PRESENTATION_LABELS.unavailable)}</span></p>`;
  return `
        <li class="resource-grid__feature">
          <article class="resource-card resource-card--presentacion${available ? '' : ' resource-card--soon'}">
            ${iconImage('pdf-presentacion', { className: 'presentation-card__icon' })}
            <div class="presentation-card__body">
              <p class="resource-card__title presentation-card__title">${escapeHtml(item.titulo)}</p>
              ${item.descripcion ? `<p class="presentation-card__text">${rich(item.descripcion)}</p>` : ''}
              <p class="presentation-card__pills">${pills}</p>
            </div>
            ${action}
          </article>
        </li>`;
}

/** Tarjeta de un material (no disponible, enlace externo o archivo descargable). */
function materialCard(item) {
  if (item.variante === PRESENTATION_VARIANT) return presentationCard(item);
  const type = item.tipo.toUpperCase();
  const iconName = MATERIAL_ICONS[item.tipo] ?? 'file';
  if (!item.disponible) {
    return `
          <li>
            <div class="resource-card resource-card--soon">
              <span class="resource-card__icon">${icon(iconName)}</span>
              <div>
                <p class="resource-card__title">${escapeHtml(item.titulo)}</p>
                <p class="resource-card__meta">${icon('hourglass')}<span>${type} · Disponible pronto</span></p>
              </div>
            </div>
          </li>`;
  }
  if (item.tipo === 'enlace') {
    return `
        <li>
          <a class="resource-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
            <span class="resource-card__icon">${icon(iconName)}</span>
            <span>
              <span class="resource-card__title block">${escapeHtml(item.titulo)}</span>
              ${item.descripcion ? `<span class="block mt-1 text-sm text-text-muted">${rich(item.descripcion)}</span>` : ''}
              <span class="resource-card__meta">Enlace · <span class="resource-card__action inline-flex items-center gap-1">${icon('external')}Abrir<span class="visually-hidden"> (se abre en una pestaña nueva)</span></span></span>
            </span>
          </a>
        </li>`;
  }
  return `
        <li>
          <a class="resource-card" href="${encodeURI(item.archivo)}" download>
            <span class="resource-card__icon">${icon(iconName)}</span>
            <span>
              <span class="resource-card__title block">${escapeHtml(item.titulo)}</span>
              <span class="resource-card__meta">${type} · <span class="resource-card__action inline-flex items-center gap-1">${icon('download')}Descargar</span></span>
            </span>
          </a>
        </li>`;
}

/** Material con `destino: 'taller'`: se muestra en la pestaña Taller, no en Recursos. */
const isWorkshopMaterial = (item) => item.destino === WORKSHOP_DEST;

function materialTab(unit) {
  // La guía y el material con destino 'taller' se ven en la pestaña Taller.
  const items = (unit.material ?? []).filter((item) => item.id !== GUIDE_ID && !isWorkshopMaterial(item));
  if (!items.length) return '<p class="text-text-muted">Esta unidad todavía no tiene material.</p>';
  // La presentación de clases va siempre primero, aunque en los datos esté en otro lugar.
  const isFeatured = (item) => item.variante === PRESENTATION_VARIANT;
  items.sort((a, b) => Number(isFeatured(b)) - Number(isFeatured(a)));
  return `<ul class="resource-grid">${items.map(materialCard).join('')}</ul>`;
}

/* ----------------------------------------------------------------- Videos */
const youtubeId = (url) => url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1] ?? '';

function videoCard(video) {
  if (video.origen === 'YouTube' && youtubeId(video.url)) {
    const id = youtubeId(video.url);
    return `
      <li class="sm:col-span-2">
        <button type="button" class="lite-embed" data-youtube="${id}" data-title="${escapeHtml(video.titulo)}"
          style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"
          aria-label="Reproducir video: ${escapeHtml(video.titulo)}">
          <span class="lite-embed__play">${icon('play')}</span>
        </button>
        <p class="mt-2 text-sm text-text-muted">${escapeHtml(video.titulo)}${video.duracion ? ` · ${escapeHtml(video.duracion)}` : ''}</p>
      </li>`;
  }

  const meta = [video.origen, video.duracion].filter(Boolean).map(escapeHtml).join(' · ');
  if (!video.url) {
    return `
      <li>
        <div class="resource-card resource-card--soon">
          <span class="resource-card__icon">${icon('play')}</span>
          <div>
            <p class="resource-card__title">${escapeHtml(video.titulo)}</p>
            <p class="resource-card__meta">${icon('hourglass')}<span>${meta} · Enlace pendiente</span></p>
          </div>
        </div>
      </li>`;
  }

  const catalogHint = video.verificado === false ? 'Búscalo en el catálogo por su nombre.' : '';
  return `
    <li>
      <a class="resource-card" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">
        <span class="resource-card__icon">${icon('school')}</span>
        <span>
          <span class="resource-card__title block">${escapeHtml(video.titulo)}</span>
          ${video.nota ? `<span class="block mt-1 text-sm text-text-muted">${rich(video.nota)}</span>` : ''}
          <span class="resource-card__meta">${meta}${catalogHint ? ` · ${catalogHint}` : ''}
            <span class="resource-card__action inline-flex items-center gap-1">${icon('external')}Abrir<span class="visually-hidden"> (se abre en una pestaña nueva)</span></span>
          </span>
        </span>
      </a>
    </li>`;
}

function videosTab(unit) {
  const cards = (unit.videos ?? []).map(videoCard).join('');
  return `
    ${cards ? `<ul class="resource-grid">${cards}</ul>` : '<p class="text-text-muted">Sin videos asociados por ahora.</p>'}
    ${block('Para investigar por tu cuenta', list(unit.paraInvestigar))}`;
}

const RENDERERS = {
  resumen: summaryTab,
  conceptos: conceptsTab,
  taller: labTab,
  recursos: (unit) => `<section class="content-block"><h5 class="content-title">Material descargable</h5>${materialTab(unit)}</section>
    <section class="content-block content-block--split"><h5 class="content-title">Videos y cursos</h5>${videosTab(unit)}</section>`,
};

/** Markup del cuerpo desplegable (pestañas + paneles). */
export function unitBodyMarkup(unit, activeTab = 'resumen') {
  const tabs = TABS.map((tab) => {
    const selected = tab.key === activeTab;
    return `
      <button type="button" role="tab" class="tab" id="${unit.id}-tab-${tab.key}"
        aria-controls="${unit.id}-panel-${tab.key}" aria-selected="${selected}"
        tabindex="${selected ? 0 : -1}" data-tab="${tab.key}">
        ${icon(tab.icon)}<span>${tab.label}</span>
      </button>`;
  }).join('');

  const panels = TABS.map(
    (tab) => `
      <div role="tabpanel" class="tab-panel" id="${unit.id}-panel-${tab.key}"
        aria-labelledby="${unit.id}-tab-${tab.key}" tabindex="0"${attr('hidden', tab.key !== activeTab)}>
        ${RENDERERS[tab.key](unit)}
      </div>`,
  ).join('');

  return `
    <div role="tablist" class="tablist" aria-label="Contenido de ${unitCode(unit)}">${tabs}</div>
    ${panels}`;
}

/** Activa una pestaña por clave. */
export function selectTab(container, key, { focus = false } = {}) {
  const tabs = qsa('[role="tab"]', container);
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = container.querySelector(`#${tab.getAttribute('aria-controls')}`);
    panel.hidden = !selected;
    if (selected && focus) tab.focus();
  });
}

/** Navegación por teclado del patrón ARIA tabs (flechas, Inicio y Fin). */
export function initTabs(container) {
  const tablist = container.querySelector('[role="tablist"]');
  if (!tablist || tablist.dataset.ready) return;
  tablist.dataset.ready = 'true';

  tablist.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) selectTab(container, tab.dataset.tab);
  });

  container.addEventListener('click', (event) => {
    const goto = event.target.closest('[data-goto-tab]');
    if (!goto) return;
    selectTab(container, goto.dataset.gotoTab, { focus: true });
    tablist.scrollIntoView({ block: 'nearest' });
  });

  tablist.addEventListener('keydown', (event) => {
    const tabs = qsa('[role="tab"]', tablist);
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    const keys = {
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    selectTab(container, tabs[keys[event.key]].dataset.tab, { focus: true });
  });
}

/** Lite embed de YouTube: el iframe se carga solo al hacer clic. */
export function initLiteEmbeds(root = document) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-youtube]');
    if (!button) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.youtube}?autoplay=1`;
    iframe.title = button.dataset.title;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    const wrapper = document.createElement('div');
    wrapper.className = 'lite-embed';
    wrapper.append(iframe);
    button.replaceWith(wrapper);
    iframe.focus();
  });
}
