/**
 * Unidad 4 · Fuente: fuentes/unidades/unidad-04.md
 */
import { BIBLIO, DOCS, academyVideo } from '../links.js';

export default {
  id: 'u04',
  numero: 4,
  titulo: 'Análisis y diagnóstico de sistemas legados con IA',
  tituloCorto: 'Diagnóstico de sistemas legados',
  descripcionBreve: 'Entender un legado sin tocarlo: plan mode, subagentes, reglas ocultas y matriz de decisión.',
  dia: 2,
  bloque: 'tarde',
  nivel: '30 → 40',

  foco: 'Hacer un diagnóstico técnico completo de Pedidos Legado sin modificar ningún archivo, y terminar con una recomendación respaldada por una matriz.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Explorar un sistema legado en modo de solo lectura antes de cambiar nada.',
    'Repartir la exploración en subagentes para mantener limpio el contexto principal.',
    'Extraer reglas de negocio ocultas con su ubicación exacta y verificarlas leyendo el código.',
    'Decidir con datos entre mantener, refactorizar, modernizar o reemplazar.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['Claude Code (plan mode y subagentes)', 'Repo `pedidos-legado` (Delphi + DBISAM, sintético)'],
  requisitos: [],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Mirar sin tocar: arqueología en 10 minutos', minutos: 15 },
    { titulo: 'C2 · Divide y explora: mi subagente analista', minutos: 15 },
    { titulo: 'C3 · Reglas ocultas: mini-ejercicio en parejas', minutos: 20 },
    { titulo: 'C4 · Decidir con datos: "¿Qué harías tú?"', minutos: 20 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'subagente-solo-lectura',
        titulo: 'Subagente con herramientas restringidas',
        resumen: 'Un analista que solo puede leer: `Read`, `Grep` y `Glob`.',
        explicacion: [
          'Un subagente propio se define como un archivo Markdown en `.claude/agents/` (o se crea con `/agents`). Su frontmatter indica nombre, descripción y las herramientas que puede usar.',
          'Para diagnosticar un legado, el subagente `analista-legado` se limita a herramientas de lectura (`Read`, `Grep`, `Glob`). Así es imposible que modifique un archivo, aunque se lo pidan.',
          'Trabaja en su propio contexto y devuelve solo un resumen, lo que puedes comprobar comparando `/context` con y sin el subagente.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/agents/analista-legado.md',
          contenido: `---
name: analista-legado
description: Analiza código legado (Delphi, PHP u otros) sin modificarlo. Úsalo para inventarios, dependencias y reglas de negocio.
tools: Read, Grep, Glob
---

Eres un analista de sistemas legados. Nunca propones cambios de código.
Cada afirmación debe incluir archivo y línea como evidencia.`,
        },
        nota: '**Implementación de Claude Code:** los subagentes y su formato en `.claude/agents/` son propios de Claude Code.',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'catalogo-reglas',
        titulo: 'Catálogo de reglas con evidencia',
        resumen: 'Una regla por fila: archivo y línea, condición y efecto. Verificada leyendo el código.',
        explicacion: [
          'El catálogo de reglas de negocio (`diagnostico/reglas-negocio.md`) es una tabla con una regla por fila: archivo y línea, condición y efecto.',
          'Toda regla extraída se verifica leyendo el código. Si Claude afirma algo que no puedes ubicar, no entra al diagnóstico.',
          'Un diagnóstico que encuentra pocas reglas se quedó en la superficie: el sistema tiene reglas que no están a la vista.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'diagnostico/reglas-negocio.md (formato)',
          contenido: `| # | Regla | Archivo:línea | Condición | Efecto | Verificada |
|---|---|---|---|---|---|
| R1 | ... | UArchivo.pas:123 | ... | ... | Sí |`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'mermaid-dependencias',
        titulo: 'Diagramas Mermaid desde el código',
        resumen: 'Un mapa de dependencias versionable, generado por Claude y revisado por ti.',
        explicacion: [
          'Mermaid describe diagramas como texto, así que el mapa de dependencias vive en el repo junto al diagnóstico y se puede revisar en un diff.',
          'Pide a Claude el diagrama a partir del código y compáralo con lo que tú lees: unidades, formularios, data modules y tablas.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Sintaxis Mermaid (ejemplo genérico, no es el legado real)',
          contenido: `graph TD
  UFrmFormulario --> UDMDatos
  UFrmFormulario --> UUtilidades
  UDMDatos --> TABLA[(Tabla)]`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
    ],
    fundamentales: [
      {
        slug: 'mirar-sin-tocar',
        titulo: 'Mirar sin tocar',
        resumen: 'Primero entender, después cambiar.',
        explicacion: [
          'Un legado se toca con miedo por su antigüedad, complejidad, deuda técnica y costo de mantención. La primera fase es solo de lectura.',
          'Plan mode permite preguntar "¿qué hace?", "¿quién lo llama?" y "¿qué pasa si…?" sin riesgo de modificar nada.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.permissionModes,
      },
      {
        slug: 'divide-y-explora',
        titulo: 'Divide y explora',
        resumen: 'Un subagente por frente, el contexto limpio.',
        explicacion: [
          'Un código grande satura la ventana de contexto. Los subagentes exploran en su propio contexto y devuelven solo un resumen.',
          'Existen subagentes incorporados (Explore, Plan) y subagentes propios en `.claude/agents/`, con herramientas restringidas.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'reglas-ocultas',
        titulo: 'Reglas ocultas',
        resumen: 'El negocio está enterrado en el código.',
        explicacion: [
          'En un legado, el negocio se esconde en eventos de formularios, SQL dentro de la UI, números mágicos, variables globales, `if` anidados y código muerto.',
          'Se piden una por fila, con ubicación exacta, condición y efecto, y cada una se verifica leyendo el código.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'decidir-con-datos',
        titulo: 'Decidir con datos',
        resumen: 'Mantener, refactorizar, modernizar o reemplazar.',
        explicacion: [
          'Cuatro opciones: **mantener** (funciona y casi no cambia), **refactorizar** (mismo stack, mejor código), **modernizar** (stack nuevo por partes) y **reemplazar** (producto nuevo o SaaS).',
          'Se decide con una matriz con criterios y pesos: costo, complejidad, riesgo, impacto en el negocio y disponibilidad de personas que conozcan el sistema.',
          'No hay una única estrategia correcta: lo que se evalúa es que la recomendación se desprenda de tu matriz.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'diagnostico/matriz-decision.md (formato)',
          contenido: `| Módulo | Costo | Complejidad | Riesgo | Impacto | Personas | Puntaje | Estrategia |
|---|---|---|---|---|---|---|---|
| ... | | | | | | | |`,
        },
        nota: '',
        fuente: BIBLIO.codeMigrationBlog,
      },
    ],
  },

  laboratorio: {
    nombre: 'Diagnóstico del sistema legado',
    modalidad: 'Individual',
    duracion: 80,
    caso: 'La distribuidora decidió modernizar **Pedidos Legado**, el sistema de escritorio en Delphi con DBISAM que usa hace 18 años. Antes de aprobar presupuesto, la gerencia pide un diagnóstico técnico: qué hay, qué es riesgoso y por dónde empezar.',
    problematica: 'No hay documentación y el autor original ya no está. Las reglas de negocio (descuentos, impuestos, bloqueos de clientes) están repartidas en formularios, data modules y unidades de utilidades. Nadie sabe Delphi y el repo no compila: solo se puede **leer**.',
    objetivo: 'Hacer un diagnóstico completo **sin modificar ningún archivo**, usando plan mode y un subagente de análisis, y terminar con una recomendación respaldada por una matriz.',
    pasos: [
      { minutos: 10, texto: 'Crear tu subagente `analista-legado` (solo lectura) y abrir Claude Code en **plan mode** sobre `pedidos-legado`. Pedir el inventario: unidades, formularios, tablas, líneas aproximadas y responsabilidad de cada una.', conceptos: ['C1', 'C2'] },
      { minutos: 25, texto: 'Generar `diagnostico/dependencias.md` con un diagrama Mermaid, y `diagnostico/reglas-negocio.md` como tabla con regla, archivo y línea, condición y efecto. **Verifica al menos 5 reglas leyendo el código.**', conceptos: ['C2', 'C3'] },
      { minutos: 15, texto: 'Generar `diagnostico/riesgos.md` con riesgos y deuda técnica priorizados (alto, medio, bajo) y la evidencia en el código.', conceptos: ['C3'] },
      { minutos: 25, texto: 'Construir `diagnostico/matriz-decision.md`: un puntaje por módulo con los criterios de C4 y la estrategia recomendada. Cierra con un **resumen ejecutivo de 5 líneas** para la gerencia.', conceptos: ['C4'] },
      { minutos: 5, texto: 'Cierre: tres alumnos leen su resumen ejecutivo.', conceptos: [] },
    ],
    puntosControl: ['Tu catálogo tiene al menos 8 reglas de negocio (paso 2).'],
    resultadoEsperado: [
      'El sistema tiene reglas que no están a la vista. Un diagnóstico que encuentra pocas reglas se quedó en la superficie.',
      'Cada afirmación tiene su evidencia: archivo y línea. Si Claude afirma algo que no puedes ubicar en el código, no entra.',
      'No hay una única estrategia correcta: la recomendación debe desprenderse de tu matriz.',
      '**Pista para la Unidad 5:** fíjate bien en el módulo que calcula los totales.',
    ],
    siTeTrabas: [
      'Cómo crear un subagente con herramientas restringidas.',
      'Qué es un formulario `.dfm` y dónde viven sus eventos.',
      'La sección "Understand new codebases" de *Common workflows*.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: ['Diagnóstico de referencia parcial en la rama `u4-respaldo` (solo inventario y dependencias), para completar desde el paso 3.'],
    extension: 'Instalar el plugin `code-modernization` y comparar su análisis con el tuyo.',
  },

  material: [
    { tipo: 'pdf', titulo: 'Guía del taller "Diagnóstico del sistema legado"', archivo: 'assets/material/u04/guia-taller.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Delphi para desarrolladores web (apunte)', archivo: 'assets/material/u04/delphi-para-web.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: mantener, refactorizar, modernizar o reemplazar', archivo: 'assets/material/u04/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('subagents', 'Curso completo.'),
    academyVideo('claudeCodeInAction', 'Plan mode.'),
    // TODO: URL del webinar "Modernizing Legacy Code with Claude Code" (fuente [20] sin URL en la bibliografía)
    { titulo: 'Webinar "Modernizing Legacy Code with Claude Code"', url: '', origen: 'Anthropic', duracion: '', nota: 'Enlace pendiente.' },
  ],

  paraInvestigar: [
    '**Delphi para desarrolladores web:** qué es una unit (`.pas`), un formulario (`.dfm`), un data module, los componentes de datos (`TTable`, `TQuery`, `TDataSource`) y los eventos (`OnClick`, `BeforePost`).',
    '**DBISAM:** motor embebido de tablas en archivos y sus diferencias con un motor cliente-servidor como PostgreSQL.',
    '**Por qué migrar Delphi a .NET:** el costo de mantener sistemas Delphi crece y cada vez hay menos especialistas.',
    'Plugin oficial `code-modernization` y el webinar de modernización.',
    'Técnicas de estimación: estimación por analogía y puntos de función.',
  ],

  entregable: {
    nombre: 'Diagnóstico técnico del sistema legado',
    criterios: [
      'Carpeta `diagnostico/` con inventario, dependencias (Mermaid), reglas de negocio, riesgos y matriz.',
      'Al menos 8 reglas catalogadas y 5 verificadas leyendo el código.',
      'Cada afirmación con evidencia: archivo y línea.',
      'Resumen ejecutivo de 5 líneas para la gerencia.',
      'Ningún archivo del legado modificado.',
    ],
    alimentaA: 'u05',
  },
};
