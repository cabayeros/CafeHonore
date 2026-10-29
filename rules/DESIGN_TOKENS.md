# DESIGN_TOKENS.md — Tokens y variables del sistema «Emerald Trust»

> Complemento de `DESIGN_RULES.md`. Amplía valores y aporta código listo para adaptar. No contradice al principal; si hubiera discrepancia, prevalece `DESIGN_RULES.md`.
> Etiquetas: `[E]` extraído del ZIP · `[B]` recomendación · `[A]` adaptable al destino.
> **Importante:** los valores de color son los de la referencia. En un sitio destino deben **derivarse de su marca** (`DESIGN_RULES.md` COL-08/09); aquí sirven como punto de partida y como patrón de relaciones.

---

## 1. Colores — inventario completo (modo claro) `[E]`

Fuente: `tailwind-config.js` (47 roles). Columna «Uso en HTML» = número de clases que lo referencian en `index.html`.

### 1.1 Roles usados

| Token | HEX | Uso en HTML | Rol |
|---|---|---|---|
| `primary` | `#003527` | 109 | Acción, estructura, enlaces, eyebrows |
| `on-primary` | `#ffffff` | 20 | Texto sobre `primary` |
| `primary-container` | `#064e3b` | 17 | Hover de CTA; KPI; palabra clave del H1 |
| `secondary` | `#006c49` | 20 | Checks, estrellas, métricas positivas |
| `secondary-container` | `#6cf8bb` | 4 | Chips de estado, badge de check |
| `on-secondary-container` | `#00714d` | 4 | Texto sobre `secondary-container` |
| `primary-fixed-dim` | `#95d3ba` | 1 | Texto secundario sobre velo verde |
| `surface` | `#faf8ff` | 10 | Fondo base |
| `surface-container-lowest` | `#ffffff` | 10 | Elementos elevados, header |
| `surface-container-low` | `#f2f3ff` | 32 | Secciones alternas, tarjetas tonales, inputs |
| `surface-container` | `#eaedff` | 1 | Panel del hero |
| `surface-container-high` | `#e2e7ff` | 14 | Botón secundario, botones de icono, chips |
| `surface-container-highest` | `#dae2fd` | 8 | Hover y borde de tarjetas elevadas |
| `on-surface` | `#131b2e` | 69 | Titulares |
| `on-surface-variant` | `#404944` | 70 | Cuerpo y secundarios |
| `outline` | `#707974` | 5 | Placeholders |
| `outline-variant` | `#bfc9c3` | 44 | Bordes y divisores |
| `error` | `#ba1a1a` | 1 | Punto decorativo (y estado de error `[B]`) |

### 1.2 Roles definidos pero NO usados en el HTML (no replicar salvo necesidad)

`surface-dim #d2d9f4` · `surface-bright #faf8ff` · `surface-variant #dae2fd` · `surface-tint #2b6954` · `inverse-surface #283044` · `inverse-on-surface #eef0ff` · `inverse-primary #95d3ba` · `on-primary-container #80bea6` · `tertiary #2b2f30` · `on-tertiary #fff` · `tertiary-container #424547` · `on-tertiary-container #afb2b4` · `error-container #ffdad6` · `on-error #fff` · `on-error-container #93000a` · `primary-fixed #b0f0d6` · `on-primary-fixed #002117` · `on-primary-fixed-variant #0b513d` · `secondary-fixed #6ffbbe` · `secondary-fixed-dim #4edea3` · `on-secondary-fixed #002113` · `on-secondary-fixed-variant #005236` · `tertiary-fixed #e0e3e5` · `tertiary-fixed-dim #c4c7c9` · `on-tertiary-fixed #191c1e` · `on-tertiary-fixed-variant #444749` · `on-background #131b2e` · `background #faf8ff` · `on-secondary #fff` · `on-tertiary-fixed*`.

> `[B]` Para estados semánticos, el destino puede reutilizar `error`, `error-container` (`#ffdad6`) y `on-error-container` (`#93000a`) para errores, y `secondary-container`/`on-secondary-container` para éxito. Son las únicas piezas no usadas que tienen sentido adoptar.

### 1.3 Conflictos con la prosa de `DESIGN.md` (ya resueltos en `DESIGN_RULES.md` §3.1)

Prosa: primario `#064e3b`, secundario `#10b981`, terciario `#f8fafc`, neutro `#0f172a`. **No usar** como paleta del modo claro. Los valores `#064e3b` (= `primary-container`) y `#10b981` (= `emerald-500`, usado en oscuro y en selección/foco oscuros) existen en la implementación, pero con otros roles.

---

## 2. Bloque CSS de variables (modo claro) `[B]` basado en `[E]`

Ejemplo para un destino **sin Tailwind** (CSS plano). Sustituir los valores `--brand-*` por la derivación del destino (COL-08).

```css
:root {
  /* — Marca y acción — */
  --color-primary: #003527;              /* derivar de la marca */
  --color-on-primary: #ffffff;
  --color-primary-container: #064e3b;    /* hover / KPI */
  --color-secondary: #006c49;            /* acento puntual */
  --color-secondary-container: #6cf8bb;
  --color-on-secondary-container: #00714d;

  /* — Superficies (escalera tonal) — */
  --color-surface: #faf8ff;
  --color-surface-lowest: #ffffff;
  --color-surface-low: #f2f3ff;
  --color-surface-container: #eaedff;
  --color-surface-high: #e2e7ff;
  --color-surface-highest: #dae2fd;

  /* — Texto y bordes — */
  --color-on-surface: #131b2e;
  --color-on-surface-variant: #404944;
  --color-outline: #707974;
  --color-outline-variant: #bfc9c3;
  --color-error: #ba1a1a;
  --color-on-error-container: #93000a;
  --color-error-container: #ffdad6;

  /* — Foco y selección — */
  --color-focus: #00714d;
  --color-selection-bg: #00714d;
  --color-selection-text: #ffffff;

  /* — Bordes con opacidad normalizada (COL-07) — */
  --border-subtle: color-mix(in srgb, var(--color-outline-variant) 20%, transparent);
  --border-section: color-mix(in srgb, var(--color-outline-variant) 30%, transparent);
  --border-input: color-mix(in srgb, var(--color-outline-variant) 50%, transparent);

  /* — Tipografía — */
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  /* — Radios (valores efectivos, §6) — */
  --radius-xs: 0.25rem;   /* 4  checkbox */
  --radius-sm: 0.5rem;    /* 8  */
  --radius-md: 0.75rem;   /* 12 botones, nav */
  --radius-lg: 1rem;      /* 16 inputs, logo, tarjetas pequeñas */
  --radius-xl: 1.25rem;   /* 20 tarjetas (móvil), paneles */
  --radius-2xl: 1.5rem;   /* 24 tarjetas grandes */
  --radius-full: 9999px;

  /* — Espaciado — */
  --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem;
  --space-lg: 1.5rem;  --space-xl: 2.5rem;
  --gutter: 1.5rem;    --margin: 2rem;
  --container: 80rem;  --container-narrow: 56rem;
  --header-h: 4rem;
  --section-y: 4rem;   /* 6rem desde 640px */

  /* — Sombras — */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, .05);
  --shadow-md: 0 4px 6px -1px rgba(0, 53, 39, .20), 0 2px 4px -2px rgba(0, 53, 39, .20);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, .10), 0 8px 10px -6px rgba(0, 0, 0, .10);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, .25);
  --shadow-header: 0 1px 8px rgba(6, 78, 59, .04);

  /* — Movimiento — */
  --ease-ui: ease;
  --dur-fast: 200ms;
  --dur-base: 300ms;
  --dur-deck: 220ms;
}
@media (min-width: 640px) { :root { --section-y: 6rem; } }
```

> Los valores de `--shadow-sm/xl/2xl` son los predeterminados de Tailwind v3 que aplica la referencia por utilidades; `--shadow-md` incorpora el tinte `primary/20` que usa el CTA del hero. Son una **traducción** (`[B]`), no variables existentes en el ZIP.

### 2.1 Base global mínima `[E]`

```css
html { scroll-behavior: smooth; scroll-padding-top: 5rem; }
body {
  margin: 0;
  font-family: var(--font-sans);
  background: var(--color-surface);
  color: var(--color-on-surface);
  -webkit-font-smoothing: antialiased;
  transition: background-color .25s ease, color .25s ease;
}
main { padding-top: var(--header-h); }
section[id] { scroll-margin-top: 4.5rem; }
img { max-width: 100%; height: auto; }
input, textarea { max-width: 100%; }
a, button, summary, input, textarea { touch-action: manipulation; }
::selection { background: var(--color-selection-bg); color: var(--color-selection-text); }
:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 3px; }
h1, h2, h3, h4, h5, h6, p, span, a, div { overflow-wrap: break-word; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

---

## 3. Traducción a la tecnología del destino `[A]`

| Si el destino usa… | Cómo introducir los tokens |
|---|---|
| CSS plano | Bloque `:root` de §2 en un archivo `tokens.css` cargado antes de los estilos existentes; sustituir valores gradualmente en las reglas existentes. |
| SCSS/Less | Variables `$color-*` generadas desde el mismo mapa; exportar también como custom properties. |
| Tailwind (compilado) | Extender `theme.extend` (ver §3.1). No tocar utilidades del destino que no formen parte del rediseño. |
| Bootstrap | Sobrescribir variables CSS `--bs-*` y variables Sass (`$primary`, `$border-radius*`); no añadir Tailwind. |
| CMS/tema (WordPress, Shopify, etc.) | Custom properties en el CSS del tema hijo o en «CSS adicional»; no editar archivos del núcleo. |
| CSS-in-JS / componentes | Objeto de tema con las mismas claves; sin hex en componentes. |

### 3.1 Tailwind: configuración de referencia (extracto) `[E]`

```js
// tailwind.config.js (extracto verificable en tailwind-config.js)
module.exports = {
  darkMode: 'class',
  theme: { extend: {
    colors: {
      primary: '#003527', 'on-primary': '#ffffff', 'primary-container': '#064e3b',
      secondary: '#006c49', 'secondary-container': '#6cf8bb', 'on-secondary-container': '#00714d',
      surface: '#faf8ff', 'surface-container-lowest': '#ffffff', 'surface-container-low': '#f2f3ff',
      'surface-container': '#eaedff', 'surface-container-high': '#e2e7ff', 'surface-container-highest': '#dae2fd',
      'on-surface': '#131b2e', 'on-surface-variant': '#404944',
      outline: '#707974', 'outline-variant': '#bfc9c3', error: '#ba1a1a',
    },
    borderRadius: { DEFAULT: '.25rem', sm: '.25rem', md: '.5rem', lg: '.75rem', xl: '1rem', '2xl': '1.25rem', '3xl': '1.5rem', full: '9999px' },
    spacing: { gutter: '1.5rem', margin: '2rem', 'space-xs': '.25rem', 'space-sm': '.5rem', 'space-md': '1rem', 'space-lg': '1.5rem', 'space-xl': '2.5rem' },
    fontFamily: { sans: ["'Plus Jakarta Sans'", 'sans-serif'], headline: ["'Plus Jakarta Sans'", 'sans-serif'], body: ["'Plus Jakarta Sans'", 'sans-serif'] },
  } }
};
```

> `[B]` Mejoras sobre la referencia: (1) las claves `font-*` por token (`title-md`, `label-lg`…) en `fontFamily` causan el defecto TIP-10; no definirlas ahí. (2) Referenciar colores con `rgb(var(--…) / <alpha-value>)` si se necesita opacidad con variables CSS.

---

## 4. Modo oscuro `[E]` (solo si el destino lo requiere; ver COL-12)

La referencia incrusta estos HEX directamente en el HTML. Se proponen nombres semánticos `[B]` para tokenizarlos.

| Token propuesto `[B]` | HEX `[E]` | Dónde se usa (n.º de usos) |
|---|---|---|
| `--dm-page` | `#0a1118` | Fondo de página y secciones base (10) |
| `--dm-section-alt` | `#0d1620` | Secciones alternas; fondo de inputs (8) |
| `--dm-card` | `#111e29` | Tarjetas, FAQ, tiles de logo, panel hero, contenedor de formulario (22) |
| `--dm-card-inner` | `#162736` | Tarjetas dentro del panel del hero (2) |
| `--dm-control` | `#162532` | Botones de icono/idioma/tema, botón secundario, tile de acción (5) |
| `--dm-control-hover` | `#1e3345` | Hover de controles (4) |
| `--dm-row-hover` | `#152330` | Hover de filas del menú móvil (9) |
| `--dm-header` | `#0b1319` | Header (90 %), panel móvil |
| `--dm-footer` | `#080d14` | Footer; base del velo de la imagen |
| `--dm-text-strong` | `#ffffff` / `#f1f5f9` | Titulares / texto base |
| `--dm-text` | `#cbd5e1` (slate-300) | Cuerpo |
| `--dm-text-muted` | `#94a3b8` (slate-400) | Secundario |
| `--dm-accent` | `#34d399` (emerald-400) | Enlaces, KPI, iconos (54) |
| `--dm-accent-soft` | `#6ee7b7` (emerald-300) | Texto de chips |
| `--dm-btn` | `#059669` (emerald-600) → hover `#10b981` | Botón primario (9) — **ver contraste** |
| `--dm-tile` | `#047857` (emerald-700) | Tiles de icono, avatares, logo (9) |
| `--dm-chip-bg` | `rgba(2, 44, 34, .80)` (emerald-950/80) | Chips y badges de check |
| `--dm-border` | `rgba(255,255,255,.10)` | Bordes generales (60); `.15` en inputs; `.05` en tarjeta interior |
| `--dm-focus` / selección | `#10b981` / fondo `#10b981`, texto `#002117` | `:focus-visible`, `::selection` |

Otros `[E]`: `color-scheme: dark` en `html.dark`; scrollbar thumb `#334155`, track `#0a1118`; el interruptor usa icono ámbar `#fcd34d` (`amber-300`).

### 4.1 Corrección recomendada de contraste en oscuro `[B]`

| Elemento | Referencia | Contraste | Propuesta | Contraste |
|---|---|---|---|---|
| Botón primario | blanco / `#059669` | 3,77 | `#002117` sobre `#34d399` (hover `#6ee7b7`) o blanco sobre `#047857` | ≈ 8,5 / 5,48 |
| Hover botón | blanco / `#10b981` | 2,54 | Ver anterior | — |
| Copyright | `#64748b` / `#080d14` | 4,09 | `#94a3b8` | ≥ 7 |

---

## 5. Contrastes calculados (WCAG 2.x) `[E]`

Calculados con la fórmula de luminancia relativa; las opacidades se mezclaron con el fondo real. AA texto normal = 4,5:1; AA texto grande/UI = 3:1.

| Par | Ratio | Estado |
|---|---|---|
| `on-surface` `#131b2e` / `surface` | 16,29 | ✔ |
| `on-surface-variant` / `surface` | 8,84 | ✔ |
| `on-surface-variant` / `surface-container-low` | 8,45 | ✔ |
| `primary` / `surface` | 12,96 | ✔ |
| `on-primary` / `primary` | 13,65 | ✔ |
| `on-primary` / `primary-container` (hover) | 9,72 | ✔ |
| `secondary` / `surface` | 6,15 | ✔ |
| `secondary` / `surface-container-low` | 5,87 | ✔ |
| `primary-container` / `surface` (KPI, H1) | 9,23 | ✔ |
| `on-secondary-container` / `secondary-container` (chip) | 4,55 | ✔ (justo) |
| `primary/70` / `surface-container-low` (micro-etiqueta 11 px) | 5,13 | ✔ |
| `outline` / `surface` | 4,26 | ✘ para texto; ✔ para UI (≥ 3) |
| Placeholder `outline/70` / `surface-container-low` | **2,47** | ✘ |
| Foco `#00714d` / `surface` | 5,75 | ✔ |
| Selección blanco / `#00714d` | 6,05 | ✔ |
| Oscuro: `#f1f5f9` / `#0a1118` | 17,33 | ✔ |
| Oscuro: slate-300 / `#0a1118` | 12,79 | ✔ |
| Oscuro: slate-400 / `#0a1118` | 7,40 | ✔ |
| Oscuro: slate-400 / `#111e29` | 6,60 | ✔ |
| Oscuro: slate-500 / `#080d14` (copyright) | **4,09** | ✘ (12 px) |
| Oscuro: emerald-400 / `#0a1118` | 9,87 | ✔ |
| Oscuro: emerald-400 / `#111e29` | 8,80 | ✔ |
| Oscuro: blanco / emerald-600 (botón) | **3,77** | ✘ |
| Oscuro: blanco / emerald-500 (hover) | **2,54** | ✘ |
| Oscuro: blanco / emerald-700 (tile) | 5,48 | ✔ |
| Oscuro: emerald-300 / slate-800 (chip) | 9,60 | ✔ |
| Oscuro: foco `#10b981` / `#0a1118` | 7,48 | ✔ |

**Procedimiento para el destino `[B]`:** calcular cada par (texto/fondo, icono/fondo, borde de input/fondo, foco/fondo) con valores resueltos; registrar en el informe final; cualquier ✘ se corrige ajustando el token (no el componente).

---

## 6. Tipografía — tokens `[E]`

Declarados en `DESIGN.md`/`tailwind-config.js` (todos Plus Jakarta Sans):

| Token | Tamaño / interlineado | Peso | Tracking | Uso real en HTML |
|---|---|---|---|---|
| `headline-lg` | 32 / 40 | 700 | −0,02 em | `lg:text-headline-lg` en H3 de servicios |
| `headline-lg-mobile` | 24 / 32 | 700 | −0,01 em | Sin uso directo |
| `headline-md` | 24 / 32 | 600 | −0,01 em | Sin uso directo |
| `headline-sm` | 20 / 28 | 600 | — | Texto sobre imagen del hero (`sm:text-headline-sm`) |
| `title-lg` | 18 / 24 | 600 | — | H3 de pilares/soluciones, preguntas del FAQ |
| `title-md` | 16 / 24 | 600 | — | Botones, etiquetas, nombres |
| `body-lg` | 16 / 24 | 400 | — | Párrafo de tarjeta de servicio |
| `body-md` | 14 / 20 | 400 | — | Texto secundario |
| `body-sm` | 12 / 16 | 400 | — | Texto auxiliar |
| `label-lg` | 14 / 20 | 500 | — | Eyebrows (con `font-semibold`) |
| `label-md` | 12 / 16 | 500 | — | Sin uso |
| `label-sm` | 11 / 14 | 500 | — | Micro-etiquetas «01 Propósito» |

Escalas de Tailwind usadas fuera de tokens `[E]`: `text-xs` 12/16, `text-sm` 14/20, `text-base` 16/24, `text-lg` 18/28, `text-xl` 20/28, `text-2xl` 24/32, `text-3xl` 30/36, `text-4xl` 36/40, `text-5xl` 48/1; arbitrarios: `[40px]/48`, `[44px]/52`, `[32px]`, `[28px]`, `[24px]`, `[15px]`, `[16px]`, `[11px]`.

### 6.1 Escalas responsivas listas para CSS `[B]` (traducción de §5.2 de `DESIGN_RULES.md`)

```css
.h1 { font: 700 1.875rem/2.25rem var(--font-sans); letter-spacing: -.025em; }
@media (min-width:640px)  { .h1 { font-size: 2.25rem; line-height: 2.5rem; } }
@media (min-width:1024px) { .h1 { font-size: 3rem; line-height: 1.1; } }   /* corrige lh:1 de text-5xl */

.h2 { font: 700 1.5rem/2rem var(--font-sans); }
@media (min-width:640px)  { .h2 { font-size: 1.875rem; line-height: 2.25rem; } }
@media (min-width:1024px) { .h2 { font-size: 2.5rem; line-height: 3rem; } }
.h2--xl { letter-spacing: -.025em; }
@media (min-width:1024px) { .h2--xl { font-size: 2.75rem; line-height: 3.25rem; } }

.eyebrow { font: 600 .875rem/1.25rem var(--font-sans); text-transform: uppercase; letter-spacing: .05em; color: var(--color-primary); }
.lead { font-size: 1rem; line-height: 1.625; color: var(--color-on-surface-variant); }
@media (min-width:640px) { .lead { font-size: 1.125rem; } }
```

---

## 7. Radios, sombras, espaciado, movimiento y capas

### 7.1 Radios efectivos `[E]`
Ver tabla de `DESIGN_RULES.md` §5.4. Mapa por componente:

| Componente | Radio |
|---|---|
| Checkbox | 4 px |
| Botones, enlaces de nav desktop | 12 px |
| Inputs/textarea, logo tile, botones de icono, tarjetas de lista, tiles de logotipos, botón de formulario, filas del menú móvil | 16 px |
| Tile de icono de servicio (56 px), panel del hero, FAQ (`sm`+), tarjetas (móvil), imagen (móvil) | 20 px |
| Tarjetas de servicio/testimonio/formulario (`sm`+), imagen de ventajas (`sm`+) | 24 px |
| Chips, avatares, puntos, badge de check | 9999 px |
| Franja de imagen del hero | 16 px |

### 7.2 Sombras `[E]`
Ver `DESIGN_RULES.md` §5.5. Mapa: `shadow-sm` → botones de icono, CTA del header, tarjetas de lista (ventajas), logo; `shadow-md` → botones primarios; `shadow-xl` → tarjetas de servicio, formulario; `shadow-2xl` → panel hero, panel imagen, panel móvil; `shadow-inner` → franja de imagen.
Sombras oscuras: header `0 1px 12px rgba(0,0,0,.5)`; panel móvil `0 20px 25px -5px rgba(0,0,0,.7), 0 10px 10px -5px rgba(0,0,0,.5)`.

### 7.3 Espaciado `[E]`
Valores observados (px): 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 64, 96, 128. Preferir los de la escala «principal» 4-8-12-16-20-24-32-40-48-64-96-128; los semipasos (2, 6, 10, 14) solo en microajustes de gap/padding de componentes pequeños.

### 7.4 Movimiento `[E]`

| Elemento | Propiedad | Duración | Curva |
|---|---|---|---|
| Enlaces, botones, tarjetas, filas | color/fondo | 200 ms (`duration-200`; 150 ms por defecto de `transition-colors` si no se indica) | ease (Tailwind: `cubic-bezier(.4,0,.2,1)`) |
| Chevron FAQ | `transform` (rotate 180°) | 300 ms | ídem |
| Flecha de enlace / logo | `translateX(4px)` / `scale(1.05)` | por defecto Tailwind (150 ms) | ídem |
| Tarjetas del deck | `transform`, `opacity` | 220 ms (CSS) | `ease-out` |
| Cambio de tema | `background-color`, `color` en `body` | 250 ms | `ease` |
| Skip-link | `transform` | 200 ms | `ease` |
| Menú móvil | sin transición (apertura nativa de `details`) | — | — |

### 7.5 Capas (`z-index`) `[E]`
`-10` capa ambiental (no replicar) · `10` contenido del hero · `40` backdrop del menú móvil · `50` header y panel móvil · `100` skip-link.

### 7.6 Formato de iconos `[E]`
Material Symbols Outlined `opsz 24, wght 400, FILL 0, GRAD 0`; `FILL 1` en estrellas. Tamaños de icono: 16, 18, 20, 22, 24, 28 px.

---

## 8. Validación de tokens en el destino

- [ ] Existe un único archivo/mapa de tokens y todos los componentes lo referencian.
- [ ] No hay HEX fuera del archivo de tokens.
- [ ] Todos los pares de §5 equivalentes en el destino cumplen AA.
- [ ] Radios y sombras computados ⊂ las escalas de §7.
- [ ] No se crearon tokens sin uso.
- [ ] Si hay modo oscuro, todos los pares oscuros de §4/§5 verificados.
