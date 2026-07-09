# 🧭 Navegación Material You

## Item de Navegación

Elemento base usado por NavigationBar, NavigationRail y NavigationDrawer.

```forja
item_navegacion(icono: Texto, etiqueta: Texto)
nav_item(icono: Texto, etiqueta: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `icono` | `Texto` | Emoji o icono |
| `etiqueta` | `Texto` | Texto del item |

## NavigationBar

Barra inferior de navegación (estilo mobile). 
Usar para 3-5 destinos principales.

```forja
barra_navegacion(items, seleccion: Entero, cb)
navigation_bar(items, seleccion: Entero, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `items` | `[item_navegacion]` | Array de items de navegación |
| `seleccion` | `Entero` | Índice seleccionado |
| `cb` | `&funcion` | Callback al cambiar selección |

**Design tokens:**
- Fondo: `surface`
- Shape: `none` (0dp)
- Activo: icono + label con color `primary` + círculo tonal
- Inactivo: icono + label con color `on_surface_variant`

### Ejemplo

```forja
variable pantalla = 0

andamio(
    barra_superior("App", ()),
    cuerpo_principal,
    barra_navegacion(
        [
            item_navegacion("🏠", "Inicio"),
            item_navegacion("⭐", "Favoritos"),
            item_navegacion("⚙️", "Ajustes")
        ],
        pantalla,
        &cb_nav
    )
)
```

## NavigationRail

Riel lateral de navegación (estilo desktop/tablet landscape).

```forja
riel_navegacion(items, seleccion: Entero, cb)
riel_navegacion(items, seleccion: Entero, cb, extendido: Booleano)
navigation_rail(items, seleccion: Entero, cb)
navigation_rail(items, seleccion: Entero, cb, extendido: Booleano)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `items` | `[item_navegacion]` | Array de items |
| `seleccion` | `Entero` | Índice seleccionado |
| `cb` | `&funcion` | Callback al cambiar |
| `extendido` | `Booleano` | Muestra labels (opcional) |

## NavigationDrawer

Cajón lateral de navegación.

```forja
cajon_navegacion(items, seleccion: Entero, cb)
navigation_drawer(items, seleccion: Entero, cb)
```

### NavigationDrawer Modal (con overlay)

```forja
cajon_modal(items, seleccion: Entero, cb, visible: Texto)
modal_drawer(items, seleccion: Entero, cb, visible: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `visible` | `Texto` | Nombre de variable booleana |

## TopAppBar (Barra Superior)

### Pequeña (Small) — por defecto

```forja
barra_superior(titulo: Texto, acciones)
top_app_bar(titulo: Texto, acciones)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `titulo` | `Texto` | Título de la barra |
| `acciones` | `[boton_icono]` | Array de botones de acción |

### Mediana (Medium)

```forja
barra_superior_media(titulo: Texto)
top_app_bar_medium(titulo: Texto)
```

Título alineado izquierda, más grande que small.

### Grande (Large)

```forja
barra_superior_grande(titulo: Texto)
top_app_bar_large(titulo: Texto)
```

Título mucho más grande, ocupa más espacio.

**Design tokens:**
- Fondo: `surface`
- Texto: `on_surface`
- Altura small: 64dp
- Altura medium: 112dp
- Altura large: 152dp

## BottomAppBar

Barra inferior con acciones.

```forja
barra_inferior(acciones)
bottom_app_bar(acciones)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `acciones` | `[boton_icono]` | Array de botones de acción |

## Tabs (Pestañas)

```forja
pestañas(tabs, seleccion: Entero, cb)
tabs_widget(tabs, seleccion: Entero, cb)
```

### Tabs con scroll

```forja
pestañas_desplazables(tabs, seleccion: Entero, cb)
scrollable_tabs(tabs, seleccion: Entero, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `tabs` | `[Texto]` | Array de nombres de pestañas |
| `seleccion` | `Entero` | Pestaña activa |
| `cb` | `&funcion` | Callback al cambiar |

## SearchBar

```forja
barra_busqueda(placeholder: Texto, variable: Texto)
search_bar_widget(placeholder: Texto, variable: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `placeholder` | `Texto` | Texto de placeholder |
| `variable` | `Texto` | Variable enlazada |

## Scaffold (Andamio)

Estructura completa de pantalla.

```forja
andamio(superior, cuerpo, inferior)
scaffold(superior, cuerpo, inferior)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `superior` | `Widget` | Barra superior |
| `cuerpo` | `Widget` | Contenido principal |
| `inferior` | `Widget` | Barra inferior o NavigationBar |

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable pantalla = 0
    variable busqueda = ""
    
    andamio(
        barra_superior("Mi App", [
            boton_icono("🔍", &cb_buscar),
            boton_icono("⚙️", &cb_ajustes)
        ]),
        
        // Cuerpo principal
        columna(
            pestañas(
                ["Inicio", "Explorar", "Perfil"],
                pantalla, &cb_tab
            ),
            espacio(16),
            
            // Contenido según pestaña
            texto_mediano("Contenido de la pantalla"),
            espacio(8),
            barra_busqueda("Buscar...", busqueda)
        ),
        
        // Barra inferior de navegación
        barra_navegacion(
            [
                item_navegacion("🏠", "Inicio"),
                item_navegacion("⭐", "Favoritos"),
                item_navegacion("📦", "Archivos"),
                item_navegacion("👤", "Perfil")
            ],
            pantalla,
            &cb_nav
        )
    )
}

funcion cb_buscar() { }
funcion cb_ajustes() { }
funcion cb_tab() { }
funcion cb_nav() { }
```
