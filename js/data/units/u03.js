/**
 * Unidad 3 · Fuente: fuentes/unidades/unidad-03.md
 */
import { BIBLIO, DOCS, academyVideo } from '../links.js';

export default {
  id: 'u03',
  numero: 3,
  titulo: 'Desarrollo asistido por IA: generación, refactorización y documentación',
  tituloCorto: 'Generar, refactorizar y documentar',
  descripcionBreve: 'Incrementos chicos, refactor con red de tests y tu primera Skill para documentar.',
  dia: 2,
  bloque: 'mañana',
  nivel: '20 → 30',

  foco: 'Construir funcionalidad en pasos chicos, dejar legible un módulo heredado sin cambiar su comportamiento y crear una Skill que estandarice cómo documenta el equipo.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Generar código en pasos chicos: una tarea, un incremento, un commit.',
    'Refactorizar con una red de tests y volver atrás con git o rewind si algo se rompe.',
    'Crear una Skill (`SKILL.md`) que Claude active sola cuando corresponde.',
    'Desconfiar y verificar: leer, ejecutar y pedir que el agente explique sus decisiones.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['ASP.NET Core', 'Rider', 'xUnit', 'Claude Code'],
  requisitos: [],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Pasos chicos: el commit gigante frente a tres commits chicos', minutos: 15 },
    { titulo: 'C2 · Red de tests: refactor con red', minutos: 18 },
    { titulo: 'C3 · Skills: mi primera Skill y `planificador-proyectos-web`', minutos: 25 },
    { titulo: 'C4 · Desconfía y verifica: mismo pedido, dos modelos', minutos: 12 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'skill-md',
        titulo: 'SKILL.md: estructura de una Skill',
        resumen: 'Una carpeta con `SKILL.md` (frontmatter `name` y `description`) más instrucciones y archivos de apoyo.',
        explicacion: [
          'Una Skill es una carpeta con un archivo `SKILL.md`. El frontmatter lleva `name` y `description`; el cuerpo, las instrucciones. Puede incluir archivos de referencia y scripts.',
          'En Claude Code vive en `.claude/skills/<nombre>/` y Claude la activa sola cuando el pedido calza con su `description`. Por eso la `description` es lo más importante: si la Skill no se activa sin nombrarla, el problema está ahí.',
          '`AGENTS.md` lleva las reglas que aplican **siempre**; la Skill lleva un **procedimiento** que se usa solo cuando corresponde.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/skills/documentar-modulo/SKILL.md',
          contenido: `---
name: documentar-modulo
description: Documenta un módulo de C# del proyecto Pedidos Web. Úsala cuando pidan documentar, explicar o generar el README de un módulo o servicio.
---

# Documentar un módulo

1. Lee el código del módulo y sus tests.
2. Escribe en docs/<modulo>.md:
   - Propósito
   - API pública
   - Ejemplo de uso
   - Diagrama Mermaid de dependencias
3. Verifica que cada afirmación coincida con el código.`,
        },
        nota: '**Estándar abierto:** Agent Skills (agentskills.io) define el formato de la carpeta y de `SKILL.md`. **Implementación de Claude Code:** la ubicación `.claude/skills/`, la invocación con `/nombre` y campos como `allowed-tools`.',
        fuente: DOCS.skills,
      },
      {
        slug: 'rewind',
        titulo: 'Volver atrás: git y rewind',
        resumen: 'Si un paso del refactor rompe algo, vuelves al último estado bueno.',
        explicacion: [
          'Refactorizar en pasos chicos solo sirve si puedes volver atrás rápido. La primera red es git: un commit por paso con tests en verde.',
          'Claude Code además guarda puntos de control de sus ediciones (checkpointing), y con *rewind* puedes volver la conversación y el código a un punto anterior.',
          'Regla del taller: ejecuta los tests después de cada paso. Si se rompen, vuelves atrás antes de seguir.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Ciclo de refactor con red',
          contenido: `dotnet test            # 1. todo en verde antes de empezar
# 2. un cambio chico con Claude
dotnet test            # 3. ¿sigue en verde?
git commit -am "refactor: extrae cálculo de descuento"
# si falló: git restore . (o rewind en Claude Code)`,
        },
        nota: '**Implementación de Claude Code:** checkpointing y rewind son funciones propias de Claude Code; git es la red universal.',
        fuente: DOCS.checkpointing,
      },
      {
        slug: 'contexto-preciso',
        titulo: 'Contexto preciso con @, errores e imágenes',
        resumen: 'Menciona archivos con `@`, pega el error completo o adjunta el mockup.',
        explicacion: [
          'La generación incremental funciona mejor con contexto preciso: mencionar archivos con `@` (por ejemplo `@src/Pedidos/PedidosService.cs`), pegar el error tal cual o adjuntar una imagen del mockup.',
          'El scaffolding y las convenciones del proyecto se declaran en `AGENTS.md`, para no repetirlos en cada pedido.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Pedido incremental',
          contenido: 'Lee @spec.md y @src/Pedidos/PedidosController.cs. Implementa solo el criterio CA1 (detalle con líneas y totales) con su test xUnit. No toques otros endpoints.',
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
    ],
    fundamentales: [
      {
        slug: 'pasos-chicos',
        titulo: 'Pasos chicos',
        resumen: 'Una tarea, un incremento, un commit.',
        explicacion: [
          'Pedir una tarea a la vez produce diffs que se pueden revisar. Un pedido gigante produce un diff que nadie revisa de verdad.',
          'En la demo sobre TodoMini se agregan "etiquetas" en un solo pedido y luego en tres incrementos. El curso decide cuál de los dos diffs revisaría en 5 minutos.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.bestPractices,
      },
      {
        slug: 'red-de-tests',
        titulo: 'Red de tests',
        resumen: 'Sin tests no se refactoriza.',
        explicacion: [
          'Refactorizar es cambiar la forma sin cambiar el comportamiento. El orden es: tests primero, cambios chicos, tests después de cada paso y, si algo se rompe, volver atrás.',
          'En la demo, Claude escribe primero los tests de `calcularEnvio()` y luego refactoriza. Después se introduce un error a propósito y un test lo atrapa.',
          'Si cambió el comportamiento, no es un refactor.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'skills',
        titulo: 'Skills: enséñale una vez, lo usa siempre',
        resumen: 'Un procedimiento empaquetado que Claude carga solo cuando lo necesita.',
        explicacion: [
          'Una Skill empaqueta un procedimiento repetible (documentar, revisar, planificar) para que el equipo lo haga siempre igual.',
          'Ejemplo real del instructor: `planificador-proyectos-web` planifica y documenta un proyecto web antes de programar, combinando SDD con prácticas de Scrum. Incluye `references/`, `assets/`, `scripts/` (un validador en Python) y un `settings.json` que impide al agente hacer commit, push o deploy.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Estructura de una Skill profesional',
          contenido: `planificador-proyectos-web/
├── SKILL.md
├── references/
├── assets/
└── scripts/`,
        },
        nota: '**Estándar abierto:** el formato Agent Skills. **Implementación de Claude Code:** instalación en `.claude/skills/` e invocación con `/planificador-proyectos-web`.',
        fuente: BIBLIO.planificador,
      },
      {
        slug: 'desconfia-y-verifica',
        titulo: 'Desconfía y verifica',
        resumen: 'Lee, ejecuta y pide que explique.',
        explicacion: [
          'Toda salida se lee, se ejecuta y se le pide al agente que explique sus decisiones: "¿por qué elegiste esto?" o "¿qué caso borde no cubriste?".',
          'La documentación generada (README, ADR, diagramas Mermaid) también se verifica contra el código.',
          'El modelo se elige según la tarea: en la demo del instructor, el mismo refactor con Sonnet y con Opus (`/model`) se compara por diff, tiempo y explicación.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.modelConfig,
      },
    ],
  },

  laboratorio: {
    nombre: 'Módulo funcional y documentado',
    modalidad: 'Individual',
    duracion: 80,
    caso: 'Segundo sprint del **portal web de Pedidos**. Ya existe el endpoint "listar pedidos" de la Unidad 2; ahora los vendedores necesitan ver el **detalle de un pedido**: cliente, líneas, totales y estado.',
    problematica: 'En el repo hay un módulo heredado, `ClientesService`, con un método de 120 líneas, código duplicado y nombres como `proc2()`. Funciona y tiene 6 tests, pero nadie se atreve a tocarlo. Además, ningún módulo está documentado.',
    objetivo: 'Construir la nueva funcionalidad en pasos chicos, dejar el módulo heredado legible sin cambiar su comportamiento y crear una Skill que estandarice cómo documenta el equipo.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Segundo sprint del portal web de Pedidos: los vendedores necesitan ver el detalle de un pedido (cliente, líneas, totales y estado). En el repo está además `ClientesService`, un módulo heredado con un método de 120 líneas y nombres como `proc2()` que nadie se atreve a tocar. En 80 minutos implementas el detalle en al menos 3 incrementos con tests en verde, refactorizas `ClientesService` en pasos chicos sin cambiar su comportamiento, creas la Skill `documentar-modulo` para documentar ambos módulos y comparas un prompt vago con uno preciso. Todo el paso a paso está en la guía.',
    pasos: [
      { minutos: 25, texto: 'Escribir el `spec.md` breve de "detalle de pedido" e implementarlo en **al menos 3 incrementos**, con commit y tests en verde en cada uno.', conceptos: ['C1', 'C4'] },
      { minutos: 20, texto: 'Refactorizar `ClientesService`: ejecutar sus 6 tests antes de empezar, cambiar en pasos chicos y ejecutar `dotnet test` después de cada paso. Si falta un test para lo que vas a tocar, escríbelo primero.', conceptos: ['C2'] },
      { minutos: 20, texto: 'Crear la Skill `.claude/skills/documentar-modulo/SKILL.md` y usarla para documentar los dos módulos: propósito, API pública, ejemplo de uso y un diagrama Mermaid.', conceptos: ['C3', 'C4'] },
      { minutos: 10, texto: 'Repetir un tramo del refactor con **dos prompts distintos** (uno vago y otro con objetivo, restricciones y criterio de verificación) y anotar las diferencias en `docs/comparacion-prompts.md`.', conceptos: ['C4'] },
      { minutos: 5, texto: 'Cierre: dos alumnos muestran su Skill y explican su `description`.', conceptos: [] },
    ],
    puntosControl: ['Los 6 tests originales de `ClientesService` siguen en verde (paso 2).'],
    resultadoEsperado: [
      'Tu Skill funciona solo si Claude la activa **sin que la nombres**. Si no se activa, el problema está en la `description`.',
      'En el refactor, si cambió el comportamiento, no es un refactor.',
      'La documentación generada tiene que coincidir con el código. Revísala.',
    ],
    siTeTrabas: [
      'La estructura y el frontmatter de `SKILL.md` en la documentación de Skills, y la lección "Creating your first skill".',
      'Para el refactor, la sección "Refactor code" de *Common workflows*.',
      'Como modelo de una Skill bien construida, el `SKILL.md` del planificador.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Rama `u3-respaldo` con la funcionalidad de la Unidad 2 resuelta, para quien no la terminó.',
      'Si la Skill no se activa, invocarla con `/documentar-modulo` y revisar su `description` después.',
    ],
    extension: 'Agregar `allowed-tools` a la Skill para que solo pueda leer y escribir en `docs/`.',
  },

  material: [
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Módulo funcional y documentado"', archivo: 'assets/material/u03/guia-taller.pdf', disponible: false },
    { tipo: 'png', titulo: 'Infografía: anatomía de una Skill', archivo: 'assets/material/u03/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('agentSkills', 'Curso completo; incluye la lección "Creating your first skill".'),
    academyVideo('claudeCodeInAction', 'Rewind y sesiones de trabajo.'),
    academyVideo('aiFluencyBuilders', 'Lección "Discernment for code".'),
  ],

  paraInvestigar: [
    'Refactorización arquitectónica profunda: separación de capas e inversión de dependencias.',
    'Skills avanzadas: `allowed-tools`, divulgación progresiva y scripts dentro de la Skill.',
    'Comandos personalizados y estilos de salida de Claude Code.',
    'Probar interfaces web con Claude in Chrome.',
    'La guía *Common workflows* de Claude Code.',
    'Instalar `planificador-proyectos-web` y usarlo en un proyecto personal.',
  ],

  entregable: {
    nombre: 'Módulo funcional desarrollado y documentado con IA',
    criterios: [
      'Funcionalidad "detalle de pedido" en al menos 3 incrementos, con tests en verde.',
      '`ClientesService` refactorizado con sus 6 tests originales en verde.',
      'Skill `documentar-modulo` que se activa sin nombrarla.',
      'Documentación generada y verificada contra el código.',
      '`docs/comparacion-prompts.md` con las diferencias entre un prompt vago y uno preciso.',
    ],
    alimentaA: 'u04',
  },
};
