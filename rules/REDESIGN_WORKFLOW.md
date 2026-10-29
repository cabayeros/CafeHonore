# REDESIGN_WORKFLOW.md — Procedimiento operativo para rediseñar un sitio existente

> Complemento de `DESIGN_RULES.md` §11–§15. Convierte las reglas en pasos con entregables y criterios de salida. No contradice al principal; si hay discrepancia, prevalece `DESIGN_RULES.md`.
> Etiquetas: `[E]` extraído · `[B]` recomendación · `[A]` adaptable.

**Principio rector.** Se moderniza la **presentación**. Contenido, recursos, estructura funcional, identidad y tecnología del destino se conservan. Orden de precedencia (RED-01): funcionalidad → contenido → recursos → identidad → estructura de secciones → estética de la referencia.

**Cuándo detenerse y preguntar.** Si una acción exige eliminar contenido, cambiar lógica o contratos, sustituir imágenes, migrar tecnología, o si el destino carece de información necesaria (p. ej. sin logotipo ni color de marca identificable), **no improvisar**: documentar la duda y proponer la opción más conservadora.

---

## Paso 0 — Preparación

| Acción | Entregable |
|---|---|
| Confirmar alcance: ¿una página, varias, todo el sitio? ¿Qué se puede tocar (plantillas, CSS, JS)? | Alcance escrito |
| Crear respaldo o rama (`git branch rediseno-visual`, o copia de archivos) | Punto de restauración |
| Identificar entorno de pruebas | URL local/staging |
| Leer `DESIGN_RULES.md` completo | — |

**Criterio de salida:** hay forma de volver al estado original.

---

## Paso 1 — Inventario del destino

Completar esta ficha **antes** de modificar nada.

```
FICHA DEL DESTINO
─ Tecnología: [HTML estático | WordPress+tema | Shopify | React | Vue | Bootstrap | Tailwind | otro] · versión
─ Estilos: [archivos CSS/SCSS, variables, metodología BEM/otra, framework]
─ JavaScript: [librerías, scripts propios, dependencias de IDs/clases]
─ Páginas/plantillas en alcance: …
─ Secciones por página (orden): …
─ Navegación: [enlaces, submenús, CTA]
─ Formularios: [campos, name/id, action, method, validación, captcha, integraciones]
─ Integraciones: [analítica, chat, pixel, pagos, mapas, newsletter…]
─ Recursos: [imágenes (ruta, tamaño, formato), logotipos, iconos, fuentes, vídeos]
─ Marca: [logotipo, colores (hex), tipografías, tono]
─ Breakpoints y comportamiento responsive existentes
─ Accesibilidad actual: [lang, alt, encabezados, foco, contraste]
─ Elementos legales/contenido sensible: [avisos, cookies, textos regulados]
```

**Captura base `[B]`:** 375, 768 y 1440 px de cada página; guardar el texto visible (para RED-02) y la lista de enlaces y formularios.

**Criterio de salida:** ficha completa; inventario de imágenes con ruta y uso.

---

## Paso 2 — Decidir la capa técnica (RED-03)

| Destino | Estrategia |
|---|---|
| CSS plano | `tokens.css` + reglas de componente nuevas; sustituir valores existentes de forma progresiva |
| SCSS/Less | Mapa de variables + `@mixin`s; mantener estructura de parciales |
| Tailwind | Extender `theme.extend`; sustituir clases en las plantillas |
| Bootstrap | Variables Sass/CSS `--bs-*`; sobrescribir componentes con selectores del mismo nivel |
| WordPress/CMS | Estilos en tema hijo o CSS adicional; no editar el núcleo ni plugins; respetar bloques/plantillas |
| React/Vue/otros | Tokens en el sistema de estilos del proyecto; componentes existentes con nuevas clases; sin añadir librerías |
| Sitio sin control del HTML | Solo CSS; documentar lo que no se pueda lograr |

**Prohibido:** añadir Tailwind, jQuery u otra dependencia solo para replicar la referencia.
**Criterio de salida:** decisión escrita y dependencia nueva = ninguna (o justificada).

---

## Paso 3 — Derivar los tokens del destino (COL-08/09, TIP-01)

1. **Colores.** Listar los colores del destino con frecuencia de uso. Elegir `primary`; derivar `primary-container`, `secondary`, escalera de superficies, `on-surface`, `on-surface-variant`, `outline-variant`.
2. **Contraste.** Calcular los pares críticos (DESIGN_TOKENS §5). Ajustar tokens hasta AA.
3. **Tipografía.** Conservar la familia del destino; aplicar la escala (DESIGN_RULES §5.2) con sus pesos.
4. **Radios/sombras/espaciado.** Adoptar las escalas (§5.3–5.5).
5. **Tokens de estado.** `error`, `success` a partir de los del destino o de `error`/`secondary-container`.
6. **Modo oscuro:** solo si existe o se pide (COL-12).

**Tabla de decisión (rellenar):**

| Elemento | Valor original | Decisión (conservar / ajustar / complementar) | Valor final | Motivo |
|---|---|---|---|---|
| Color de marca | | | | |
| Acento | | | | |
| Fondo página | | | | |
| Texto | | | | |
| Tipografía | | | | |

**Criterio de salida:** archivo de tokens creado; informe de contraste sin fallos AA.

---

## Paso 4 — Mapear secciones del destino a patrones (RED-08)

Rellenar una fila por sección **existente**:

| Sección del destino | Contenido real | Patrón aplicable | ¿Se usa? | Notas / conflictos |
|---|---|---|---|---|
| Portada | | CMP-HERO | | |
| Quiénes somos | | LAY-02 + pilares | | |
| Servicios | | CMP-CARD / CMP-EDIT / (CMP-DECK) | | |
| … | | | | |

Reglas del mapeo:
1. Si el destino no tiene el contenido para un patrón (cifras, testimonios, logotipos…), **no se añade**.
2. No dos secciones consecutivas con el mismo patrón (IDV-05).
3. Alternar `surface` / `surface-container-low` (IDV-04).
4. Si una sección del destino no encaja en ningún patrón, usar cabecera estándar (CMP-SEC) + el contenido original sin transformar.

**Criterio de salida:** todas las secciones originales aparecen en la tabla; ninguna eliminada (RED-05).

---

## Paso 5 — Estilos globales

Orden de implementación:

1. Cargar tokens y fuente (con `display=swap`; autoalojar si es posible).
2. Base: `html`, `body`, `main` (offset del header), `img`, selección, scroll, enlaces.
3. Accesibilidad global: skip-link, `:focus-visible`, `prefers-reduced-motion` (DESIGN_TOKENS §2.1).
4. Contenedores: `.container` (80 rem) y `.container--narrow` (56 rem).
5. Utilidades de sección: padding vertical, alternancia de fondos.

**Criterio de salida:** la página sigue funcionando con la nueva base aunque aún no tenga los componentes.

---

## Paso 6 — Componentes (orden fijo)

1. **Header + navegación** (CMP-HDR, CMP-NAVM): mantener los enlaces y el comportamiento del destino.
2. **Hero** (CMP-HERO).
3. **Secciones de contenido** (LAY, CMP-CARD/EDIT/FEAT/…).
4. **Prueba social** (solo si existe).
5. **FAQ / acordeones** (conservando su mecanismo).
6. **Formulario** (CMP-FORM): estilo + estados; cero cambios de campos/atributos.
7. **Footer** (CMP-FOOT).

Por cada componente:
- [ ] Mantener el DOM semántico y atributos funcionales (`id`, `name`, `data-*`, `href`, `aria-*` existentes).
- [ ] Si se renombran clases/IDs, actualizar CSS, JS y plantillas.
- [ ] Aplicar la receta con tokens.
- [ ] Definir hover, foco, activo y estados `[B]` aplicables.
- [ ] Verificar contraste y tamaño táctil.

**Criterio de salida:** cada componente probado aislado y en contexto.

---

## Paso 7 — Integrar imágenes originales (IMG-01…11)

Para cada imagen del inventario:

| Imagen | Ubicación | Contenedor (ratio, alto) | `object-fit` / posición | Velo | Alt |
|---|---|---|---|---|---|
| | | | cover / contain; centro / otra | sí/no | texto |

Procedimiento:
1. Asignar la imagen a su contenedor equivalente (hero, panel, tarjeta, avatar).
2. Elegir `cover` (fotos) o `contain` (logotipos, diagramas).
3. Ajustar `object-position` para conservar el sujeto.
4. Radio del contenedor según la escala; `overflow:hidden`.
5. Texto superpuesto → velo y contraste verificados.
6. `alt` o `aria-label`; `width`/`height`; `loading="lazy"` salvo la principal.
7. Si la imagen es de baja resolución, **no** ampliarla: reducir el contenedor o usar un ratio menor; anotar en el informe.

**Criterio de salida:** inventario de imágenes ⊆ usadas; ninguna sustituida.

---

## Paso 8 — Responsive (DESIGN_RULES §9, RESPONSIVE_RULES)

1. Aplicar la matriz de `RESPONSIVE_RULES.md` §3 (o su mapeo a los breakpoints del destino, §5).
2. Probar con el protocolo de §7 de ese archivo.
3. Corregir desbordamientos, solapamientos, tamaños táctiles.

**Criterio de salida:** sin scroll horizontal a 320–1440 px; contenido íntegro en móvil.

---

## Paso 9 — Accesibilidad y calidad (DESIGN_RULES §10, §13)

- [ ] Contraste AA (herramienta automática + revisión de pares críticos).
- [ ] Teclado: recorrido completo con `Tab`; menú con `Esc`; sin trampas.
- [ ] Foco visible en todos los controles.
- [ ] Encabezados sin saltos; un `<h1>`; secciones nombradas.
- [ ] Imágenes con nombre accesible; iconos decorativos ocultos.
- [ ] Formularios: etiquetas, errores, éxito sin `alert()`.
- [ ] `prefers-reduced-motion`.
- [ ] Sin HEX fuera de tokens; sin estilos duplicados/contradictorios.
- [ ] No hay CDN de desarrollo ni dependencias nuevas.

---

## Paso 10 — Regresión funcional (RED-04)

Comparar con la captura base:

| Comprobación | Antes | Después |
|---|---|---|
| Texto visible idéntico (RED-02) | | |
| Todos los enlaces `href` y destinos | | |
| Envío de formulario (éxito y error) | | |
| Menú y submenús | | |
| Scripts propios (sliders, pestañas, modales) | | |
| Analítica/píxeles se disparan | | |
| Integraciones (chat, pagos, mapas) | | |
| Consola sin errores nuevos | | |
| Rendimiento (peso, CLS, tiempo de carga) sin deterioro sustancial | | |

**Criterio de salida:** sin regresiones. Si hay una, corregirla; si no se puede sin romper el diseño, priorizar la funcionalidad (RED-01).

---

## Paso 11 — Informe final (obligatorio)

```markdown
# Informe de rediseño — [nombre del sitio]

## 1. Resumen
Qué se hizo en 3–5 líneas.

## 2. Conservado sin cambios
- Contenido: …
- Recursos (imágenes, logotipos, iconos): …
- Estructura funcional: formularios, enlaces, scripts, integraciones: …
- Tecnología: …

## 3. Modificado
| Área | Cambio | Regla aplicada (ID) | Tipo [E]/[B]/[A] |
|---|---|---|---|

## 4. Decisiones de adaptación
| Tema | Referencia | Destino | Decisión y motivo |
|---|---|---|---|
| Color principal | | | |
| Tipografía | | | |
| Patrones omitidos (no hay contenido) | | | |

## 5. Contraste y accesibilidad
- Informe de pares de contraste (antes/después).
- Defectos de la referencia evitados (DESIGN_RULES §3.2).
- Pendientes/limitaciones.

## 6. Responsive
Resultados por ancho (320, 375, 768, 1024, 1440).

## 7. Regresión funcional
Tabla del Paso 10.

## 8. Cambios de texto añadidos (si los hay)
Solo atributos técnicos (aria-label, alt, etc.).

## 9. Incidencias abiertas y recomendaciones
- Qué no se pudo aplicar y por qué.
- Sugerencias que requieren aprobación (p. ej. sustituir imágenes de baja calidad).
```

---

## Anexo A — Errores frecuentes y cómo evitarlos

| Error | Consecuencia | Evitar |
|---|---|---|
| Sustituir el color de marca por el verde de la referencia | Pérdida de identidad | COL-08/09: derivar, no sustituir |
| Añadir testimonios, KPI y logotipos «de relleno» | Contenido falso | RED-06; sin contenido real, sin patrón |
| Reemplazar imágenes por stock | Pérdida de recursos | IMG-01 |
| Importar el selector de idioma y de tema | Cambio funcional | Restricción 6 |
| Copiar `alert()` y `novalidate` | Peor accesibilidad | A11-07 |
| Aplicar deck por scroll a muchas tarjetas | Scroll excesivo, accesibilidad pobre | MOT-03 / CMP-DECK |
| Dejar HEX en componentes | Deriva visual | COL-01 |
| Usar `font-title-md` para fijar tamaño | Tamaño no aplicado | TIP-10 |
| Overflow oculto en `html` y `body` con sticky | Sticky roto | IMP-07 |
| Cargar Tailwind Play CDN | Rendimiento y fiabilidad | IMP-04 |
| Renombrar clases sin actualizar JS | Funcionalidad rota | RED-04 |

## Anexo B — Mapa rápido de reglas por tarea

| Tarea | Reglas |
|---|---|
| Colores | COL-01…12, IDV-03/04 |
| Texto | TIP-01…11 |
| Estructura | LAY-01…06, IDV-02/05 |
| Componentes | CMP-* (principal) + `COMPONENT_RULES.md` |
| Imágenes | IMG-01…11 |
| Movimiento | MOT-01…05 |
| Responsive | RSP-01…06 + `RESPONSIVE_RULES.md` |
| Accesibilidad | A11-01…12 |
| Calidad | IMP-01…10 |
| Preservación | RED-01…08 y Restricciones §12 |
