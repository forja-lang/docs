# 🃏 Tarjetas, Listas y Tablas

## Cards (Tarjetas)

### Tarjeta Rellena (Filled)

```forja
tarjeta(hijo)
card(hijo)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Contenido de la tarjeta |

**Design tokens:**
- Fondo: `surface_variant`
- Shape: 12dp (medium)
- Elevación: 0dp

### Tarjeta Elevada

```forja
tarjeta_elevada(hijo)
elevated_card(hijo)
```

**Design tokens:**
- Fondo: `surface`
- Elevación: 1dp
- Shape: 12dp

### Tarjeta Perfilada (Outlined)

```forja
tarjeta_perfilada(hijo)
outlined_card(hijo)
```

**Design tokens:**
- Fondo: `surface`
- Borde: `outline_variant` 1px
- Shape: 12dp

### Tarjeta Seleccionable

```forja
tarjeta_seleccionable(hijo, variable)
selectable_card(hijo, variable)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `variable` | `Texto` | Nombre de variable booleana |

Cuando está seleccionada, muestra borde `secondary` 1px y fondo `secondary_container`.

## List Items (Elementos de Lista)

### Item de una línea

```forja
elemento_lista(leading, titulo: Texto, trailing)
list_item(leading, titulo: Texto, trailing)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `leading` | `Widget` | Widget inicial (avatar, icono) |
| `titulo` | `Texto` | Título del item |
| `trailing` | `Widget` | Widget final (icono, switch) |

### Item de dos líneas

```forja
elemento_lista_doble(leading, titulo: Texto, subtitulo: Texto, trailing)
two_line_list_item(leading, titulo: Texto, subtitulo: Texto, trailing)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `subtitulo` | `Texto` | Subtítulo del item |

## Listas

### Lista simple

```forja
lista(items)
list_widget(items)
```

### Lista con divisores

```forja
lista_con_dividores(items)
list_with_dividers(items)
```

### Lista con controles (checkbox, radio)

```forja
lista_control(items, tipo: Texto, variables)
list_control(items, tipo: Texto, variables)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `tipo` | `Texto` | "checkbox" o "radio" |
| `variables` | `[Texto]` | Variables enlazadas |

### Lista seleccionable

```forja
lista_seleccion(items, selecciones, cb)
list_selection(items, selecciones, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `selecciones` | `[Booleano]` | Estados de selección |
| `cb` | `&funcion` | Callback al seleccionar |

## Data Tables

### Tabla de datos

```forja
tabla_datos(columnas, filas)
data_table(columnas, filas)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `columnas` | `[Texto]` | Nombres de columnas |
| `filas` | `[[Texto]]` | Array de arrays con datos |

### Tabla ordenable

```forja
tabla_ordenable(columnas, filas)
sortable_table(columnas, filas)
```

Las columnas se pueden ordenar haciendo clic en el encabezado.
Muestra indicadores ↑↓.

### Tabla seleccionable

```forja
tabla_seleccion(columnas, filas)
selectable_table(columnas, filas)
```

## Surface (Superficie)

```forja
superficie(hijo)
surface_widget(hijo)
```

Fondo `surface` con shape 12dp.

### Superficie Tonal

```forja
superficie_tonal(hijo)
tonal_surface(hijo)
```

Fondo `secondary_container` con shape 12dp.

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable seleccionados = [falso, falso, falso]
    
    columna(
        encabezado_mediano("Tarjetas"),
        espacio(8),
        
        // Card filled
        tarjeta(
            columna(
                texto_mediano("Card Filled"),
                cuerpo_pequeño("Contenido de la tarjeta"),
                espacio(8),
                boton_texto("Acción", &cb)
            )
        ),
        espacio(8),
        
        // Card elevated
        sombra(
            tarjeta_elevada(
                columna(
                    texto_mediano("Card Elevada"),
                    cuerpo_pequeño("Con sombra")
                )
            ),
            1
        ),
        espacio(8),
        
        // Card outlined
        tarjeta_perfilada(
            texto_mediano("Card con borde")
        ),
        
        espacio(16),
        encabezado_mediano("Listas"),
        espacio(8),
        
        // Lista
        lista([
            elemento_lista(avatar_texto("A"), "Alice", null),
            elemento_lista(avatar_texto("B"), "Bob", null),
            elemento_lista(avatar_texto("C"), "Charlie", null)
        ]),
        
        espacio(16),
        encabezado_mediano("Data Table"),
        espacio(8),
        
        tabla_datos(
            ["Nombre", "Edad", "Ciudad"],
            [
                ["Ana", "28", "Buenos Aires"],
                ["Luis", "32", "Córdoba"],
                ["María", "25", "Rosario"]
            ]
        )
    )
}

funcion cb() { }
```
