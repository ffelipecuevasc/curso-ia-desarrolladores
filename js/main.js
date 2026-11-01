/**
 * main.js · Punto de entrada del sitio.
 * Renderiza cada componente en su contenedor [data-component] y coordina
 * el recálculo de estados de las unidades cada 60 segundos.
 * Cada componente se inicia por separado: si uno falla, el resto sigue.
 */
import { UNITS_SCHEDULE, REFRESH_INTERVAL_MS } from './config/units.config.js';
import { renderNavbar } from './components/navbar.js';
import { renderHero, updateHeroStatus } from './components/hero.js';
import { getNow } from './utils/dates.js';
import { getCourseState } from './utils/schedule.js';

const unitIds = Object.keys(UNITS_SCHEDULE);

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

function refresh() {
  const state = getCourseState(unitIds, getNow());
  if (hero) updateHeroStatus(hero, state);
}

refresh();
setInterval(refresh, REFRESH_INTERVAL_MS);
