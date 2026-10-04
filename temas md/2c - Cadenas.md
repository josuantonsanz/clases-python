---
created: 2025-09-17T18:00
updated: 2025-09-17T18:34
dg-hide: true
dg-publish: true
---
# Cadenas en Python

## Repaso rápido: Lo que ya sabemos de las cadenas

Recordemos lo que vimos en las clases anteriores:

1.  **Creación:** Se crean con comillas simples (`'`) o dobles (`"`).
    ```python
    saludo = "Hola, mundo"
    despedida = 'Adiós'
    ```
2.  **Concatenación:** Se pueden unir (concatenar) con el operador `+`.
    ```python
    nombre = "Ana"
    mensaje = "Hola, " + nombre # Resultado: "Hola, Ana"
    ```
3. **Repetición (\*):** Se pueden repetir usando el operador de multiplicación con un número entero.
```python
risa = "ja" * 4      # Resultado: "jajajaja"
separador = "-" * 20 # Resultado: "--------------------"
print(separador)
```
4. **Entrada y Salida:** Las usamos con `print()` y siempre las obtenemos de `input()`.
5.  **Longitud:** Podemos saber cuántos caracteres tienen con la función `len()`.
    ```python
    print(len("Python")) # Muestra 6
    ```

Pero las cadenas son mucho más que eso. Vamos a ver todo lo que se puede hacer con ellas.

## Las cadenas son secuencias: Indexación y *Slicing*

La característica más importante de una cadena es que es una **secuencia ordenada de caracteres**. Esto significa que cada carácter tiene una posición (un **índice**) y podemos acceder a él.

### Indexación (acceder a un carácter)

En Python, los índices empiezan a contar desde **cero (0)**.

Imagina la palabra `"PYTHON"` como una serie de cajas numeradas:

| P | Y | T | H | O | N |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 1 | 2 | 3 | 4 | 5 |

Para acceder a un carácter, usamos corchetes `[]` después de la variable.

```python
palabra = "PYTHON"
print(palabra[0])  # Muestra 'P' (el primer carácter)
print(palabra[3])  # Muestra 'H'
```

> **Tip: Indexación negativa**
> Python también permite contar desde el final usando números negativos. El `-1` es el último carácter, `-2` el penúltimo, y así sucesivamente.

```python
print(palabra[-1]) # Muestra 'N' (el último carácter)
print(palabra[-2]) # Muestra 'O'
```

### *Slicing* (Extraer sub-cadenas)

El *slicing* (rebanado) nos permite extraer una porción de la cadena. La sintaxis es `[inicio:fin]`.

- `inicio`: El índice donde empieza la rebanada (incluido).
- `fin`: El índice donde termina la rebanada (**no incluido**).

```python
palabra = "PYTHON"
print(palabra[0:3])  # Desde el índice 0 hasta el 3 (sin incluirlo). Muestra "PYT"
print(palabra[2:5])  # Desde el índice 2 hasta el 5 (sin incluirlo). Muestra "THO"
```

**Atajos para el *slicing*:**

-   Si omites el `inicio`, Python asume que es desde el principio (`0`).
-   Si omites el `fin`, Python asume que es hasta el final.

```python
print(palabra[:3]) # Desde el principio hasta el 3. Muestra "PYT"
print(palabra[3:]) # Desde el 3 hasta el final. Muestra "HON"
print(palabra[:])  # Muestra una copia de la cadena completa "PYTHON"
```

## Inmutabilidad: Las cadenas no se pueden cambiar

Este es un concepto clave en Python. Una vez que creas una cadena, **no puedes modificar sus caracteres**. A esto se le llama **inmutabilidad**.

Si intentas cambiar un carácter directamente, obtendrás un error:

```python
nombre = "Josu"
# nombre[0] = "j" # ¡Esto dará un TypeError!
```

**¿Entonces cómo «modificamos» una cadena?**

Creamos una **nueva** cadena a partir de la original.

```python
nombre = "Josu"
nombre_minuscula = "j" + nombre[1:] # Concatenamos 'j' con la rebanada 'osu'
print(nombre_minuscula) # Muestra "josu"
print(nombre)           # La original sigue intacta: "Josu"
```

### La «caja de herramientas»: Métodos y operadores de String

Las cadenas tienen muchas «funciones» incorporadas llamadas **métodos** y operadores especiales que nos facilitan la vida.

#### Operador `in`: Comprobando pertenencia

A menudo, no necesitamos saber *dónde* está algo, sino simplemente si *está o no*. Para esto usamos el operador `in`, que devuelve un booleano (`True` o `False`). Es perfecto para usarlo en condicionales `if`.

Sintaxis: `subcadena in cadena_principal`

```python
frase = "El veloz zorro marrón salta sobre el perro perezoso."

if "zorro" in frase:
    print("¡Sí, la palabra 'zorro' está en la frase!")

if "gato" not in frase:
    print("No, la palabra 'gato' no está en la frase.")
```

> **Importante:** El operador `in` distingue entre mayúsculas y minúsculas.

```python
texto = "Hola Mundo"
print("mundo" in texto) # Muestra False, porque la 'M' es mayúscula.
# Solución: convertir todo a minúsculas para la comprobación.
print("mundo" in texto.lower()) # Muestra True
```

#### Cambio de mayúsculas y minúsculas

- `.upper()`: Convierte toda la cadena a mayúsculas.
- `.lower()`: Convierte toda la cadena a minúsculas.
- `.capitalize()`: Pone en mayúscula solo el primer carácter.
-  `.title()`: Pone en mayúscula el primer carácter de cada palabra.

```python
frase = "hola, bienvenido al MUNDO de python"
print(frase.upper())      # Muestra: "HOLA, BIENVENIDO AL MUNDO DE PYTHON"
print(frase.capitalize()) # Muestra: "Hola, bienvenido al mundo de python"
print(frase.title())      # Muestra: "Hola, Bienvenido Al Mundo De Python"
```

#### Búsqueda y reemplazo

- `.find('texto')`: Busca `'texto'` dentro de la cadena y devuelve el índice de su **primera aparición**. Si no lo encuentra, devuelve `-1`.
- `.replace('viejo', 'nuevo')`: Devuelve una nueva cadena reemplazando todas las apariciones de `'viejo'` por `'nuevo'`.

```python
email = "alumno@ejemplo.com"
print(email.find('@'))      # Muestra 6 (la posición de la arroba)
print(email.find('xyz'))    # Muestra -1 (no lo encuentra)

frase_fea = "Python es aburrido."
frase_bonita = frase_fea.replace("aburrido", "divertido")
print(frase_bonita) # Muestra "Python es divertido."
```

#### Limpieza de espacios en blanco

- `.strip()`: Elimina los espacios en blanco (o saltos de línea) al principio y al final de la cadena. Muy útil para limpiar la entrada del usuario.

```python
usuario_input = "  josu  "
print(usuario_input.strip()) # Muestra "josu" (sin los espacios)
```

## Formateo de cadenas, las f-strings

Hasta ahora, para combinar texto y variables, hemos usado `+`:

```python
nombre = "Carla"
edad = 30
# Forma antigua y poco práctica:
print("Hola, " + nombre + ". Tienes " + str(edad) + " años.")
```

Esto es engorroso: hay que tener cuidado con los espacios y convertir los números a `str()` manualmente.

Python nos ofrece una forma mucho mejor: las **f-strings**.

**¿Cómo se usan?**

1.  Pon una `f` justo antes de las comillas de apertura.
2.  Inserta tus variables directamente dentro de la cadena, rodeadas por llaves `{}`.

```python
nombre = "Carla"
edad = 30
# Forma moderna con f-string:
print(f"Hola, {nombre}. Tienes {edad} años.")
```

Como ves, es mucho más limpio y legible. Dentro de las llaves puedes poner incluso operaciones:

```python
print(f"El año que viene tendrás {edad + 1} años.")
```

### Aprovechando las f-strings

La utilidad real de las f-strings aparece cuando añadimos **opciones de formato** dentro de las llaves, justo después de la variable, separadas por dos puntos (`:`).

Sintaxis: `f"{variable:formato}"`

Veamos los casos más útiles.

### Controlando el ancho y la alineación

Podemos reservar un número de espacios para nuestra variable y decidir cómo se alinea dentro de ese espacio. Esto es ideal para mostrar datos en columnas bien ordenadas.

- `<` : Alinear a la izquierda (por defecto para texto).
- `^` : Centrar.
- `>` : Alinear a la derecha (por defecto para números).

```python
# Reservamos 15 caracteres para cada nombre
nombre1 = "Ana"
nombre2 = "Rodrigo"
nombre3 = "Margarita"

print(f"|{nombre1:<15}|") # Alinear a la izquierda
print(f"|{nombre2:^15}|") # Centrar
print(f"|{nombre3:>15}|") # Alinear a la derecha
```

**Salida:**
```
|Ana            |
|    Rodrigo    |
|      Margarita|
```

> **Tip: Carácter de relleno**
> Puedes especificar qué carácter usar para rellenar el espacio sobrante, poniéndolo justo antes del símbolo de alineación.

```python
print(f"|{nombre2:*^15}|") # Centra y rellena con asteriscos
# Salida: |***Rodrigo****|
```

### Formateando números decimales (`float`)

Cuando trabajamos con cálculos, a menudo obtenemos resultados con demasiados decimales. Podemos controlar con precisión cuántos queremos mostrar.

La sintaxis es `:.Nf`, donde `N` es el número de decimales que queremos.

```python
pi = 3.14159265
division = 10 / 3

print(f"El valor de pi es: {pi}")
print(f"El resultado de la división es: {division}")

print("--- Formateado ---")
# Mostramos pi con solo 2 decimales
print(f"El valor de pi es: {pi:.2f}")

# Mostramos la división con 4 decimales
print(f"El resultado de la división es: {division:.4f}")
```

**Salida:**

```
El valor de pi es: 3.14159265
El resultado de la división es: 3.3333333333333335
--- Formateado ---
El valor de pi es: 3.14
El resultado de la división es: 3.3333
```

### Combinando formatos y otros trucos útiles

Lo mejor es que puedes combinar estas reglas. Por ejemplo, alinear un número y a la vez limitar sus decimales.

```python
precio = 49.9
# Reservar 10 espacios, alinear a la derecha y mostrar 2 decimales
print(f"Precio: ${precio:>10.2f}")
# Salida: Precio: $     49.90
```

**Otros formatos muy prácticos:**

- **Separador de miles (`:,`):** Añade comas para hacer los números grandes más legibles.
    ```python
    numero_grande = 1234567890
    print(f"Población mundial aproximada: {numero_grande:,}")
    # Salida: Población mundial aproximada: 1,234,567,890
    ```
-   **Porcentajes (`:%`):** Multiplica el número por 100 y le añade el símbolo `%`.
    ```python
    descuento = 0.25
    print(f"Oferta especial: ¡Un {descuento:.0%} de descuento!")
    # Salida: Oferta especial: ¡Un 25% de descuento!
    ```










## Ejercicios prácticos

### 1. Extractor de información

Pide al usuario que introduzca su dirección de email. Luego, usando *slicing*, extrae y muestra por separado el nombre de usuario y el dominio.

* **Pista:** Primero, encuentra la posición del `@` con el método `.find()`.
* **Ejemplo:** Si el email es `nombre.apellido@gmail.com`, el programa debería mostrar:
    * Nombre de usuario: `nombre.apellido`
    * Dominio: `gmail.com`

### 2. Formateador de nombres

1. Pide al usuario su nombre completo (puede que lo escriba con mayúsculas, minúsculas y espacios extra).
2. Limpia los espacios en blanco al principio y al final.
3. Formatea el nombre para que aparezca en formato de título (la primera letra de cada palabra en mayúscula).
4. Muestra un saludo personalizado usando una f-string, por ejemplo: `¡Bienvenido, Nombre Apellido!`

### 3. Censor de palabras

1. Pide al usuario una palabra que quiera censurar de esa frase.
2. Pide al usuario que introduzca una frase, para censurarla.
3. Usa el método `.replace()` para sustituir esa palabra por `"[CENSURADO]"`.
4. Muestra la frase original y la frase censurada.
5. **Extra:** Integra los pasos 2-4 dentro de un bucle `while` para que el usuario pueda continuar introduciendo frases y aparezca censurado. Además, puedes usar el carácter ▮ para censurar.

### 4. Palíndromos

Un palíndromo es una palabra o frase que se lee igual de izquierda a derecha que de derecha a izquierda (ej: "ana", "radar", "oso").

1.  Pide al usuario una palabra.
2.  Limpia la palabra: conviértela a minúsculas y quítale los espacios con `.replace(" ", "")`.
3.  Crea una versión invertida de la palabra. *Pista: puedes usar slicing con un paso negativo* `palabra\[\:\:-1]`
4.  Compara la palabra limpia con su versión invertida y dile al usuario si es un palíndromo o no.


### 6. Dibujante de separadores

Escribe un programa que haga lo siguiente:

1. Pida al usuario un título para una sección.
2. Pida al usuario un carácter para usar como adorno (ej: `-`, `*`, =, `#`).
3. Calcule la longitud del título.
4. Usando la multiplicación de cadenas, cree una línea de adorno que sea 4 caracteres más larga que el título (dos por cada lado).
5. Muestre el título centrado con sus adornos.

**Ejemplo de ejecución:**

```
Introduce el título: Conceptos Básicos
Introduce el carácter de adorno: =

=======================
  Conceptos Básicos
=======================
```

*Pista: Para la línea del título, puedes concatenar `adorno + " " + titulo + " " + adorno`.*

### 7. Generador de tickets de compra

**Objetivo:** Crear un programa que simule un ticket de compra simple. El objetivo es que la salida esté perfectamente formateada y alineada, como un ticket real, utilizando las capacidades avanzadas de las f-strings.

**Instrucciones:**

1. **Define las variables:**
    Crea variables para al menos tres productos diferentes. Cada producto debe tener un nombre (texto), una cantidad (puede ser entero o flotante) y un precio unitario (flotante). También define una variable para el tipo de IVA (por ejemplo, 21% se escribe como `0.21`).

    ```python
    # Datos de los productos
    producto1_nombre = "Barra de pan"
    producto1_cant = 2
    producto1_precio = 0.85

    producto2_nombre = "Leche (litro)"
    producto2_cant = 1
    producto2_precio = 1.05

    producto3_nombre = "Manzanas (kg)"
    producto3_cant = 1.5
    producto3_precio = 1.99

    # IVA
    IVA = 0.21
    ```

2. **Realiza los cálculos:**
    - Calcula el total para cada producto (cantidad * precio).
    - Calcula el subtotal (la suma de los totales de todos los productos).
    - Calcula la cantidad de IVA a aplicar sobre el subtotal.
    - Calcula el total final (subtotal + IVA).
3. **Imprime el Ticket Formateado:** Utiliza f-strings para imprimir el ticket. Debe tener:
    - Un encabezado para el ticket.
    - Cabeceras para las columnas: "Producto", "Cant.", "Precio Unit.", "Total". Asegúrate de que estén bien alineadas.
    - Una línea por cada producto, con los datos alineados bajo sus cabeceras. Los precios y totales deben mostrarse siempre con **2 decimales**.
    - Una línea separadora.
    - Las líneas para el Subtotal, el IVA (mostrando el porcentaje aplicado) y el Total Final. Estas deben estar alineadas a la derecha.

**Salida esperada:**

Tu programa debería generar una salida que se vea exactamente así (con los mismos espacios y alineación):

```
==================================================
                 TICKET DE COMPRA
==================================================
Producto             Cant.  Precio Unit.     Total
--------------------------------------------------
Barra de pan             2          0.85      1.70
Leche (litro)            1          1.05      1.05
Manzanas (kg)          1.5          1.99      2.98
--------------------------------------------------
                             Subtotal:       5.73
                            IVA (21%):       1.20
                        TOTAL A PAGAR:       6.93
```

**Pistas:**

* Para las cabeceras y las líneas de productos, combina la alineación a la izquierda (`<`) para el nombre del producto y a la derecha (`>`) para los números.
* Usa el formato `:.2f` para todos los precios y totales.
* Para la línea del IVA, puedes anidar una f-string dentro de otra para mostrar el porcentaje: `f"IVA ({IVA:.0%}):"`
* Juega con los números de ancho en tus f-strings (ej: `{variable:>10.2f}`) hasta que las columnas queden perfectamente alineadas como en el ejemplo.