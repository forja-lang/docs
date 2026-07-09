# 📊 Indicadores

## Progress (Progreso)

### Barra de Progreso Lineal

```forja
barra_progreso(variable: Texto)
progress_bar_linear(variable: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `variable` | `Texto` | Variable con valor 0-100 |

Barra determinada que refleja el porcentaje.

### Barra Indeterminada

```forja
barra_progreso_indeterminada()
progress_bar_indeterminate()
```

Animación de carga continua.

### Círculo de Progreso

```forja
circulo_progreso(variable: Texto)
circular_progress(variable: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `variable` | `Texto` | Variable con valor 0-100 |

Tamaño por defecto: 40dp.

### Círculo Indeterminado

```forja
circulo_progreso_indeterminado()
circular_progress_indeterminate()
```

Spinner de carga circular. Tamaño configurable:

```forja
circulo_progreso_indeterminado(tamaño: Decimal)
```

## Badge (Distintivo)

### Con número

```forja
distintivo(hijo, numero: Texto)
badge(hijo, numero: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Widget base |
| `numero` | `Texto` | Número o texto a mostrar |

Sobreposición en la esquina superior derecha del widget base.

### Punto (sin número)

```forja
distintivo_punto(hijo)
badge_dot(hijo)
```

**Design tokens (Badge):**
- Fondo: `error`
- Texto: `on_error`
- Shape: small (8dp) / full para punto
- Tamaño: 16dp (con número) / 8dp (punto)

## Skeleton (Placeholder de Carga)

### Genérico

```forja
esqueleto(ancho: Decimal, alto: Decimal)
skeleton(ancho: Decimal, alto: Decimal)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `ancho` | `Decimal` | Ancho en píxeles |
| `alto` | `Decimal` | Alto en píxeles |

### Tarjeta Skeleton

```forja
esqueleto_tarjeta()
skeleton_card()
```

Placeholder de 300x180dp.

### Línea Skeleton

```forja
esqueleto_linea()
skeleton_line()
```

Placeholder de 200x16dp.

## Empty State (Estado Vacío)

```forja
estado_vacio(icono: Texto, mensaje: Texto)
empty_state(icono: Texto, mensaje: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `icono` | `Texto` | Icono/emoji |
| `mensaje` | `Texto` | Mensaje descriptivo |

Con acción opcional:

```forja
estado_vacio("📭", "No hay mensajes", "Nuevo mensaje", &cb_accion)
```

## Error State (Estado de Error)

```forja
estado_error(mensaje: Texto)
error_state(mensaje: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Mensaje de error |

Con reintentar opcional:

```forja
estado_error("Error al cargar", &reintentar)
```

## Avatars

### Texto (iniciales)

```forja
avatar(texto: Texto)
avatar_text(texto: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` | Texto/iniciales |

Tamaño configurable:

```forja
avatar("JD", 48)  # 48dp
```

### Icono

```forja
avatar_icono(icono: Texto)
avatar_icon(icono: Texto)
```

### Imagen

```forja
avatar_imagen(ruta: Texto)
avatar_image(ruta: Texto)
```

### Grupo de Avatares

```forja
grupo_avatar(avatares)
avatar_group(avatares)
```

Avatares superpuestos. Por defecto muestra máximo 3.

```forja
grupo_avatar(["A", "B", "C", "D"], 3)  # Muestra 3, +1 oculto
```

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable progreso = 65
    
    columna(
        encabezado_mediano("Indicadores"),
        espacio(16),
        
        // Progress
        barra_progreso(progreso),
        espacio(8),
        barra_progreso_indeterminada(),
        espacio(8),
        circulo_progreso(progreso),
        espacio(8),
        circulo_progreso_indeterminado(),
        
        espacio(16),
        
        // Badges
        fila(
            distintivo(boton_icono("🔔", &cb), "3"),
            espacio(12),
            distintivo_punto(boton_icono("💬", &cb))
        ),
        
        espacio(16),
        
        // Skeleton
        esqueleto_tarjeta(),
        espacio(8),
        esqueleto_linea(),
        
        espacio(16),
        
        // Avatars
        fila(
            avatar("A"),
            espacio(8),
            avatar_icono("😊"),
            espacio(8),
            grupo_avatar(["A", "B", "C"])
        ),
        
        espacio(16),
        
        // Empty State
        estado_vacio("📂", "No hay archivos"),
        
        espacio(16),
        
        // Slider para controlar progreso
        deslizante(progreso, 0, 100)
    )
}

funcion cb() { }
```
