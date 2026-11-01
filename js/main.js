/**
 * main.js · Punto de entrada del sitio.
 * Renderiza cada componente en su contenedor [data-component] y coordina
 * el recálculo de estados de las unidades cada 60 segundos.
 * Cada componente se inicia por separado: si uno falla, el resto sigue.
 */
import { renderNavbar } from './components/navbar.js';

const mount = (name, render) => {
  const element = document.querySelector(`[data-component="${name}"]`);
  if (!element) return;
  try {
    render(element);
  } catch (error) {
    console.error(`[main] Error al renderizar «${name}»`, error);
  }
};

mount('navbar', renderNavbar);
