# ⌨️ Inputs Material You

## Campos de Texto (Text Fields)

### TextField Relleno (Filled)

El estilo por defecto. Usar para la mayoría de los casos.

```forja
campo_texto(variable: Texto, etiqueta: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `variable` | `Texto` | Variable enlazada (nombre) |
| `etiqueta` | `Texto` | Label flotante |

**Design tokens:**
- Fondo: `surface_variant`
- Shape: 4dp (extra_small)
- Label: 12sp flotante
- Borde inferior: primary al focus

### TextField Perfilado (Outlined)

```forja
campo_perfilado(variable: Texto, etiqueta: Texto)
```

**Design tokens:**
- Fondo: transparente
- Borde: `outline` 1px
- Shape: 4dp

### TextField con Error

```forja
campo_texto_error(variable: Texto, etiqueta: Texto, error: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `error` | `Texto` | Mensaje de error (rojo) |

### Campo de Contraseña

```forja
campo_contraseña(variable: Texto, etiqueta: Texto)
campo_contrasena(variable: Texto, etiqueta: Texto)
```

Placeholder automático: `••••••••`

### Campo Numérico

```forja
campo_numero(variable: Texto, etiqueta: Texto, min: Decimal, max: Decimal)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `min` | `Decimal` | Valor mínimo |
| `max` | `Decimal` | Valor máximo |

### Campo de Búsqueda

```forja
campo_busqueda(variable: Texto)
campo_search(variable: Texto)
```

Incluye icono 🔍. Shape: 20dp (completa).

### Campos Especializados

```forja
campo_email(variable: Texto, etiqueta: Texto)     # Placeholder: email@ejemplo.com
campo_telefono(variable: Texto, etiqueta: Texto)   # Placeholder: +54 11 1234-5678
campo_url(variable: Texto, etiqueta: Texto)         # Placeholder: https://
```

## Selectores (Dropdown & Select)

### Dropdown básico

```forja
contraer_desplegable(opciones, seleccionada: Entero)
dropdown(opciones, seleccionada: Entero)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `opciones` | `[Texto]` | Lista de opciones |
| `seleccionada` | `Entero` | Índice seleccionado |

### Select con etiqueta

```forja
menu_seleccion(opciones, seleccionada: Entero, etiqueta: Texto)
select_menu(opciones, seleccionada: Entero, etiqueta: Texto)
```

### Autocompletar

```forja
autocompletar(opciones, variable: Texto)
autocomplete(opciones, variable: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `opciones` | `[Texto]` | Lista de sugerencias |
| `variable` | `Texto` | Variable enlazada |

## Radio Buttons

```forja
grupo_radio(opciones, seleccion: Entero, cb)
radio_group(opciones, seleccion: Entero, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `opciones` | `[Texto]` | Lista de opciones |
| `seleccion` | `Entero` | Índice seleccionado |
| `cb` | `&funcion` | Callback al cambiar |

## Switch (Interruptor)

```forja
interruptor(etiqueta: Texto, variable: Texto)
switch_widget(etiqueta: Texto, variable: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `etiqueta` | `Texto` | Texto junto al switch |
| `variable` | `Texto` | Variable booleana enlazada |

**Design tokens:**
- Track activo: `primary`
- Thumb activo: `on_primary`
- Track inactivo: `surface_variant`
- Thumb inactivo: `outline`

## Sliders

### Slider Continuo

```forja
deslizante(variable: Texto, minimo: Decimal, maximo: Decimal)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `variable` | `Texto` | Variable numérica enlazada |
| `minimo` | `Decimal` | Valor mínimo |
| `maximo` | `Decimal` | Valor máximo |

### Slider Discreto

```forja
deslizante_discreto(variable: Texto, minimo: Decimal, maximo: Decimal, pasos: Entero)
discrete_slider(variable: Texto, minimo: Decimal, maximo: Decimal, pasos: Entero)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `pasos` | `Entero` | Número de pasos discretos |

### Slider de Rango

```forja
deslizante_rango(variable1: Texto, variable2: Texto, minimo: Decimal, maximo: Decimal)
range_slider(variable1: Texto, variable2: Texto, minimo: Decimal, maximo: Decimal)
```

Dos sliders independientes para seleccionar un rango.

## Date & Time Pickers

```forja
selector_fecha(variable: Texto)          # Placeholder: YYYY-MM-DD
date_picker(variable: Texto)
selector_hora(variable: Texto)           # Placeholder: HH:MM
time_picker(variable: Texto)
```

## Color Picker

```forja
selector_color(variable: Texto)
color_picker(variable: Texto)            # Placeholder: #RRGGBB
```

## Chip Group (Grupo de Chips seleccionables)

```forja
grupo_subconjuntos(subconjuntos, selecciones, cb)
chip_group(subconjuntos, selecciones, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `subconjuntos` | `[Texto]` | Nombres de chips |
| `selecciones` | `[Booleano]` | Estado seleccionado de cada chip |
| `cb` | `&funcion` | Callback al cambiar |

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable nombre = ""
    variable email = ""
    variable edad = 25
    variable notificaciones = verdadero
    variable tema = "claro"
    variable opciones = ["Rojo", "Verde", "Azul"]
    variable seleccion = 0
    variable fecha = ""
    
    desplazable(
        columna(
            encabezado_mediano("Formulario Material You"),
            espacio(16),
            
            // Text Fields
            campo_texto(nombre, "Nombre completo"),
            espacio(8),
            campo_email(email, "Correo electrónico"),
            espacio(8),
            campo_numero(edad, "Edad", 0, 150),
            espacio(8),
            
            // Select
            menu_seleccion(opciones, seleccion, "Color favorito"),
            espacio(8),
            
            // Switch
            interruptor("Recibir notificaciones", notificaciones),
            espacio(8),
            
            // Date
            selector_fecha(fecha),
            espacio(8),
            
            // Slider
            deslizante(edad, 0, 150),
            espacio(16),
            
            // Radio
            grupo_radio(["Claro", "Oscuro", "Auto"], 0, &cb_tema),
            espacio(16),
            
            boton_relleno("Enviar", &enviar)
        )
    )
}

funcion cb_tema() {
    // Cambiar tema
}

funcion enviar() {
    // Enviar formulario
}
```
