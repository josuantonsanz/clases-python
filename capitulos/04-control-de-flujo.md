Hasta ahora, nuestros programas se ejecutan línea por línea, de arriba a abajo. Las estructuras de control de flujo nos permiten cambiar ese orden, tomando decisiones (`if`) o repitiendo acciones (`while`). Más adelante veremos una tercera, `for`.

## Condicionales: `if`, `elif` y `else`

Ya vimos el `if`/`else` básico. Pero ¿qué pasa si tenemos más de dos posibilidades? Para eso usamos `elif` (una contracción de «else if»).

Python evalúa las condiciones en orden:

1.  Comprueba la condición del `if`. Si es `True`, ejecuta su bloque y salta todo lo demás.
2.  Si el `if` es `False`, comprueba la condición del primer `elif`. Si es `True`, ejecuta su bloque y salta el resto.
3.  Así sucesivamente con todos los `elif`.
4.  Si ninguna de las condiciones anteriores es `True`, ejecuta el bloque del `else`.

**Ejemplo práctico:**

```python
nota = float(input("Introduce tu nota (0-10): "))

if nota >= 9:
  print("¡Sobresaliente!")
elif nota >= 7:
  print("Notable.")
elif nota >= 5:
  print("Aprobado.")
else:
  print("Suspendido.")
```

> **La palabra `pass`**
> A veces, al diseñar el código, sabemos que necesitaremos un `if`, pero aún no sabemos qué código poner dentro. Si dejamos el bloque vacío, Python dará un error. Para evitarlo, usamos la palabra `pass`, que simplemente significa «no hacer nada».

```python
if nota < 5:
  # TODO: Enviar un email de aviso a los padres
  pass # El programa funciona sin error
```

## Mientras: `while`

El bucle `while` repite un bloque de código **mientras** una condición sea verdadera. Es como un `if` que se ejecuta una y otra vez.

¡Cuidado! Si la condición nunca se vuelve falsa, el programa entrará en un **bucle infinito** y se quedará «colgado».

**Ejemplo 1: Un contador hacia atrás**

```python
contador = 5
while contador > 0:
  print(contador)
  contador -= 1 # ¡Muy importante! Modificamos la variable para que la condición eventualmente sea falsa.

print("¡Despegue!")
# Salida:
# 5
# 4
# 3
# 2
# 1
# ¡Despegue!
```

**Ejemplo 2: Esperar una entrada específica del usuario**

```python
respuesta = ""
while respuesta != "salir": # Mientras la respuesta sea distinta de 'salir'...
  respuesta = input("Escribe 'salir' para terminar: ")
  print("Has escrito: " + respuesta)

print("¡Programa terminado!")
```

## Salir del bucle: `break` y `continue`

A veces necesitamos más control sobre el bucle que simplemente la condición del `while`.

- `break`: Interrumpe y sale del bucle **inmediatamente**, sin importar si la condición del `while` sigue siendo verdadera.
- `continue`: Interrumpe la iteración **actual** y salta directamente al inicio de la siguiente, para volver a comprobar la condición.

**Ejemplo de `break`:**

Un bucle `while True:` por sí solo sería infinito. Pero podemos usar `break` para salir cuando se cumpla una condición interna.

```python
while True: # Bucle infinito a propósito
    nombre = input("Adivina mi nombre: ")
    if nombre == "Josu":
        print("¡Correcto!")
        break # Salimos del bucle
    else:
        print("Inténtalo de nuevo.")
```

**Ejemplo de `continue`:**

Vamos a imprimir solo los números impares. Si el número es par, nos saltamos el `print` de esa iteración con `continue`.

```python
numero = 0
while numero < 10:
    numero += 1
    if numero % 2 == 0: # Si el resto de dividir entre 2 es 0, es par
        continue # Saltamos a la siguiente iteración, ignorando el print

    print(numero) # Solo se ejecuta si el número es impar
# Salida: 1, 3, 5, 7, 9
```

## Ejercicios para practicar

### 1. Adivina el número

1. Crea una variable llamada `numero_secreto` y asígnale un número entero (el que tú quieras).
2. Crea un bucle `while` que se ejecute continuamente (`while True:`).
3. Dentro del bucle, pide al usuario que adivine el número con `input()`.
4. Convierte la entrada del usuario a un número entero.
5. Comprueba si el número del usuario es:
    - Igual al `numero_secreto`. Si lo es, imprime «¡Has acertado!» y usa `break` para salir del bucle.
    - Menor que el `numero_secreto`. Si lo es, imprime «El número secreto es mayor».
    - Mayor que el `numero_secreto`. Si lo es, imprime «El número secreto es menor».

### 2. Login simple (desafío)

1. Define dos variables: `usuario_correcto` y `contrasena_correcta`. Asígnales los valores que quieras.
2. Crea un bucle `while` que pida al usuario su nombre de usuario y su contraseña.
3. Comprueba si ambos coinciden con las variables que definiste.
4. Si coinciden, imprime «Acceso concedido» y sal del bucle con `break`.
5. Si no coinciden, imprime «Datos incorrectos, inténtalo de nuevo».