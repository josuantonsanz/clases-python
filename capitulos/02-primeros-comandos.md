# Primeros comandos

En este capítulo empezamos a escribir código de verdad. Veremos los elementos más básicos del lenguaje: comentarios, variables, tipos de datos, operadores y las funciones `print()` e `input()`.

## Comentarios

Los comentarios son líneas de texto dentro del código que Python **ignora** al ejecutar el programa. Sirven para que los programadores dejen notas, explicaciones o recordatorios para sí mismos o para otros que lean el código.

En Python, un comentario de una sola línea comienza con el símbolo de almohadilla (`#`).

```python
# Primer programa
x = 2 + 3  # Esto suma 2 y 3
```

En este caso, `# Primer programa` y `# Esto suma 2 y 3` son comentarios que explican lo que hace el código, pero no afectan a su funcionamiento.

## Variables y asignación

Una **variable** es como una caja con un nombre donde podemos guardar un valor (un número, un texto, etc.). El proceso de guardar un valor en una variable se llama **asignación**, y se realiza con el operador igual (`=`).

```python
x = 2 + 3
```

- `x` es el nombre de la variable.
- `=` es el operador de asignación.
- `2 + 3` es la operación cuyo resultado (en este caso, `5`) se guardará dentro de la variable `x`.

Las variables pueden cambiar de valor (por eso se llaman «variables»):

```python
x = 3       # Ahora x vale 3
x = 2 + x   # Ahora x guardará el valor 5 (2 + 3)
```

::: importante
No confundas el operador de asignación `=` con el de comparación `==`. El primero **guarda** un valor en una variable; el segundo **compara** dos valores.
:::

## Tipos de datos básicos

Hemos visto tres tipos de datos fundamentales.

### Números enteros (`int`)

Son números completos, sin decimales.

```python
x = 5
a = 10
```

### Números flotantes o decimales (`float`)

Son números que tienen una parte decimal.

```python
division = 10 / 4  # El resultado es 2.5, que es un float
x = float(3)       # Convierte el entero 3 al flotante 3.0
```

### Cadenas de texto (`str` o string)

Son secuencias de caracteres (letras, números, símbolos) que se escriben entre comillas dobles (`"`) o simples (`'`).

```python
texto = "Hola, mundo"
nombre = "Josu"
```

## Operadores aritméticos

Son los símbolos que nos permiten realizar operaciones matemáticas básicas.

- `+` : suma
- `-` : resta
- `*` : multiplicación
- `/` : división (en Python 3, el resultado siempre es un `float`)

```python
a = 10
b = 5
suma = a + b        # suma valdrá 15
resta = a - b       # resta valdrá 5
multi = a * b       # multi valdrá 50
division = a / b    # division valdrá 2.0
```

## La función `print()` (salida de datos)

La función `print()` se utiliza para mostrar valores o texto en la pantalla. Es la forma estándar de ver el resultado de nuestro programa.

```python
y = 5
print(y)  # Muestra el número 5 en la pantalla

texto = "Hola, mundo"
print(texto)  # Muestra el texto "Hola, mundo"
```

::: nota Sobre Jupyter Notebook
En un notebook, si la última línea de una celda es una variable o un valor, Jupyter lo muestra automáticamente. Sin embargo, `print()` es explícito y siempre mostrará lo que le pidas, sin importar en qué línea de la celda esté.
:::

## Concatenación de cadenas

Cuando se usa el operador de suma (`+`) con cadenas de texto, en lugar de sumar, las **une** o **concatena**.

```python
texto1 = "Hola"
texto2 = "Josu"
saludo = texto1 + " " + texto2  # Une "Hola", un espacio " " y "Josu"
print(saludo)  # Muestra "Hola Josu"
```

## La función `input()` (entrada de datos)

La función `input()` pausa la ejecución del programa, muestra un mensaje al usuario y espera a que este escriba algo y presione «Enter».

::: importante
Todo lo que el usuario escribe se recibe **siempre** como una **cadena de texto (`str`)**, aunque escriba números.
:::

```python
nombre = input("Pon tu nombre: ")
print(nombre)
```

## Conversión de tipos (casting)

Como `input()` siempre devuelve texto, si queremos hacer operaciones matemáticas con lo que el usuario introduce, primero debemos **convertir** ese texto a un tipo de dato numérico. A este proceso se le llama «casting».

- `int(valor)`: convierte el `valor` a un número entero.
- `float(valor)`: convierte el `valor` a un número flotante (con decimales).
- `str(valor)`: convierte el `valor` a una cadena de texto.

**De `str` a `int`:**

```python
entrada1 = input("Escribe el primer número: ")  # entrada1 es "10" (texto)
a = int(entrada1)                               # a es 10 (número)
```

**De `int` a `str` para imprimir:**

No se puede concatenar un texto con un número directamente (`"Suma: " + 15` daría error). Hay que convertir el número a texto primero.

```python
suma = 15
print("Suma: " + str(suma))  # Convierte el número 15 a texto "15"
```

## Condicionales (`if` / `else`)

Los condicionales nos permiten que nuestro código tome decisiones y ejecute diferentes bloques de código según si una condición se cumple o no.

- `if`: ejecuta el bloque de código que le sigue **si** la condición es verdadera.
- `else`: ejecuta el bloque de código que le sigue **si** la condición del `if` es falsa.

### Operadores de comparación

Para comprobar si dos valores son iguales se usa el doble igual (`==`). ¡No confundir con el `=` de asignación! También podemos comprobar si algo es distinto (`!=`), mayor o menor que otra cosa (`>`, `<`) o mayor o igual y menor o igual (`>=`, `<=`).

| Operador | Significado |
|----------|-------------|
| `==` | igual que |
| `!=` | distinto de |
| `>` | mayor que |
| `<` | menor que |
| `>=` | mayor o igual que |
| `<=` | menor o igual que |

### Indentación

En Python, los bloques de código que pertenecen a un `if` o a un `else` deben estar **indentados** (tener un espacio o tabulación al principio). Así es como Python sabe qué código ejecutar en cada caso.

```python
x = float(input("Escribe un número: "))  # Pide un número y lo convierte a float

if x == 3:  # Comprueba si el valor de x es igual a 3
    # Este bloque solo se ejecuta si la condición es verdadera
    print("X es igual a 3")
else:
    # Este bloque solo se ejecuta si la condición es falsa
    print("X no es 3")
```

::: resumen
- Los **comentarios** empiezan por `#` y Python los ignora.
- Una **variable** guarda un valor; se asigna con `=`.
- Tipos básicos: `int`, `float` y `str`.
- `print()` muestra datos e `input()` los pide (siempre como texto).
- El **casting** (`int()`, `float()`, `str()`) convierte entre tipos.
- Los **condicionales** (`if` / `else`) deciden qué código se ejecuta según una condición.
:::
