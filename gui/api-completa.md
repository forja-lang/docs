# 📚 API Completa del Crate `forja-gui-rt`

## Visión General

El crate [`forja-gui-rt`](crates/forja-gui-rt/src/lib.rs:1) es el **runtime GUI** del lenguaje Forja. Su propósito es **pre-compilar Xilem 0.4** para que las aplicaciones GUI de Forja compilen en segundos en lugar de minutos. Este crate se compila **UNA SOLA VEZ**; las apps generadas solo enlazan contra él.

### Dependencias principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| [`xilem`](https://crates.io/crates/xilem) | 0.4 | Framework UI reactivo (Masonry + Vello + Winit) |
| [`masonry`](https://crates.io/crates/masonry) | 0.4 | Widget toolkit (fork de Druid) |
| [`vello`](https://crates.io/crates/vello) | 0.4 | Renderizador GPU (compute shaders) |
| [`winit`](https://crates.io/crates/winit) | 0.30+ | Creación de ventanas nativas |
| [`kurbo`](https://crates.io/crates/kurbo) | 0.11 | Geometría 2D (Point, Size, Rect) |
| [`accesskit`](https://crates.io/crates/accesskit) | 0.14 | Accesibilidad |

### Arquitectura

```
forja-gui-rt
├── lib.rs          → Re-exportaciones de Xilem, theme e icons
├── theme/          → Sistema de tema Material You completo
│   ├── mod.rs      → MaterialTheme (tema principal)
│   ├── color.rs    → RgbColor, nombre_a_color, blend_colors
│   ├── palette.rs  → TonalPalette, Palettes (algoritmo Monet)
│   ├── scheme.rs   → ColorScheme (27 color roles)
│   ├── typography.rs → TypeScale (15 estilos tipográficos)
│   ├── shape.rs    → ShapeSystem (7 niveles de forma)
│   ├── elevation.rs → ElevationSystem (6 niveles de sombra)
│   ├── state.rs    → StateLayer (opacidades de estado)
│   ├── motion.rs   → MotionSystem (easing curves y duraciones)
│   ├── dynamic_color.rs → Hct (espacio de color HCT)
│   ├── system_theme.rs → SystemTheme (detección SO)
│   └── animation.rs → AnimationEngine, AnimatedValue, SpringAnimation
└── icons.rs        → 102 iconos Material Design vectoriales
```

### Instalación y Uso

```toml
[dependencies]
forja-gui-rt = { path = "../crates/forja-gui-rt" }
```

```rust
use forja_gui_rt::*;
```

---

# 1. SISTEMA DE TEMA (`theme`)

## 1.1 MaterialTheme

### Struct: `MaterialTheme`

**Archivo:** [`crates/forja-gui-rt/src/theme/mod.rs`](crates/forja-gui-rt/src/theme/mod.rs:33)

El tema principal de la aplicación. Contiene esquema de colores, tipografía, formas, elevación y motion. Implementa `Clone`, `Debug`, `Default` y `Display`.

#### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `scheme` | [`ColorScheme`](#15-colorscheme) | Los 27 color roles de Material You |
| `typography` | [`TypeScale`](#16-typescale) | 15 estilos tipográficos |
| `shapes` | [`ShapeSystem`](#17-shapesystem) | 7 niveles de forma (border-radius) |
| `elevation` | [`ElevationSystem`](#18-elevationsystem) | 6 niveles de elevación (sombras) |
| `motion` | [`MotionSystem`](#110-motionsystem) | Curvas easing y duraciones |
| `is_dark` | `bool` | `true` si es modo oscuro, `false` si es modo claro |
| `seed_color` | `String` | Color semilla en hex (`"#RRGGBB"`) usado para generar el tema |

#### Métodos

```rust
impl MaterialTheme {
    /// Crea un tema desde un color semilla (hex o nombre)
    ///
    /// # Argumentos
    /// - `seed_color`: color semilla en formato hex (#RRGGBB) o nombre en español/inglés
    /// - `is_dark`: `true` para modo oscuro, `false` para modo claro
    ///
    /// ### Algoritmo
    /// 1. Parsea el color semilla (nombre → RgbColor, hex → RgbColor, fallback a #6750A4)
    /// 2. Genera las 5 paletas tonales usando el algoritmo Monet simplificado
    /// 3. Crea el esquema de color (light/dark) desde las paletas
    pub fn from_seed(seed_color: &str, is_dark: bool) -> Self
    //     seed_color: "rojo", "azul", "verde", o "#FF5722", "#6750A4"
    //     is_dark: true = dark mode, false = light mode

    /// Crea un tema claro por defecto (seed: #6750A4 — púrpura Material)
    pub fn light() -> Self

    /// Crea un tema oscuro por defecto (seed: #6750A4 — púrpura Material)
    pub fn dark() -> Self

    /// Crea un tema dinámico que detecta automáticamente claro/oscuro
    /// NOTA: Por defecto usa modo claro; en el futuro detectará winit::window::Theme
    pub fn dynamic(seed_color: &str) -> Self

    /// Crea un tema que sigue la preferencia del sistema operativo
    ///
    /// Detecta automáticamente si el sistema está en modo oscuro:
    /// - Windows: registro (reg.exe, AppsUseLightTheme)
    /// - Linux: gsettings (org.gnome.desktop.interface color-scheme)
    /// - macOS: defaults read -g AppleInterfaceStyle
    /// Si no se puede detectar, fallback a modo claro.
    pub fn system(seed_color: &str) -> Self

    /// Cambia entre modo claro y oscuro manteniendo el color semilla
    pub fn toggle_dark_mode(&self) -> Self

    /// Crea un tema con un nuevo color semilla, manteniendo el modo (claro/oscuro)
    pub fn with_seed(&self, seed_color: &str) -> Self
}
```

#### Trait implementations

```rust
impl Default for MaterialTheme {
    /// Por defecto: tema claro con seed #6750A4
    fn default() -> Self { MaterialTheme::light() }
}

impl std::fmt::Display for MaterialTheme {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "MaterialTheme(seed={}, dark={})", self.seed_color, self.is_dark)
    }
}
```

#### Ejemplo de uso (Rust)

```rust
use forja_gui_rt::MaterialTheme;

// Tema claro por defecto (seed: #6750A4)
let theme = MaterialTheme::light();
assert!(!theme.is_dark);
assert_eq!(theme.seed_color, "#6750A4");

// Tema oscuro personalizado con hex
let theme = MaterialTheme::from_seed("#FF5722", true);
assert!(theme.is_dark);
assert_eq!(theme.seed_color, "#FF5722");

// Tema con nombre de color en español
let theme = MaterialTheme::from_seed("rojo", false);
assert_eq!(theme.seed_color, "#F44336");

// Auto-detectar sistema
let theme = MaterialTheme::system("#6750A4");

// System (detecta SO)
let theme = MaterialTheme::system("#4CAF50");

// Cambiar modo
let dark = theme.toggle_dark_mode();
assert!(dark.is_dark);

// Cambiar seed manteniendo modo
let nuevo = theme.with_seed("#2196F3");
assert_eq!(nuevo.seed_color, "#2196F3");

// Display
println!("{}", theme); // "MaterialTheme(seed=#6750A4, dark=false)"
```

#### Ejemplo de uso (Forja)

```forja
importar "gui"

funcion main() {
    # El tema se configura via CLI:
    # forja-gui --tema #FF5722 ejemplo.fa    (color semilla)
    # forja-gui --dark ejemplo.fa             (modo oscuro)
    # forja-gui --auto-tema ejemplo.fa        (detectar SO)
    # forja-gui --tema verde --dark ejemplo.fa
    
    # O en código con el proveedor de tema:
    tema_material("#6750A4", 
        columna(
            texto_grande("Mi App"),
            boton_relleno("Click", &accion)
        )
    )
}
```

---

## 1.2 RgbColor

### Struct: `RgbColor(u8, u8, u8)`

**Archivo:** [`crates/forja-gui-rt/src/theme/color.rs`](crates/forja-gui-rt/src/theme/color.rs:8)

Color RGB con componentes de 8 bits (0-255 por canal). Implementa `Clone`, `Copy`, `Debug`, `PartialEq`, `Display`.

#### Campos (tupla)

| Posición | Nombre | Rango | Descripción |
|----------|--------|-------|-------------|
| `0` | r (rojo) | 0-255 | Canal rojo |
| `1` | g (verde) | 0-255 | Canal verde |
| `2` | b (azul) | 0-255 | Canal azul |

#### Métodos

```rust
impl RgbColor {
    /// Crea un nuevo RgbColor con valores RGB directos
    pub const fn new(r: u8, g: u8, b: u8) -> Self

    /// Convierte a formato hexadecimal #RRGGBB (mayúsculas)
    /// Ejemplo: RgbColor(103, 80, 164) → "#6750A4"
    pub fn to_hex(&self) -> String

    /// Parsea un color desde string hexadecimal (#RRGGBB o RRGGBB)
    /// Retorna None si el formato es inválido
    pub fn from_hex(hex: &str) -> Option<Self>

    /// Convierte a espacio de color HCT (Hue, Chroma, Tone)
    pub fn to_hct(&self) -> Hct

    /// Crea un RgbColor desde valores HCT
    pub fn from_hct(hue: f64, chroma: f64, tone: f64) -> Self

    /// Componente rojo como f64 (0.0 - 1.0)
    pub fn r_f64(&self) -> f64

    /// Componente verde como f64 (0.0 - 1.0)
    pub fn g_f64(&self) -> f64

    /// Componente azul como f64 (0.0 - 1.0)
    pub fn b_f64(&self) -> f64

    /// Mezcla dos colores con proporción t
    /// t=0.0 → solo self, t=1.0 → solo other
    /// t se clamp automáticamente a [0.0, 1.0]
    pub fn blend(&self, other: &RgbColor, t: f64) -> RgbColor

    /// Convierte a tupla (R, G, B)
    pub fn to_tuple(&self) -> (u8, u8, u8)

    /// Crea un Color (xilem::Color) con el nivel de transparencia especificado
    /// alpha: 0.0 (transparente) a 1.0 (opaco)
    pub fn with_alpha(&self, alpha: f64) -> xilem::Color
}
```

#### Trait implementations

```rust
// Convierte RgbColor a xilem::Color (pérdida de información = conversión exacta)
impl From<RgbColor> for xilem::Color {
    fn from(c: RgbColor) -> Self { xilem::Color::from_rgb8(c.0, c.1, c.2) }
}

// Parsea desde string: primero intenta nombre, luego hex
// "rojo" → RgbColor(244, 67, 54)
// "#FF5722" → RgbColor(255, 87, 34)
// Fallback a negro (0,0,0)
impl From<&str> for RgbColor

// Desde tupla (r, g, b)
impl From<(u8, u8, u8)> for RgbColor
```

#### Constantes predefinidas

| Constante | Valor | Hex | Nombre español |
|-----------|-------|-----|----------------|
| [`RgbColor::new(r,g,b)`](crates/forja-gui-rt/src/theme/color.rs:12) | constructor | - | - |
| `ROJO` | `(244, 67, 54)` | `#F44336` | `"rojo"` |
| `AZUL` | `(33, 150, 243)` | `#2196F3` | `"azul"` |
| `VERDE` | `(76, 175, 80)` | `#4CAF50` | `"verde"` |
| `BLANCO` | `(255, 255, 255)` | `#FFFFFF` | `"blanco"` |
| `NEGRO` | `(0, 0, 0)` | `#000000` | `"negro"` |
| `GRIS` | `(158, 158, 158)` | `#9E9E9E` | `"gris"` |
| `NARANJA` | `(255, 152, 0)` | `#FF9800` | `"naranja"`, `"anaranjado"` |
| `MORADO` | `(156, 39, 176)` | `#9C27B0` | `"morado"`, `"purpura"`, `"púrpura"`, `"violeta"` |
| `AMARILLO` | `(255, 235, 59)` | `#FFEB3B` | `"amarillo"` |
| `CIAN` | `(0, 188, 212)` | `#00BCD4` | `"cian"`, `"ciano"`, `"turquesa"` |
| `ROSA` | `(233, 30, 99)` | `#E91E63` | `"rosa"`, `"rosado"` |
| `AZUL_MARINO` | `(25, 25, 112)` | `#191970` | `"azul marino"`, `"azul_marino"`, `"marino"` |
| `PLATEADO` | `(192, 192, 192)` | `#C0C0C0` | `"plateado"`, `"plata"` |
| `MARRON` | `(121, 85, 72)` | `#795548` | `"marron"`, `"marrón"`, `"cafe"`, `"café"` |
| `SEED_DEFAULT` | `"#6750A4"` | `#6750A4` | Color semilla por defecto (púrpura) |

### Función: `nombre_a_color`

**Archivo:** [`crates/forja-gui-rt/src/theme/color.rs`](crates/forja-gui-rt/src/theme/color.rs:132)

```rust
/// Convierte un nombre de color en español/inglés a RgbColor
/// Retorna None si el nombre no es reconocido
pub fn nombre_a_color(nombre: &str) -> Option<RgbColor>
```

Nombres soportados:
| Nombre input | Color resultante |
|---|---|
| `"rojo"` | `ROJO` (#F44336) |
| `"azul"` | `AZUL` (#2196F3) |
| `"verde"` | `VERDE` (#4CAF50) |
| `"blanco"` | `BLANCO` (#FFFFFF) |
| `"negro"` | `NEGRO` (#000000) |
| `"gris"` | `GRIS` (#9E9E9E) |
| `"naranja"`, `"anaranjado"` | `NARANJA` (#FF9800) |
| `"morado"`, `"purpura"`, `"púrpura"`, `"violeta"` | `MORADO` (#9C27B0) |
| `"amarillo"` | `AMARILLO` (#FFEB3B) |
| `"cian"`, `"ciano"`, `"turquesa"` | `CIAN` (#00BCD4) |
| `"rosa"`, `"rosado"` | `ROSA` (#E91E63) |
| `"azul marino"`, `"azul_marino"`, `"marino"` | `AZUL_MARINO` (#191970) |
| `"plateado"`, `"plata"` | `PLATEADO` (#C0C0C0) |
| `"marron"`, `"marrón"`, `"cafe"`, `"café"` | `MARRON` (#795548) |

### Función: `blend_colors`

**Archivo:** [`crates/forja-gui-rt/src/theme/color.rs`](crates/forja-gui-rt/src/theme/color.rs:153)

```rust
/// Mezcla dos colores con proporción t (0.0 = solo a, 1.0 = solo b)
pub fn blend_colors(a: RgbColor, b: RgbColor, t: f64) -> RgbColor
```

#### Ejemplo completo

```rust
use forja_gui_rt::{RgbColor, nombre_a_color, blend_colors};

// Desde hex
let primary = RgbColor::from_hex("#6750A4").unwrap();
assert_eq!(primary, RgbColor(103, 80, 164));

// Desde nombre
let azul = nombre_a_color("azul").unwrap();
assert_eq!(azul, RgbColor(33, 150, 243));

// Desde tupla
let color: RgbColor = (255, 0, 0).into();
assert_eq!(color, RgbColor(255, 0, 0));

// Desde string (nombre o hex)
let rojo: RgbColor = "rojo".into();
let hex: RgbColor = "#FF5722".into();

// A Xilem
let xilem_color: xilem::Color = primary.into();

// Con transparencia
let semi = primary.with_alpha(0.5);

// Mezcla
let mezcla = RgbColor::RED.blend(&RgbColor::BLUE, 0.5);
// ≈ RgbColor(127, 0, 127) - púrpura

// Blend function
let mezcla2 = blend_colors(RgbColor::RED, RgbColor::BLUE, 0.5);

// To hex
assert_eq!(RgbColor(103, 80, 164).to_hex(), "#6750A4");

// To tuple
assert_eq!(RgbColor(255, 0, 0).to_tuple(), (255, 0, 0));

// From HCT
let hct_color = RgbColor::from_hct(270.0, 36.0, 50.0);
```

---

## 1.3 TonalPalette

### Struct: `TonalPalette`

**Archivo:** [`crates/forja-gui-rt/src/theme/palette.rs`](crates/forja-gui-rt/src/theme/palette.rs:14)

Paleta tonal de 13 tonos. Cada tono es un color en el mismo matiz (hue) y croma (chroma) pero con diferente brillo (tone). Implementa `Clone`, `Debug`, `Display`.

#### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `hue` | `f64` | Matiz (0-360 grados) |
| `chroma` | `f64` | Croma (0-150, saturación) |
| `tones` | `[RgbColor; 13]` | Colores para cada tono |

#### Constante: `TONES`

```rust
/// Los 13 tonos estándar de Material You
pub const TONES: [u8; 13] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
```

#### Tabla de tonos

| Índice | Tone | Brillo | Uso típico (Light) | Uso típico (Dark) |
|--------|------|--------|-------------------|-------------------|
| 0 | 0 | Negro puro | - | - |
| 1 | 10 | Muy oscuro | on_primary_container | - |
| 2 | 20 | Oscuro | inverse_on_surface | on_primary |
| 3 | 30 | Oscuro medio | - | primary_container |
| 4 | 40 | Medio-oscuro | **primary** | inverse_primary |
| 5 | 50 | Medio | - | - |
| 6 | 60 | Medio-claro | outline | outline |
| 7 | 70 | Claro | - | - |
| 8 | 80 | Claro | inverse_primary | **primary** |
| 9 | 90 | Muy claro | primary_container | on_primary_container |
| 10 | 95 | Casi blanco | surface_variant inverse | - |
| 11 | 99 | Casi blanco | surface (light) | - |
| 12 | 100 | Blanco puro | on_primary | - |

#### Métodos

```rust
impl TonalPalette {
    /// Crea una paleta tonal desde valores HCT
    /// Genera 13 colores iterando sobre los TONES estándar
    pub fn from_hct(hue: f64, chroma: f64) -> Self

    /// Obtiene el color para un tono específico (0-100)
    /// Busca el tono más cercano en el array TONES
    pub fn tone(&self, tone: u8) -> RgbColor

    /// Obtiene todos los colores de la paleta (referencia al array de 13)
    pub fn all_tones(&self) -> &[RgbColor; 13]
}

impl std::fmt::Display for TonalPalette {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TonalPalette(hue={:.1}°, chroma={:.1})", self.hue, self.chroma)
    }
}
```

---

## 1.4 Palettes

### Struct: `Palettes`

**Archivo:** [`crates/forja-gui-rt/src/theme/palette.rs`](crates/forja-gui-rt/src/theme/palette.rs:59)

Contiene las **5 paletas tonales** de Material You. Se generan desde un color semilla usando el algoritmo simplificado de Monet. Implementa `Clone`, `Debug`, `Display`.

#### Campos

| Campo | Tipo | Hue | Chroma | Propósito |
|-------|------|-----|--------|-----------|
| `primary` | [`TonalPalette`](#13-tonalpalette) | seed_hue | `max(36, seed_chroma)` | Color principal de la aplicación |
| `secondary` | [`TonalPalette`](#13-tonalpalette) | seed_hue + 60° | `16` | Color secundario |
| `tertiary` | [`TonalPalette`](#13-tonalpalette) | seed_hue + 180° | `24` | Color terciario (acento) |
| `neutral` | [`TonalPalette`](#13-tonalpalette) | seed_hue | `4` | Fondos, superficies, texto |
| `neutral_variant` | [`TonalPalette`](#13-tonalpalette) | seed_hue | `8` | Variante de superficie (outlines) |

#### Métodos

```rust
impl Palettes {
    /// Genera las 5 paletas desde un color semilla RgbColor
    ///
    /// Algoritmo simplificado de Material You (Monet):
    /// 1. Convierte seed a HCT
    /// 2. Primary: hue del seed, chroma = max(36, seed_chroma)
    /// 3. Secondary: hue = seed_hue + 60°, chroma = 16
    /// 4. Tertiary: hue = seed_hue + 180°, chroma = 24
    /// 5. Neutral: hue = seed_hue, chroma = 4
    /// 6. Neutral Variant: hue = seed_hue, chroma = 8
    pub fn from_seed(seed: &RgbColor) -> Self

    /// Genera paletas desde un string hex #RRGGBB
    /// Fallback a #6750A4 si el hex es inválido
    pub fn from_seed_hex(hex: &str) -> Self
}
```

#### Ejemplo

```rust
use forja_gui_rt::{RgbColor, Palettes};

let seed = RgbColor::from_hex("#6750A4").unwrap(); // Púrpura
let palettes = Palettes::from_seed(&seed);

// Verificar propiedades de las paletas
assert!(palettes.primary.chroma >= 36.0);
assert!((palettes.secondary.hue - palettes.primary.hue).abs() > 30.0);
assert!(palettes.neutral.chroma < 10.0);

// Obtener color primary en light mode (tone 40)
let primary_light = palettes.primary.tone(40);
// ≈ RgbColor(103, 80, 164)

// Obtener color primary en dark mode (tone 80)
let primary_dark = palettes.primary.tone(80);
// ≈ RgbColor(208, 188, 255)

// Mostrar paleta
println!("{}", palettes.primary);
// "TonalPalette(hue=283.6°, chroma=36.0)"
```

---

## 1.5 ColorScheme

### Struct: `ColorScheme`

**Archivo:** [`crates/forja-gui-rt/src/theme/scheme.rs`](crates/forja-gui-rt/src/theme/scheme.rs:11)

Los **27 color roles** de Material Design 3 (Material You). Se generan desde [`Palettes`](#14-palettes) según modo claro/oscuro. Implementa `Clone`, `Debug`, `PartialEq`, `Display`.

#### Campos (todos `RgbColor`)

##### 🔵 Primario

| Campo | Light (tone) | Dark (tone) | Descripción |
|-------|-------------|-------------|-------------|
| `primary` | Tone 40 | Tone 80 | Color principal de la app |
| `on_primary` | Tone 100 | Tone 20 | Contenido sobre primary |
| `primary_container` | Tone 90 | Tone 30 | Contenedor primario |
| `on_primary_container` | Tone 10 | Tone 90 | Contenido sobre contenedor primario |

##### 🟢 Secundario

| Campo | Light (tone) | Dark (tone) | Descripción |
|-------|-------------|-------------|-------------|
| `secondary` | Tone 40 | Tone 80 | Color secundario |
| `on_secondary` | Tone 100 | Tone 20 | Contenido sobre secondary |
| `secondary_container` | Tone 90 | Tone 30 | Contenedor secundario |
| `on_secondary_container` | Tone 10 | Tone 90 | Contenido sobre contenedor secundario |

##### 🟡 Terciario

| Campo | Light (tone) | Dark (tone) | Descripción |
|-------|-------------|-------------|-------------|
| `tertiary` | Tone 40 | Tone 80 | Color terciario (acento) |
| `on_tertiary` | Tone 100 | Tone 20 | Contenido sobre tertiary |
| `tertiary_container` | Tone 90 | Tone 30 | Contenedor terciario |
| `on_tertiary_container` | Tone 10 | Tone 90 | Contenido sobre contenedor terciario |

##### 🔴 Error

| Campo | Light | Dark | Descripción |
|-------|-------|------|-------------|
| `error` | #B3261E (179,38,30) | #F2B8B5 (242,184,181) | Color de error |
| `on_error` | #FFFFFF (255,255,255) | #591A13 (89,26,19) | Contenido sobre error |
| `error_container` | #F9DEDC (249,222,220) | #8C1D18 (140,29,24) | Contenedor de error |
| `on_error_container` | #410E0B (65,14,11) | #F9DEDC (249,222,220) | Contenido sobre contenedor de error |

##### ⚪ Superficie y Fondo

| Campo | Light (tone) | Dark (tone) | Descripción |
|-------|-------------|-------------|-------------|
| `surface` | Tone 98 | Tone 6 | Color de superficie |
| `on_surface` | Tone 10 | Tone 90 | Contenido sobre superficie |
| `surface_variant` | Variant Tone 90 | Variant Tone 30 | Variante de superficie |
| `on_surface_variant` | Variant Tone 30 | Variant Tone 80 | Contenido sobre variante |
| `background` | Tone 98 | Tone 6 | Color de fondo |
| `on_background` | Tone 10 | Tone 90 | Contenido sobre fondo |

##### 🔲 Outline

| Campo | Light (tone) | Dark (tone) | Descripción |
|-------|-------------|-------------|-------------|
| `outline` | Variant Tone 50 | Variant Tone 60 | Borde/perfil |
| `outline_variant` | Variant Tone 80 | Variant Tone 30 | Variante de borde |

##### 🔄 Inverse

| Campo | Light (tone) | Dark (tone) | Descripción |
|-------|-------------|-------------|-------------|
| `inverse_surface` | Tone 20 | Tone 90 | Superficie inversa |
| `inverse_on_surface` | Tone 95 | Tone 20 | Contenido sobre superficie inversa |
| `inverse_primary` | Primary Tone 80 | Primary Tone 40 | Primary inverso |

#### Tabla completa de colores LIGHT (seed #6750A4)

| Role | Hex | RGB | Categoría |
|------|-----|-----|-----------|
| `primary` | `#6750A4` | (103, 80, 164) | 🔵 Primario |
| `on_primary` | `#FFFFFF` | (255, 255, 255) | 🔵 Primario |
| `primary_container` | `#EADDFF` | (234, 221, 255) | 🔵 Primario |
| `on_primary_container` | `#21005D` | (33, 0, 93) | 🔵 Primario |
| `secondary` | `#625B71` | (98, 91, 113) | 🟢 Secundario |
| `on_secondary` | `#FFFFFF` | (255, 255, 255) | 🟢 Secundario |
| `secondary_container` | `#E8DEF8` | (232, 222, 248) | 🟢 Secundario |
| `on_secondary_container` | `#1D192B` | (29, 25, 43) | 🟢 Secundario |
| `tertiary` | `#7D5260` | (125, 82, 96) | 🟡 Terciario |
| `on_tertiary` | `#FFFFFF` | (255, 255, 255) | 🟡 Terciario |
| `tertiary_container` | `#FFD8E4` | (255, 216, 228) | 🟡 Terciario |
| `on_tertiary_container` | `#31111D` | (49, 17, 29) | 🟡 Terciario |
| `error` | `#B3261E` | (179, 38, 30) | 🔴 Error |
| `on_error` | `#FFFFFF` | (255, 255, 255) | 🔴 Error |
| `error_container` | `#F9DEDC` | (249, 222, 220) | 🔴 Error |
| `on_error_container` | `#410E0B` | (65, 14, 11) | 🔴 Error |
| `surface` | `#FFFBFE` | (255, 251, 254) | ⚪ Superficie |
| `on_surface` | `#1C1B1F` | (28, 27, 31) | ⚪ Superficie |
| `surface_variant` | `#E7E0EC` | (231, 224, 236) | ⚪ Superficie |
| `on_surface_variant` | `#49454F` | (73, 69, 79) | ⚪ Superficie |
| `background` | `#FFFBFE` | (255, 251, 254) | ⚪ Superficie |
| `on_background` | `#1C1B1F` | (28, 27, 31) | ⚪ Superficie |
| `outline` | `#79747E` | (121, 116, 126) | 🔲 Outline |
| `outline_variant` | `#C4C7C5` | (196, 199, 197) | 🔲 Outline |
| `inverse_surface` | `#313033` | (49, 48, 51) | 🔄 Inverse |
| `inverse_on_surface` | `#F4EFF4` | (244, 239, 244) | 🔄 Inverse |
| `inverse_primary` | `#D0BCFF` | (208, 188, 255) | 🔄 Inverse |

#### Tabla completa de colores DARK (seed #6750A4)

| Role | Hex | RGB | Categoría |
|------|-----|-----|-----------|
| `primary` | `#D0BCFF` | (208, 188, 255) | 🔵 Primario |
| `on_primary` | `#371E73` | (55, 30, 115) | 🔵 Primario |
| `primary_container` | `#4F378B` | (79, 55, 139) | 🔵 Primario |
| `on_primary_container` | `#EADDFF` | (234, 221, 255) | 🔵 Primario |
| `secondary` | `#CCC2DC` | (204, 194, 220) | 🟢 Secundario |
| `on_secondary` | `#322D41` | (50, 45, 65) | 🟢 Secundario |
| `secondary_container` | `#4A4458` | (74, 68, 88) | 🟢 Secundario |
| `on_secondary_container` | `#E8DEF8` | (232, 222, 248) | 🟢 Secundario |
| `tertiary` | `#EFB8C8` | (239, 184, 200) | 🟡 Terciario |
| `on_tertiary` | `#492632` | (73, 38, 50) | 🟡 Terciario |
| `tertiary_container` | `#633C49` | (99, 60, 73) | 🟡 Terciario |
| `on_tertiary_container` | `#FFD8E4` | (255, 216, 228) | 🟡 Terciario |
| `error` | `#F2B8B5` | (242, 184, 181) | 🔴 Error |
| `on_error` | `#591A13` | (89, 26, 19) | 🔴 Error |
| `error_container` | `#8C1D18` | (140, 29, 24) | 🔴 Error |
| `on_error_container` | `#F9DEDC` | (249, 222, 220) | 🔴 Error |
| `surface` | `#1C1B1F` | (28, 27, 31) | ⚪ Superficie |
| `on_surface` | `#E6E1E5` | (230, 225, 229) | ⚪ Superficie |
| `surface_variant` | `#49454F` | (73, 69, 79) | ⚪ Superficie |
| `on_surface_variant` | `#CAC4D0` | (202, 196, 208) | ⚪ Superficie |
| `background` | `#1C1B1F` | (28, 27, 31) | ⚪ Superficie |
| `on_background` | `#E6E1E5` | (230, 225, 229) | ⚪ Superficie |
| `outline` | `#938F99` | (147, 143, 153) | 🔲 Outline |
| `outline_variant` | `#49454F` | (73, 69, 79) | 🔲 Outline |
| `inverse_surface` | `#E6E1E5` | (230, 225, 229) | 🔄 Inverse |
| `inverse_on_surface` | `#313033` | (49, 48, 51) | 🔄 Inverse |
| `inverse_primary` | `#6750A4` | (103, 80, 164) | 🔄 Inverse |

#### Métodos

```rust
impl ColorScheme {
    /// Crea un esquema de color desde las paletas tonales
    ///
    /// Mapea los tonos de cada paleta a los color roles según modo claro/oscuro:
    ///
    /// Light mode:
    /// - primary: tone 40, on_primary: tone 100
    /// - primary_container: tone 90, on_primary_container: tone 10
    /// - surface: tone 98, background: tone 98
    /// - outline: variant tone 50, outline_variant: variant tone 80
    ///
    /// Dark mode:
    /// - primary: tone 80, on_primary: tone 20
    /// - primary_container: tone 30, on_primary_container: tone 90
    /// - surface: tone 6, background: tone 6
    /// - outline: variant tone 60, outline_variant: variant tone 30
    pub fn from_palettes(palettes: &Palettes, is_dark: bool) -> Self

    /// Esquema claro por defecto Material You (seed: #6750A4)
    pub fn light() -> Self

    /// Esquema oscuro por defecto Material You (seed: #6750A4)
    pub fn dark() -> Self

    /// Calcula el color de superficie con elevación
    ///
    /// En dark mode, la superficie se aclara con el color primario según nivel:
    /// - Level 0: 0% overlay
    /// - Level 1: 5% primary overlay
    /// - Level 2: 8% primary overlay
    /// - Level 3: 11% primary overlay
    /// - Level 4: 12% primary overlay
    /// - Level 5: 14% primary overlay
    ///
    /// En light mode, la superficie NO cambia (solo sombra).
    pub fn surface_at_elevation(&self, level: u8, is_dark: bool) -> RgbColor
}
```

#### Ejemplo

```rust
use forja_gui_rt::{ColorScheme, RgbColor};

// Esquemas por defecto
let light = ColorScheme::light();
let dark = ColorScheme::dark();

assert_eq!(light.primary, RgbColor(103, 80, 164)); // #6750A4
assert_eq!(light.surface, RgbColor(255, 251, 254)); // #FFFBFE
assert_eq!(dark.primary, RgbColor(208, 188, 255)); // #D0BCFF
assert_eq!(dark.surface, RgbColor(28, 27, 31)); // #1C1B1F

// Esquema desde paletas
use forja_gui_rt::Palettes;
let seed = RgbColor::from_hex("#FF5722").unwrap();
let palettes = Palettes::from_seed(&seed);
let scheme = ColorScheme::from_palettes(&palettes, false);

// Superficie con elevación en dark
let elevated = dark.surface_at_elevation(3, true);
assert_ne!(elevated, dark.surface); // Se aclara con primary

// Display
println!("{}", light); // "ColorScheme(primary=#6750A4)"
```

---

## 1.6 TypeScale

### Struct: `TypeScale`

**Archivo:** [`crates/forja-gui-rt/src/theme/typography.rs`](crates/forja-gui-rt/src/theme/typography.rs:62)

Los **15 estilos tipográficos** de Material Design 3. Implementa `Clone`, `Debug`, `PartialEq`, `Display`.

#### Campos

```rust
pub struct TypeScale {
    // Display - para titulares muy grandes, pantallas de bienvenida
    pub display_large: TextStyle,    // 57sp/64sp/-0.25/Regular
    pub display_medium: TextStyle,   // 45sp/52sp/0/Regular
    pub display_small: TextStyle,    // 36sp/44sp/0/Regular

    // Headline - para títulos de sección
    pub headline_large: TextStyle,   // 32sp/40sp/0/Regular
    pub headline_medium: TextStyle,  // 28sp/36sp/0/Regular
    pub headline_small: TextStyle,   // 24sp/32sp/0/Regular

    // Title - para títulos de componentes
    pub title_large: TextStyle,      // 22sp/28sp/0/Regular
    pub title_medium: TextStyle,     // 16sp/24sp/0.15/Medium
    pub title_small: TextStyle,      // 14sp/20sp/0.1/Medium

    // Body - para texto de contenido
    pub body_large: TextStyle,       // 16sp/24sp/0.5/Regular
    pub body_medium: TextStyle,      // 14sp/20sp/0.25/Regular
    pub body_small: TextStyle,       // 12sp/16sp/0.4/Regular

    // Label - para botones, etiquetas, chips
    pub label_large: TextStyle,      // 14sp/20sp/0.1/Medium → BOTONES
    pub label_medium: TextStyle,     // 12sp/16sp/0.5/Medium
    pub label_small: TextStyle,      // 11sp/16sp/0.5/Medium
}
```

#### Tabla completa de estilos

| Nombre | Tamaño (sp) | Leading (sp) | Tracking (sp) | Weight | Uso típico |
|--------|-------------|-------------|--------------|--------|------------|
| `display_large` | 57 | 64 | -0.25 | Regular (400) | Pantalla de bienvenida, hero |
| `display_medium` | 45 | 52 | 0 | Regular (400) | Hero sections, títulos grandes |
| `display_small` | 36 | 44 | 0 | Regular (400) | Títulos decorativos |
| `headline_large` | 32 | 40 | 0 | Regular (400) | Título de página |
| `headline_medium` | 28 | 36 | 0 | Regular (400) | Título de sección |
| `headline_small` | 24 | 32 | 0 | Regular (400) | Subtítulo |
| `title_large` | 22 | 28 | 0 | Regular (400) | Título de tarjeta |
| `title_medium` | 16 | 24 | 0.15 | **Medium (500)** | Título de app bar |
| `title_small` | 14 | 20 | 0.1 | **Medium (500)** | Título de lista |
| `body_large` | 16 | 24 | 0.5 | Regular (400) | Texto de lectura |
| `body_medium` | 14 | 20 | 0.25 | Regular (400) | **Texto general** |
| `body_small` | 12 | 16 | 0.4 | Regular (400) | Texto secundario |
| `label_large` | 14 | 20 | 0.1 | **Medium (500)** | **Botones** |
| `label_medium` | 12 | 16 | 0.5 | **Medium (500)** | Chips, Badges |
| `label_small` | 11 | 16 | 0.5 | **Medium (500)** | Subtítulos pequeños |

#### Métodos

```rust
impl TypeScale {
    /// Escala tipográfica por defecto de Material You
    pub fn default() -> Self

    /// Busca un estilo por nombre ("display_large", "body_medium", "label_small", etc.)
    /// Si el nombre no existe, devuelve body_medium (fallback)
    pub fn apply(&self, style_name: &str) -> &TextStyle

    /// Lista todos los nombres de estilos disponibles (15 nombres)
    pub fn style_names() -> &'static [&'static str]
    // ["display_large", "display_medium", "display_small",
    //  "headline_large", "headline_medium", "headline_small",
    //  "title_large", "title_medium", "title_small",
    //  "body_large", "body_medium", "body_small",
    //  "label_large", "label_medium", "label_small"]
}
```

### Struct: `TextStyle`

**Archivo:** [`crates/forja-gui-rt/src/theme/typography.rs`](crates/forja-gui-rt/src/theme/typography.rs:42)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct TextStyle {
    pub font_size: f64,       // Tamaño de fuente en sp (pixels escalados)
    pub line_height: f64,     // Altura de línea en sp
    pub tracking: f64,        // Espaciado entre letras (letter-spacing) en sp
    pub weight: FontWeight,   // Peso de la fuente
}

impl TextStyle {
    pub const fn new(font_size: f64, line_height: f64, tracking: f64, weight: FontWeight) -> Self
}
```

### Enum: `FontWeight`

**Archivo:** [`crates/forja-gui-rt/src/theme/typography.rs`](crates/forja-gui-rt/src/theme/typography.rs:8)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum FontWeight {
    Thin,       // 100
    Light,      // 300
    Regular,    // 400
    Medium,     // 500
    Bold,       // 700
}

impl FontWeight {
    /// Convierte al peso numérico
    pub fn value(&self) -> u16

    /// Convierte al tipo FontWeight de Xilem
    pub fn to_xilem_weight(&self) -> xilem::FontWeight
    // Thin → xilem::FontWeight::THIN
    // Light → xilem::FontWeight::LIGHT
    // Regular → xilem::FontWeight::NORMAL
    // Medium → xilem::FontWeight::MEDIUM
    // Bold → xilem::FontWeight::BOLD
}
```

#### Ejemplo

```rust
use forja_gui_rt::{TypeScale, TextStyle, FontWeight};

let typography = TypeScale::default();

// Obtener estilo de botón
let boton = typography.apply("label_large");
assert_eq!(boton.font_size, 14.0);
assert_eq!(boton.line_height, 20.0);
assert_eq!(boton.tracking, 0.1);
assert_eq!(boton.weight, FontWeight::Medium);

// Obtener cuerpo de texto general
let body = typography.apply("body_medium");
assert_eq!(body.font_size, 14.0);

// Fallback a body_medium si no existe
let fallback = typography.apply("no_existe");
assert_eq!(fallback.font_size, 14.0);

// Listar todos los estilos
let names = TypeScale::style_names();
assert_eq!(names.len(), 15);

// FontWeight a Xilem
let xilem_weight = FontWeight::Medium.to_xilem_weight();

// FontWeight value
assert_eq!(FontWeight::Bold.value(), 700);
```

#### Ejemplo (Forja)

```forja
importar "gui"

funcion main() {
    columna(
        texto_grande("Bienvenido"),          # display_large
        titular_mediano("Sección Principal"), # headline_medium
        cuerpo_mediano("Texto de contenido"), # body_medium
        etiqueta_grande("Botón"),             # label_large
    )
}
```

---

## 1.7 ShapeSystem

### Struct: `ShapeSystem`

**Archivo:** [`crates/forja-gui-rt/src/theme/shape.rs`](crates/forja-gui-rt/src/theme/shape.rs:8)

Define los **radios de borde** (border-radius) para componentes siguiendo Material Design 3. Implementa `Clone`, `Copy`, `Debug`, `PartialEq`.

#### Campos

| Campo | Valor (dp) | Aplicación |
|-------|-----------|------------|
| `none` | 0.0 | NavigationBar, TopAppBar, barras |
| `extra_small` | 4.0 | TextField, Skeleton línea |
| `small` | 8.0 | Chips, Tooltip, Snackbar, Badge |
| `medium` | 12.0 | Cards, Dialog, DataTable, Container |
| `large` | 16.0 | BottomSheet, FAB |
| `extra_large` | 28.0 | Modal, Dialog grande |
| `full` | -1.0 (-1 = 50%) | Botones, FAB small, Avatar |

#### Métodos

```rust
impl ShapeSystem {
    /// Valores por defecto de Material You
    pub fn default() -> Self

    /// Obtiene el radio para una familia de componentes
    pub fn for_family(&self, family: ShapeFamily) -> f64
}
```

### Enum: `ShapeFamily`

**Archivo:** [`crates/forja-gui-rt/src/theme/shape.rs`](crates/forja-gui-rt/src/theme/shape.rs:55)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum ShapeFamily {
    Surface,     // small (8dp) - Tarjetas y superficies
    Container,   // medium (12dp) - Contenedores
    Button,      // 20dp - Botones
    Navigation,  // none (0dp) - Barras de navegación
    Badge,       // small (8dp) - Badges
    Fab,         // large (16dp) - Floating Action Button
    TextField,   // extra_small (4dp) - Campos de texto
}

impl ShapeFamily {
    /// Nombre descriptivo de la familia
    pub fn name(&self) -> &'static str
}
```

### Función: `corner_radius`

**Archivo:** [`crates/forja-gui-rt/src/theme/shape.rs`](crates/forja-gui-rt/src/theme/shape.rs:88)

```rust
/// Crea un CornerRadius de Xilem/Masonry a partir de un radio uniforme
pub fn corner_radius(radius: f64) -> xilem::masonry::properties::CornerRadius
```

### Función: `corner_radius_asymmetric`

**Archivo:** [`crates/forja-gui-rt/src/theme/shape.rs`](crates/forja-gui-rt/src/theme/shape.rs:96)

```rust
/// Crea un CornerRadius asimétrico (promedia las 4 esquinas)
/// NOTA: Xilem 0.4 / Masonry 0.4 solo soporta CornerRadius uniforme.
pub fn corner_radius_asymmetric(
    top_left: f64, top_right: f64,
    bottom_right: f64, bottom_left: f64,
) -> xilem::masonry::properties::CornerRadius
```

#### Ejemplo

```rust
use forja_gui_rt::{ShapeSystem, ShapeFamily, corner_radius};

let shapes = ShapeSystem::default();

// Radios individuales
assert_eq!(shapes.none, 0.0);
assert_eq!(shapes.extra_small, 4.0);
assert_eq!(shapes.small, 8.0);
assert_eq!(shapes.medium, 12.0);
assert_eq!(shapes.large, 16.0);
assert_eq!(shapes.extra_large, 28.0);
assert_eq!(shapes.full, -1.0); // 50% (circular)

// Por familia de componentes
assert_eq!(shapes.for_family(ShapeFamily::Surface), 8.0);
assert_eq!(shapes.for_family(ShapeFamily::Button), 20.0);
assert_eq!(shapes.for_family(ShapeFamily::Fab), 16.0);
assert_eq!(shapes.for_family(ShapeFamily::TextField), 4.0);
assert_eq!(shapes.for_family(ShapeFamily::Navigation), 0.0);

// A CornerRadius de Masonry
let radius = corner_radius(8.0);
assert_eq!(radius.radius, 8.0);

// Nombre de familia
assert_eq!(ShapeFamily::Button.name(), "Button");
```

#### Ejemplo (Forja)

```forja
importar "gui"

funcion main() {
    columna(
        esquinas_pequeñas(    # 4dp - TextField
            campo_texto("nombre", "Nombre")
        ),
        esquinas_medianas(    # 12dp - Card
            tarjeta(
                cuerpo_mediano("Contenido")
            )
        ),
        esquinas_grandes(     # 16dp - FAB
            fab("➕", &accion)
        ),
        esquinas_completas(   # 50% - Avatar
            avatar("JD")
        ),
    )
}
```

---

## 1.8 ElevationSystem

### Struct: `ElevationSystem`

**Archivo:** [`crates/forja-gui-rt/src/theme/elevation.rs`](crates/forja-gui-rt/src/theme/elevation.rs:10)

Define **6 niveles de elevación** (sombras) siguiendo Material Design 3. Implementa `Clone`, `Copy`, `Debug`, `PartialEq`.

#### Campos

| Nivel | dp | Componentes |
|-------|----|-------------|
| `level0` | 0 | Button filled, Surface, Card filled |
| `level1` | 1 | Card elevated, Button elevated |
| `level2` | 3 | NavigationRail, FAB |
| `level3` | 6 | NavigationDrawer, SearchBar |
| `level4` | 8 | Dialog, BottomSheet modal |
| `level5` | 12 | Snackbar |

#### Métodos

```rust
impl ElevationSystem {
    /// Valores por defecto de Material You
    pub fn default() -> Self

    /// Obtiene el valor en dp para un nivel (0-5)
    /// Para niveles > 5, extrapola: level5 + (level - 5) * 4
    pub fn get(&self, level: u8) -> f64

    /// Calcula la sombra para un nivel de elevación
    /// A mayor elevación: mayor blur, mayor offset y mayor alpha
    pub fn shadow_for_level(&self, level: u8) -> Shadow
}
```

### Struct: `Shadow`

**Archivo:** [`crates/forja-gui-rt/src/theme/elevation.rs`](crates/forja-gui-rt/src/theme/elevation.rs:86)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Shadow {
    pub offset_x: f64,                    // Desplazamiento horizontal en dp
    pub offset_y: f64,                    // Desplazamiento vertical en dp
    pub blur_radius: f64,                 // Radio de desenfoque en dp
    pub spread: f64,                      // Expansión de la sombra en dp
    pub color: (u8, u8, u8, u8),         // Color RGBA de la sombra
}

impl Shadow {
    /// Crea una sombra vacía (sin sombra)
    pub fn none() -> Self

    /// Convierte a tupla de parámetros para renderizado
    pub fn to_params(&self) -> (f64, f64, f64, f64, (u8, u8, u8, u8))
}
```

### Función: `surface_at_elevation`

**Archivo:** [`crates/forja-gui-rt/src/theme/elevation.rs`](crates/forja-gui-rt/src/theme/elevation.rs:128)

```rust
/// Calcula el color de superficie con elevación
///
/// En modo oscuro (is_dark = true), la superficie se aclara
/// superponiendo el color primario con opacidad según el nivel.
/// En modo claro, la superficie no cambia.
///
/// Opacidades por nivel (dark mode):
/// - Level 0: 0% | Level 1: 5% | Level 2: 8%
/// - Level 3: 11% | Level 4: 12% | Level 5: 14%
pub fn surface_at_elevation(
    surface: RgbColor,
    primary: RgbColor,
    level: u8,
    is_dark: bool,
) -> RgbColor
```

#### Ejemplo

```rust
use forja_gui_rt::{ElevationSystem, Shadow, RgbColor, surface_at_elevation};

let elevation = ElevationSystem::default();

// Obtener valor en dp
assert_eq!(elevation.get(0), 0.0);
assert_eq!(elevation.get(3), 6.0);
assert_eq!(elevation.get(5), 12.0);

// Sombra para nivel 3
let shadow = elevation.shadow_for_level(3);
// Shadow { offset_x: 0.0, offset_y: 3.0, blur_radius: 4.5, spread: 0.6, color: (0,0,0,77) }
assert!(shadow.offset_y > 0.0);
assert!(shadow.blur_radius > 0.0);
assert!(shadow.color.3 > 0); // alpha > 0

// Sombra none
let no_shadow = Shadow::none();
assert_eq!(no_shadow, Shadow {
    offset_x: 0.0, offset_y: 0.0,
    blur_radius: 0.0, spread: 0.0,
    color: (0, 0, 0, 0),
});

// Superficie con elevación en dark mode
let surface = RgbColor(28, 27, 31); // surface dark
let primary = RgbColor(208, 188, 255); // primary dark
let elevated = surface_at_elevation(surface, primary, 3, true);
assert_ne!(elevated, surface); // se aclara

// En light mode no cambia
let surface_light = RgbColor(255, 251, 254);
let same = surface_at_elevation(surface_light, primary, 3, false);
assert_eq!(same, surface_light);
```

---

## 1.9 StateLayer

### Struct: `StateLayer`

**Archivo:** [`crates/forja-gui-rt/src/theme/state.rs`](crates/forja-gui-rt/src/theme/state.rs:11)

Define las **opacidades y overlays** para los estados interactivos de los componentes (hover, focus, pressed, dragged, disabled). Implementa `Clone`, `Debug`, `PartialEq`.

#### Campos

| Campo | Opacidad | Estado | Descripción |
|-------|----------|--------|-------------|
| `hover_opacity` | 0.08 (8%) | Hover | Mouse sobre el componente |
| `focus_opacity` | 0.12 (12%) | Focus | Navegación por teclado |
| `pressed_opacity` | 0.12 (12%) | Pressed | Click presionado |
| `dragged_opacity` | 0.16 (16%) | Dragged | Arrastrando el componente |
| `disabled_opacity` | 0.38 (38%) | Disabled | Componente deshabilitado |
| `overlay_color` | `RgbColor(28,27,31)` | - | Color del overlay (on-surface) |

#### Métodos

```rust
impl StateLayer {
    /// Capa de estado por defecto (overlay color = on-surface oscuro)
    pub fn default() -> Self

    /// Capa de estado para superficies claras (overlay color = on-surface claro #E6E1E5)
    pub fn on_surface_light() -> Self

    /// Aplica el overlay de estado sobre un color base
    /// Mezcla overlay_color con base_color usando la opacidad especificada
    pub fn apply(&self, base_color: RgbColor, opacity: f64) -> RgbColor

    /// Color para estado hover (base + 8% overlay)
    pub fn hover_color(&self, base: RgbColor) -> RgbColor

    /// Color para estado focus (base + 12% overlay)
    pub fn focus_color(&self, base: RgbColor) -> RgbColor

    /// Color para estado pressed (base + 12% overlay)
    pub fn pressed_color(&self, base: RgbColor) -> RgbColor

    /// Color para estado disabled (base + 38% overlay)
    pub fn disabled_color(&self, base: RgbColor) -> RgbColor

    /// Color para estado dragged (base + 16% overlay)
    pub fn dragged_color(&self, base: RgbColor) -> RgbColor

    /// Calcula el alpha para componente deshabilitado: 1.0 - disabled_opacity = 0.62
    pub fn disabled_alpha(&self) -> f64
}
```

#### Ejemplo

```rust
use forja_gui_rt::{StateLayer, RgbColor};

let states = StateLayer::default();

// Opacidades exactas
assert!((states.hover_opacity - 0.08).abs() < 0.001);
assert!((states.focus_opacity - 0.12).abs() < 0.001);
assert!((states.pressed_opacity - 0.12).abs() < 0.001);
assert!((states.dragged_opacity - 0.16).abs() < 0.001);
assert!((states.disabled_opacity - 0.38).abs() < 0.001);

// Aplicar estados sobre blanco
let white = RgbColor(255, 255, 255);

let hover = states.hover_color(white);
// ≈ RgbColor(245, 245, 246) - ligeramente más oscuro

let pressed = states.pressed_color(white);
// ≈ RgbColor(243, 243, 244) - un poco más oscuro que hover

let disabled = states.disabled_color(white);
// ≈ RgbColor(169, 169, 170) - notablemente más oscuro

// Disabled alpha
assert!((states.disabled_alpha() - 0.62).abs() < 0.001);

// Apply directo con opacidad personalizada
let custom = states.apply(white, 0.5);
// Mezcla 50% white + 50% overlay_color
```

---

## 1.10 MotionSystem

### Struct: `MotionSystem`

**Archivo:** [`crates/forja-gui-rt/src/theme/motion.rs`](crates/forja-gui-rt/src/theme/motion.rs:184)

Sistema completo de movimiento Material You con **duraciones** y **curvas de easing**. Implementa `Clone`, `Copy`, `Debug`, `PartialEq`.

#### Campos

```rust
pub struct MotionSystem {
    pub durations: Durations,  // 9 duraciones predefinidas
    pub easings: Easings,      // 5 curvas de easing predefinidas
}
```

### Struct: `Durations`

**Archivo:** [`crates/forja-gui-rt/src/theme/motion.rs`](crates/forja-gui-rt/src/theme/motion.rs:88)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Durations {
    pub duration_50: f64,     // 50ms  - Micro-interacciones
    pub duration_100: f64,    // 100ms - Hover, ripple
    pub duration_200: f64,    // 200ms - Estándar corto
    pub duration_250: f64,    // 250ms - Decelerado
    pub duration_300: f64,    // 300ms - Estándar
    pub duration_350: f64,    // 350ms - Container transform
    pub duration_400: f64,    // 400ms - Transición media
    pub duration_450: f64,    // 450ms - Emphasized
    pub duration_500: f64,    // 500ms - Transición larga
}

impl Durations {
    pub fn default() -> Self

    /// Obtiene una duración por nombre
    /// "50"|"micro" → 50, "100"|"hover"|"ripple" → 100
    /// "200"|"short" → 200, "250"|"decelerate" → 250
    /// "300"|"standard" → 300, "350"|"container" → 350
    /// "400"|"medium" → 400, "450"|"emphasized" → 450
    /// "500"|"long" → 500, _ → 300 (fallback)
    pub fn get(&self, name: &str) -> f64
}
```

### Struct: `Easings`

**Archivo:** [`crates/forja-gui-rt/src/theme/motion.rs`](crates/forja-gui-rt/src/theme/motion.rs:144)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Easings {
    pub standard: EasingCurve,      // (0.2, 0.0, 0.0, 1.0) - General
    pub emphasized: EasingCurve,    // (0.2, 0.0, 0.0, 1.0) - Destacado
    pub decelerate: EasingCurve,    // (0.0, 0.0, 0.0, 1.0) - Entradas
    pub accelerate: EasingCurve,    // (0.3, 0.0, 1.0, 1.0) - Salidas
    pub expressive: EasingCurve,    // (0.34, 1.56, 0.64, 1.0) - Expressive con overshoot
}

impl Easings {
    pub fn default() -> Self

    /// Obtiene una curva de easing por nombre
    /// "standard", "emphasized", "decelerate", "accelerate", "expressive"
    /// _ → standard (fallback)
    pub fn get(&self, name: &str) -> &EasingCurve
}
```

### Struct: `EasingCurve`

**Archivo:** [`crates/forja-gui-rt/src/theme/motion.rs`](crates/forja-gui-rt/src/theme/motion.rs:8)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct EasingCurve(pub f64, pub f64, pub f64, pub f64);
// (x1, y1, x2, y2) - Puntos de control de la curva cúbica de Bézier

impl EasingCurve {
    /// Aplica la curva de easing a un valor t (0-1)
    /// Usa interpolación cúbica de Bézier con método Newton-Raphson
    /// para transformar un progreso lineal en uno con aceleración/desaceleración.
    pub fn apply(&self, t: f64) -> f64

    /// Crea una curva de easing desde valores (clamp x1,x2 a 0-1)
    pub fn new(x1: f64, y1: f64, x2: f64, y2: f64) -> Self
}
```

#### Constantes de easing

| Constante | Valores | Comportamiento |
|-----------|---------|----------------|
| `EASE_STANDARD` | `(0.2, 0.0, 0.0, 1.0)` | Suave al inicio y final |
| `EASE_EMPHASIZED` | `(0.2, 0.0, 0.0, 1.0)` | Igual que standard (misma curva) |
| `EASE_DECELERATE` | `(0.0, 0.0, 0.0, 1.0)` | Solo desaceleración (entradas) |
| `EASE_ACCELERATE` | `(0.3, 0.0, 1.0, 1.0)` | Solo aceleración (salidas) |
| `EASE_EXPRESSIVE` | `(0.34, 1.56, 0.64, 1.0)` | Con overshoot (>1.0 en y) |

### Enum: `TransitionType`

**Archivo:** [`crates/forja-gui-rt/src/theme/motion.rs`](crates/forja-gui-rt/src/theme/motion.rs:227)

```rust
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum TransitionType {
    Fade,                  // Fundido (200ms, standard)
    SharedAxisX,           // Eje compartido X / deslizar horizontal (300ms, standard)
    SharedAxisY,           // Eje compartido Y / deslizar vertical (300ms, standard)
    SharedAxisZ,           // Eje compartido Z / escala (300ms, standard)
    FadeThrough,           // Fundido a través (350ms, emphasized)
    ContainerTransform,    // Transformación de contenedor (350ms, emphasized)
}

impl TransitionType {
    pub fn duration(&self) -> f64       // Duración recomendada en ms
    pub fn easing(&self) -> EasingCurve  // Easing recomendado
    pub fn name(&self) -> &'static str   // Nombre descriptivo
}
```

#### Métodos de MotionSystem

```rust
impl MotionSystem {
    /// Sistema de movimiento por defecto
    pub fn default() -> Self

    /// Sistema de movimiento con easing expresivo (overshoot) en todas las curvas
    pub fn expressive() -> Self

    /// Obtiene la duración para un nombre de transición
    pub fn duration_for(&self, name: &str) -> f64

    /// Obtiene la curva de easing para un nombre
    pub fn ease_for(&self, name: &str) -> &EasingCurve
}
```

#### Ejemplo

```rust
use forja_gui_rt::{MotionSystem, EasingCurve, TransitionType, EASE_EXPRESSIVE, EASE_STANDARD};

let motion = MotionSystem::default();

// Duraciones
assert_eq!(motion.durations.duration_300, 300.0);
assert_eq!(motion.durations.get("hover"), 100.0);
assert_eq!(motion.durations.get("standard"), 300.0);
assert_eq!(motion.durations.get("container"), 350.0);

// Easing curves
let curve = EASE_STANDARD;
assert!((curve.apply(0.0) - 0.0).abs() < 0.01);
assert!((curve.apply(1.0) - 1.0).abs() < 0.01);
// En t=0.5, el valor es ~0.65 (acelerado al inicio)

// Expressive con overshoot!
let exp = EASE_EXPRESSIVE;
let at_80 = exp.apply(0.8);
// at_80 > 1.0! (rebasa el objetivo)

// MotionSystem expressive
let exp_motion = MotionSystem::expressive();
assert_eq!(exp_motion.easings.standard, EASE_EXPRESSIVE);

// TransitionType
let tt = TransitionType::ContainerTransform;
assert_eq!(tt.duration(), 350.0);
assert_eq!(tt.name(), "ContainerTransform");
assert_eq!(tt.easing(), EASE_EMPHASIZED);

// Buscar por nombre
assert_eq!(motion.duration_for("fade"), 200.0);
assert_eq!(*motion.ease_for("standard"), EASE_STANDARD);
```

---

## 1.11 Hct (Color Dinámico)

### Struct: `Hct`

**Archivo:** [`crates/forja-gui-rt/src/theme/dynamic_color.rs`](crates/forja-gui-rt/src/theme/dynamic_color.rs:15)

Espacio de color **HCT (Hue, Chroma, Tone)** basado en CAM16 simplificado. Separa el color en tres componentes perceptualmente independientes. Implementa `Clone`, `Copy`, `Debug`, `PartialEq`, `Display`.

#### Campos

| Campo | Rango | Descripción |
|-------|-------|-------------|
| `hue` | 0-360° | Matiz del color (0=rojo, 120=verde, 240=azul) |
| `chroma` | 0-150+ | Saturación/viveza (0=gris, mayor = más intenso) |
| `tone` | 0-100 | Brillo/luminosidad (0=negro, 100=blanco) |

#### Métodos

```rust
impl Hct {
    /// Crea un HCT desde un RgbColor usando transformación completa:
    /// sRGB → Lineal → XYZ (D65) → Lab (CIE) → HCT
    pub fn from_rgb(rgb: &RgbColor) -> Self

    /// Convierte HCT a RgbColor:
    /// HCT → Lab → XYZ (D65) → Lineal → sRGB
    pub fn to_rgb(&self) -> RgbColor

    /// Crea un HCT desde valores directos de hue, chroma y tone
    /// hue se normaliza a [0, 360), chroma >= 0, tone se clamp a [0, 100]
    pub fn new(hue: f64, chroma: f64, tone: f64) -> Self

    /// Obtiene un nuevo HCT con el tono especificado, manteniendo hue y chroma
    pub fn with_tone(&self, tone: f64) -> Self

    /// Crea desde un string hexadecimal (#RRGGBB)
    pub fn from_hex(hex: &str) -> Self

    /// Convierte a string hexadecimal
    pub fn to_hex(&self) -> String

    /// Calcula la distancia perceptible entre dos colores HCT (0.0 = iguales, >1 = diferentes)
    pub fn distance(&self, other: &Hct) -> f64
}
```

### Funciones de armonización

```rust
/// Armoniza un color de diseño con un color fuente
/// Si la diferencia de hue > 60°, desplaza el hue 30° hacia el source
pub fn harmonize(design_color: &RgbColor, source_color: &RgbColor) -> RgbColor

/// Aumenta el chroma para efecto expressive (factor 1.3x por defecto)
/// El chroma resultante se clamp a max 150
pub fn chroma_boost(hct: &Hct, factor: f64) -> Hct
```

#### Ejemplo

```rust
use forja_gui_rt::{Hct, RgbColor, harmonize, chroma_boost};

let rgb = RgbColor(103, 80, 164); // #6750A4 púrpura
let hct = Hct::from_rgb(&rgb);

// Propiedades del púrpura
assert!(hct.hue > 270.0 && hct.hue < 340.0); // matiz púrpura/violeta
assert!(hct.tone > 30.0 && hct.tone < 60.0); // luminosidad media

// Roundtrip: RGB → HCT → RGB (con pequeña tolerancia)
let recovered = hct.to_rgb();
assert!(rgb.0.abs_diff(recovered.0) <= 2);
assert!(rgb.1.abs_diff(recovered.1) <= 2);
assert!(rgb.2.abs_diff(recovered.2) <= 2);

// with_tone: mismo color pero más claro
let lighter = hct.with_tone(80.0);
assert!((lighter.tone - 80.0).abs() < 0.01);
assert!((lighter.hue - hct.hue).abs() < 0.01);

// Desde hex
let hct_hex = Hct::from_hex("#FF5722");
assert_eq!(hct_hex.to_hex(), "#FF5722");

// Distancia
let hct1 = Hct::new(270.0, 36.0, 50.0);
let hct2 = Hct::new(270.0, 36.0, 80.0);
assert!(hct1.distance(&hct2) > 0.0);

// Harmonize
let design = RgbColor(255, 0, 0); // rojo puro
let source = RgbColor(103, 80, 164); // púrpura
let harmonized = harmonize(&design, &source);
// El rojo se desplaza hacia el púrpura

// Chroma boost (1.3x más saturado)
let boosted = chroma_boost(&hct, 1.3);
assert!(boosted.chroma > hct.chroma);
```

---

## 1.12 SystemTheme (Detección del SO)

**Archivo:** [`crates/forja-gui-rt/src/theme/system_theme.rs`](crates/forja-gui-rt/src/theme/system_theme.rs:1)

### Enum: `SystemTheme`

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SystemTheme {
    Light,    // Modo claro
    Dark,     // Modo oscuro
    Unknown,  // No se pudo detectar
}
```

### Funciones

```rust
/// Detecta el tema actual del sistema operativo
/// Usa diferentes métodos según el SO:
/// - Windows: reg.exe query HKCU\...\Personalize /v AppsUseLightTheme
/// - Linux: gsettings get org.gnome.desktop.interface color-scheme
/// - macOS: defaults read -g AppleInterfaceStyle
pub fn detect_system_theme() -> SystemTheme

/// ¿El sistema está en modo oscuro?
pub fn is_system_dark() -> bool
```

#### Métodos de detección por SO

| SO | Comando | Dark | Light |
|----|---------|------|-------|
| **Windows** | `reg.exe query HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize /v AppsUseLightTheme` | `0x0` | `0x1` |
| **Linux** | `gsettings get org.gnome.desktop.interface color-scheme` | `'prefer-dark'` | `'default'` |
| **Linux (fallback)** | `gsettings get org.gnome.desktop.interface gtk-theme` | termina en `-dark` o `-black` | otro |
| **macOS** | `defaults read -g AppleInterfaceStyle` | `"Dark"` | clave no existe |

#### Ejemplo

```rust
use forja_gui_rt::{SystemTheme, detect_system_theme, is_system_dark};

let theme = detect_system_theme();
match theme {
    SystemTheme::Dark => println!("Modo oscuro detectado"),
    SystemTheme::Light => println!("Modo claro detectado"),
    SystemTheme::Unknown => println!("No se pudo detectar, usando light"),
}

if is_system_dark() {
    println!("El sistema está en modo oscuro");
}
```

---

# 2. ANIMACIONES (`animation`)

**Archivo:** [`crates/forja-gui-rt/src/theme/animation.rs`](crates/forja-gui-rt/src/theme/animation.rs:1)

## 2.1 AnimationEngine

### Struct: `AnimationEngine`

**Archivo:** [`crates/forja-gui-rt/src/theme/animation.rs`](crates/forja-gui-rt/src/theme/animation.rs:34)

Motor de animaciones **frame-by-frame** que gestiona el ciclo de vida de todas las animaciones activas.

```rust
pub struct AnimationEngine {
    /// Instante del último frame renderizado
    pub last_frame: Instant,
    /// Tiempo transcurrido desde el último frame (en milisegundos)
    pub delta_ms: f64,
    /// Lista de animaciones activas
    pub animations: Vec<Box<dyn Animation>>,
}
```

#### Métodos

```rust
impl AnimationEngine {
    /// Crea un nuevo motor de animaciones
    pub fn new() -> Self

    /// Llama al inicio de cada frame de render
    /// Calcula el delta time, actualiza todas las animaciones
    /// y elimina las completadas
    pub fn begin_frame(&mut self)

    /// Agrega una nueva animación al motor
    pub fn add_animation(&mut self, anim: Box<dyn Animation>)

    /// Reinicia el timer interno (útil al pausar/reanudar)
    pub fn reset_timer(&mut self)
}

impl Default for AnimationEngine {
    fn default() -> Self { Self::new() }
}
```

## 2.2 Animation trait

```rust
/// Trait para una animación individual
pub trait Animation: Send {
    /// Actualiza el estado interno con el delta time en milisegundos
    fn update(&mut self, delta_ms: f64);
    /// Indica si la animación ha finalizado
    fn is_finished(&self) -> bool;
    /// Valor actual interpolado de la animación
    fn current_value(&self) -> f64;
}
```

## 2.3 AnimatedValue

### Struct: `AnimatedValue`

**Archivo:** [`crates/forja-gui-rt/src/theme/animation.rs`](crates/forja-gui-rt/src/theme/animation.rs:121)

Valor que se anima interpolando entre `desde` → `hasta` con una curva easing.

```rust
pub struct AnimatedValue {
    pub desde: f64,           // Valor inicial
    pub hasta: f64,           // Valor final
    pub duracion_ms: f64,     // Duración en milisegundos
    pub progreso: f64,        // Progreso normalizado (0.0 a 1.0)
    pub jugando: bool,        // true = en ejecución
    pub curva: EasingCurve,   // Curva de easing
    pub valor_actual: f64,    // Valor interpolado actual
    pub loop_: bool,          // true = loop infinito
    pub yoyo: bool,           // true = va y vuelve
}
```

#### Métodos

```rust
impl AnimatedValue {
    /// Crea una nueva animación entre desde y hasta con la duración dada
    /// Usa curva standard (0.2, 0.0, 0.0, 1.0) por defecto
    pub fn new(desde: f64, hasta: f64, duracion_ms: f64) -> Self

    /// Establece la curva de easing
    pub fn with_curve(mut self, curva: EasingCurve) -> Self

    /// Activa el modo loop infinito (spinners, barras de carga)
    pub fn with_loop(mut self) -> Self

    /// Activa el modo yoyo: va y vuelve entre desde↔hasta
    /// (intercambia desde↔hasta en cada ciclo)
    pub fn with_yoyo(mut self) -> Self

    /// Inicia o reanuda la animación
    pub fn play(&mut self)

    /// Pausa la animación (mantiene posición)
    pub fn pause(&mut self)

    /// Reinicia al valor inicial
    pub fn reset(&mut self)

    /// Obtiene el valor interpolado aplicando la curva de easing
    pub fn valor_interpolado(&self) -> f64

    /// Actualiza con delta time en ms
    /// Si loop_, reinicia al completar
    /// Si yoyo, invierte dirección
    pub fn update(&mut self, delta_ms: f64)
}

impl Animation for AnimatedValue {
    fn update(&mut self, delta_ms: f64);
    fn is_finished(&self) -> bool;
    fn current_value(&self) -> f64;
}
```

## 2.4 SpringAnimation

### Struct: `SpringAnimation`

**Archivo:** [`crates/forja-gui-rt/src/theme/animation.rs`](crates/forja-gui-rt/src/theme/animation.rs:276)

Animación con **física de resorte** (sistema masa-resorte-amortiguador).

```rust
pub struct SpringAnimation {
    pub masa: f64,            // 1.0 por defecto. Mayor masa = más lentitud
    pub rigidez: f64,         // 100-300, 180 típico. Mayor = más velocidad
    pub amortiguacion: f64,   // 10-30, 18 típico. Mayor = menos rebote
    pub velocidad: f64,       // Velocidad actual
    pub posicion: f64,        // Posición actual
    pub objetivo: f64,        // Posición objetivo
    pub tolerancia: f64,      // 0.01 - para considerar estabilizado
}
```

#### Métodos

```rust
impl SpringAnimation {
    /// Crea una animación spring con valores típicos Material You
    /// masa=1.0, rigidez=180.0, amortiguacion=18.0
    pub fn new(objetivo: f64) -> Self

    /// Configura la masa
    pub fn with_masa(mut self, masa: f64) -> Self

    /// Configura la rigidez del resorte
    pub fn with_rigidez(mut self, rigidez: f64) -> Self

    /// Configura la amortiguación
    pub fn with_amortiguacion(mut self, amortiguacion: f64) -> Self

    /// Cambia el objetivo (crea nueva tensión)
    pub fn set_objetivo(&mut self, objetivo: f64)

    /// Actualiza la simulación física
    /// F = -k*x - c*v, a = F/m, v += a*dt, x += v*dt
    pub fn update(&mut self, delta_ms: f64)

    /// ¿Se ha estabilizado? (|pos-objetivo| < tolerancia Y |vel| < tolerancia)
    pub fn is_settled(&self) -> bool
}
```

## 2.5 AnimationPresets

### Struct: `AnimationPresets`

**Archivo:** [`crates/forja-gui-rt/src/theme/animation.rs`](crates/forja-gui-rt/src/theme/animation.rs:375)

```rust
pub struct AnimationPresets;

impl AnimationPresets {
    /// Botón: efecto ripple (150ms, curva emphasized)
    pub fn button_ripple() -> AnimatedValue

    /// Botón: hover (100ms, curva standard)
    pub fn button_hover() -> AnimatedValue

    /// Card: elevación (200ms, curva standard)
    pub fn card_elevate() -> AnimatedValue

    /// Transición de página (300ms, curva emphasized)
    pub fn page_transition() -> AnimatedValue

    /// Container transform (350ms, curva emphasized)
    pub fn container_transform() -> AnimatedValue

    /// Spinner: loop infinito (800ms por ciclo, curva standard)
    /// Anima 0° → 360° en bucle
    pub fn spinner_loop() -> AnimatedValue

    /// Expressive: fade (450ms, curva expressive con overshoot)
    pub fn expressive_fade() -> AnimatedValue

    /// Expressive: morph (500ms, curva expressive con overshoot)
    pub fn expressive_morph() -> AnimatedValue
}
```

## 2.6 interpolate_color

```rust
/// Interpola linealmente entre dos colores RGB
/// t=0.0 → a, t=0.5 → mezcla, t=1.0 → b
pub fn interpolate_color(a: RgbColor, b: RgbColor, t: f64) -> RgbColor
```

#### Ejemplos completos de animación

```rust
use forja_gui_rt::{
    AnimationEngine, AnimatedValue, SpringAnimation,
    AnimationPresets, interpolate_color, RgbColor, EasingCurve,
};

// 1. Motor de animaciones
let mut engine = AnimationEngine::new();
let anim = AnimatedValue::new(0.0, 100.0, 500.0)
    .with_curve(EasingCurve(0.2, 0.0, 0.0, 1.0));
engine.add_animation(Box::new(anim));

// En cada frame:
engine.begin_frame();

// 2. AnimatedValue simple
let mut fade = AnimatedValue::new(0.0, 1.0, 300.0);
fade.update(16.0); // 16ms ~ 60fps
println!("Opacidad: {}", fade.valor_actual);

// 3. Spring animation
let mut spring = SpringAnimation::new(100.0);
spring.posicion = 0.0;
for _ in 0..60 { // ~1 segundo a 60fps
    spring.update(16.0);
    if spring.is_settled() { break; }
}
assert!((spring.posicion - 100.0).abs() < 1.0);

// 4. Presets
let ripple = AnimationPresets::button_ripple();
let hover = AnimationPresets::button_hover();
let spin = AnimationPresets::spinner_loop();

// 5. Interpolar colores
let rojo = RgbColor(255, 0, 0);
let azul = RgbColor(0, 0, 255);
let violeta = interpolate_color(rojo, azul, 0.5);
assert_eq!(violeta, RgbColor(127, 0, 127));
```

---

# 3. ICONOS MATERIAL DESIGN (`icons`)

**Archivo:** [`crates/forja-gui-rt/src/icons.rs`](crates/forja-gui-rt/src/icons.rs:1)

## 3.1 MaterialIcon

### Struct: `MaterialIcon`

```rust
#[derive(Clone, Copy, Debug)]
pub struct MaterialIcon {
    pub name: &'static str,      // nombre en inglés: "home", "favorite"
    pub svg_path: &'static str,  // path SVG del icono (Material Design)
    pub style: IconStyle,        // estilo del icono
}

impl MaterialIcon {
    /// Crea un nuevo icono Material con estilo Filled por defecto
    pub const fn new(name: &'static str, svg_path: &'static str) -> Self

    /// Cambia el estilo del icono
    pub fn with_style(mut self, style: IconStyle) -> Self

    /// Renderiza este icono como un widget Xilem
    /// Por ahora usa emoji con tamaño y color
    pub fn to_widget(&self, size: f64, color: RgbColor) -> Box<AnyWidgetView<()>>

    /// Renderiza con estilo específico
    pub fn to_widget_styled(&self, size: f64, color: RgbColor, style: IconStyle) -> Box<AnyWidgetView<()>>
}
```

### Enum: `IconStyle`

```rust
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum IconStyle {
    Filled,   // Relleno (por defecto)
    Outlined, // Contorno
    Rounded,  // Redondeado
    Sharp,    // Agudo
    TwoTone,  // Dos tonos
}

impl IconStyle {
    pub fn as_str(&self) -> &'static str
    // "filled", "outlined", "rounded", "sharp", "twotone"

    /// Parsea un string a IconStyle
    /// Soporta español: "relleno", "perfilado", "redondo", "agudo", "dos_tonos"
    pub fn from_str(s: &str) -> Self
}
```

## 3.2 Catálogo de 102 iconos

El catálogo completo está en el módulo `catalog` dentro de [`icons.rs`](crates/forja-gui-rt/src/icons.rs:103).

### Navegación (14)

| Constante | Nombre | SVG Path |
|-----------|--------|----------|
| `HOME` | `"home"` | `M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z` |
| `SEARCH` | `"search"` | `M15.5 14h-.79l-.28-.27...` |
| `SETTINGS` | `"settings"` | `M19.14 12.94c.04-.3.06-.61...` |
| `MENU` | `"menu"` | `M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z` |
| `ARROW_BACK` | `"arrow_back"` | `M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z` |
| `ARROW_FORWARD` | `"arrow_forward"` | `M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z` |
| `ARROW_DROP_DOWN` | `"arrow_drop_down"` | `M7 10l5 5 5-5z` |
| `ARROW_UP` | `"arrow_up"` | `M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z` |
| `ARROW_DOWN` | `"arrow_down"` | `M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z` |
| `CHEVRON_LEFT` | `"chevron_left"` | `M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z` |
| `CHEVRON_RIGHT` | `"chevron_right"` | `M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z` |
| `MORE_VERT` | `"more_vert"` | `M12 8c1.1 0 2-.9 2-2s-.9-2-2-2...` |
| `CLOSE` | `"close"` | `M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z` |
| `REFRESH` | `"refresh"` | `M17.65 6.35C16.2 4.9 14.21 4 12 4...` |

### Acción (17)

| Constante | Nombre | SVG Path |
|-----------|--------|----------|
| `ADD` | `"add"` | `M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z` |
| `ADD_CIRCLE` | `"add_circle"` | `M12 2C6.48 2 2 6.48 2 12...` |
| `DELETE` | `"delete"` | `M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z` |
| `EDIT` | `"edit"` | `M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z...` |
| `SAVE` | `"save"` | `M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4z` |
| `COPY` | `"copy"` | `M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14...` |
| `DONE` | `"done"` | `M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z` |
| `CHECK` | `"check"` | `M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z` |
| `CHECK_CIRCLE` | `"check_circle"` | `M12 2C6.48 2 2 6.48 2 12...` |
| `CANCEL` | `"cancel"` | `M12 2C6.47 2 2 6.47 2 12...` |
| `PRINT` | `"print"` | `M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3z` |
| `SHARE` | `"share"` | `M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7...` |
| `OPEN_IN_NEW` | `"open_in_new"` | `M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z` |
| `LOCK` | `"lock"` | `M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z` |
| `LOCK_OPEN` | `"lock_open"` | `M12 17c1.1 0 2-.9 2-2s-.9-2-2-2...` |
| `VISIBILITY` | `"visibility"` | `M12 4.5C7 4.5 2.73 7.61 1 12...` |
| `VISIBILITY_OFF` | `"visibility_off"` | `M12 7c2.76 0 5 2.24 5 5...` |

### Contenido (9)

| Constante | Nombre |
|-----------|--------|
| `FILTER` | `"filter"` |
| `SORT` | `"sort"` |
| `SEND` | `"send"` |
| `CLOUD` | `"cloud"` |
| `CLOUD_DOWNLOAD` | `"cloud_download"` |
| `CLOUD_UPLOAD` | `"cloud_upload"` |
| `LINK` | `"link"` |
| `FLAG` | `"flag"` |

### Comunicación (7)

| Constante | Nombre |
|-----------|--------|
| `EMAIL` | `"email"` |
| `PHONE` | `"phone"` |
| `CHAT` | `"chat"` |
| `NOTIFICATIONS` | `"notifications"` |
| `PERSON` | `"person"` |
| `GROUP` | `"group"` |
| `FORUM` | `"forum"` |

### Archivo (10)

| Constante | Nombre |
|-----------|--------|
| `FILE` | `"file"` |
| `FOLDER` | `"folder"` |
| `FOLDER_OPEN` | `"folder_open"` |
| `FILE_UPLOAD` | `"file_upload"` |
| `DOWNLOAD` | `"download"` |
| `UPLOAD` | `"upload"` |
| `ATTACH_FILE` | `"attach_file"` |
| `IMAGE` | `"image"` |
| `DESCRIPTION` | `"description"` |
| `PICTURE_AS_PDF` | `"picture_as_pdf"` |

### Dispositivo (6)

| Constante | Nombre |
|-----------|--------|
| `WIFI` | `"wifi"` |
| `BLUETOOTH` | `"bluetooth"` |
| `BATTERY_FULL` | `"battery_full"` |
| `SIGNAL` | `"signal"` |
| `LOCATION` | `"location"` |

### Editor (8)

| Constante | Nombre |
|-----------|--------|
| `CODE` | `"code"` |
| `FORMAT_BOLD` | `"format_bold"` |
| `FORMAT_ITALIC` | `"format_italic"` |
| `FORMAT_UNDERLINE` | `"format_underline"` |
| `FORMAT_LIST` | `"format_list"` |
| `FORMAT_SIZE` | `"format_size"` |
| `UNDO` | `"undo"` |
| `REDO` | `"redo"` |

### Hardware (5)

| Constante | Nombre |
|-----------|--------|
| `COMPUTER` | `"computer"` |
| `LAPTOP` | `"laptop"` |
| `PHONE_ANDROID` | `"phone_android"` |
| `TABLET` | `"tablet"` |
| `PRINTER` | `"printer"` |

### Imagen (4)

| Constante | Nombre |
|-----------|--------|
| `PHOTO` | `"photo"` |
| `CAMERA` | `"camera"` |
| `BRUSH` | `"brush"` |
| `PALETTE` | `"palette"` |

### Mapa (6)

| Constante | Nombre |
|-----------|--------|
| `PLACE` | `"place"` |
| `DIRECTIONS` | `"directions"` |
| `MAP` | `"map"` |
| `LOCAL_SHIPPING` | `"local_shipping"` |
| `RESTAURANT` | `"restaurant"` |
| `HOTEL` | `"hotel"` |

### Notificación (7)

| Constante | Nombre |
|-----------|--------|
| `INFO` | `"info"` |
| `WARNING` | `"warning"` |
| `ERROR` | `"error"` |
| `WARNING_AMBER` | `"warning_amber"` |
| `FEEDBACK` | `"feedback"` |
| `HELP` | `"help"` |
| `NEW_RELEASES` | `"new_releases"` |

### Lugar (7)

| Constante | Nombre |
|-----------|--------|
| `FAVORITE` | `"favorite"` |
| `FAVORITE_OUTLINE` | `"favorite_outline"` |
| `STAR` | `"star"` |
| `STAR_HALF` | `"star_half"` |
| `STAR_OUTLINE` | `"star_outline"` |
| `THUMB_UP` | `"thumb_up"` |
| `THUMB_DOWN` | `"thumb_down"` |

### Social (6)

| Constante | Nombre |
|-----------|--------|
| `SHARE_SOCIAL` | `"share_social"` |
| `PUBLIC` | `"public"` |
| `SCHOOL` | `"school"` |
| `WORK` | `"work"` |
| `CELEBRATION` | `"celebration"` |

### Toggle (6)

| Constante | Nombre |
|-----------|--------|
| `CHECK_BOX` | `"check_box"` |
| `CHECK_BOX_OUTLINE` | `"check_box_outline"` |
| `RADIO_BUTTON_CHECKED` | `"radio_button_checked"` |
| `RADIO_BUTTON_UNCHECKED` | `"radio_button_unchecked"` |
| `TOGGLE_ON` | `"toggle_on"` |
| `TOGGLE_OFF` | `"toggle_off"` |

### Fecha/Hora (4)

| Constante | Nombre |
|-----------|--------|
| `DATE` | `"date"` |
| `CALENDAR_TODAY` | `"calendar_today"` |
| `TIME` | `"time"` |
| `ALARM` | `"alarm"` |

### Comercio (5)

| Constante | Nombre |
|-----------|--------|
| `SHOPPING_CART` | `"shopping_cart"` |
| `PAYMENT` | `"payment"` |
| `ACCOUNT_BALANCE` | `"account_balance"` |
| `STORE` | `"store"` |
| `TRENDING_UP` | `"trending_up"` |

### Salud/Ciencia (2)

| Constante | Nombre |
|-----------|--------|
| `LOCAL_HOSPITAL` | `"local_hospital"` |
| `SCIENCE` | `"science"` |

## 3.3 Funciones helper

### `catalog::by_name`

```rust
/// Busca un icono en el catálogo por su nombre (inglés o español)
pub fn by_name(name: &str) -> Option<&'static MaterialIcon>
```

Soporta nombres en español: `"buscar"`, `"configuracion"`, `"atras"`, `"correo"`, `"usuario"`, etc.

### `catalog::fallback_emoji`

```rust
/// Obtiene un emoji de fallback para un nombre de icono
/// Usado cuando el icono no está en el catálogo
/// Fallback genérico: "❓"
pub fn fallback_emoji(name: &str) -> &'static str
```

### `icon_widget`

```rust
/// Crea un widget icono desde un nombre de icono
/// Busca en el catálogo. Si no existe, muestra emoji de fallback.
pub fn icon_widget(
    name: &str,          // "home", "favorite", "settings"
    size: f64,           // 24, 32, 48 píxeles
    color: RgbColor,     // Color del icono
) -> Box<AnyWidgetView<()>>
```

### `icon_widget_styled`

```rust
/// Crea un widget icono con estilo específico
pub fn icon_widget_styled(
    name: &str,          // "home", "favorite"
    size: f64,           // tamaño en píxeles
    color: RgbColor,     // color del icono
    style: IconStyle,    // filled, outlined, rounded, sharp, twotone
) -> Box<AnyWidgetView<()>>
```

#### Ejemplos

```rust
use forja_gui_rt::{icon_widget, icon_widget_styled, RgbColor, IconStyle, catalog};

// Icono simple
let home = icon_widget("home", 24.0, RgbColor(103, 80, 164));

// Icono con estilo
let fav = icon_widget_styled("favorite", 32.0, RgbColor::RED, IconStyle::Outlined);

// Buscar en catálogo
if let Some(icon) = catalog::by_name("settings") {
    let widget = icon.to_widget(48.0, RgbColor::PURPLE);
}

// Nombres en español
if let Some(icon) = catalog::by_name("buscar") {
    // icon.name == "search"
}

// Fallback a emoji
let unknown = icon_widget("xyz", 24.0, RgbColor::BLACK); // ❓

// Fallback emoji directo
assert_eq!(catalog::fallback_emoji("home"), "🏠");
assert_eq!(catalog::fallback_emoji("favorite"), "❤️");
assert_eq!(catalog::fallback_emoji("unknown"), "❓");
```

#### Ejemplo (Forja)

```forja
importar "gui"

funcion main() {
    fila(
        icono_material("home", 24, "primary"),
        icono_material("favorite", 32, "#FF0000", "outlined"),
        icono_material("settings", 48, "secondary"),
        icono_relleno("star", 24),
        icono_perfilado("thumb_up", 32),
    )
}
```

---

# 4. RE-EXPORTACIONES (`lib.rs`)

**Archivo:** [`crates/forja-gui-rt/src/lib.rs`](crates/forja-gui-rt/src/lib.rs:1)

## 4.1 Desde Xilem

### Views (widgets básicos)

```rust
pub use xilem::view::{
    button,            // Botón simple
    button_any_pointer, // Botón que acepta cualquier puntero
    checkbox,          // Casilla de verificación
    flex,              // Layout flexible (column/row con gap)
    grid,              // Grid layout
    image,             // Imagen
    indexed_stack,     // Stack con índice
    label,             // Etiqueta de texto
    portal,            // Contenedor con scroll/clipping
    progress_bar,      // Barra de progreso
    prose,             // Texto enriquecido (Markdown simple)
    sized_box,         // Caja con tamaño fijo
    slider,            // Deslizante
    spinner,           // Indicador de carga
    split,             // Panel dividido redimensionable
    text_button,       // Botón de texto
    text_input,        // Campo de texto
    variable_label,    // Etiqueta dinámica (se actualiza sola)
    virtual_scroll,    // Scroll virtualizado
    zstack,            // Stack en Z (superposición)
    Axis,              // Eje: Horizontal | Vertical
    GridParams,        // Parámetros de grid
    MainAxisAlignment, // Alineación en eje principal
    CrossAxisAlignment, // Alineación en eje transversal
};
```

### Core

```rust
pub use xilem::{
    AnyWidgetView,    // Tipo genérico para cualquier widget
    EventLoop,        // Bucle de eventos
    FontWeight,       // Peso de fuente (Xilem)
    TextAlign,        // Alineación de texto
    WidgetView,       // Trait para vistas/widgets
    WindowOptions,    // Opciones de ventana
    Xilem,            // Aplicación Xilem principal
};
```

### Color y estilo

```rust
pub use xilem::{
    Affine,           // Transformaciones afines (2D)
    Blob,             // Forma arbitraria
    Color,            // Color de Xilem (no confundir con RgbColor)
    ImageBrush,       // Pincel de imagen
    ImageFormat,      // Formato de imagen
    palette,          // Paleta de colores Xilem
};
```

### Core utilities

```rust
pub use xilem::core::{
    lens,             // Lente para acceso a datos anidados
    memoize,          // Memorización
    map_message,      // Mapeo de mensajes
    MessageResult,    // Resultado de mensaje
    MessageContext,   // Contexto de mensaje
    View,             // Trait View
    ViewMarker,       // Marker trait para View
    Mut,              // Mutabilidad
};
pub use xilem::ViewCtx; // Contexto de vista
```

### Layout y estilo

```rust
pub use xilem::masonry::properties::types::Length; // Longitud (dp, px, %)
pub use xilem::style::{Background, Style};          // Estilos CSS-like
```

### Ventana y resize

```rust
pub use xilem::masonry::dpi::LogicalSize;  // Tamaño lógico (independiente de DPI)
pub use xilem::winit::window::Window;       // Acceso a ventana nativa winit
pub use xilem::winit::error::EventLoopError; // Error del bucle de eventos
```

### Widgets personalizados (Masonry)

```rust
pub use xilem::Pod;   // Wrapper de widgets Masonry como WidgetView
pub use xilem::masonry::widgets;  // Módulo de widgets Masonry
pub use xilem::masonry::core::Widget;  // Trait Widget de Masonry
pub use xilem::masonry::core::{
    WidgetPod,        // Widget pointer
    WidgetMut,        // Widget mutable
    NoAction,         // Sin acción
    BoxConstraints,   // Restricciones de layout
    NewWidget,        // Nuevo widget
    ChildrenIds,      // IDs de hijos
    LayoutCtx,        // Contexto de layout
    RegisterCtx,      // Contexto de registro
    PaintCtx,         // Contexto de pintado
    AccessCtx,        // Contexto de accesibilidad
    PropertiesMut,    // Propiedades mutables
    PropertiesRef,    // Propiedades por referencia
    UpdateCtx,        // Contexto de actualización
    WidgetId,         // ID de widget
};
```

### Accesibilidad

```rust
pub use xilem::masonry::accesskit::{self, Node, Role};
// Node: nodo de accesibilidad
// Role: rol del nodo (button, text, slider, etc.)
```

### Renderizado y geometría

```rust
pub use xilem::masonry::vello::{self, Scene};  // Renderizador Vello
pub use xilem::masonry::kurbo::{Point, Size};   // Geometría 2D
```

## 4.2 Desde Theme

```rust
pub use theme::{
    // Tema principal
    MaterialTheme,    // Tema completo de la aplicación

    // Color
    ColorScheme,      // 27 color roles light/dark
    RgbColor,         // Color RGB con conversiones
    nombre_a_color,   // Convierte nombre español/inglés a RgbColor
    blend_colors,     // Mezcla dos colores

    // Tipografía
    TypeScale,        // 15 estilos tipográficos
    TextStyle,        // Estilo de texto individual
    FontWeight,       // Peso de fuente (Thin, Light, Regular, Medium, Bold)

    // Formas
    ShapeSystem,      // 7 niveles de esquinas
    ShapeFamily,      // Familia de componentes para formas
    corner_radius,    // Convierte dp a CornerRadius de Masonry

    // Elevación
    ElevationSystem,  // 6 niveles de sombra
    surface_at_elevation, // Superficie con elevación (dark mode)

    // Estado
    StateLayer,       // Overlays de estado visual (hover, focus, pressed)

    // Motion
    MotionSystem,     // Sistema de movimiento (curvas y duraciones)
    EasingCurve,      // Curva cubic-bezier
    TransitionType,   // Tipo de transición (Fade, SharedAxis, etc.)

    // Color dinámico HCT
    Hct,              // Espacio de color HCT (Monet engine)
    harmonize,        // Armoniza colores
    chroma_boost,     // Aumenta saturación

    // Sistema
    SystemTheme,      // Detección de tema del SO
    detect_system_theme, // Función de detección
    is_system_dark,   // ¿El SO está en modo oscuro?
};
```

### Animaciones

```rust
pub use theme::animation::{
    AnimationEngine,    // Motor de animaciones frame-by-frame
    AnimatedValue,      // Animación por interpolación
    SpringAnimation,    // Animación con física de resorte
    AnimationPresets,   // Presets para componentes Material You
    Animation,          // Trait para animaciones
    interpolate_color,  // Interpolación entre colores RGB
};
```

## 4.3 Desde Icons

```rust
pub use icons::{
    MaterialIcon,       // Icono vectorial Material Design
    IconStyle,          // Estilo del icono (filled, outlined, etc.)
    icon_widget,        // Crea widget icono desde nombre
    icon_widget_styled, // Crea widget icono con estilo específico
};
```

---

# 5. MAPEO FORJA → RUST

Cada función Forja en [`stdlib/gui/gui.fa`](stdlib/gui/gui.fa:1) llama a helpers en [`src/gui_nativa.rs`](src/gui_nativa.rs:1) que el transpilador convierte a código Rust que usa [`forja-gui-rt`](crates/forja-gui-rt/src/lib.rs:1).

## Layout

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `columna(hijos...)` | `flex(Axis::Vertical, hijos)` |
| `fila(hijos...)` | `flex(Axis::Horizontal, hijos)` |
| `pila(hijos...)` | `zstack(hijos)` |
| `desplazable(hijo)` | `portal(hijo)` |
| `caja_fija(hijo, ancho, alto)` | `sized_box(hijo).width(ancho).height(alto)` |
| `relleno(hijo, cant)` | `sized_box(hijo).padding(cant)` |
| `expansor(hijo)` | `sized_box(hijo).expand()` |
| `centrado(hijo)` | `sized_box(hijo).center()` |
| `separador()` | `sized_box().height(1).background(Color::GRAY)` |
| `espacio(t)` | `sized_box().height(t)` |
| `columna_con_gap(hijos, gap, align)` | `flex(Axis::Vertical, hijos).gap(gap).align(align)` |
| `fila_con_gap(hijos, gap, align)` | `flex(Axis::Horizontal, hijos).gap(gap).align(align)` |
| `flujo(hijos, gap)` | Flow layout con wrap |
| `caja_relativa(hijo, ratio)` | Aspect ratio box |
| `flex_layout(hijos, axis, gap, wrap)` | Flex layout configurable |
| `adaptable(chico, mediano, grande)` | Responsive layout (WindowSizeClass) |

## Tema Material You

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `tema_material(seed, hijo)` | ThemeProvider con seed color |
| `color_primario(hijo)` | Aplica `scheme.primary` al hijo |
| `color_sobre_primario(hijo)` | Aplica `scheme.on_primary` |
| `color_secundario(hijo)` | Aplica `scheme.secondary` |
| `color_terciario(hijo)` | Aplica `scheme.tertiary` |
| `color_error(hijo)` | Aplica `scheme.error` |
| `color_superficie(hijo)` | Aplica `scheme.surface` |
| `color_fondo(hijo)` | Aplica `scheme.background` |
| `color_perfil(hijo)` | Aplica `scheme.outline` |

## Tipografía

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `texto_grande(t)` | `label(t).font_size(57.0).weight(Regular)` |
| `texto_mediano(t)` | `label(t).font_size(45.0).weight(Regular)` |
| `texto_pequeño(t)` | `label(t).font_size(36.0).weight(Regular)` |
| `titular_grande(t)` | `label(t).font_size(32.0).weight(Regular)` |
| `titular_mediano(t)` | `label(t).font_size(28.0).weight(Regular)` |
| `titular_pequeño(t)` | `label(t).font_size(24.0).weight(Regular)` |
| `encabezado_grande(t)` | `label(t).font_size(22.0).weight(Regular)` |
| `encabezado_mediano(t)` | `label(t).font_size(16.0).weight(Medium)` |
| `encabezado_pequeño(t)` | `label(t).font_size(14.0).weight(Medium)` |
| `cuerpo_grande(t)` | `label(t).font_size(16.0).weight(Regular)` |
| `cuerpo_mediano(t)` | `label(t).font_size(14.0).weight(Regular)` |
| `cuerpo_pequeño(t)` | `label(t).font_size(12.0).weight(Regular)` |
| `etiqueta_grande(t)` | `label(t).font_size(14.0).weight(Medium)` → **Botón** |
| `etiqueta_mediana(t)` | `label(t).font_size(12.0).weight(Medium)` → **Chip** |
| `etiqueta_pequeña(t)` | `label(t).font_size(11.0).weight(Medium)` |

## Formas y Elevación

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `esquinas_pequeñas(hijo)` | Aplica `corner_radius(4.0)` |
| `esquinas_medianas(hijo)` | Aplica `corner_radius(12.0)` |
| `esquinas_grandes(hijo)` | Aplica `corner_radius(16.0)` |
| `esquinas_completas(hijo)` | Aplica `corner_radius(50%)` |
| `sombra(hijo, nivel)` | Aplica `ElevationSystem.shadow_for_level(nivel)` |

## Botones Material Design 3

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `boton_relleno(texto, cb)` | `MaterialButton { variant: Filled }` |
| `boton_tonal(texto, cb)` | `MaterialButton { variant: Tonal }` |
| `boton_perfilado(texto, cb)` | `MaterialButton { variant: Outlined }` |
| `boton_texto(texto, cb)` | `MaterialButton { variant: Text }` |
| `boton_elevado(texto, cb)` | `MaterialButton { variant: Elevated }` |
| `fab(icono, cb)` | `FAB { size: Medium }` |
| `fab_pequeño(icono, cb)` | `FAB { size: Small }` |
| `fab_grande(icono, cb)` | `FAB { size: Large }` |
| `fab_extendido(texto, icono, cb)` | `FAB { extended: Some(texto) }` |
| `boton_icono(icono, cb)` | `IconButton { variant: Standard }` |
| `boton_icono_relleno(icono, cb)` | `IconButton { variant: Filled }` |
| `boton_icono_tonal(icono, cb)` | `IconButton { variant: Tonal }` |
| `boton_icono_perfilado(icono, cb)` | `IconButton { variant: Outlined }` |
| `segmentado(opciones, sel, cb)` | `SegmentedButton { multiple: false }` |
| `segmentado_multiple(opciones, sel, cb)` | `SegmentedButton { multiple: true }` |
| `subconjunto_asistente(texto, cb)` | `Chip { variant: Assist }` |
| `subconjunto_filtro(texto, activo, cb)` | `Chip { variant: Filter }` |
| `subconjunto_entrada(texto, cb)` | `Chip { variant: Input }` |
| `subconjunto_sugerencia(texto, cb)` | `Chip { variant: Suggestion }` |

## Inputs

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `campo_texto(var, label)` | `MaterialTextField { variant: Filled }` |
| `campo_perfilado(var, label)` | `MaterialTextField { variant: Outlined }` |
| `campo_texto_error(var, label, error)` | `MaterialTextField { error: msg }` |
| `campo_contraseña(var, label)` | `MaterialPasswordField` |
| `campo_numero(var, label, min, max)` | `MaterialNumberField` |
| `campo_busqueda(var)` | `MaterialSearchField` |
| `campo_email(var, label)` | `MaterialTextField { placeholder: "email@ejemplo.com" }` |
| `campo_telefono(var, label)` | `MaterialTextField { placeholder: "+54 11..." }` |
| `campo_url(var, label)` | `MaterialTextField { placeholder: "https://" }` |
| `contraer_desplegable(opts, sel)` | `MaterialDropdown` |
| `menu_seleccion(opts, sel, label)` | `MaterialSelect` |
| `autocompletar(opts, var)` | `MaterialAutocomplete` |
| `grupo_radio(opts, sel, cb)` | `MaterialRadioGroup` |
| `interruptor(label, var)` | `MaterialSwitch` |
| `deslizante_discreto(var, min, max, steps)` | `MaterialSliderDiscrete` |
| `deslizante_rango(v1, v2, min, max)` | `MaterialSliderRange` |
| `grupo_subconjuntos(chips, sel, cb)` | `MaterialChipGroup` |
| `selector_fecha(var)` | `MaterialDatePicker` |
| `selector_hora(var)` | `MaterialTimePicker` |
| `selector_color(var)` | `MaterialTextField { placeholder: "#RRGGBB" }` |

## Tarjetas, Listas y Tablas

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `tarjeta(hijo)` | `MaterialCard { variant: Filled }` |
| `tarjeta_elevada(hijo)` | `MaterialCard { variant: Elevated }` |
| `tarjeta_perfilada(hijo)` | `MaterialCard { variant: Outlined }` |
| `tarjeta_seleccionable(hijo, var)` | `MaterialCard { variant: Selectable }` |
| `elemento_lista(leading, titulo, trailing)` | `MaterialListItem` |
| `elemento_lista_doble(leading, titulo, sub, trailing)` | `MaterialListItem { subtitulo }` |
| `lista(items)` | `MaterialList` |
| `lista_con_dividores(items)` | `MaterialList { dividers: true }` |
| `lista_control(items, tipo, vars)` | `MaterialListControl` |
| `lista_seleccion(items, sel, cb)` | `MaterialListSelection` |
| `tabla_datos(cols, filas)` | `MaterialDataTable` |
| `tabla_ordenable(cols, filas)` | `MaterialDataTable { ordenable: true }` |
| `tabla_seleccion(cols, filas)` | `MaterialDataTable { seleccionable: true }` |
| `superficie(hijo)` | `MaterialSurface { color_role: "surface" }` |
| `superficie_tonal(hijo)` | `MaterialSurface { color_role: "tonal" }` |
| `andamio(top, body, bottom)` | `MaterialScaffold` |

## Feedback

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `dialogo_alerta(titulo, msg)` | `DialogAlert` |
| `dialogo_confirmacion(titulo, msg, cb_ok, cb_cancel)` | `DialogAlert { on_confirm, on_cancel }` |
| `dialogo_personalizado(titulo, hijo)` | `DialogCustom` |
| `dialogo_completo(titulo, hijo)` | `DialogCustom (fullscreen)` |
| `hoja_inferior(hijo, visible)` | `BottomSheet { variant: Standard }` |
| `hoja_inferior_modal(hijo, visible)` | `BottomSheet { variant: Modal }` |
| `hoja_inferior_grande(hijo, visible)` | `BottomSheet { variant: Expanded }` |
| `notificación(mensaje)` | `Snackbar { duracion: 3000 }` |
| `notificación_accion(msg, txt, cb)` | `Snackbar { accion_texto, accion_callback }` |
| `información(hijo, texto)` | `Tooltip { texto }` |
| `menú_desplegable(opts, sel, cb)` | `Menu` |
| `menu_contexto(opts, sel, cb)` | `ContextMenu` |

## Navegación

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `barra_navegacion(items, sel, cb)` | `NavigationBar` |
| `riel_navegacion(items, sel, cb)` | `NavigationRail` |
| `cajon_navegacion(items, sel, cb)` | `NavigationDrawer` |
| `cajon_modal(items, sel, cb, visible)` | `NavigationDrawer { modal: true }` |
| `barra_superior(titulo, acciones)` | `TopAppBar { variant: Small }` |
| `barra_superior_media(titulo)` | `TopAppBar { variant: Medium }` |
| `barra_superior_grande(titulo)` | `TopAppBar { variant: Large }` |
| `barra_inferior(acciones)` | `BottomAppBar` |
| `pestañas(tabs, sel, cb)` | `Tabs` |
| `pestañas_desplazables(tabs, sel, cb)` | `Tabs { scrollable: true }` |
| `barra_busqueda(placeholder, var)` | `SearchBar` |
| `item_navegacion(icono, label)` | `NavItem { icono, label }` |

## Indicadores

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `barra_progreso(var)` | `LinearProgress { variable: var }` |
| `barra_progreso_indeterminada()` | `LinearProgress { indeterminado: true }` |
| `circulo_progreso(var)` | `CircularProgress { variable: var }` |
| `circulo_progreso_indeterminado()` | `CircularProgress { indeterminado: true }` |
| `distintivo(hijo, num)` | `Badge { valor: Some(num) }` |
| `distintivo_punto(hijo)` | `Badge { dot: true }` |
| `esqueleto(ancho, alto)` | `Skeleton` |
| `esqueleto_tarjeta()` | `Skeleton { tipo: "card" }` |
| `esqueleto_linea()` | `Skeleton { tipo: "line" }` |
| `estado_vacio(icono, msg)` | `EmptyState` |
| `estado_error(msg)` | `ErrorState` |

## Avatares

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `avatar(texto)` | `Avatar { variant: Text }` |
| `avatar_icono(icono)` | `Avatar { variant: Icon }` |
| `avatar_imagen(ruta)` | `Avatar { variant: Image }` |
| `grupo_avatar(avatares)` | `AvatarGroup` |

## Motion

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `transición(hijo, visible)` | `FadeTransition` |
| `efecto_onda(hijo)` | `RippleEffect` |

## Gráficos

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `gráfico_linea(datos, etiquetas...)` | `LineChart` |
| `gráfico_barras(datos, etiquetas..., colores...)` | `BarChart` |
| `gráfico_pastel(datos, etiquetas...)` | `PieChart` |
| `gráfico_donut(datos, etiquetas...)` | `PieChart { donut: true }` |
| `gráfico_indicador(valor, min, max)` | `GaugeChart` |
| `minigráfico(datos)` | `Sparkline` |

## Avanzados

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `calificación(valor, max, cb)` | `StarRating` |
| `asistente_pasos(pasos, actual, cb)` | `Stepper` |
| `migaja_de_pan(items)` | `Breadcrumbs` |
| `calendario(mes, año, cb)` | `Calendar` |
| `visor_markdown(texto)` | `MarkdownViewer` |
| `visor_qr(texto, tamaño)` | `QRCode` |
| `selector_archivo(tipos, multiple, cb)` | `FilePicker` |

## Expressive

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `tarjeta_vidrio(hijo, blur, opacity)` | `GlassCard` |
| `gradiente_lineal(hijo, colores)` | `GradientBox { direccion: "lineal" }` |
| `gradiente_radial(hijo, colores)` | `GradientBox { direccion: "radial" }` |
| `boton_morphing(icono, texto, cb)` | `MorphingButton` |
| `fondo_expresivo(colores)` | `ExpressiveBackground` |
| `efecto_brillo(hijo, color, ancho)` | `GlowBorder` |

## Iconos Material

| Forja | Rust (forja-gui-rt) |
|-------|-------------------|
| `icono_material(nombre, tamaño, color)` | `icon_widget(nombre, tamaño, color)` |
| `icono_material(nombre, tamaño, color, estilo)` | `icon_widget_styled(nombre, tamaño, color, estilo)` |
| `icono_relleno(nombre, tamaño)` | `icon_widget(nombre, tamaño, color).with_style(Filled)` |
| `icono_perfilado(nombre, tamaño)` | `icon_widget_styled(nombre, tamaño, color, Outlined)` |
| `icono_redondo(nombre, tamaño)` | `icon_widget_styled(nombre, tamaño, color, Rounded)` |
| `icono_agudo(nombre, tamaño)` | `icon_widget_styled(nombre, tamaño, color, Sharp)` |
| `icono_dos_tonos(nombre, tamaño)` | `icon_widget_styled(nombre, tamaño, color, TwoTone)` |

---

# 6. EJEMPLOS COMPLETOS

## 6.1 Tema personalizado en Rust

```rust
use forja_gui_rt::{
    MaterialTheme, ColorScheme, RgbColor, TypeScale,
    ShapeSystem, ShapeFamily, ElevationSystem, StateLayer,
};

fn main() {
    // ===== CREAR TEMA =====
    let theme = MaterialTheme::from_seed("#FF5722", false); // naranja, modo claro

    // ===== ACCEDER A COLORES =====
    let bg = theme.scheme.surface;         // #FFFBFE
    let text = theme.scheme.on_surface;     // #1C1B1F
    let primary = theme.scheme.primary;     // naranja derivado del seed
    let secondary = theme.scheme.secondary;
    let error = theme.scheme.error;

    // ===== TIPOGRAFÍA =====
    let title_style = theme.typography.apply("headline_medium");
    // TextStyle { font_size: 28.0, line_height: 36.0, tracking: 0.0, weight: Regular }
    let button_style = theme.typography.apply("label_large");
    // TextStyle { font_size: 14.0, line_height: 20.0, tracking: 0.1, weight: Medium }

    // ===== FORMAS =====
    let card_radius = theme.shapes.for_family(ShapeFamily::Container); // 12.0
    let btn_radius = theme.shapes.for_family(ShapeFamily::Button);     // 20.0

    // ===== ELEVACIÓN =====
    let level3 = theme.elevation.get(3); // 6.0 dp
    let shadow = theme.elevation.shadow_for_level(3);

    // ===== ESTADOS =====
    let states = StateLayer::default();
    let hover = states.hover_color(primary);
    let disabled = states.disabled_color(primary);

    // ===== CAMBIAR MODO =====
    let dark = theme.toggle_dark_mode();
    assert_eq!(dark.is_dark, true);
    assert_eq!(dark.seed_color, theme.seed_color);

    // ===== CAMBIAR COLOR SEMILLA =====
    let blue_theme = theme.with_seed("#2196F3");
    assert_eq!(blue_theme.seed_color, "#2196F3");
    assert_eq!(blue_theme.is_dark, theme.is_dark);

    // ===== TEMA SISTEMA =====
    let system = MaterialTheme::system("#6750A4");
    // Detecta automáticamente claro/oscuro del SO
}
```

## 6.2 Animación en Rust

```rust
use forja_gui_rt::{
    AnimationEngine, AnimatedValue, SpringAnimation,
    AnimationPresets, EasingCurve, EASE_STANDARD, EASE_EXPRESSIVE,
    interpolate_color, RgbColor,
};

fn main() {
    // --- Motor de animaciones ---
    let mut engine = AnimationEngine::new();

    // --- AnimatedValue simple ---
    let mut fade = AnimatedValue::new(0.0, 1.0, 300.0); // 0 → 1 en 300ms
    fade.update(16.6); // ~1 frame a 60fps
    println!("Progreso: {:.3}, Valor: {:.3}", fade.progreso, fade.valor_actual);

    // --- Con curva personalizada ---
    let mut bounce = AnimatedValue::new(0.0, 100.0, 500.0)
        .with_curve(EASE_EXPRESSIVE); // con overshoot!
    bounce.update(250.0);
    println!("Valor con overshoot: {}", bounce.valor_actual);
    // Puede ser > 100.0 temporalmente por el overshoot

    // --- Loop (spinner) ---
    let mut spinner = AnimatedValue::new(0.0, 360.0, 800.0)
        .with_curve(EASE_STANDARD)
        .with_loop();
    spinner.update(1600.0); // 2 ciclos completos
    assert!(spinner.jugando); // sigue activo

    // --- Yoyo ---
    let mut yoyo = AnimatedValue::new(0.0, 100.0, 500.0)
        .with_loop()
        .with_yoyo();
    yoyo.update(500.0); // completa ciclo, invierte desde↔hasta
    assert_eq!(yoyo.desde, 100.0); // ahora va de 100 → 0
    assert_eq!(yoyo.hasta, 0.0);

    // --- Spring ---
    let mut spring = SpringAnimation::new(100.0);
    spring.posicion = 0.0;
    for _ in 0..120 { // ~2 segundos a 60fps
        spring.update(16.6);
        if spring.is_settled() { break; }
    }
    println!("Spring final: {:.2} (objetivo: {})", spring.posicion, spring.objetivo);

    // --- Spring con parámetros personalizados ---
    let mut custom_spring = SpringAnimation::new(200.0)
        .with_masa(2.0)      // más masa = más lento
        .with_rigidez(300.0) // más rígido = más rápido
        .with_amortiguacion(30.0); // más amortiguación = menos rebote
    custom_spring.posicion = 0.0;
    custom_spring.update(16.6);
    custom_spring.set_objetivo(150.0); // cambia el objetivo dinámicamente

    // --- Presets ---
    let ripple = AnimationPresets::button_ripple();       // 150ms emphasized
    let hover = AnimationPresets::button_hover();          // 100ms standard
    let card = AnimationPresets::card_elevate();           // 200ms standard
    let page = AnimationPresets::page_transition();        // 300ms emphasized
    let container = AnimationPresets::container_transform(); // 350ms emphasized
    let spin = AnimationPresets::spinner_loop();           // 800ms loop
    let fade_in = AnimationPresets::expressive_fade();     // 450ms expressive
    let morph = AnimationPresets::expressive_morph();      // 500ms expressive

    // --- Interpolar colores ---
    let rojo = RgbColor(255, 0, 0);
    let azul = RgbColor(0, 0, 255);
    let t = 0.5; // 50%
    let violeta = interpolate_color(rojo, azul, t);
    assert_eq!(violeta, RgbColor(127, 0, 127));

    // Interpolar usando el progreso de una animación
    let mut anim = AnimatedValue::new(0.0, 1.0, 1000.0);
    anim.update(500.0); // 50%
    let color_animado = interpolate_color(rojo, azul, anim.valor_actual);
}
```

## 6.3 Iconos en Rust

```rust
use forja_gui_rt::{
    icon_widget, icon_widget_styled,
    RgbColor, IconStyle, catalog,
};

fn crear_iconos() {
    // Icono simple con color primary
    let home = icon_widget("home", 24.0, RgbColor(103, 80, 164));

    // Icono outlined rojo
    let fav = icon_widget_styled("favorite", 32.0, RgbColor::RED, IconStyle::Outlined);

    // Icono grande settings en morado
    let settings = icon_widget("settings", 48.0, RgbColor::PURPLE);

    // Buscar en catálogo
    if let Some(icon) = catalog::by_name("search") {
        let widget = icon.to_widget(24.0, RgbColor::BLUE);
    }

    // Nombres en español
    if let Some(icon) = catalog::by_name("buscar") {
        assert_eq!(icon.name, "search");
    }

    // Fallback a emoji si no existe
    let unknown = icon_widget("no_existe", 24.0, RgbColor::BLACK); // ❓
}

fn iconos_por_categoria() {
    use forja_gui_rt::catalog;

    // Navegación
    let _home = catalog::by_name("home");
    let _search = catalog::by_name("search");
    let _settings = catalog::by_name("settings");

    // Acción
    let _add = catalog::by_name("add");
    let _delete = catalog::by_name("delete");
    let _save = catalog::by_name("save");

    // Social
    let _fav = catalog::by_name("favorite");
    let _star = catalog::by_name("star");
    let _thumb = catalog::by_name("thumb_up");

    // Archivo
    let _file = catalog::by_name("file");
    let _folder = catalog::by_name("folder");
    let _download = catalog::by_name("download");
}
```

## 6.4 Ejemplo completo en Forja

```forja
importar "gui"

# Tema: forja-gui --tema #FF5722 --dark ejemplo.fa

funcion accion() {
    mostrar("¡Botón presionado!")
}

funcion main() {
    columna(
        tema_material("#6750A4",
            columna(
                # Header con icono
                fila(
                    icono_material("settings", 32, "primary"),
                    texto_grande("Mi App")
                ),

                # Separador
                separador(),

                # Tarjetas con colores del tema
                color_primario_contenedor(
                    esquinas_medianas(
                        tarjeta(
                            columna(
                                titular_mediano("Bienvenido"),
                                cuerpo_mediano("Esta es una aplicación Material You"),
                                boton_relleno("Click aquí", &accion),
                            )
                        )
                    )
                ),

                # Inputs Material
                campo_texto("nombre", "Nombre"),
                campo_texto("email", "Email"),

                # Botones variantes
                fila(
                    boton_relleno("Guardar", &accion),
                    boton_perfilado("Cancelar", &accion),
                    boton_texto("Ayuda", &accion),
                ),

                # Iconos
                fila(
                    icono_material("home", 24, "primary"),
                    icono_material("favorite", 24, "error", "outlined"),
                    icono_material("settings", 24, "secondary"),
                ),

                # Badge
                distintivo(
                    icono_material("notifications", 24, "on_surface"),
                    "3"
                ),
            )
        )
    )
}
```

## 6.5 App completa con tema dinámico

```rust
use forja_gui_rt::MaterialTheme;

fn main() {
    // Detectar preferencia del sistema
    let theme = if forja_gui_rt::is_system_dark() {
        MaterialTheme::dark()
    } else {
        MaterialTheme::light()
    };

    println!("Tema: {} (dark={})", theme.seed_color, theme.is_dark);
    println!("Primary: {}", theme.scheme.primary);
    println!("Surface: {}", theme.scheme.surface);
    println!("Body font: {}sp", theme.typography.body_medium.font_size);

    // Alternativamente:
    let auto = MaterialTheme::system("#FF5722");
    // Detecta automáticamente
}
```

---

# 7. REFERENCIA RÁPIDA

| Tipo | Archivo | Propósito |
|------|---------|-----------|
| [`MaterialTheme`](crates/forja-gui-rt/src/theme/mod.rs:33) | `theme/mod.rs` | Tema completo de la aplicación |
| [`ColorScheme`](crates/forja-gui-rt/src/theme/scheme.rs:11) | `theme/scheme.rs` | 27 color roles light/dark |
| [`RgbColor`](crates/forja-gui-rt/src/theme/color.rs:8) | `theme/color.rs` | Color RGB con conversiones a hex, HCT, Xilem |
| [`nombre_a_color`](crates/forja-gui-rt/src/theme/color.rs:132) | `theme/color.rs` | Convierte nombre español a RgbColor |
| [`blend_colors`](crates/forja-gui-rt/src/theme/color.rs:153) | `theme/color.rs` | Mezcla dos colores con proporción t |
| [`TonalPalette`](crates/forja-gui-rt/src/theme/palette.rs:14) | `theme/palette.rs` | Paleta tonal de 13 tonos |
| [`Palettes`](crates/forja-gui-rt/src/theme/palette.rs:59) | `theme/palette.rs` | 5 paletas tonales (primary, secondary, tertiary, neutral, neutral_variant) |
| [`TypeScale`](crates/forja-gui-rt/src/theme/typography.rs:62) | `theme/typography.rs` | 15 estilos tipográficos Material You |
| [`TextStyle`](crates/forja-gui-rt/src/theme/typography.rs:42) | `theme/typography.rs` | Estilo individual (font_size, line_height, tracking, weight) |
| [`FontWeight`](crates/forja-gui-rt/src/theme/typography.rs:8) | `theme/typography.rs` | Thin=100, Light=300, Regular=400, Medium=500, Bold=700 |
| [`ShapeSystem`](crates/forja-gui-rt/src/theme/shape.rs:8) | `theme/shape.rs` | 7 niveles de esquinas (0 a 28dp + full) |
| [`ShapeFamily`](crates/forja-gui-rt/src/theme/shape.rs:55) | `theme/shape.rs` | Mapea componente a radio (Surface→8dp, Button→20dp, etc.) |
| [`corner_radius`](crates/forja-gui-rt/src/theme/shape.rs:88) | `theme/shape.rs` | Convierte dp a CornerRadius de Masonry |
| [`ElevationSystem`](crates/forja-gui-rt/src/theme/elevation.rs:10) | `theme/elevation.rs` | 6 niveles de elevación (0, 1, 3, 6, 8, 12 dp) |
| [`Shadow`](crates/forja-gui-rt/src/theme/elevation.rs:86) | `theme/elevation.rs` | Configuración de sombra (offset, blur, spread, color) |
| [`surface_at_elevation`](crates/forja-gui-rt/src/theme/elevation.rs:128) | `theme/elevation.rs` | Superficie con overlay de elevación (dark mode) |
| [`StateLayer`](crates/forja-gui-rt/src/theme/state.rs:11) | `theme/state.rs` | Opacidades: hover=8%, focus=12%, pressed=12%, dragged=16%, disabled=38% |
| [`MotionSystem`](crates/forja-gui-rt/src/theme/motion.rs:184) | `theme/motion.rs` | 9 duraciones + 5 curvas easing |
| [`EasingCurve`](crates/forja-gui-rt/src/theme/motion.rs:8) | `theme/motion.rs` | Curva cubic-bezier (x1,y1,x2,y2) |
| [`TransitionType`](crates/forja-gui-rt/src/theme/motion.rs:227) | `theme/motion.rs` | Fade, SharedAxisX/Y/Z, FadeThrough, ContainerTransform |
| [`Hct`](crates/forja-gui-rt/src/theme/dynamic_color.rs:15) | `theme/dynamic_color.rs` | Color HCT (Monet engine) |
| [`harmonize`](crates/forja-gui-rt/src/theme/dynamic_color.rs:182) | `theme/dynamic_color.rs` | Armoniza color de diseño con color fuente |
| [`chroma_boost`](crates/forja-gui-rt/src/theme/dynamic_color.rs:205) | `theme/dynamic_color.rs` | Aumenta saturación (factor 1.3x) |
| [`SystemTheme`](crates/forja-gui-rt/src/theme/system_theme.rs:8) | `theme/system_theme.rs` | Light, Dark, Unknown |
| [`detect_system_theme`](crates/forja-gui-rt/src/theme/system_theme.rs:15) | `theme/system_theme.rs` | Detecta tema del SO (Windows reg, Linux gsettings, macOS defaults) |
| [`is_system_dark`](crates/forja-gui-rt/src/theme/system_theme.rs:35) | `theme/system_theme.rs` | ¿Sistema en modo oscuro? |
| [`AnimationEngine`](crates/forja-gui-rt/src/theme/animation.rs:34) | `theme/animation.rs` | Motor frame-by-frame para animaciones |
| [`AnimatedValue`](crates/forja-gui-rt/src/theme/animation.rs:121) | `theme/animation.rs` | Interpolación desde→hasta con easing |
| [`SpringAnimation`](crates/forja-gui-rt/src/theme/animation.rs:276) | `theme/animation.rs` | Física de resorte (masa, rigidez, amortiguación) |
| [`AnimationPresets`](crates/forja-gui-rt/src/theme/animation.rs:375) | `theme/animation.rs` | 8 presets (ripple, hover, card, page, container, spinner, fade, morph) |
| [`interpolate_color`](crates/forja-gui-rt/src/theme/animation.rs:472) | `theme/animation.rs` | Interpola linealmente entre dos RgbColor |
| [`MaterialIcon`](crates/forja-gui-rt/src/icons.rs:61) | `icons.rs` | Icono vectorial Material Design |
| [`IconStyle`](crates/forja-gui-rt/src/icons.rs:21) | `icons.rs` | Filled, Outlined, Rounded, Sharp, TwoTone |
| [`icon_widget`](crates/forja-gui-rt/src/icons.rs:668) | `icons.rs` | Crea widget icono desde nombre |
| [`catalog::by_name`](crates/forja-gui-rt/src/icons.rs:435) | `icons.rs` | Busca icono por nombre (inglés/español) |
| [`catalog::fallback_emoji`](crates/forja-gui-rt/src/icons.rs:581) | `icons.rs` | Emoji de fallback para icono |

---

*Documentación generada a partir del código fuente de [`forja-gui-rt`](crates/forja-gui-rt/).*
*Última actualización: Julio 2026*
