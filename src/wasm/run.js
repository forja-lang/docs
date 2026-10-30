// Carga compartida del módulo WASM de Forja para los bloques de ejemplo.
// La primera llamada descarga e inicializa la VM; las siguientes la reutilizan.
let wasm = null;
let cargando = null;

export function cargarForjaWasm() {
  if (cargando) return cargando;
  cargando = (async () => {
    try {
      // @ts-ignore: glue generado por wasm-bindgen, sin tipos en el repo
      wasm = await import("./forja_wasm.js");
      await wasm.default();
      try {
        wasm.forja_ejecutar('escribir("")'); // calentar la VM (~40 ms la primera vez)
      } catch {
        /* el error real aparece al ejecutar */
      }
    } catch (e) {
      wasm = null;
      throw e;
    }
  })();
  return cargando;
}

export async function ejecutarForja(codigo) {
  await cargarForjaWasm();
  if (!wasm || typeof wasm.forja_ejecutar !== "function") {
    throw new Error("La VM WASM no está disponible.");
  }
  const inicio = performance.now();
  const salida = wasm.forja_ejecutar(codigo);
  return { salida: String(salida ?? ""), ms: +(performance.now() - inicio).toFixed(2) };
}
