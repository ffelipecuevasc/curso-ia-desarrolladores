/**
 * Unidad 7 · Fuente: fuentes/unidades/unidad-07.md (versión 2, 11-nov-2026)
 */
import { DOCS, MATERIAL_REPO, STANDARDS, academyVideo } from '../links.js';

/** Carpeta de la Unidad 7 en el repositorio de material (rama main). */
const U7_TREE = `${MATERIAL_REPO.url}/tree/main/unidad-7`;

export default {
  id: 'u07',
  numero: 7,
  titulo: 'IA para revisión de código (code review), colaboración e ingeniería de software',
  tituloCorto: 'Code review con IA',
  descripcionBreve: 'PR chicos, reglas escritas y revisores de IA que comentan; tú decides cada hallazgo.',
  dia: 4,
  bloque: 'mañana',
  nivel: '70 → 80',

  foco: 'Que cada cambio llegue a `main` revisado con reglas escritas, por la IA y por una persona: PR chicos, un revisor que sigue tus reglas y tú decidiendo cada hallazgo.',
  // Objetivos derivados de los conceptos C1–C4 del archivo fuente.
  objetivos: [
    'Preparar PR chicos: un propósito, commits legibles y una descripción con qué, por qué y cómo probarlo.',
    'Evaluar cada hallazgo de la IA: aceptar, discutir o descartar con argumento.',
    'Escribir las reglas de revisión en `REVIEW.md` y las del proyecto en `AGENTS.md`.',
    'Versionar `.claude/` y los workflows para que todo el equipo revise igual.',
  ],
  licencias: ['Claude Pro (incluye Claude Code)', 'GitHub gratis con repo público'],
  herramientas: ['.NET 10', 'Rider', 'GitHub (pull requests)', '`claude-code-action`', '`/code-review`', 'Subagentes de Claude Code'],
  requisitos: [
    {
      titulo: 'Tu pedidos-web con lo nuevo de la Unidad 7',
      texto: 'En el receso, Claude Code trae `specs/HU-03-pedidos-por-fecha/` y `docs/checklist-revision.md`. Se suma; no reemplaza nada tuyo.',
      enlace: { titulo: 'README de pedidos-web (camino A)', url: `${U7_TREE}/taller/pedidos-web` },
    },
    {
      titulo: 'La U6 terminada',
      texto: 'Con `ci.yml`, `claude.yml` y el secreto `CLAUDE_CODE_OAUTH_TOKEN` guardado en tu repo público.',
    },
    {
      titulo: 'Claude Code 2.1.277 o superior',
      texto: 'Verifica con `claude --version`. Si es menor, `claude update`.',
    },
  ],
  pendientes: [],
  catedra: [
    { titulo: 'Apertura: conceptos fundamentales y material oficial', minutos: 4 },
    { titulo: 'C1 · PR chico: demo «Un PR que se puede revisar» (arriendo-web)', minutos: 13 },
    { titulo: 'C2 · La IA comenta, tú decides: demo «La IA comenta, tú decides» (arriendo-web)', minutos: 14 },
    { titulo: 'C3 · Reglas escritas: demo «Reglas escritas y tu revisor» (arriendo-web)', minutos: 16 },
    { titulo: 'C4 · Configuración compartida: `.claude/` versionada', minutos: 6 },
    { titulo: 'Repaso antes del receso', minutos: 3 },
  ],

  conceptos: {
    obligatorios: [
      {
        slug: 'review-md',
        titulo: 'REVIEW.md: reglas solo de revisión',
        resumen: 'Qué es Importante, el tope de detalles, qué no reportar y qué revisar siempre.',
        explicacion: [
          '`AGENTS.md` lleva las reglas del proyecto para todo trabajo: generar, refactorizar y revisar. `REVIEW.md` lleva reglas **solo de revisión**: qué es importante y qué se ignora, el tope de detalles y los chequeos obligatorios. Regla práctica: si aplica también al escribir código, va en `AGENTS.md`; si solo cambia cómo se revisa, va en `REVIEW.md`.',
          'Las mismas 4 secciones sirven para nuestro revisor. El servicio gestionado de Anthropic clasifica los hallazgos como Importante y Detalle (*nit*); la presentación suma Preexistente (lo que no trajo este PR), que no está confirmado en la documentación.',
          'El `/code-review` local **no** lee `REVIEW.md`. Nuestro subagente y nuestro workflow sí, porque se lo indicamos explícitamente en su configuración (documentación consultada el 11-nov-2026).',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'REVIEW.md',
          contenido: `# Instrucciones de revisión

## 1 · Qué es Importante aquí
Lo que rompe el comportamiento, filtra datos o impide volver atrás.
El estilo es Detalle.

## 2 · Tope de detalles
Máximo 5 detalles por revisión.

## 3 · No reportar
Lo que valida el CI · archivos generados.

## 4 · Revisar siempre
- Endpoints nuevos con test.
- Sin datos personales en logs.
- Consultas filtradas por usuario.`,
        },
        nota: '**Implementación de Claude:** `REVIEW.md` es una convención del Code Review de Claude, no un estándar abierto. `AGENTS.md` sí es un estándar abierto.',
        fuente: DOCS.codeReviewCustomize,
      },
      {
        slug: 'subagente-revisor',
        titulo: 'Subagente revisor de solo lectura',
        resumen: 'Lee `AGENTS.md` y `REVIEW.md` antes de revisar y no puede editar archivos.',
        explicacion: [
          'El subagente `.claude/agents/revisor.md` revisa la rama contra `main`. Su instrucción dice, explícitamente, leer `AGENTS.md` y `REVIEW.md` antes de revisar, y entrega por hallazgo el `archivo:línea`, la severidad y el porqué.',
          'Sin `Edit` ni `Write` no puede cambiar código. `Bash` queda para `git diff` y `git show`, pero esa restricción es solo una instrucción: para limitar `Bash` de verdad se usan reglas `deny`.',
          'Al estar versionado en `.claude/`, todo el equipo revisa con las mismas reglas. Si creaste la carpeta `agents/` recién, reinicia Claude Code para que cargue el subagente.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: '.claude/agents/revisor.md',
          contenido: `---
name: revisor
description: Revisa los cambios de la rama contra main. Úsalo antes de abrir un PR.
tools: Read, Grep, Glob, Bash
---

Antes de revisar, lee AGENTS.md y REVIEW.md.
Usa Bash solo para git diff y git show.
Por hallazgo: archivo:línea, severidad y por qué.
Nunca edites archivos.`,
        },
        nota: '**Implementación de Claude Code:** subagentes en `.claude/agents/`.',
        fuente: DOCS.subAgents,
      },
      {
        slug: 'claude-review-workflow',
        titulo: 'claude-review.yml: revisión en cada PR',
        resumen: 'La GitHub Action revisa el PR al abrirlo, lee las reglas desde `main` y comenta en línea.',
        explicacion: [
          'Con un `prompt`, `claude-code-action` corre en **modo automatización**, sin esperar una mención. `claude-review.yml` revisa el PR al abrirlo, reabrirlo o dejarlo listo para revisión, y comenta en línea. Usa el secreto `CLAUDE_CODE_OAUTH_TOKEN` de la U6, que nunca va escrito en un archivo.',
          'El servicio gestionado de Anthropic lee `REVIEW.md` de la rama base, nunca de los cambios del PR. En nuestro workflow, el *checkout* trae la copia del PR: si las reglas se leyeran de ahí, el mismo PR podría aflojar la regla que lo revisa. Por eso el prompt indica leerlas siempre desde `main`, por ejemplo con `git show origin/main:REVIEW.md`.',
          'Cada ejecución gasta tu cuota de Claude Pro. Para revisar de nuevo sin gastarla, usa el revisor en local.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.githubActions,
      },
      {
        slug: 'formas-de-revisar',
        titulo: 'Cuatro formas de pedir una revisión',
        resumen: '`/code-review`, subagente revisor, GitHub Action y Code Review gestionado (solo mención).',
        explicacion: [
          '`/code-review` (alias `/review`) corre en tu sesión, en cualquier plan, y usa tu cuota. Con `--fix` aplica los hallazgos a tu árbol de trabajo y con `--comment` los publica como comentarios en línea en un PR. Verificado en la documentación el 11-nov-2026.',
          'El **subagente revisor** y la **GitHub Action** son los de nuestro taller: tus reglas, versionadas en el repo.',
          'El **Code Review gestionado** es un servicio de Anthropic para Team y Enterprise: lo activa un Owner y se cobra por uso. Es solo mención; no se usa en las demos ni en el taller.',
          'Ninguna aprueba ni bloquea el PR: el merge sigue siendo de una persona. Y una revisión sin hallazgos no significa que el código esté libre de errores ni sea seguro.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.codeReviewLocalEs,
      },
    ],
    fundamentales: [
      {
        slug: 'pr-chico',
        titulo: 'PR chico',
        resumen: 'Lo que no se puede revisar, no se revisa.',
        explicacion: [
          'Un PR revisable tiene **un solo propósito** (si el título necesita «y», son dos PR), **commits legibles** (el formato y los datos van aparte) y una **descripción que sirve**: qué cambia, por qué y cómo probarlo.',
          'Un PR gigante trae más ruido en los comentarios, menos hallazgos útiles y más costo humano para revisar. Si no puedes revisarlo con calma en una sentada, divídelo antes de pedir revisión.',
          'En la demo 1, «Un PR que se puede revisar» (arriendo-web), Claude redacta la descripción a partir del diff y deja `[COMPLETAR]` en lo que no se deduce de él. Claude propone el qué; el porqué lo escribes tú.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'markdown',
          titulo: 'Descripción de PR',
          contenido: `## Qué cambia
Recargo de 50 % por día o fracción de atraso.

## Por qué
[COMPLETAR]

## Cómo probarlo
dotnet test`,
        },
        nota: '',
        fuente: DOCS.commonWorkflows,
      },
      {
        slug: 'ia-comenta-tu-decides',
        titulo: 'La IA comenta, tú decides',
        resumen: 'Ningún hallazgo se acepta sin evaluarlo.',
        explicacion: [
          'La IA ve bien los errores de lógica, los casos borde, los secretos en el código y las inconsistencias con el resto del repo. Lo decides tú: si resuelve el problema del negocio, el contexto del equipo y sus acuerdos, si vale la pena cambiarlo ahora y si se hace merge o no.',
          'Cada hallazgo tiene tres salidas: **aceptar** (es real, se corrige en este PR), **discutir** (depende del contexto) o **descartar** (no aplica o es falso, siempre con argumento). «ok» en todos los hilos no es revisar.',
          'En la demo 2, «La IA comenta, tú decides» (arriendo-web), `/code-review` revisa el PR del recargo y la clase vota cada hallazgo, sin commit.',
        ],
        ejemplo: null,
        nota: '',
        fuente: DOCS.codeReview,
      },
      {
        slug: 'reglas-escritas',
        titulo: 'Reglas escritas',
        resumen: '`AGENTS.md` para todo, `REVIEW.md` para revisar.',
        explicacion: [
          'Las revisiones son desparejas cuando nadie sabe qué es «importante». Escribir las reglas hace que la IA comente menos y mejor. Si los comentarios siguen siendo ruido, ajusta las reglas, no el código.',
          '`AGENTS.md` es el estándar abierto que leen Claude Code, Codex, Copilot y otros; `REVIEW.md` es propio de Claude. Ninguno se lee solo en todas partes: en nuestro revisor y en nuestro workflow lo indicamos explícitamente.',
          'En la demo 3, «Reglas escritas y tu revisor» (arriendo-web), se pegan `REVIEW.md` y `revisor.md` y se compara con el ruido de la demo 2.',
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
          'Las reglas viajan con el código: se versionan las reglas, los subagentes, las skills, los permisos y los hooks del proyecto. No se versiona `settings.local.json`, las preferencias personales ni ninguna credencial.',
          'Así, cada persona del equipo revisa con el mismo revisor y las mismas reglas, y un cambio a las reglas pasa por un PR como cualquier otro.',
        ],
        ejemplo: {
          tipo: 'codigo',
          lenguaje: 'text',
          titulo: 'Configuración versionada',
          contenido: `pedidos-web/
├─ AGENTS.md
├─ REVIEW.md
├─ .claude/
│  ├─ settings.json
│  ├─ agents/revisor.md
│  └─ skills/
└─ .github/
   ├─ pull_request_template.md
   └─ workflows/
      ├─ ci.yml · claude.yml
      └─ claude-review.yml`,
        },
        nota: '',
        fuente: DOCS.settings,
      },
    ],
  },

  laboratorio: {
    nombre: 'Que cada cambio llegue a main revisado',
    modalidad: 'Individual + revisión en parejas',
    duracion: 94,
    caso: 'El CI de la Unidad 6 ya prueba cada PR del equipo de Pedidos Web. Falta quién lo revisa y con qué reglas.',
    problematica: 'Las revisiones son desparejas: algunos aprueban sin leer y otros dejan 40 comentarios de estilo. Nadie sabe qué es «importante», las descripciones dicen «arreglos varios» y la IA comenta tanto que el equipo no sabe qué tomar en serio.',
    objetivo: 'Que cada cambio llegue a `main` revisado con reglas escritas, por la IA y por una persona.',
    // Resumen visible en la pestaña Taller (máx. 1000 caracteres; el detalle está en la guía PDF).
    resumen: 'Trabajas solo en tu `pedidos-web`: cada cambio debe llegar a `main` revisado con reglas escritas, por la IA y por una persona. En el receso traes `specs/HU-03-pedidos-por-fecha/` y `docs/checklist-revision.md` con Claude Code y avanzas en 3 etapas. Primero, Claude Code crea `REVIEW.md`, el subagente `revisor` (solo lectura) y `claude-review.yml`, y los subes a `main`. Después implementas HU-03 en una rama, corres el revisor y abres un PR con una descripción que otra persona entienda: el porqué es tuyo. Por último, en parejas, respondes cada hallazgo de la IA (aceptar, discutir o descartar, con argumento), agregas uno humano que no sea de estilo, completas el checklist y haces merge con el CI en verde. Cierras con «Tu reto», obligatorio: crear tú la plantilla de PR; si no alcanzas en clase, la terminas en tu casa. El paso a paso está en la guía.',
    pasos: [
      { minutos: 9, texto: 'Preparación: trae `specs/HU-03-pedidos-por-fecha/` y `docs/checklist-revision.md`. Deja el CI en verde, el secreto de la U6 guardado y Claude Code abierto en tu carpeta. Anota la URL del repo de tu pareja (el instructor las arma al empezar la etapa 3).', conceptos: [] },
      { minutos: 25, texto: 'Reglas escritas: pídele a Claude Code `REVIEW.md`, el subagente `.claude/agents/revisor.md` (solo lectura; lee `AGENTS.md` y `REVIEW.md` desde `main`) y `.github/workflows/claude-review.yml`, explicando cada archivo antes de guardarlo. Revisa que `REVIEW.md` tenga qué es Importante, qué no reportar, un tope de detalles y 3 chequeos de «Revisar siempre», que el revisor no pueda editar y que la credencial no esté escrita en ningún archivo. Súbelos a `main`.', conceptos: ['C3', 'C4'] },
      { minutos: 25, texto: 'Un PR que se puede revisar: en la rama `hu-03-pedidos-por-fecha`, pídele a Claude Code que implemente `specs/HU-03-pedidos-por-fecha/spec.md` con su test y redacte la descripción (Qué cambia, Por qué y Cómo probarlo; `[COMPLETAR]` si algo no está en el diff). El porqué es tuyo. Corre el revisor antes de abrir el PR y mira el comentario de Claude.', conceptos: ['C1'] },
      { minutos: 20, texto: 'Revisión cruzada, en parejas: pídele a Claude Code ayuda para responder cada comentario de tu PR (aceptar, discutir o descartar, con tu argumento; la decisión es tuya). Revisa el PR de tu pareja y deja 1 hallazgo humano que no sea de estilo. Completa `docs/checklist-revision.md` y haz merge con el CI en verde.', conceptos: ['C2'] },
      // Etapa obligatoria sin minutos asignados: si no alcanza en clase, se termina en casa.
      { minutos: null, texto: 'Tu reto (obligatorio): crea `.github/pull_request_template.md` para que todo PR nazca revisable. Esta vez el pedido a Claude Code lo escribes tú. Si no alcanzas en clase, lo terminas en tu casa: es parte del entregable.', conceptos: ['C1'] },
    ],
    puntosControl: [
      'El CI está en verde, el secreto de la U6 sigue guardado y Claude Code está abierto en tu carpeta (preparación).',
      '`REVIEW.md`, `revisor.md` y `claude-review.yml` están en `main` y el CI sigue en verde (etapa 1).',
      'El PR de HU-03 está abierto, su descripción no tiene `[COMPLETAR]` y Claude comentó en él (etapa 2).',
      'Cada hallazgo de la IA tiene respuesta con argumento, hay un hallazgo humano, `checklist-revision.md` está completo y el merge se hizo con el CI en verde (etapa 3).',
      'El archivo está en `main`, un PR nuevo muestra sus secciones e incluye al menos una casilla para confirmar que corriste el revisor (Tu reto).',
    ],
    resultadoEsperado: [
      '«ok» en todos los hilos no es revisar: cada respuesta lleva un argumento propio.',
      'Las reglas se leen desde `main`: así un PR no puede aflojar las reglas que lo revisan.',
      'Un buen `REVIEW.md` hace que la IA comente **menos y mejor**. Si los comentarios siguen siendo ruido, ajusta las reglas, no el código.',
    ],
    siTeTrabas: [
      '*Customize Code Review*, para saber qué escribir en `REVIEW.md`, y *Create custom subagents*, para limitar las herramientas del revisor.',
      '*Review locally with /code-review*, para revisar tu rama antes del PR, y *Claude Code GitHub Actions*, para Claude en tus workflows.',
      '*Creating a pull request template for your repository*, en la documentación de GitHub, para tu reto.',
    ],
    erroresFrecuentes: [
      'El revisor no aparece → pídele a Claude Code que revise si `.claude/agents/revisor.md` está bien escrito y reinicia Claude Code.',
      'El workflow corre, pero no comenta → pídele a Claude Code que compare tu `claude-review.yml` con la documentación de GitHub Actions.',
      'Rompiste algo que funcionaba → vuelve al último commit que estaba en verde y repite el paso.',
    ],
    planB: [],
    extension: '',
  },

  material: [
    { id: 'presentacion', tipo: 'pdf', variante: 'presentacion', titulo: 'Presentación de clases · Unidad 7', descripcion: 'Las diapositivas que usamos en el encuentro, para repasar o consultar después.', archivo: 'assets/material/u07/presentacion-clase.pdf', peso: '6,4 MB', disponible: true },
    { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Que cada cambio llegue a main revisado"', archivo: 'assets/material/u07/guia-taller.pdf', disponible: true },
    // destino: 'taller' → se ve en la pestaña Taller, no en Recursos.
    { tipo: 'enlace', titulo: 'Proyecto del taller: pedidos-web (base de la U7)', descripcion: 'El README explica qué traer a tu repo (camino A): `specs/HU-03-pedidos-por-fecha/` y `docs/checklist-revision.md`.', url: `${U7_TREE}/taller/pedidos-web`, disponible: true, destino: 'taller' },
    { tipo: 'enlace', titulo: 'Demos de la unidad: arriendo-web', descripcion: 'Un PR que se puede revisar, la IA comenta y reglas escritas con tu revisor.', url: `${U7_TREE}/demos`, disponible: true },
  ],

  videos: [
    academyVideo('claudeCode101', 'Lección "Code review".'),
    academyVideo('claudeCodeInAction', 'PR y GitHub Action.'),
    academyVideo('aiNativeSdlc', 'IA en el ciclo de PR.'),
    academyVideo('subagents'),
  ],

  paraInvestigar: [
    '**Claude Tag**, agente de Claude en Slack para equipos: solo mención, no verificado en esta versión.',
    'Code Review gestionado: niveles, costos y protección de ramas (Team y Enterprise).',
    'Ultrareview y `/code-review --fix`: revisión profunda en la nube y aplicar hallazgos (Ultrareview, no verificado).',
    'Varios revisores: agentes de seguridad, arquitectura y estilo.',
    'Arquitectura: mejoras a nivel de sistema, no de línea.',
    'Plugin `code-review`: la revisión oficial dentro de la GitHub Action.',
  ],

  entregable: {
    nombre: 'Proceso completo de code review asistido por IA',
    criterios: [
      '`REVIEW.md` en `main`, con qué es Importante, qué no reportar, un tope de detalles y 3 chequeos de «Revisar siempre».',
      '`.claude/agents/revisor.md`: subagente de solo lectura que lee `AGENTS.md` y `REVIEW.md`.',
      '`.github/workflows/claude-review.yml` en `main`, con el token solo como secreto.',
      'PR de HU-03 con cada hallazgo respondido (aceptar, discutir o descartar, con argumento) y 1 hallazgo humano.',
      '`docs/checklist-revision.md` completo.',
      '`.github/pull_request_template.md` (tu reto).',
    ],
    alimentaA: 'u08',
  },
};
