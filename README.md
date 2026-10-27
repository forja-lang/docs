# Forja Docs

Sitio de documentación del lenguaje de programación **Forja**, construido con [Astro](https://astro.build).

## Desarrollo

```bash
npm install
npm run dev      # Servidor local en http://localhost:4321
npm run build    # Compilación estática en dist/
npm run preview  # Previsualizar build
```

## Estructura

```
src/
├── pages/           # Páginas del sitio
│   ├── sintaxis/    # Documentación del lenguaje
│   ├── gui/         # Documentación de la GUI
│   └── ...
├── components/      # Componentes reutilizables
├── layouts/         # Layouts de página
└── wasm/            # Playground WASM
```

## Pipeline de compilación canónico

El compilador expone **una única ruta canónica de compilación a bytecode**, cuya fuente de verdad
es [`compilar_pipeline_completa()`](../src/lib.rs) (y su variante con imports
`compilar_pipeline_completa_desde()`). Ambos delegan en el núcleo interno
`compilar_pipeline_nucleo()`, por lo que no existe lógica de pipeline duplicada.

- **Ruta de bytecode (canónica):** `compilar_pipeline_completa` → `compilar_pipeline_completa_desde`
  → `compilar_pipeline_nucleo` (Lexer → Parser → TypeChecker → BorrowChecker → Optimizer → Bytecode).
- **Aliases obsoletos (delegan, `#[deprecated]`):** `compilar_con_ir` y `compilar_pipeline`.
- **Ruta de transpilación a Rust (independiente, no genera bytecode):** `transpilar_a_rust`
  (alias obsoleto `compilar`) y `transpilar_a_rust_con_ast` (alias obsoleto `compilar_con_ast`).
- **Estado del IR:** andamiaje diagnóstico; su finalización corresponde a **F4-T8**, no a esta fase.

## Playground WASM

El playground interactivo requiere el binario WASM del compilador, que se genera desde [forja-lang/forja](https://github.com/forja-lang/forja) y se copia a `src/wasm/`. El CI se encarga de descargar el artifact del release más reciente.

## Repositorios relacionados

- [forja-lang/forja](https://github.com/forja-lang/forja) — Núcleo del lenguaje
- [forja-lang/vscode](https://github.com/forja-lang/vscode) — Extensión de VS Code
- [forja-lang/ejemplos](https://github.com/forja-lang/ejemplos) — Ejemplos
- [forja-lang/patches](https://github.com/forja-lang/patches) — Parches a dependencias
