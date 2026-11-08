/**
 * Unidad 10 · Fuente: fuentes/unidades/unidad-10.md
 */
import { ACADEMY_CATALOG, BIBLIO, DOCS, academyVideo } from '../links.js';

export default {
  id: 'u10',
  numero: 10,
  titulo: 'Retorno de la inversión (ROI), productividad y taller integrador',
  tituloCorto: 'ROI y taller integrador',
  descripcionBreve: 'Métricas que importan, ROI con supuestos escritos y el plan integrado para la gerencia.',
  dia: 5,
  bloque: 'tarde',
  nivel: '95 → 100',

  foco: 'Reunir los datos reales del caso hilo, calcular el ROI con supuestos explícitos y entregar un plan integrado de una página que ayude a la gerencia a decidir.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Medir velocidad y calidad (DORA), no líneas de código.',
    'Calcular un ROI con supuestos escritos, dos escenarios y análisis de sensibilidad.',
    'Contar para decidir: un informe ejecutivo de una página con una recomendación.',
    'Integrar los nueve entregables del curso en un solo plan.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['Skill `pdf-con-estilo` (Unidad 9)', 'Claude Code', 'Planilla o `roi/modelo-roi.md`'],
  requisitos: [],
  pendientes: [
    {
      titulo: 'Cuestionario final',
      texto: 'El instructor entrega `cuestionario-final.md`. A partir de ese archivo se genera una página web interactiva con puntaje y la explicación de cada respuesta, que se publica en el paso 5 del taller.',
    },
  ],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Medir lo que importa: "La métrica trampa"', minutos: 15 },
    { titulo: 'C2 · ROI con supuestos: ROI en una planilla', minutos: 25 },
    { titulo: 'C3 · Contar para decidir: el informe en 1 página', minutos: 15 },
    { titulo: 'C4 · Integrar: el recorrido de 0 a 100', minutos: 15 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'metricas-dora',
        titulo: 'Métricas DORA',
        resumen: 'Frecuencia de despliegue, tiempo de entrega, tasa de fallas por cambio y tiempo de recuperación.',
        explicacion: [
          'Las métricas de entrega DORA miden velocidad y estabilidad: frecuencia de despliegue, tiempo de entrega de un cambio, tasa de fallas por cambio y tiempo de recuperación. Se complementan con los defectos escapados a producción.',
          'Las métricas de adopción del panel de Claude Code (usuarios activos, líneas aceptadas, tasa de aceptación, PR con asistencia) son útiles, pero **no miden valor por sí solas**: las líneas aceptadas no descuentan las que después se borran.',
        ],
        ejemplo: {
          tipo: 'texto',
          contenido: '"La métrica trampa": el equipo A acepta 10.000 líneas de IA al mes y tiene 30 defectos; el B acepta 2.000 y tiene 4. ¿Cuál rinde más y qué falta saber para decidir?',
        },
        nota: '',
        fuente: BIBLIO.dora,
      },
      {
        slug: 'modelo-roi',
        titulo: 'Modelo de ROI con escenarios y sensibilidad',
        resumen: 'ROI = (beneficio − costo) / costo, con cada supuesto escrito y su fuente.',
        explicacion: [
          '**Costos:** asientos según el contrato, uso de API (Unidades 6 y 7), tiempo de capacitación y tiempo de adopción. Para el uso de Claude Code, `/cost` da el consumo de una sesión y el panel el de la organización.',
          '**Beneficios:** horas ahorradas por tarea × valor hora, defectos evitados × costo de un defecto en producción y un tiempo de entrega más corto.',
          'Siempre dos escenarios, **conservador** y **optimista**, y un análisis de sensibilidad: ¿qué pasa si el ahorro real es la mitad?',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'roi/modelo-roi.md (estructura)',
          contenido: `ROI = (beneficio − costo) / costo

| Supuesto | Valor conservador | Valor optimista | Fuente |
|---|---|---|---|
| Horas ahorradas por semana | ... | ... | Unidad 1, paso 3 |
| Defectos evitados por mes | ... | ... | Unidades 5 y 7 |

Sensibilidad: ¿y si el ahorro real es la mitad?`,
        },
        nota: '',
        fuente: DOCS.costs,
      },
      {
        slug: 'informe-ejecutivo',
        titulo: 'Informe ejecutivo de una página',
        resumen: 'Problema, qué se hizo, resultados con incertidumbre, recomendación y próximo paso.',
        explicacion: [
          'Si alguien de la gerencia lee solo la primera página, debe saber qué decidir. La estructura: problema, qué se hizo, resultados con su incertidumbre, recomendación y próximo paso.',
          'Diligencia: se declara que el informe se preparó con apoyo de IA y que los números fueron verificados por una persona.',
        ],
        ejemplo: null,
        nota: '',
        fuente: { titulo: 'AI Fluency: Framework & Foundations · Descripción y Diligencia (Anthropic Academy)', url: ACADEMY_CATALOG },
      },
    ],
    fundamentales: [
      {
        slug: 'medir-lo-que-importa',
        titulo: 'Medir lo que importa',
        resumen: 'Velocidad y calidad, no líneas de código.',
        explicacion: [
          'Medir solo actividad (líneas, sesiones) premia el volumen, no el valor. Lo que importa es si se entrega más rápido y con menos fallas.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.analytics,
      },
      {
        slug: 'roi-con-supuestos',
        titulo: 'ROI con supuestos',
        resumen: 'Sin supuestos escritos, el número no vale.',
        explicacion: [
          'Un ROI con supuestos honestos y un resultado modesto vale más que uno espectacular sin respaldo.',
          'Advertencia del curso: los datos de un curso son una muestra pequeña. El ROI se trabaja como **ejercicio de método**, no como evidencia de productividad.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.costs,
      },
      {
        slug: 'contar-para-decidir',
        titulo: 'Contar para decidir',
        resumen: 'Una página, una recomendación.',
        explicacion: [
          'Un informe malo está lleno de tecnicismos, no tiene recomendación y trae cifras sin respaldo. Uno bueno cabe en una página y termina en una decisión.',
        ],
        ejemplo: null,
        nota: '',
        fuente: { titulo: 'AI Fluency: Framework & Foundations (Anthropic Academy)', url: ACADEMY_CATALOG },
      },
      {
        slug: 'integrar',
        titulo: 'Integrar',
        resumen: 'Nueve entregables, un solo plan.',
        explicacion: [
          'Cada entregable alimenta al siguiente: el mapa del SDLC lleva al flujo SDD; de ahí salen el módulo documentado, el diagnóstico, la migración, el pipeline, el code review, la gobernanza, el plan de la BU y, finalmente, el plan integrado.',
          'El plan integrado no repite los nueve entregables: los conecta. Próximos pasos: Comunidad Pulso Devs, cursos de Claude Academy y la ruta *Claude Certified Developer – Foundations*, que requiere pertenecer a una organización del Claude Partner Network.',
        ],
        ejemplo: null,
        nota: '',
        fuente: BIBLIO.certEligibility,
      },
    ],
  },

  laboratorio: {
    nombre: 'Plan integrado de adopción de IA',
    modalidad: 'Grupos de 3 (los mismos de la Unidad 9)',
    duracion: 80,
    caso: 'Termina el piloto de modernización de Pedidos. La gerencia general debe decidir si extiende la forma de trabajar del equipo de Pedidos Web a toda la empresa, y pide **un solo documento** que lo resuma todo.',
    problematica: 'El equipo tiene muchos artefactos (mapa, specs, diagnóstico, código migrado, pipeline, `REVIEW.md`, gobernanza y plan de la BU), pero repartidos y escritos para técnicos. La gerencia necesita saber **cuánto cuesta, cuánto aporta, qué riesgos hay y qué sigue**.',
    objetivo: 'Reunir los datos reales del caso hilo, calcular el ROI con supuestos explícitos y entregar el plan integrado como PDF, con la Skill `pdf-con-estilo` de la Unidad 9.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Termina el piloto y la gerencia general debe decidir si extiende la forma de trabajar de Pedidos Web a toda la empresa. Los artefactos del caso hilo están repartidos y escritos para técnicos; la gerencia necesita saber cuánto cuesta, cuánto aporta, qué riesgos hay y qué sigue. En grupos de 3, reúnes los datos reales de las unidades anteriores, calculas el ROI con supuestos explícitos y escenarios, redactas el informe ejecutivo de 1 página y generas el plan integrado en PDF con `pdf-con-estilo`. Cierras con las presentaciones y el cuestionario final. Todo el paso a paso está en la guía.',
    pasos: [
      { minutos: 15, texto: 'Reunir los datos del caso hilo con Claude: tiempos con y sin IA (U1), tests y cobertura (U6), defectos corregidos (U5), hallazgos de revisión (U7) y riesgos validados (U8). Usar el dataset de respaldo si falta algún dato.', conceptos: ['C1'] },
      { minutos: 20, texto: 'Calcular el ROI en `roi/modelo-roi.md` o en una planilla: costos, beneficios y supuestos con su fuente, escenarios conservador y optimista, y una sensibilidad.', conceptos: ['C2'] },
      { minutos: 20, texto: 'Redactar el **informe ejecutivo de 1 página** y armar el plan integrado: roadmap, indicadores, gobernanza, ganancias estimadas y estrategia de evolución. Generar el PDF con `pdf-con-estilo`.', conceptos: ['C3', 'C4'] },
      { minutos: 15, texto: '**Entrega y presentaciones.** Todos los grupos suben su PDF. Se sortean 3 grupos que presentan 4 minutos cada uno, con 3 minutos de comentarios en total.', conceptos: ['C3'] },
      { minutos: 10, texto: '**Cuestionario final** (página web interactiva) y cierre del curso.', conceptos: [] },
    ],
    puntosControl: ['Cada número del modelo de ROI tiene su supuesto escrito (paso 2).'],
    resultadoEsperado: [
      'Un ROI con supuestos honestos y un resultado modesto vale más que uno espectacular sin respaldo.',
      'Si alguien de la gerencia lee solo la primera página, debe saber qué decidir.',
      'El plan integrado no repite los nueve entregables: los conecta.',
    ],
    siTeTrabas: [
      'Las definiciones de las métricas DORA.',
      'La documentación de costos y de analytics de Claude Code.',
      'Tu propia Skill `pdf-con-estilo` de la Unidad 9.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Dataset de respaldo para grupos sin mediciones completas.',
      'Si la Skill de PDF falla, se entrega el HTML.',
    ],
    extension: '',
  },

  material: [
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller integrador', archivo: 'assets/material/u10/guia-taller.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Plantilla de informe ejecutivo de 1 página', archivo: 'assets/material/u10/plantilla-informe.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: el recorrido de 0 a 100', archivo: 'assets/material/u10/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('aiFluency', 'Descripción y Diligencia.'),
    academyVideo('aiNativeSdlc'),
    academyVideo('claudePlatform101', 'Curso previo de la ruta Claude Certified Developer – Foundations.'),
  ],

  paraInvestigar: [
    'API de analytics de Enterprise y OpenTelemetry para métricas propias.',
    'Estudios publicados sobre productividad con IA en desarrollo de software (citar siempre la fecha y la muestra).',
    'El marco DORA completo.',
    'Ruta *Claude Certified Developer – Foundations* y su curso previo *Claude Platform 101*.',
  ],

  entregable: {
    nombre: 'Plan integrado de adopción de IA',
    criterios: [
      'Informe ejecutivo de 1 página con recomendación y próximo paso.',
      'ROI con supuestos escritos y su fuente, escenarios conservador y optimista, y sensibilidad.',
      'Roadmap, indicadores, gobernanza y estrategia de evolución.',
      'PDF generado con la Skill `pdf-con-estilo`.',
    ],
    alimentaA: null, // Cierre del curso
  },
};
