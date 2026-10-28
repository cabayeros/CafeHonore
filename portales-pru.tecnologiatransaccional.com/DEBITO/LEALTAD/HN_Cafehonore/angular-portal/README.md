# Café Honoré · Angular 22

## Cambios realizados

- Aplicación independiente con Angular 22 y Node 24.
- Separación de la lógica de navegación, integración HTTP, formularios y contenido.
- Conservación de los textos, listas, tarjetas, direcciones, teléfonos, imágenes y campos originales.
- Presentación adaptable a móviles y temas claro/oscuro con preferencia guardada.
- Carrusel automático con pausa, controles y soporte de movimiento reducido.
- Comprobación de integridad del contenido antes de compilar.

Esta carpeta contiene todo lo necesario para ejecutar y compilar la aplicación. No depende de las carpetas del portal histórico o de las referencias de diseño.

## Requisitos

- Node **24.x**, mínimo **24.15.0**; `.nvmrc` fija **24.22.1**.
- npm, incluido con Node.

Si usas nvm para Windows:

```powershell
nvm install 24.22.1
nvm use 24.22.1
node --version
```

## Ejecutar desde la terminal de VS Code

Desde la raíz del espacio de trabajo:

```powershell
cd ".\DEBITO\LEALTAD\HN_Cafehonore\angular-portal"
npm.cmd ci
npm.cmd start
```

Si abriste directamente esta carpeta en VS Code, omite el comando `cd`. Abre `http://127.0.0.1:4200`. Angular recompila los cambios automáticamente. Detener con `Ctrl + C`.

Para utilizar otro puerto:

```powershell
npm.cmd start -- --port 4201
```

## Comprobar y compilar

```powershell
npm.cmd run verify:content
npm.cmd test
npm.cmd run build
```

La compilación se genera en `dist/portal/browser/`. `npm.cmd run build` comprueba primero que los datos coincidan con la referencia de contenido incluida en `tools/content-baseline.json`.

## Archivos de la aplicación

| Ubicación | Uso |
| --- | --- |
| `src/main.ts` | Inicio de Angular y rutas |
| `src/portal/` | Componentes, formularios, servicios, contenido y pruebas |
| `src/styles.css` | Diseño y temas |
| `public/assets/` | Imágenes locales |
| `public/config.json` | Configuración pública de la API |
| `angular.json` | Configuración de desarrollo y compilación |
| `tsconfig*.json` | Configuración TypeScript |
| `package.json`, `package-lock.json` | Comandos y dependencias reproducibles |

El contenido público funciona sin API. Inicio de sesión y envío de contacto requieren conectar el backend; instrucciones en [docs/API.md](docs/API.md).
