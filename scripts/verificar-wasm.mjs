// Verifica que los módulos WASM del playground (core + GUI) inicialicen.
// Se ejecuta en CI antes del build para evitar desplegar una pareja
// glue/wasm incompatible (por ejemplo, por un cambio de wasm-bindgen).
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function verificar(nombre, archivoJs, archivoWasm) {
  const modulo = await import(pathToFileURL(resolve(raiz, 'src/wasm', archivoJs)).href);
  if (typeof modulo.initSync !== 'function') {
    throw new Error(`${archivoJs} no exporta initSync`);
  }
  modulo.initSync({ module: readFileSync(resolve(raiz, 'src/wasm', archivoWasm)) });
  const version = typeof modulo.version === 'function' ? modulo.version() : 'sin versión';
  console.log(`✅ ${nombre}: ${version}`);
}

try {
  await verificar('core', 'forja_wasm.js', 'forja_wasm_bg.wasm');
  await verificar('GUI', 'forja_wasm_gui.js', 'forja_wasm_gui_bg.wasm');
} catch (error) {
  console.error(`❌ WASM inválido: ${error.message}`);
  process.exit(1);
}
