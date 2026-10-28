// Convierte únicamente la estructura de las respuestas PHP guardadas. No reescribe textos.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const appRoot = fileURLToPath(new URL('../../angular-portal/', import.meta.url));
const sourceRoot = fileURLToPath(new URL('../contenido-recuperado/', import.meta.url));
const { JSDOM } = createRequire(join(appRoot, 'package.json'))('jsdom');
const sections = ['acerca', 'politicas', 'politicas-gift', 'politicas-plus', 'politicas-corporativa', 'condiciones', 'establecimientos', 'contacto', 'cuenta'];
const content = {};
const assets = new Set();
const audit = [];
const baseline = { sections: [], forms: [] };
const normalize = value => value.replace(/\s+/g, ' ').trim();
const selectors = ['p', 'ol li', 'ul:not(.nav-tabs) > li', '.h1', '.h2', 'h5'];
for (const section of sections) {
  const source = readFileSync(join(sourceRoot, `${section}.html`), 'utf8');
  const document = new JSDOM(source).window.document;
  baseline.sections.push({
    section,
    texts: Object.fromEntries(selectors.map(selector => [selector, [...document.querySelectorAll(selector)].map(node => normalize(node.textContent))])),
    images: [...document.querySelectorAll('img[src]')].map(image => `assets/${image.getAttribute('src')}`)
  });
  if (['contacto', 'cuenta'].includes(section)) {
    const formId = section === 'contacto' ? 'fcarga' : 'formdata';
    baseline.forms.push({ section, formId, fields: [...document.querySelectorAll(`#${formId} input[name], #${formId} textarea[name]`)].map(node => ({
      name: node.getAttribute('name'), maxlength: node.getAttribute('maxlength'), placeholder: node.getAttribute('placeholder'),
      value: node.getAttribute('type') === 'hidden' ? node.getAttribute('value') : null
    })) });
  }
  document.querySelectorAll('script, .nav-tabs').forEach(node => node.remove());
  const walker = document.createTreeWalker(document.body, 128);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach(node => node.remove());
  for (const node of document.querySelectorAll('*')) {
    for (const attribute of [...node.attributes]) {
      if (attribute.name.startsWith('on') || attribute.name === 'style') node.removeAttribute(attribute.name);
    }
  }
  for (const image of document.querySelectorAll('img[src]')) {
    const src = image.getAttribute('src');
    if (src?.startsWith('img/')) {
      assets.add(src);
      image.setAttribute('src', `assets/${src}`);
    }
    if (!image.hasAttribute('alt')) image.setAttribute('alt', '');
  }
  for (const link of document.querySelectorAll('a[href]')) {
    if (link.getAttribute('href').startsWith('www.')) link.setAttribute('href', `http://${link.getAttribute('href')}`);
    if (link.getAttribute('target') === '_blank') link.setAttribute('rel', 'noopener noreferrer');
  }
  content[section] = document.body.innerHTML;
  audit.push({ section, sha256: createHash('sha256').update(source).digest('hex'), source: `${section}.html` });
}
writeFileSync(join(appRoot, 'src/portal/original-content.ts'), `// Contenido público del portal original, conservado para la aplicación Angular.\nexport const ORIGINAL_CONTENT: Record<string, string> = ${JSON.stringify(content, null, 2)};\n`);
writeFileSync(join(appRoot, 'tools/content-baseline.json'), JSON.stringify(baseline, null, 2));
writeFileSync(join(sourceRoot, 'assets.json'), JSON.stringify([...assets], null, 2));
writeFileSync(join(sourceRoot, 'manifest.json'), JSON.stringify(audit, null, 2));
console.log(`Preparadas ${sections.length} respuestas originales; ${assets.size} imágenes referenciadas.`);
