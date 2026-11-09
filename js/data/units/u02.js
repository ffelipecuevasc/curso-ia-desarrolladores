/**
 * Unidad 2 · Fuente: fuentes/unidades/unidad-02.md
 */
import { ACADEMY_COURSES, BIBLIO, DOCS, MATERIAL_REPO, STANDARDS, academyVideo } from '../links.js';

/** Carpeta de la Unidad 2 en el repositorio de material (rama main). */
const U2_BLOB = `${MATERIAL_REPO.url}/blob/main/unidad-2`;
const U2_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-2`;

export default {
  id: 'u02',
  numero: 2,
  titulo: 'Desarrollo agéntico y desarrollo guiado por especificaciones (Spec-Driven Development)',
  tituloCorto: 'Desarrollo agéntico y SDD',
  descripcionBreve: 'El ciclo del agente, el contexto como decisión y SDD: de la historia vaga a la spec verificable.',
  dia: 1,
  bloque: 'tarde',
  nivel: '10 → 20',

  foco: 'Convertir una historia vaga en una spec verificable, llevarla a un plan aprobado en plan mode, implementar con Claude Code y entregar solo lo que pasó tu revisión.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Usar el ciclo del agente (reunir contexto → actuar → verificar) y sus modos de permiso, incluido plan mode.',
    'Decidir qué sabe el agente con `AGENTS.md` y administrar la ventana de contexto.',
    'Escribir la spec primero: `intent.md` → `spec.md` → `plan.md` → `tasks.md`.',
    'Revisar el diff con una checklist antes de hacer commit: tú firmas.',
  ],
  licencias: ['Claude Team Standard'],
  herramientas: ['ASP.NET Core (.NET 10)', 'Rider', 'xUnit', 'Claude Code'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web actualizado con la base de la Unidad 2',
      texto: 'Sigue el camino A del README: copia solo lo nuevo de la U2 sobre tu repo de la U1 y haz commit. Lo necesitas en el paso 1.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U2_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'SDK de .NET 10 y Claude Code 2.1.277 o superior',
      texto: 'Verifica con `dotnet --version` (debe empezar con 10) y con `claude --version`.',
      enlace: { titulo: 'Descargar el SDK de .NET 10 (sitio oficial)', url: 'https://dotnet.microsoft.com/en-us/download/dotnet/10.0' },
    },
    {
      titulo: 'Lee agents.md (3 min)',
      texto: 'En el paso 1 escribes tu propio `AGENTS.md`: conviene saber qué lleva.',
      enlace: STANDARDS.agentsMd,
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 5 },
    { titulo: 'C1 · Agente: ciclo, herramientas y modos de permiso (demo plan mode)', minutos: 15 },
    { titulo: 'C2 · Contexto: `AGENTS.md`, `/context`, `/compact` y `/clear`', minutos: 15 },
    { titulo: 'C3 · Spec primero: artefactos SDD y plantilla de spec comentada', minutos: 25 },
    { titulo: 'C4 · Tú firmas: checklist de revisión de diff ("Caza el error")', minutos: 15 },
    { titulo: 'Cierre y temas para investigar', minutos: 10 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'plan-mode',
        titulo: 'Plan mode',
        resumen: 'Claude explora y propone un plan, pero no edita tus archivos hasta que lo apruebes.',
        explicacion: [
          'En plan mode, Claude explora y propone un plan, pero no edita tus archivos hasta que lo apruebes. Es el lugar ideal para cuestionar el enfoque antes de que se toque una línea.',
          'Se activa al iniciar con `claude --permission-mode plan` o, dentro de una sesión, con `Shift+Tab`, que recorre auto → manual → accept edits → plan. Cuando la barra de estado muestre «⏸ plan mode on», estás en plan mode.',
          'En el taller abres Claude Code en plan mode, pides el plan, lo cuestionas, lo apruebas y lo guardas como `specs/HU-01-listar-pedidos/plan.md`. Si Claude implementa algo que no estaba en el plan ni en la spec, es un hallazgo de revisión.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Iniciar en plan mode',
          contenido: `claude --permission-mode plan

# Luego, dentro de la sesión:
# "Lee @specs/HU-01-listar-pedidos/spec.md y el AGENTS.md.
#  Propón un plan para implementarla: enfoque, archivos afectados,
#  riesgos y pasos. Incluye un test xUnit por cada criterio de aceptación.
#  No escribas código todavía."`,
        },
        nota: '**Implementación de Claude Code:** plan mode es un modo de permiso propio de Claude Code; no forma parte de un estándar abierto.',
        fuente: DOCS.permissionModes,
      },
      {
        slug: 'spec-md',
        titulo: 'spec.md con criterios de aceptación verificables',
        resumen: 'La especificación es el artefacto principal y contiene sus propios criterios de verificación.',
        explicacion: [
          'En SDD los artefactos encadenan el trabajo: `intent.md` (para qué), `spec.md` (qué, con reglas y ejemplos), `plan.md` (cómo) y `tasks.md` (pasos). La spec es el artefacto principal.',
          'Un buen criterio de aceptación es verificable: alguien más podría escribir el test sin preguntarte nada. "Funciona bien" no es un criterio; "si la fecha desde es mayor que la fecha hasta, responde 400" sí lo es.',
          'El prompt maestro del taller te ahorra el formato, no las decisiones: tú decides los estados, la validación de fechas, la paginación y los errores.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'spec.md de TiendaMini (extracto de la demo)',
          contenido: `**CA-08 — Cupón en primera compra, bajo el umbral**
- **Dado** un cliente con 0 pedidos pagados y un carrito con subtotal $33.480
- **Cuando** aplica el cupón \`BIENVENIDA10\`
- **Entonces** \`descuento\` 3348, \`despacho\` 3990 y \`total\` 34122.

**CA-13 — Cupón inexistente**
- **Dado** cualquier cliente con un carrito con subtotal $33.480
- **Cuando** aplica el cupón \`DESCUENTO50\`
- **Entonces** la respuesta es 422 con \`codigo\` \`CUPON_INVALIDO\`. El carrito no cambia.`,
        },
        nota: 'TiendaMini es otro proyecto (int y HTTP 422). En tu pedidos-web esas decisiones las tomas tú en tu AGENTS.md y tu spec.',
        fuente: BIBLIO.martinelli,
      },
      {
        slug: 'gestion-contexto',
        titulo: '/context, /compact y /clear',
        resumen: 'Mira cuánto pesa cada cosa en la ventana de contexto y libera espacio cuando haga falta.',
        explicacion: [
          'La ventana de contexto es finita. `/context` muestra cuánto ocupa cada elemento (instrucciones, archivos, conversación), así puedes decidir qué sobra.',
          '`/compact` resume la conversación para liberar espacio sin perder el hilo, y `/clear` empieza de cero cuando cambias de tarea.',
          'En la demo de la unidad se hace el mismo pedido con y sin `AGENTS.md`, y se usa `/context` para ver el peso de cada cosa.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Comandos dentro de Claude Code',
          contenido: `/context   # ¿qué ocupa la ventana de contexto?
/compact   # resume la conversación y libera espacio
/clear     # empieza una conversación nueva`,
        },
        nota: '**Implementación de Claude Code:** estos comandos son propios de Claude Code.',
        fuente: DOCS.contextWindow,
      },
    ],
    fundamentales: [
      {
        slug: 'agente',
        titulo: 'Agente: piensa, actúa, verifica',
        resumen: 'De la ingeniería de prompts a la ingeniería de contexto.',
        explicacion: [
          'El ciclo del agente es reunir contexto → actuar → verificar. Sus herramientas básicas son leer, editar y ejecutar.',
          'Los modos de permiso definen cuánta autonomía tiene: manual (te pregunta antes de actuar), accept edits (acepta las ediciones de archivos), plan mode (propone sin editar) y auto mode (un clasificador revisa las acciones en tu lugar). Desde la versión 2.1.283 la sesión parte en auto mode. Elegir el modo es parte del trabajo del desarrollador.',
          'En la demo "Plan mode en vivo", sobre la app ficticia TodoMini, Claude propone un plan para agregar "fecha de vencimiento"; el curso lo critica, se corrige y recién entonces se ejecuta.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.bestPractices,
      },
      {
        slug: 'contexto',
        titulo: 'Contexto: lo que el agente sabe, tú lo decides',
        resumen: '`AGENTS.md` es la memoria del proyecto: comandos, estilo y reglas que no puede adivinar.',
        explicacion: [
          'El agente solo sabe lo que está en su contexto. `AGENTS.md` le entrega, en cada sesión, los comandos, el estilo y las reglas del proyecto. Tu `AGENTS.md` viene vacío: lo escribes tú en el paso 1.',
          'Recordatorio de la Unidad 1: Claude Code (≥ 2.1.277) lee `AGENTS.md` solo si no existe un `CLAUDE.md`. No ejecutes `/init` en tu `pedidos-web`: crea un `CLAUDE.md` y Claude Code deja de leer tu `AGENTS.md`.',
        ],
        ejemplo: null,
        nota: '**Estándar abierto:** `AGENTS.md`. **Implementación de Claude:** `CLAUDE.md` y los comandos de contexto de Claude Code.',
        fuente: STANDARDS.agentsMd,
      },
      {
        slug: 'spec-primero',
        titulo: 'Spec primero',
        resumen: 'Primero el qué, luego el cómo.',
        explicacion: [
          'Si le entregas al agente una historia vaga, inventará las reglas por su cuenta. En la demo "Prompt suelto frente a spec" (tienda ficticia TiendaMini), el mismo carrito con descuentos sale muy distinto con una frase que con un `spec.md` con ejemplos de entrada y salida.',
          'Conexión con Scrum: cada historia del sprint tiene su `spec.md`.',
        ],
        ejemplo: null,
        nota: '',
        fuente: { titulo: 'AI-native SDLC playbook (Anthropic Academy)', url: ACADEMY_COURSES.aiNativeSdlc.url },
      },
      {
        slug: 'tu-firmas',
        titulo: 'Tú firmas',
        resumen: 'Si no leíste el diff, no hay commit.',
        explicacion: [
          'El desarrollador pasa a ser arquitecto y revisor. Antes de cada commit revisas el diff con una checklist: ¿cumple la spec?, ¿los tests prueban algo real?, ¿hay casos borde?, ¿hay secretos?, ¿cambió algo que no pedí?',
          'En la actividad "Caza el error en el diff" se proyecta un diff con tres problemas plantados: un caso borde sin cubrir, una API key en el código y un test que siempre pasa.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'Checklist de revisión de diff',
          contenido: `- [ ] ¿Cumple la spec?
- [ ] ¿Los tests prueban algo real?
- [ ] ¿Hay casos borde sin cubrir?
- [ ] ¿Hay secretos en el código?
- [ ] ¿Cambió algo que no pedí?`,
        },
        nota: '',
        fuente: DOCS.bestPractices,
      },
    ],
  },

  laboratorio: {
    nombre: 'Mi primera feature guiada por spec',
    modalidad: 'Individual',
    duracion: 80,
    caso: 'Primer sprint del **portal web de Pedidos**: los vendedores necesitan consultar pedidos desde el navegador, sin entrar al sistema Delphi. Se construye una API nueva en ASP.NET Core, con datos de ejemplo en memoria.',
    problematica: 'La historia del backlog, "Como vendedor, quiero listar pedidos filtrando por cliente, estado y rango de fechas", es vaga: no dice qué estados existen, qué pasa si las fechas vienen invertidas ni cuántos resultados se devuelven.',
    objetivo: 'Hacer de PO y Dev en un mini sprint: convertir la historia en una spec verificable, llevarla a un plan aprobado, implementar con Claude Code y entregar solo lo que pasó tu revisión.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Arranca el primer sprint del portal web de Pedidos: una API en ASP.NET Core para que los vendedores consulten pedidos desde el navegador. La historia del backlog es vaga: no dice qué estados existen, qué pasa si las fechas vienen invertidas ni cuántos resultados se devuelven. En 80 minutos haces de PO y Dev: con el prompt maestro Claude te entrevista y genera tu `AGENTS.md` y un borrador de `spec.md`; tú completas la spec con al menos 5 criterios de aceptación verificables, apruebas el plan en plan mode, implementas en accept edits con tests xUnit sobre la lógica de Core (uno por criterio) y revisas el diff antes del commit. Todo el paso a paso está en la guía.',
    pasos: [
      { minutos: 10, texto: 'Ejecutar el **prompt maestro**. Claude te entrevista y genera tu `AGENTS.md` (viene vacío) y un borrador de `spec.md`, con secciones `TODO`.', conceptos: ['C2', 'C3'] },
      { minutos: 15, texto: 'Completar la spec **tú mismo**: decidir los estados, la validación de fechas, la paginación y los errores. Escribir al menos 5 criterios de aceptación verificables.', conceptos: ['C3'] },
      { minutos: 15, texto: 'Abrir Claude Code en **plan mode**, pedir el plan, cuestionarlo y aprobarlo. Guardarlo como `specs/HU-01-listar-pedidos/plan.md`.', conceptos: ['C1', 'C3'] },
      { minutos: 25, texto: 'En **accept edits**, implementar y generar tests xUnit sobre la lógica de Core, uno por criterio. Ejecutar `dotnet test`.', conceptos: ['C1'] },
      { minutos: 10, texto: 'Revisar el diff con la checklist de C4, corregir y hacer commit.', conceptos: ['C4'] },
      { minutos: 5, texto: 'Cierre: tres alumnos muestran un criterio de su spec y el test que lo prueba.', conceptos: [] },
    ],
    puntosControl: ['El instructor revisa un criterio de aceptación por fila (paso 2).'],
    resultadoEsperado: [
      'El prompt maestro te ahorra escribir el formato, no las decisiones.',
      'Una buena spec permite que otra persona escriba los tests sin preguntarte nada.',
      'Si Claude implementa algo que no está en la spec, eso es un hallazgo de revisión, no un regalo.',
    ],
    siTeTrabas: [
      'Para los criterios de aceptación, la plantilla de spec comentada de la clase.',
      'Para el plan, la lección de plan mode del AI-native SDLC playbook.',
      'Para estructurar el `AGENTS.md`, agents.md.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Carpeta `unidad-2/taller/u2-respaldo` del repo de material (no es una rama), con el `spec.md` ya escrito, para quien se atrase en el paso 2.',
      'Si falla la red, el instructor proyecta la sesión y los alumnos revisan el diff entregado.',
    ],
    extension: 'Agregar un criterio nuevo a la spec y verificar que Claude lo implemente con su test o con tests HTTP del endpoint.',
  },

  material: [
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Prompt maestro del taller', descripcion: 'Lo pegas en Claude Code en el paso 1.', url: `${U2_BLOB}/taller/prompt-maestro.md`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Plantilla de spec comentada', descripcion: 'Cada sección trae una guía con ejemplo bueno y malo.', url: `${U2_BLOB}/demos/tiendamini/plantillas/spec-plantilla-comentada.md`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demo TiendaMini: spec con 14 criterios y trazabilidad', descripcion: 'De la spec al plan, las tareas y los tests.', url: `${U2_TREE}/demos/tiendamini`, disponible: true },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Mi primera feature guiada por spec"', archivo: 'assets/material/u02/guia-taller.pdf', disponible: true },
    { tipo: 'png', titulo: 'Infografía de la unidad', archivo: 'assets/material/u02/infografia.png', disponible: false },
  ],

  videos: [
    academyVideo('claudeCode101', 'Lecciones "How Claude Code works", "The CLAUDE.md file" y el flujo explore → plan → code → commit.'),
    academyVideo('claudeCodeInAction', 'Sesiones largas y modos de permiso.'),
    academyVideo('aiNativeSdlc', 'Lecciones sobre `intent.md`, requisitos y plan mode.'),
  ],

  paraInvestigar: [
    'Estándar `AGENTS.md`, su adopción en otros agentes y cómo convive con `CLAUDE.md` en Claude Code.',
    'Frameworks de SDD de terceros (GitHub Spec Kit): enfoque y diferencias con el flujo nativo.',
    'Subagentes incorporados (Explore, Plan).',
    'Claude Code en la web y control remoto.',
    'MCP, solo como concepto (se trabaja en la Unidad 9).',
    'Libros: Osmani, *Beyond Vibe Coding* (O’Reilly, 2025) y Martinelli, *Spec-Driven Development* (Apress, 2026).',
  ],

  entregable: {
    nombre: 'Flujo completo guiado por especificación',
    criterios: [
      '`AGENTS.md` y `spec.md` con al menos 5 criterios de aceptación verificables.',
      '`plan.md` aprobado en plan mode.',
      'Código con tests xUnit, uno por criterio, en verde.',
      'Commit hecho después de revisar el diff con la checklist.',
    ],
    alimentaA: 'u03',
  },
};
