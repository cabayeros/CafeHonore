# Café Honoré

- `angular-portal/`: aplicación actual en Angular 22 y Node 24, con sus imágenes, estilos, lógica y configuración.
- `original/sitio/`: portal histórico, incluido su `index.html`, estilos, JavaScript e imágenes.
- `original/contenido-recuperado/`: respuestas públicas PHP conservadas sin editar.
- `original/herramientas/`: herramienta de migración del contenido; no se necesita para ejecutar Angular.
- `referencias/nexora/`: plantilla de referencia independiente.

## Ejecutar la aplicación actual

Desde la terminal de VS Code, situada en la raíz del espacio de trabajo:

```powershell
cd ".\DEBITO\LEALTAD\HN_Cafehonore\angular-portal"
nvm use 24.22.1
npm.cmd ci
npm.cmd start
```

Abrir `http://127.0.0.1:4200`. Más comandos en [angular-portal/README.md](angular-portal/README.md).
