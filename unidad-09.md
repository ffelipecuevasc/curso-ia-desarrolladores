# Unidad 9 — Escalabilidad, madurez organizacional y adopción de la IA

**Día 5 · bloque mañana** · Nivel 88 → 95 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Requisitos: Docker con `pedidos-pg` (Unidad 5) + Python 3 con Playwright

> **Preparación previa (alumnos):** `pip install playwright && playwright install chromium`. Lo usa la Skill de PDF del taller. Si falla, sirve Chrome o Edge en modo headless.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Madurez** | Mide dónde estás antes de decidir hacia dónde ir. | Docs *Analytics* [29] · AI-native SDLC: tabla tradicional frente a AI-native [3] |
| C2 | **Multiplicadores** | La adopción la empujan personas, no licencias. | Curso *Deploying Claude Enterprise with confidence* [8] |
| C3 | **Playbook como código** | Las buenas prácticas se instalan, no se leen. | Docs de *Plugins* [55][56] · AI-native SDLC: skills como conocimiento institucional [24] |
| C4 | **Herramienta justa** | Superficie y modelo según la tarea; estándares para no quedar atado. | *Introduction to MCP* [30] · agents.md [42] · *Introduction to agent skills* [18] |

### A2. Desarrollo (70')

**C1 · Madurez (15').** Modelo de 5 niveles de Vela LATAM:

| Nivel | Nombre | Descripción |
|---|---|---|
| 1 | Uso a escondidas | Cada persona usa la herramienta que quiere, sin reglas. |
| 2 | Uso individual | Hay licencias, pero cada uno trabaja a su manera. |
| 3 | Equipo con reglas | Existen `AGENTS.md`, `REVIEW.md` y hooks compartidos. |
| 4 | Proceso AI-native | Spec → plan → CI → revisión; cada etapa deja su artefacto. |
| 5 | Organización que mide y mejora | Usa indicadores para decidir y mejorar. |

- **Indicadores de adopción del panel de analytics** [29]: usuarios activos, sesiones, líneas aceptadas, tasa de aceptación y PR con asistencia de Claude Code. Se muestran con **datos ficticios**.
- *Demo "¿En qué nivel estamos?":* 4 perfiles de equipos de una software factory ficticia. Por ejemplo, "copiamos código de un chat sin decirle a nadie" o "tenemos un `AGENTS.md` del año pasado que nadie actualiza". El curso ubica cada uno en el modelo y propone el siguiente paso.

**C2 · Multiplicadores (10').**
- **Estrategia de adopción:** un piloto chico, *champions* por equipo y un desarrollador senior que actúa como multiplicador.
- **Ritmo:** estandarizar flujos, medir, ajustar y escalar.
- **Errores típicos:** comprar licencias sin capacitar, imponer sin piloto y medir solo líneas de código.

**C3 · Playbook como código (25').**
- **Un plugin** empaqueta Skills, subagentes, hooks y servidores MCP en una unidad versionada. Su estructura mínima es `.claude-plugin/plugin.json` más las carpetas `skills/`, `agents/`, `hooks/` y `.mcp.json` [55][56].
- **Un marketplace interno** es un repositorio de GitHub con `.claude-plugin/marketplace.json`. Los equipos lo agregan con `/plugin marketplace add org/repo` e instalan con `/plugin install`.
- **Limitación:** `AGENTS.md` no viaja dentro del plugin, porque es un archivo de cada repositorio. El playbook lo entrega como **plantilla** para copiar.
- *Demo "Instala el playbook":* el instructor publica `vela-playbook` con la Skill **`planificador-proyectos-web`** incluida [44] y los alumnos lo instalan en vivo.

**C4 · Herramienta justa (20').**
- **Dentro del ecosistema:** qué superficie usar (chat, Claude Code en terminal o IDE, Desktop, web, CI) y qué modelo (Haiku para tareas simples y baratas, Sonnet para el día a día, Opus para lo complejo).
- **Portabilidad:** MCP, Agent Skills y `AGENTS.md` son formatos abiertos, así que reducen el costo de cambiar de herramienta en el futuro.
- *Actividad "Matriz tarea × superficie × modelo":* 8 tareas, por ejemplo corregir un typo, migrar un módulo, resumir un PR o diagnosticar un legado. El curso elige superficie y modelo para cada una y justifica el costo.
- *Demo del instructor: "Mi primer MCP en 3 minutos".* Conectar el servidor MCP oficial de **Claude Academy** (de solo lectura y sin autenticación) [8]:

  ```bash
  claude mcp add --transport http claude-academy https://academy.claude.com/mcp
  ```

  Luego pedir *"Busca en Claude Academy cursos sobre subagentes y dame los enlaces"* y mostrar en `/mcp` las herramientas que expone.

### A3. Cierre (10')
- **Repaso:** Madurez · Multiplicadores · Playbook como código · Herramienta justa.
- **Temas secundarios para investigar por su cuenta:**
  - Comparación con otros proveedores y estrategias multi-proveedor (lectura complementaria).
  - Curso *Deploying Claude Enterprise with confidence* [8].
  - Informes organizacionales de Claude Academy para medir la capacitación [8].
  - API de analytics de Enterprise [29].
  - *Introduction to MCP* y *MCP: Advanced Topics* (en Python) [30].
  - *Plays* "skills como conocimiento institucional" y "sesiones paralelas y subagentes" del AI-native SDLC [24].
  - CSS para impresión: `@page`, saltos de página y fuentes embebidas.

## Bloque B — Taller "Plan de evolución para una Business Unit" (80', grupos de 3)

**Caso de uso.** La BU de Desarrollo de la distribuidora tiene 4 equipos. Uno de ellos, el de Pedidos Web, ya trabaja como en este curso. La gerencia quiere que los otros tres adopten la misma forma de trabajar y pide un **plan de evolución**, en un PDF presentable, y un **playbook instalable**.

**Problemática.** El archivo `analytics-ficticio.csv` muestra una adopción muy dispar. Un equipo usa Claude Code a diario y con buenas prácticas, otro casi no lo usa y otro lo usa mucho, pero con una tasa de aceptación bajísima. Cada equipo tiene sus propias reglas, y los equipos de reportes piden consultar la base de datos del portal **sin permiso de escritura**.

**Solución a implementar.** Cada grupo diagnostica la BU, diseña el roadmap y entrega dos cosas que se instalan o se abren: el plugin del playbook, con acceso de solo lectura a la base vía MCP, y el plan en PDF generado por una Skill propia.

**Roles del grupo:**
- **A, arquitecto del playbook:** plugin + MCP.
- **B, diseñador:** Skill de PDF.
- **C, estratega:** diagnóstico y roadmap.

Todos revisan el trabajo de los demás en el paso 3.

| Paso | Min | Quién | Qué hacen | Concepto |
|---|---|---|---|---|
| 1 | 10 | Todos | Leer `analytics-ficticio.csv` con Claude y ubicar a cada equipo en el modelo de madurez. | C1 |
| 2a | 35 | A | Crear el plugin `pedidos-playbook`: subagente `revisor`, Skill `documentar-modulo` y `planificador-proyectos-web` [44], hook guardián de la Unidad 8 y plantilla `AGENTS.md`. Agregar en `.mcp.json` un servidor MCP de PostgreSQL **en modo de solo lectura** apuntando a `pedidos-pg` [57]. Publicarlo en un marketplace del grupo. | C3, C4 |
| 2b | 35 | B | Crear la Skill `.claude/skills/pdf-con-estilo/`: un `SKILL.md` con la **paleta de colores y la tipografía** que elija el grupo, una plantilla HTML con CSS profesional (portada, encabezados, tablas e índice) y un script que convierta el HTML a PDF. | C3 |
| 2c | 35 | C | Redactar el contenido del plan: diagnóstico por equipo, roadmap a 6 y 12 meses con hitos e indicadores, *champions* y plan de adopción. | C1, C2 |
| 3 | 20 | Todos | Cada integrante instala el plugin desde el marketplace del grupo. **Punto de control MCP:** preguntar "¿cuántos pedidos hay por estado?" y verificar que una instrucción de escritura sea rechazada. Revisión cruzada de los tres trabajos. | C3, C4 |
| 4 | 10 | Todos | Generar el PDF con la Skill de B a partir del contenido de C, revisarlo y corregirlo. | C3 |
| 5 | 5 | — | Cierre: tres grupos muestran su PDF y su `/plugin` instalado. | — |

**Qué se espera, sin darte la respuesta.**
- **El plugin se valida en una máquina que no sea la de quien lo creó.** Si solo funciona en la máquina de A, no es un playbook.
- **"Solo lectura" se demuestra.** Si Claude logra escribir en la base, el MCP está mal configurado.
- **La Skill de PDF tiene que poder reutilizarse.** Con otro contenido, debe producir un documento con el mismo diseño, sin que tengas que tocar el CSS.

**Qué investigar si te trabas.**
- La estructura de `plugin.json` y `marketplace.json` [55][56].
- La configuración del servidor Postgres MCP en modo restringido [57]. En Linux, para que el contenedor alcance la base, agrega `--add-host=host.docker.internal:host-gateway`.
- La estructura de una Skill con `assets/` y `scripts/` [45], usando el planificador como modelo [44].
- Para el PDF, `page.pdf()` de Playwright y CSS `@page`.

- **Entregable:** *Plan de evolución de la IA para una Business Unit* en PDF, generado con la Skill del grupo, más el repositorio del marketplace con el plugin `pedidos-playbook` (incluye MCP de solo lectura y `planificador-proyectos-web`).
- **Plan B:**
  - Si Playwright no instala, el script usa Chrome o Edge headless: `--headless --print-to-pdf`.
  - Si el MCP no conecta, se documenta la configuración y se valida en el día 5, durante la Unidad 10.
  - Hay una estructura de plugin de ejemplo lista para completar.
- **Extensión opcional:** agregar al plugin un comando o Skill que genere el informe de madurez de un equipo a partir del CSV.
