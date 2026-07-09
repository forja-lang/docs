# 🔘 Botones Material You

## Botón Relleno (Filled)

Botón de **alta énfasis**. Usar para la acción principal en una pantalla.

```forja
boton_relleno(texto: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto del botón |
| `cb` | `&funcion` | Callback al hacer clic |

**Design tokens:**
- Fondo: `primary` (light: `#6750A4`, dark: `#D0BCFF`)
- Texto: `on_primary` (light: `#FFFFFF`, dark: `#371E73`)
- Shape: 20dp (esquinas completas)
- Etiqueta: `Label Large` (14sp, Medium 500)
- Elevación: 0dp
- Altura: 40dp

**Estados:** Normal → Hover (8% overlay) → Focus (12%) → Pressed (12%) → Disabled (38%)

## Botón Tonal (Filled Tonal)

**Media énfasis**. Usar para acciones secundarias importantes.

```forja
boton_tonal(texto: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto del botón |
| `cb` | `&funcion` | Callback al hacer clic |

**Design tokens:**
- Fondo: `secondary_container` (light: `#E8DEF8`, dark: `#4A4458`)
- Texto: `on_secondary_container` (light: `#1D192B`, dark: `#E8DEF8`)
- Shape: 20dp

## Botón Perfilado (Outlined)

**Baja énfasis**. Usar para acciones alternativas.

```forja
boton_perfilado(texto: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto del botón |
| `cb` | `&funcion` | Callback al hacer clic |

**Design tokens:**
- Borde: `outline` (light: `#79747E`)
- Texto: `primary`
- Fondo: transparente
- Shape: 20dp
- Border: 1px

## Botón Texto (Text)

**Énfasis mínima**. Usar para acciones de baja importancia.

```forja
boton_texto(texto: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto del botón |
| `cb` | `&funcion` | Callback al hacer clic |

**Design tokens:**
- Texto: `primary`
- Sin fondo ni borde
- Shape: 20dp

## Botón Elevado (Elevated)

Con **sombra**. Usar cuando se necesita destacar con elevación.

```forja
boton_elevado(texto: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto del botón |
| `cb` | `&funcion` | Callback al hacer clic |

**Design tokens:**
- Fondo: `surface` (light: `#FFFBFE`)
- Texto: `primary`
- Elevación: 1dp
- Shape: 20dp

## FAB (Floating Action Button)

Para la **acción principal** de la pantalla.

```forja
fab(icono: Texto, cb)
fab_pequeño(icono: Texto, cb)
fab_grande(icono: Texto, cb)
fab_extendido(texto: Texto, icono: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `icono` | `Texto` | Emoji o icono |
| `texto` | `Texto` | Texto extendido (solo FAB extendido) |
| `cb` | `&funcion` | Callback al hacer clic |

**Variantes:**

| Variante | Función | Tamaño |
|----------|---------|--------|
| Small | `fab_pequeño()` | 40dp |
| Medium (default) | `fab()` | 56dp |
| Large | `fab_grande()` | 96dp |
| Extended | `fab_extendido()` | 56dp + texto |

**Design tokens:**
- Fondo: `primary_container` (light: `#EADDFF`, dark: `#4F378B`)
- Texto: `on_primary_container`
- Shape: 16dp
- Elevación: 3dp

## Icon Buttons

Para acciones con icono.

```forja
boton_icono(icono: Texto, cb)
boton_icono_relleno(icono: Texto, cb)
boton_icono_tonal(icono: Texto, cb)
boton_icono_perfilado(icono: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `icono` | `Texto` | Emoji o icono |
| `cb` | `&funcion` | Callback al hacer clic |

| Variante | Función | Fondo | Color |
|----------|---------|-------|-------|
| Standard | `boton_icono()` | Transparente | `on_surface_variant` |
| Filled | `boton_icono_relleno()` | `primary` | `on_primary` |
| Tonal | `boton_icono_tonal()` | `secondary_container` | `on_secondary_container` |
| Outlined | `boton_icono_perfilado()` | Transparente + borde | `primary` |

## Segmentados (Segmented Buttons)

Para seleccionar entre opciones.

```forja
segmentado(opciones, seleccion, cb)
segmentado_multiple(opciones, selecciones, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `opciones` | `[Texto]` | Array de opciones |
| `seleccion` | `Entero` | Índice seleccionado |
| `selecciones` | `[Booleano]` | Array de selecciones (multi) |
| `cb` | `&funcion` | Callback al cambiar |

## Chips

Para filtros, etiquetas y acciones contextuales.

```forja
subconjunto_asistente(texto: Texto, cb)
subconjunto_filtro(texto: Texto, activo, cb)
subconjunto_entrada(texto: Texto, cb_remove)
subconjunto_sugerencia(texto: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto del chip |
| `activo` | `Booleano` | Estado activo/inactivo |
| `cb` | `&funcion` | Callback al hacer clic |
| `cb_remove` | `&funcion` | Callback al remover |

| Variante | Función | Estilo | Uso |
|----------|---------|--------|-----|
| Assist | `subconjunto_asistente()` | Borde `outline` | Acciones contextuales |
| Filter | `subconjunto_filtro()` | Activo: tonal / Inactivo: borde | Filtros |
| Input | `subconjunto_entrada()` | Tonal con botón cerrar | Etiquetas, emails |
| Suggestion | `subconjunto_sugerencia()` | Borde `outline` | Sugerencias |

**Design tokens (Chips):**
- Etiqueta: `Label Small` (11sp, Medium 500)
- Shape: 8dp
- Altura: 32dp

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable contador = 0
    
    columna(
        encabezado_mediano("Tipos de Botón"),
        espacio(12),
        
        // 5 variantes principales
        boton_relleno("Relleno", &cb_default),
        espacio(8),
        boton_tonal("Tonal", &cb_default),
        espacio(8),
        boton_perfilado("Perfilado", &cb_default),
        espacio(8),
        boton_texto("Texto", &cb_default),
        espacio(8),
        boton_elevado("Elevado", &cb_default),
        
        espacio(16),
        
        // FABs
        fila(
            fab("➕", &cb_default),
            espacio(8),
            fab_pequeño("✏️", &cb_default),
            espacio(8),
            fab_extendido("Crear", "➕", &cb_default)
        ),
        
        espacio(16),
        
        // Chips
        fila(
            subconjunto_asistente("Ayuda", &cb_default),
            espacio(4),
            subconjunto_filtro("Activo", verdadero, &cb_default),
            espacio(4),
            subconjunto_sugerencia("Sugerencia", &cb_default)
        ),
        
        espacio(16),
        
        etiqueta_dinamica(contador)
    )
}

funcion cb_default() {
    // Callback vacío
}
```
