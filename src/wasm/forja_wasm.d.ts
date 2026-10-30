/* tslint:disable */
/* eslint-disable */

/**
 * Codificar código para compartir via URL (percent-encoding)
 */
export function codificar_url(codigo: string): string;

/**
 * Transpila código Forja a Rust (transpilación; la API WASM conserva el
 * nombre `compilar` por compatibilidad con el JS existente).
 */
export function compilar(codigo: string): string;

/**
 * Decodificar código desde URL (percent-encoding)
 */
export function decodificar_url(codigo_encoded: string): string;

/**
 * Compila y ejecuta código Forja en la VM, devolviendo el output.
 * El navegador no interpreta ANSI: los errores se devuelven sin color.
 */
export function forja_ejecutar(source: string): string;

/**
 * Tokeniza código Forja y devuelve los tokens como JSON
 */
export function forja_tokenizar(source: string): string;

/**
 * Obtener ejemplos disponibles como JSON
 */
export function obtener_ejemplos(): string;

/**
 * Obtener versión de Forja
 */
export function version(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly codificar_url: (a: number, b: number) => [number, number];
    readonly compilar: (a: number, b: number) => [number, number];
    readonly decodificar_url: (a: number, b: number) => [number, number];
    readonly forja_ejecutar: (a: number, b: number) => [number, number, number, number];
    readonly forja_tokenizar: (a: number, b: number) => [number, number, number, number];
    readonly obtener_ejemplos: () => [number, number];
    readonly version: () => [number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
