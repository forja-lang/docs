# Guía de depuración de Forja (fa)

Forja incluye un **Debug Adapter Protocol (DAP)** completo que permite depurar
programas `.fa` desde Visual Studio Code (o cualquier cliente DAP) con
breakpoints, inspección de variables, evaluación de expresiones y control de
ejecución paso a paso.

---

## 1. Requisitos

1. Compilar el adaptador DAP:

   ```bash
   cargo build --features dap --bin forja-dap
   ```

   El binario queda en `target/debug/forja-dap` (o `forja-dap.exe` en Windows).

2. Instalar la extensión de VS Code `forja-syntax`, que registra el tipo de
   depurador `forja` y localiza automáticamente el binario `forja-dap` en
   `target/debug`, `target/release` o en el `PATH`.

---

## 2. Configuración de lanzamiento

Crea un archivo `.vscode/launch.json` en tu proyecto:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "forja",
      "request": "launch",
      "name": "Forja: Debug archivo activo",
      "program": "${file}"
    }
  ]
}
```

La extensión también ofrece esta configuración como *snippet* al abrir el panel
de depuración por primera vez.

---

## 3. Breakpoints

### 3.1 Breakpoints por línea

Haz clic en el margen izquierdo del editor (o pulsa `F9`) sobre cualquier línea
ejecutable. El depurador pausará la ejecución al alcanzarla.

### 3.2 Breakpoints condicionales

Haz clic derecho sobre un breakpoint y elige **"Editar breakpoint…"** (o
**"Add Conditional Breakpoint"**). Introduce una expresión Forja; el breakpoint
solo pausará cuando la expresión evalúe a `verdadero`.

Ejemplos de condiciones soportadas:

```forja
i == 10
contador > 100
nombre == "ana"
activo y total < limite
(edad >= 18) o es_admin
```

La evaluación soporta:

- Literales: enteros, decimales, texto, `verdadero`, `falso`, `nulo`.
- Identificadores (variables locales y globales).
- Operadores aritméticos: `+ - * /`.
- Comparación: `== != < > <= >=`.
- Lógicos: `y`/`&&`, `o`/`||`, `no`/`!`.
- Agrupación con paréntesis.

Si una condición no puede evaluarse (por ejemplo, una variable aún no
declarada), el breakpoint **no** pausa y la ejecución continúa.

---

## 4. Inspección de variables

Al pausar, el panel **Variables** muestra dos ámbitos:

- **Locales** — variables del frame actual, con sus **nombres reales**
  recuperados del AST (no `var_0`, `var_1`, …).
- **Globales** — variables de ámbito global.

Cada variable muestra su valor y su tipo (`entero`, `decimal`, `booleano`,
`texto`).

---

## 5. Evaluación de expresiones y Watch

En el panel **Watch** (o en la consola de depuración) puedes escribir cualquier
expresión soportada por el evaluador (ver §3.2). El resultado se recalcula en
cada pausa.

También funciona el *hover* sobre una variable en el editor para ver su valor
actual (`supportsEvaluateForHovers`).

---

## 6. Control de ejecución

| Acción            | Atajo VS Code | Descripción                                    |
| ----------------- | ------------- | ---------------------------------------------- |
| Continuar         | `F5`          | Ejecuta hasta el próximo breakpoint o el final |
| Paso a paso (over)| `F10`         | Ejecuta la línea actual sin entrar en funciones|
| Entrar (into)     | `F11`         | Entra en la función llamada                    |
| Salir (out)       | `Shift+F11`   | Ejecuta hasta salir de la función actual       |
| Pausar            | `F6`          | Pausa la ejecución                             |
| Detener           | `Shift+F5`    | Termina la sesión de depuración                |

El **Call Stack** muestra la pila de llamadas con el nombre de cada función y la
línea actual.

---

## 7. Ejemplo completo

`ejemplo_debug.fa`:

```forja
funcion suma_hasta(n: Entero) -> Entero {
    variable total = 0
    para (variable i = 1; i <= n; i = i + 1) {
        total = total + i
    }
    retornar total
}

variable resultado = suma_hasta(10)
escribir(resultado)
```

1. Pon un breakpoint condicional en `total = total + i` con condición `i == 5`.
2. Inicia la depuración (`F5`). Pausará cuando `i` valga 5.
3. En **Watch**, añade `total` y `i` para observar sus valores.
4. Usa `F10` para avanzar línea a línea y ver cómo evoluciona `total`.

---

## 8. Solución de problemas

| Síntoma                                   | Causa / solución                                                        |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| "forja-dap no encontrado"                 | Compila con `cargo build --features dap --bin forja-dap`.               |
| Los breakpoints no pausan                 | Verifica que la línea sea ejecutable y que la condición evalúe a `verdadero`. |
| Las variables muestran `var_0`, `var_1`   | El AST no pudo analizarse; revisa errores de sintaxis en el archivo.    |
| La condición nunca se cumple              | Comprueba que los nombres de variables coincidan exactamente.           |
