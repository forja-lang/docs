# 📐 Layout y Contenedores

## Layouts Básicos

### Columna (Vertical)

```forja
columna(hijos...)
```

Contenedor flex en dirección vertical. Los hijos se apilan de arriba a abajo.

```forja
columna(
    texto_mediano("Primero"),
    texto_mediano("Segundo"),
    texto_mediano("Tercero")
)
```

### Columna Centrada

```forja
columna_centrada(hijos...)
centered_column(hijos...)
center_col(hijos...)
```

Como columna pero con los hijos centrados verticalmente.

### Fila (Horizontal)

```forja
fila(hijos...)
```

Contenedor flex en dirección horizontal. Los hijos se alinean de izquierda a derecha.

```forja
fila(
    boton_relleno("A", &cb),
    boton_tonal("B", &cb),
    boton_texto("C", &cb)
)
```

### Pila (ZStack - Superposición)

```forja
pila(hijos...)
zstack(hijos...)
```

Los hijos se superponen (z-index). El último hijo está arriba.

```forja
pila(
    tarjeta(texto_mediano("Fondo")),      # Abajo
    distintivo_punto(boton_icono("🔔", &cb))  # Arriba
)
```

### Desplazable (Scroll)

```forja
desplazable(hijo)
scroll(hijo)
```

Envuelve al hijo con scroll vertical.

```forja
desplazable(
    columna(
        // Muchos hijos que scrollean
    )
)
```

### Panel Dividido (Split)

```forja
panel_dividido(hijo1, hijo2, direccion: Texto)
split(hijo1, hijo2, direccion: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `direccion` | `Texto` | "horizontal" o "vertical" |

### Grid (Grilla)

```forja
grilla(hijos..., filas: Entero, columnas: Entero)
grid(hijos..., filas: Entero, columnas: Entero)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `filas` | `Entero` | Número de filas |
| `columnas` | `Entero` | Número de columnas |

### Caja Fija (Sized Box)

```forja
caja_fija(hijo, ancho: Decimal, alto: Decimal)
sized(hijo, ancho: Decimal, alto: Decimal)
```

## Layout Avanzado

### Columna con Gap

```forja
columna_con_gap(hijos, gap: Decimal, alinear: Texto)
column_with_gap(hijos, gap: Decimal, alinear: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijos` | `(widget,)` | Tupla de widgets |
| `gap` | `Decimal` | Espacio entre hijos (px) |
| `alinear` | `Texto` | "start", "center", "end", "space_between", "space_around", "space_evenly" |

### Fila con Gap

```forja
fila_con_gap(hijos, gap: Decimal, alinear: Texto)
row_with_gap(hijos, gap: Decimal, alinear: Texto)
```

### Flow Layout (Wrap)

```forja
flujo(hijos, gap: Decimal)
flow_layout(hijos, gap: Decimal)
flow(hijos, gap: Decimal)
```

Los hijos se distribuyen con wrap automático en múltiples líneas.

### Flex Layout Configurable

```forja
flex_layout(hijos, axis: Texto, gap: Decimal, wrap: Booleano)
flex(hijos, axis: Texto, gap: Decimal, wrap: Booleano)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `axis` | `Texto` | "vertical" o "horizontal" |
| `gap` | `Decimal` | Espacio entre hijos |
| `wrap` | `Booleano` | Wrap automático |

### Aspect Ratio

```forja
caja_relativa(hijo, proporcion: Decimal)
aspect_ratio(hijo, proporcion: Decimal)
```

Mantiene relación de aspecto fija (ej: 1.777 para 16:9).

## Modificadores de Layout

### Padding (Relleno)

```forja
relleno(hijo, cantidad: Decimal)
padding(hijo, cantidad: Decimal)
```

Añade espacio alrededor del hijo.

```forja
relleno(tarjeta(texto_mediano("Contenido")), 16)
```

### Expanded (Expansor)

```forja
expansor(hijo)
expanded(hijo)
```

Hace que el hijo se expanda para llenar el espacio disponible.

```forja
fila(
    boton_relleno("Fijo", &cb),
    expansor(boton_tonal("Se expande", &cb))
)
```

### Centered

```forja
centrado(hijo)
centered(hijo)
center(hijo)
```

Centra al hijo en el contenedor.

### Shadow (Sombra / Elevación)

```forja
sombra(hijo, nivel: Entero)
shadow(hijo, nivel: Entero)
elevated(hijo, nivel: Entero)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `nivel` | `Entero` | Nivel 0-5 |

### Container (Caja con ancho máximo)

```forja
contenedor(hijo, max_width: Decimal)
container(hijo, max_width: Decimal)
caja(hijo, max_width: Decimal)
```

## Layout Responsivo

### Adaptable (3 variantes)

```forja
adaptable(chico, mediano, grande)
responsive(chico, mediano, grande)
```

Cambia automáticamente según el tamaño de ventana:

| Clase | Ancho | Window |
|-------|-------|--------|
| Compact | < 600dp | Celulares |
| Medium | 600-840dp | Tablets |
| Expanded | > 840dp | Escritorio |

```forja
adaptable(
    columna(                    # Compact: < 600dp
        texto_mediano("Vista compacta"),
        campo_texto(busqueda, "Buscar"),
        lista(items)
    ),
    fila(                        # Medium: 600-840dp
        columna(
            barra_busqueda("Buscar", busqueda),
            lista(items)
        ),
        panel_detalle
    ),
    fila(                        # Expanded: > 840dp
        riel_navegacion(nav, 0, &cb, verdadero),
        columna(
            barra_busqueda("Buscar", busqueda),
            tabla_datos(cols, filas)
        )
    )
)
```

### Detección de tamaño

Forja expone `window_size` que puede ser:
- `"compact"` (< 600dp)
- `"medium"` (600-840dp)
- `"expanded"` (> 840dp)

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable busqueda = ""
    variable items = ["Item 1", "Item 2", "Item 3"]
    variable nav_items = [
        item_navegacion("🏠", "Inicio"),
        item_navegacion("📁", "Archivos")
    ]
    variable nav_sel = 0
    
    // Layout responsivo completo
    adaptable(
        // Compact: celular
        columna(
            barra_superior("App", ()),
            barra_busqueda("Buscar...", busqueda),
            flujo(items, 8),
            espacio(16),
            boton_relleno("Acción", &cb),
            barra_navegacion(nav_items, nav_sel, &cb_nav)
        ),
        
        // Medium: tablet
        columna_con_gap(
            (barra_superior("App", ()),
             fila_con_gap(
                 (barra_busqueda("Buscar...", busqueda),
                  boton_relleno("Acción", &cb)),
                 8, "end"
             ),
             flujo(items, 12)),
            16, "start"
        ),
        
        // Expanded: escritorio
        fila_con_gap(
            (riel_navegacion(nav_items, nav_sel, &cb_nav, verdadero),
             columna_con_gap(
                 (barra_superior("App", ()),
                  barra_busqueda("Buscar...", busqueda),
                  flujo(items, 16),
                  boton_relleno("Acción", &cb)),
                 16, "start"
             )),
            0, "start"
        )
    )
}

funcion cb() { }
funcion cb_nav() { }
```
