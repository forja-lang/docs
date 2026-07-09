# 🎨 Sistema de Tema Material You

El sistema de tema implementa **Material Design 3 (Material You)** con:
- **Colores dinámicos**: Algoritmo Monet que genera una paleta de 13 tonos desde un color semilla usando el espacio de color HCT (Hue, Chroma, Tone)
- **Tipografía**: 15 estilos tipográficos (Display, Headline, Title, Body, Label)
- **Formas**: 7 niveles de border-radius predefinidos
- **Elevación**: 6 niveles de sombra (0-5)
- **Estados**: Opacidades para hover, focus, pressed, disabled

## 🖌️ Colores

El sistema de color **Monet** genera una paleta completa desde un color semilla.
Usa el espacio de color **HCT** (Hue, Chroma, Tone) desarrollado por Google.

### Color Roles (13+ roles)

| Role | Light (#6750A4) | Dark (#6750A4) | Uso típico |
|------|-----------------|----------------|------------|
| `primary` | `#6750A4` | `#D0BCFF` | Botones rellenos, FAB, switch activo |
| `on_primary` | `#FFFFFF` | `#371E73` | Texto/icono sobre primary |
| `primary_container` | `#EADDFF` | `#4F378B` | Botones tonales, chips activos |
| `on_primary_container` | `#21005D` | `#EADDFF` | Texto sobre primary_container |
| `secondary` | `#625B71` | `#CCC2DC` | Botones perfilados, iconos |
| `on_secondary` | `#FFFFFF` | `#322F35` | Texto sobre secondary |
| `secondary_container` | `#E8DEF8` | `#4A4458` | Chips filtro activos, tonal surface |
| `on_secondary_container` | `#1D192B` | `#E8DEF8` | Texto sobre secondary_container |
| `tertiary` | `#7D5260` | `#EFB8C8` | Acentos terciarios |
| `on_tertiary` | `#FFFFFF` | `#492532` | Texto sobre tertiary |
| `tertiary_container` | `#FFD8E4` | `#633B48` | Fondos terciarios |
| `on_tertiary_container` | `#31111D` | `#FFD8E4` | Texto sobre tertiary_container |
| `error` | `#B3261E` | `#F2B8B5` | Errores, campos inválidos |
| `on_error` | `#FFFFFF` | `#601410` | Texto sobre error |
| `error_container` | `#F9DEDC` | `#8C1D18` | Fondo de error |
| `on_error_container` | `#410E0B` | `#F9DEDC` | Texto sobre error_container |
| `surface` | `#FFFBFE` | `#1C1B1F` | Fondo de tarjetas, superficies |
| `on_surface` | `#1C1B1F` | `#E6E1E5` | Texto principal sobre surface |
| `surface_variant` | `#E7E0EC` | `#49454F` | Fondo de textfield filled |
| `on_surface_variant` | `#49454F` | `#CAC4D0` | Texto secundario |
| `background` | `#FFFBFE` | `#1C1B1F` | Fondo de ventana |
| `on_background` | `#1C1B1F` | `#E6E1E5` | Texto sobre background |
| `outline` | `#79747E` | `#938F99` | Bordes de botones perfilados |
| `outline_variant` | `#C4C7C5` | `#49454F` | Bordes de cards perfiladas |
| `inverse_surface` | `#313033` | `#E6E1E5` | Superficie inversa |
| `inverse_on_surface` | `#F4EFF4` | `#313033` | Texto sobre inverse surface |
| `inverse_primary` | `#D0BCFF` | `#6750A4` | Primary inverso |

### Personalizar tema

```bash
# Color semilla personalizado (naranja)
forja-gui --tema #FF5722 ejemplo.fa

# Tema oscuro con color personalizado
forja-gui --dark --tema #004D40 ejemplo.fa

# Auto-detectar tema del sistema
forja-gui --auto-tema ejemplo.fa
```

También puedes usar nombres de color en español:
```bash
forja-gui --tema rojo ejemplo.fa
forja-gui --tema azul ejemplo.fa
forja-gui --tema verde ejemplo.fa
```

### En código

```forja
tema_material("#FF5722", 
    columna(
        color_primario(boton_relleno("Primario", &cb)),
        color_secundario(boton_tonal("Secundario", &cb)),
        color_error(texto_mediano("Error message"))
    )
)
```

## 🔤 Tipografía

15 estilos tipográficos de Material Design 3:

| Estilo Forja | Estilo MD3 | Tamaño | Leading | Weight | Tracking | Uso |
|-------------|------------|--------|---------|--------|----------|-----|
| `texto_grande()` | `display_large` | 57sp | 64sp | 400 | -0.25 | Títulos decorativos grandes |
| `texto_mediano()` | `display_medium` | 45sp | 52sp | 400 | 0 | Títulos decorativos |
| `texto_pequeño()` | `display_small` | 36sp | 44sp | 400 | 0 | Títulos decorativos pequeños |
| `titular_grande()` | `headline_large` | 32sp | 40sp | 400 | 0 | Encabezados de sección |
| `titular_mediano()` | `headline_medium` | 28sp | 36sp | 400 | 0 | Subtítulos grandes |
| `titular_pequeño()` | `headline_small` | 24sp | 32sp | 400 | 0 | Subtítulos |
| `encabezado_grande()` | `title_large` | 22sp | 28sp | 400 | 0 | Títulos de tarjeta |
| `encabezado_mediano()` | `title_medium` | 16sp | 24sp | 500 | 0.15 | Títulos de sección pequeños |
| `encabezado_pequeño()` | `title_small` | 14sp | 20sp | 500 | 0.1 | Subtítulos de lista |
| `cuerpo_grande()` | `body_large` | 16sp | 24sp | 400 | 0.5 | Texto general largo |
| `cuerpo_mediano()` | `body_medium` | 14sp | 20sp | 400 | 0.25 | Texto general |
| `cuerpo_pequeño()` | `body_small` | 12sp | 16sp | 400 | 0.4 | Texto auxiliar |
| `etiqueta_grande()` | `label_large` | 14sp | 20sp | 500 | 0.1 | Botones, etiquetas |
| `etiqueta_mediana()` | `label_medium` | 12sp | 16sp | 500 | 0.5 | Chips, badgets |
| `etiqueta_pequeña()` | `label_small` | 11sp | 16sp | 500 | 0.5 | Texto muy pequeño |

### Uso en código

```forja
texto_grande("Display Large Text")
titular_mediano("Headline Medium")
encabezado_grande("Title Large")
cuerpo_mediano("Body Medium text for paragraphs")
etiqueta_grande("Label Large")
```

## ⬜ Formas (Shape)

| Nivel | Valor | Función Forja | Aplicación típica |
|-------|-------|---------------|-------------------|
| `none` | 0dp | `esquinas_pequeñas()` | NavigationBar |
| `extra_small` | 4dp | — | TextField |
| `small` | 8dp | `esquinas_pequeñas()` | Chips, Tooltip, Badge |
| `medium` | 12dp | `esquinas_medianas()` | Cards, Dialog |
| `large` | 16dp | `esquinas_grandes()` | BottomSheet, FAB |
| `extra_large` | 28dp | — | Modal |
| `full` | 50% | `esquinas_completas()` | Botones, FAB small, Avatar |

### Uso en código

```forja
esquinas_medianas(tarjeta(
    texto_mediano("Card con bordes redondeados")
))

esquinas_completas(boton_relleno("Botón circular", &cb))
```

## 📦 Elevación

| Nivel | Valor (dp) | Función Forja | Componentes típicos |
|-------|------------|---------------|---------------------|
| 0 | 0dp | `sombra(hijo, 0)` | Botón relleno, superficie base |
| 1 | 1dp | `sombra(hijo, 1)` | Botón elevado, card elevated |
| 2 | 3dp | `sombra(hijo, 2)` | FAB |
| 3 | 6dp | `sombra(hijo, 3)` | Navigation drawer |
| 4 | 8dp | `sombra(hijo, 4)` | Dialog, bottom sheet modal |
| 5 | 12dp | `sombra(hijo, 5)` | Snackbar |

En modo oscuro, la elevación también aclara la superficie (overlay de primary
al 5-14% según el nivel) para dar profundidad.

### Uso en código

```forja
sombra(tarjeta_elevada(
    texto_mediano("Card con elevación")
), 2)
```

## 🎭 Estados (State Layer)

Opacidades para overlays de estado interactivo:

| Estado | Opacidad | Descripción |
|--------|----------|-------------|
| Normal | 0% | Estado base |
| Hover | 8% | Ratón sobre el componente |
| Focus | 12% | Teclado enfocado |
| Pressed | 12% | Presionado |
| Dragged | 16% | Arrastrando |
| Disabled | 38% | Deshabilitado |

El color del overlay es `on_surface` en modo claro y `on_surface` (claro) en modo oscuro.

## 🏃 Motion

### Duraciones

| Nombre | ms | Uso |
|--------|-----|-----|
| Micro | 50ms | Micro-interacciones |
| Hover/Ripple | 100ms | Hover, ripple effect |
| Short | 200ms | Fade estándar |
| Decelerate | 250ms | Entradas |
| Standard | 300ms | Transiciones generales |
| Container | 350ms | Transformación de contenedor |
| Medium | 400ms | Transiciones medias |
| Emphasized | 450ms | Transiciones destacadas |
| Long | 500ms | Transiciones largas |

### Curvas de Easing

| Curva | Cubic-Bezier | Uso |
|-------|-------------|-----|
| Standard | (0.2, 0.0, 0.0, 1.0) | Animaciones generales |
| Emphasized | (0.2, 0.0, 0.0, 1.0) | Animaciones destacadas |
| Decelerate | (0.0, 0.0, 0.0, 1.0) | Entradas |
| Accelerate | (0.3, 0.0, 1.0, 1.0) | Salidas |
| Expressive | (0.34, 1.56, 0.64, 1.0) | Con overshoot |

## 🎨 Tema dinámico

Forja puede detectar automáticamente el tema del sistema operativo:

- **Windows**: Lee el registro `HKCU\...\AppsUseLightTheme`
- **Linux**: Usa `gsettings` (GNOME) o detecta tema GTK
- **macOS**: Lee `defaults read -g AppleInterfaceStyle`

```bash
forja-gui --auto-tema ejemplo.fa
```

En código:

```forja
variable tema = tema_sistema()  # "light" o "dark"
```
