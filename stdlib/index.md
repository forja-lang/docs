# 📚 Biblioteca Estándar de Forja (stdlib)

## Visión General
La stdlib de Forja proporciona funciones fundamentales agrupadas en 3 módulos:
- **`std/io`** — Entrada/Salida por consola (9 funciones)
- **`std/matematica`** — Operaciones matemáticas (13 funciones)
- **`std/prueba`** — Framework de testing (2 funciones)

## Cómo importar
```forja
importar "std/io"
importar "std/matematica"
importar "std/prueba"
```

---

# MÓDULO 1: std/io — Entrada y Salida

## Descripción
Módulo para interactuar con la consola: imprimir texto, leer entrada del usuario, mostrar errores y advertencias.

## Función: `imprimir`
**Archivo:** [`stdlib/std/io.fa:4`](../../stdlib/std/io.fa:4)

```forja
funcion imprimir(texto)
```

### Descripción
Imprime un texto en la consola seguido de un salto de línea.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` (implícito) | El texto a imprimir. Se aplica `convertir(texto, Texto)` automáticamente. |

### Comportamiento
- Añade un salto de línea (`\n`) al final
- Usa `ffi_io_println()` internamente (llamada FFI al runtime de Forja)
- Acepta cualquier tipo que pueda convertirse a Texto

### Código fuente
```forja
funcion imprimir(texto) {
    ffi_io_println(texto)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    imprimir("Hola mundo")        # → Hola mundo\n
    imprimir(42)                   # → 42\n
    imprimir(3.1416)               # → 3.1416\n
    imprimir(verdadero)            # → verdadero\n
}
```

### Casos de uso
- Depuración rápida de variables
- Mostrar resultados al usuario
- Logs simples

---

## Función: `imprimir_sin_salto`
**Archivo:** [`stdlib/std/io.fa:9`](../../stdlib/std/io.fa:9)

```forja
funcion imprimir_sin_salto(texto)
```

### Descripción
Imprime un texto en la consola SIN salto de línea al final. Útil para prompts y progreso en línea.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `texto` | `Texto` (implícito) | Texto a imprimir sin salto de línea |

### Comportamiento
- NO añade salto de línea
- El siguiente `imprimir()` continuará en la misma línea
- Usa `ffi_io_print()` internamente

### Código fuente
```forja
funcion imprimir_sin_salto(texto) {
    ffi_io_print(texto)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    imprimir_sin_salto("Ingrese su nombre: ")
    # El cursor queda al final de ": " esperando entrada
    variable nombre = pedir_texto("")
    # Se ve: "Ingrese su nombre: [entrada del usuario]"
}
```

### Diferencia con `imprimir`
| Función | Salto de línea | Uso |
|---------|---------------|-----|
| `imprimir` | Sí ✅ | Mensajes, resultados |
| `imprimir_sin_salto` | No ❌ | Prompts, progreso |

---

## Función: `imprimir_varios`
**Archivo:** [`stdlib/std/io.fa:14`](../../stdlib/std/io.fa:14)

```forja
funcion imprimir_varios(separador, valores)
```

### Descripción
Imprime múltiples valores separados por un separador.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `separador` | `Texto` | Texto que se coloca entre cada valor |
| `valores` | Array/Tupla | Lista de valores a imprimir |

### Comportamiento
- Convierte cada valor a Texto
- Los une con el separador
- Añade salto de línea al final
- Usa `ffi_io_print_multiples()` internamente

### Código fuente
```forja
funcion imprimir_varios(separador, valores) {
    ffi_io_print_multiples(separador, valores)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    # Imprimir array con coma
    imprimir_varios(", ", (1, 2, 3, 4, 5))
    # → 1, 2, 3, 4, 5
    
    # Imprimir con guión
    imprimir_varios(" - ", ("a", "b", "c"))
    # → a - b - c
    
    # Con diferentes tipos
    imprimir_varios(" | ", (42, "hola", verdadero))
    # → 42 | hola | verdadero
}
```

### Casos de uso
- Mostrar arrays de datos
- Formatear listas para el usuario
- Depurar múltiples variables

---

## Función: `imprimir_linea`
**Archivo:** [`stdlib/std/io.fa:19`](../../stdlib/std/io.fa:19)

```forja
funcion imprimir_linea()
```

### Descripción
Imprime una línea decorativa de separación (30 caracteres `─`).

### Parámetros
Ninguno.

### Comportamiento
- Imprime exactamente: `────────────────────────────`
- Siempre igual, independiente del contexto
- Útil para separar secciones visualmente

### Código fuente
```forja
funcion imprimir_linea() {
    ffi_io_println("────────────────────────────")
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    imprimir("Inicio del programa")
    imprimir_linea()
    imprimir("Sección 1")
    imprimir_linea()
    imprimir("Fin del programa")
}
# Salida:
# Inicio del programa
# ────────────────────────────
# Sección 1
# ────────────────────────────
# Fin del programa
```

---

## Función: `pedir_texto`
**Archivo:** [`stdlib/std/io.fa:24`](../../stdlib/std/io.fa:24)

```forja
funcion pedir_texto(mensaje) -> Texto
```

### Descripción
Muestra un mensaje y lee una línea de texto ingresada por el usuario.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Mensaje mostrado al usuario antes de la entrada |

### Retorno
| Tipo | Descripción |
|------|-------------|
| `Texto` | La línea completa ingresada por el usuario (sin salto de línea) |

### Comportamiento
1. Imprime `mensaje` sin salto de línea
2. Espera a que el usuario escriba y presione Enter
3. Retorna el texto ingresado (vacío si solo Enter)

### Código fuente
```forja
funcion pedir_texto(mensaje) -> Texto {
    ffi_io_print(mensaje)
    retornar ffi_io_readline()
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    variable nombre = pedir_texto("¿Cómo te llamas? ")
    imprimir("Hola, " + nombre + "!")
}

# Ejemplo de ejecución:
# ¿Cómo te llamas? Ana
# Hola, Ana!
```

### Casos de uso
- Menús interactivos
- Formularios por consola
- Captura de datos del usuario

---

## Función: `pedir_numero`
**Archivo:** [`stdlib/std/io.fa:30`](../../stdlib/std/io.fa:30)

```forja
funcion pedir_numero(mensaje) -> Entero
```

### Descripción
Muestra un mensaje, lee una línea de texto y la convierte a entero.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Mensaje mostrado al usuario antes de la entrada |

### Retorno
| Tipo | Descripción |
|------|-------------|
| `Entero` | El número ingresado convertido a entero |

### Comportamiento
1. Imprime `mensaje` sin salto de línea
2. Lee la entrada del usuario con `ffi_io_readline()`
3. Convierte el texto a entero con `convertir(entrada, Entero)`
4. Si la entrada no es un número válido, la conversión falla

### ⚠️ Advertencia
No maneja errores de conversión. Si el usuario ingresa texto no numérico, el programa fallará. Para uso seguro, combinar con manejo de errores:

```forja
variable entrada = pedir_texto("Edad: ")
# Validar antes de convertir
si longitud(entrada) > 0 {
    variable edad = convertir(entrada, Entero)
    # ...
}
```

### Código fuente
```forja
funcion pedir_numero(mensaje) -> Entero {
    ffi_io_print(mensaje)
    variable entrada = ffi_io_readline()
    retornar convertir(entrada, Entero)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    variable edad = pedir_numero("Ingresa tu edad: ")
    imprimir("Tienes " + edad + " años")
}

# Ejecución:
# Ingresa tu edad: 25
# Tienes 25 años
```

### Errores comunes
| Entrada | Resultado |
|---------|-----------|
| `"25"` | ✅ 25 (correcto) |
| `"25.5"` | ⚠️ Error (no se puede convertir decimal a entero directamente) |
| `"abc"` | ❌ Error de conversión |
| `""` | ❌ Error (vacío) |

---

## Función: `mostrar_error`
**Archivo:** [`stdlib/std/io.fa:37`](../../stdlib/std/io.fa:37)

```forja
funcion mostrar_error(mensaje)
```

### Descripción
Muestra un mensaje de error con el prefijo `[ERROR]`.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Descripción del error |

### Salida
```
[ERROR] <mensaje>
```

### Código fuente
```forja
funcion mostrar_error(mensaje) {
    ffi_io_println("[ERROR] " + mensaje)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    variable archivo = "datos.txt"
    mostrar_error("No se pudo abrir el archivo: " + archivo)
}
# Salida: [ERROR] No se pudo abrir el archivo: datos.txt
```

---

## Función: `mostrar_advertencia`
**Archivo:** [`stdlib/std/io.fa:42`](../../stdlib/std/io.fa:42)

```forja
funcion mostrar_advertencia(mensaje)
```

### Descripción
Muestra un mensaje de advertencia con el prefijo `[ADVERTENCIA]`.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Descripción de la advertencia |

### Salida
```
[ADVERTENCIA] <mensaje>
```

### Código fuente
```forja
funcion mostrar_advertencia(mensaje) {
    ffi_io_println("[ADVERTENCIA] " + mensaje)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    mostrar_advertencia("El archivo existe pero está vacío")
}
# Salida: [ADVERTENCIA] El archivo existe pero está vacío
```

---

## Función: `mostrar_info`
**Archivo:** [`stdlib/std/io.fa:46`](../../stdlib/std/io.fa:46)

```forja
funcion mostrar_info(mensaje)
```

### Descripción
Muestra un mensaje informativo con el prefijo `[INFO]`.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Información a mostrar |

### Salida
```
[INFO] <mensaje>
```

### Código fuente
```forja
funcion mostrar_info(mensaje) {
    ffi_io_println("[INFO] " + mensaje)
}
```

### Ejemplos
```forja
importar "std/io"

funcion main() {
    mostrar_info("Procesando archivo...")
    # ... procesamiento
    mostrar_info("Completado.")
}
# Salida:
# [INFO] Procesando archivo...
# [INFO] Completado.
```

### Comparativa de mensajes
| Función | Prefijo | Uso |
|---------|---------|-----|
| `mostrar_info` | `[INFO]` | Información general, progreso |
| `mostrar_advertencia` | `[ADVERTENCIA]` | Situaciones no críticas pero notables |
| `mostrar_error` | `[ERROR]` | Errores que requieren atención |

---

# MÓDULO 2: std/matematica — Matemáticas

## Descripción
Módulo con operaciones matemáticas comunes: valor absoluto, máximo/mínimo, potencia, factorial, paridad, redondeo, estadística básica y algoritmo de Euclides.

## Función: `abs`
**Archivo:** [`stdlib/std/matematica.fa:4`](../../stdlib/std/matematica.fa:4)

```forja
funcion abs(valor) -> Entero
```

### Descripción
Retorna el valor absoluto de un número entero. Si el número es negativo, retorna su positivo; si es positivo o cero, lo retorna sin cambios.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `valor` | `Entero` (implícito) | Número del cual obtener el valor absoluto |

### Retorno
| Tipo | Condición | Descripción |
|------|-----------|-------------|
| `Entero` | `valor < 0` | `-valor` (positivo) |
| `Entero` | `valor >= 0` | `valor` (sin cambios) |

### Código fuente
```forja
funcion abs(valor) -> Entero {
    si valor < 0 {
        retornar -valor
    }
    retornar valor
}
```

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(abs(5))    # → 5
    imprimir(abs(-5))   # → 5
    imprimir(abs(0))    # → 0
    imprimir(abs(-100)) # → 100
}
```

### Implementación
Usa un condicional simple:
1. Si el valor es negativo, retorna su negación (`-valor`)
2. Si no, retorna el valor original

### Complejidad
- Tiempo: O(1)
- Espacio: O(1)

---

## Función: `max`
**Archivo:** [`stdlib/std/matematica.fa:10`](../../stdlib/std/matematica.fa:10)

```forja
funcion max(a, b)
```

### Descripción
Retorna el mayor de dos valores.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `a` | `Comparable` | Primer valor a comparar |
| `b` | `Comparable` | Segundo valor a comparar |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `a > b` | `a` |
| `a <= b` | `b` |

Funciona con cualquier tipo que soporte el operador `>` (Entero, Decimal, Texto, etc.).

### Código fuente
```forja
funcion max(a, b) {
    si a > b {
        retornar a
    }
    retornar b
}
```

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(max(10, 20))     # → 20
    imprimir(max(-5, -1))    # → -1
    imprimir(max(3.14, 2.71)) # → 3.14
    imprimir(max("z", "a"))  # → z (orden alfabético)
}
```

### Complejidad
- Tiempo: O(1)
- Espacio: O(1)

---

## Función: `min`
**Archivo:** [`stdlib/std/matematica.fa:16`](../../stdlib/std/matematica.fa:16)

```forja
funcion min(a, b)
```

### Descripción
Retorna el menor de dos valores.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `a` | `Comparable` | Primer valor |
| `b` | `Comparable` | Segundo valor |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `a < b` | `a` |
| `a >= b` | `b` |

### Código fuente
```forja
funcion min(a, b) {
    si a < b {
        retornar a
    }
    retornar b
}
```

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(min(10, 20))     # → 10
    imprimir(min(-5, -1))    # → -5
    imprimir(min(3.14, 2.71)) # → 2.71
}
```

### Combinando `min` y `max`
```forja
variable minimo = min(a, min(b, c))  # Mínimo de 3 valores
variable maximo = max(a, max(b, c))  # Máximo de 3 valores
```

---

## Función: `clamp`
**Archivo:** [`stdlib/std/matematica.fa:22`](../../stdlib/std/matematica.fa:22)

```forja
funcion clamp(valor, min, max)
```

### Descripción
Limita un valor dentro de un rango [min, max]. Si el valor es menor que `min`, retorna `min`. Si es mayor que `max`, retorna `max`. Si está dentro del rango, retorna el valor sin cambios.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `valor` | `Comparable` | Valor a limitar |
| `min` | `Comparable` | Límite inferior |
| `max` | `Comparable` | Límite superior |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `valor < min` | `min` |
| `valor > max` | `max` |
| `min <= valor <= max` | `valor` |

### Código fuente
```forja
funcion clamp(valor, min, max) {
    si valor < min { retornar min }
    si valor > max { retornar max }
    retornar valor
}
```

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(clamp(150, 0, 100)) # → 100 (supera el máximo)
    imprimir(clamp(-10, 0, 100)) # → 0 (menor que mínimo)
    imprimir(clamp(50, 0, 100))  # → 50 (dentro del rango)
}
```

### Casos de uso
- Limitar valores de slider/barra de progreso
- Validar inputs de usuario
- Asegurar que un índice está dentro de un array

---

## Función: `potencia`
**Archivo:** [`stdlib/std/matematica.fa:29`](../../stdlib/std/matematica.fa:29)

```forja
funcion potencia(base, exponente) -> Entero
```

### Descripción
Calcula `base` elevado a la `exponente` (base^exponente) usando multiplicación iterativa.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `base` | `Entero` | Número base |
| `exponente` | `Entero` | Exponente (debe ser >= 0) |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `exponente = 0` | `1` (por definición) |
| `exponente > 0` | `base * base * ... * base` (n veces) |

### Código fuente
```forja
funcion potencia(base, exponente) -> Entero {
    variable resultado = 1
    variable i = 0
    mientras i < exponente {
        resultado = resultado * base
        i = i + 1
    }
    retornar resultado
}
```

### Implementación
Usa un bucle `mientras` que multiplica `resultado` por `base` tantas veces como indique `exponente`.

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(potencia(2, 3))  # → 8  (2×2×2)
    imprimir(potencia(5, 2))  # → 25 (5×5)
    imprimir(potencia(10, 0)) # → 1  (cualquier número^0 = 1)
    imprimir(potencia(3, 4))  # → 81 (3×3×3×3)
}
```

### Complejidad
- Tiempo: O(n) donde n = exponente
- Espacio: O(1)

### Limitaciones
- Solo funciona con exponentes enteros no negativos
- Para exponentes grandes, el resultado puede desbordar el tipo Entero
- No usa exponenciación binaria (O(log n)), podría ser más eficiente

---

## Función: `factorial`
**Archivo:** [`stdlib/std/matematica.fa:36`](../../stdlib/std/matematica.fa:36)

```forja
funcion factorial(n) -> Entero
```

### Descripción
Calcula el factorial de un número n (n!). El factorial de n es el producto de todos los enteros positivos desde 1 hasta n.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `n` | `Entero` | Número para calcular factorial |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `n <= 1` | `1` (caso base) |
| `n > 1` | `n * factorial(n - 1)` (recursivo) |

### Código fuente
```forja
funcion factorial(n) -> Entero {
    si n <= 1 {
        retornar 1
    }
    retornar n * factorial(n - 1)
}
```

### Implementación
Usa **recursión**: el caso base es `n <= 1` que retorna 1, y el caso recursivo multiplica `n` por `factorial(n-1)`.

### Valores conocidos
| n | n! | 
|---|----|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 6 | 720 |
| 7 | 5040 |
| 8 | 40320 |
| 9 | 362880 |
| 10 | 3628800 |

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(factorial(5))  # → 120
    imprimir(factorial(0))  # → 1
    imprimir(factorial(10)) # → 3628800
}
```

### Complejidad
- Tiempo: O(n)
- Espacio: O(n) (por la pila de recursión)

### ⚠️ Advertencia
El factorial crece muy rápido. `factorial(20)` = 2.432.902.008.176.640.000, que excede el rango típico de Entero (32 bits: 2^31-1 ≈ 2.1×10^9). Para números grandes, usar Decimal.

---

## Función: `es_par`
**Archivo:** [`stdlib/std/matematica.fa:43`](../../stdlib/std/matematica.fa:43)

```forja
funcion es_par(n) -> Logico
```

### Descripción
Verifica si un número entero es par (divisible por 2).

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `n` | `Entero` | Número a verificar |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `n % 2 == 0` | `verdadero` |
| `n % 2 != 0` | `falso` |

### Código fuente
```forja
funcion es_par(n) -> Logico {
    retornar n % 2 == 0
}
```

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(es_par(4))  # → verdadero
    imprimir(es_par(7))  # → falso
    imprimir(es_par(0))  # → verdadero (0 es par)
    imprimir(es_par(-2)) # → verdadero
}
```

---

## Función: `es_impar`
**Archivo:** [`stdlib/std/matematica.fa:48`](../../stdlib/std/matematica.fa:48)

```forja
funcion es_impar(n) -> Logico
```

### Descripción
Verifica si un número entero es impar (NO divisible por 2).

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `n` | `Entero` | Número a verificar |

### Retorno
| Condición | Retorno |
|-----------|---------|
| `n % 2 != 0` | `verdadero` |
| `n % 2 == 0` | `falso` |

### Código fuente
```forja
funcion es_impar(n) -> Logico {
    retornar n % 2 != 0
}
```

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(es_impar(3))  # → verdadero
    imprimir(es_impar(4))  # → falso
    imprimir(es_impar(0))  # → falso
    imprimir(es_impar(-1)) # → verdadero
}
```

### Relación entre `es_par` y `es_impar`
```forja
es_impar(n) == !es_par(n)  # Siempre son complementarios
```

---

## Función: `redondear`
**Archivo:** [`stdlib/std/matematica.fa:53`](../../stdlib/std/matematica.fa:53)

```forja
funcion redondear(valor) -> Entero
```

### Descripción
Redondea un número decimal al entero más cercano. Usa redondeo estándar (0.5 hacia arriba).

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `valor` | `Decimal` | Número decimal a redondear |

### Retorno
| Condición | Retorno |
|-----------|---------|
| Parte decimal < 0.5 | Entero inferior |
| Parte decimal >= 0.5 | Entero superior |

### Código fuente
```forja
funcion redondear(valor) -> Entero {
    variable entero = convertir(valor, Entero)
    variable decimal = valor - convertir(entero, Decimal)
    si decimal >= 0.5 {
        retornar entero + 1
    }
    retornar entero
}
```

### Implementación
1. Extrae la parte entera (truncando)
2. Calcula la parte decimal restando
3. Si la parte decimal >= 0.5, suma 1 al entero

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(redondear(3.2))  # → 3
    imprimir(redondear(3.5))  # → 4
    imprimir(redondear(3.7))  # → 4
    imprimir(redondear(-1.3)) # → -1
    imprimir(redondear(-1.7)) # → -2
}
```

---

## Función: `suma_array`
**Archivo:** [`stdlib/std/matematica.fa:60`](../../stdlib/std/matematica.fa:60)

```forja
funcion suma_array(arr) -> Entero
```

### Descripción
Suma todos los elementos de un array de números enteros.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `arr` | `Array<Entero>` | Array de números enteros a sumar |

### Retorno
| Tipo | Descripción |
|------|-------------|
| `Entero` | Suma total de todos los elementos |

### Código fuente
```forja
funcion suma_array(arr) -> Entero {
    variable total = 0
    variable i = 0
    mientras i < longitud(arr) {
        total = total + arr[i]
        i = i + 1
    }
    retornar total
}
```

### Implementación
Usa un bucle `mientras` con índice que acumula cada elemento en `total`.

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(suma_array((1, 2, 3, 4, 5))) # → 15
    imprimir(suma_array((10, 20, 30)))    # → 60
    imprimir(suma_array(()))              # → 0 (array vacío)
}
```

### Complejidad
- Tiempo: O(n) donde n = longitud del array
- Espacio: O(1)

---

## Función: `promedio`
**Archivo:** [`stdlib/std/matematica.fa:68`](../../stdlib/std/matematica.fa:68)

```forja
funcion promedio(arr) -> Decimal
```

### Descripción
Calcula el promedio (media aritmética) de un array de números.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `arr` | `Array<numérico>` | Array de números |

### Retorno
| Tipo | Descripción |
|------|-------------|
| `Decimal` | Promedio de todos los elementos |

### Código fuente
```forja
funcion promedio(arr) -> Decimal {
    variable total = 0
    variable i = 0
    mientras i < longitud(arr) {
        total = total + arr[i]
        i = i + 1
    }
    retornar convertir(total, Decimal) / convertir(longitud(arr), Decimal)
}
```

### Implementación
1. Suma todos los elementos en `total`
2. Divide total convertido a Decimal entre la longitud convertida a Decimal
3. Usa `convertir()` para evitar división entera

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(promedio((1, 2, 3, 4, 5)))  # → 3.0
    imprimir(promedio((10, 20, 30)))     # → 20.0
    imprimir(promedio((1, 2)))           # → 1.5
}
```

### ⚠️ Advertencia
Si el array está vacío, se divide por 0 (error).

---

## Función: `mcd`
**Archivo:** [`stdlib/std/matematica.fa:78`](../../stdlib/std/matematica.fa:78)

```forja
funcion mcd(a, b) -> Entero
```

### Descripción
Calcula el Máximo Común Divisor de dos números enteros usando el algoritmo de Euclides.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `a` | `Entero` | Primer número |
| `b` | `Entero` | Segundo número |

### Retorno
| Tipo | Descripción |
|------|-------------|
| `Entero` | Máximo común divisor de a y b |

### Código fuente
```forja
funcion mcd(a, b) -> Entero {
    mientras b != 0 {
        variable temp = b
        b = a % b
        a = temp
    }
    retornar a
}
```

### Implementación
Usa el algoritmo de Euclides:
1. Mientras `b != 0`:
   - Guarda `b` en `temp`
   - `b = a % b`
   - `a = temp`
2. Retorna `a`

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(mcd(12, 8))   # → 4
    imprimir(mcd(54, 24))  # → 6
    imprimir(mcd(17, 5))   # → 1 (primos entre sí)
    imprimir(mcd(100, 75)) # → 25
}
```

### Complejidad
- Tiempo: O(log(min(a, b))) — muy eficiente
- Espacio: O(1)

---

## Función: `mcm`
**Archivo:** [`stdlib/std/matematica.fa:85`](../../stdlib/std/matematica.fa:85)

```forja
funcion mcm(a, b) -> Entero
```

### Descripción
Calcula el Mínimo Común Múltiplo de dos números enteros.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `a` | `Entero` | Primer número |
| `b` | `Entero` | Segundo número |

### Retorno
| Tipo | Descripción |
|------|-------------|
| `Entero` | Mínimo común múltiplo de a y b |

### Código fuente
```forja
funcion mcm(a, b) -> Entero {
    retornar (a / mcd(a, b)) * b
}
```

### Implementación
Usa la relación: `mcm(a,b) * mcd(a,b) = a * b`, por lo tanto `mcm(a,b) = (a / mcd(a,b)) * b`.

### Ejemplos
```forja
importar "std/matematica"

funcion main() {
    imprimir(mcm(12, 8))   # → 24
    imprimir(mcm(4, 6))    # → 12
    imprimir(mcm(3, 5))    # → 15
    imprimir(mcm(12, 18))  # → 36
}
```

### Complejidad
- Tiempo: O(log(min(a, b))) (hereda la complejidad de mcd)
- Espacio: O(1)

---

# MÓDULO 3: std/prueba — Testing

## Descripción
Módulo para escribir pruebas unitarias. Proporciona aserciones para verificar condiciones.

## Función: `asegurar`
**Archivo:** [`stdlib/std/prueba.fa:4`](../../stdlib/std/prueba.fa:4)

```forja
funcion asegurar(condicion, mensaje)
```

### Descripción
Verifica que una condición sea verdadera. Si es falsa, lanza un error de aserción con el mensaje proporcionado.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `condicion` | `Logico` | Condición que debe ser verdadera |
| `mensaje` | `Texto` | Mensaje de error si la condición falla |

### Comportamiento
- Si `condicion` es `verdadero`: no hace nada (la prueba pasa)
- Si `condicion` es `falso`: llama a `ffi_assertion_error(mensaje)` que detiene la ejecución con error

### Código fuente
```forja
funcion asegurar(condicion, mensaje) {
    si !condicion {
        ffi_assertion_error(mensaje)
    }
}
```

### Ejemplos
```forja
importar "std/prueba"
importar "std/matematica"

funcion pruebas_suma() {
    asegurar(suma_array((1, 2, 3)) == 6, "1+2+3 debería ser 6")
    asegurar(suma_array(()) == 0, "Array vacío suma 0")
    asegurar(suma_array((-1, 1)) == 0, "-1+1 debería ser 0")
    imprimir("✓ pruebas_suma pasaron")
}

funcion pruebas_matematica() {
    asegurar(abs(-5) == 5, "abs(-5) debería ser 5")
    asegurar(max(10, 20) == 20, "max(10,20) debería ser 20")
    asegurar(min(10, 20) == 10, "min(10,20) debería ser 10")
    asegurar(es_par(4) == verdadero, "4 debería ser par")
    asegurar(es_impar(3) == verdadero, "3 debería ser impar")
    imprimir("✓ pruebas_matematica pasaron")
}

funcion main() {
    pruebas_suma()
    pruebas_matematica()
    imprimir("✓ Todas las pruebas pasaron")
}
```

### Salida esperada
```
✓ pruebas_suma pasaron
✓ pruebas_matematica pasaron
✓ Todas las pruebas pasaron
```

---

## Función: `error_assertion`
**Archivo:** [`stdlib/std/prueba.fa:8`](../../stdlib/std/prueba.fa:8)

```forja
funcion error_assertion(mensaje)
```

### Descripción
Lanza un error de aserción directamente, sin verificar condición. Útil para puntos del código que nunca deberían alcanzarse.

### Parámetros
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `mensaje` | `Texto` | Mensaje de error |

### Código fuente
```forja
funcion error_assertion(mensaje) {
    ffi_assertion_error(mensaje)
}
```

### Ejemplos
```forja
importar "std/prueba"

funcion dividir(a, b) -> Decimal {
    si b == 0 {
        error_assertion("No se puede dividir por cero")
    }
    retornar convertir(a, Decimal) / convertir(b, Decimal)
}

funcion main() {
    variable resultado = dividir(10, 2)  # OK
    imprimir(resultado)
    
    variable error = dividir(10, 0)  # Lanza error_assertion
}
```

---

# REFERENCIA RÁPIDA

## io.fa — Entrada y Salida
| Función | Descripción | Retorno |
|---------|-------------|---------|
| `imprimir(texto)` | Imprime con salto de línea | — |
| `imprimir_sin_salto(texto)` | Imprime sin salto de línea | — |
| `imprimir_varios(sep, vals)` | Imprime múltiples valores | — |
| `imprimir_linea()` | Línea decorativa | — |
| `pedir_texto(mensaje)` | Lee texto del usuario | `Texto` |
| `pedir_numero(mensaje)` | Lee número del usuario | `Entero` |
| `mostrar_error(mensaje)` | Muestra error `[ERROR]` | — |
| `mostrar_advertencia(mensaje)` | Muestra advertencia `[ADVERTENCIA]` | — |
| `mostrar_info(mensaje)` | Muestra info `[INFO]` | — |

## matematica.fa — Matemáticas
| Función | Descripción | Retorno |
|---------|-------------|---------|
| `abs(valor)` | Valor absoluto | `Entero` |
| `max(a, b)` | Máximo entre dos | `typeof(a)` |
| `min(a, b)` | Mínimo entre dos | `typeof(a)` |
| `clamp(valor, min, max)` | Limitar en rango | `typeof(valor)` |
| `potencia(base, exp)` | base^exp | `Entero` |
| `factorial(n)` | n! (recursivo) | `Entero` |
| `es_par(n)` | ¿Es par? | `Logico` |
| `es_impar(n)` | ¿Es impar? | `Logico` |
| `redondear(valor)` | Redondeo estándar | `Entero` |
| `suma_array(arr)` | Suma de array | `Entero` |
| `promedio(arr)` | Media aritmética | `Decimal` |
| `mcd(a, b)` | Máximo común divisor | `Entero` |
| `mcm(a, b)` | Mínimo común múltiplo | `Entero` |

## prueba.fa — Testing
| Función | Descripción |
|---------|-------------|
| `asegurar(cond, mensaje)` | Verifica condición, error si falsa |
| `error_assertion(mensaje)` | Lanza error de aserción directo |
