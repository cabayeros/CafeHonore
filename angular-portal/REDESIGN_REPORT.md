# Informe de rediseño — +PLUS · Café Honoré

## 1. Resumen

Se rehízo la composición del portal con una paleta derivada de la marca +PLUS, superficies cálidas y una jerarquía editorial más marcada. La cabecera ahora integra la marca y la navegación; la portada presenta un panel editorial junto al carrusel. Se mantuvieron Angular, los textos fuente, las imágenes, las rutas y los flujos existentes; el modo oscuro y el carrusel siguen funcionando. No se añadieron dependencias.

## 2. Conservado sin cambios

- **Contenido:** textos, datos, títulos, orden de las nueve entradas del contenido original y etiquetas visibles. `npm run verify:content` confirma el contenido del baseline.
- **Recursos:** logos, icono del sitio, carrusel, imágenes de tarjetas, condiciones, sucursales y contacto. Se conservaron los archivos y las URL locales; se ajustaron recortes y proporciones.
- **Estructura funcional:** siete rutas, enlaces externos, IDs y nombres de campos, formularios, validadores Angular, integración HTTP opcional, pestañas, carrusel, menú y preferencia de tema.
- **Tecnología:** Angular 22, CSS plano, fuentes locales disponibles y dependencias existentes.

## 3. Modificado

| Área | Cambio | Regla aplicada | Tipo |
|---|---|---|---|
| Tokens | Paleta semántica, escalera de superficies cálidas, radios, sombras, foco y bordes en un archivo dedicado. | COL-01, COL-08/09, IMP-02 | [A]/[B] |
| Base global | Tipografía efectiva conservada; foco visible, selección, contraste, espaciado y contenedor unificados. | TIP-02/08/10, LAY-01/03, FRM-01/02, IDV-01 | [E]/[B] |
| Cabecera y navegación | Marca y tres logos de socios forman una cabecera integrada con navegación; menú móvil conserva sus siete enlaces, cierra con Escape y devuelve el foco al botón. | CMP-HDR, CMP-NAVM, CMP-STATES, RSP-03, A11-06 | [E]/[B] |
| Portada | Composición nueva en dos columnas: panel editorial con la marca activa y llamada a la acción junto al carrusel original; en móvil se apila. Los indicadores se atenúan tras 2.6 s inactivos y reaparecen con foco o clic. | CMP-HERO adaptado, IMG-01/03/04, RSP-05, A11-02 | [E]/[A] |
| Títulos de sección | Cabeceras pasan a una franja editorial con acento de marca y escala tipográfica amplia. | CMP-EDIT, TIP-02, LAY-03 | [E] |
| Pestañas internas | Acerca de se organiza en tres tarjetas de marca; Políticas usa pestañas segmentadas con contenido editorial; Condiciones se divide en bloques; Establecimientos usa una cuadrícula de sucursales. Inicio no se modificó en esta iteración. | CMP-CARD, CMP-EDIT, IDV-04/05, RED-06 | [E]/[A] |
| Formularios | Mi Cuenta se presenta como tarjeta de acceso centrada; Contacto organiza el formulario y los datos de contacto en columnas. Inputs de 16 px, mensajes de error asociados y campos, IDs y nombres intactos. | CMP-FORM, CMP-STATES, A11-07, RSP-T12 | [E]/[B] |
| Imágenes | `alt` descriptivo para imágenes informativas; el carrusel conserva imágenes decorativas ocultas a lectores de pantalla. | IMG-01/03/05, A11-09 | [A]/[B] |
| Calidad de CSS | Tokens separados y estilos activos reorganizados en una sola hoja de componentes, sin HEX sueltos fuera de `tokens.css`. | IMP-01/02/05, COL-01 | [B] |
| Fixture de contenido | La referencia esperada se corrigió de `.jpg` a `.png`, que es el recurso usado por la plantilla y presente en `public/assets/img`. | IMG-01, RED-04 | [A] |

## 4. Decisiones de adaptación

| Tema | Referencia | Destino | Decisión y motivo |
|---|---|---|---|
| Color principal | Verde esmeralda | Rojo `#b82940` | Se conservó el rojo de marca como `primary`; blanco sobre el rojo alcanza 6.12:1. |
| Color secundario | Verde medio | Azul `#16466b` | Se conservó el azul ya usado por el portal para enlaces y estados informativos. |
| Modo oscuro | Paleta oscura verde | Rojo `#ee8493`, azul claro `#9dc8e8` y superficies existentes oscuras | Se mantuvo el tema que ya ofrece la aplicación, con texto oscuro sobre el primario claro para cumplir contraste. |
| Tipografía | Plus Jakarta Sans | `Segoe UI`, Arial, sans-serif | Se conservó la familia que el portal realmente utiliza; no se cargaron fuentes externas. |
| Portada | Hero con panel, CTA y KPIs | Carrusel existente | Se adaptó el tratamiento visual del carrusel sin sustituirlo ni añadir métricas, botones o contenido. |
| Patrones omitidos | Testimonios, FAQ, estadísticas, logos de clientes y deck | No existen en el destino | No se añadieron secciones ni contenido ficticio. |
| Superficies | Tonos azul-lavanda | Neutros cálidos del destino | Se conservaron y graduaron los fondos cálidos existentes. |

## 5. Contraste y accesibilidad

Contrastes calculados con los valores finales de los tokens y la fórmula WCAG. Texto normal: mínimo 4.5:1; foco y controles: mínimo 3:1.

| Pareja | Claro | Oscuro |
|---|---:|---:|
| Texto de botón / fondo primario | 6.12:1 | 6.94:1 |
| Texto de botón / fondo hover | 8.10:1 | 8.73:1 |
| Texto principal / superficie | 13.34:1 | 15.31:1 |
| Texto secundario / superficie | 4.82:1 | 8.59:1 |
| Texto secundario / superficie baja | 4.54:1 | 8.03:1 |
| Placeholder / superficie baja | 4.54:1 | 8.03:1 |
| Enlace secundario / superficie | 9.15:1 | 9.85:1 |
| Error / superficie | 6.82:1 | 8.66:1 |
| Anillo de foco / superficie | 9.15:1 | 8.79:1 |

Se verificaron el skip-link con teclado, el anillo de foco de 3 px, el cierre del menú con Escape y `prefers-reduced-motion`. Los mensajes de error de campos tienen relaciones ARIA explícitas. Las imágenes informativas tienen nombres accesibles; las diapositivas son decorativas y el título accesible del carrusel aporta su contexto.

**Limitación heredada:** parte del HTML importado usa `div` con clases visuales `.h1` y `.h2` en lugar de elementos de encabezado semánticos. Se conservó esa estructura para no alterar el contenido convertido; conviene tratar la semántica del HTML original en una tarea separada.

## 6. Responsive

La navegación y las siete rutas se probaron a 320, 375, 768, 1024 y 1440 px: **35 combinaciones sin scroll horizontal**. El menú compacto se probó abierto y cerrado con Escape. El contenido se apila en móvil y las imágenes conservan su proporción y recorte.

## 7. Regresión funcional

| Comprobación | Resultado |
|---|---|
| Texto, títulos, listas e imágenes del baseline | Sin diferencias; 9 entradas verificadas. |
| Campos, nombres y límites de formularios | Sin diferencias; firmas verificadas. |
| Siete rutas y controles de navegación | Correctos en la prueba de navegador. |
| Carrusel: avance, retroceso, reproducción, pausa y movimiento reducido | Correctos. |
| Tema claro/oscuro y preferencia persistida | Correctos. |
| Menú móvil y selección de ruta | Correctos; Escape cierra y devuelve foco. |
| Formularios sin configuración de API | Permanecen deshabilitados como antes; campos y mensajes visibles. El servidor externo no está configurado en `public/config.json`, por lo que no se pudo probar un envío real. |
| Errores JavaScript y respuestas HTTP en la prueba de navegador | Ninguno. |
| Build | `npm run build` correcto. |
| Pruebas | `npm test`: 10 pruebas correctas. |

## 8. Cambios de texto añadidos

No se añadieron cadenas nuevas: se hacen visibles en la portada los nombres que ya tenía el carrusel como encabezados accesibles y la etiqueta existente “Nuestras marcas”. También se añadieron nombres `alt` descriptivos, IDs de mensajes de error y atributos `aria-invalid`/`aria-describedby` para accesibilidad.

## 9. Incidencias abiertas y recomendaciones

- La integración de envío depende de una API externa ausente en `public/config.json`; validar el éxito real cuando exista una URL de API configurada.
- Revisar en otra tarea la semántica de encabezados del contenido HTML importado, manteniendo exactamente sus textos.
- No se modificaron archivos dentro de `rules/`. El proyecto no usa Git, por lo que los cambios se entregan por etapas documentadas y no como commits.

## 10. Lista de verificación de DESIGN_RULES.md §14

- [x] Texto y contenido preservados (RED-02); baseline de nueve entradas verificado.
- [x] Imágenes, logos e iconos conservados (IMG-01).
- [x] Secciones y orden preservados (RED-05).
- [x] Formularios, enlaces, scripts e integraciones preservados (RED-04).
- [x] Tecnología y dependencias sin migración ni adiciones (RED-03).
- [x] Logo, marca y color primario del destino conservados (IDV-07, COL-08).
- [x] Sin marca ni recursos de la referencia.
- [x] Dos tonos de marca como máximo; color de error reservado al estado semántico (IDV-03).
- [x] Tokens definidos y utilizados; ningún HEX en estilos fuera de `src/tokens.css` (COL-01, IMP-02).
- [x] Escala tipográfica y tamaños mínimos aplicables; campos móviles a 16 px (TIP-02/08/10).
- [x] Contenedores, espaciado, radios y sombras dentro de escalas adaptadas (LAY-01/03, FRM-01/02).
- [x] Superficies, patrones y componentes adaptados al contenido existente (IDV-04/05, CMP-*).
- [x] Hover, foco y activo presentes en controles; campos con errores asociados (CMP-STATES, A11-07).
- [x] Sin scroll horizontal a 320/375/768/1024/1440 px; menú móvil operable con Escape (RSP-04, RSP-03, A11-06).
- [x] Contenido reorganizado sin ocultarlo (RSP-05).
- [x] Contraste AA verificado en claro y oscuro con valores resueltos (COL-11).
- [x] Skip-link, foco visible y movimiento reducido probados (A11-01/02, MOT-02).
- [~] Encabezados visuales existentes preservados; algunos son `div` y no encabezados semánticos (A11-03; limitación documentada arriba).
- [x] Imágenes con nombre accesible o marcadas como decorativas; iconos del carrusel llevan nombre por su control (IMG-05, A11-09).
- [x] Sin Tailwind CDN ni dependencias nuevas; reglas de componente consolidadas sin HEX dispersos (IMP-04/05).
