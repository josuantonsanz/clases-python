# El bucle `for` y las listas

Hasta ahora hemos visto el bucle `while`, que repite una tarea *mientras* se cumpla una condición. Ahora veremos el bucle `for`, que procesa cada elemento de una secuencia, uno por uno.

## El bucle `for`: repetir un número de veces

La principal utilidad del bucle `for` es ejecutar un bloque de código un número predefinido de veces. Para ello, lo combinamos con la función `range()`.

Su estructura tiene siempre estos elementos:

- La palabra clave `for`.
- Una **variable de control**, que toma un valor distinto en cada vuelta; por ejemplo, `i` de «índice» o `numero`.
- La palabra clave `in`.
- La secuencia que queremos recorrer, por ejemplo `range(5)`.
- Dos puntos (`:`) y un bloque de código indentado.

**Ejemplo: una cuenta atrás**

```python
print("Preparando el despegue")

# range(5, 0, -1) genera los números 5, 4, 3, 2 y 1
for numero in range(5, 0, -1):
    print(f"{numero}...")

print("¡Despegue!")
```

Salida:

```text
Preparando el despegue
5...
4...
3...
2...
1...
¡Despegue!
```

En cada vuelta, o **iteración**, la variable `numero` toma el siguiente valor que genera `range()`.

### La función `range()`

`range()` es un generador de números muy versátil. Puede usarse de tres maneras:

1. **`range(fin)`**: genera números desde `0` hasta `fin - 1`.

   ```python
   # Imprime los números del 0 al 3
   for i in range(4):
       print(i)
   ```

2. **`range(inicio, fin)`**: genera números desde `inicio` hasta `fin - 1`.

   ```python
   # Cuenta del 1 al 20
   for numero in range(1, 21):
       print(f"¿Cómo se dice el número {numero}?")
   ```

3. **`range(inicio, fin, paso)`**: genera números desde `inicio` hasta `fin - 1`, saltando de `paso` en `paso`.

   ```python
   # Muestra los números pares del 0 al 10
   for par in range(0, 11, 2):
       print(par)
   ```

::: importante El final no se incluye
En los tres casos, el valor de `fin` **no aparece**. Por eso `range(4)` produce `0`, `1`, `2` y `3`.
:::

## Listas: colecciones ordenadas

Imagina una estantería con baldas numeradas. En cada balda puedes guardar lo que quieras: un libro, una foto o una planta. Una **lista** en Python es una colección ordenada de elementos.

A diferencia de las cadenas, que solo guardan caracteres, las listas pueden guardar números, texto, valores booleanos e incluso otras listas. Se definen con corchetes `[]` y sus elementos se separan por comas.

```python
# Una lista de la compra
lista_compra = ["Leche", "Pan", "Huevos", "Manzanas"]

# Una lista de notas
notas = [7.5, 9.0, 5.2, 10.0]

# Una lista vacía, para llenarla después
tareas_pendientes = []
```

### Acceder a los elementos: índices y *slicing*

Igual que en las cadenas, accedemos a los elementos de una lista por su **índice**, que empieza en `0`.

```python
lista_compra = ["Leche", "Pan", "Huevos", "Manzanas"]

primer_producto = lista_compra[0]  # "Leche"
tercer_producto = lista_compra[2]  # "Huevos"

print(f"No te olvides de comprar {primer_producto} y {tercer_producto}")
```

También funcionan los índices negativos (`-1` es el último, `-2` el penúltimo...) y el *slicing* (`[inicio:fin]`) para obtener sublistas, exactamente igual que con las cadenas.

### Las listas son mutables

Esta es su gran diferencia respecto a las cadenas: podemos modificar, añadir o eliminar elementos de una lista en cualquier momento.

```python
lista_compra = ["Leche", "Pan", "Huevos"]
print(f"Lista original: {lista_compra}")

# Modificar un elemento
lista_compra[1] = "Pan integral"
print(f"Lista modificada: {lista_compra}")

# Eliminar un elemento con del
del lista_compra[2]
print(f"Lista tras eliminar: {lista_compra}")
```

Salida:

```text
Lista original: ['Leche', 'Pan', 'Huevos']
Lista modificada: ['Leche', 'Pan integral', 'Huevos']
Lista tras eliminar: ['Leche', 'Pan integral']
```

### Métodos útiles de las listas

Las listas incluyen métodos para manipularlas:

- **`.append(elemento)`** añade un elemento al final.

  ```python
  tareas = ["Lavar los platos"]
  tareas.append("Sacar al perro")
  print(tareas)  # ['Lavar los platos', 'Sacar al perro']
  ```

- **`.pop(indice)`** elimina y devuelve el elemento de un índice. Sin índice, elimina el último.

  ```python
  numeros = [10, 20, 30, 40]
  ultimo_numero = numeros.pop()
  print(f"He quitado el {ultimo_numero}")
  print(numeros)  # [10, 20, 30]
  ```

- **`.sort()`** ordena la lista de forma permanente.

  ```python
  invitados = ["Carla", "Ana", "David", "Bruno"]
  invitados.sort()
  print(invitados)  # ['Ana', 'Bruno', 'Carla', 'David']
  ```

- **`.reverse()`** invierte permanentemente el orden de sus elementos.

  ```python
  numeros = [1, 2, 3, 4]
  numeros.reverse()
  print(numeros)  # [4, 3, 2, 1]
  ```

- **`.copy()`** crea una copia independiente de una lista.

### Cuidado al copiar listas

```python
lista_original = ["a", "b", "c"]
lista_mal_copiada = lista_original  # Esto NO crea una copia

lista_mal_copiada[0] = "Z"

print(f"Lista 'copiada': {lista_mal_copiada}")
print(f"Lista original: {lista_original}")  # También ha cambiado
```

Al escribir `lista_b = lista_a` no creamos otra lista: damos otra etiqueta a la misma lista en memoria. Cualquier cambio realizado con una de las etiquetas afectará a la otra.

Para crear una copia de verdad, usa `.copy()` o el *slicing* `[:]`:

```python
lista_original = ["a", "b", "c"]
lista_bien_copiada = lista_original.copy()  # También valdría lista_original[:]

lista_bien_copiada[0] = "Z"

print(f"Lista copiada: {lista_bien_copiada}")    # ['Z', 'b', 'c']
print(f"Lista original: {lista_original}")      # ['a', 'b', 'c']
```

::: nota
Si necesitas una versión modificada de una lista pero quieres conservar la original, crea siempre una copia independiente.
:::

## Bucles `for` y listas

Un bucle `for` permite visitar y operar con cada elemento de una lista.

```python
tareas = ["Hacer la cama", "Estudiar Python", "Pasear al perro"]

print("Mis tareas para hoy:")
for tarea in tareas:
    print(f"- {tarea}")
```

Se lee así: «para cada `tarea` de la lista `tareas`, muestra la `tarea`».

### Tres formas de recorrer una lista

1. **Por elemento**, la forma más común y legible. Úsala cuando solo importe el valor.

   ```python
   alumnos = ["Ana", "Luis", "Carla", "David"]
   for alumno in alumnos:
       print(f"Bienvenido, {alumno}")
   ```

2. **Por índice**, cuando también necesitas conocer la posición.

   ```python
   alumnos = ["Ana", "Luis", "Carla", "David"]
   print("Clasificación de la competición:")

   for i in range(len(alumnos)):
       print(f"{i + 1}º puesto: {alumnos[i]}")
   ```

3. **Con `enumerate()`**, cuando necesitas a la vez el índice y el elemento. Es la forma preferida en Python para este caso.

   ```python
   alumnos = ["Ana", "Luis", "Carla", "David"]
   print("Clasificación:")

   for indice, alumno in enumerate(alumnos):
       print(f"{indice + 1}º puesto: {alumno}")
   ```

### Comprobar si un elemento está en la lista

Como con las cadenas, `in` y `not in` sirven para comprobar si un elemento pertenece a una lista.

```python
ingredientes_receta = ["harina", "azúcar", "huevos", "chocolate"]
ingrediente_a_buscar = "huevos"

if ingrediente_a_buscar in ingredientes_receta:
    print(f"Perfecto. Tenemos {ingrediente_a_buscar} para la receta.")
else:
    print(f"Oh, no. Nos falta {ingrediente_a_buscar}.")
```

### Listas vacías y valores booleanos

Una lista vacía (`[]`) se comporta como `False` en una condición; una lista con elementos se comporta como `True`. Esto permite escribir comprobaciones directas:

```python
mi_lista = []

# Forma larga
if len(mi_lista) == 0:
    print("La lista está vacía.")

# Forma más habitual en Python
if not mi_lista:
    print("La lista está vacía.")
```

::: resumen
- `for` recorre los elementos de una secuencia; con `range()` permite repetir acciones un número concreto de veces.
- Las listas son colecciones ordenadas, indexadas y **mutables**.
- Usa `.append()` para añadir, `.pop()` o `del` para quitar y `.copy()` para duplicar una lista de forma independiente.
- Para recorrer una lista, normalmente basta con `for elemento in lista`; usa `enumerate()` si además necesitas la posición.
:::

## Ejercicios prácticos

### 1. Lista de la compra interactiva

Crea un programa que permita al usuario construir una lista de la compra.

1. Usa un bucle `while` para pedir productos uno por uno.
2. Añade cada producto a una lista con `.append()`.
3. Si el usuario escribe `FIN`, termina el bucle.
4. Al final, muestra la cantidad de productos y la lista ordenada alfabéticamente.

Ejemplo de ejecución:

```text
Introduce un producto (o 'FIN' para terminar): Leche
Introduce un producto (o 'FIN' para terminar): Pan
Introduce un producto (o 'FIN' para terminar): Manzanas
Introduce un producto (o 'FIN' para terminar): FIN

--- Tu lista de la compra ---
Total de productos: 3
- Manzanas
- Leche
- Pan
```

### 2. Análisis de notas de clase

Escribe un programa que analice una lista como esta:

```python
notas = [4.5, 8.0, 7.5, 9.0, 3.2, 6.5, 5.0, 10.0, 2.5]
```

1. Recorre la lista con un `for`.
2. Calcula el número de aprobados (`nota >= 5.0`), el de suspensos y la suma de todas las notas.
3. Calcula la nota media.
4. Muestra un resumen y formatea la media con dos decimales.

### 3. El sorteo

Crea un programa que simule un sorteo entre participantes.

1. Pide nombres al usuario y guárdalos en una lista hasta que escriba `YA`.
2. Importa el módulo `random`.
3. Elige un ganador con `random.choice(participantes)` y muéstralo.
4. **Extra:** elimina al ganador y realiza un segundo sorteo entre las personas restantes.

```python
import random

participantes = ["Ana", "Juan", "Marta"]
ganador = random.choice(participantes)
print(f"Y el ganador es... {ganador}!")
```

### 4. Inversor de listas

Crea un programa que invierta una lista **sin usar** `.reverse()`.

1. Define una lista inicial, por ejemplo `mi_lista = [1, 2, 3, "a", "b", "c"]`.
2. Crea una lista vacía llamada `lista_invertida`.
3. Recorre la lista original desde el final hacia el principio con un `for`, `range()` y un paso negativo.
4. En cada vuelta añade el elemento actual a `lista_invertida`.
5. Muestra la lista original y la lista invertida.
