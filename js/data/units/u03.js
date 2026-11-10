/**
 * Unidad 3 · Fuente: fuentes/unidades/unidad-03.md
 */
import { BIBLIO, DOCS, MATERIAL_REPO, academyVideo } from '../links.js';

/** Carpeta de la Unidad 3 en el repositorio de material (rama main). */
const U3_BLOB = `${MATERIAL_REPO.url}/blob/main/unidad-3`;
const U3_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-3`;

export default {
  id: 'u03',
  numero: 3,
  titulo: 'Desarrollo asistido por IA: generación, refactorización y documentación',
  tituloCorto: 'Generar, refactorizar y documentar',
  descripcionBreve: 'Pasos chicos, refactor con red de tests y tu primera Skill para documentar.',
  dia: 2,
  bloque: 'mañana',
  nivel: '20 → 30',

  foco: 'Construir en pasos chicos, ordenar código heredado con una red de tests y crear una Skill que documente, siempre leyendo, ejecutando y pidiendo explicaciones.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Generar código en pasos chicos: una tarea, un incremento, un commit.',
    'Refactorizar con una red de tests y volver atrás con git o `/rewind` si algo se rompe.',
    'Crear una Skill (`SKILL.md`) que Claude active sola cuando corresponde.',
    'Desconfiar y verificar: leer, ejecutar y pedir que el agente explique sus decisiones.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['ASP.NET Core (.NET 10)', 'Rider', 'xUnit', 'Claude Code'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 3',
      texto: 'En el receso, pídele a Claude Code que traiga solo lo nuevo: las carpetas Lineas y Clientes con sus tests y dos plantillas. Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U3_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'SDK de .NET 10 y Claude Code 2.1.277 o superior',
      texto: 'Verifica con `dotnet --version` (debe empezar con 10) y con `claude --version`.',
      enlace: { titulo: 'Descargar el SDK de .NET 10 (sitio oficial)', url: 'https://dotnet.microsoft.com/en-us/download/dotnet/10.0' },
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Pasos chicos: el commit gigante frente a tres commits chicos (TodoMini)', minutos: 15 },
    { titulo: 'C2 · Red de tests: refactor con red de `ResumenTexto()` (TodoMini)', minutos: 18 },
    { titulo: 'C3 · Skills: mi primera Skill (TodoMini) y recorrido por `planificador-proyectos-web`', minutos: 25 },
    { titulo: 'C4 · Desconfía y verifica: tres verbos y el modelo según la tarea', minutos: 12 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'skill-md',
        titulo: 'SKILL.md: estructura de una Skill',
        resumen: 'Una carpeta con `SKILL.md` (frontmatter `name` y `description`) más instrucciones y archivos de apoyo.',
        explicacion: [
          'Una Skill es una carpeta con un archivo `SKILL.md`. El frontmatter lleva `name` y `description`; el cuerpo, las instrucciones. Puede incluir `references/`, `scripts/` y `assets/`.',
          'En Claude Code vive en `.claude/skills/<nombre>/` y Claude la activa sola cuando el pedido calza con su `description`. Por eso la `description` es lo más importante: dice qué hace y cuándo usarla, con lo clave primero. Si la Skill no se activa sin nombrarla, el problema está ahí.',
          'Si la `description` lleva dos puntos, ponla entre comillas para que el frontmatter se lea bien. `AGENTS.md` lleva las reglas que aplican **siempre**; la Skill lleva un **procedimiento** que se usa solo cuando corresponde.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/skills/documentar-modulo/SKILL.md',
          contenido: `---
name: documentar-modulo
description: "Documenta un módulo del proyecto: propósito, API pública y ejemplo de uso. Úsala cuando pidan documentar, explicar o dejar por escrito un módulo o servicio."
---

# Documentar un módulo

1. Lee el código del módulo y sus tests.
2. Escribe la documentación en docs/modulos/<Modulo>.md.
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
          'Claude Code además guarda puntos de control de sus ediciones (checkpointing), y con `/rewind` puedes volver la conversación y el código a un punto anterior.',
          'Regla del taller: ejecuta los tests después de cada paso. Si se rompen, vuelves atrás antes de seguir; nunca "arreglas encima".',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Ciclo de refactor con red',
          contenido: `dotnet test            # 1. todo en verde antes de empezar
# 2. un cambio chico con Claude
dotnet test            # 3. ¿sigue en verde?
git commit -am "refactor: renombra variables de ResumenTexto"
# si falló: git restore . (o /rewind en Claude Code)`,
        },
        nota: '**Implementación de Claude Code:** checkpointing y `/rewind` son funciones propias de Claude Code; git es la red universal.',
        fuente: DOCS.checkpointing,
      },
      {
        slug: 'contexto-preciso',
        titulo: 'Contexto preciso con @, errores e imágenes',
        resumen: 'Menciona archivos con `@`, pega el error completo o adjunta el mockup.',
        explicacion: [
          'La generación incremental funciona mejor con contexto preciso: mencionar archivos con `@`, pegar el error tal cual o adjuntar una imagen del mockup. Pide un paso a la vez y di qué no debe tocar.',
          'Las convenciones fijas del proyecto se declaran en `AGENTS.md`, para no repetirlas en cada pedido.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Pedido incremental',
          contenido: 'Lee @src/TodoMini/TareaService.cs. Solo el paso 1: agrega a Tarea una lista de etiquetas con sus tests. No toques TareaService todavía. Corre dotnet test al terminar.',
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
          'Pedir una tarea a la vez produce diffs que se pueden revisar. Un pedido gigante produce un diff que nadie revisa de verdad: si no puedes revisarlo en 5 minutos, el paso es demasiado grande.',
          'En la demo, sobre TodoMini, se agregan etiquetas a las tareas en un solo pedido y luego en tres incrementos (etiquetas en `Tarea`, `Etiquetar(id, etiqueta)` y `ListarPorEtiqueta(etiqueta)`), con tests y commit en cada uno. El curso vota cuál diff revisaría en 5 minutos.',
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
          'Refactorizar es cambiar la forma sin cambiar el comportamiento. El ciclo seguro: tests en verde, un cambio chico, tests de nuevo; en verde se hace commit, en rojo se vuelve atrás.',
          'En la demo, sobre el método heredado `ResumenTexto()` de TodoMini (nombres pobres y un recorrido duplicado), Claude escribe primero tests de caracterización y refactoriza en dos pasos chicos. Después se introduce un error a propósito y un test lo atrapa.',
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
          'Una Skill empaqueta un procedimiento repetible (documentar, revisar, planificar) para que el equipo lo haga siempre igual. En la demo creas la Skill `escribir-readme` en TodoMini y pides un README sin nombrarla: el resultado incluye las etiquetas y el `ResumenTexto()` ordenado.',
          'Ejemplo real del instructor: `planificador-proyectos-web` planifica y documenta un proyecto web antes de programar, combinando SDD con prácticas de Scrum. Tiene un `SKILL.md` breve, guías en `references/`, plantillas en `assets/` y un validador en `scripts/`.',
          'Genera además un `.claude/settings.json` que bloquea editar los documentos inmutables y, en APIs con base de datos, los comandos contra bases remotas. Se instala copiando su carpeta a `.claude/skills/` y se invoca con `/planificador-proyectos-web`.',
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
        nota: '**Estándar abierto:** Agent Skills define la carpeta, `SKILL.md` y la carga progresiva. **Implementación de Claude Code:** instalación en `.claude/skills/` e invocación con `/planificador-proyectos-web`.',
        fuente: BIBLIO.planificador,
      },
      {
        slug: 'desconfia-y-verifica',
        titulo: 'Desconfía y verifica',
        resumen: 'Lee, ejecuta y pide que explique.',
        explicacion: [
          'Tres verbos antes de aceptar: **leer** el diff completo, **ejecutar** los tests y la app, y **preguntar** al agente: "¿por qué elegiste esto?" o "¿qué caso borde no cubriste?".',
          'La documentación generada (README, diagramas) también se verifica contra el código.',
          'El modelo se elige según la tarea: uno rápido para tareas acotadas y uno más capaz para cambios amplios o ambiguos. Se cambia con `/model` y el consumo se ve con `/usage`. Práctica sugerida para la casa: el mismo pedido con dos modelos.',
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
    caso: 'Sprint 2 de **pedidos-web**. Los vendedores necesitan ver el **detalle de un pedido**: cliente, líneas, total y estado.',
    problematica: 'En el repo hay un módulo heredado, `ClientesService`, que funciona y tiene 4 tests, pero nadie se atreve a tocarlo ni lo ha documentado: un método `proc2()`, nombres pobres y código repetido.',
    objetivo: 'Construir algo nuevo en pasos chicos, ordenar un módulo heredado sin cambiar su comportamiento y dejar explicado lo que tocaste con una Skill que Claude active sola.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Tu misión en el sprint 2 de pedidos-web tiene tres etapas. Construir: los vendedores necesitan ver el detalle de un pedido (cliente, líneas, total y estado) y lo implementas en al menos 3 incrementos, cada uno con sus tests y su commit. Ordenar: `ClientesService` es un módulo heredado que nadie se atreve a tocar; lo dejas legible sin cambiar lo que hace, con sus 4 tests como red. Explicar: creas la Skill `documentar-modulo` y la usas, sin nombrarla, para dejar documentado ese servicio. En las tres etapas lees, ejecutas y pides explicaciones. En el receso traes a tu repo solo lo nuevo de la Unidad 3. El paso a paso está en la guía.',
    pasos: [
      { minutos: 30, texto: 'Construir: escribe una spec breve con la plantilla y arma el detalle del pedido en 3 incrementos, cada uno con sus tests y su commit. La ruta nueva es `/api/pedidos/{id}/detalle`; `/api/pedidos/{id}` no se toca.', conceptos: ['C1', 'C4'] },
      { minutos: 20, texto: 'Ordenar: refactoriza `ClientesService` en pasos chicos, sin cambiar lo que hace. Sus 4 tests son la red.', conceptos: ['C2', 'C4'] },
      { minutos: 20, texto: 'Explicar: crea la Skill `documentar-modulo` desde la plantilla y úsala, sin nombrarla, para documentar `ClientesService`.', conceptos: ['C3', 'C4'] },
      { minutos: 10, texto: 'Cierre: dos personas muestran su Skill y explican su `description` en una frase.', conceptos: [] },
    ],
    puntosControl: [
      '3 commits o más y el detalle del pedido 8 se ve en el navegador (etapa 1).',
      'Los 4 tests de `ClientesService` siguen en verde (etapa 2).',
    ],
    resultadoEsperado: [
      'Cada incremento se revisa en 5 minutos y deja los tests en verde.',
      'En el refactor, si cambió el comportamiento, no es un refactor.',
      'Tu Skill funciona solo si Claude la activa **sin que la nombres**. Si no se activa, el problema está en la `description`.',
      'La documentación generada tiene que coincidir con el código. Revísala.',
    ],
    siTeTrabas: [
      'Para los pasos chicos, *Best practices* de Claude Code.',
      'Para el refactor, la sección "Refactor code" de *Common workflows*.',
      'Para la estructura y el frontmatter de `SKILL.md`, la documentación de Skills y la lección "Creating your first skill".',
      'Como modelo de una Skill bien construida, el `SKILL.md` del planificador.',
    ],
    erroresFrecuentes: [
      'El cambio salió gigante → vuelve atrás y pídele solo el incremento 1, diciendo qué no tocar.',
      'Tests rojos tras el refactor → no le pidas que lo arregle encima: vuelve al último verde y da un paso más chico.',
      'La Skill no se activa → mejora la `description` con palabras de un pedido real; mientras, invócala por su nombre.',
      'Te trabaste en la spec → pídele a Claude que copie la spec de la carpeta `u3-respaldo` del repo de material.',
      'Falla .NET o la red → trabaja en pareja; cada uno entrega su propia Skill.',
    ],
    planB: [
      'Carpeta `unidad-3/taller/u3-respaldo` del repo de material (no es una rama), con una spec de referencia de la HU-02, para quien se trabe en la etapa 1.',
      'Si la Skill no se activa, invocarla con `/documentar-modulo` mientras se mejora la `description`.',
      'Si falla .NET o la red, trabajo en pareja.',
    ],
    extension: 'Agregar `allowed-tools` a la Skill.',
  },

  material: [
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Módulo funcional y documentado"', archivo: 'assets/material/u03/guia-taller.pdf', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U3)', descripcion: 'El README explica qué traer a tu repo (camino A).', url: `${U3_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Spec de respaldo (plan B)', descripcion: 'Una spec de referencia de la HU-02, si te trabas en la etapa 1.', url: `${U3_TREE}/taller/u3-respaldo`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: TodoMini', descripcion: 'Etiquetas, refactor de `ResumenTexto()` y la Skill escribir-readme.', url: `${U3_TREE}/demos`, disponible: true },
    { tipo: 'enlace', titulo: 'Skill de la demo: escribir-readme', descripcion: 'El `SKILL.md` que se crea en clase.', url: `${U3_BLOB}/demos/escribir-readme/SKILL.md`, disponible: true },
    { tipo: 'enlace', titulo: BIBLIO.planificador.titulo, descripcion: 'Una Skill profesional: `SKILL.md`, `references/`, `assets/` y `scripts/`.', url: BIBLIO.planificador.url, disponible: true },
  ],

  videos: [
    academyVideo('agentSkills', 'Curso completo; incluye la lección "Creating your first skill".'),
    academyVideo('claudeCodeInAction', 'Rewind y sesiones de trabajo.'),
    academyVideo('aiFluencyBuilders', 'Lección "Discernment for code".'),
  ],

  paraInvestigar: [
    'Refactorización arquitectónica: separación de capas e inversión de dependencias.',
    'Skills avanzadas: `allowed-tools`, divulgación progresiva y scripts dentro de la Skill.',
    'Comandos personalizados y estilos de salida de Claude Code.',
    'Probar interfaces web con Claude in Chrome.',
    'El curso *Introduction to agent skills* y la guía *Common workflows*.',
    'Instalar `planificador-proyectos-web` y usarlo en un proyecto personal.',
  ],

  entregable: {
    nombre: 'Módulo funcional desarrollado y documentado con IA',
    criterios: [
      'Detalle del pedido con tests, en 3 commits o más.',
      '`ClientesService` refactorizado con sus 4 tests en verde.',
      'Skill `documentar-modulo` que se activa sin nombrarla.',
      '`docs/modulos/ClientesService.md` verificado contra el código.',
    ],
    alimentaA: 'u04',
  },
};
