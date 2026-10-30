// Ejecuta los ejemplos reales del playground y de la demo de la landing contra
// el WASM, cada uno en un proceso propio para detectar cuelgues de la VM.
// Uso: node scripts/test-playground-ejemplos.mjs
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (p) => readFileSync(resolve(raiz, p), 'utf8');
const desescapar = (s) =>
  s.replace(/&#123;/g, '{').replace(/&#125;/g, '}').replace(/&quot;/g, '"')
   .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&amp;/g, '&').replace(/\\n/g, '\n');

const casos = [];

// 1) Botones de ejemplo de /playground
const pg = leer('src/pages/playground.astro');
for (const m of pg.matchAll(/<button class="example-btn" data-code='([\s\S]*?)'>([^<]*)<\/button>/g)) {
  casos.push({ origen: 'playground', nombre: m[2].trim(), codigo: desescapar(m[1]) });
}

// 2) Ejemplos y código inicial de DemoForja (landing)
const demo = leer('src/components/DemoForja.astro');
const bloqueEjemplos = demo.slice(demo.indexOf('ejemplos = ['), demo.indexOf('autoEjecutar = false'));
for (const m of bloqueEjemplos.matchAll(/nombre:\s*'([^']*)',\s*codigo:\s*`([\s\S]*?)`/g)) {
  casos.push({ origen: 'demo', nombre: m[1], codigo: m[2] });
}
const inicial = demo.match(/codigoInicial = `([\s\S]*?)`/);
if (inicial) casos.push({ origen: 'demo', nombre: '(inicial)', codigo: inicial[1] });

if (!casos.length) {
  console.error('No se extrajo ningún ejemplo');
  process.exit(2);
}

const hijo = `
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const mod = await import(pathToFileURL(${JSON.stringify(resolve(raiz, 'src/wasm/forja_wasm.js'))}).href);
mod.initSync({ module: readFileSync(${JSON.stringify(resolve(raiz, 'src/wasm/forja_wasm_bg.wasm'))}) });
const codigo = JSON.parse(readFileSync(0, 'utf8'));
try {
  process.stdout.write(JSON.stringify({ ok: true, out: String(mod.forja_ejecutar(codigo) ?? '') }));
} catch (e) {
  process.stdout.write(JSON.stringify({ ok: false, out: e.message }));
}
`;

let fallos = 0;
let omitidos = 0;
const color = !process.env.NO_COLOR && process.stdout.isTTY;
const paint = (code, s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const badge = (texto, fondo) => paint(`1;30;${fondo}`, ` ${texto} `);
const OK = badge('OK', 42);
const ERROR = badge('ERROR', 41);
const CUELGA = badge('CUELGA', 43);
const limpiar = (texto) => String(texto ?? '').replace(/\x1b\[[0-9;]*m/g, '');
for (const c of casos) {
  const etiqueta = `[${c.origen}] ${c.nombre}`;
  // Los builtins de GUI (columna, fila, titulo, boton…) sólo existen en el
  // runtime GUI; el playground los rutea a forja_wasm_gui.
  if (/\b(columna|fila|pila|titulo|boton)\s*\(/.test(c.codigo)) {
    console.log(`${badge('GUI', 46)} ${etiqueta}: requiere el runtime GUI (se prueba en el navegador)`);
    omitidos++;
    continue;
  }
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', hijo], {
    input: JSON.stringify(c.codigo),
    encoding: 'utf8',
    timeout: 10000,
  });
  if (r.error?.code === 'ETIMEDOUT' || r.signal) {
    console.log(`${CUELGA} ${etiqueta}: la VM no respondió en 10 s`);
    fallos++;
    continue;
  }
  let res;
  try { res = JSON.parse(r.stdout); } catch { res = { ok: false, out: (r.stderr || '').slice(0, 200) }; }
  const salida = limpiar(String(res.out ?? ''));
  const pareceError = /error|Error|panick|inválid|inesperad/i.test(salida);
  if (!res.ok || pareceError) {
    console.log(`${ERROR} ${etiqueta}: ${paint('31', salida.replace(/\s+/g, ' ').slice(0, 160))}`);
    fallos++;
  } else {
    console.log(`${OK} ${etiqueta}: ${paint('32', salida.replace(/\s+/g, ' ').slice(0, 80))}`);
  }
}

const ejecutados = casos.length - omitidos;
console.log(
  `\n${fallos ? ERROR : OK} ${ejecutados - fallos}/${ejecutados} ejecutados OK` +
    (omitidos ? `, ${omitidos} omitido(s) (runtime GUI)` : '')
);
process.exit(fallos ? 1 : 0);
