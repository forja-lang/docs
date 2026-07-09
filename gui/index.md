# 🎨 Forja GUI — Material You Expressive

Librería de componentes UI con diseño **Material Design 3 (Material You)** 
para el lenguaje **Forja** con renderizado nativo vía **Xilem**.

## 📦 Instalación

```forja
# Para usar GUI en tu proyecto Forja:
importar "gui"

# Para ejecutar con GUI nativa:
cargo run --bin forja -- ejecutar --native archivo.fa
# o
cargo run --bin forja-gui -- archivo.fa
```

## 📚 Guías

- [🚀 Empezar](empezar.md) — Tutorial de 5 minutos
- [🎨 Sistema de Tema](tema/index.md) — Colores, tipografía, formas, elevación

## 🧩 Componentes por categoría

| Categoría | Guía | Componentes |
|-----------|------|-------------|
| 🧭 Navegación | [Ver](componentes/navegacion.md) | NavigationBar, TopAppBar, Tabs, Drawer, SearchBar |
| 🔘 Botones | [Ver](componentes/botones.md) | 14 tipos de botón + FAB + Chips |
| ⌨️ Inputs | [Ver](componentes/inputs.md) | TextField, Select, Slider, Switch, Pickers |
| 🃏 Tarjetas | [Ver](componentes/tarjetas.md) | Cards, Lists, DataTables, Surface |
| 💬 Feedback | [Ver](componentes/feedback.md) | Dialogs, Sheets, Snackbar, Menús, Tooltip |
| 📊 Indicadores | [Ver](componentes/indicadores.md) | Progress, Badges, Skeleton, Avatars |
| 📐 Layout | [Ver](componentes/layout.md) | Flex, Grid, Flow, Responsive |
| 📈 Gráficos | [Ver](componentes/graficos.md) | Charts, Sparkline, Gauge, StarRating |
| 🎭 Expressive | [Ver](componentes/expressive.md) | Glassmorphism, Gradientes, Glow |
| 🏃 Motion | [Ver](componentes/motion.md) | Animaciones, Transiciones, Easing |

## 📋 API Completa

- [📖 Referencia de Funciones Forja](referencia.md) — Listado completo de todas las ~180 funciones

## 💡 Ejemplos

| # | Archivo | Descripción |
|---|---------|-------------|
| 301 | [`layout_responsive.fa`](../examples/301_layout_responsive.fa) | Layout Responsive con `adaptable()` |
| 302 | [`botones_material.fa`](../examples/302_botones_material.fa) | 14 tipos de botón Material You |
| 303 | [`inputs_material.fa`](../examples/303_inputs_material.fa) | Todos los inputs Material |
| 304 | [`tarjetas.fa`](../examples/304_tarjetas.fa) | Cards, Lists y DataTables |
| 305 | [`dialogos.fa`](../examples/305_dialogos.fa) | Diálogos y BottomSheets |
| 306 | [`navegacion.fa`](../examples/306_navegacion.fa) | NavigationBar, Tabs, Drawer |
| 307 | [`indicadores.fa`](../examples/307_indicadores.fa) | Progress, Badges, Skeleton |
| 308 | [`graficos.fa`](../examples/308_graficos.fa) | Charts y gráficos |
| 309 | [`expressive.fa`](../examples/309_expressive.fa) | Glassmorphism y gradientes |
| 310 | [`motion.fa`](../examples/310_motion.fa) | Animaciones y transiciones |
| 312 | [`tema_personalizado.fa`](../examples/312_tema_personalizado.fa) | Tema Material You personalizado |
| 402 | [`tareas_cli.fa`](../examples/402_tareas_cli.fa) | App completa con GUI |

## 🖥️ CLI

```bash
# Modo claro (por defecto)
forja-gui ejemplo.fa

# Modo oscuro
forja-gui --dark ejemplo.fa

# Auto-detectar tema del sistema
forja-gui --auto-tema ejemplo.fa

# Tema con color semilla personalizado
forja-gui --tema #FF5722 ejemplo.fa
```

## 🔧 Requisitos

- **Lenguaje**: Forja (compilación a Rust)
- **Runtime**: Xilem 0.4 (framework UI reactivo para Rust)
- **Sistema**: Windows, Linux, macOS
- **Dependencia Rust**: `xilem = "0.4"` (automática al usar `forja-gui`)

> **Nota**: Este paquete solo funciona al transpilar a Rust con cargo. La VM de Forja no renderiza ventanas nativas.
