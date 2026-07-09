# Forja Docs

Sitio de documentación del lenguaje de programación **Forja**, construido con [Astro](https://astro.build).

## Desarrollo

```bash
npm install
npm run dev      # Servidor local en http://localhost:4321
npm run build    # Build estático en dist/
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

## Playground WASM

El playground interactivo requiere el binario WASM del compilador, que se genera desde [forja-lang/forja](https://github.com/forja-lang/forja) y se copia a `src/wasm/`. El CI se encarga de descargar el artifact del release más reciente.

## Repositorios relacionados

- [forja-lang/forja](https://github.com/forja-lang/forja) — Núcleo del lenguaje
- [forja-lang/vscode](https://github.com/forja-lang/vscode) — Extensión de VS Code
- [forja-lang/examples](https://github.com/forja-lang/examples) — Ejemplos
- [forja-lang/patches](https://github.com/forja-lang/patches) — Parches a dependencias
