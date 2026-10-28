// Revisión del build real con Chrome/Edge local, sin dependencias de automatización.
import { createServer } from 'node:http';
import { existsSync, readFileSync, mkdirSync, mkdtempSync, writeFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const root = resolve('dist/portal/browser');
const prefix = '/';
const entry = '/';
const output = resolve('.browser-qa');
mkdirSync(output, { recursive: true });
const executable = process.env['PORTAL_BROWSER'] || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find(existsSync);
if (!executable) throw new Error('Configura PORTAL_BROWSER con la ruta a Chrome o Edge.');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.otf': 'font/otf' };
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
  let file = resolve(root, pathname.slice(prefix.length) || 'index.html');
  if (!file.startsWith(root + sep) || !existsSync(file)) { response.writeHead(404).end(); return; }
  if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
  if (!existsSync(file)) { response.writeHead(404).end(); return; }
  response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
  response.end(readFileSync(file));
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const profile = mkdtempSync(resolve(output, 'profile-'));
const browser = spawn(executable, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'
], { windowsHide: true, stdio: 'ignore' });
const pause = ms => new Promise(done => setTimeout(done, ms));
async function until(get, message) {
  const start = Date.now();
  while (Date.now() - start < 20000) {
    const result = await get();
    if (result) return result;
    await pause(100);
  }
  throw new Error(message);
}
let socket;
try {
  const portFile = resolve(profile, 'DevToolsActivePort');
  await until(() => existsSync(portFile), 'Chrome no inició el puerto de depuración.');
  const port = readFileSync(portFile, 'utf8').split('\n')[0];
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const tab = tabs.find(item => item.type === 'page');
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((done, reject) => { socket.onopen = done; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const errors = [];
  const failedRequests = [];
  socket.onmessage = event => {
    const result = JSON.parse(event.data);
    if (result.id) {
      const promise = pending.get(result.id);
      pending.delete(result.id);
      if (result.error) promise.reject(new Error(result.error.message));
      else promise.resolve(result.result);
    }
    if (result.method === 'Runtime.exceptionThrown') errors.push(result.params.exceptionDetails.text);
    if (result.method === 'Network.responseReceived' && result.params.response.status >= 400) failedRequests.push(result.params.response.url);
  };
  const command = (method, params = {}) => new Promise((resolveCommand, reject) => {
    const key = ++id;
    pending.set(key, { resolve: resolveCommand, reject });
    socket.send(JSON.stringify({ id: key, method, params }));
  });
  const evaluate = async expression => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const screenshot = async name => {
    await evaluate('document.fonts.ready.then(() => true)');
    await pause(250); // Esperar a que termine la transición de color del tema.
    const result = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    writeFileSync(resolve(output, name), Buffer.from(result.data, 'base64'));
  };
  await command('Runtime.enable'); await command('Network.enable'); await command('Page.enable');
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: `http://127.0.0.1:${server.address().port}${entry}` });
  await until(() => evaluate('!!document.querySelector(".carousel")'), 'No se cargó Inicio.');
  await until(() => evaluate('[...document.images].every(img => img.complete && img.naturalWidth > 0)'), 'No se cargaron las imágenes.');
  // Sin modificar estado interno: usar controles de la interfaz.
  if (await evaluate('document.querySelector(".theme-toggle").getAttribute("aria-pressed") === "true"')) await evaluate('document.querySelector(".theme-toggle").click()');
  assert.equal(await evaluate('getComputedStyle(document.body).backgroundColor'), 'rgb(247, 246, 243)');
  await screenshot('desktop-claro.png');
  await evaluate('document.querySelector(".theme-toggle").click()');
  assert.equal(await evaluate('document.documentElement.dataset.theme'), 'dark');
  assert.equal(await evaluate('getComputedStyle(document.body).backgroundColor'), 'rgb(23, 26, 31)');
  await screenshot('desktop-oscuro.png');
  await evaluate('document.querySelector(".next").click()');
  await until(() => evaluate('document.querySelector(".slide-caption h2").textContent.includes("Marco Aldany")'), 'El carrusel no avanzó.');
  await evaluate('document.querySelector(".previous").click()');
  await until(() => evaluate('document.querySelector(".slide-caption h2").textContent.includes("Café Honoré")'), 'El carrusel no retrocedió.');
  assert.equal(await evaluate('document.querySelector(".play-toggle").getAttribute("aria-pressed")'), 'false', 'Debe iniciar pausado con movimiento reducido.');
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await evaluate('document.querySelector(".play-toggle").click()');
  await until(() => evaluate('!document.querySelector(".slide-caption h2").textContent.includes("Café Honoré")'), 'No avanzó automáticamente.');
  await evaluate('document.querySelector(".play-toggle").click()');
  const pausedSlide = await evaluate('document.querySelector(".slide-caption h2").textContent');
  await pause(5500);
  assert.equal(await evaluate('document.querySelector(".slide-caption h2").textContent'), pausedSlide, 'La pausa debe detener el carrusel.');
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const route of ['acerca', 'politicas', 'condiciones', 'establecimientos', 'cuenta', 'contacto']) {
    await evaluate(`document.querySelector('.nav-links a[href="#/${route}"]').click()`);
    await until(() => evaluate(`location.hash === '#/${route}' && !!document.querySelector('.page-heading')`), `No abrió ${route}.`);
    if (['cuenta', 'contacto'].includes(route)) assert.equal(await evaluate('document.querySelector("form button").matches(":disabled")'), true);
    if (route === 'acerca') {
      await until(() => evaluate('document.querySelector(".original-content").textContent.includes("23 años de experiencia")'), 'Falta la descripción original de Café Honoré.');
      assert.equal(await evaluate('document.querySelector(".original-content").textContent.includes("Somos un Salón de Belleza en Tegucigalpa")'), true);
      assert.equal(await evaluate('document.querySelector(".original-content").textContent.includes("Flores y Canastas Honoré ofrece arreglos florales")'), true);
      await screenshot('acerca-original.png');
    }
    if (route === 'politicas') {
      for (const index of [1, 2, 0]) {
        await evaluate(`document.querySelectorAll('.policy-tabs button')[${index}].click()`);
        const phrase = ['Monto mínimo de carga será de L.500.00', 'El cliente acumula un punto por cada dólar consumido', 'L.35,000.00'][index];
        await until(() => evaluate(`document.querySelector('.original-content').textContent.includes(${JSON.stringify(phrase)})`), 'Falta una pestaña de políticas original.');
      }
    }
    if (route === 'establecimientos') assert.equal(await evaluate('document.querySelector(".original-content").textContent.includes("Colonia Palmira, Avenida Republica de Argentina")'), true);
    if (route === 'contacto') {
      assert.equal(await evaluate('document.querySelectorAll("form input:not([type=button]), form textarea").length'), 6);
      assert.equal(await evaluate('document.querySelector(".original-contact-details").textContent.includes("2239-7568/69")'), true);
    }
    await until(() => evaluate('[...document.images].every(img => img.complete && img.naturalWidth > 0)'), `Falta una imagen original en ${route}.`);
  }
  await evaluate(`document.querySelector('.nav-links a[href="#/inicio"]').click()`);
  await until(() => evaluate('!!document.querySelector(".carousel")'), 'No regresó a Inicio.');
  await command('Page.reload');
  await until(() => evaluate('!!document.querySelector(".theme-toggle")'), 'No recargó el portal.');
  assert.equal(await evaluate('document.documentElement.dataset.theme'), 'dark');
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('document.querySelector(".theme-toggle").click()');
  await screenshot('movil-claro.png');
  assert.equal(await evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth'), true, 'La página desborda horizontalmente.');
  for (const width of [320, 600, 790]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true });
    assert.equal(await evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth'), true, `Desbordamiento horizontal a ${width}px.`);
  }
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('document.querySelector(".theme-toggle").click()');
  await screenshot('movil-oscuro.png');
  await evaluate('document.querySelector(".theme-toggle").click()');
  await evaluate('document.querySelector(".menu-toggle").click()');
  await until(() => evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded") === "true"'), 'No abrió el menú móvil.');
  await evaluate(`document.querySelector('.nav-links a[href="#/cuenta"]').click()`);
  await until(() => evaluate('!!document.querySelector("input[autocomplete=username]")'), 'No abrió Mi Cuenta en móvil.');
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false');
  await screenshot('movil-cuenta.png');
  assert.deepEqual(errors, [], 'Errores de JavaScript');
  assert.deepEqual(failedRequests, [], 'Recursos con errores HTTP');
  console.log('OK: 7 rutas, imágenes, carrusel automático y pausa, movimiento reducido, tema persistente, formularios sin API, menú móvil y ausencia de errores JavaScript/HTTP.');
  console.log(`Capturas: ${output}`);
} finally {
  socket?.close();
  browser.kill();
  server.close();
}
