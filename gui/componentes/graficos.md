# 📈 Gráficos

## Line Chart (Gráfico de Líneas)

```forja
gráfico_linea(datos, etiquetas...)
grafico_linea(datos, etiquetas...)
line_chart(datos, etiquetas...)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `datos` | `[Decimal]` | Array de valores numéricos |
| `etiquetas` | `[Texto]` | Etiquetas opcionales |

```forja
line_chart([10, 25, 15, 30, 20], ["Ene", "Feb", "Mar", "Abr", "May"])
```

**Design tokens:**
- Color línea: `primary`
- Grosor: 2px

## Bar Chart (Gráfico de Barras)

```forja
gráfico_barras(datos, etiquetas..., colores...)
grafico_barras(datos, etiquetas..., colores...)
bar_chart(datos, etiquetas..., colores...)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `datos` | `[Decimal]` | Array de valores |
| `etiquetas` | `[Texto]` | Etiquetas opcionales |
| `colores` | `[Texto]` | Colores opcionales (hex) |

```forja
bar_chart(
    [30, 50, 20],
    ["A", "B", "C"],
    ["#FF5722", "#4CAF50", "#2196F3"]
)
```

Soporta barras apiladas (parámetro `apilado`):

```forja
bar_chart([10, 20, 15], ["X", "Y", "Z"], [], verdadero)
```

## Pie Chart (Gráfico de Pastel)

```forja
gráfico_pastel(datos, etiquetas...)
grafico_pastel(datos, etiquetas...)
pie_chart(datos, etiquetas...)
```

```forja
pie_chart([30, 25, 25, 20], ["Rojo", "Verde", "Azul", "Amarillo"])
```

## Donut Chart (Gráfico de Donut)

```forja
gráfico_donut(datos, etiquetas...)
grafico_donut(datos, etiquetas...)
donut_chart(datos, etiquetas...)
```

```forja
donut_chart([45, 30, 25], ["Directo", "Redes", "Email"])
```

## Gauge (Indicador)

```forja
gráfico_indicador(valor: Decimal, minimo: Decimal, maximo: Decimal)
grafico_indicador(valor: Decimal, minimo: Decimal, maximo: Decimal)
gauge_chart(valor: Decimal, minimo: Decimal, maximo: Decimal)
gauge(valor: Decimal, minimo: Decimal, maximo: Decimal)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `valor` | `Decimal` | Valor actual |
| `minimo` | `Decimal` | Mínimo (default: 0) |
| `maximo` | `Decimal` | Máximo (default: 100) |

```forja
gauge(75, 0, 100)
```

## Sparkline (Mini Gráfico)

```forja
minigráfico(datos)
minigrafico(datos)
sparkline(datos)
```

Pequeño gráfico de línea sin ejes. Ideal para incrustar en tarjetas o lists.

```forja
sparkline([5, 8, 12, 7, 15, 10, 18])
```

**Design tokens:**
- Color: `primary`
- Grosor: 1.5px
- Altura: 24dp

## Star Rating (Calificación)

```forja
calificación(valor: Entero, maximo: Entero, cb)
calificacion(valor: Entero, maximo: Entero, cb)
star_rating(valor: Entero, maximo: Entero, cb)
rating(valor: Entero, maximo: Entero, cb)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `valor` | `Entero` | Estrellas llenas |
| `maximo` | `Entero` | Máximo de estrellas (default: 5) |
| `cb` | `&funcion` | Callback al hacer clic |

```forja
star_rating(3, 5, &cb_rating)
```

## Ejemplo completo

```forja
importar "gui"

funcion main() {
    variable datos_ventas = [30, 45, 25, 60, 35, 50]
    variable meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
    variable puntuacion = 3
    
    desplazable(
        columna(
            encabezado_mediano("Dashboard"),
            espacio(16),
            
            // Line Chart
            tarjeta(
                columna(
                    texto_mediano("Ventas mensuales"),
                    espacio(8),
                    line_chart(datos_ventas, meses)
                )
            ),
            espacio(12),
            
            // Bar Chart
            tarjeta(
                columna(
                    texto_mediano("Comparativa"),
                    espacio(8),
                    bar_chart(
                        [40, 30, 20, 10],
                        ["Q1", "Q2", "Q3", "Q4"],
                        ["#6750A4", "#625B71", "#7D5260", "#B3261E"]
                    )
                )
            ),
            espacio(12),
            
            // Donut + Gauge
            fila(
                donut_chart([60, 25, 15], ["Web", "App", "Otros"]),
                espacio(16),
                gauge(72, 0, 100)
            ),
            
            espacio(16),
            
            // Star Rating
            tarjeta(
                columna(
                    texto_mediano("Califica la app"),
                    espacio(8),
                    rating(puntuacion, 5, &cb_rating),
                    espacio(4),
                    etiqueta_dinamica(puntuacion)
                )
            ),
            
            espacio(12),
            
            // Sparkline
            tarjeta(
                columna(
                    texto_mediano("Trending"),
                    espacio(4),
                    sparkline([2, 5, 3, 8, 6, 9, 7])
                )
            )
        )
    )
}

funcion cb_rating() { }
```
