# Desarrollando con Inteligencia · IA para Desarrolladores

Sitio de estudio del programa **«Desarrollando con Inteligencia — IA para Desarrolladores»** (Vela LATAM, Grupo 02, 2026): 30 horas, 10 unidades, 5 días, enfocado en el ecosistema Anthropic (Claude y Claude Code).

Reemplaza los PDF y PPT del curso. Aquí los alumnos entienden el programa, estudian cada unidad (conceptos, laboratorio, material, videos y entregable), descargan material y llegan a los recursos oficiales. Por pedido del cliente, todas las unidades están abiertas; el calendario marca la unidad en curso.

Es un sitio **estático**: HTML5, Tailwind CSS v4 **precompilado** (`css/tailwind.css`), CSS modular, fuentes autoalojadas y JavaScript ES6+ con módulos nativos. No depende de ningún CDN: funciona aunque la red corporativa bloquee jsDelivr o Google Fonts. Se publica tal cual en GitHub Pages; solo hay que recompilar Tailwind si cambias clases (ver «Compilar Tailwind»).

---

## Cómo se ve

Dirección visual **"Orient Night"**, derivada de [felipecuevas.dev](https://felipecuevas.dev) (ver `DESIGN.md`):

- **Navbar** fija con fondo translúcido al hacer scroll y botón de tema.
- **Hero** a pantalla completa: el logo de Claude como protagonista, con halo y una respiración suave, y 12 robots de Claude Code flotando al fondo. Muestra solo título, subtítulo, enfoque, la unidad en curso o la próxima, y dos botones. **El botón «Descargar programa» vive solo aquí** (no está en la navbar, el menú móvil ni el footer).
- **Ruta del curso**: línea de tiempo por día con dos unidades (mañana y tarde). A la derecha corre el hilo dorado de los entregables del caso integrador *Pedidos Legado → Pedidos Web*. Cada unidad se despliega con 4 pestañas (Resumen, Conceptos, Taller y Recursos; ver «Qué muestra cada unidad»), y cada concepto abre un modal.
- **Instructor**: banda compacta.
- **Footer** con enlaces de interés.

El modo oscuro es el predeterminado. El modo claro tiene la misma terminación.

---

## Estructura de carpetas

```
/
├── index.html                 Página única (HTML semántico + tokens de Tailwind)
├── DESIGN.md                  Sistema de diseño (color y tipografía vinculantes)
├── AGENTS.md                  Instrucciones para agentes de IA (apunta a .claude/README.md)
├── README.md
├── .claude/                   README.md (referencia interna para el agente) y settings.json
├── .gitignore
├── .nojekyll                  GitHub Pages sirve los archivos tal cual
├── assets/
│   ├── docs/                  PDF del programa y glosario del curso
│   ├── fonts/                 Cinzel, Josefin Sans y JetBrains Mono (WOFF, subconjunto latino, OFL)
│   ├── img/                   favicon.svg y foto del instructor (opcional)
│   ├── icons/                 SVG de Claude, Claude Code y Material Symbols Light
│   └── material/u01 … u10/    PDF y PNG de cada unidad
├── css/
│   ├── tokens.css             Variables de color por modo (DESIGN.md §2) y orden de capas
│   ├── fonts.css              @font-face de las fuentes autoalojadas
│   ├── tailwind.input.css     Fuente de Tailwind (tokens @theme). NO se carga en el navegador
│   ├── tailwind.css           Tailwind compilado (sí se carga). Se regenera con el CLI
│   ├── base.css               Tipografía, foco visible, movimiento reducido
│   ├── utilities.css          Botones, rótulos, contenido sin JS e impresión
│   └── components/            navbar, hero, cards, timeline, unit-panel, code, modal, instructor, footer
├── js/
│   ├── main.js                Punto de entrada
│   ├── config/
│   │   └── units.config.js    ← CALENDARIO Y CONTROL DE APERTURA
│   ├── data/
│   │   ├── course.js          Datos generales del curso
│   │   ├── instructor.js
│   │   ├── links.js           Enlaces del footer, fuentes y cursos de la Academy
│   │   └── units/             u01.js … u10.js (contenido de cada unidad) + index.js
│   ├── components/            navbar, hero, timeline, unit-panel, concept-modal, …
│   └── utils/                 dates, schedule, dom, storage, icons, code, reveal, validate
└── fuentes/
    ├── unidades/              unidad-01.md … unidad-10.md (fuente de verdad del contenido)
    └── bibliografia-curso.md
```

La separación es: **configuración** (`js/config`) / **datos** (`js/data`) / **componentes** (`js/components`) / **estilos** (`css`). El renderizado sale 100 % de los datos: para agregar contenido, editas solo el archivo de datos.

---

## Correrlo en local

Los módulos ES **no funcionan con `file://`**, así que necesitas un servidor local:

- **WebStorm:** abre `index.html` y usa el ícono del navegador (servidor integrado), o clic derecho → *Open in Browser*.
- **Node:**

  ```bash
  npx serve .
  ```

- **Python:**

  ```bash
  python3 -m http.server 8000
  ```

  Luego abre `http://localhost:8000`.

### Parámetros útiles en la URL

| Parámetro | Para qué |
|---|---|
| `?preview=all` | Vista previa del instructor: todas las unidades abiertas, con una barra dorada arriba. No es seguridad, es comodidad. |
| `?now=2026-11-10T14:00:00-03:00` | **Solo para pruebas:** simula la hora actual. El reloj simulado avanza en tiempo real. |
| `?debug` | Ejecuta `validateData()`: avisa en consola si una descripción breve supera 100 caracteres, si hay slugs repetidos o conceptos sin fuente. |
| `#u03` | Abre y muestra la unidad 3 (si no está bloqueada). |
| `#u02/concepto/plan-mode` | Abre la unidad 2, la pestaña Conceptos y el modal de *Plan mode*. |

Se pueden combinar: `?now=2026-11-10T14:00:00-03:00&preview=all&debug`.

---

## Cómo abrir o bloquear unidades

Todo se controla desde **un solo archivo**: `js/config/units.config.js`.

```js
u03: { abreEl: '2026-11-10T08:45:00-03:00', inicio: '2026-11-10T09:00:00-03:00', cierraEl: '2026-11-10T12:00:00-03:00', forzar: null },
```

| Estado | Cuándo |
|---|---|
| `bloqueada` | Con `forzar: 'bloqueada'`. Solo si `TODAS_LAS_UNIDADES_ABIERTAS` es `false`: también antes de `abreEl`. |
| `en-curso` | Entre `abreEl` (15 min antes del inicio) y `cierraEl`. Se destaca en dorado y se despliega sola. |
| `abierta` | Antes de su hora, con `TODAS_LAS_UNIDADES_ABIERTAS`, `forzar: 'abierta'` o `?preview=all`. |
| `completada` | Después de `cierraEl`. |

### Todas las unidades abiertas (pedido del cliente)

En `js/config/units.config.js`, `TODAS_LAS_UNIDADES_ABIERTAS = true` deja todas las unidades abiertas desde ya: ninguna se bloquea por fecha y el calendario solo sirve para marcar la unidad en curso. Para volver al calendario (cada unidad se abre en su `abreEl`), cámbialo a `false`. `forzar: 'bloqueada'` en una unidad sigue mandando siempre: es la salida de emergencia. Toda la decisión está en `getUnitStatus()` (`js/utils/schedule.js`).

### Unidad en curso resaltada

`getCourseState()` entrega `current` (la unidad `en-curso`) y `main.js` lo recalcula cada 60 s, al volver a la pestaña (`visibilitychange`) y al recuperar el foco. Con eso:

- En el índice de escritorio (`.unit-index`), la fila de la unidad en curso lleva un fondo dorado suave y la etiqueta «En curso» con un reloj. En la barra móvil (`.unit-strip`), relleno dorado. Los lectores de pantalla oyen «(En curso)».
- Es una señal distinta de `aria-current="true"` (la unidad que el alumno está mirando, por scroll): esa conserva su regla izquierda de acento y pueden coexistir en la misma fila.
- El contador de la ruta dice «En curso: U01 · …», «Próxima: U02 · … · día, hora h» o «Curso completado · 10 de 10 unidades», y su barra muestra las unidades completadas.
- Entre las 12:00 y las 12:45 (almuerzo) no hay unidad en curso.

Para probarlo, simula la hora: `?now=2026-11-10T09:30:00-03:00` deja la U03 en curso; `?now=2026-11-09T12:30:00-03:00`, ninguna (próxima U02). Las fechas llevan `-03:00`, así que el resultado no depende de la zona horaria del navegador.

El estado se recalcula al cargar y **cada 60 segundos**, sin recargar la página. Las horas son UTC-03:00 y se muestran en formato `es-CL`.

> El bloqueo es un ritmo pedagógico, **no una medida de seguridad**: todo el contenido está en el repositorio.

### 1. Dejar que se abran por fecha

Con `TODAS_LAS_UNIDADES_ABIERTAS = false`, no hagas nada más. Cada unidad se abre en su `abreEl` (15 minutos antes de la clase) y queda completada en su `cierraEl`.

### 2. Cambiar `forzar` y hacer commit/push

```js
u03: { ..., forzar: 'abierta' },    // abre la U03 ahora
u05: { ..., forzar: 'bloqueada' },  // bloquea la U05 hasta nuevo aviso
u05: { ..., forzar: null },         // vuelve a usar las fechas
```

```bash
git add js/config/units.config.js
```

```bash
git commit -m "chore: abre la unidad 3"
```

```bash
git push
```

GitHub Pages publica el cambio en uno o dos minutos.

### 3. Pedírselo a Claude Code

Abre `claude` en la carpeta del proyecto y pídele, por ejemplo:

- «Abre la unidad 3 ahora.»
- «Bloquea la unidad 5 hasta nuevo aviso.»
- «Vuelve a dejar todas las unidades según sus fechas.»
- «Cambia el calendario: el día 2 se movió al miércoles 11 de noviembre, mismo horario.»

Claude Code solo debe editar `js/config/units.config.js`. Revisa el diff antes de hacer commit.

---

## Cómo agregar material (PDF o PNG)

1. Copia el archivo en `assets/material/uXX/`, por ejemplo `assets/material/u03/guia-taller.pdf`.
2. En `js/data/units/u03.js`, busca `material` y marca la tarjeta como disponible:

   ```js
   { tipo: 'pdf', titulo: 'Guía del taller', archivo: 'assets/material/u03/guia-taller.pdf', disponible: true },
   ```

3. Para agregar una tarjeta nueva, agrega otro objeto al arreglo. `tipo` puede ser `pdf`, `png`, `jpg` o `webp` (cualquier otro usa un ícono genérico).
4. **Enlace externo** (formulario, repositorio, archivo en GitHub): `tipo: 'enlace'` con `url` en vez de `archivo`, y `descripcion` opcional. Se abre en pestaña nueva y la tarjeta dice «Abrir» en vez de «Descargar»:

   ```js
   { tipo: 'enlace', titulo: 'Cuestionario de madurez (formulario)', descripcion: 'Lo respondes en el paso 2 del taller.', url: 'https://forms.gle/…', disponible: true },
   ```

5. **Requisitos con enlace** («Antes de la clase», en `requisitos`): campo opcional `enlace: { titulo, url }`, que se muestra como enlace externo debajo del texto (y del bloque de `codigo`, si lo hay):

   ```js
   { titulo: 'SDK de .NET 10 instalado antes de la clase', texto: 'Verifica con `dotnet --version`.', enlace: { titulo: 'Descargar el SDK de .NET 10 (sitio oficial)', url: 'https://dotnet.microsoft.com/en-us/download/dotnet/10.0' } },
   ```

6. **Material del taller:** una tarjeta con `destino: 'taller'` se muestra en la pestaña **Taller** (sección «Material del taller»), no en Recursos. Sirve para lo que el alumno usa durante el taller: el prompt maestro, una plantilla, un repositorio base. Sin el campo, la tarjeta va a **Recursos**:

   ```js
   { tipo: 'enlace', titulo: 'Prompt maestro del taller', descripcion: 'Lo pegas en Claude Code en el paso 1.', url: `${U2_BLOB}/taller/prompt-maestro.md`, destino: 'taller', disponible: true },
   ```

Mientras `disponible` sea `false`, la tarjeta dice «Disponible pronto» y no hay enlace roto. Mientras `PROGRAM_PDF_AVAILABLE` sea `false`, el botón del programa no se muestra.

### Material que vive en el repositorio de material

El código, las specs y los prompts de demos y talleres viven en el repositorio [material-curso-ia-desarrolladores](https://github.com/ffelipecuevasc/material-curso-ia-desarrolladores) (`MATERIAL_REPO` en `js/data/links.js`). El sitio solo los enlaza con tarjetas `tipo: 'enlace'`:

- Las URLs apuntan a la rama `main`, así que los alumnos siempre ven la versión vigente. Si mueves o renombras una carpeta en ese repositorio, actualiza el enlace del sitio.
- En la U2, `u02.js` arma las URLs con dos constantes: `U2_BLOB` (archivos, `…/blob/main/unidad-2`) y `U2_TREE` (carpetas, `…/tree/main/unidad-2`). Allí, `unidad-2/demos/` tiene lo que muestra el instructor (TodoMini y TiendaMini) y `unidad-2/taller/` lo que usa el alumno (el proyecto `pedidos-web`, el prompt maestro y la carpeta `u2-respaldo`).
- No marques `disponible: true` hasta que el archivo exista en ese repositorio.

## Qué muestra cada unidad

Criterio: **cada dato aparece una sola vez, donde se usa.** Lo que ya está en la guía PDF del taller, en las láminas o en el Programa no se repite en el sitio. Los datos completos siguen en `js/data/units/uXX.js` (pasos, errores frecuentes, plan B, agenda de la clase…); simplemente no se muestran.

| Pestaña | Muestra | No muestra (queda en los datos) |
|---|---|---|
| **Resumen** | `foco`, línea «Nivel 0 → 10 de 100», `objetivos`, `herramientas` y «Antes de la clase» (`requisitos`: texto y `enlace`) | horario, duración, licencias, agenda (`catedra`), bloque `codigo` de los requisitos. Los avisos `pendientes` solo se ven con `?preview=all` |
| **Conceptos** | chips de conceptos obligatorios y fundamentales (cada uno abre su modal) | — |
| **Taller** | nombre, fila de íconos (modalidad, duración y entregable), `laboratorio.resumen`, botón grande «Descargar la guía (PDF)» y «Material del taller» (tarjetas con `destino: 'taller'`) | caso, problemática, pasos, puntos de control, errores frecuentes, plan B, extensión y criterios del entregable |
| **Recursos** | material (menos la guía y las tarjetas con `destino: 'taller'`, que están en Taller), videos y cursos, temas para investigar | — |

En el encabezado de cada unidad ya no aparece el nivel. El entregable se muestra una vez por tamaño de pantalla: en el riel lateral en escritorio y bajo el título en móvil.

### Campo `laboratorio.resumen` y guía del taller

- `laboratorio.resumen`: un párrafo en segunda persona, **máximo 1000 caracteres** (`?debug` avisa si falta o si se pasa). Se escribe solo con datos que ya estén en el sitio y termina remitiendo a la guía.
- La tarjeta de la guía se identifica por **`id: 'guia'`**, no por su título:

  ```js
  { id: 'guia', tipo: 'pdf', titulo: 'Guía del taller "Mi entorno y mi mapa"', archivo: 'assets/material/u01/guia-taller.pdf', disponible: true },
  ```

  Con `disponible: false`, el botón de Taller aparece deshabilitado con «Guía disponible pronto» (nunca un enlace roto).

### Topes de longitud (revisión editorial)

| Campo | Tope |
|---|---|
| `descripcionBreve` | 100 caracteres (lo valida `?debug`) |
| `laboratorio.resumen` | 1000 caracteres (lo valida `?debug`) |
| `foco` | 220 caracteres |
| `objetivos` | 5 como máximo, de 110 caracteres cada uno |
| `herramientas` | 6 como máximo |
| `requisitos` | 3 como máximo, de 220 caracteres (título + texto) |

## Cómo agregar conceptos

En `js/data/units/uXX.js`, agrega un objeto a `conceptos.obligatorios` (lo que el alumno debe dominar para el laboratorio y el entregable) o a `conceptos.fundamentales` (la base teórica, C1–C4):

```js
{
  slug: 'mi-concepto',              // minúsculas y guiones; se usa en #u03/concepto/mi-concepto
  titulo: 'Mi concepto',
  resumen: 'Una frase.',
  explicacion: ['Párrafo 1.', 'Párrafo 2.'],   // 2–4 párrafos breves
  ejemplo: { tipo: 'codigo', lenguaje: 'bash', titulo: 'Terminal', contenido: `claude --version` },
  // o: ejemplo: { tipo: 'texto', contenido: '...' }, o ejemplo: null
  nota: '**Estándar abierto:** … **Implementación de Claude:** …',  // o ''
  fuente: { titulo: 'Documentación', url: 'https://code.claude.com/docs/...' },
},
```

En los textos puedes usar `` `código` ``, `**negrita**` y `*cursiva*`. Lenguajes con resaltado: `bash`, `json`, `yaml`, `markdown`, `csharp`, `javascript`, `sql` y `text`.

## Cómo agregar videos y cursos

En `videos` de cada unidad:

```js
// Curso de Anthropic Academy (se abre en pestaña nueva)
academyVideo('claudeCodeInAction', 'Nota opcional.'),

// Video de YouTube (lite embed: el iframe se carga al hacer clic, desde youtube-nocookie.com)
{ titulo: 'Título', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', origen: 'YouTube', duracion: '12 min' },
```

Los cursos de la Academy viven en `js/data/links.js` (`ACADEMY_COURSES`). Cuando verifiques la URL de un curso, reemplaza `url` y marca `verificado: true`.

## Cómo cambiar colores o tipografía

- **Colores:** `css/tokens.css`. Los tokens semánticos (`--bg`, `--surface`, `--accent`…) tienen un valor en `:root` (claro) y otro en `.dark` (oscuro). Tailwind los usa a través de `@theme inline` en `css/tailwind.input.css` (`bg-surface`, `text-accent`, etc.). Los colores por defecto de Tailwind están desactivados, así que solo existen los de `DESIGN.md`.
- **Tipografía:** `css/fonts.css` y `assets/fonts/`, más las variables `--font-display`, `--font-sans` y `--font-mono` de `css/tailwind.input.css`.
- `DESIGN.md` manda en color y tipografía. Si cambias un color, compruébalo con un verificador de contraste (meta: WCAG 2.2 AA).

> Los archivos `.css` del sitio son CSS estándar (sin `@apply`) y van en capas (`@layer site-base` y `@layer components`) para que las utilidades de Tailwind siempre ganen.

## Compilar Tailwind

Si agregas o cambias **clases de Tailwind** en `index.html` o en `js/`, o editas `css/tailwind.input.css`, regenera `css/tailwind.css` y haz commit de ambos:

```bash
npx @tailwindcss/cli -i css/tailwind.input.css -o css/tailwind.css --minify
```

Si solo editas datos (`js/data/…`, `units.config.js`) o los `.css` de componentes, **no** hace falta compilar. Si olvidas compilar, la clase nueva simplemente no tendrá estilo (nada se rompe).

## Cómo cambiar la foto del instructor

Sube `assets/img/felipe-cuevas.webp` (cuadrada, unos 480 × 480 px) y en `js/data/instructor.js` cambia `photoAvailable` a `true`. Si la imagen no carga, se muestran las iniciales.

---

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub con la rama `main`.
2. En GitHub, ve a **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. En **Branch**, elige `main` y la carpeta `/ (root)`. Guarda.
5. Espera uno o dos minutos. El sitio queda en `https://<usuario>.github.io/<repo>/`.

Notas:

- `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll.
- Todas las rutas son **relativas** (`css/…`, `js/…`, `assets/…`), así que funcionan bajo el subpath `/<repo>/`.
- Cada `git push` a `main` vuelve a publicar.

---

## Accesibilidad y rendimiento

- Meta WCAG 2.2 AA: contraste comprobado en los pares nuevos, foco visible (`:focus-visible`), zona táctil de 44 px.
- Teclado: Tab por todo el sitio, Enter/Espacio en acordeones, flechas/Inicio/Fin en pestañas, Esc en el modal (con retorno del foco al chip).
- Los estados de unidad nunca se comunican solo con color: siempre llevan ícono y texto.
- `prefers-reduced-motion`: sin animaciones decorativas ni desplazamiento suave.
- Sin JavaScript se ve un resumen de las unidades y los enlaces principales (`<noscript>` en `index.html`; si cambias el título de una unidad, actualízalo también ahí).
- Sin scroll horizontal en 360 px. Los iframes de video solo se cargan al hacer clic.

---

## Prompts de mantenimiento para Claude Code

Copia y adapta:

- «Abre la unidad 4 ahora y deja las demás según sus fechas.»
- «Subí `assets/material/u03/guia-taller.pdf`: márcalo como disponible en `u03.js`.»
- «Agrega a la U05 un concepto obligatorio sobre feature flags, con ejemplo y fuente oficial de code.claude.com. No inventes URLs.»
- «Verifica las URLs de los cursos de Anthropic Academy en `js/data/links.js` y reemplaza las que puedas confirmar; deja el TODO en las demás.»
- «Ejecuta el sitio con `?debug` y corrige cualquier descripción breve de más de 100 caracteres.»
- «Revisa que no haya colores fuera de `DESIGN.md` §2 en `css/` ni en clases de Tailwind.»
- «En la U04, mueve la tarjeta del repositorio demo a la pestaña Taller con `destino: 'taller'`.»

---

## Pendientes (TODO)

- **Webinar «Modernizing Legacy Code with Claude Code»** (U04 y U05): sin URL en la bibliografía.
- **Material de las unidades U03–U10** (guías del taller, infografías y demás tarjetas): están en «Disponible pronto». La U01 está completa y la U02 solo espera su infografía.
- **Errores frecuentes** de los laboratorios U02–U10: los archivos fuente no los traen (la sección se oculta mientras esté vacía).
- **Foto del instructor:** opcional (`photoAvailable`).

---

## Créditos y licencias

- Contenido académico: Felipe Cuevas, a partir de `fuentes/unidades/`.
- Tipografías autoalojadas en `assets/fonts/` (subconjunto latino, con su licencia OFL junto a cada archivo).
- Íconos: [Material Symbols Light](https://icon-sets.iconify.design/material-symbols-light/) de Google vía Iconify, licencia **Apache 2.0**. Los SVG están en `assets/icons/` y en línea en `js/utils/icons-data.js`, sin dependencia en runtime.
- Claude y Claude Code son marcas de Anthropic; sus logos se usan solo como marca, con su color oficial.
- Tipografías: Cinzel, Josefin Sans y JetBrains Mono (SIL Open Font License 1.1), autoalojadas.