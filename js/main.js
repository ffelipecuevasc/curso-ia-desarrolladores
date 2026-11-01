/**
 * main.js · Punto de entrada del sitio.
 * Renderiza cada componente en su contenedor [data-component] y coordina
 * el recálculo de estados de las unidades cada 60 segundos.
 * Cada componente se inicia por separado: si uno falla, el resto sigue.
 */
import { REFRESH_INTERVAL_MS } from './config/units.config.js';
import { renderNavbar } from './components/navbar.js';
import { renderHero, updateHeroStatus } from './components/hero.js';
import { renderOverview, updateOverview } from './components/overview.js';
import { updateProgress } from './components/progress.js';
import { UNITS } from './data/units/index.js';
import { validateData } from './utils/validate.js';
import { initReveal } from './utils/reveal.js';
import { getNow } from './utils/dates.js';
import { getCourseState } from './utils/schedule.js';

const unitIds = UNITS.map((unit) => unit.id);
const params = new URLSearchParams(window.location.search);

const mount = (name, render) => {
  const element = document.querySelector(`[data-component="${name}"]`);
  if (!element) return null;
  try {
    render(element);
  } catch (error) {
    console.error(`[main] Error al renderizar «${name}»`, error);
  }
  return element;
};

const navbar = mount('navbar', renderNavbar);
const hero = mount('hero', renderHero);
const overview = mount('overview', renderOverview);

function refresh() {
  const state = getCourseState(unitIds, getNow());
  if (hero) updateHeroStatus(hero, state);
  if (overview) updateOverview(overview, state);
  updateProgress(document, state);
}

refresh();
setInterval(refresh, REFRESH_INTERVAL_MS);
initReveal();

// Validación de datos en desarrollo: agrega ?debug a la URL.
if (params.has('debug')) validateData(UNITS);
