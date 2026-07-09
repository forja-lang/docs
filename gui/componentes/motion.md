# 🏃 Motion (Animaciones y Transiciones)

## Fade Transition (Transición Fundida)

Muestra/oculta contenido con animación de opacidad.

```forja
transición(contenido, visible: Texto)
fade_transition(contenido, visible: Texto)
transition(contenido, visible: Texto)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `contenido` | `Widget` | Widget a mostrar/ocultar |
| `visible` | `Texto` | Nombre de variable booleana |

```forja
variable mostrar = verdadero

columna(
    interruptor("Mostrar", mostrar),
    transición(
        tarjeta(texto_mediano("Aparece con fade")),
        mostrar
    )
)
```

Duración configurable (ms):

```forja
fade_transition(contenido, "visible", 0.5)  # 500ms
```

## Ripple Effect (Efecto Onda)

Efecto de onda expansiva al hacer clic en un widget.

```forja
efecto_onda(hijo)
ripple_effect(hijo)
ripple(hijo)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `hijo` | `Widget` | Widget base |

Color configurable:

```forja
efecto_onda(boton_relleno("Click", &cb))
# Color por defecto: "primary"
```

```forja
ripple(tarjeta(
    texto_mediano("Onda al hacer clic")
))
```

## Sistema de Animación

Forja utiliza el sistema de **Material Design 3 Motion** con:

### Duraciones

| Nombre | ms | Uso |
|--------|-----|-------------|
| `micro` | 50ms | Micro-interacciones |
| `hover` | 100ms | Efecto hover, ripple |
| `short` | 200ms | Fade estándar |
| `decelerate` | 250ms | Entradas |
| `standard` | 300ms | Transiciones generales |
| `container` | 350ms | Transformación contenedor |
| `medium` | 400ms | Transiciones medias |
| `emphasized` | 450ms | Destacadas |
| `long` | 500ms | Transiciones largas |

### Curvas de Easing

| Curva | Cubic-Bezier | Comportamiento |
|-------|-------------|----------------|
| Standard | (0.2, 0.0, 0.0, 1.0) | Suave entrada/salida |
| Emphasized | (0.2, 0.0, 0.0, 1.0) | Más dramático |
| Decelerate | (0.0, 0.0, 0.0, 1.0) | Solo desaceleración (entradas) |
| Accelerate | (0.3, 0.0, 1.0, 1.0) | Solo aceleración (salidas) |
| Expressive | (0.34, 1.56, 0.64, 1.0) | Con overshoot |

### Tipos de Transición

```forja
// Definido en el sistema de tema:
TransitionType::Fade                // Fundido (200ms)
TransitionType::SharedAxisX         // Deslizar horizontal (300ms)
TransitionType::SharedAxisY         // Deslizar vertical (300ms)
TransitionType::SharedAxisZ         // Escala (300ms)
TransitionType::FadeThrough         // Fundido a través (350ms)
TransitionType::ContainerTransform  // Transformación contenedor (350ms)
```

## Sistema de Tema Expressive

El sistema de movimiento puede configurarse con easing expresivo (con overshoot):

```rust
// En Rust
let tema = MaterialTheme::with_motion(MotionSystem::expressive());
```

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable visible1 = verdadero
    variable visible2 = falso
    variable visible3 = verdadero
    
    desplazable(
        columna(
            encabezado_mediano("Motion & Animaciones"),
            espacio(16),
            
            // Fade Transition
            tarjeta(
                columna(
                    texto_mediano("Fade Transition"),
                    espacio(8),
                    interruptor("Mostrar contenido", visible1),
                    espacio(8),
                    transición(
                        tarjeta_elevada(
                        relleno(
                                columna(
                                    texto_mediano("Contenido animado"),
                                    cuerpo_pequeño("Aparece con fade in/out")
                                ),
                                16
                            )
                        ),
                        visible1
                    )
                )
            ),
            espacio(16),
            
            // Ripple Effect
            tarjeta(
                columna(
                    texto_mediano("Ripple Effect"),
                    espacio(8),
                    efecto_onda(
                        tarjeta(
                            relleno(
                                texto_mediano("Toca para ver la onda"),
                                20
                            )
                        )
                    ),
                    espacio(8),
                    efecto_onda(
                        boton_relleno("Botón con ripple", &cb)
                    )
                )
            ),
            espacio(16),
            
            // Animated show/hide
            tarjeta(
                columna(
                    texto_mediano("Animación combinada"),
                    espacio(8),
                    interruptor("Mostrar sección", visible2),
                    espacio(8),
                    transición(
                        gradiente_lineal(
                            relleno(
                                columna(
                                    texto_mediano("Sección con fade"),
                                    cuerpo_mediano("Aparece suavemente")
                                ),
                                16
                            ),
                            ["#6750A4", "#D0BCFF"]
                        ),
                        visible2
                    )
                )
            )
        )
    )
}

funcion cb() { }
```
