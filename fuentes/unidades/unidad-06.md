# Unidad 6 — IA aplicada a la calidad, las pruebas y la integración y entrega continuas (CI/CD)

**Día 3 · bloque tarde** · Nivel 55 → 70 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Pro (incluye Claude Code) + JetBrains Rider · GitHub gratis con repo público · Stack: Rider + .NET 10 + xUnit + GitHub Actions + `claude-code-action`

> Versión 2 (10-nov-2026): demos sobre un solo proyecto (arriendo-web, continúa las demos de la U5), credencial única con el token de Claude Pro, cobertura solo en demo y taller individual en 3 etapas.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Tests con criterio** | Si no puede fallar, no prueba nada. | *Common workflows*: "Work with tests" [17] |
| C2 | **Cobertura ≠ calidad** | Se mide, no se persigue. | *Best practices*: criterios de verificación [11] |
| C3 | **Pipeline seguro** | Cada push se prueba solo, sin exponer secretos. | Docs *GitHub Actions* [22] |
| C4 | **Claude en CI** | Claude diagnostica; tú corriges y haces merge. | Docs *GitHub Actions* [22] · *Claude Code in action*: headless y GitHub Action [10] · AI-native SDLC: feedback loop y CI [24] |

En la certificación *Claude Certified Developer – Foundations*, esta unidad cubre parcialmente el módulo de evals y capas de test [32].

Hoy hay dos proyectos y una sola historia. Las demos del instructor ocurren en **arriendo-web** (el estado final de las demos de la U5: `TarifaBase` migrada a C#, 20 de 20 casos en verde y el hook activo; carpeta `unidad-6/demos/arriendo-web` del repo de material) y responden una pregunta: *ArriendoWeb ya calcula bien. ¿Cómo sabemos que no se rompe cuando nadie mira?* La historia avanza en cuatro pasos: **Mentiroso → Cobertura → Workflow → @claude**. En el taller, cada alumno repite el método en su `pedidos-web`.

**Licencia única: Claude Pro.** La GitHub Action usa el token de suscripción de cada persona (`CLAUDE_CODE_OAUTH_TOKEN`, generado con `claude setup-token`), guardado como secreto del repositorio. Funciona con los planes Pro, Max, Team y Enterprise, y cada ejecución gasta la cuota de quien generó el token [22]. Los repos son públicos: en ellos, los runners estándar de GitHub Actions son gratis (GitHub Docs, *How use of GitHub Actions is measured*, 10-nov-2026).

### A2. Desarrollo (70')

**C1 · Tests con criterio (15').** La pirámide de tests: a la IA se le delegan los unitarios repetitivos y los casos borde; tú decides qué comportamiento importa. Para corregir un bug, el orden es reproducir, escribir el test que falla, corregir y dejar el test [17].
- *Demo 1 "El test mentiroso" (6'):* Claude Code propone tests de borde para `TarifaBase` que el golden master no cubre. El instructor saca diciembre de la temporada alta **a mano en Rider**: el golden master solo lo detecta en un caso (B01) y el test que sigue en verde es el mentiroso. Si no puede fallar, no prueba nada. Para saberlo, rómpelo tú, a mano.

**C2 · Cobertura ≠ calidad (10').** `dotnet test --collect:"XPlat Code Coverage"` (paquete `coverlet.collector`) genera `coverage.cobertura.xml`: dice qué líneas y ramas **nunca se ejecutaron**, pero no si lo ejecutado está bien. Un test sin `Assert` útil también cubre. Claude puede leerte el reporte. Es un mapa, no una meta.
- *Demo 2 "Cobertura 100 %, verificación 0" (5'):* solo con el test mentiroso, Claude suma `coverlet.collector`, corre los tests con cobertura y lee el XML: `TarifaBase` queda cubierta y nada quedó verificado. La cobertura se ve solo en esta demo; el taller no la mide.

**C3 · Pipeline seguro (20').**
- **Anatomía:** `on` (qué lo dispara: `push`, `pull_request`) → `jobs` → `steps`, en un runner: una máquina limpia de GitHub.
- **Seguridad mínima, 6 reglas** [22]:
  - Secretos en *Settings › Secrets and variables › Actions*, nunca en el código ni en el YAML.
  - `permissions:` con lo mínimo, partiendo por `contents: read`.
  - Acciones con versión fija (`actions/checkout@v6`, `actions/setup-dotnet@v5`); lo más estricto es el SHA completo.
  - Nunca imprimir un secreto en los logs.
  - Los PR desde forks no reciben secretos.
  - `timeout-minutes` para que ningún job corra sin fin.
- *Demo 3 "Mi primer workflow" (7'):* Claude Code escribe `.github/workflows/ci.yml` (build y test en cada push a `main` y en cada PR, `contents: read`, `timeout-minutes: 10`, versiones fijas, `dotnet-version: 10.0.x`). Push al repo público `arriendo-web` y verde en la pestaña Actions.
- *Ejercicio "Encuentra el error" (3'):* un `claude.yml` con el token pegado y un `echo` del secreto. Si un token se sube, se genera uno nuevo: git no olvida.

**C4 · Claude en CI (25').**
- **`claude-code-action@v1`:** sin `prompt` funciona en *modo interactivo* y responde a `@claude` en issues y PR (es el del taller). Con `prompt` funciona en *modo automatización* ante un evento [22]. Solo responde a quien tiene permiso de escritura en el repositorio [22].
- **Plan B local, `claude -p`:** Claude Code sin interfaz, por ejemplo `dotnet test 2>&1 | claude -p "Explica en 3 líneas por qué falla"` [10].
- **Tu credencial, en 3 pasos:** `claude setup-token` → secreto `CLAUDE_CODE_OAUTH_TOKEN` → `claude.yml` lo usa con `${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}`. Gasta tu cuota y nunca va en un archivo.
- **Tres frenos:** `--max-turns 5` en `claude_args`, `timeout-minutes: 10` y `concurrency` (una ejecución a la vez por issue o PR) [22].
- **Regla del curso:** CI en rojo → `@claude` → diagnóstico → tú corriges → CI en verde → merge. Las capas son el workflow (permisos), las herramientas (`--max-turns`, `--disallowedTools "Edit,Write"`) y las personas (merge solo en verde).
- *Demo 4 "@claude, ¿por qué falla?" (8'):* en una rama, el instructor vuelve el redondeo de `TarifaBase` a `MidpointRounding.AwayFromZero` (el defecto A08 de la U5) y abre un PR. Solo A08 queda en rojo. Comenta «@claude ¿por qué falla este job? Solo diagnostica, no hagas commits.», lee el diagnóstico, corrige a mano y hace merge con el CI en verde.
- **Mismo patrón, otros agentes:** Copilot coding agent, `openai/codex-action` y `run-gemini-cli` también corren en CI con los secretos y permisos que tú defines; cambian la credencial y la forma de activarlos (revisado el 2-nov-2026).

### A3. Cierre (10')
- **Antes del receso: 4 preguntas.** Tests con criterio (¿Cómo sabes que un test no es mentiroso?) · Cobertura ≠ calidad (Si la cobertura dice 100 %, ¿ya está todo probado?) · Pipeline seguro (¿Dónde va el token de Claude y con qué permiso parte el ci.yml?) · Claude en CI (Si @claude propone un arreglo, ¿quién hace el merge?).
- **Temas secundarios para investigar por su cuenta:**
  - Tests end-to-end del portal web con Playwright.
  - Mutation testing (Stryker.NET): ¿mis tests detectan cambios en el código?
  - GitLab CI/CD y GitHub Enterprise Server [22].
  - Evals continuas en CI, uno de los *plays* del AI-native SDLC [24].
  - Tareas programadas (*routines*) y Agent SDK [10].
  - Autenticación sin secretos de larga duración (workload identity federation) [22].
  - Checklist de seguridad para workflows (apunte de la unidad).

## Bloque B — Taller "Que ningún cambio llegue a main sin pruebas" (80', individual)

**Misión.** Que ningún cambio llegue a `main` sin pruebas automáticas, con Claude ayudando a leer la falla y tú decidiendo.

**Caso.** El módulo de totales de la Unidad 5 funciona en la máquina de cada alumno, pero los tests se ejecutan «cuando alguien se acuerda». Un viernes, un cambio rompió el cálculo del IVA y nadie lo notó hasta el lunes, con un log de cientos de líneas.

**Preparación (en el receso).** Traer a tu repo solo lo nuevo de la U6 con el camino A del README de `unidad-6/taller/pedidos-web`, pidiéndoselo a Claude Code con este texto: «Trae a pedidos-web solo lo nuevo de la Unidad 6 desde el repo de material (docs/calidad/). No toques nada más y explícame cada paso.» Se suma `docs/calidad/registro-u6.md`; no reemplaza `README.md`, `AGENTS.md`, `PedidosWeb.sln`, `src/`, `tests/`, `legado/`, `migracion/`, `specs/` ni `.claude/`. Los workflows los creas tú en la etapa 2. Si algo de la U5 quedó pendiente, el taller funciona igual: el CI corre lo que haya.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| Preparación | 5 | Traer `docs/calidad/registro-u6.md`. Dejar `dotnet test` sin rojos: lo pendiente de la U5 se marca con `Skip` y un motivo, nunca se borra. Commit. | — |
| 1 · Tests que sí prueban | 20 | Pedirle a Claude Code 5 tests de borde que el golden master no cubra, para el módulo que tengas funcionando. Romper el código **a mano en Rider**, ver qué test falla, borrar los que no fallan y deshacer el cambio. Commit. | C1 |
| 2 · Pipeline seguro | 25 | Claude Code escribe `.github/workflows/ci.yml` (build y test en push y PR, permisos mínimos, timeout de 10 min, versiones fijas). Push y verde en Actions. Instalar la Claude GitHub App, correr `claude setup-token`, guardar el secreto `CLAUDE_CODE_OAUTH_TOKEN` y crear `claude.yml` con 5 turnos. Ambos en `main`. | C3, C4 |
| 3 · La falla | 25 | En una rama, romper una línea a mano, abrir el PR y ver el CI en rojo. Comentar «@claude ¿por qué falla este job? Solo diagnostica, no hagas commits.». Decidir (aceptar, ajustar o rechazar), corregir a mano, verde y merge. Completar el registro. | C1, C4 |
| Cierre | 5 | Dos alumnos muestran su PR: el comentario de Claude y su decisión. | — |

**Qué se espera, sin darte la respuesta.**
- Un test nuevo vale si falla ante un error real. Pruébalo rompiendo el código a mano.
- Si tu `claude.yml` tiene más permisos de los necesarios, o el token aparece en algún archivo, el pipeline no está terminado.
- La propuesta de Claude se puede aceptar, ajustar o rechazar: lo que importa es justificar la decisión.

**Qué investigar si te trabas.** El ejemplo "Respond to @claude mentions" y la sección "Protect your credentials" de la documentación de Claude Code GitHub Actions [22], la sintaxis de `permissions` en la documentación de GitHub y *Common workflows* para trabajar con tests [17].

- **Entregable:** *Pipeline con tests automatizados asistidos por IA*: `ci.yml` en verde, `claude.yml` en `main`, tests revisados, PR con el diagnóstico de `@claude` resuelto y `docs/calidad/registro-u6.md`.
- **Puntos de control:**
  - **Preparación:** `dotnet test` sin rojos y commit hecho.
  - **Etapa 1:** cada test nuevo falló al menos una vez ante un cambio hecho a mano.
  - **Etapa 2:** `ci.yml` en verde y `claude.yml` en `main`.
  - **Etapa 3:** PR en verde, merge hecho y registro completo.
- **Errores frecuentes:**
  - `@claude` no responde → revisa que la App esté instalada, que `claude.yml` esté en `main` y el nombre exacto del secreto.
  - El CI sigue verde tras romper el código → rompiste código sin tests: elige una línea que cubran tus tests.
  - Token pegado en un archivo → genera otro con `claude setup-token` y actualiza el secreto.
  - CI en rojo por la U5 → márcalo con `Skip` y su motivo.
- **Plan B:** carpeta `unidad-6/taller/u6-respaldo` del repo de material (no es una rama), con un `claude.yml` basado en el ejemplo oficial. Si la App o el token fallan: Claude Code local lee la falla con `claude -p`. Si GitHub Actions falla: `dotnet build` y `dotnet test` en local.
- **Extensión opcional:** un workflow programado (`schedule`) con un `prompt` que resuma los PR abiertos (modo automatización).
