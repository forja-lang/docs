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
  // Inicializar no alcanza: un wasm con el compilador roto (o con el glue
  // desincronizado) puede instanciar igual. El core tiene que poder ejecutar.
  if (nombre === 'core') {
    if (typeof modulo.forja_ejecutar !== 'function') {
      throw new Error('forja_wasm.js no exporta forja_ejecutar');
    }
    const programa = 'funcion main() { escribir("ok") }\nmain()\n';
    const salida = modulo.forja_ejecutar(programa);
    if (!String(salida).includes('ok')) {
      throw new Error(`forja_ejecutar no ejecuta: ${JSON.stringify(salida)}`);
    }
  }
  console.log(`✅ ${nombre}: ${version}`);
}

try {
  await verificar('core', 'forja_wasm.js', 'forja_wasm_bg.wasm');
  await verificar('GUI', 'forja_wasm_gui.js', 'forja_wasm_gui_bg.wasm');
} catch (error) {
  console.error(`❌ WASM inválido: ${error.message}`);
  process.exit(1);
}
