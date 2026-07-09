# 🚀 Empezar con Forja GUI

## Tu primera app GUI en 5 minutos

### 1. Crear un archivo

Crea `mi_app.fa`:

```forja
importar "gui"

funcion main() {
    variable nombre = ""
    
    columna(
        barra_superior("Mi App", ()),
        espacio(16),
        
        texto_mediano("¡Hola, Forja GUI!"),
        espacio(8),
        
        campo_texto(nombre, "Tu nombre"),
        espacio(8),
        
        boton_relleno("Saludar", &saludar),
        espacio(8),
        
        etiqueta_dinamica(nombre)
    )
}

funcion saludar() -> Texto {
    retornar "¡Hola desde Forja GUI!"
}
```

### 2. Ejecutar

```bash
cargo run --bin forja-gui -- mi_app.fa
```

### 3. Ver resultado

Se abrirá una ventana nativa con el formulario.

## Conceptos básicos

### Layout

Los componentes se organizan en contenedores:

| Función | Descripción |
|---------|-------------|
| [`columna(hijos...)`](componentes/layout.md) | Disposición vertical (flex columna) |
| [`fila(hijos...)`](componentes/layout.md) | Disposición horizontal (flex fila) |
| [`pila(hijos...)`](componentes/layout.md) | Superposición (z-index) |
| [`desplazable(hijo)`](componentes/layout.md) | Contenido con scroll |
| [`grilla(hijos, filas, cols)`](componentes/layout.md) | Grid con posición fija |

### Estado

Las variables de Forja se enlazan automáticamente con los widgets:

```forja
variable texto = ""
campo_texto(texto, "Etiqueta")  # Se actualiza automáticamente
```

### Eventos

Los botones y controles ejecutan callbacks:

```forja
boton_relleno("Click", &mi_funcion)
```

### Texto con estilos tipográficos

```forja
texto_grande("Display Large")
titular_mediano("Headline Medium")
encabezado_pequeño("Title Small")
cuerpo_grande("Body Large")
etiqueta_mediana("Label Medium")
```

### Colores del tema

```forja
color_primario(hijo)
color_secundario(hijo)
color_error(hijo)
color_superficie(hijo)
```

### Formas y elevación

```forja
esquinas_medianas(hijo)
sombra(hijo, 2)    # nivel 0-5
relleno(hijo, 16)  # padding
```

## Tema

Por defecto se usa tema claro. Para cambiarlo:

```bash
# Tema oscuro
forja-gui --dark mi_app.fa

# Tema personalizado con color semilla
forja-gui --tema #FF5722 mi_app.fa

# Auto-detectar tema del sistema
forja-gui --auto-tema mi_app.fa
```

## Layout responsivo

```forja
adaptable(
    columna(        # Compact: < 600dp
        texto_pequeño("Celular")
    ),
    fila(           # Medium: 600-840dp
        texto_mediano("Tablet")
    ),
    fila(           # Expanded: > 840dp
        texto_grande("Escritorio")
    )
)
```

## Scaffold (andamio)

Estructura completa de pantalla:

```forja
andamio(
    barra_superior("Mi App", (boton_icono("⚙️", &ajustes))),
    cuerpo_principal,
    barra_inferior((boton_icono("🏠", &inicio)))
)
```

## Siguientes pasos

- Revisa la [documentación de componentes](index.md) para ver todos los widgets disponibles
- Explora los [ejemplos](../examples/) para ver apps completas
- Personaliza el tema con tu propio [color semilla](tema/index.md)
