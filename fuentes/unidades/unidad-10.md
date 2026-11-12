# Unidad 10 — Retorno de la inversión (ROI), productividad y taller integrador

**Día 5 · bloque tarde** · Nivel 95 → 100 · Bloque A 60' · Receso 15' · Bloque B 90' · Cierre 15' · Licencia: demos con Claude Pro (instructor) · taller con Claude Team Standard (también funciona con Pro) · Stack: Claude Code + Skill `pdf-con-estilo` (Python con Playwright)

> Versión 2 (12-nov-2026): taller individual en `pedidos-web` (ya no en equipos de varias personas y 80'), de 90' en 3 etapas más la etapa obligatoria «Tu reto» (el punto de equilibrio). Se eliminan el caso ficticio, la demo y los datos alternativos de la versión 1, el plan B, las presentaciones de 4' y el comando de consumo anterior (el vigente es `/usage`). El cuestionario final ya no es parte del taller: se publica después, en el sitio del curso. 3 demos sobre un solo proyecto (arriendo-web, continúa las de la U9) con un mini mapa **1 Mide → 2 Calcula → 3 Cuenta**: la métrica trampa, el ROI con supuestos y el informe en 1 página. Agenda de 180' (clase 60' · receso 15' · taller 90' · cierre 15'). Fuentes: la presentación y la guía de la unidad (12-nov-2026), el README del taller y la versión 1 de este archivo. Donde se contradicen, para el taller manda la guía y para foco, objetivos, conceptos, demos y repaso manda la presentación. Modelos por familia (Haiku, Sonnet y Opus), sin número de versión.

## Bloque A — Clase (60')

### A1. Apertura: conceptos fundamentales y material oficial (láminas 1–3)
| # | Concepto | En una frase | Material oficial |
|---|---|---|---|
| C1 | **Medir lo que importa** | Velocidad y calidad, no líneas de código. | Docs *Analytics* [29] · *DORA's software delivery performance metrics* (consultada el 12-nov-2026) [58] |
| C2 | **ROI con supuestos** | Sin supuestos escritos, el número no vale. | Docs *Costs* de Claude Code [13] · Planes y precios de Claude (consultada el 12-nov-2026) |
| C3 | **Contar para decidir** | Una página, una recomendación. | AI Fluency: Descripción y Diligencia [5] |
| C4 | **Integrar** | Nueve entregables, un solo plan. | AI-native SDLC playbook [4] · *Claude certifications · FAQ* (consultada el 12-nov-2026) |

El hilo del día: *el caso hilo, `pedidos-web`, llega a su última milla*. La lámina 2 lo resume: hoy la pregunta no es técnica, sino «¿vale la pena y cómo se lo explico a quien decide?». La gerencia necesita saber cuánto cuesta, cuánto aporta y qué sigue con la forma de trabajar de Pedidos Web, y no va a leer nueve documentos.

Las demos del instructor ocurren en **arriendo-web** (carpeta `unidad-10/demos` del repo de material). La historia avanza en tres pasos: **1 Mide → 2 Calcula → 3 Cuenta**. Los insumos de cada demo se pegan en `docs/roi/insumos/`: `metricas-equipos.csv` (equipos ficticios Tarifas y Reservas, 8 semanas), `supuestos-roi.md` e `informe-malo.md`. En el taller, cada alumno repite el método en su `pedidos-web`.

**Licencias.** Las demos del instructor se hacen con **Claude Pro**. El taller usa **Claude Team Standard** y también funciona con **Claude Pro**.

*Los 6' de clase que la presentación no etiqueta por concepto quedan en la apertura y el repaso (clase de 60'). Las demos (9' + 12' + 10' = 31') están dentro de los minutos de su concepto.*

### A2. Desarrollo (54')

**C1 · Medir lo que importa (16', láminas 4–7).**
- **Dos familias de métricas.** *Entrega, DORA (5 métricas)* [58]: **Throughput** (change lead time, deployment frequency y failed deployment recovery time) e **Inestabilidad** (change fail rate y deployment rework rate). *Adopción, panel de Claude Code* [29]: usuarios activos y sesiones, líneas aceptadas y tasa de aceptación; la contribución (PR y líneas con Claude Code) está en beta con la GitHub app. **La adopción dice si se usa. DORA dice si sirve.**
- **Lo que el panel mide y lo que no** (datos ficticios en la lámina 6: 17 de 20 usuarios activos, 41.300 líneas aceptadas, 72 % de tasa de aceptación y 38 % de PR con Claude Code). *Usar no es aportar* (usuarios activos); las líneas aceptadas *sobrestiman* porque no descuentan las que después se borran; *aceptar no es revisar* (tasa de aceptación); los PR con Claude Code *subestiman* porque es una cifra conservadora. Está en Team y Enterprise y lo ven Admin y Owner. La contribución es beta y no está disponible con Zero Data Retention.
- *Demo 1 "La métrica trampa" (9', arriendo-web, Claude Pro):* se pega `docs/roi/insumos/metricas-equipos.csv` (Tarifas y Reservas, 8 semanas, ficticio). Se pregunta primero solo con la columna `lineas_aceptadas`: «¿Qué equipo rinde más?». Luego: «Ahora usa las columnas DORA, defectos y retrabajo. ¿Cambia tu respuesta? Escríbelo en `docs/roi/lectura-metricas.md`, con una tabla por equipo y qué faltaría saber para decidir». **Punto de control:** la conclusión se da vuelta (Reservas rinde más) y cada afirmación cita una columna del CSV. Commit: `docs: lectura de métricas del piloto de ArriendoWeb`.

**C2 · ROI con supuestos (18', láminas 8–11).**
- **Fórmula:** ROI = (beneficio − costo) / costo. **Costos:** asientos, capacitación y curva de adopción. **Beneficios:** horas ahorradas × valor hora y defectos evitados × costo en producción [13].
- **Tres tipos de supuesto.** **Oficial:** publicado por el proveedor, con fecha (asiento Team Standard, USD 25/mes en la página de precios de Claude, 12-nov-2026). **Medido:** dato del propio piloto (lead time, defectos y retrabajo del CSV). **Estimado:** juicio del equipo, siempre el más débil (valor hora de USD 20, supuesto del ejercicio). **Si no puedes decir de dónde salió un número, no entra al modelo.** El uso extra se revisa con `/usage`.
- **Un rango, no un número:** escenario **conservador** (el ahorro más bajo que defenderías), **optimista** (el piloto se replica tal cual) y sensibilidad: «¿y si el ahorro es la mitad?». Si el ROI cambia de signo con un solo supuesto, ese supuesto es lo primero que hay que medir.
- *Demo 2 "ROI con supuestos" (12', arriendo-web, Claude Pro):* se pega `docs/roi/insumos/supuestos-roi.md`; se le pide a Claude Code «Arma `docs/roi/modelo-roi.md`: costos, beneficios, cada supuesto con su tipo (oficial, medido o estimado) y su fuente, escenarios conservador y optimista. Muestra los cálculos»; después, «Baja el ahorro a la mitad y dime cuánto se mueve el ROI». **Resultado esperado (6 meses, 8 devs):** costo USD 6.000; conservador +58,7 %; optimista +128 %; con el ahorro a la mitad −10,7 %. El asiento es oficial (página de precios de Claude, 12-nov-2026); el resto son estimados del ejercicio. Commit: `docs: modelo de ROI con escenarios y sensibilidad`.

**C3 · Contar para decidir (14', láminas 12–14).**
- **El informe ejecutivo en 5 franjas:** 1 Problema (qué decisión hay que tomar y por qué ahora) · 2 Qué se hizo (el piloto en dos líneas, sin jerga) · 3 Resultados (con su rango e incertidumbre) · 4 Recomendación (una sola, que se pueda aprobar o rechazar) · 5 Próximo paso (quién, qué y para cuándo).
- **Diligencia** [5]: «Preparado con apoyo de IA; cifras verificadas por [nombre]».
- *Demo 3 "El informe en 1 página" (10', arriendo-web, Claude Pro):* se pega `docs/roi/insumos/informe-malo.md`; se le pide a Claude Code «Critica este informe con las 5 franjas: problema, qué se hizo, resultados con incertidumbre, recomendación y próximo paso. Luego reescríbelo en `docs/roi/informe-ejecutivo.md` en una página, usando solo cifras de `modelo-roi.md`, y agrega una línea de Diligencia». **Punto de control:** una recomendación explícita, el rango de ROI (no un solo número) y la línea «Preparado con apoyo de IA; cifras verificadas por una persona». Commit: `docs: informe ejecutivo de 1 página`.

**C4 · Integrar (6', láminas 15–17).**
- **De 0 a 100, cada entregable alimenta al siguiente:** U1 mapa del SDLC · U2 flujo SDD · U3 módulo documentado · U4 diagnóstico del legado · U5 plan de migración · U6 pipeline con tests · U7 code review · U8 guía de gobernanza · U9 plan de la BU y playbook · **U10 plan integrado**. El plan integrado no repite los nueve: los conecta. Caso hilo: Pedidos Legado → Pedidos Web.
- **Seis prácticas:** spec primero (U2) · tú firmas (U2) · pasos chicos y tests (U3 · U6) · mirar sin tocar (U4 · U5) · la IA comenta, tú decides (U7) · política ejecutable (U8 · U9).
- **Cómo seguir:** los cursos oficiales de Claude Academy (academy.claude.com) y la certificación *Claude Certified Developer – Foundations*: USD 125, solo para personas de organizaciones del Claude Partner Network [32][34] (*Claude certifications · FAQ*, consultada el 12-nov-2026). MCP, Agent Skills y `AGENTS.md` son estándares abiertos que otras herramientas leen en distinto grado.

### A3. Cierre de la clase (repaso, lámina 18)
- **Antes del receso: 4 preguntas.** Medir lo que importa (¿Por qué más líneas aceptadas no prueban que un equipo rinde más?) · ROI con supuestos (¿Qué supuesto movería más tu resultado si estuviera mal?) · Contar para decidir (¿Qué debe saber la gerencia si lee solo la primera página?) · Integrar (¿Qué dos entregables del curso usarías como evidencia en tu plan?).
- **Idea de cierre:** *Un ROI honesto y modesto convence más que uno espectacular sin respaldo.*
- **Receso (15'), lámina 19.** Pídele a Claude Code que traiga lo nuevo de la U10 a tu repo (`docs/roi/`). Revisa que tu Skill `pdf-con-estilo` siga funcionando.
- **Temas secundarios para investigar por su cuenta:**
  - API de analytics de Enterprise y OpenTelemetry para métricas propias [29][26].
  - Estudios publicados sobre productividad con IA en desarrollo de software (citar siempre la fecha y la muestra).
  - El marco DORA completo [58].
  - La certificación *Claude Certified Developer – Foundations* (USD 125, solo para personas de organizaciones del Claude Partner Network).

## Bloque B — Taller "Plan integrado de adopción de IA" (90', individual)

**Misión.** Decirle a la gerencia, en un PDF, cuánto cuesta, cuánto aporta y qué sigue con la forma de trabajar de Pedidos Web.

**Caso.** Terminó el piloto. La gerencia decide si extiende la forma de trabajar de Pedidos Web, y no va a leer nueve documentos.

**Problemática.** La gerencia necesita cuatro respuestas: ¿cuánto cuesta? (asientos, capacitación y aprendizaje), ¿cuánto aporta? (horas, defectos y tiempos de entrega), ¿qué riesgos hay? (qué podría salir mal y cómo se controla) y ¿qué sigue? (la recomendación y el próximo paso). Los datos son ficticios y la muestra es pequeña: este ROI es un ejercicio de método, no una prueba de productividad.

**Antes de la clase.** Necesitas Claude Code 2.1.281 o superior con tu cuenta Claude Team (también funciona con Pro), tu repo `pedidos-web` de la U9 en GitHub y tu Skill `pdf-con-estilo`, que usa Playwright, funcionando. Para comprobarlo, pídele a Claude Code que genere de nuevo `docs/adopcion/plan-evolucion.pdf` con tu Skill. Si falla: `python3 -m pip install playwright markdown` y `python3 -m playwright install chromium` (en Windows PowerShell, `py -m` en vez de `python3 -m`).

**Preparación (5').** Traer a tu repo solo lo nuevo de la U10 con el camino A del README de `unidad-10/taller/pedidos-web`, pidiéndoselo a Claude Code con este texto: «Trae a mi repo pedidos-web lo nuevo de la Unidad 10: la carpeta docs/roi/ con datos-piloto.csv, modelo-roi.md y plan-integrado.md. No toques ningún otro archivo y muéstrame el diff antes del commit.» Solo se suma `docs/roi/`; no se tocan `README.md`, `AGENTS.md`, `REVIEW.md`, `PedidosWeb.sln`, `.claude/`, `.claude-plugin/`, `plugins/`, `.github/`, `src/`, `tests/`, `legado/`, `migracion/`, `specs/` ni el resto de `docs/`. Los datos de `datos-piloto.csv` son ficticios: 6 devs, semanas 1 a 6 antes y 7 a 12 con IA.

| Etapa | Min | Qué haces | Concepto |
|---|---|---|---|
| Preparación | 5 | Pedirle a Claude Code lo nuevo de la U10 desde el repo de material, revisar que el diff solo muestre los 3 archivos de `docs/roi/` y comprobar que tu Skill genera un PDF de prueba. | — |
| 1 · Medir | 20 | Pedirle a Claude Code que lea `docs/roi/datos-piloto.csv` y tus entregables de las unidades 5 a 9 (`docs/migracion/defectos-corregidos.md`, `docs/calidad/registro-u6.md`, `docs/checklist-revision.md`, `docs/gobernanza/politica-ia.md` y `docs/adopcion/plan-evolucion.md`) y que complete la sección «Datos» de `docs/roi/modelo-roi.md`: cada número con su fuente (archivo y semanas). Si un dato no está, escribe FALTA. | C1 |
| 2 · ROI con supuestos | 30 | Pedirle a Claude Code que complete `docs/roi/modelo-roi.md`: cada supuesto con su tipo (oficial, medido o estimado) y su fuente, escenarios conservador y optimista, y la sensibilidad con el ahorro a la mitad, mostrando cada cálculo. Revisar a mano al menos una cuenta y subir el commit. | C2 |
| 3 · Plan integrado en PDF | 35 | Pedirle a Claude Code que complete `docs/roi/plan-integrado.md` (informe de 1 página en 5 franjas, con la línea de Diligencia, y anexo), solo con cifras de `modelo-roi.md`, y que genere `docs/roi/plan-integrado.pdf` con tu Skill `pdf-con-estilo`, sin tocar su CSS. Subirlo a `main`. | C3, C4 |
| Tu reto (obligatorio) | — | Calcular cuántas horas ahorradas por dev al mes dejan el ROI en 0 (el punto de equilibrio) y sumarlo como sección «Punto de equilibrio» a tu modelo y a tu PDF. Usas el mismo modelo de la etapa 2: solo cambias la pregunta. El pedido a Claude Code lo escribes tú, con contexto, qué quieres y cómo sabes que quedó bien; el despeje lo revisas tú. Tema nuevo: el punto de equilibrio, donde el beneficio apenas cubre el costo (ni ganas ni pierdes). | C2 |

**Anexo del plan (etapa 3).** Cada parte con su evidencia; el anexo no repite tus entregables: los cita. Roadmap → `docs/adopcion/plan-evolucion.md` (U9) · Indicadores → `docs/calidad/registro-u6.md` (U6) y `docs/checklist-revision.md` (U7) · Gobernanza → `docs/gobernanza/politica-ia.md` (U8) · ROI → `docs/roi/modelo-roi.md` y `docs/migracion/defectos-corregidos.md` (U5) · Evolución → `docs/adopcion/plan-evolucion.md` (U9).

Las etapas con minutos suman 90'. «Tu reto» no tiene minutos asignados en el sitio: si no alcanzas en clase, lo terminas en tu casa (con Claude Pro, si quieres), porque es parte del entregable. Usa el mismo repo y el mismo PDF. **Cierre del taller:** confirma que todo está en `main`: `docs/roi/modelo-roi.md` con supuestos, escenarios y punto de equilibrio, `docs/roi/plan-integrado.md` con informe y anexo, `docs/roi/plan-integrado.pdf` generado con tu Skill, y que nada fuera de `docs/roi/` cambió.

**Qué se espera, sin darte la respuesta.**
- Un ROI honesto, con sus supuestos: un rango, no un solo número.
- Un informe de 1 página para decidir: la recomendación está en la página 1.
- Un plan que conecta tus entregables: el anexo los cita, no los repite.
- Un ROI honesto y modesto convence más que uno espectacular sin respaldo.

**Qué investigar si te trabas** (fuentes de la guía, consultadas el 12-nov-2026). Etapa 1: *Track team usage with analytics* (docs de Claude Code) y *DORA's software delivery performance metrics* (las 5 métricas en dos grupos). Etapa 2: *Manage costs effectively* (docs de Claude Code, costos por dev) y *Planes y precios de Claude* (asiento Team Standard). Etapa 3: *AI Fluency: Framework & Foundations* (Descripción y Diligencia).

- **Entregable:** *Plan integrado de adopción de IA*: `docs/roi/plan-integrado.pdf` en `main`, con el informe de 1 página en 5 franjas, la línea de Diligencia y el anexo, generado con `pdf-con-estilo`; más `docs/roi/modelo-roi.md` con cada número con su tipo y su fuente, dos escenarios y la sensibilidad, y la sección «Punto de equilibrio» en el modelo y en el PDF (tu reto). Individual. Es el cierre del curso: no alimenta a otra unidad.
- **Puntos de control:**
  - **Preparación:** `docs/roi/` está en tu repo, el diff no muestra nada más y tu Skill genera un PDF de prueba.
  - **Etapa 1:** cada dato tiene archivo y semanas; lo que falta dice FALTA.
  - **Etapa 2:** ningún número sin supuesto: cada uno con su tipo y su fuente.
  - **Etapa 3:** el PDF abre con la recomendación en la página 1 y la línea de Diligencia.
  - **Tu reto:** `modelo-roi.md` y `plan-integrado.pdf` tienen la sección «Punto de equilibrio» y están en `main`.
- **Errores frecuentes** («Si algo falla»):
  - El ROI da 900 % → ¿multiplicaste una sola tarea por todo el horizonte? Revisa las horas ahorradas.
  - Los costos son solo los asientos → faltan la capacitación y la curva de adopción.
  - Claude agregó un dato que no está en el CSV → cada número necesita archivo y semanas; si no está, dice FALTA.
  - El ROI da negativo → no es un error: infórmalo con su rango y el supuesto que lo mueve.
  - La Skill no genera el PDF → ¿está Playwright instalado y la Skill en `.claude/skills/pdf-con-estilo/`?
- **Plan B:** ninguno definido en esta versión.
- **Extensión opcional:** ninguna definida en esta versión.

## Cierre (15')
Tres alumnos, por sorteo, muestran su PDF (3' cada uno): la recomendación, el rango de ROI y el próximo paso; conviene empezar por la recomendación y dejar los números para después. **Entregable:** `docs/roi/plan-integrado.pdf` en `main` de tu `pedidos-web`. **Cuestionario final:** se responde después, en el sitio del curso; repasa las diez unidades con calma. Idea final: *un ROI honesto y modesto convence más que uno espectacular sin respaldo.*
