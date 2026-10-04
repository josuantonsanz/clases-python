---
created: 2025-09-17T13:41
updated: 2025-09-17T18:39
dg-publish: true
dg-hide: true
---
# Terminando con lo básico

## Variables

### Cómo nombrar las variables

En Python, las variables no se pueden llamar de cualquier modo, aunque hay mucho margen. Las normas son las siguientes:

1.  Solo puede ser una palabra (sin espacios en blanco).
2.  Solo puede tener letras, números y el guion bajo (`_`).
3.  No puede empezar por un número.

Es importante que las variables tengan nombres reconocibles, que ayuden al programador a saber qué contiene la variable. Python distingue entre mayúsculas y minúsculas al escribir variables y, normalmente, siempre empiezan a escribirse en minúsculas. Si queremos poner dos o más palabras como nombre de una variable `podemosHacerloAsi` (estilo *camelCase*) o `podemos_hacerlo_asi` (estilo *snake_case*). Lo mejor es elegir uno de los estilos y usarlo siempre.

Además, Python se reserva unas pocas palabras que no pueden ser nombres de variables, porque se usan en otras partes del código, son las siguientes: `False`, `None`, `True`, `and`, `as`, `assert`, `async`, `await`, `break`, `class`, `continue`, `def`, `del`, `elif`, `else`, `except`, `finally`, `for`, `from`, `global`, `if`, `import`, `in`, `is`, `lambda`, `nonlocal`, `not`, `or`, `pass`, `raise`, `return`, `try`, `while`, `with`, `yield`.

## Funciones internas

Python viene de serie con algunas funciones muy útiles. Ya hemos visto `print()`, `input()`, `str()`, `int()` y `float()`.

### Longitud de una cadena, función `len()`

La función `len()` sirve para saber cuál es la longitud de una cadena (el número de caracteres que contiene).

```python
nombre = "Josu"
print(len(nombre)) # Muestra 4

frase = "Hola mundo"
print(len(frase)) # Muestra 10 (el espacio también cuenta)
```

### Tipo de variable, función `type()`

Con la función `type()` podemos conocer el tipo de una variable (si es cadena, número entero, número decimal…) y aprovechar ese dato, por ejemplo, para hacer una conversión de uno a otro.

```python
type('17') # Devuelve str de string (cadena)
type(17)   # Devuelve int de integer (entero)
type(17.0) # Devuelve float (número decimal)
```

### Métodos de una variable, función `dir()`

La función `dir()` es un poco más avanzada, pero nos da una pista de todo lo que podemos *hacer* con una variable. Nos muestra una lista de sus «métodos» (acciones que se pueden realizar sobre ella). No te preocupes por entenderlos todos, pero es útil para explorar.

Por ejemplo, las cadenas de texto (`str`) tienen métodos para convertirlas a mayúsculas (`.upper()`) o minúsculas (`.lower()`).

```python
# dir(mi_variable) nos daría una lista enorme de cosas
# Pero podemos usar sus métodos directamente:

saludo = "Hola, ¿qué tal?"
print(saludo.upper()) # Muestra: HOLA, ¿QUÉ TAL?

nombre = "JOSU"
print(nombre.lower()) # Muestra: josu
```

## Operadores

En Python, más allá de la suma y de la resta, hay muchos operadores.

### Operadores aritméticos

Estos son los operadores para cuestiones «matemáticas».

| Operador | Operación | Ejemplo | Evalúa a |
| :--- | :--- | :--- | :--- |
| `+` | Suma | `2 + 3` | 5 |
| `-` | Resta | `3 - 2` | 1 |
| `*` | Multiplicación | `2 * 3` | 6 |
| `/` | División | `7 / 2` | 3.5 |
| `**` | Potencia | `3 ** 2` | 9 |
| `//` | División entera | `7 // 2` | 3 |
| `%` | Resto (Módulo) | `7 % 2` | 1 |

> **Tip: Operadores de asignación compuestos**
> A menudo queremos modificar el valor de una variable basándonos en su valor actual (ej: `x = x + 1`). Python tiene un atajo para esto:
>
> - `x += 3` es lo mismo que `x = x + 3`
> - `x -= 2` es lo mismo que `x = x - 2`
> - `x *= 5` es lo mismo que `x = x * 5`
> - `x /= 4` es lo mismo que `x = x / 4`

### Operadores lógicos y de comparación

Estos operadores no devuelven un número, sino un valor booleano: `True` (verdadero) o `False` (falso). Son la base para tomar decisiones en el código con los condicionales `if`.

**Operadores de Comparación**

| Operador | Significado           | Ejemplo  | Evalúa a |
| :------- | :-------------------- | :------- | :------- |
| ==       | Igual a               | `5 == 5` | `True`   |
| `!=`     | No igual a (distinto) | `5 != 3` | `True`   |
| `<`      | Menor que             | `3 < 5`  | `True`   |
| `>`      | Mayor que             | `3 > 5`  | `False`  |
| `<=`     | Menor o igual que     | `5 <= 5` | `True`   |
| `>=`     | Mayor o igual que     | `5 >= 6` | `False`  |

**Operadores Lógicos**

Nos permiten combinar varias condiciones.

-   **`and` (y)**: Devuelve `True` solo si **ambas** condiciones son verdaderas.
    ```python
    edad = 25
    tiene_entrada = True
    # ¿Puede pasar al concierto?
    puede_pasar = edad >= 18 and tiene_entrada == True
    print(puede_pasar) # Muestra True
    ```
-   **`or` (o)**: Devuelve `True` si **al menos una** de las condiciones es verdadera.
    ```python
    es_fin_de_semana = True
    esta_de_vacaciones = False
    # ¿Puede dormir hasta tarde?
    puede_dormir = es_fin_de_semana or esta_de_vacaciones
    print(puede_dormir) # Muestra True
    ```
-   **`not` (no)**: Invierte el resultado. Lo que era `True` se vuelve `False`, y viceversa.
    ```python
    llueve = False
    print(not llueve) # Muestra True
    ```

