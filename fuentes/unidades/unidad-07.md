# Unidad 7 — IA para revisión de código (code review), colaboración e ingeniería de software

**Día 4 · bloque mañana** · Nivel 70 → 80 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard + **credencial de GitHub Actions (la misma de la Unidad 6, pendiente)**

## Bloque A — Cátedra (85')

### A1. Apertura: conceptos fundamentales y material oficial (5')
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **La IA comenta, tú decides** | Ningún hallazgo se acepta sin evaluarlo. | *Claude Code 101*: "Code review" [9] · Docs *Code Review* [23] |
| C2 | **PR chico** | Lo que no se puede revisar, no se revisa. | *Claude Code in action*: PR y GitHub Action [10] · AI-native SDLC: IA en el ciclo de PR [24] |
| C3 | **Reglas escritas** | `AGENTS.md` para todo, `REVIEW.md` para revisar. | *Customize Code Review* [49] · agents.md [42] |
| C4 | **Configuración compartida** | `.claude/` versionada, igual para todo el equipo. | Docs `/code-review` local [50] · *Introduction to subagents* [14] |

### A2. Desarrollo (70')

**C1 · La IA comenta, tú decides (15').** Qué detecta bien la IA (errores de lógica, casos borde, secretos, inconsistencias) y qué no (si el cambio resuelve el problema del negocio, o el contexto político del equipo). Cada hallazgo tiene tres salidas: **aceptar**, **discutir** o **descartar con argumento**. La propia documentación lo advierte: una revisión sin hallazgos no significa que el código esté libre de errores [23].
- *Demo "Comentario útil o ruido":* 8 comentarios de IA sobre un PR ficticio de **RecetasApp**. El curso vota cada uno: aceptar, discutir o descartar.

**C2 · PR chico (15').** Tamaño razonable, commits legibles y una descripción que explique el qué, el por qué y cómo probarlo. Claude puede redactar la descripción a partir del diff, pero la persona la valida.
- *Demo "El PR de 2.000 líneas":* el mismo cambio en un PR gigante y luego dividido en tres PR. Comparar cuántos hallazgos útiles aparecen en cada caso, y generar en vivo la descripción de uno de los PR chicos.

**C3 · Reglas escritas (25').**
- **`AGENTS.md`:** reglas del proyecto para *todo* trabajo, sea generar o revisar.
- **`REVIEW.md`:** reglas **solo de revisión**. Qué se marca como importante, qué se ignora (código generado, lo que ya valida el CI), el límite de comentarios menores y los chequeos obligatorios [49].
- **Hallazgo importante (verificado en la documentación, 31-oct-2026):**

| Herramienta | Lee `CLAUDE.md` | Lee `REVIEW.md` | Menciona `AGENTS.md` |
|---|---|---|---|
| Code Review gestionado | Sí | Sí, desde la rama base o la principal, nunca desde el propio PR | No |
| `/code-review` local | Sí | **No** | No |

  **Consecuencia para el curso:** nuestros revisores (el subagente y el workflow) **leen `AGENTS.md` y `REVIEW.md` porque se lo indicamos explícitamente** en su configuración, no por defecto [49][50].
- *Demo "REVIEW.md en vivo":* escribir un `REVIEW.md` de 10 líneas y comparar los hallazgos del revisor antes y después.

**C4 · Configuración compartida (15').** Versionar en el repo la carpeta `.claude/`: `agents/` (subagente `revisor`), `skills/`, `settings.json` y hooks. Así todo el equipo revisa con las mismas reglas.
- **Tres formas de pedir una revisión con IA:**
  - El comando local `/code-review` (en cualquier plan, sale de la cuota del asiento) [50].
  - Un subagente revisor propio [14].
  - La GitHub Action sobre el PR [22].
- **Code Review gestionado (solo mención):** es el servicio de Anthropic para planes Team y Enterprise. Lo activa un Owner. Publica hallazgos por severidad, nunca aprueba ni bloquea un PR y se cobra por uso [23].

### A3. Cierre (10')
- **Repaso:** La IA comenta, tú decides · PR chico · Reglas escritas · Configuración compartida.
- **Temas secundarios para investigar por su cuenta:**
  - **Claude Tag**, Claude dentro de Slack: se etiqueta a @Claude en un hilo para que trabaje con las herramientas y el contexto del equipo. Está en beta para Team y Enterprise y lo configura un Owner [51].
  - Code Review gestionado: niveles de revisión, costos y protección de ramas [23][49].
  - Ultrareview y `/code-review --fix` [50].
  - Pipelines de revisión con varios agentes especializados (seguridad, arquitectura, estilo).
  - Identificación de mejoras arquitectónicas a nivel de sistema.
  - Plugin `code-review` para la GitHub Action [22].

**Nota para el instructor.** Antes del curso, prueba en la versión instalada si `/code-review` y la acción leen `AGENTS.md` cuando no existe `CLAUDE.md`. Si no lo hacen, la instrucción explícita del taller lo resuelve igual.

## Bloque B — Taller "Proceso de code review" (80', parejas cruzadas)

**Caso de uso.** El equipo de Pedidos Web crece: ahora varias parejas trabajan en paralelo sobre el mismo portal, y todo cambio entra por pull request. El pipeline de la Unidad 6 ya prueba cada PR.

**Problemática.** Las revisiones son desparejas. Algunos aprueban sin leer y otros dejan 40 comentarios de estilo. Nadie sabe qué es "importante". Las descripciones de los PR dicen "arreglos varios". Además, la IA comenta muchas cosas y el equipo no sabe cuáles tomar en serio.

**Solución a implementar.** Definir por escrito cómo revisa el equipo, configurar revisores de IA que sigan esas reglas y practicar una revisión humana cruzada que decida sobre cada hallazgo.

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 10 | Abrir un PR con el trabajo de la Unidad 6. Pedir a Claude la descripción (qué, por qué, cómo probarlo), ajustarla y publicarla. | C2 |
| 2 | 20 | Escribir `REVIEW.md`: qué es importante, qué se ignora, límite de comentarios menores y 3 chequeos obligatorios. Crear el subagente `.claude/agents/revisor.md`, de solo lectura, cuya instrucción diga leer `AGENTS.md` y `REVIEW.md` antes de revisar. Ejecutarlo sobre la rama. | C3, C4 |
| 3 | 15 | Crear `.github/workflows/claude-review.yml` (modo automatización, en `pull_request`). El `prompt` indica leer `AGENTS.md` y `REVIEW.md`, revisar el PR y comentar. Mantener los permisos mínimos y `--max-turns` de la Unidad 6. **Punto de control:** Claude publica comentarios en el PR. | C3, C4 |
| 4 | 20 | **Revisión cruzada:** cada pareja revisa el PR de otra. Por cada hallazgo de la IA, deja una respuesta (aceptar, discutir o descartar) con su argumento, y agrega al menos un hallazgo humano que la IA no vio. | C1 |
| 5 | 10 | Aplicar las mejoras acordadas, armar `docs/checklist-revision.md` con lo aprendido y hacer merge con el CI en verde. | C1, C2 |
| 6 | 5 | Cierre: cada pareja comparte el hallazgo que más discutieron. | — |

**Qué se espera, sin darte la respuesta.**
- Un buen `REVIEW.md` hace que la IA comente **menos y mejor**. Si los comentarios siguen siendo ruido, ajusta las reglas, no el código.
- Descartar un hallazgo de la IA es válido si lo argumentas. Aceptar todo sin leer no lo es.
- El hallazgo humano del paso 4 es la evidencia de que la revisión no se delegó por completo.

**Qué investigar si te trabas.**
- El ejemplo de `REVIEW.md` en *Customize Code Review* [49].
- El modo automatización y el ejemplo "Run a skill" de la documentación de GitHub Actions [22].
- La configuración de subagentes con herramientas restringidas [14].

- **Entregable:** *Proceso completo de code review asistido por IA*: `REVIEW.md`, subagente `revisor`, `claude-review.yml`, PR con hallazgos respondidos y `checklist-revision.md`.
- **Plan B:** si la credencial de GitHub Actions no está disponible, se omite el paso 3. La revisión de IA se hace con el subagente o `/code-review` local, y el resultado se pega como comentario en el PR.
- **Extensión opcional:** un segundo subagente, `revisor-seguridad`, enfocado solo en secretos e inyección SQL. Es un buen anticipo de la Unidad 8.
