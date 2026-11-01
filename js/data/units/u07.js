/**
 * Unidad 7 · Fuente: fuentes/unidades/unidad-07.md
 */
import { DOCS, STANDARDS, academyVideo } from '../links.js';

export default {
  id: 'u07',
  numero: 7,
  titulo: 'IA para revisión de código (code review), colaboración e ingeniería de software',
  tituloCorto: 'Code review con IA',
  descripcionBreve: 'PR chicos, reglas escritas en REVIEW.md y revisores de IA que comentan; tú decides.',
  dia: 4,
  bloque: 'mañana',
  nivel: '70 → 80',

  foco: 'Definir por escrito cómo revisa el equipo, configurar revisores de IA que sigan esas reglas y practicar una revisión humana cruzada que decida sobre cada hallazgo.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Evaluar cada hallazgo de la IA: aceptar, discutir o descartar con argumento.',
    'Preparar PR chicos con una descripción que explique qué, por qué y cómo probar.',
    'Escribir las reglas de revisión en `REVIEW.md` y las del proyecto en `AGENTS.md`.',
    'Versionar la configuración `.claude/` para que todo el equipo revise igual.',
  ],
  licencias: ['Claude Team Standard', 'Credencial de GitHub Actions (la misma de la Unidad 6, pendiente)'],
  herramientas: ['GitHub (pull requests)', '`claude-code-action`', '`/code-review`', 'Subagentes de Claude Code'],
  requisitos: [],
  pendientes: [
    {
      titulo: 'Credencial de GitHub Actions',
      texto: 'Se usa la misma credencial de la Unidad 6. Si no está disponible, se omite el paso 3 del taller y la revisión de IA se hace con el subagente o `/code-review` local.',
    },
  ],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · La IA comenta, tú decides: "Comentario útil o ruido"', minutos: 15 },
    { titulo: 'C2 · PR chico: el PR de 2.000 líneas', minutos: 15 },
    { titulo: 'C3 · Reglas escritas: `AGENTS.md` y `REVIEW.md`', minutos: 25 },
    { titulo: 'C4 · Configuración compartida: `.claude/` versionada', minutos: 15 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'review-md',
        titulo: 'REVIEW.md: reglas solo de revisión',
        resumen: 'Qué es importante, qué se ignora, límite de comentarios menores y chequeos obligatorios.',
        explicacion: [
          '`AGENTS.md` lleva las reglas del proyecto para todo trabajo. `REVIEW.md` lleva reglas **solo de revisión**: qué se marca como importante, qué se ignora (código generado, lo que ya valida el CI), el límite de comentarios menores y los chequeos obligatorios.',
          'Hallazgo verificado en la documentación (31-oct-2026): el Code Review gestionado lee `CLAUDE.md` y `REVIEW.md` (desde la rama base, nunca desde el propio PR); `/code-review` local lee `CLAUDE.md` pero no `REVIEW.md`; ninguno menciona `AGENTS.md`.',
          'Consecuencia para el curso: nuestros revisores leen `AGENTS.md` y `REVIEW.md` **porque se lo indicamos explícitamente** en su configuración.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'REVIEW.md',
          contenido: `# Reglas de revisión

## Importante (siempre marcar)
- Secretos o credenciales en el código.
- Consultas SQL concatenadas.
- Cambios en el cálculo de totales sin test.

## Ignorar
- Código generado y archivos de migraciones.
- Formato que ya valida el CI.

## Límites
- Máximo 3 comentarios menores por PR.`,
        },
        nota: '**Implementación de Claude:** `REVIEW.md` es una convención del Code Review de Claude, no un estándar abierto. `AGENTS.md` sí es un estándar abierto.',
        fuente: DOCS.codeReviewCustomize,
      },
      {
        slug: 'subagente-revisor',
        titulo: 'Subagente revisor de solo lectura',
        resumen: 'Lee `AGENTS.md` y `REVIEW.md` antes de revisar y no puede editar.',
        explicacion: [
          'El subagente `.claude/agents/revisor.md` revisa la rama con herramientas de lectura. Su instrucción dice, explícitamente, leer `AGENTS.md` y `REVIEW.md` antes de revisar.',
          'Al estar versionado en `.claude/`, todo el equipo revisa con las mismas reglas.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/agents/revisor.md',
          contenido: `---
name: revisor
description: Revisa los cambios de la rama actual según las reglas del equipo. Úsalo antes de abrir o aprobar un PR.
tools: Read, Grep, Glob, Bash
---

Antes de revisar, lee AGENTS.md y REVIEW.md.
Clasifica cada hallazgo por severidad e indica archivo y línea.
No edites archivos.`,
        },
        nota: '**Implementación de Claude Code:** subagentes en `.claude/agents/`.',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'claude-review-workflow',
        titulo: 'claude-review.yml en modo automatización',
        resumen: 'En cada `pull_request`, Claude lee las reglas, revisa y comenta.',
        explicacion: [
          'Con un `prompt`, `claude-code-action` corre en modo automatización ante cada evento `pull_request`, sin esperar una mención.',
          'El `prompt` indica leer `AGENTS.md` y `REVIEW.md`, revisar el PR y comentar. Se mantienen los permisos mínimos y el `--max-turns` de la Unidad 6.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'code-review-local',
        titulo: '/code-review local y Code Review gestionado',
        resumen: 'Tres formas de pedir revisión: comando local, subagente propio o GitHub Action.',
        explicacion: [
          '`/code-review` se ejecuta en tu sesión de Claude Code, en cualquier plan, y sale de la cuota del asiento.',
          'El **Code Review gestionado** es un servicio de Anthropic para planes Team y Enterprise que activa un Owner. Publica hallazgos por severidad, nunca aprueba ni bloquea un PR y se cobra por uso.',
          'La propia documentación advierte que una revisión sin hallazgos no significa que el código esté libre de errores.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.codeReviewLocalEs,
      },
    ],
    fundamentales: [
      {
        slug: 'ia-comenta-tu-decides',
        titulo: 'La IA comenta, tú decides',
        resumen: 'Ningún hallazgo se acepta sin evaluarlo.',
        explicacion: [
          'La IA detecta bien errores de lógica, casos borde, secretos e inconsistencias. No detecta bien si el cambio resuelve el problema del negocio ni el contexto del equipo.',
          'Cada hallazgo tiene tres salidas: **aceptar**, **discutir** o **descartar con argumento**. Descartar es válido si lo argumentas; aceptar todo sin leer no lo es.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.codeReview,
      },
      {
        slug: 'pr-chico',
        titulo: 'PR chico',
        resumen: 'Lo que no se puede revisar, no se revisa.',
        explicacion: [
          'Un PR de tamaño razonable, con commits legibles y una descripción que explique qué, por qué y cómo probarlo, produce hallazgos útiles. Uno gigante produce ruido.',
          'Claude puede redactar la descripción a partir del diff, pero la persona la valida.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'Descripción de PR',
          contenido: `## Qué
Agrega validación de rango de fechas en el listado de pedidos.

## Por qué
Fechas invertidas devolvían una lista vacía sin explicación.

## Cómo probarlo
dotnet test --filter ListadoPedidos`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'reglas-escritas',
        titulo: 'Reglas escritas',
        resumen: '`AGENTS.md` para todo, `REVIEW.md` para revisar.',
        explicacion: [
          'Las revisiones son desparejas cuando nadie sabe qué es "importante". Escribir las reglas hace que la IA comente menos y mejor.',
          'Si los comentarios siguen siendo ruido, ajusta las reglas, no el código.',
        ],
        ejemplo: null,
        nota: '**Estándar abierto:** `AGENTS.md`. **Convención de Claude:** `REVIEW.md`.',
        fuente: STANDARDS.agentsMd,
      },
      {
        slug: 'configuracion-compartida',
        titulo: 'Configuración compartida',
        resumen: '`.claude/` versionada, igual para todo el equipo.',
        explicacion: [
          'Versionar `.claude/` en el repo (`agents/`, `skills/`, `settings.json` y hooks) hace que todo el equipo trabaje y revise con las mismas reglas.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Configuración versionada',
          contenido: `.claude/
├── agents/revisor.md
├── skills/documentar-modulo/SKILL.md
└── settings.json`,
        },
        nota: '',
        fuente: DOCS.settings,
      },
    ],
  },

  laboratorio: {
    nombre: 'Proceso de code review',
    modalidad: 'Parejas cruzadas',
    duracion: 80,
    caso: 'El equipo de Pedidos Web crece: varias parejas trabajan en paralelo sobre el mismo portal y todo cambio entra por pull request. El pipeline de la Unidad 6 ya prueba cada PR.',
    problematica: 'Las revisiones son desparejas: algunos aprueban sin leer y otros dejan 40 comentarios de estilo. Nadie sabe qué es "importante", las descripciones dicen "arreglos varios" y la IA comenta tanto que el equipo no sabe qué tomar en serio.',
    objetivo: 'Definir por escrito cómo revisa el equipo, configurar revisores de IA que sigan esas reglas y practicar una revisión humana cruzada que decida sobre cada hallazgo.',
    pasos: [
      { minutos: 10, texto: 'Abrir un PR con el trabajo de la Unidad 6. Pedir a Claude la descripción (qué, por qué, cómo probarlo), ajustarla y publicarla.', conceptos: ['C2'] },
      { minutos: 20, texto: 'Escribir `REVIEW.md`: qué es importante, qué se ignora, límite de comentarios menores y 3 chequeos obligatorios. Crear el subagente `.claude/agents/revisor.md`, de solo lectura, que lea `AGENTS.md` y `REVIEW.md` antes de revisar. Ejecutarlo sobre la rama.', conceptos: ['C3', 'C4'] },
      { minutos: 15, texto: 'Crear `.github/workflows/claude-review.yml` (modo automatización, en `pull_request`). El `prompt` indica leer `AGENTS.md` y `REVIEW.md`, revisar el PR y comentar. Mantener permisos mínimos y `--max-turns`.', conceptos: ['C3', 'C4'] },
      { minutos: 20, texto: '**Revisión cruzada:** cada pareja revisa el PR de otra. Por cada hallazgo de la IA deja una respuesta (aceptar, discutir o descartar) con su argumento, y agrega al menos un hallazgo humano que la IA no vio.', conceptos: ['C1'] },
      { minutos: 10, texto: 'Aplicar las mejoras acordadas, armar `docs/checklist-revision.md` con lo aprendido y hacer merge con el CI en verde.', conceptos: ['C1', 'C2'] },
      { minutos: 5, texto: 'Cierre: cada pareja comparte el hallazgo que más discutieron.', conceptos: [] },
    ],
    puntosControl: ['Claude publica comentarios en el PR (paso 3).'],
    resultadoEsperado: [
      'Un buen `REVIEW.md` hace que la IA comente **menos y mejor**. Si los comentarios siguen siendo ruido, ajusta las reglas, no el código.',
      'Descartar un hallazgo de la IA es válido si lo argumentas. Aceptar todo sin leer no lo es.',
      'El hallazgo humano del paso 4 es la evidencia de que la revisión no se delegó por completo.',
    ],
    siTeTrabas: [
      'El ejemplo de `REVIEW.md` en *Customize Code Review*.',
      'El modo automatización y el ejemplo "Run a skill" de la documentación de GitHub Actions.',
      'La configuración de subagentes con herramientas restringidas.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: ['Si la credencial de GitHub Actions no está disponible, se omite el paso 3: la revisión de IA se hace con el subagente o `/code-review` local y el resultado se pega como comentario en el PR.'],
    extension: 'Un segundo subagente, `revisor-seguridad`, enfocado solo en secretos e inyección SQL. Es un buen anticipo de la Unidad 8.',
  },

  material: [
    { tipo: 'pdf', titulo: 'Guía del taller "Proceso de code review"', archivo: 'assets/material/u07/guia-taller.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: aceptar, discutir o descartar', archivo: 'assets/material/u07/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('claudeCode101', 'Lección "Code review".'),
    academyVideo('claudeCodeInAction', 'PR y GitHub Action.'),
    academyVideo('aiNativeSdlc', 'IA en el ciclo de PR.'),
    academyVideo('subagents'),
  ],

  paraInvestigar: [
    '**Claude Tag**, Claude dentro de Slack: en beta para Team y Enterprise, lo configura un Owner.',
    'Code Review gestionado: niveles de revisión, costos y protección de ramas.',
    'Ultrareview y `/code-review --fix`.',
    'Pipelines de revisión con varios agentes especializados (seguridad, arquitectura, estilo).',
    'Identificación de mejoras arquitectónicas a nivel de sistema.',
    'Plugin `code-review` para la GitHub Action.',
  ],

  entregable: {
    nombre: 'Proceso completo de code review asistido por IA',
    criterios: [
      '`REVIEW.md` con importante, ignorar, límite de comentarios menores y 3 chequeos obligatorios.',
      'Subagente `revisor` de solo lectura que lee `AGENTS.md` y `REVIEW.md`.',
      '`claude-review.yml` con permisos mínimos y `--max-turns`.',
      'PR con cada hallazgo respondido (aceptar, discutir o descartar) y al menos un hallazgo humano.',
      '`docs/checklist-revision.md`.',
    ],
    alimentaA: 'u08',
  },
};
