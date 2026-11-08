/**
 * course.js · Datos generales del curso.
 * Portada tomada del Programa oficial del curso (Vela LATAM · Grupo 02).
 */

/** Ruta del PDF del Programa. */
export const PROGRAM_PDF = 'assets/docs/programa-desarrollando-con-ia.pdf';

/** Si es false, los botones del Programa no se muestran. */
export const PROGRAM_PDF_AVAILABLE = true;

/** Glosario del curso (descarga, footer «Material del curso»). */
export const GLOSSARY_PDF = 'assets/docs/glosario-del-curso.pdf';

export const COURSE = {
  brand: 'IA para Desarrolladores',
  overline: 'Vela LATAM · Programa de capacitación · Grupo 02 · 2026',
  tag: '// 30 horas · 10 unidades · 5 días',
  title: 'Desarrollando con Inteligencia',
  subtitle: 'IA para Desarrolladores',
  lead: 'Enfocado en el ecosistema Anthropic: Claude y Claude Code',
  pills: ['Claude · ecosistema de referencia', 'MCP', 'Agent Skills', 'AGENTS.md', 'SDD'],
  instructorLine: 'Felipe Cuevas · Claude Certified Developer',
  organization: 'Vela LATAM · Grupo 02 · 2026',
  footerSummary:
    'Programa de 30 horas para desarrollar software con IA de forma profesional, con Claude y Claude Code como ecosistema de referencia.',
  hours: 30,
  unitsCount: 10,
  days: 5,

  /** Proyecto integrador que avanza unidad a unidad. */
  integrator: 'Pedidos Legado → Pedidos Web',

  /** Distribución de cada unidad (3 h). */
  distribution: [
    { label: 'Clase', minutes: 85 },
    { label: 'Receso', minutes: 15 },
    { label: 'Taller', minutes: 80 },
  ],

  /** Calendario por día (las horas exactas viven en units.config.js). */
  schedule: [
    { day: 1, units: ['u01', 'u02'] },
    { day: 2, units: ['u03', 'u04'] },
    { day: 3, units: ['u05', 'u06'] },
    { day: 4, units: ['u07', 'u08'] },
    { day: 5, units: ['u09', 'u10'] },
  ],
  lunch: 'Almuerzo 12:00–13:00',
};

/** Enlaces de navegación principal (anclas). */
export const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#ruta', label: 'Ruta del curso' },
  { href: '#instructor', label: 'Instructor' },
];
