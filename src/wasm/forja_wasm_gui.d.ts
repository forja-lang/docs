/* tslint:disable */
/* eslint-disable */

/**
 * Ejecuta código Forja en modo GUI y lo renderiza.
 * Atajo para renderizar + eventos.
 */
export function ejecutar_gui(canvas_id: string, codigo: string): string;

/**
 * Renderiza un layout Forja en un canvas.
 * Compila el código, extrae el layout y lo dibuja en el canvas.
 * Retorna "ok" en éxito o un mensaje de error.
 */
export function renderizar(canvas_id: string, codigo: string): string;

/**
 * Fuerza un re-renderizado del último layout (útil después de eventos)
 */
export function rerenderizar(canvas_id: string): string;

/**
 * Retorna la versión del crate
 */
export function version(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly ejecutar_gui: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly rerenderizar: (a: number, b: number, c: number) => void;
    readonly version: (a: number) => void;
    readonly renderizar: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly __wasm_bindgen_func_elem_88: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export5: (a: number, b: number, c: number) => void;
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
