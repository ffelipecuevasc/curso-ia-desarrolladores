# Unidad 3 — Desarrollo asistido por IA: generación, refactorización y documentación

**Día 2 · bloque mañana** · Nivel 20 → 30 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Stack: ASP.NET Core (.NET 10) + Rider + xUnit

> Versión 2 (10-nov-2026): demos simplificadas sobre un solo proyecto (TodoMini) y taller de 4 etapas.

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Pasos chicos** | Una tarea, un incremento, un commit. | *Best practices* [11] · *Common workflows* [17] |
| C2 | **Red de tests** | Sin tests no se refactoriza. | *Common workflows*: refactor y tests [17] · *Claude Code in action*: rewind [10] |
| C3 | **Skills** | Enséñale una vez, lo usa siempre. | *Introduction to agent skills* [18] · Docs de Skills [45] |
| C4 | **Desconfía y verifica** | Lee, ejecuta y pide que explique. | *AI Fluency for builders*: "Discernment for code" [7] |

Caso hilo: sprint 2 de `pedidos-web`. Ya tienes la API de pedidos de la Unidad 2; hoy, el detalle del pedido y un módulo heredado.

### A2. Desarrollo (70')

Las tres demos ocurren sobre **un solo proyecto, TodoMini** (biblioteca C# con xUnit, carpeta `unidad-3/demos/todomini` del repo de material), y cuentan una historia seguida: agregar → ordenar → documentar.

**C1 · Pasos chicos (15').** Generación incremental: pedir una tarea a la vez, con contexto preciso (mencionar archivos con `@`, pegar el error completo, adjuntar el mockup) y las convenciones fijas en `AGENTS.md` [11]. Si no puedes revisar un diff en 5 minutos, el paso es demasiado grande.
- *Demo 1 "El commit gigante frente a tres commits chicos":* agregar etiquetas a las tareas de TodoMini en un solo pedido y luego en tres incrementos (etiquetas en `Tarea` · `Etiquetar(id, etiqueta)` · `ListarPorEtiqueta(etiqueta)`), con tests y commit en cada uno. El curso vota cuál diff revisaría en 5 minutos.

**C2 · Red de tests (18').** Refactorizar es cambiar la forma sin cambiar el comportamiento. El ciclo seguro: tests en verde → un cambio chico → tests → verde: commit / rojo: volver atrás con git o con `/rewind`, nunca "arreglar encima" [10][17].
- *Demo 2 "Refactor con red":* el método heredado `ResumenTexto()` de TodoMini (nombres pobres y un recorrido duplicado). Claude escribe primero tests de caracterización, refactoriza en dos pasos chicos y luego se introduce un error a propósito que un test atrapa.

**C3 · Skills (25').**
- **Qué es una Skill:** una carpeta con un `SKILL.md` (frontmatter `name` y `description` más las instrucciones). Puede llevar `references/`, `scripts/` y `assets/`. Vive en `.claude/skills/` y Claude la activa sola cuando el pedido calza con su `description` (divulgación progresiva) [18][45].
- **Skill o `AGENTS.md`:** `AGENTS.md` lleva las reglas que aplican **siempre**; la Skill, un **procedimiento** que se usa cuando corresponde.
- **La description lo es todo:** qué hace + cuándo usarla, con lo clave primero.
- *Demo 3 "Mi primera Skill":* crear `escribir-readme` en TodoMini y pedir un README sin nombrarla. El README resultante incluye las etiquetas y el `ResumenTexto()` ordenado.
- **Recorrido: `planificador-proyectos-web`, Skill real del instructor (MIT) [44].** Planifica y documenta un proyecto web antes de programar (SDD con prácticas de Scrum). Estructura profesional: `SKILL.md` breve, 4 guías en `references/`, plantillas en `assets/` y un validador en `scripts/`. Genera un `.claude/settings.json` que bloquea editar los documentos inmutables y, en APIs con base de datos, los comandos contra bases remotas. Se instala copiando la subcarpeta de la Skill a `.claude/skills/` y se invoca con `/planificador-proyectos-web`.

**C4 · Desconfía y verifica (12').** Tres verbos antes de aceptar: **leer** el diff completo, **ejecutar** tests y app, **preguntar** ("¿por qué elegiste esto?", "¿qué caso borde no cubriste?") [7]. La documentación generada también se verifica contra el código.
- **El modelo se elige según la tarea:** rápido para tareas acotadas, más capaz para cambios amplios o ambiguos; se cambia con `/model` y el consumo se ve con `/usage`. Sin demo en vivo; práctica sugerida para la casa: mismo pedido, dos modelos.

### A3. Cierre (10')
- **Repaso con cuatro preguntas:** Pasos chicos (¿cómo sabes que un paso es lo bastante chico?) · Red de tests (¿qué debe existir antes de tocar código que no escribiste?) · Skills (¿qué decide si Claude usa tu Skill sin que la nombres?) · Desconfía y verifica (¿qué haces antes de aceptar lo que hizo Claude?).
- **Temas para investigar por su cuenta:**
  - Refactorización arquitectónica: separación de capas e inversión de dependencias.
  - Skills avanzadas: `allowed-tools`, divulgación progresiva y scripts dentro de la Skill [18][45].
  - Comandos personalizados y estilos de salida de Claude Code.
  - Probar interfaces web con Claude in Chrome.
  - Curso *Introduction to agent skills* [18] y la guía *Common workflows* [17].
  - Instalar `planificador-proyectos-web` y usarlo en un proyecto personal [44].

## Bloque B — Taller "Módulo funcional y documentado" (80', individual)

**Misión.** Tu sprint 2 en `pedidos-web`: construyes algo nuevo, ordenas algo viejo y dejas explicado lo que tocaste.

**Caso.** Los vendedores necesitan ver el **detalle de un pedido**: cliente, líneas, total y estado. Además, en el repo hay un módulo heredado, `ClientesService`, que funciona y tiene 4 tests, pero que nadie se atreve a tocar ni ha documentado (un método `proc2()`, nombres pobres y código repetido).

**Preparación (en el receso).** Traer a tu repo solo lo nuevo de la U3 (carpetas `Lineas` y `Clientes` con sus tests y dos plantillas), pidiéndole ayuda a Claude Code con el README de `unidad-3/taller/pedidos-web`. Se suma; no reemplaza nada tuyo.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 · Construir | 30 | Spec breve con la plantilla (`specs/HU-02-detalle-pedido/spec.md`) y el detalle en 3 incrementos: calcular el total desde las líneas → obtener el detalle por id → ruta nueva `GET /api/pedidos/{id}/detalle`. Un commit por incremento. | C1, C4 |
| 2 · Ordenar | 20 | Refactorizar `ClientesService` en pasos chicos, sin cambiar lo que hace. Los 4 tests son la red. | C2, C4 |
| 3 · Explicar | 20 | Crear la Skill `.claude/skills/documentar-modulo/SKILL.md` desde la plantilla y usarla, sin nombrarla, para generar `docs/modulos/ClientesService.md` (propósito, API pública, ejemplo de uso y diagrama Mermaid). | C3, C4 |
| 4 · Cierre | 10 | Dos personas muestran su Skill y explican su description en una frase. | — |

**Datos clave.** El total del detalle es la suma de las líneas y calza con `Pedido.Total` (el pedido 8 suma 120.100). **Sin IVA**: el cálculo de totales del legado llega en la Unidad 5. La ruta `GET /api/pedidos/{id}` no se toca.

**Qué se espera, sin darte la respuesta.**
- Cada incremento se revisa en 5 minutos y deja los tests en verde.
- En el refactor, si cambió el comportamiento, no es un refactor.
- Tu Skill funciona solo si Claude la activa sin que la nombres. Si no, el problema está en la description.
- La documentación generada tiene que coincidir con el código.

- **Entregable:** *Módulo funcional desarrollado y documentado con IA*: detalle del pedido con tests (3 commits o más), `ClientesService` refactorizado con sus 4 tests en verde, Skill `documentar-modulo` y `docs/modulos/ClientesService.md`. Todo con commits hechos por el alumno.
- **Plan B:** carpeta `unidad-3/taller/u3-respaldo` del repo de material (no es una rama), con una spec de referencia de la HU-02, para quien se trabe en la etapa 1. Si la Skill no se activa, invocarla con `/documentar-modulo` mientras se mejora la description. Si falla .NET o la red, trabajo en pareja.
- **Extensión opcional:** agregar `allowed-tools` a la Skill.
