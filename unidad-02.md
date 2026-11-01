# Unidad 2 — Desarrollo agéntico y desarrollo guiado por especificaciones (Spec-Driven Development)

**Día 1 · bloque tarde** · Nivel 10 → 20 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Stack: ASP.NET Core (.NET 10) + Rider + xUnit

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Agente** | Piensa, actúa, verifica. | Claude Code 101, "How Claude Code works" [9] |
| C2 | **Contexto** | Lo que el agente sabe, tú lo decides. | Claude Code 101, "The CLAUDE.md file" [9] · *Best practices* [11] |
| C3 | **Spec primero** | Primero el qué, luego el cómo. | AI-native SDLC: `intent.md`, requisitos y plan mode [16][12] · Claude Code in action [10] |
| C4 | **Tú firmas** | Si no leíste el diff, no hay commit. | Claude Code 101: explore → plan → code → commit [6] |

En la certificación *Claude Certified Developer – Foundations*, esta unidad cubre parcialmente el módulo de agentes y tool use [32].

### A2. Desarrollo (70')

**C1 · Agente (15').** De la ingeniería de prompts a la ingeniería de contexto. El ciclo del agente es reunir contexto → actuar → verificar. Sus herramientas son leer, editar y ejecutar. Los modos de permiso son aprobación manual, auto-aceptar y **plan mode**, este último de solo lectura [10].
- *Demo "Plan mode en vivo":* sobre una app ficticia de lista de tareas (**TodoMini**), Claude propone un plan para agregar "fecha de vencimiento". El curso critica el plan, lo corregimos y recién entonces se ejecuta.

**C2 · Contexto (15').**
- `AGENTS.md` es la memoria del proyecto: comandos, estilo y reglas que el agente no puede adivinar. Recordatorio de la Unidad 1: Claude Code ≥ 2.1.277 lo lee solo si no existe un `CLAUDE.md` [41].
- La ventana de contexto se administra con `/context`, `/compact` y `/clear` [9][11].
- *Demo:* el mismo pedido con y sin `AGENTS.md`, y `/context` para ver cuánto pesa cada cosa.

**C3 · Spec primero (25').** Este es el núcleo de la unidad.
- **SDD con artefactos:** `intent.md` → `spec.md` → `plan.md` → `tasks.md`. La especificación es el artefacto principal, y los criterios de verificación viven dentro de ella [11][12].
- Recorrido por la **plantilla de spec comentada**, sección por sección.
- *Demo "Prompt suelto frente a spec":* en la tienda ficticia **TiendaMini**, pedir "haz un carrito con descuentos" en una frase y luego entregar el `spec.md` con ejemplos de entrada y salida. Comparar ambos resultados.
- Conexión con Scrum (Unidad 1): cada historia del sprint tiene su `spec.md`.

**C4 · Tú firmas (15').** El desarrollador pasa a ser arquitecto y revisor. Checklist de revisión de diff: ¿cumple la spec?, ¿los tests prueban algo real?, ¿hay casos borde?, ¿hay secretos?, ¿cambió algo que no pedí?
- *Actividad "Caza el error en el diff":* se proyecta un diff generado con 3 problemas plantados (un caso borde sin cubrir, una API key en el código y un test que siempre pasa). El curso los encuentra en parejas y gana la pareja más rápida.

### A3. Cierre (10')
- **Repaso:** Agente · Contexto · Spec primero · Tú firmas. El curso completa cada frase.
- **Temas secundarios para investigar por su cuenta:**
  - Estándar `AGENTS.md` y su adopción en otros agentes [42], y cómo convive con `CLAUDE.md` en Claude Code [41].
  - Frameworks de SDD de terceros (GitHub Spec Kit): enfoque y diferencias con el flujo nativo.
  - Subagentes incorporados (Explore, Plan) [14].
  - Claude Code en la web y control remoto [15].
  - MCP, solo como concepto (se trabaja en la Unidad 9) [30].
  - Lecciones del AI-native SDLC sobre `intent.md`, requisitos y plan mode [16][12], y de Claude Code in action sobre sesiones largas [10].
  - **Libros:** Osmani, *Beyond Vibe Coding* (O'Reilly, 2025) [37] y Martinelli, *Spec-Driven Development: From Specs to Code with AI Agents* (Apress, 2026) [43].

**Nota para el instructor.** `/init` podría generar un `CLAUDE.md`, y eso desactivaría el `AGENTS.md`. Antes del dictado, prueba su comportamiento en la versión instalada y, si hace falta, pide que el resultado se escriba en `AGENTS.md`.

## Bloque B — Taller "Mi primera feature guiada por spec" (80', individual)

**Caso de uso.** Primer sprint del **portal web de Pedidos**. La distribuidora necesita que sus vendedores consulten pedidos desde el navegador, sin entrar al sistema Delphi. Para esto se construye una API nueva en ASP.NET Core, con datos de ejemplo en memoria.

**Problemática.** El Product Owner dejó en el backlog la historia *"Como vendedor, quiero listar pedidos filtrando por cliente, estado y rango de fechas"*. La historia es vaga: no dice qué estados existen, qué pasa si las fechas vienen invertidas ni cuántos resultados se devuelven. Si se le entrega así al agente, inventará las reglas por su cuenta.

**Solución a implementar.** Cada alumno hace de PO y Dev en un mini sprint. Convierte la historia en una spec verificable, la lleva a un plan aprobado, implementa con Claude Code y entrega solo lo que pasó su revisión.

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 10 | Ejecutar el **prompt maestro** entregado. Claude te entrevista y genera borradores de `AGENTS.md` y `spec.md` con secciones `TODO`. | C2, C3 |
| 2 | 15 | Completar la spec **tú mismo**: decidir los estados, la validación de fechas, la paginación y los errores. Escribir al menos 5 criterios de aceptación verificables. **Punto de control:** el instructor revisa un criterio por fila. | C3 |
| 3 | 15 | Abrir Claude Code en **plan mode**, pedir el plan, cuestionarlo y aprobarlo. Guardarlo como `plan.md`. | C1, C3 |
| 4 | 25 | Implementar y generar tests xUnit, uno por criterio. Ejecutar `dotnet test`. | C1 |
| 5 | 10 | Revisar el diff con la checklist de C4, corregir y hacer commit. | C4 |
| 6 | 5 | Cierre: tres alumnos muestran un criterio de su spec y el test que lo prueba. | — |

**Qué se espera, sin darte la respuesta.** El prompt maestro te ahorra escribir el formato, no las decisiones. Una buena spec permite que otra persona escriba los tests sin preguntarte nada. Si Claude implementa algo que no está en la spec, eso es un hallazgo de revisión, no un regalo.

**Qué investigar si te trabas.** Para escribir criterios de aceptación, la plantilla comentada de A2. Para el plan, la lección de plan mode del playbook [12]. Para estructurar el `AGENTS.md`, agents.md [42].

- **Entregable:** *Flujo completo guiado por especificación*: `AGENTS.md`, `spec.md`, `plan.md`, código, tests en verde y commit.
- **Plan B:**
  - Rama `u2-respaldo` con el `spec.md` ya escrito, para quien se atrase en el paso 2.
  - Si falla la red, el instructor proyecta la sesión y los alumnos revisan el diff entregado.
- **Extensión opcional:** agregar un criterio nuevo a la spec y verificar que Claude lo implemente con su test.
