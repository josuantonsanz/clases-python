---
created: 2025-10-06T07:40
updated: 2025-10-06T09:38
dg-publish: true
dg-hide: true
---
# El bucle for y las listas

Hasta ahora, hemos visto el bucle `while`, que repite una tarea *mientras* se cumpla una condición. Ahora vamos a ver el bucle `for`, que procesa cada elemento de una secuencia, uno por uno.

## El bucle `for`: Repitiendo un número exacto de veces

La principal utilidad del bucle `for` es ejecutar un bloque de código un número predefinido de veces. Para ello, lo combinamos con la función `range()`.

La estructura es siempre la misma:

*   La palabra clave `for`.
*   Una **variable de control** (que tomará un valor distinto en cada vuelta, por ejemplo `i` de "índice" o `num` de "número").
*   La palabra clave `in`.
*   La secuencia que queremos recorrer (por ejemplo, `range(5)`).
*   Dos puntos (`:`) y el bloque de código indentado.

**Ejemplo 1: Una cuenta atrás**

```python
print("Preparando el despegue")
# range(5, 0, -1) genera los números 5, 4, 3, 2, 1
for numero in range(5, 0, -1):
    print(f"{numero}...")

print("Despegue")
```

**Salida:**

```
Preparando el despegue
5...
4...
3...
2...
1...
Despegue
```

En cada "vuelta" o **iteración** del bucle, la variable `numero` toma el siguiente valor que genera `range()`.

### La función `range()`: Nuestro generador de números

`range()` es increíblemente versátil. Puede usarse de tres maneras:

1.  **`range(fin)`**: Genera números desde `0` hasta `fin - 1`.
    ```python
    # Imprime los números del 0 al 3
    for i in range(4):
        print(i) # Salida: 0, 1, 2, 3
    ```

2.  **`range(inicio, fin)`**: Genera números desde `inicio` hasta `fin - 1`.
    ```python
    # Aprendiendo a contar del 1 al 20
    for numero in range(1, 21):
        print(f"¿Cómo se dice el número {numero}?")
    ```

3.  **`range(inicio, fin, paso)`**: Genera números desde `inicio` hasta `fin - 1`, saltando de `paso` en `paso`.
    ```python
    # Muestra solo los números pares del 0 al 10
    for par in range(0, 11, 2):
        print(par) # Salida: 0, 2, 4, 6, 8, 10
    ```

## Listas: Las estanterías de Python

Imagina que tienes una estantería con baldas numeradas. En cada balda puedes poner lo que quieras: un libro, una foto, una planta... Una **lista** en Python es exactamente eso: una colección ordenada de elementos.

A diferencia de las cadenas (que solo guardan caracteres), las listas pueden guardar cualquier tipo de dato: números, texto, booleanos e incluso otras listas.

Se definen con corchetes `[]` y sus elementos se separan por comas.

```python
# Una lista de la compra
lista_compra = ["Leche", "Pan", "Huevos", "Manzanas"]

# Una lista de notas de un examen
notas = [7.5, 9.0, 5.2, 10.0]

# Una lista vacía, para ir llenándola después
tareas_pendientes = []
```

### Accediendo a los elementos: Índices

Igual que en las cadenas, accedemos a los elementos de una lista por su **índice**, que empieza en **0**.

```python
lista_compra = ["Leche", "Pan", "Huevos", "Manzanas"]

primer_producto = lista_compra[0]  # "Leche"
tercer_producto = lista_compra[2]  # "Huevos"

print(f"No te olvides de comprar {primer_producto} y {tercer_producto}")
```

También funcionan los **índices negativos** (`-1` es el último, `-2` el penúltimo...) y el ***slicing*** (`[inicio:fin]`) para obtener sub-listas, exactamente igual que con las cadenas.

### La gran diferencia: Las listas son MUTABLES

Este es un concepto muy importante. Recuerda que las cadenas son **inmutables**: una vez creadas, no puedes cambiar un carácter individual.

Esto significa que podemos modificar, añadir o eliminar elementos de una lista en cualquier momento.

```python
lista_compra = ["Leche", "Pan", "Huevos"]
print(f"Lista original: {lista_compra}")

# 1. Modificar un elemento
# Ah, no, no quiero pan normal, quiero pan integral.
lista_compra[1] = "Pan integral"
print(f"Lista modificada: {lista_compra}")

# 2. Eliminar un elemento con `del`
# Ya tengo huevos en casa.
del lista_compra[2]
print(f"Lista tras eliminar: {lista_compra}")
```

**Salida:**

```
Lista original: ['Leche', 'Pan', 'Huevos']
Lista modificada: ['Leche', 'Pan integral', 'Huevos']
Lista tras eliminar: ['Leche', 'Pan integral']
```

### La caja de herramientas de las listas: Métodos

Las listas, al igual que las cadenas, vienen con sus propias "funciones" incorporadas, llamadas **métodos**. Estos métodos nos permiten manipular las listas de formas muy potentes. 

*   **`.append(elemento)`**: Añade un elemento **al final** de la lista. Es la forma más común de agregar datos.
    ```python
    tareas = ["Lavar los platos"]
    tareas.append("Sacar al perro")
    print(tareas) # Muestra: ['Lavar los platos', 'Sacar al perro']
    ```
*   **`.pop(indice)`**: Elimina y **devuelve** el elemento de un índice. Si no le das un índice, elimina el último.
    ```python
    numeros = [10, 20, 30, 40]
    ultimo_numero = numeros.pop() # Elimina el 40
    print(f"He quitado el {ultimo_numero}") # Muestra "He quitado el 40"
    print(numeros) # Muestra [10, 20, 30]
    ```
*   **`.sort()`**: Ordena la lista **permanentemente** (in-place). Funciona con números (de menor a mayor) y con texto (alfabéticamente).
    ```python
    invitados = ["Carla", "Ana", "David", "Bruno"]
    invitados.sort()
    print(invitados) # Muestra: ['Ana', 'Bruno', 'Carla', 'David']
    ```
*   **`.reverse()`**: Invierte el orden de los elementos de la lista **permanentemente** (in-place).
    ```python
    numeros = [1, 2, 3, 4]
    numeros.reverse()
    print(numeros) # Muestra: [4, 3, 2, 1]
    ```
*   **`.copy()`**: Crea una copia **independiente** de la lista. Esto es fundamental, como veremos a continuación.

#### Cuidado: Copiar listas no es lo que parece

Observa este comportamiento extraño:

```python
lista_original = ["a", "b", "c"]
lista_mal_copiada = lista_original # ¡Esto NO es una copia!

lista_mal_copiada[0] = "Z"

print(f"Lista 'copiada': {lista_mal_copiada}")
print(f"Lista original: {lista_original}") # ¡La original también ha cambiado!
# Salida: ['Z', 'b', 'c']
```

Cuando hacemos `lista_b = lista_a`, no estamos creando una nueva lista. Estamos creando una nueva "etiqueta" que apunta a la **misma lista en la memoria**. Cualquier cambio a través de una de las etiquetas afectará a la otra.

**La forma correcta de copiar una lista** es usando el método `.copy()` o slicing `[:]`:

```python
lista_original = ["a", "b", "c"]
lista_bien_copiada = lista_original.copy() # O lista_original[:]

lista_bien_copiada[0] = "Z"

print(f"Lista copiada: {lista_bien_copiada}") # Muestra ['Z', 'b', 'c']
print(f"Lista original: {lista_original}")   # Muestra ['a', 'b', 'c'], ¡intacta!
```

Recuerda: si necesitas una versión modificada de una lista pero quieres conservar la original, crea siempre una copia.

## La combinación perfecta: Bucles `for` y Listas

Hasta ahora, el bucle `for` parecía no tener demasiada utilidad. Ahora, en cambio, con las listas, podemos usar un bucle `for` para "visitar" y operar con cada uno de los elementos de una lista.

**El modo correcto (con listas y bucles):**

```python
tareas = ["Hacer la cama", "Estudiar Python", "Pasear al perro"]

print("Mis tareas para hoy:")
for tarea in tareas:
    print(f"- {tarea}")
```
Este bucle es muy fácil de leer: "Para cada `tarea` en la lista `tareas`, imprime la `tarea`".

### Dos formas de recorrer una lista

1.  **Recorrer por elemento (la más común y legible):**
    Es la que acabamos de ver. Úsala cuando solo te importa el valor de cada elemento.

    ```python
    alumnos = ["Ana", "Luis", "Carla", "David"]
    for alumno in alumnos:
        print(f"Bienvenido, {alumno}")
    ```

2.  **Recorrer por índice (cuando necesitas la posición):**
    A veces, además del elemento, necesitas saber su posición. Para ello, combinamos `range()` y `len()`.

    ```python
    alumnos = ["Ana", "Luis", "Carla", "David"]
    print("Clasificación de la competición:")
    for i in range(len(alumnos)):
        # i valdrá 0, 1, 2, 3
        # alumnos[i] será "Ana", "Luis", etc.
        print(f"{i + 1}º puesto: {alumnos[i]}")
    ```
    Usamos `i + 1` para que la lista para el usuario empiece en 1, que es más natural.
3. **Recorrer con enumerate() (combinando ambas opciones):**  
   ¿Y si necesitamos el índice y el elemento a la vez? El método anterior funciona, pero Python nos da una herramienta mucho más elegante y fácil de leer: la función enumerate().
   Esta función "envuelve" nuestra lista y, en cada vuelta del bucle, nos devuelve una pareja: (índice, elemento).

```python
alumnos = ["Ana", "Luis", "Carla", "David"] 
print("Clasificación (con enumerate):") 
for indice, alumno in enumerate(alumnos):
     print(f"{indice + 1}º puesto: {alumno}")`
  ```

Como ves, el resultado es idéntico al del método anterior, pero el código es más directo. No necesitamos acceder a alumnos[i], ya que enumerate nos da el alumno directamente en cada iteración. **Esta es la forma preferida en Python** cuando se necesitan ambas cosas: el índice y el valor.

### Comprobar si un elemento está en la lista: `in` y `not in`

Igual que con las cadenas, podemos verificar la pertenencia de un elemento de forma muy sencilla. Esto es ideal para usar en condicionales `if`.

```python
ingredientes_receta = ["harina", "azúcar", "huevos", "chocolate"]

ingrediente_a_buscar = "huevos"

if ingrediente_a_buscar in ingredientes_receta:
    print(f"Perfecto. Tenemos {ingrediente_a_buscar} para la receta.")
else:
    print(f"Oh, no. Nos falta {ingrediente_a_buscar}.")
```


**Atajo de programador: Valores verdaderos y falsos**

En Python, algunos valores se comportan como `False` en un `if` sin serlo. Los más comunes son: el número `0`, la cadena vacía `""` y la **lista vacía `[]`**.

Todos los demás valores se comportan como `True`. Esto nos permite escribir código más limpio.

```python
# Forma larga
mi_lista = []
if len(mi_lista) == 0:
    print("La lista está vacía.")
# Forma pythonica usando False
if not mi_lista:
    print("La lista está vacía.")
```

Ambos códigos hacen lo mismo, pero el segundo es más directo y común entre programadores de Python.

## Ejercicios prácticos

### 1. Lista de la compra interactiva

Crea un programa que permita al usuario construir una lista de la compra.

1.  El programa debe usar un bucle `while` para pedir al usuario que introduzca productos uno por uno.
2.  Cada producto introducido se debe añadir a una lista usando `.append()`.
3.  Si el usuario introduce la palabra "FIN", el bucle debe terminar.
4.  Al final, el programa debe mostrar un resumen:
    *   La cantidad de productos en la lista.
    *   La lista de productos completa, ordenada alfabéticamente.

**Ejemplo de ejecución:**

```
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

Escribe un programa que analice una lista de notas de un examen.

1.  Define una lista con varias notas (números flotantes), por ejemplo: `notas = [4.5, 8.0, 7.5, 9.0, 3.2, 6.5, 5.0, 10.0, 2.5]`
2.  Usa un bucle `for` para recorrer la lista y calcular lo siguiente:
    *   El número total de aprobados (nota >= 5.0).
    *   El número total de suspensos.
    *   La suma de todas las notas.
3.  Calcula la nota media de la clase (suma total / número de notas).
4.  Muestra un resumen con todos los datos calculados, formateando la nota media para que solo muestre 2 decimales.

### 3. El sorteo

Crea un programa que simule un sorteo entre una lista de participantes.

1.  Crea una lista con los nombres de los participantes.
2.  Usa un bucle para pedir al usuario que introduzca los nombres de los participantes, de forma similar al ejercicio 1. El usuario debe poder introducir tantos nombres como quiera hasta escribir "YA".
3.  Una vez introducidos los nombres, el programa debe seleccionar un ganador al azar. Para ello, necesitarás importar el módulo `random` y usar la función `random.choice(tu_lista)`.
4.  Muestra por pantalla el nombre del ganador.
5.  **Extra:** Después de anunciar al ganador, elimínalo de la lista de participantes usando `.pop()` o `del` y vuelve a realizar otro sorteo para el segundo premio entre los restantes.

```python
# Pista para el sorteo
import random

participantes = ["Ana", "Juan", "Marta"]
ganador = random.choice(participantes)
print(f"Y el ganador es... {ganador}!")
```

### 4. Inversor de listas

Crea un programa que invierta el orden de los elementos de una lista **sin usar el método `.reverse()`**.

1.  Define una lista inicial, por ejemplo: `mi_lista = [1, 2, 3, "a", "b", "c"]`.
2.  Crea una segunda lista, `lista_invertida`, que al principio estará vacía.
3.  Recorre la lista original **desde el final hacia el principio**. *Pista: puedes usar un bucle `for` con `range()` y un paso negativo.*
4.  En cada iteración, añade el elemento actual de la lista original a `lista_invertida`.
5.  Al final, muestra tanto la lista original como la `lista_invertida`.