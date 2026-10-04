# Archivos y excepciones en Python

Al cerrar un programa, sus variables y listas desaparecen de la memoria. Para crear programas útiles necesitamos **persistencia**: guardar información en el disco.

En este capítulo aprenderás a:

1. Leer archivos de texto.
2. Escribir y guardar información.
3. Gestionar errores con excepciones para que un programa no se rompa.
4. Guardar estructuras de datos como listas mediante JSON.

## Leer archivos

Imagina que tenemos un archivo llamado `pi_digits.txt` en la misma carpeta que nuestro programa, con este contenido:

```text
3.1415926535
  8979323846
  2643383279
```

### `open()` y el bloque `with`

Para abrir un archivo usamos `open()`. La forma segura de hacerlo es dentro de un bloque `with`:

```python
with open("pi_digits.txt") as fichero:
    contenido = fichero.read()
    print(contenido)
```

Al abrir un archivo, el sistema operativo reserva recursos para él. El bloque `with` se encarga de cerrar el archivo automáticamente al terminar, incluso aunque se produzca un error.

### Leer línea por línea

No siempre queremos leer un archivo entero de golpe. Para procesarlo una línea cada vez, lo recorremos con un `for`:

```python
nombre_archivo = "pi_digits.txt"

with open(nombre_archivo) as fichero:
    for linea in fichero:
        print(linea.strip())  # Quita el salto de línea final
```

### Guardar las líneas en una lista

Si quieres conservar el contenido después de cerrar el archivo, usa `.readlines()`. Cada línea se guarda como un elemento de una lista.

```python
with open(nombre_archivo) as fichero:
    lineas = fichero.readlines()

print(f"El archivo tiene {len(lineas)} líneas.")
```

::: nota Rutas en Windows
En las rutas de Windows se usan barras invertidas (`\`), pero en Python puedes usar barras normales (`/`) también en Windows. Por ejemplo: `open("datos/mi_archivo.txt")`.
:::

## Escribir en archivos

Para escribir, pasamos a `open()` un segundo argumento que indica el modo:

| Modo | Nombre | Qué hace |
|------|--------|----------|
| `'r'` | *read* | Lee un archivo. Es el modo por defecto. |
| `'w'` | *write* | Escribe desde cero. Si ya existe, borra su contenido. |
| `'a'` | *append* | Añade al final sin borrar el contenido anterior. |
| `'r+'` | lectura y escritura | Permite leer y escribir. |

### Crear o sobrescribir con `'w'`

```python
nombre_archivo = "programacion.txt"

with open(nombre_archivo, "w") as fichero:
    fichero.write("Me encanta programar.\n")
    fichero.write("Es muy útil para automatizar tareas.\n")
```

::: importante
`write()` no añade un salto de línea automáticamente. Es necesario escribir `\n` cuando lo necesites. Además, el modo `'w'` borra el contenido anterior del archivo si ya existe.
:::

### Añadir contenido con `'a'`

Para agregar líneas sin borrar lo que ya había:

```python
with open(nombre_archivo, "a") as fichero:
    fichero.write("También me gusta gestionar redes.\n")
```

## Excepciones: gestionar errores

Los archivos pueden no existir, una persona puede escribir un dato incorrecto o puede fallar una operación. Si no controlamos esos problemas, Python detiene el programa y muestra un *traceback*.

Los bloques `try` y `except` permiten indicar qué hacer cuando sucede un error.

### El bloque `try-except`

Dentro de `try` colocamos el código que podría fallar. Dentro de `except`, la respuesta al error.

```python
try:
    print(5 / 0)
except ZeroDivisionError:
    print("¡No puedes dividir por cero!")
```

El programa no se detiene: muestra el aviso y continúa.

### Gestionar `FileNotFoundError`

Este error es fundamental cuando pedimos al usuario que abra un archivo.

```python
archivo = "no_existo.txt"

try:
    with open(archivo) as fichero:
        contenido = fichero.read()
except FileNotFoundError:
    print(f"Lo siento, el archivo '{archivo}' no se encuentra en el sistema.")
```

### `else` y `pass`

- `else` se ejecuta solo si el bloque `try` termina correctamente.
- `pass` no hace nada; es útil cuando queremos dejar un bloque vacío de forma temporal.

```python
try:
    resultado = 10 / 2
except ZeroDivisionError:
    print("Error de cálculo")
else:
    print(f"El resultado es {resultado}")
```

### `finally`

El código de `finally` se ejecuta **siempre**, haya error o no. Es útil para tareas de limpieza, como cerrar una conexión con un servidor.

```python
try:
    print("Abriendo conexión con el servidor...")
    resultado = 10 / 0
    print("Enviando datos...")  # Esta línea no se ejecutará
except ZeroDivisionError:
    print("¡Error detectado! No se pudieron enviar los datos.")
finally:
    print("Cerrando conexión y liberando recursos...")
```

Salida:

```text
Abriendo conexión con el servidor...
¡Error detectado! No se pudieron enviar los datos.
Cerrando conexión y liberando recursos...
```

::: resumen Los cuatro bloques
- **`try`**: código que podría fallar.
- **`except`**: qué hacer si ocurre el error indicado.
- **`else`**: qué hacer si no hubo error.
- **`finally`**: qué hacer siempre, normalmente para limpiar recursos.
:::

## Guardar datos complejos con JSON

Un archivo `.txt` guarda texto. Para almacenar listas, diccionarios y otros datos estructurados podemos usar el módulo estándar `json`. JSON es un formato muy usado para intercambiar información entre programas.

Primero debemos importarlo:

```python
import json
```

### Guardar datos con `json.dump()`

```python
import json

numeros = [2, 3, 5, 7, 11, 13]
archivo = "numeros.json"

with open(archivo, "w") as fichero:
    json.dump(numeros, fichero)
```

### Recuperar datos con `json.load()`

```python
import json

archivo = "numeros.json"

with open(archivo) as fichero:
    datos_recuperados = json.load(fichero)

print(datos_recuperados)
# [2, 3, 5, 7, 11, 13]
```

Esto permite, por ejemplo, guardar preferencias del usuario, un inventario o el estado de un programa para recuperarlo más tarde.

::: resumen
- Usa `with open(...) as fichero:` para que un archivo se cierre automáticamente.
- `'r'` lee, `'w'` escribe borrando el contenido anterior y `'a'` añade al final.
- `try-except` evita que un error esperado detenga el programa.
- `json.dump()` guarda datos en JSON y `json.load()` los recupera.
:::

## Ejercicios prácticos

### 1. Registro de accesos

Imagina que administras un servidor y quieres registrar qué personas entran al sistema.

1. Pide un nombre de usuario con el mensaje `Introduce tu nombre de usuario para acceder:`.
2. Abre o crea `accesos.log` en modo añadir (`'a'`).
3. Escribe una línea como `Usuario [NOMBRE] ha entrado al sistema.` y añade `\n`.
4. Ejecuta el programa tres veces con nombres distintos y comprueba el archivo.

*Pista: usa `open("accesos.log", "a")`.*

### 2. El bloqueador de webs

Crea manualmente un archivo `blacklist.txt` en la misma carpeta que tu programa con este contenido:

```text
facebook.com
instagram.com
juegos.com
tiktok.com
```

Después, crea un programa que:

1. Abra el archivo en modo lectura.
2. Lo recorra línea por línea.
3. Muestre `Bloqueando acceso a: [DOMINIO]` para cada dominio.
4. Use `.strip()` para que no aparezcan líneas vacías extra.

### 3. Recuperación de configuración

Crea un programa que intente abrir `config.txt` en modo lectura.

1. Si el archivo existe, lee su contenido y muestra `Configuración cargada: [CONTENIDO]`.
2. Si no existe, captura `FileNotFoundError` y muestra: `¡Aviso! No se encontró config.txt. Cargando configuración por defecto...`.

Pruébalo primero sin crear el archivo y después con un archivo `config.txt` que contenga algún texto.

### 4. Inventario de hardware con JSON

1. Crea esta lista:

   ```python
   inventario = ["Memoria RAM 8GB", "Disco SSD 500GB", "Cable Ethernet 5m", "Pasta térmica"]
   ```

2. Importa `json`.
3. Abre `inventario_taller.json` en modo escritura.
4. Guarda la lista con `json.dump()`.
5. Abre el archivo generado con un editor de texto y comprueba que tiene el formato de una lista JSON.
