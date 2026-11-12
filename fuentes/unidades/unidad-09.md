# Unidad 9 — Escalabilidad, madurez organizacional y adopción de la IA

**Día 5 · bloque mañana** · Nivel 88 → 95 · Bloque A 60' · Receso 15' · Bloque B 90' · Cierre 15' · Licencia: demos con Claude Pro (instructor) · taller con Claude Team Standard (también funciona con Pro) · GitHub gratis con repo público · Stack: Claude Code (plugins, marketplaces y MCP) + Python con Playwright + .NET 10

> Versión 2 (12-nov-2026): taller individual en `pedidos-web` (ya no en grupos de 3 con roles A/B/C y 80'), de 90' en 3 etapas más la etapa obligatoria «Tu reto» (versión 1.1.0). Se elimina todo lo de la base de datos en contenedor y su servidor MCP, el plugin de demo de la versión 1 y el plan B. 3 demos sobre un solo proyecto (arriendo-web, continúa las demos de la U8): empaquetar, instalar como otro equipo y sumar un MCP de solo lectura. El MCP del playbook pasa a ser `claude-academy`. Agenda de 180' (clase 60' · receso 15' · taller 90' · cierre 15'). Fuentes: la presentación y la guía de la unidad (12-nov-2026), el README del taller y la versión 1 de este archivo. Donde se contradicen, para el taller manda la guía y para foco, objetivos, conceptos, demos y repaso manda la presentación. Modelos por familia (Haiku, Sonnet y Opus), sin número de versión.

## Bloque A — Clase (60')

### A1. Apertura: conceptos fundamentales y material oficial (láminas 1–3)
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Madurez** | Mide dónde estás antes de decidir hacia dónde ir. | Docs *Analytics* [29] · AI-native SDLC: tabla tradicional frente a AI-native [3] |
| C2 | **Multiplicadores** | La adopción la empujan personas, no licencias. | Curso *Deploying Claude Enterprise with confidence* [8] |
| C3 | **Playbook como código** | Las buenas prácticas se instalan, no se leen. | Docs de *Plugins*: *Create plugins* y *Create and distribute a plugin marketplace* (consultadas el 12-nov-2026) · AI-native SDLC: skills como conocimiento institucional [24] |
| C4 | **Herramienta justa** | Superficie y modelo según la tarea; estándares para no quedar atado. | Docs *Model configuration* · *Claude Academy MCP* (consultada el 12-nov-2026) · *Introduction to MCP* [30] · agents.md [42] · *Introduction to agent skills* [18] |

El hilo del día: *el caso hilo, `pedidos-web`, pasa de un equipo a toda la Business Unit*. La BU de Desarrollo tiene 4 equipos. **Pedidos Web** trabaja con specs, tests, CI, revisión y reglas de seguridad (U1 a U8). **Equipo 2** trabaja cada uno a su manera, **Equipo 3** casi no usa la herramienta y **Equipo 4** la usa mucho, pero con poca aceptación. La gerencia pide un plan de evolución en PDF y un playbook instalable para los otros tres equipos.

Las demos del instructor ocurren en **arriendo-web** (carpeta `unidad-9/demos` del repo de material). La historia avanza en tres pasos: **1 Empaqueta → 2 Instala → 3 Súmale MCP**. El plugin se llama `arriendo-playbook` y el marketplace, `arriendo-vela`. En el taller, cada alumno repite el método en su `pedidos-web`.

**Licencias.** Las demos del instructor se hacen con **Claude Pro**. El taller usa **Claude Team Standard** y también funciona con **Claude Pro**. GitHub gratis con repo público.

*Los 6' de clase que la presentación no etiqueta por concepto quedan en la apertura y el repaso (clase de 60'). Las dos actividades (C1 y C4) están dentro de los minutos de su concepto.*

### A2. Desarrollo (54')

**C1 · Madurez (10', láminas 4–7).**
- **Modelo de 5 niveles de Vela LATAM:**

| Nivel | Nombre | Descripción |
|---|---|---|
| 1 | Uso a escondidas | Cada uno, su herramienta, sin reglas. |
| 2 | Uso individual | Hay licencias, pero cada uno trabaja a su manera. |
| 3 | Equipo con reglas | `AGENTS.md`, `REVIEW.md` y hooks compartidos. |
| 4 | Proceso AI-native | Spec, plan, CI y revisión: cada etapa deja su artefacto. |
| 5 | Organización que mide y mejora | Usa indicadores para decidir y mejorar. |

  En la lámina, Pedidos Web aparece en el nivel 4.
- **Qué mide el panel de analytics de Claude Code** [29] (consultado el 12-nov-2026): usuarios activos (quiénes lo usan cada día), sesiones (cuánto se usa por día), líneas aceptadas (código de Claude que la persona aceptó), tasa de aceptación (de cada propuesta de edición, cuántas se aceptan) y PR con Claude Code (PR fusionados con código asistido). Está en Team y Enterprise, y lo ven Admin y Owner. Es conceptual: en el taller se usan datos ficticios. **Mucho uso con poca aceptación no es éxito: es una señal.**
- *Actividad "¿En qué nivel estamos?"* (software factory ficticia): 4 perfiles. **Alfa:** «Copiamos código de un chat sin decirle a nadie.» **Beta:** «Tenemos un `AGENTS.md` del año pasado que nadie actualiza.» **Gamma:** «Todos usamos el mismo `AGENTS.md` y un hook que bloquea `.env`, pero las specs las escribe quien quiere.» **Delta:** «Ninguna historia llega a `main` sin spec, plan, CI en verde y PR revisado.» Se vota el nivel de cada equipo y se propone un siguiente paso concreto.

**C2 · Multiplicadores (6', láminas 8–10).**
- **Estrategia de adopción** (Anthropic Academy, *Deploying Claude Enterprise with confidence* [8]): pocos primero, todos después. **Piloto chico** (un equipo, un objetivo medible), **champions por equipo** (muestran, no imponen) y **senior multiplicador** (revisa, enseña y ajusta).
- **Ritmo:** 1 estandarizar (un flujo común) · 2 medir (uso y resultados) · 3 ajustar (lo que no funcionó) · 4 escalar (al siguiente equipo).
- **Tres errores típicos:** comprar licencias sin capacitar (todos tienen la herramienta, nadie cambia cómo trabaja; solución: licencia más práctica guiada), imponer sin piloto (un flujo que nadie probó llega a todos al mismo tiempo; solución: un equipo primero) y medir solo líneas de código (premia generar mucho, no entregar bien; solución: varios indicadores juntos).

**C3 · Playbook como código (25', láminas 11–16).**
- **Anatomía de un plugin** [55] (docs consultadas el 12-nov-2026): `arriendo-playbook/` con `.claude-plugin/plugin.json`, `skills/`, `agents/revisor.md`, `hooks/hooks.json`, `scripts/guardian.sh` y `.mcp.json`. Todo lleva prefijo (`arriendo-playbook:revisor`). `plugin.json` es opcional: solo `name` es obligatorio. Las rutas del plugin usan `${CLAUDE_PLUGIN_ROOT}`. Se valida con `claude plugin validate`.
- **Un marketplace interno** es un repositorio de GitHub con `.claude-plugin/marketplace.json` (`name`, `owner` y `plugins`, cada uno con su `source`, por ejemplo `./plugins/arriendo-playbook`). El id de un plugin es `plugin@marketplace` (`arriendo-playbook@arriendo-vela`). Una actualización llega cuando cambia `version`. En el curso, los repos son públicos y sin secretos.
- **Lo que viaja y lo que no** (*Plugin manifest reference*, consultado el 3-nov-2026 [56]): viajan Skills, subagentes, hooks, comandos y servidores MCP. Van como **plantilla** `AGENTS.md`, `CLAUDE.md`, `REVIEW.md` y las reglas de permisos, porque son archivos de cada repositorio. Los secretos no viajan: se piden al instalar. Se instala con un comando y se actualiza con una versión.
- *Demo 1 "Empaqueta lo que ya funciona" (10', arriendo-web, Claude Pro):* se pegan los insumos `plugin.json` y `hooks.json` en `plugins/arriendo-playbook/`; se le pide a Claude Code «Copia el agente revisor, el script guardian.sh y una plantilla de AGENTS.md dentro de plugins/arriendo-playbook/ respetando la estructura de un plugin»; se valida con `claude plugin validate`. **Punto de control:** la validación termina sin errores. Commit: `feat: plugin arriendo-playbook 1.0.0`.
- *Demo 2 "Instálalo como otro equipo" (9', arriendo-web, Claude Pro):* se pega el catálogo `insumos/marketplace.json` en `.claude-plugin/` de arriendo-web; desde la carpeta `otro-equipo/` se agrega el marketplace con `/plugin marketplace add <ruta-local>` y se instala con `/plugin install arriendo-playbook@arriendo-vela`. **Punto de control:** `/plugin` lo muestra y el guardián bloquea leer `.env`. Commit: `feat: marketplace arriendo-vela`.

**C4 · Herramienta justa (13', láminas 17–21).**
- **¿Qué superficie para qué tarea?** **Chat:** pensar, planificar, documentos y specs (U1 y U2). **Claude Code**, en terminal o IDE: el trabajo diario en el repo (U3 a U8). **Desktop:** lo mismo, con interfaz gráfica (opcional). **Web:** tareas en la nube, en paralelo (opcional). **CI:** revisiones y diagnósticos sin pedirlos (U6 y U7). La pregunta: ¿necesita tu repo, tu terminal o que nadie lo pida?
- **¿Qué modelo para qué tarea?** (docs *Model configuration*, consultadas el 12-nov-2026; modelos por familia, sin número de versión). **Haiku:** tareas simples y rápidas, menos costo. **Sonnet** (predeterminado): el día a día del código. **Opus:** razonamiento complejo, más capacidad. `opusplan`: Opus planifica y Sonnet ejecuta. Se confirma con `/model` el día de la clase.
- **Portabilidad:** MCP, Agent Skills y `AGENTS.md` son formatos abiertos [30][42][18]; Copilot, Codex y Gemini CLI los leen en distinto grado.
- *Actividad "Tarea → superficie → modelo" (2'):* 4 tareas: corregir un typo, migrar un módulo, resumir un PR y diagnosticar un legado. Para cada una: ¿superficie? ¿modelo?
- *Demo 3 "Súmale datos de solo lectura" (8', arriendo-playbook 1.1.0, Claude Pro):* se pega `insumos/academy.mcp.json` como `.mcp.json` del plugin (`claude-academy`, transporte http, `version` 1.1.0); se trae la nueva versión con `/plugin marketplace update arriendo-vela` y se revisa con `/mcp`; se pide sin nombrar la herramienta «Busca en Claude Academy un curso sobre plugins». **Punto de control:** `/mcp` muestra `claude-academy` con 3 herramientas y la búsqueda trae enlaces; ¿escribir? No hay herramienta. Commit: `feat: MCP de Claude Academy en arriendo-playbook 1.1.0`. Fuente: *Claude Academy MCP* (consultada el 12-nov-2026).

### A3. Cierre de la clase (repaso, lámina 22)
- **Antes del receso: 4 preguntas.** Madurez (¿En qué nivel está tu equipo y qué evidencia lo muestra?) · Multiplicadores (¿Quién sería el champion de tu equipo y por qué?) · Playbook como código (¿Qué no viaja en un plugin y cómo lo entregas?) · Herramienta justa (¿Qué modelo usarías para corregir un typo, y por qué?).
- **Idea de cierre:** *Las buenas prácticas no se leen: se instalan con un comando.*
- **Receso (15'), lámina 23.** Pídele a Claude Code que traiga lo nuevo de la U9 a tu repo (`docs/adopcion/`). Formen grupos de 3: un compañero de tu grupo instalará tu plugin.
- **Temas secundarios para investigar por su cuenta:**
  - Comparación con otros proveedores y estrategias multi-proveedor (lectura complementaria).
  - Curso *Deploying Claude Enterprise with confidence* [8].
  - Informes organizacionales de Claude Academy para medir la capacitación [8].
  - API de analytics de Enterprise [29].
  - *Introduction to MCP* [30].
  - *Plays* "skills como conocimiento institucional" y "sesiones paralelas y subagentes" del AI-native SDLC [24].
  - CSS para impresión: `@page`, saltos de página y fuentes embebidas.

## Bloque B — Taller "Tu playbook instalable y el plan de la BU" (90', individual)

**Misión.** Que otro equipo instale con un comando la forma de trabajar de Pedidos Web, y entregar el plan para que la BU la adopte.

**Caso.** La BU de Desarrollo tiene 4 equipos y cada uno adoptó la IA a su manera. La gerencia quiere que todos trabajen como Pedidos Web.

**Problemática.** Pedidos Web ya trabaja en el nivel 4 (el equipo del curso, de la U1 a la U8). Facturación, Bodega y Reportes no: su nivel lo descubres en `analytics-ficticio.csv`. Un documento de buenas prácticas se olvida; lo que se instala, se usa.

**Antes de la clase.** Instala Playwright (lo usa tu Skill de PDF en la etapa 3): `python3 -m pip install playwright markdown` y `python3 -m playwright install chromium` (en Windows PowerShell, `py -m` en vez de `python3 -m`). Necesitas Claude Code 2.1.281 o superior, Git Bash si usas Windows, tu repo `pedidos-web` de la U8 público en GitHub y un compañero de tu grupo de 3.

**Preparación (7').** Traer a tu repo solo lo nuevo de la U9 con el camino A del README de `unidad-9/taller/pedidos-web`, pidiéndoselo a Claude Code con este texto: «Trae a mi repo pedidos-web lo nuevo de la Unidad 9: docs/adopcion/analytics-ficticio.csv y docs/adopcion/plan-evolucion.md. No toques ningún otro archivo y muéstrame el diff antes del commit.» Solo se suma `docs/adopcion/` (el CSV y la plantilla del plan); no se toca `README.md`, `AGENTS.md`, `REVIEW.md`, `PedidosWeb.sln`, `.github/`, `src/`, `tests/`, `legado/`, `migracion/`, `specs/` ni el resto de `docs/`. En `.claude/` solo sumarás tu Skill de la etapa 3.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| Preparación | 7 | Pedirle a Claude Code lo nuevo de la U9 desde el repo de material y revisar que el diff solo muestre los 2 archivos de `docs/adopcion/`. Dejar tu repo al día y público en GitHub, y saber qué compañero de tu grupo de 3 instalará tu plugin. | — |
| 1 · Diagnóstico | 18 | Pedirle a Claude Code que lea `docs/adopcion/analytics-ficticio.csv` y ubique a cada uno de los 4 equipos en el modelo de 5 niveles, con al menos dos indicadores como evidencia, y que escriba el diagnóstico en `docs/adopcion/plan-evolucion.md` siguiendo la plantilla, sin inventar datos que no estén en el CSV. Revisar que cada nivel tenga sus 2 indicadores y subir el commit. | C1 |
| 2 · Playbook instalable | 35 | Pedirle a Claude Code que arme `plugins/pedidos-playbook/` versión 1.0.0 con el revisor (U7), `documentar-modulo` (U3), `planificador-proyectos-web` (copiada de su repo en GitHub), el guardián de la U8 (`scripts/guardian.sh`), la plantilla de `AGENTS.md` y el MCP `claude-academy` de solo lectura; que lo publique en `.claude-plugin/marketplace.json` con el nombre `pedidos-<usuario-github>` y que lo valide. Subirlo a `main`: tu compañero lo instala desde tu GitHub y ve `claude-academy` en `/mcp`. | C3, C4 |
| 3 · El plan en PDF | 20 | Pedirle a Claude Code que cree la Skill `.claude/skills/pdf-con-estilo/` con `SKILL.md`, `assets/plantilla.html` y `scripts/html_a_pdf.py` (Playwright), y que la use para convertir `docs/adopcion/plan-evolucion.md` en `docs/adopcion/plan-evolucion.pdf`. Probar la reutilización con `docs/gobernanza/politica-ia.md`: si tienes que tocar el CSS para que se vea bien, todavía no es reutilizable. | C3 |
| Tu reto (obligatorio) | — | Hacer un cambio tuyo en `pedidos-playbook` (por ejemplo, mejorar la `description` de una Skill o sumar una regla al revisor), publicarlo como versión 1.1.0 y lograr que tu compañero lo reciba. El pedido a Claude Code lo escribes tú, con contexto, qué quieres y cómo sabes que quedó bien. Tema nuevo: un plugin instalado es una copia; tu compañero no ve tus cambios hasta que los publicas como versión nueva. | C3 |

Las etapas con minutos suman 80'. «Tu reto» no tiene minutos asignados en el sitio: si no alcanzas en clase, lo terminas en tu casa, porque es parte del entregable. **Cierre del taller:** confirma que todo está en `main`: `.claude-plugin/marketplace.json` con `pedidos-<usuario-github>`, `plugins/pedidos-playbook/` con sus 6 piezas y versión 1.1.0, `.claude/skills/pdf-con-estilo/` con sus 3 piezas, `docs/adopcion/plan-evolucion.md` y su PDF, y que tu compañero instaló tu plugin y recibió la 1.1.0.

**Qué se espera, sin darte la respuesta.**
- Ningún indicador solo basta: mucho uso con poca aceptación es una señal, no un éxito.
- Un plugin que solo funciona en tu máquina no es un playbook: se valida cuando tu compañero lo instala desde tu GitHub.
- Una Skill reutilizable separa el diseño del contenido: si tienes que tocar el CSS para que se vea bien, todavía no lo es.

**Qué investigar si te trabas** (fuentes de la guía, consultadas el 12-nov-2026). Etapa 1: *Rastrear el uso del equipo con análisis* (`code.claude.com/docs/es/analytics`). Etapa 2: *Create a Claude Code plugin* (`code.claude.com/docs/en/plugins/create`) y *Use Claude Academy from Claude* (`academy.claude.com/help/mcp`). Etapa 2 y tu reto: *Create a marketplace* (`code.claude.com/docs/en/plugin-marketplaces`). Etapa 3: *Extend Claude with skills* (`code.claude.com/docs/en/skills`).

- **Entregable:** *Plan de evolución de la IA para una Business Unit* en PDF (`docs/adopcion/plan-evolucion.md` con el diagnóstico de los 4 equipos y su PDF, generado con `pdf-con-estilo`) más `pedidos-playbook` 1.0.0 en `main`, instalado por un compañero (incluye `planificador-proyectos-web` y el MCP `claude-academy`), y la versión 1.1.0 recibida por tu compañero (tu reto). Hereda a la Unidad 10: la Skill `pdf-con-estilo` y los grupos de 3. No borres tu plugin ni tu marketplace: los vuelves a usar.
- **Puntos de control:**
  - **Preparación:** el diff solo muestra los 2 archivos nuevos en `docs/adopcion/` y tu repo sigue público en GitHub.
  - **Etapa 1:** cada equipo tiene un nivel y dos indicadores del CSV que lo respaldan, escritos en `plan-evolucion.md`.
  - **Etapa 2:** tu compañero instala tu plugin desde tu GitHub y ve `claude-academy` en `/mcp`.
  - **Etapa 3:** `plan-evolucion.pdf` tiene portada, títulos y tablas legibles, y `politica-ia.md` sale con el mismo diseño.
  - **Tu reto:** tu compañero ve la versión 1.1.0 y tu cambio funciona en su equipo.
- **Errores frecuentes** («Si algo falla»):
  - Tu compañero no logra agregar tu marketplace → ¿tu repo es público? ¿`marketplace.json` está en `.claude-plugin/`, en la raíz?
  - La validación marca una ruta del plugin → la ruta parte de la raíz del marketplace con `./` y la carpeta existe.
  - El guardián no corre en el equipo de tu compañero → la ruta a `guardian.sh` usa `${CLAUDE_PLUGIN_ROOT}`, no una ruta de tu máquina.
  - `claude-academy` no aparece en `/mcp` → `.mcp.json` va en la raíz del plugin, no dentro de `.claude-plugin/`.
  - El PDF sale sin colores de fondo → el script debe imprimir el fondo y el CSS no debe desactivarlo.
- **Plan B:** ninguno definido en esta versión.
- **Extensión opcional:** ninguna definida en esta versión.

## Cierre (15')
Tres alumnos muestran el plugin instalado en el equipo de su compañero y su PDF. **Entregable:** plan de evolución en PDF más `pedidos-playbook` en `main`. **Esta tarde, Unidad 10:** workshop integrador; llevas `pdf-con-estilo` y tu grupo de 3. Idea final: *las buenas prácticas no se leen: se instalan con un comando.*
