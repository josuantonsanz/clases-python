---
created: 2025-09-15T18:02
updated: 2025-09-17T13:43
dg-publish: true
dg-hide: true
---
# Conceptos básicos de programación en Python 

## 1. Comentarios

Los comentarios son líneas de texto dentro del código que Python ignora al ejecutar el programa. Sirven para que los programadores dejen notas, explicaciones o recordatorios para sí mismos o para otros que lean el código.

En Python, un comentario de una sola línea comienza con el símbolo de almohadilla (`#`).

**Ejemplo del notebook:**

```python
# Primer programa
x = 2 + 3 # Esto suma 2 y 3
```

En este caso, `# Primer programa` y `# Esto suma 2 y 3` son comentarios que explican lo que hace el código, pero no afectan a su funcionamiento.

## 2. Variables y asignación

Una **variable** es como una caja con un nombre donde podemos guardar un valor (un número, un texto, etc.). El proceso de guardar un valor en una variable se llama **asignación**, y se realiza con el operador igual (=).

**Ejemplo del notebook:**

```python
x = 2 + 3
```

- `x` es el nombre de la variable.
- = es el operador de asignación.
- `2 + 3` es la operación cuyo resultado (en este caso, `5`) se guardará dentro de la variable `x`.

Las variables pueden cambiar de valor (por eso se llaman «variables»):

```python
x = 3      # Ahora x vale 3
x = 2 + x  # Ahora x guardará el valor 5 (2 + 3)
```

## 3. Tipos de datos básicos

Hemos visto tres tipos de datos fundamentales

#### a) Números enteros (`int`)

Son números completos, sin decimales.

```python
x = 5
a = 10
```

#### b) Números flotantes o decimales (`float`)

Son números que tienen una parte decimal.

```python
division = 10 / 4  # El resultado es 2.5, que es un float
x = float(3)       # Convierte el entero 3 al flotante 3.0
```

#### c) Cadenas de texto (`str` o string)

Son secuencias de caracteres (letras, números, símbolos) que se escriben entre comillas dobles (`"`) o simples (`'`).

```python
texto = "Hola, mundo"
nombre = "Josu"
```

## 4. Operadores aritméticos

Son los símbolos que nos permiten realizar operaciones matemáticas básicas.

- `+` : Suma
- `-` : Resta
- `*` : Multiplicación
- `/` : División (en Python 3, el resultado siempre es un `float`)

**Ejemplo del notebook:**

```python
a = 10
b = 5
suma = a + b        # suma valdrá 15
resta = a - b       # resta valdrá 5
multi = a * b       # multi valdrá 50
division = a / b    # division valdrá 2.0
```

## 5. La función `print()` (salida de datos)

La función `print()` se utiliza para mostrar valores o texto en la pantalla. Es la forma estándar de ver el resultado de nuestro programa.

**Ejemplo del notebook:**

```python
y = 5
print(y)  # Muestra el número 5 en la pantalla

texto = "Hola, mundo"
print(texto) # Muestra el texto "Hola, mundo"
```

> **Nota sobre Jupyter Notebook:** En un notebook, si la última línea de una celda es una variable o un valor, Jupyter lo muestra automáticamente. Sin embargo, `print()` es explícito y siempre mostrará lo que le pidas, sin importar en qué línea de la celda esté.

## 6. Concatenación de cadenas

Cuando se usa el operador de suma (`+`) con cadenas de texto, en lugar de sumar, las **une** o **concatena**.

**Ejemplo del notebook:**

```python
texto1 = "Hola"
texto2 = "Josu"
saludo = texto1 + " " + texto2 # Une "Hola", un espacio " " y "Josu"
print(saludo) # Muestra "Hola Josu"
```

## 7. La función `input()` (entrada de datos)

La función `input()` pausa la ejecución del programa, muestra un mensaje al usuario y espera a que este escriba algo y presione "Enter". **Importante:** todo lo que el usuario escribe se recibe siempre como una **cadena de texto (`str`)**.

**Ejemplo del notebook:**

```python
nombre = input("Pon tu nombre: ")
print(nombre)
```

## 8. Conversión de tipos (Casting)

Como `input()` siempre devuelve texto, si queremos hacer operaciones matemáticas con lo que el usuario introduce, primero debemos **convertir** ese texto a un tipo de dato numérico. A este proceso se le llama "casting".

- `int(valor)`: Convierte el `valor` a un número entero.
- `float(valor)`: Convierte el `valor` a un número flotante (con decimales).
- `str(valor)`: Convierte el `valor` a una cadena de texto.

**Ejemplo del notebook (de `str` a `int`):**

```python
entrada1 = input("Escribe el primer número: ") # entrada1 es "10" (texto)
a = int(entrada1)                              # a es 10 (número)
```

**Ejemplo del notebook (de `int` a `str` para imprimir):**

No se puede concatenar un texto con un número directamente (`"Suma: " + 15` daría error). Hay que convertir el número a texto primero.

```python
suma = 15
print("Suma: " + str(suma)) # Convierte el número 15 a texto "15"
```

## 9. Estructuras de control: Condicionales (`if`/`else`)

Los condicionales nos permiten que nuestro código tome decisiones y ejecute diferentes bloques de código según si una condición se cumple o no.

- `if`: Ejecuta el bloque de código que le sigue **si** la condición es verdadera.
- `else`: Ejecuta el bloque de código que le sigue **si** la condición del `if` es falsa.

#### Operadores de comparación

Para comprobar si dos valores son iguales, se usa el doble igual (\=\=). ¡No confundir con el = de asignación! También podemos comprobar si algo es distinto (`!=`) es mayor o menor que otro algo (`>`, `<`) o mayor o igual y menor o igual (`>=`, `<=`).

#### Indentación

En Python, los bloques de código que pertenecen a un `if` o a un `else` deben estar **indentados** (tener un espacio o tabulación al principio). Así es como Python sabe qué código ejecutar en cada caso.

**Ejemplo del notebook:**

```python
x = float(input("Escribe un número: ")) # Pide un número y lo convierte a float

if x == 3:  # Comprueba si el valor de x es igual a 3
  # Este bloque solo se ejecuta si la condición es verdadera
  print("X es igual 3")
else:
  # Este bloque solo se ejecuta si la condición es falsa
  print("X no es 3")
```
