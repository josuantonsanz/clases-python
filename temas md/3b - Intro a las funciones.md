---
created: 2025-11-06T20:48
updated: 2025-11-10T09:47
---
# Funciones

## Introducción: ¿Qué son las funciones?

Ya conoces y has usado algunas funciones de Python sin darte cuenta: `print()`, `input()` y `len()`. Son herramientas que vienen con el lenguaje y que hacen una tarea específica.

Pero, ¿y si pudieras crear tus propias herramientas?

Una **función** es exactamente eso: un bloque de código reutilizable que realiza una tarea concreta. Es como un **mini-programa** dentro de nuestro programa.

Vamos a crear nuestra primera función para entenderlo mejor.

```python
# 1. Definimos la función con 'def'
def saludar():
    print("¡Hola!")
    print("¡Bienvenido al curso de Python!")
    print("¿Qué tal estás?")

# 2. Ahora, llamamos a la función para que se ejecute
print("--- Inicio del programa ---")
saludar()
print("--- Hacemos otra cosa ---")
saludar()
print("--- Fin del programa ---")
```

**Analicemos el código:**

1.  La línea `def saludar():` es la **definición** de la función. La palabra clave `def` le dice a Python: "voy a crear una nueva función". `saludar` es el nombre que le hemos dado, y los paréntesis `()` son obligatorios.
2.  El código que está indentado (con sangría) debajo de `def` es el **cuerpo** de la función. Este código **no se ejecuta** cuando Python lo lee por primera vez; solo se guarda en memoria.
3.  Las líneas `saludar()` son las **llamadas a la función**. Aquí es donde le decimos a Python: "¡Ahora sí, ejecuta el código que guardaste dentro de la función `saludar`!".

**Salida del programa:**

```
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

La gran ventaja es que, si mañana queremos cambiar el saludo, solo tenemos que modificarlo en **un único lugar**: dentro de la definición de la función. Esto nos ayuda a seguir el principio **DRY** (*Don't Repeat Yourself* - No te repitas), una de las ideas más importantes en programación.

## Pasando información a las funciones: Parámetros

Nuestra función `saludar()` es un poco sosa, siempre hace lo mismo. ¿Y si quisiéramos que saludara a una persona concreta? Para eso, usamos los **parámetros**.

Un **parámetro** es una variable especial que definimos entre los paréntesis de la función para que pueda recibir un valor desde fuera.

```python
def saludar_a(nombre):  # 'nombre' es un parámetro
    print(f"¡Hola, {nombre}!")

# Al llamar a la función, le pasamos un valor.
# Este valor se llama 'argumento'.
saludar_a("Ana")       # 'Ana' es el argumento
saludar_a("Marcos")    # 'Marcos' es el argumento
```

**Salida:**

```
¡Hola, Ana!
¡Hola, Marcos!
```

Cuando llamamos a `saludar_a("Ana")`, Python hace lo siguiente:
1.  Va a la definición de la función `saludar_a`.
2.  Crea la variable `nombre` dentro de la función.
3.  Asigna el valor del argumento (`"Ana"`) al parámetro (`nombre`). Es como si hiciera `nombre = "Ana"`.
4.  Ejecuta el cuerpo de la función con esa variable ya disponible.

> **Importante:** Las variables creadas como parámetros (como `nombre`) **solo existen dentro de la función**. Una vez que la función termina, esa variable desaparece. Esto se llama **ámbito local** y lo veremos en detalle más adelante.

## Devolviendo información: `return`

Las funciones no solo sirven para *hacer* cosas (como imprimir), sino también para *calcular* y *devolvernos* un resultado.

Cuando llamas a `len("hola")`, la función no imprime nada, sino que te **devuelve** el número `4`. A este valor que nos entregan se le llama **valor de retorno**.

Para que una función devuelva un valor, usamos la palabra clave `return`.

```python
def sumar(a, b):
    resultado = a + b
    return resultado

# Llamamos a la función y guardamos el valor de retorno en una variable
total = sumar(5, 3)
print(f"El resultado de la suma es: {total}")

# También podemos usar el valor de retorno directamente en otras operaciones
resultado_doble = sumar(10, 2) * 2
print(f"El doble del resultado es: {resultado_doble}")
```

**Salida:**

```
El resultado de la suma es: 8
El doble del resultado es: 24
```

Cuando la ejecución llega a la línea `return`, la función termina inmediatamente y entrega el valor indicado.

### El valor especial `None`

¿Qué devuelve una función si no tiene una sentencia `return`? En Python, estas funciones devuelven un valor especial llamado `None`, que representa "la ausencia de valor".

```python
def funcion_sin_return():
    print("Hago algo, pero no devuelvo nada.")

resultado = funcion_sin_return()
print(f"El resultado es: {resultado}")
```

**Salida:**

```
Hago algo, pero no devuelvo nada.
El resultado es: None
```

La función `print()` es un buen ejemplo: muestra algo en pantalla, pero su valor de retorno es `None`.

## Ámbito local y global (Scope)

Este es uno de los conceptos más importantes para entender cómo funcionan los programas.

- **Ámbito global:** Las variables que creas fuera de cualquier función viven en el ámbito global. Se pueden leer desde cualquier parte de tu programa, incluso dentro de las funciones.
- **Ámbito local:** Las variables que se crean *dentro* de una función (incluidos los parámetros) viven en el ámbito local de esa función. **Solo existen mientras la función se está ejecutando**.


**Reglas de los ámbitos:**

1. El código en el ámbito global no puede usar variables locales.
2. El código en un ámbito local **sí puede** leer variables globales.
3. El código en una función no puede acceder a las variables locales de *otra* función.
4. Puedes tener variables con el mismo nombre en ámbitos diferentes. No se mezclarán.

Veámoslo con ejemplos:

**Ejemplo 1: Las variables locales son privadas**

```python
def mi_funcion():
    variable_local = "Soy de aquí dentro"
    print(variable_local)

mi_funcion()
# print(variable_local) # ¡Esto daría un NameError! La variable ya no existe.
```

**Ejemplo 2: Se puede leer lo global desde lo local**

```python
variable_global = "Soy del pasillo"

def otra_funcion():
    print(f"Desde dentro puedo ver: {variable_global}")

otra_funcion()
```

**Ejemplo 3: Variables con el mismo nombre**

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

**Salida:**

```
En bacon(), huevos es: local de bacon
En spam(), huevos es: global
En el ámbito global, huevos es: global
```

Como ves, al asignar un valor a `huevos` dentro de `bacon()`, Python creó una nueva variable **local** con ese nombre, sin tocar la global. La función `spam()`, al no tener una variable local llamada `huevos`, leyó la del ámbito global.


> **Buenas prácticas:** Generalmente, es una mala idea modificar variables globales desde dentro de una función. Es preferible que una función reciba datos a través de sus parámetros y devuelva resultados con `return`. Esto hace que el programa sea mucho más fácil de entender y depurar.



## Ejercicios prácticos

### 1. Calculadora simple

1. Crea cuatro funciones: `sumar`, `restar`, `multiplicar` y `dividir`.
2. Cada función debe aceptar dos números como parámetros y devolver el resultado.
3. Pide al usuario dos números y luego llama a cada una de las funciones para mostrar los cuatro resultados.

O, modifica tu calculadora original para que cada una de las operaciones las haga en funciones a parte y no en el código original.

### 2. Validador de edad

1.  Escribe una función llamada `es_mayor_de_edad` que acepte una edad como parámetro.
2.  La función debe devolver `True` si la edad es 18 o más, y `False` en caso contrario.
3.  Escribe un programa principal que pida la edad al usuario.
4.  Si el número es válido, llama a tu función `es_mayor_de_edad` y dile al usuario si puede pasar o no.

### 3. La secuencia de Collatz

Este es un famoso problema matemático. Escribe una función `collatz(numero)` que haga lo siguiente:
-   Si el `numero` es par, debe imprimir y devolver `numero // 2`.
-   Si el `numero` es impar, debe imprimir y devolver `3 * numero + 1`.

Luego, escribe un programa que pida al usuario un número entero. El programa debe llamar repetidamente a la función `collatz` con el resultado anterior, hasta que el valor devuelto sea 1.

*Pista: Para saber si un número es par, puedes comprobar si `numero % 2 == 0`.*

**Ejemplo de ejecución:**
```
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

**Objetivo:** Crear un programa que evalúe si una contraseña es segura según unas reglas predefinidas. La clave de este ejercicio es crear funciones pequeñas y específicas para cada regla.

**Requisitos de una contraseña fuerte:**

1. Debe tener una longitud mínima de 8 caracteres.
2. Debe contener al menos una letra mayúscula.
3. Debe contener al menos un número.
    

**Instrucciones:**

1. **Crea funciones de verificación individuales:**
    - verificar_longitud(password): Debe recibir la contraseña y devolver True si tiene 8 o más caracteres, y False si no.
    - verificar_mayuscula(password): Debe recorrer la contraseña y devolver True si encuentra al menos una letra mayúscula. Pista: el método de string .isupper() te será muy útil.
    - verificar_numero(password): Debe recorrer la contraseña y devolver True si encuentra al menos un dígito. Pista: el método .isdigit().
2. **Crea la función principal analizar_fortaleza(password):**
    - Esta función recibirá la contraseña.
    - Dentro de ella, llamará a las tres funciones de verificación que creaste antes.
    - Imprimirá un informe claro para el usuario, indicando qué reglas cumple y cuáles no.
    - Al final, informará si la contraseña es "Fuerte" (si cumple todo) o "Débil".
3. **Programa principal:**
    - Pide al usuario que introduzca una contraseña.
    - Llama a la función analizar_fortaleza() para mostrarle el resultado.
    - Puedes meterlo todo en un bucle while para que el usuario pueda probar distintas contraseñas hasta que escriba "salir".
        

**Ejemplo de ejecución:**

```code
Introduce una contraseña para analizar (o escribe 'salir'): hola 
Analizando contraseña: 'hola' 
------------------------------------- 
✗ Longitud mínima (8 caracteres): No cumple 
✗ Contiene mayúsculas: No cumple 
✗ Contiene números: No cumple 
------------------------------------- 
Resultado: Contraseña Débil  

Introduce una contraseña para analizar (o escribe 'salir'): ClaveSegura123 Analizando contraseña: 'ClaveSegura123' 
------------------------------------- 
✓ Longitud mínima (8 caracteres): Cumple 
✓ Contiene mayúsculas: Cumple 
✓ Contiene números: Cumple 
------------------------------------- 
Resultado: Contraseña Fuerte`