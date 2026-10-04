# Funciones

## Introducción: ¿qué son las funciones?

Ya has usado funciones de Python sin darte cuenta: `print()`, `input()` y `len()` son herramientas que realizan una tarea concreta.

Una **función** es un bloque de código reutilizable que realiza una tarea específica. Es como un mini-programa dentro de nuestro programa. Podemos crear nuestras propias funciones con la palabra clave `def`.

```python
# Definimos la función
def saludar():
    print("¡Hola!")
    print("¡Bienvenido al curso de Python!")
    print("¿Qué tal estás?")

# Llamamos a la función para ejecutarla
print("--- Inicio del programa ---")
saludar()
print("--- Hacemos otra cosa ---")
saludar()
print("--- Fin del programa ---")
```

Analicemos el código:

1. `def saludar():` es la **definición**. `def` indica que vamos a crear una función; `saludar` es su nombre y los paréntesis son obligatorios.
2. El código indentado bajo `def` es el **cuerpo** de la función. Python lo guarda, pero todavía no lo ejecuta.
3. Las líneas `saludar()` son las **llamadas** a la función: ahí pedimos a Python que ejecute el código guardado.

Salida:

```text
--- Inicio del programa ---
¡Hola!
¡Bienvenido al curso de Python!
¿Qué tal estás?
--- Hacemos otra cosa ---
¡Hola!
¡Bienvenido al curso de Python!
¿Qué tal estás?
--- Fin del programa ---
```

La ventaja es que, si queremos cambiar el saludo, solo debemos modificarlo en un único lugar: su definición. Esta idea se conoce como principio **DRY** (*Don't Repeat Yourself*: «no te repitas»).

## Pasar información: parámetros y argumentos

La función `saludar()` siempre hace lo mismo. Para que pueda saludar a personas diferentes, usamos **parámetros**.

Un parámetro es una variable especial que escribimos entre los paréntesis de la definición para que la función pueda recibir un valor desde fuera.

```python
def saludar_a(nombre):  # nombre es un parámetro
    print(f"¡Hola, {nombre}!")

# Los valores que enviamos al llamar a la función son argumentos
saludar_a("Ana")
saludar_a("Marcos")
```

Salida:

```text
¡Hola, Ana!
¡Hola, Marcos!
```

Al ejecutar `saludar_a("Ana")`, Python asigna el argumento `"Ana"` al parámetro `nombre` y después ejecuta el cuerpo de la función.

::: importante Parámetro y argumento
El **parámetro** es el nombre que aparece al definir la función (`nombre`). El **argumento** es el valor concreto que enviamos al llamarla (`"Ana"`).
:::

Los parámetros solo existen dentro de la función mientras esta se está ejecutando. A esto se le llama **ámbito local**.

## Devolver información con `return`

Las funciones no solo sirven para hacer acciones como mostrar texto: también pueden calcular y devolver un resultado. Por ejemplo, `len("hola")` devuelve el número `4`.

Para devolver un valor usamos la palabra clave `return`.

```python
def sumar(a, b):
    resultado = a + b
    return resultado

# Guardamos el valor devuelto en una variable
total = sumar(5, 3)
print(f"El resultado de la suma es: {total}")

# También podemos usarlo directamente en otra operación
resultado_doble = sumar(10, 2) * 2
print(f"El doble del resultado es: {resultado_doble}")
```

Salida:

```text
El resultado de la suma es: 8
El doble del resultado es: 24
```

Al llegar a `return`, la función termina inmediatamente y entrega el valor indicado.

### El valor especial `None`

Si una función no tiene una sentencia `return`, Python devuelve el valor especial `None`, que representa la ausencia de valor.

```python
def funcion_sin_return():
    print("Hago algo, pero no devuelvo nada.")

resultado = funcion_sin_return()
print(f"El resultado es: {resultado}")
```

Salida:

```text
Hago algo, pero no devuelvo nada.
El resultado es: None
```

`print()` es un buen ejemplo: muestra información en pantalla, pero no devuelve un resultado útil.

## Ámbito local y global

El **ámbito** (*scope*) determina dónde existe una variable y desde qué parte del programa se puede usar.

- **Ámbito global:** las variables creadas fuera de cualquier función. Se pueden leer desde cualquier parte del programa, también desde las funciones.
- **Ámbito local:** las variables creadas dentro de una función, incluidos sus parámetros. Solo existen durante la ejecución de esa función.

Reglas importantes:

1. El código global no puede usar una variable local.
2. Una función sí puede leer una variable global.
3. Una función no puede acceder a las variables locales de otra función.
4. Puede haber variables con el mismo nombre en ámbitos diferentes: no se mezclan.

### Las variables locales son privadas

```python
def mi_funcion():
    variable_local = "Soy de aquí dentro"
    print(variable_local)

mi_funcion()
# print(variable_local)  # Daría NameError: la variable ya no existe aquí
```

### Leer una variable global

```python
variable_global = "Soy del ámbito global"

def otra_funcion():
    print(f"Desde dentro puedo ver: {variable_global}")

otra_funcion()
```

### El mismo nombre en ámbitos distintos

```python
huevos = "global"

def bacon():
    huevos = "local de bacon"
    print(f"En bacon(), huevos es: {huevos}")

def spam():
    print(f"En spam(), huevos es: {huevos}")

bacon()
spam()
print(f"En el ámbito global, huevos es: {huevos}")
```

Salida:

```text
En bacon(), huevos es: local de bacon
En spam(), huevos es: global
En el ámbito global, huevos es: global
```

Al asignar un valor a `huevos` dentro de `bacon()`, Python crea una variable local nueva sin modificar la global. Como `spam()` no tiene una variable local llamada `huevos`, lee la global.

::: nota Buenas prácticas
Evita modificar variables globales desde dentro de una función. Es preferible recibir los datos como parámetros y devolver los resultados con `return`: el código será más fácil de entender y depurar.
:::

::: resumen
- Se define una función con `def nombre():` y se ejecuta con `nombre()`.
- Los **parámetros** reciben los datos que enviamos como **argumentos**.
- `return` devuelve un resultado; sin `return`, una función devuelve `None`.
- Las variables locales solo viven dentro de su función; las globales se crean fuera de ellas.
:::

## Ejercicios prácticos

### 1. Calculadora simple

1. Crea cuatro funciones: `sumar`, `restar`, `multiplicar` y `dividir`.
2. Cada función debe aceptar dos números como parámetros y devolver el resultado.
3. Pide dos números al usuario y usa las funciones para mostrar los cuatro resultados.

También puedes modificar tu calculadora anterior para que cada operación se haga en una función diferente.

### 2. Validador de edad

1. Escribe una función llamada `es_mayor_de_edad` que acepte una edad.
2. Debe devolver `True` si la edad es 18 o más, y `False` en caso contrario.
3. Pide una edad al usuario.
4. Llama a la función y comunica si puede pasar o no.

### 3. La secuencia de Collatz

Escribe una función `collatz(numero)` que haga lo siguiente:

- Si `numero` es par, imprime y devuelve `numero // 2`.
- Si es impar, imprime y devuelve `3 * numero + 1`.

Después, pide al usuario un número entero y llama repetidamente a la función con el resultado anterior hasta que devuelva `1`.

*Pista: un número es par si `numero % 2 == 0`.*

Ejemplo de ejecución:

```text
Introduce un número: 3
10
5
16
8
4
2
1
```

### 4. Analizador de fortaleza de contraseñas

Crea un programa que evalúe una contraseña mediante funciones pequeñas y específicas.

Una contraseña fuerte debe:

1. Tener al menos 8 caracteres.
2. Contener una letra mayúscula.
3. Contener al menos un número.

Instrucciones:

1. Crea `verificar_longitud(password)`, que devuelva si tiene 8 caracteres o más.
2. Crea `verificar_mayuscula(password)`, que recorra el texto y devuelva `True` si encuentra una mayúscula. El método `.isupper()` te ayudará.
3. Crea `verificar_numero(password)`, que devuelva `True` si encuentra un dígito. Usa `.isdigit()`.
4. Crea `analizar_fortaleza(password)`. Debe llamar a las tres funciones anteriores, mostrar las reglas que se cumplen y decidir si la contraseña es fuerte o débil.
5. Pide una contraseña al usuario. Como extra, usa un `while` para probar distintas contraseñas hasta que escriba `salir`.

Ejemplo de salida:

```text
Introduce una contraseña para analizar (o escribe 'salir'): hola
Analizando contraseña: 'hola'
-------------------------------------
✗ Longitud mínima (8 caracteres): No cumple
✗ Contiene mayúsculas: No cumple
✗ Contiene números: No cumple
-------------------------------------
Resultado: Contraseña débil
```
