/**
 * Unidad 2 · Fuente: fuentes/unidades/unidad-02.md
 */
import { ACADEMY_CATALOG, BIBLIO, DOCS, STANDARDS, academyVideo } from '../links.js';

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
  requisitos: [],
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
        resumen: 'Modo de solo lectura: Claude investiga y propone un plan, pero no edita hasta que apruebes.',
        explicacion: [
          'En plan mode, Claude lee archivos y propone un plan, pero no hace ediciones hasta que tú lo apruebas. Es el lugar ideal para cuestionar el enfoque antes de que se toque una línea.',
          'Se activa al iniciar con `claude --permission-mode plan` o, dentro de una sesión, presionando `Shift+Tab` hasta que la barra de estado muestre plan mode activo.',
          'En el taller abres Claude Code en plan mode, pides el plan, lo cuestionas, lo apruebas y lo guardas como `plan.md`. Si Claude implementa algo que no estaba en el plan ni en la spec, es un hallazgo de revisión.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'bash',
          titulo: 'Iniciar en plan mode',
          contenido: `claude --permission-mode plan

# Luego, dentro de la sesión:
# "Lee spec.md y propone un plan para implementar el listado de pedidos.
#  No edites nada todavía."`,
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
          titulo: 'spec.md de TiendaMini (extracto, ejemplo de la demo)',
          contenido: `## Criterios de aceptación: carrito con descuentos
- CA1: Un carrito vacío tiene total 0.
- CA2: El cupón DESC10 descuenta el 10 % del subtotal, una sola vez.
- CA3: Un cupón vencido se rechaza con el mensaje "Cupón vencido".
- CA4: El total nunca es negativo.

## Ejemplos
| Subtotal | Cupón  | Total |
|---------:|--------|------:|
|   10.000 | DESC10 | 9.000 |
|        0 | DESC10 |     0 |`,
        },
        nota: '',
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
          'Los modos de permiso definen cuánta autonomía tiene: aprobación manual, auto-aceptar ediciones y plan mode (solo lectura). Elegir el modo es parte del trabajo del desarrollador.',
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
          'El agente solo sabe lo que está en su contexto. `AGENTS.md` le entrega, en cada sesión, los comandos, el estilo y las reglas del proyecto.',
          'Recordatorio de la Unidad 1: Claude Code (≥ 2.1.277) lee `AGENTS.md` solo si no existe un `CLAUDE.md`. Ojo con `/init`: podría generar un `CLAUDE.md` y desactivar tu `AGENTS.md`.',
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
        fuente: { titulo: 'AI-native SDLC playbook (Anthropic Academy)', url: ACADEMY_CATALOG },
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
    pasos: [
      { minutos: 10, texto: 'Ejecutar el **prompt maestro** entregado. Claude te entrevista y genera borradores de `AGENTS.md` y `spec.md` con secciones `TODO`.', conceptos: ['C2', 'C3'] },
      { minutos: 15, texto: 'Completar la spec **tú mismo**: decidir los estados, la validación de fechas, la paginación y los errores. Escribir al menos 5 criterios de aceptación verificables.', conceptos: ['C3'] },
      { minutos: 15, texto: 'Abrir Claude Code en **plan mode**, pedir el plan, cuestionarlo y aprobarlo. Guardarlo como `plan.md`.', conceptos: ['C1', 'C3'] },
      { minutos: 25, texto: 'Implementar y generar tests xUnit, uno por criterio. Ejecutar `dotnet test`.', conceptos: ['C1'] },
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
      'Para los criterios de aceptación, la plantilla de spec comentada de la cátedra.',
      'Para el plan, la lección de plan mode del AI-native SDLC playbook.',
      'Para estructurar el `AGENTS.md`, agents.md.',
    ],
    erroresFrecuentes: [], // TODO: el archivo fuente no trae una lista de errores frecuentes
    planB: [
      'Rama `u2-respaldo` con el `spec.md` ya escrito, para quien se atrase en el paso 2.',
      'Si falla la red, el instructor proyecta la sesión y los alumnos revisan el diff entregado.',
    ],
    extension: 'Agregar un criterio nuevo a la spec y verificar que Claude lo implemente con su test.',
  },

  material: [
    { tipo: 'pdf', titulo: 'Plantilla de spec comentada', archivo: 'assets/material/u02/plantilla-spec-comentada.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Prompt maestro del taller', archivo: 'assets/material/u02/prompt-maestro.pdf', disponible: false },
    { tipo: 'pdf', titulo: 'Guía del taller "Mi primera feature guiada por spec"', archivo: 'assets/material/u02/guia-taller.pdf', disponible: false },
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
