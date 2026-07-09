# 🎭 Expressive (Efectos Visuales Avanzados)

## Glass Card (Efecto Vidrio - Glassmorphism)

Tarjeta con efecto vidrio esmerilado (glassmorphism).

```forja
tarjeta_vidrio(hijo, desenfoque: Decimal, opacidad: Decimal)
glass_card(hijo, desenfoque: Decimal, opacidad: Decimal)
glass(hijo, desenfoque: Decimal, opacidad: Decimal)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Contenido de la tarjeta |
| `desenfoque` | `Decimal` | Nivel de blur (default: 20) |
| `opacidad` | `Decimal` | Opacidad 0.0-1.0 (default: 0.65) |

```forja
tarjeta_vidrio(
    columna(
        texto_mediano("Glassmorphism"),
        cuerpo_mediano("Efecto vidrio con blur")
    ),
    20,  # blur
    0.65 # opacidad
)
```

## Gradient Box (Caja con Gradiente)

### Gradiente Lineal

```forja
gradiente_lineal(hijo, colores)
gradient_box(hijo, colores)
gradient(hijo, colores)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Widget con gradiente de fondo |
| `colores` | `[Texto]` | Array de colores (hex o nombre) |

```forja
gradiente_lineal(
    texto_mediano("Gradiente"),
    ["#FF6B6B", "#4ECDC4", "#45B7D1"]
)
```

Dirección configurable (tercer parámetro):

```forja
gradiente_lineal(hijo, ["#FF5722", "#FF9800"], "vertical")
# También: "horizontal" (default), "vertical"
```

### Gradiente Radial

```forja
gradiente_radial(hijo, colores)
```

```forja
gradiente_radial(
    texto_mediano("Radial"),
    ["#6750A4", "#D0BCFF"]
)
```

## Morphing Button

Botón animado que cambia de icono a texto extendido.

```forja
boton_morphing(icono: Texto, texto_extendido: Texto, cb)
morphing_button(icono: Texto, texto_extendido: Texto, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `icono` | `Texto` | Icono/emoji |
| `texto_extendido` | `Texto` | Texto al expandirse |
| `cb` | `&funcion` | Callback al hacer clic |

```forja
boton_morphing("➕", "Crear nuevo", &cb_crear)
```

## Glow Border (Borde con Brillo)

```forja
efecto_brillo(hijo, color: Texto, ancho: Decimal)
glow_border(hijo, color: Texto, ancho: Decimal)
glow(hijo, color: Texto, ancho: Decimal)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Widget base |
| `color` | `Texto` | Color del brillo (hex o nombre) |
| `ancho` | `Decimal` | Grosor del borde (default: 2.0) |

```forja
glow_border(
    tarjeta(texto_mediano("Glow effect")),
    "#6750A4",
    2.0
)
```

## Expressive Background (Fondo Expresivo)

Fondo animado con colores degradados.

```forja
fondo_expresivo(colores)
expressive_background(colores)
bg_expressive(colores)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `colores` | `[Texto]` | Array de colores degradados |

Con animación opcional:

```forja
expressive_background(
    ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    verdadero  # animado
)
```

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    desplazable(
        columna(
            encabezado_mediano("Componentes Expressive"),
            espacio(16),
            
            // Glass Card
            tarjeta_vidrio(
                columna(
                    texto_mediano("Glass Card"),
                    cuerpo_pequeño("Efecto vidrio con blur de fondo")
                ),
                15,
                0.7
            ),
            espacio(16),
            
            // Gradient Box
            gradiente_lineal(
                columna(
                    relleno(
                        texto_mediano("Gradiente Lineal"),
                        20
                    )
                ),
                ["#6750A4", "#D0BCFF"]
            ),
            espacio(16),
            
            // Glow Border
            glow_border(
                tarjeta(
                    relleno(
                        columna(
                            texto_mediano("Glow Border"),
                            cuerpo_pequeño("Borde con brillo")
                        ),
                        16
                    )
                ),
                "#FF5722",
                2.0
            ),
            espacio(16),
            
            // Morphing Button
            boton_morphing("➕", "Crear nuevo", &cb),
            espacio(16),
            
            // Expressive Background
            fondo_expresivo(
                ["#FF6B6B", "#4ECDC4", "#45B7D1"]
            )
        )
    )
}

funcion cb() { }
```
