# Unidad 7 — IA para revisión de código (code review), colaboración e ingeniería de software

**Día 4 · bloque mañana** · Nivel 70 → 80 · Bloque A 56' · Receso 15' · Bloque B 94' · Licencia: Claude Pro (incluye Claude Code) · GitHub gratis con repo público · Stack: Rider + .NET 10 + GitHub (pull requests) + `claude-code-action`

> Versión 2 (11-nov-2026): licencia única Claude Pro (sin Team), taller individual con revisión en parejas, repo público, 3 demos sobre un solo proyecto (arriendo-web, continúa las demos de la U6), taller en 3 etapas más la etapa obligatoria «Tu reto», y nuevo orden de pilares: PR chico · La IA comenta, tú decides · Reglas escritas · Configuración compartida.

## Bloque A — Cátedra (56')

### A1. Apertura: conceptos fundamentales y material oficial (4')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **PR chico** | Lo que no se puede revisar, no se revisa. | *Claude Code in action*: PR y GitHub Action [10] · AI-native SDLC: IA en el ciclo de PR [24] |
| C2 | **La IA comenta, tú decides** | Ningún hallazgo se acepta sin evaluarlo. | *Claude Code 101*: "Code review" [9] · Docs *Code Review* [23] y `/code-review` local [50] |
| C3 | **Reglas escritas** | `AGENTS.md` para todo, `REVIEW.md` para revisar. | *Customize Code Review* [49] · agents.md [42] |
| C4 | **Configuración compartida** | `.claude/` versionada, igual para todo el equipo. | Docs *Create custom subagents* [14] · *Introduction to subagents* |

El hilo del día: *el CI de la U6 ya prueba cada PR. ¿Y quién lo revisa?* Las revisiones son desparejas («LGTM» sin leer, 40 comentarios de estilo, descripciones «arreglos varios») y la IA comenta todo. Hoy: reglas escritas, revisores de IA que las siguen y personas que deciden.

Hoy hay dos proyectos y una sola historia. Las demos del instructor ocurren en **arriendo-web** (el estado final de las demos de la U6: `TarifaBase` migrada, 20 de 20 casos en verde, `ci.yml` y `claude.yml`; carpeta `unidad-7/demos/arriendo-web` del repo de material). La historia avanza en tres pasos: **1 Agregar → 2 Revisar → 3 Reglas**. Las demos son locales: no necesitan push, GitHub Actions ni token. En el taller, cada alumno repite el método en su `pedidos-web`.

**Licencia única: Claude Pro.** `/code-review` funciona en cualquier plan y usa la cuota de tu sesión [50]. La GitHub Action usa el token de suscripción de la U6 (`CLAUDE_CODE_OAUTH_TOKEN`, generado con `claude setup-token`) y gasta tu cuota [22]. Los repos son públicos: en ellos, los runners estándar de GitHub Actions son gratis. **Claude Team no se usa en ninguna actividad.** El Code Review gestionado y Claude Tag son solo mención (Team y Enterprise).

### A2. Desarrollo (49')

**C1 · PR chico (13').** Un PR revisable tiene un solo propósito (si el título necesita «y», son dos PR), commits legibles (el formato y los datos van aparte) y una descripción que sirve: qué cambia, por qué y cómo probarlo. Si no puedes revisarlo con calma en una sentada, divídelo antes de pedir revisión. Un PR gigante trae más ruido en los comentarios, menos hallazgos útiles y más costo humano. Claude puede redactar la descripción a partir del diff, pero la persona la valida [10].
- *Demo 1 "Un PR que se puede revisar" (8', arriendo-web):* crea la rama `feature/recargo-atraso`, pega `insumos/RecargoAtraso.cs` y `insumos/RecargoAtrasoTests.cs`, commit «feat: recargo por atraso en la devolución» y le pide a Claude la descripción del PR en tres secciones (Qué cambia, Por qué, Cómo probarlo), con `[COMPLETAR]` si algo no se deduce del diff. Todo local, sin push.

**C2 · La IA comenta, tú decides (14').** La IA ve bien los errores de lógica, los casos borde, los secretos en el código y las inconsistencias con el resto del repo. Lo decides tú: si resuelve el problema del negocio, el contexto del equipo y sus acuerdos, si vale la pena cambiarlo ahora y si se hace merge o no. Cada hallazgo tiene tres salidas: **aceptar** (es real, se corrige en este PR), **discutir** (depende del contexto) o **descartar** (no aplica o es falso, siempre con argumento). La documentación lo advierte: una revisión sin hallazgos no significa que el código esté libre de errores ni sea seguro [23]. Ninguna revisión aprueba ni bloquea el PR: el merge sigue siendo de una persona [23].
- *Demo 2 "La IA comenta, tú decides" (10', arriendo-web):* con el PR del recargo ya creado, ejecuta `/code-review` en la rama `feature/recargo-atraso`, lee cada hallazgo en voz alta y la clase vota aceptar, discutir o descartar. Anota la decisión y el argumento. No hay commit.

**C3 · Reglas escritas (16').**
- **Dos archivos, dos trabajos.** `AGENTS.md` es un estándar abierto: reglas del proyecto para todo el trabajo (generar, refactorizar y revisar), que leen Claude Code, Codex, Copilot y otros [42]. `REVIEW.md` es propio de Claude: reglas solo para revisar (qué es importante y qué se ignora, severidad, tope de detalles, exclusiones y chequeos obligatorios) [49]. Regla práctica: si aplica también al escribir código, va en `AGENTS.md`; si solo cambia cómo se revisa, va en `REVIEW.md`.
- **¿Qué lee cada revisor?** (docs consultadas el 11-nov-2026):

| Revisor | `CLAUDE.md` | `REVIEW.md` | `AGENTS.md` |
|---|---|---|---|
| `/code-review` local | Sí | No | No documentado para el comando |
| Code Review gestionado (solo mención) | Sí | Sí, desde la rama base | No lo menciona |
| Nuestro revisor y workflow | Lo indicamos explícitamente | Lo indicamos explícitamente | Lo indicamos explícitamente |

- **Anatomía de un `REVIEW.md`** (basada en el ejemplo oficial de *Customize Code Review* [49]): 1 · Qué es Importante aquí (lo que rompe el comportamiento, filtra datos o impide volver atrás; el estilo es Detalle), 2 · Tope de detalles (máximo 5 por revisión), 3 · No reportar (lo que valida el CI, archivos generados) y 4 · Revisar siempre (endpoints nuevos con test, sin datos personales en logs, consultas por usuario). Severidades del servicio: Importante, Detalle (*nit*) y Preexistente (esta última, tomada de la presentación; no confirmada en la documentación).
- *Demo 3 "Reglas escritas y tu revisor" (12', arriendo-web):* hubo ruido en la demo 2. Pega `insumos/REVIEW.md` en la raíz y `insumos/revisor.md` en `.claude/agents/`, reinicia Claude Code y pide «Usa el subagente revisor sobre esta rama». Compara con la demo 2: ¿menos ruido, mejores hallazgos? Commit «chore: reglas de revisión y subagente revisor». El subagente `revisor` tiene `tools: Read, Grep, Glob, Bash`, sin `Edit` ni `Write`: no puede cambiar código. Para limitar `Bash` de verdad se usan reglas `deny` [14].

**C4 · Configuración compartida (6').**
- **Las reglas viajan con el código.** Se versiona `AGENTS.md`, `REVIEW.md` y `.claude/` (`agents/revisor.md`, `skills/`, `settings.json`), más `.github/pull_request_template.md` y los workflows (`ci.yml`, `claude.yml`, `claude-review.yml`). No se versiona `settings.local.json`, las preferencias personales ni ninguna credencial [14].
- **Cuatro formas de pedir una revisión:**
  - `/code-review` en tu sesión: cualquier plan, usa tu cuota. Alias `/review`. Con `--fix` aplica los hallazgos a tu árbol de trabajo y con `--comment` los publica como comentarios en línea en un PR [50].
  - Subagente `revisor`: tus reglas y tus herramientas, versionado en `.claude/`. Se pide «Usa el subagente revisor» (taller, etapa 1) [14].
  - GitHub Action (`claude-review.yml`): revisa el PR al abrirlo, reabrirlo o dejarlo listo; lee `REVIEW.md` desde `main` y comenta en línea. Usa el secreto `CLAUDE_CODE_OAUTH_TOKEN` de la U6 [22].
  - Code Review gestionado (solo mención): servicio de Anthropic para Team y Enterprise; lo activa un Owner y se cobra por uso. No se usa en las demos ni en el taller [23].
  - Ninguna aprueba ni bloquea el PR: el merge sigue siendo de una persona.
- **¿Desde qué rama se leen las reglas?** El Code Review gestionado lee `REVIEW.md` de la rama base o de la principal, nunca de los cambios del propio PR [49]. En nuestro workflow, el *checkout* trae la copia del PR: si las reglas se leyeran de ahí, el mismo PR podría aflojar la regla que lo revisa (por ejemplo, agregando `Nada en Endpoints/` a «No reportar»). Por eso el prompt indica leerlas siempre desde `main` (`git show origin/main:REVIEW.md`).
- **Nota comparativa.** `AGENTS.md` es lo más portable. Copilot, Codex y Gemini tienen sus propias formas de configurar la revisión (no verificadas en detalle). En todas las herramientas, la IA comenta y el merge es de una persona.

### A3. Cierre (3')
- **Antes del receso: 4 preguntas.** PR chico (¿Por qué tres PR chicos se revisan mejor que uno de 2.000 líneas?) · La IA comenta, tú decides (Si la IA marca un error, ¿qué haces antes de aceptarlo?) · Reglas escritas (¿Qué va en `AGENTS.md`, qué va en `REVIEW.md` y por qué se lee desde `main`?) · Configuración compartida (¿Qué gana el equipo al versionar el revisor en `.claude/`?).
- **Idea de cierre:** la IA revisa rápido; tú decides con argumentos y reglas escritas que todo el equipo comparte.
- **Receso (15').** Trae a tu `pedidos-web` lo nuevo de la U7 pidiéndoselo a Claude Code: «Trae a pedidos-web solo lo nuevo de la Unidad 7 desde el repo de material. No toques nada más.»
- **Temas secundarios para investigar por su cuenta** (lámina «Para profundizar»):
  - **Claude Tag:** agente de Claude en Slack para equipos. Solo mención; no verificado en esta versión.
  - **Code Review gestionado:** niveles, costos y protección de ramas (Team y Enterprise) [23][49].
  - **Ultrareview y `--fix`:** revisión profunda en la nube y aplicar hallazgos. Ultrareview, no verificado en esta versión.
  - **Varios revisores:** agentes de seguridad, arquitectura y estilo.
  - **Arquitectura:** mejoras a nivel de sistema, no de línea.
  - **Plugin `code-review`:** la revisión oficial dentro de la GitHub Action [22].

## Bloque B — Taller "Que cada cambio llegue a main revisado" (94', individual + revisión en parejas)

**Misión.** Que cada cambio llegue a `main` revisado con reglas escritas, por la IA y por una persona.

**Caso.** El pipeline de la Unidad 6 ya prueba cada PR en el equipo de Pedidos Web. Falta quién lo revisa y con qué reglas.

**Problemática.** Las revisiones son desparejas: algunos aprueban sin leer y otros dejan 40 comentarios de estilo. Nadie sabe qué es «importante», las descripciones de los PR dicen «arreglos varios» y la IA comenta tanto que el equipo no sabe cuáles tomar en serio.

**Preparación (en el receso).** Traer a tu repo solo lo nuevo de la U7 con el camino A del README de `unidad-7/taller/pedidos-web`, pidiéndoselo a Claude Code con este texto: «Trae a pedidos-web solo lo nuevo de la Unidad 7 desde el repo de material. No toques nada más.» Se suman `specs/HU-03-pedidos-por-fecha/` y `docs/checklist-revision.md`; no reemplaza `README.md`, `AGENTS.md`, `PedidosWeb.sln`, `src/`, `tests/`, `legado/`, `migracion/`, `.claude/`, `.github/`, el resto de `docs/` ni el resto de `specs/`. Los archivos de revisión los creas tú en la etapa 1.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| Preparación | 9 | Traer `specs/HU-03-pedidos-por-fecha/` y `docs/checklist-revision.md`. Dejar el CI en verde, el secreto de la U6 guardado y Claude Code abierto en tu carpeta. Anotar la URL del repo de tu pareja (el instructor arma las parejas al empezar la etapa 3). | — |
| 1 · Reglas escritas | 25 | Pedirle a Claude Code `REVIEW.md`, el subagente `.claude/agents/revisor.md` (solo lectura; lee `AGENTS.md` y `REVIEW.md` desde `main`) y `.github/workflows/claude-review.yml`, explicando cada archivo antes de guardarlo. Revisar: `REVIEW.md` dice qué es Importante, qué no reportar y un tope de detalles; tiene 3 chequeos de «Revisar siempre»; el revisor no puede editar; la credencial no aparece escrita en ningún archivo. Subir los tres a `main`. | C3, C4 |
| 2 · Un PR que se puede revisar | 25 | En la rama `hu-03-pedidos-por-fecha`, pedirle a Claude Code que implemente `specs/HU-03-pedidos-por-fecha/spec.md` con su test y redacte la descripción del PR (Qué cambia, Por qué, Cómo probarlo; `[COMPLETAR]` si algo no está en el diff). El «por qué» es tuyo. Correr el revisor antes de abrir el PR. Abrir el PR y ver el comentario de Claude. | C1 |
| 3 · Revisión cruzada (en parejas) | 20 | Pedirle a Claude Code ayuda para responder cada comentario de tu PR: aceptar, discutir o descartar, con un argumento propio; la decisión es tuya. Revisar el PR de tu pareja y dejar 1 hallazgo humano que no sea de estilo. Completar `docs/checklist-revision.md` y hacer merge con el CI en verde. | C2 |
| Tu reto (obligatorio) | — | Crear `.github/pull_request_template.md` para que todo PR nazca revisable. Esta vez el pedido a Claude Code lo escribes tú, con contexto, qué quieres y cómo sabes que quedó bien. | C1 |

Las etapas con minutos suman 79'; los 94' del taller incluyen el tiempo de «Tu reto». «Tu reto» no tiene minutos asignados en el sitio: si no alcanzas en clase, lo terminas en tu casa, porque es parte del entregable. **Cierre:** confirma que todo está en `main` y cuenta el hallazgo que más discutieron con tu pareja.

**Qué se espera, sin darte la respuesta.**
- «ok» en todos los hilos no es revisar: cada respuesta lleva un argumento propio.
- Las reglas se leen desde `main`: así un PR no puede aflojar las reglas que lo revisan.
- Un buen `REVIEW.md` hace que la IA comente menos y mejor. Si los comentarios siguen siendo ruido, ajusta las reglas, no el código.

**Qué investigar si te trabas** (enlaces de la guía, verificados el 11-nov-2026). Etapa 1: *Customize Code Review* [49] y *Create custom subagents* [14]; *Claude Code GitHub Actions* [22]. Etapa 2: *Review locally with /code-review* [50]. Tu reto: *Creating a pull request template for your repository* (documentación de GitHub).

- **Entregable:** *Proceso completo de code review asistido por IA*: `REVIEW.md`, `.claude/agents/revisor.md`, `.github/workflows/claude-review.yml`, PR de HU-03 con cada hallazgo respondido y 1 hallazgo humano, `docs/checklist-revision.md` y `.github/pull_request_template.md` (reto). Todo queda en `main`; es el punto de partida de la Unidad 8.
- **Puntos de control:**
  - **Preparación:** el CI está en verde, el secreto de la U6 sigue guardado y Claude Code está abierto en tu carpeta.
  - **Etapa 1:** `REVIEW.md`, `revisor.md` y `claude-review.yml` están en `main` y el CI sigue en verde.
  - **Etapa 2:** el PR de HU-03 está abierto, su descripción no tiene `[COMPLETAR]` y Claude comentó en él.
  - **Etapa 3:** cada hallazgo de la IA tiene respuesta con argumento, hay un hallazgo humano, `checklist-revision.md` está completo y el merge se hizo con el CI en verde.
  - **Tu reto:** el archivo está en `main`, un PR nuevo muestra sus secciones e incluye al menos una casilla para confirmar que corriste el revisor.
- **Errores frecuentes** («Si algo falla»):
  - El revisor no aparece → pídele a Claude Code que revise si `.claude/agents/revisor.md` está bien escrito y reinicia Claude Code.
  - El workflow corre, pero no comenta → pídele a Claude Code que compare tu `claude-review.yml` con la documentación de GitHub Actions.
  - Rompiste algo que funcionaba → vuelve al último commit que estaba en verde y repite el paso.
- **Plan B:** ninguno definido en esta versión.
