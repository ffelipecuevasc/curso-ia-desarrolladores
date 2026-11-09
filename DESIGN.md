# DESIGN.md · Sitio pedagógico "IA para Desarrolladores"

> **Estado: v1 (01-11-2026).** Derivado del DESIGN.md de felipecuevas.dev (v1, 29-10-2026).
> Este archivo es la **única fuente de verdad del diseño** de este sitio.
> **Vinculante:** la paleta (sección 2) y la tipografía (sección 3), heredadas de felipecuevas.dev.
> **Libre:** estructura, composición, componentes, geometría y movimiento (sección 4 en adelante), que son propios de este sitio. Solo se sugieren criterios.
> Nombres de tokens en inglés; textos visibles en español de Chile.

## 1. Principios

1. **Mi marca, otro sitio.** Se reconoce como parte de felipecuevas.dev por color y tipografía, pero es un sitio de estudio con identidad propia: "Orient Night", tecnológico, con Claude como protagonista visual.
2. **Hecho para estudiar.** Prioridad a la legibilidad en sesiones largas de lectura: cuerpo de texto cómodo, buena jerarquía y navegación clara entre las 10 unidades.
3. **Dos temas al mismo nivel.** Claro y oscuro con la misma terminación. El oscuro es el tema por defecto si el sistema no indica preferencia.
4. **El dorado es escaso.** Se reserva para lo que importa: unidad en curso, entregables, reglas y cifras destacadas.
5. **El coral es de Claude.** Solo para las marcas de Claude y Claude Code (sección 2.5).
6. **Solo en español.** El sitio es `es-CL`; no hay requisitos de internacionalización.

## 2. Color (vinculante)

### 2.1 Paleta base

| Token | Valor |
|---|---|
| `orient-50` | `#E4F3FF` |
| `orient-100` | `#B9E2FF` |
| `orient-200` | `#5DC9FF` |
| `orient-300` | `#00B0E8` (= `vibrant`) |
| `orient-400` | `#0096C7` |
| `orient-500` | `#007EA7` (= `primary`) |
| `orient-600` | `#00678A` |
| `orient-700` | `#005471` |
| `orient-800` | `#003B51` |
| `orient-900` | `#00212F` |
| `orient-925` | `#001A26` |
| `orient-950` | `#00131D` |
| `stone` | `#F5F9FC` |
| `primary` | `#007EA7` |
| `vibrant` | `#00B0E8` |
| `gold` | `#F8CD46` |
| `gold-deep` | `#7A5C00` |
| `white` | `#FFFFFF` |

No se usan otros colores de interfaz. Excepciones cerradas: el coral de las marcas de Claude y el azul del logo de LinkedIn (2.5) y `black` con transparencia, solo dentro de sombras.

### 2.2 Tokens semánticos

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | `white` | `orient-950` | Fondo de página y hero |
| `bg-alt` | `stone` | `orient-925` | Secciones alternas |
| `surface` | `white` | `orient-900` | Tarjetas, paneles, modales, menús |
| `surface-raised` | `orient-50` | `orient-800` | Pestaña activa, código en línea, zonas destacadas dentro de una tarjeta |
| `band` | `orient-50` | `orient-800` → `orient-925` (degradado) | Franjas de ancho completo |
| `footer` | `orient-50` | `orient-950` | Pie |
| `text` | `orient-950` | `orient-50` | Texto principal |
| `heading` | `orient-950` | `white` | Titulares |
| `text-muted` | `orient-950` al 70 % | `orient-50` al 75 % | Párrafos |
| `text-soft` | `orient-950` al 60 % | `orient-50` al 60 % | Metadatos y descripciones. **Opacidad mínima para texto.** |
| `accent` | `primary` | `vibrant` | Enlaces, parte destacada del titular, estado "abierta" |
| `kicker` | `orient-600` | `orient-400` | Rótulos en mayúsculas |
| `icon` | `orient-600` | `orient-400` | Íconos de línea |
| `border` | `orient-950` al 10 % | `orient-50` al 10 % | Reglas y divisores |
| `border-strong` | `orient-950` al 20–25 % | `orient-50` al 20–25 % | Contornos de controles |
| `focus` | `primary` | `vibrant` | Contorno de foco |
| `highlight` | `gold-deep` (texto) / `gold` (relleno) | `gold` | Unidad en curso, entregable, cifras |
| `code-bg` | `orient-950` | `orient-925` | Fondo de bloques de código (oscuro en ambos temas) |
| `code-text` | `orient-50` | `orient-50` | Texto de bloques de código |

### 2.3 Reglas de uso (de felipecuevas.dev)

- El texto nunca baja de la opacidad de `text-soft`.
- `vibrant` nunca es texto ni foco sobre fondo claro (contraste 2,51:1). En claro, el acento es `primary`.
- `gold` nunca es texto sobre fondo claro. En claro, el texto dorado usa `gold-deep`; `gold` solo como relleno, regla o ícono grande.
- `accent` sobre `band` o `bg-alt` en claro: solo texto grande (24 px o más, o 18,66 px en negrita).
- Avatares de iniciales: fondo `orient-800`, `primary` u `orient-600` con texto blanco. Nunca `orient-400` con texto blanco.
- Botón dorado: fondo `gold`, texto `orient-950` (12,43:1).

### 2.4 Contrastes de referencia (WCAG 2.2, verificados en felipecuevas.dev)

| Par | Claro | Oscuro |
|---|---|---|
| `text` sobre `bg` | 18,90 | 16,71 |
| `text-muted` sobre `bg` | 7,15 | 9,60 |
| `text-soft` sobre `bg` | 4,98 | 6,47 |
| `accent` sobre `bg` | 4,62 | 7,54 |
| `kicker` / `icon` sobre `bg` | 6,35 | 5,57 |
| `focus` sobre `bg` | 4,62 | 7,54 |

Todo par nuevo de este sitio (por ejemplo `surface-raised`, `code-bg` o estados de unidad) se comprueba con herramienta al implementar. Umbrales: 4,5:1 texto normal, 3:1 texto grande y elementos no textuales.

### 2.5 Colores de marca (excepción cerrada)

| Token | Valor | Uso permitido |
|---|---|---|
| `claude` | `#D97757` | Logo de Claude, robots de Claude Code, íconos de marca de Claude |
| `linkedin` | `#0a66c2` | Logo oficial de LinkedIn, solo en el enlace del instructor |

- No se usan en botones, enlaces, textos, bordes ni estados de la interfaz (única excepción: el logo de LinkedIn dentro del enlace del instructor).
- Los SVG de Claude, Claude Code y LinkedIn conservan su color de marca en ambos temas.
- Los robots de Claude Code del fondo del hero van con opacidad entre 0,06 y 0,2; nunca compiten con el logo de Claude ni con el texto.

### 2.6 Estados de unidad

El estado nunca se comunica solo con color: siempre lleva ícono y texto.

| Estado | Color | Ícono | Texto |
|---|---|---|---|
| Bloqueada | `text-soft`, borde `border` discontinuo | candado | "Se abre el …" |
| En curso | `highlight` (relleno `gold` en el badge, texto `orient-950`) | punto o reloj | "Hoy · en curso" |
| Abierta | `accent` | candado abierto | "Abierta" |
| Completada | `kicker` | check | "Completada" |

### 2.7 Resaltado de código

Sobre `code-bg`, solo con tonos de la paleta: texto `orient-50`, palabras clave `orient-200`, cadenas `gold`, comentarios `orient-50` al 60 %, números y constantes `orient-300`, líneas destacadas con fondo `vibrant` al 12 %.

## 3. Tipografía (vinculante)

### 3.1 Familias

| Token | Familia | Pesos | Uso | Respaldo |
|---|---|---|---|---|
| `font-display` | **Cinzel** (OFL 1.1) | 400, 500, 600 | Titulares de página y sección, números de unidad (U01…U10), cifras, título del hero | Georgia, serif |
| `font-sans` | **Josefin Sans** (OFL 1.1) | 300, 400, 600; cursiva 300 y 400 | Texto, navegación, botones, rótulos, títulos de tarjetas, pestañas | system-ui, sans-serif |
| `font-mono` | **JetBrains Mono** (OFL 1.1) | 400, 500 | Solo código, comandos y nombres de archivo (`AGENTS.md`, `/compact`) | ui-monospace, monospace |

- `font-mono` es una incorporación propia de este sitio, necesaria por su contenido técnico. No se usa para decorar.
- Las fuentes se autoalojan en `assets/fonts/` (WOFF variable, subconjunto latino, `display=swap`). No se depende de Google Fonts.

### 3.2 Escala

| Rol | Familia y peso | Tamaño | Alto de línea | Otros |
|---|---|---|---|---|
| Cuerpo y párrafo | Josefin 400 | 17–18 px | 1,7 | Ancho máximo 68 caracteres |
| Descripción breve | Josefin 400 | 16 px | 1,6 | — |
| Rótulo (kicker) | Josefin 600 | 12,5 px | 1,4 | Mayúsculas, interletraje 0,22 em |
| Navegación | Josefin 400 | 15 px | 1 | — |
| Botón | Josefin 600 | 13 px | 1 | Mayúsculas, interletraje 0,14 em |
| Chip de concepto | Josefin 400 | 14 px | 1,3 | Sin mayúsculas (los conceptos se leen mejor así) |
| Pestaña | Josefin 600 | 14 px | 1 | — |
| h1 del hero | Cinzel 500 | `clamp(2.25rem, 5vw, 4rem)` | 1,08 | Máximo 2 líneas |
| h2 de sección | Cinzel 400 | `clamp(2rem, 4.2vw, 3.1rem)` | 1,2 | — |
| Número de unidad | Cinzel 500 | 2–3 rem | 1 | Números tabulares |
| Título de unidad | Josefin 600 | 1,25–1,5 rem | 1,3 | Ver 3.3 |
| Título de modal | Cinzel 500 | 1,5–1,75 rem | 1,2 | — |
| Cifra | Cinzel 400 | `clamp(2.2rem, 3vw, 3rem)` | 1 | Números tabulares |
| Código | JetBrains Mono 400 | 14–15 px | 1,6 | — |

### 3.3 Reglas

- Cinzel solo en textos cortos (titulares, números, cifras). Los títulos de unidad son largos ("Modernización de Sistemas Legados y Migración entre Tecnologías"), por eso van en Josefin 600, acompañados del número en Cinzel.
- Párrafos en Josefin **400**, no 300: en felipecuevas.dev el 300 en tamaños pequeños es el punto más débil de legibilidad, y aquí se lee mucho.
- h1, h2 y h3 con `text-wrap: balance`.
- Cifras, horas y contadores con `tabular-nums lining-nums`.
- Las mayúsculas se aplican con `text-transform`, nunca escritas en el contenido.

## 4. Lo que es libre (criterios sugeridos)

> **v1.1 (05-11-2026):** se elimina la grilla duplicada de unidades; la portada mantiene el logo de Claude como protagonista con los robots de Claude Code de fondo.

Todo lo siguiente es propio de este sitio y puede diseñarse distinto a felipecuevas.dev. Son sugerencias para mantener coherencia con la dirección "Orient Night".

### 4.1 Geometría

- Libre. Se sugieren esquinas moderadamente redondeadas (4–12 px) en tarjetas, modales y botones, y pills para chips y badges, para diferenciar este sitio de la geometría recta de felipecuevas.dev.
- Contornos de 1 px con `border` y sombras largas y difusas.

### 4.2 Texturas y motivos

- Campo de puntos o retícula fina en el hero y en las bandas, en `primary` o `vibrant` con baja opacidad.
- Halo radial de `primary` al 20 % detrás del logo de Claude en oscuro.
- Línea fina en `accent` como hilo de la línea de tiempo y regla dorada corta antes de los rótulos de sección.
- Sin degradados arcoíris ni neón excesivo.

### 4.3 Movimiento

- Libre, con estas condiciones obligatorias:
  - respetar `prefers-reduced-motion: reduce` (sin animaciones decorativas, sin desplazamiento suave);
  - nada de CLS por animaciones;
  - el contenido es legible aunque falle JavaScript (al menos el resumen de unidades y el pie).
- Permitido aquí: robots flotando lentamente en el hero, leve parallax con el mouse, respiración del logo de Claude, aparición suave de tarjetas al hacer scroll (sin dejar contenido invisible si falla el script).
- Duraciones sugeridas: 200 ms (hover, chevrons), 250 ms (color y borde), 400 ms (elevación, acordeón).

### 4.4 Iconografía

- Íconos de contorno de Material Symbols Light (colección `material-symbols-light` de Iconify), variantes `-outline`, en SVG en línea con `currentColor` y `viewBox="0 0 24 24"`. Licencia Apache 2.0: conservar el aviso en el README.
- Decorativos con `aria-hidden="true"`; si son el único contenido de un control, el control lleva nombre accesible.
- Las marcas (Claude, Claude Code, LinkedIn, GitHub, Anthropic Academy) conservan sus SVG propios.

## 5. Tema claro y oscuro

- Clase `.dark` en `<html>`.
- Preferencia guardada en `localStorage` con la clave `theme` (valores `light` y `dark`), con respaldo en `prefers-color-scheme`; si no hay ninguna de las dos, oscuro.
- Script mínimo en `<head>` que aplica el tema antes del primer pintado: sin parpadeo y sin CLS al alternar.
- Botón de apariencia: ícono de luna en claro y de sol en oscuro; nombre accesible que dice la acción ("Activar tema oscuro" / "Activar tema claro").
- No se anima el fondo de la página al cambiar de tema.

## 6. Accesibilidad (obligatorio)

- Contraste AA (sección 2.4).
- Foco visible: contorno de 2 px `focus` con separación de 2 px, solo con `:focus-visible`.
- Zona táctil mínima de 44 × 44 px.
- Navegación completa con teclado: pestañas con flechas, acordeones con Enter/Espacio, modales con Escape y foco atrapado, retorno del foco al disparador.
- Estados de unidad con ícono y texto, no solo color (2.6).

## 7. Tailwind CSS v4 por CDN

- Tailwind se **precompila** con el CLI (`css/tailwind.input.css` → `css/tailwind.css`); no se usa el build de navegador por CDN.
- Los tokens se declaran en `css/tailwind.input.css`, con `@theme inline` apuntando a variables CSS definidas en `css/tokens.css` (los semánticos cambian de valor bajo `.dark`).
- Variante oscura por clase: `@custom-variant dark (&:where(.dark, .dark *));`.
- Nombres de tokens:
  - paleta base: `--color-orient-50` … `--color-orient-950`, `--color-orient-925`, `--color-stone`, `--color-primary`, `--color-vibrant`, `--color-gold`, `--color-gold-deep`, `--color-claude`;
  - semánticos: `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-surface-raised`, `--color-band`, `--color-footer`, `--color-text`, `--color-heading`, `--color-text-muted`, `--color-text-soft`, `--color-accent`, `--color-kicker`, `--color-icon`, `--color-border`, `--color-border-strong`, `--color-focus`, `--color-highlight`, `--color-code-bg`, `--color-code-text`;
  - familias: `--font-display`, `--font-sans`, `--font-mono`.
- Los componentes usan los tokens semánticos, no la paleta base, salvo casos justificados.
- No se usan colores fuera de la sección 2.

## 8. Criterios de calidad visual

- Paridad entre temas: todo elemento tiene su equivalente cuidado en claro y en oscuro.
- Revisión en 360, 768, 1366 y 1920 px de ancho.
- Ningún color fuera de la sección 2 y ninguna familia fuera de la sección 3.
- Contrastes de los pares nuevos comprobados con herramienta.
