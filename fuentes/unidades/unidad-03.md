# Unidad 3 — Desarrollo asistido por IA: generación, refactorización y documentación

**Día 2 · bloque mañana** · Nivel 20 → 30 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard · Stack: ASP.NET Core + Rider + xUnit

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Pasos chicos** | Una tarea, un incremento, un commit. | *Best practices* [11] · *Common workflows* [17] |
| C2 | **Red de tests** | Sin tests no se refactoriza. | *Common workflows*: refactor y tests [17] · *Claude Code in action*: rewind [10] |
| C3 | **Skills** | Enséñale una vez, lo usa siempre. | *Introduction to agent skills* [18] · Docs de Skills [45] |
| C4 | **Desconfía y verifica** | Lee, ejecuta y pide que explique. | *AI Fluency for builders*: "Discernment for code" [7] |

### A2. Desarrollo (70')

**C1 · Pasos chicos (15').** Generación incremental: pedir una tarea a la vez, dar contexto preciso (mencionar archivos con `@`, pegar el error, adjuntar una imagen del mockup) y declarar el scaffolding y las convenciones en `AGENTS.md` [11].
- *Demo "El commit gigante frente a tres commits chicos":* en **TodoMini**, agregar "etiquetas" a las tareas en un solo pedido y luego en tres incrementos. El curso decide cuál de los dos diffs revisaría en 5 minutos.

**C2 · Red de tests (18').** Refactorizar significa cambiar la forma sin cambiar el comportamiento. El orden es: tests primero, cambios chicos, ejecutar los tests después de cada paso y, si algo se rompe, volver atrás con git o con *rewind* [10][17].
- *Demo "Refactor con red":* una función JavaScript `calcularEnvio()` con código duplicado y nombres pobres. Claude escribe primero los tests, luego refactoriza. Después se introduce un error a propósito y un test lo atrapa.

**C3 · Skills (25').**
- **Qué es una Skill:** una carpeta con un `SKILL.md`, que tiene frontmatter `name` y `description` más las instrucciones. Puede llevar archivos de referencia y scripts. Vive en `.claude/skills/` y Claude la activa sola cuando el pedido calza con su `description` [18][45].
- **Cuándo usar Skill y cuándo `AGENTS.md`:** `AGENTS.md` lleva las reglas que aplican **siempre**. La Skill lleva un **procedimiento** que se usa solo cuando corresponde.
- *Demo "Mi primera Skill en vivo":* crear `escribir-readme` y comprobar que se activa sin nombrarla.
- **Skill real del instructor: `planificador-proyectos-web` (5') [44].**
  - Planifica y documenta un proyecto web *antes* de que el agente programe, combinando SDD con prácticas de Scrum sin ceremonias: backlog priorizado e iteraciones cortas con revisión al cierre.
  - Entrevista al desarrollador y, según la complejidad (pequeño, mediano o complejo), genera `AGENTS.md`, backlog, especificaciones con criterios verificables por sí o no, decisiones (RDA), contrato OpenAPI y bitácora.
  - Incluye un validador en Python y un `settings.json` que impide al agente hacer commit, push o deploy. Esos pasos quedan en manos de la persona.
  - Se instala copiándola a `.claude/skills/` y se invoca con `/planificador-proyectos-web`.
  - *Muestra:* recorrer su estructura (`SKILL.md`, `references/`, `assets/`, `scripts/`) como ejemplo de una Skill profesional.

**C4 · Desconfía y verifica (12').** Toda salida se lee, se ejecuta y se le pide al agente que explique sus decisiones ("¿por qué elegiste esto?" o "¿qué caso borde no cubriste?") [7]. La documentación generada (README, ADR, diagramas Mermaid) también se verifica contra el código.
- *Demo del instructor "Mismo pedido, dos modelos":* el mismo refactor con Sonnet y con Opus usando `/model`. Comparar el diff, el tiempo y la explicación. Mensaje: **el modelo se elige según la tarea**. Los alumnos no repiten esta demo, para cuidar la cuota del asiento Standard.

### A3. Cierre (10')
- **Repaso:** Pasos chicos · Red de tests · Skills · Desconfía y verifica.
- **Temas secundarios para investigar por su cuenta:**
  - Refactorización arquitectónica profunda: separación de capas e inversión de dependencias (anexo).
  - Skills avanzadas: `allowed-tools`, divulgación progresiva y scripts dentro de la Skill [18][45].
  - Comandos personalizados y estilos de salida de Claude Code.
  - Probar interfaces web con Claude in Chrome [6].
  - Curso completo *Introduction to agent skills* [18] y la guía *Common workflows* [17].
  - Repositorio `planificador-proyectos-web`: instalarlo y usarlo en un proyecto personal [44].

## Bloque B — Taller "Módulo funcional y documentado" (80', individual)

**Caso de uso.** Segundo sprint del **portal web de Pedidos**. Ya existe el endpoint "listar pedidos" de la Unidad 2. Ahora los vendedores necesitan ver el **detalle de un pedido**: cliente, líneas, totales y estado.

**Problemática.** En el repo hay un módulo heredado, `ClientesService`, escrito con apuro por un ex integrante del equipo. Tiene un método de 120 líneas, código duplicado y nombres como `proc2()`. Todavía funciona y tiene 6 tests, pero nadie se atreve a tocarlo. Además, ningún módulo está documentado, y cada persona del equipo documenta a su manera.

**Solución a implementar.** Construir la nueva funcionalidad en pasos chicos, dejar el módulo heredado legible sin cambiar su comportamiento y crear una Skill que estandarice cómo documenta el equipo.

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 25 | Escribir el `spec.md` breve de "detalle de pedido" (como en la Unidad 2) e implementarlo en **al menos 3 incrementos**, con commit y tests en verde en cada uno. | C1, C4 |
| 2 | 20 | Refactorizar `ClientesService`. Ejecutar sus 6 tests antes de empezar, cambiar en pasos chicos y ejecutar `dotnet test` después de cada paso. Si falta un test para lo que vas a tocar, escríbelo primero. **Punto de control:** los 6 tests originales siguen en verde. | C2 |
| 3 | 20 | Crear la Skill `.claude/skills/documentar-modulo/SKILL.md` y usarla para documentar los dos módulos: propósito, API pública, ejemplo de uso y un diagrama Mermaid. | C3, C4 |
| 4 | 10 | Repetir un tramo del refactor con **dos prompts distintos** (uno vago y otro con objetivo, restricciones y criterio de verificación) y anotar las diferencias en `docs/comparacion-prompts.md`. | C4 |
| 5 | 5 | Cierre: dos alumnos muestran su Skill y explican su `description`. | — |

**Qué se espera, sin darte la respuesta.**
- Tu Skill funciona solo si Claude la activa **sin que la nombres**. Si no se activa, el problema está en la `description`.
- En el refactor, si cambió el comportamiento, no es un refactor.
- La documentación generada tiene que coincidir con el código. Revísala.

**Qué investigar si te trabas.**
- La estructura y el frontmatter de `SKILL.md` [45] y la lección "Creating your first skill" [18].
- Para el refactor, la sección "Refactor code" de *Common workflows* [17].
- Como modelo de una Skill bien construida, el `SKILL.md` del planificador [44].

- **Entregable:** *Módulo funcional desarrollado y documentado con IA*: funcionalidad con tests, `ClientesService` refactorizado, Skill `documentar-modulo`, documentación generada y `comparacion-prompts.md`.
- **Plan B:** rama `u3-respaldo` con la funcionalidad de la Unidad 2 resuelta, para quien no la terminó. Si la Skill no se activa, invocarla con `/documentar-modulo` y revisar su `description` después.
- **Extensión opcional:** agregar `allowed-tools` a la Skill para que solo pueda leer y escribir en `docs/`.
