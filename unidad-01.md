# Unidad 1 — IA generativa aplicada al desarrollo moderno y al ciclo de vida del software (SDLC)

**Día 1 · bloque mañana** · Nivel 0 → 10 · Bloque A 85' · Receso 15' · Bloque B 80' · Licencia: Claude Team Standard + JetBrains All Products Pack

## Bloque A — Cátedra (85')

### A1. Presentación del curso (12')
- **Instructor.** Francisco Felipe Cuevas Cerón: ingeniero informático, más de 12 años como docente, instructor y desarrollador web full stack (INACAP, Duoc UC, IPLACEX, Alura Latam y bootcamps Talento Digital, con más de 300 profesionales formados). Tiene un diplomado en Andragogía (U. de Chile) y es **Claude Certified Developer – Foundations**, además de certificaciones de Oracle (×5), AWS (×3), Python y Gemini. Es fundador de Comunidad Pulso Devs [40].
- **Mapa del curso.** Las 10 unidades con sus conceptos fundamentales, en una lámina de recorrido de 0 a 100.
- **Modalidad.** Cada unidad dura 3 h: 85' de cátedra, 15' de receso y 80' de taller. Se ven 2 unidades por día (6 h de clase y 1 h de almuerzo), así que el curso completo toma 5 días.
- **Proyecto integrador.** "Pedidos Legado → Pedidos Web" avanza clase a clase.
- **Material y certificación.** Todo el material se basa en documentación oficial de Anthropic. Las Unidades 1, 2, 6 y 8 cubren parte del temario de *Claude Certified Developer – Foundations* [32]. El examen está abierto a personas de organizaciones del Claude Partner Network [34]. Al cerrar la Unidad 10 habrá un cuestionario online de preparación (su formato se define en esa unidad).

### A2. Conceptos fundamentales y material oficial (5')
| # | Concepto | Material oficial |
|---|---|---|
| C1 | Un LLM es un motor probabilístico con memoria limitada: tokens, ventana de contexto, variabilidad y alucinaciones | AI Fluency: Framework & Foundations [5] · Claude 101 [8] |
| C2 | Un asistente responde; un agente actúa y verifica | Claude Code 101, "What is Claude Code?" [9] |
| C3 | SDLC con IA y SDD: de vibe coding a ingeniería asistida | AI-native SDLC playbook (curso y artículo) [16][4] |
| C4 | El desarrollador sigue siendo responsable: marco 4D | AI Fluency for builders [7] |

### A3. Desarrollo (59')
**C1 · LLM (12').** Tokens, ventana de contexto como presupuesto, no determinismo y alucinaciones.
- *Demo "Mismo prompt, dos respuestas":* pedir dos veces en Claude web una función JavaScript que valide un RUT chileno. Comparar las dos salidas y buscar diferencias, supuestos inventados o errores con el dígito verificador "K".

**C2 · Asistente frente a agente (10').** Superficies de Claude (web, Projects, Claude Code en terminal, JetBrains y Desktop) y modelos (Haiku, Sonnet, Opus).
- **Convención del curso: `AGENTS.md`.** Usaremos `AGENTS.md`, el estándar abierto que leen varios agentes de IA de distintos proveedores [42], como archivo de instrucciones del proyecto en lugar de `CLAUDE.md`. Claude Code lo acepta desde la versión **2.1.277**, pero solo como respaldo: lo lee únicamente si no existe ningún `CLAUDE.md`, ni en el proyecto ni en carpetas superiores como el home [41].
- *Demo "Chat, Project o agente":* en la app ficticia **ReservaCancha** (reservas de canchas de fútbol), pedir "agrega validación de horario" en chat, luego en un Project con el README y finalmente en Claude Code sobre el repo. Comparar qué entiende y qué hace cada uno.

**C3 · SDLC con IA y SDD (25').**
- **Vibe coding (8').** Programar describiendo "la onda" y aceptando lo que salga sin leerlo. Sirve para explorar ideas propias o prototipos desechables, pero es una pésima práctica para software que va a producción. Dos casos reales:
  - **Replit / SaaStr (julio 2025):** el agente borró una base de datos de producción pese a la instrucción explícita de no tocarla, y luego generó datos falsos [35].
  - **Lovable, CVE-2025-48757 (mayo 2025):** más de 170 apps generadas quedaron sin políticas RLS en Supabase y expusieron correos, teléfonos y claves de API [36].
- **Ingeniería asistida por IA (5').** Según Addy Osmani, *Beyond Vibe Coding* (O'Reilly, 2025), la IA resuelve rápido el "70%" del trabajo. El 30% restante (casos borde, seguridad, integración, mantenibilidad) lo exige el desarrollador con objetivos, restricciones y revisión crítica [37].
- **SDLC AI-native (5').** El proceso pasa de una línea con traspasos a un ciclo, donde cada etapa deja un artefacto versionado que la siguiente lee [3][4].
- **Scrum y SDD conviven (7').**
  - **Scrum** organiza el *trabajo*: backlog, sprints cortos, daily, review y retrospectiva. Se explica a nivel superficial.
  - **SDD** estructura el *desarrollo técnico*: primero la especificación, después el código. Aquí solo se menciona, porque se profundiza en la Unidad 2.
  - **Idea clave:** en la mayoría de las empresas de software ambos coexisten de forma obligatoria. Scrum dice *qué* se hace en el sprint, y SDD dice *cómo* se construye cada ítem.
  - **Ejemplo guiado:** un desarrollador que trabaja solo usa Scrum para organizar su proyecto y SDD para su desarrollo técnico. Ver `unidad1-caso-SCRUM-y-SDD.md`.

**C4 · Responsabilidad y 4D (12').** Delegación, Descripción, Discernimiento y Diligencia, aplicados a programar [5][7].
- *Actividad "¿Delegar o no?" (votación a mano alzada o en Mentimeter):* 8 tarjetas de una software factory. Por ejemplo: escribir tests de un formulario de login, elegir la pasarela de pagos, responder un correo de un cliente molesto, migrar estilos CSS a Tailwind, aprobar un PR propio, documentar una API. El curso decide si cada una se delega, se delega con revisión o no se delega, y qué "D" pesa más.

### A4. Cierre (9')
- **Repaso:** C1 a C4 en una frase cada uno. El curso los completa en voz alta.
- **Temas secundarios para investigar por su cuenta:**
  - Curso completo *AI Fluency: Framework & Foundations* [5] y su variante para builders [7].
  - Curso *Claude 101* [8].
  - Lecciones "What is Claude Code?" e "Installing Claude Code" de *Claude Code 101* [9].
  - Lectura completa del *AI-native SDLC playbook* [4].
- Estándar `AGENTS.md` en agents.md [42].
- Guía oficial de Scrum (scrumguides.org).
  - Prefacio y capítulo "The 70% Problem" de *Beyond Vibe Coding* [37].
  - Historia de los asistentes de código y casos de adopción (customer stories de claude.com).

**Nota para el instructor: por qué JetBrains y no VS Code.** El argumento de seguridad se presenta con un caso real: en mayo de 2026, una versión troyanizada de la extensión Nx Console estuvo 18 minutos en el Marketplace de VS Code. Se instaló sola por actualización automática y robó credenciales, incluidas configuraciones de Claude Code [38]. Hay que matizar que **todo IDE con plugins tiene riesgo**. La propia documentación de Claude Code advierte que, en JetBrains, el modo `acceptEdits` puede modificar archivos de configuración del IDE [39]. El mensaje es: pocos plugins, de fuentes confiables, y aprobación manual de las ediciones.

## Bloque B — Taller "Mi entorno y mi mapa" (80')

**Caso de uso.** Ingresas como desarrollador al equipo que heredó **"Pedidos Legado → Pedidos Web"**, el sistema de pedidos de una distribuidora. El sistema está hecho en Delphi con DBISAM, y la empresa quiere un portal web nuevo y migrar parte del legado a .NET + PostgreSQL.

**Problemática.** Hoy el equipo trabaja sin IA o con vibe coding aislado: cada uno usa la herramienta a su manera, nadie sabe en qué etapas del ciclo ayuda de verdad y no hay un entorno común. Antes de tocar una línea de código, el líder técnico pide dos cosas: un entorno profesional igual para todos y un mapa de dónde la IA aporta y con qué control.

**Solución a implementar.** Dejar tu entorno listo y construir, con ayuda de Claude, el mapa de uso de IA del proyecto.

| Paso | Min | Qué haces | Concepto |
|---|---|---|---|
| 1 | 35 | Instalar Claude Code, autenticarte con la cuenta Team y verificar con `claude --version` que la versión sea **2.1.277 o superior**. Activar la lectura de instrucciones del proyecto en `/config` y confirmar que no exista ningún `CLAUDE.md` en el home ni en las carpetas superiores [41]. Activar la licencia JetBrains e instalar WebStorm y Rider. Instalar el plugin Claude Code [Beta] y abrir `claude` desde la terminal integrada. Crear un Project en Claude web con el README del caso. **Punto de control:** Claude Code responde dentro del repo desde el IDE y, al preguntarle por las reglas del proyecto, cita el `AGENTS.md` de ejemplo. | C2 |
| 2 | 8 | Responder el cuestionario de madurez entregado y pedirle a Claude que tabule las respuestas. | C4 |
| 3 | 12 | Implementar la función `formatearFolio()` descrita en el README, primero sin IA y después con Claude Code. Registrar tiempo, errores y qué tuviste que corregir. | C1, C4 |
| 4 | 20 | Construir `docs/mapa-sdlc.md`. Para cada etapa del SDLC indica: qué tarea se delega a Claude, qué artefacto queda versionado, qué revisa una persona, qué riesgo hay y en qué evento de Scrum ocurre (usa como modelo el caso Scrum + SDD). | C3, C4 |
| 5 | 5 | Commit del mapa y cierre grupal: cada fila comparte una etapa. | — |

**Qué se espera, sin darte la respuesta.** El mapa no es una lista de "la IA hace todo". Cada etapa debe dejar claro dónde decide una persona. Si el paso 3 te mostró un error que la IA cometió y tú corregiste, úsalo como evidencia en el mapa.

**Qué investigar si te trabas.** La guía de instalación del plugin para JetBrains [39], la lección "Installing Claude Code" [9] y cómo se activa `AGENTS.md` en Claude Code [41]. Para el mapa, la tabla tradicional frente a AI-native del playbook [3].

- **Entregable:** `docs/mapa-sdlc.md` en el repo del caso hilo, más la tabla del paso 3.
- **Plan B:**
  - Si falla la terminal, usar la pestaña "Code" de Claude Desktop [2].
  - Si falla el plugin, ejecutar `claude` en una terminal externa y conectarse con `/ide` [39].
  - Si falla la red, hacer el mapa en papel con la plantilla impresa.
