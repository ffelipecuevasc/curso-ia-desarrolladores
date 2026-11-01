# Unidad 6 — IA aplicada a la calidad, las pruebas y la integración y entrega continuas (CI/CD)

**Día 3 · bloque tarde** · Nivel 55 → 70 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard + **credencial para GitHub Actions (pendiente)** · Stack: .NET + xUnit + GitHub Actions

> ⚠️ **PENDIENTE — Credencial de Claude para GitHub Actions (también se usa en la Unidad 7).**
> La GitHub Action de Claude necesita una credencial guardada como secreto en cada repositorio. Hay dos caminos [22]:
>
> | Opción | Qué es | Quién la entrega | Implicancia |
> |---|---|---|---|
> | **A. API key** (`ANTHROPIC_API_KEY`) | Clave de la Claude Console, con facturación por uso | El Owner del cliente | Requiere presupuesto y un **límite de gasto**. Los créditos de API del plan Team no cubren estas ejecuciones [25]. |
> | **B. Token de suscripción** (`CLAUDE_CODE_OAUTH_TOKEN`) | Cada alumno lo genera con `claude setup-token` desde su asiento Team | El propio alumno | Sin costo extra, pero consume la cuota de su asiento y queda ligado a su cuenta. |
>
> **Estado:** solicitud enviada al Owner del cliente a través de la encargada del curso. Si no hay respuesta antes del día 3, se usa la **opción B**.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Tests con criterio** | Si no puede fallar, no prueba nada. | *Common workflows*: "Work with tests" [17] |
| C2 | **Cobertura ≠ calidad** | Se mide, no se persigue. | *Best practices*: criterios de verificación [11] |
| C3 | **Pipeline seguro** | Cada push se prueba solo, sin exponer secretos. | Docs *GitHub Actions* (en español) [22] |
| C4 | **Claude en CI** | Diagnostica y propone; tú decides. | Docs *GitHub Actions* [22] · *Claude Code in action*: headless y GitHub Action [10] · AI-native SDLC: feedback loop y CI [24] |

En la certificación *Claude Certified Developer – Foundations*, esta unidad cubre parcialmente el módulo de evals y capas de test [32].

### A2. Desarrollo (70')

**C1 · Tests con criterio (15').** La pirámide de tests: qué conviene delegar a la IA (unitarios repetitivos, casos borde) y qué no (decidir qué comportamiento importa). Para corregir un bug, el orden es: reproducir, escribir el test que falla y después corregir [17].
- *Demo "El test mentiroso":* en una calculadora de propinas ficticia (**PropinaApp**), Claude genera 8 tests. El curso encuentra el que siempre pasa, por ejemplo uno que compara el resultado consigo mismo.

**C2 · Cobertura ≠ calidad (10').** Medir con `dotnet test --collect:"XPlat Code Coverage"` y leer el reporte. La cobertura indica qué código **no** se probó, pero no garantiza que lo probado esté bien.
- *Demo "Cobertura 100%, bug incluido":* una función con el 100% de cobertura que igual falla en el caso límite de 0 personas.

**C3 · Pipeline seguro (20').**
- **GitHub Actions básico:** `workflow` → `jobs` → `steps`, disparadores (`push`, `pull_request`) y runners.
- **Seguridad mínima obligatoria:**
  - Los secretos van en *Settings → Secrets*, nunca en el código ni en el YAML.
  - Declarar `permissions:` con lo mínimo necesario (`contents: read` por defecto).
  - Usar versiones fijas de las acciones (`@v1`, `@v6`).
  - No imprimir secretos en los logs.
  - Saber que los PR desde *forks* no reciben secretos.
  - Poner `timeout-minutes` para que un job no corra sin fin [22].
- *Demo "Mi primer workflow":* un `ci.yml` con build y test ejecutándose en vivo, y luego el mismo archivo con un secreto mal puesto para ver por qué es un error.

**C4 · Claude en CI (25').**
- **`claude-code-action`:** en *modo interactivo* responde a `@claude` en issues y PR. En *modo automatización* ejecuta un `prompt` ante cada evento [22].
- **Modo headless `claude -p`:** Claude Code dentro de un script o pipeline propio [10].
- **Autenticación:** API key frente a token de suscripción (ver el recuadro PENDIENTE).
- **Control de costos:** `--max-turns` en `claude_args`, `timeout-minutes` y `concurrency` para limitar ejecuciones en paralelo [22].
- Regla del curso: **Claude propone el arreglo en un PR o un comentario. Una persona lo revisa y hace merge.**
- *Demo:* un test falla en CI, se comenta `@claude ¿por qué falla este job?` y Claude responde con el diagnóstico y una propuesta.

### A3. Cierre (10')
- **Repaso:** Tests con criterio · Cobertura ≠ calidad · Pipeline seguro · Claude en CI.
- **Temas secundarios para investigar por su cuenta:**
  - Tests end-to-end del portal web con Playwright.
  - Mutation testing (Stryker.NET): ¿mis tests detectan cambios en el código?
  - GitLab CI/CD y GitHub Enterprise Server [22].
  - Evals continuas en CI, uno de los *plays* del AI-native SDLC [24].
  - Tareas programadas (*routines*) y Agent SDK [10].
  - Autenticación sin secretos de larga duración (workload identity federation) [22].

## Bloque B — Taller "Pipeline con tests asistidos" (80', en parejas)

**Caso de uso.** El módulo de totales migrado en la Unidad 5 ya funciona en la máquina de cada alumno. Ahora el equipo va a trabajar con pull requests, y la gerencia pide que **ningún cambio llegue a `main` sin pasar por pruebas automáticas**.

**Problemática.** Hoy los tests se ejecutan "cuando alguien se acuerda". El viernes pasado alguien subió un cambio que rompía el cálculo del IVA y nadie lo notó hasta el lunes. Además, cuando un test falla, el equipo pierde tiempo leyendo logs largos para entender por qué.

**Solución a implementar.** Cada pareja deja su repositorio con tests confiables, un pipeline seguro que se ejecuta en cada push y PR, y Claude disponible en CI para diagnosticar fallas, sin que tome decisiones por el equipo.

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 20 | Pedir a Claude Code tests para los casos que **no** cubre el golden master, como valores límite y entradas inválidas. Revisar uno por uno y eliminar los que no prueban nada. Medir la cobertura antes y después. | C1, C2 |
| 2 | 15 | Crear `.github/workflows/ci.yml` (build + test en `push` y `pull_request`) con `permissions` mínimos, `timeout-minutes` y acciones con versión fija. **Punto de control:** el job pasa en verde en GitHub. | C3 |
| 3 | 20 | Instalar la Claude GitHub App, guardar la credencial como secreto y crear `.github/workflows/claude.yml` (modo interactivo con `@claude`) con `--max-turns 5`. | C3, C4 |
| 4 | 20 | **Juego de parejas:** uno inyecta una falla en una rama y abre un PR. El otro usa `@claude` para diagnosticar, evalúa la propuesta, la corrige y hace merge solo con el CI en verde. Después intercambian roles. | C1, C4 |
| 5 | 5 | Cierre: dos parejas muestran el comentario de Claude y si aceptaron o no su propuesta. | — |

**Qué se espera, sin darte la respuesta.**
- Un test nuevo vale si fallaría ante un error real. Pruébalo rompiendo el código a propósito.
- Si tu `claude.yml` tiene más permisos de los que necesita, o la credencial aparece en algún archivo, el pipeline no está terminado.
- La propuesta de Claude se puede aceptar, ajustar o rechazar. Lo que importa es que justifiques la decisión.

**Qué investigar si te trabas.**
- El ejemplo "Respond to @claude mentions" y la sección "Protect your credentials" de la documentación de GitHub Actions [22].
- La sintaxis de `permissions` en la documentación de GitHub.
- Para la cobertura en .NET, el paquete `coverlet.collector`.

- **Entregable:** *Pipeline con tests automatizados asistidos por IA*: `ci.yml`, `claude.yml`, tests nuevos, reporte de cobertura antes y después, y el PR de la falla resuelta.
- **Plan B:**
  - Si la credencial no está disponible, el instructor demuestra el paso 3 en su repositorio, y en el paso 4 las parejas diagnostican la falla con Claude Code local a partir del log del CI.
  - Si GitHub Actions falla, ejecutar los pasos del pipeline en local con `dotnet build && dotnet test`.
- **Extensión opcional:** agregar un workflow programado (`schedule`) que genere un resumen diario de los PR abiertos.
