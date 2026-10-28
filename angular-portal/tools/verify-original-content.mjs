import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const generated = readFileSync('src/portal/original-content.ts', 'utf8');
const content = JSON.parse(generated.slice(generated.indexOf('= ') + 2).trim().replace(/;$/, ''));
const baseline = JSON.parse(readFileSync('tools/content-baseline.json', 'utf8'));
const normalize = value => value.replace(/\s+/g, ' ').trim();
for (const entry of baseline.sections) {
  const migrated = new JSDOM(content[entry.section]).window.document;
  for (const selector of ['p', 'ol li', 'ul:not(.nav-tabs) > li', '.h1', '.h2', 'h5']) {
    const before = entry.texts[selector];
    const after = [...migrated.querySelectorAll(selector)].map(node => normalize(node.textContent));
    assert.deepEqual(after, before, `Texto diferente en ${entry.section}: ${selector}`);
  }
  const beforeImages = entry.images;
  const afterImages = [...migrated.querySelectorAll('img[src]')].map(image => image.getAttribute('src'));
  assert.deepEqual(afterImages, beforeImages, `Imágenes diferentes en ${entry.section}.`);
  for (const asset of afterImages) assert.ok(existsSync(`public/${asset}`), `Falta la imagen ${asset}.`);
  assert.equal(migrated.querySelectorAll('script, [onclick]').length, 0);
}
const template = new JSDOM(readFileSync('src/portal/page.component.html', 'utf8')).window.document;
for (const { section, formId, fields } of baseline.forms) {
  const signature = document => [...document.querySelectorAll(`#${formId} input[name], #${formId} textarea[name]`)].map(node => ({
    name: node.getAttribute('name'), maxlength: node.getAttribute('maxlength'), placeholder: node.getAttribute('placeholder'),
    value: node.getAttribute('type') === 'hidden' ? node.getAttribute('value') : null
  }));
  assert.deepEqual(signature(template), fields, `Cambió un campo original de ${section}.`);
}
console.log(`OK: ${baseline.sections.length} secciones conservan textos, listas, títulos e imágenes; formularios conservan campos y límites; recursos disponibles.`);
