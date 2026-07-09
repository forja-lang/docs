# 💬 Feedback y Superposiciones

## Diálogos

### Alerta

Diálogo simple con mensaje.

```forja
dialogo_alerta(titulo: Texto, mensaje: Texto)
dialog_alert(titulo: Texto, mensaje: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `titulo` | `Texto` | Título del diálogo |
| `mensaje` | `Texto` | Mensaje informativo |

**Design tokens:**
- Fondo: `surface`
- Shape: 12dp (medium)
- Elevación: 4dp (8dp)
- Botón: `boton_texto` con color `primary`

### Confirmación

```forja
dialogo_confirmacion(titulo: Texto, mensaje: Texto, cb_confirmar, cb_cancelar)
dialog_confirm(titulo: Texto, mensaje: Texto, cb_confirm, cb_cancel)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `titulo` | `Texto` | Título |
| `mensaje` | `Texto` | Mensaje |
| `cb_confirmar` | `&funcion` | Callback al confirmar |
| `cb_cancelar` | `&funcion` | Callback al cancelar |

Botones: "Cancelar" (text button) + "Confirmar" (text button primary)

### Personalizado

```forja
dialogo_personalizado(titulo: Texto, hijo)
dialog_custom(titulo: Texto, hijo)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Contenido personalizado |

### Pantalla Completa

```forja
dialogo_completo(titulo: Texto, hijo)
dialog_full(titulo: Texto, hijo)
```

Ocupa toda la pantalla. Ideal para formularios largos o contenido denso.

## Bottom Sheets (Hojas Inferiores)

### Estándar

```forja
hoja_inferior(hijo, visible: Texto)
bottom_sheet(hijo, visible: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Contenido de la hoja |
| `visible` | `Texto` | Nombre de variable booleana |

Sin overlay, la hoja aparece desde abajo.

### Modal

```forja
hoja_inferior_modal(hijo, visible: Texto)
modal_sheet(hijo, visible: Texto)
```

Con overlay semitransparente. El usuario puede cerrar tocando fuera.

**Elevación:** 4dp (8dp)

### Expandida

```forja
hoja_inferior_grande(hijo, visible: Texto)
expanded_sheet(hijo, visible: Texto)
```

Ocupa ~90% de la altura de la pantalla.

## Snackbar / Notificaciones

### Snackbar simple

```forja
notificación(mensaje: Texto)
snackbar(mensaje: Texto)
notification(mensaje: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Mensaje a mostrar |

**Design tokens:**
- Fondo: `inverse_surface` (oscuro)
- Texto: `inverse_on_surface` (claro)
- Duración: 3000ms
- Elevación: 5dp (12dp)
- Shape: small (8dp)

### Snackbar con acción

```forja
notificación_accion(mensaje: Texto, texto_accion: Texto, cb)
snackbar_action(mensaje: Texto, texto_accion: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto_accion` | `Texto` | Texto del botón de acción |
| `cb` | `&funcion` | Callback de la acción |

Duración: 4000ms

## Tooltip

Ayuda contextual al pasar el ratón.

```forja
información(contenido, texto: Texto)
tooltip(contenido, texto: Texto)
info(contenido, texto: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `contenido` | `Widget` | Widget base |
| `texto` | `Texto` | Texto del tooltip |

**Design tokens:**
- Fondo: `inverse_surface`
- Texto: `inverse_on_surface`
- Shape: small (8dp)

## Menús

### Menú desplegable

```forja
menú_desplegable(opciones, seleccion: Entero, cb)
menu_desplegable(opciones, seleccion: Entero, cb)
dropdown_menu(opciones, seleccion: Entero, cb)
```

### Menú contextual

```forja
menú_contexto(opciones, seleccion: Entero, cb)
menu_contexto(opciones, seleccion: Entero, cb)
context_menu(opciones, seleccion: Entero, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `opciones` | `[Texto]` | Items del menú |
| `seleccion` | `Entero` | Índice seleccionado |
| `cb` | `&funcion` | Callback al seleccionar |

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable mostrar_sheet = falso
    variable menu_visible = falso
    
    columna(
        encabezado_mediano("Feedback"),
        espacio(16),
        
        // Diálogos
        boton_relleno("Mostrar Alerta", &mostrar_alerta),
        espacio(8),
        boton_tonal("Confirmar Acción", &confirmar_accion),
        espacio(8),
        
        // Bottom Sheet
        boton_perfilado("Abrir Sheet", &abrir_sheet),
        
        hoja_inferior(
            columna(
                texto_mediano("Sheet Content"),
                espacio(8),
                cuerpo_mediano("Contenido de la hoja inferior"),
                espacio(16),
                boton_relleno("Cerrar", &cerrar_sheet)
            ),
            mostrar_sheet
        ),
        
        espacio(8),
        
        // Snackbar
        boton_texto("Mostrar notificación", &mostrar_notif),
        
        espacio(16),
        
        // Tooltip
        información(
            boton_relleno("Info", &cb),
            "Este botón muestra ayuda contextual"
        ),
        
        espacio(8),
        
        // Menú
        menu_desplegable(
            ["Opción 1", "Opción 2", "Opción 3"],
            0, &cb_menu
        )
    )
}

funcion mostrar_alerta() {
    dialogo_alerta("Información", "Esto es una alerta")
}

funcion confirmar_accion() {
    dialogo_confirmacion("Confirmar", "¿Estás seguro?", &si_confirmar, &no_cancelar)
}

funcion si_confirmar() { }
funcion no_cancelar() { }
funcion abrir_sheet() { }
funcion cerrar_sheet() { }
funcion mostrar_notif() {
    notificación("¡Hola desde Forja!")
}
funcion cb() { }
funcion cb_menu() { }
```
