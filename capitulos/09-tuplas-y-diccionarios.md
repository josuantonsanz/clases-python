# Tuplas y diccionarios: organizar datos

Las listas son muy útiles porque podemos añadir, quitar y cambiar elementos. Pero a veces necesitamos datos que **no deben cambiar**, o queremos buscar un dato por su nombre en vez de por su posición numérica.

En este capítulo veremos dos estructuras fundamentales: las **tuplas** y los **diccionarios**.

## Tuplas: listas inmutables

Imagina que programas un videojuego y defines el tamaño de la pantalla. No querrías que una parte del código cambiara su ancho por error durante la partida.

Para guardar colecciones que no deben modificarse, Python ofrece las **tuplas**. Técnicamente, decimos que son **inmutables**.

### Definir una tupla

Una tupla se parece mucho a una lista, pero se escribe con paréntesis `()` en vez de corchetes `[]`.

```python
# Una lista: se puede cambiar
dimensiones_lista = [200, 50]

# Una tupla: no se puede cambiar
dimensiones = (200, 50)
```

Para acceder a sus datos usamos índices, igual que con las listas:

```python
print(dimensiones[0])  # 200
print(dimensiones[1])  # 50
```

### Intentar modificar una tupla

Si intentamos modificar un elemento, Python produce un `TypeError`.

```python
dimensiones = (200, 50)
# dimensiones[0] = 250  # TypeError
```

### Reasignar una tupla completa

No podemos cambiar elementos *dentro* de una tupla, pero sí podemos asignar una nueva tupla completa a la variable.

```python
dimensiones = (200, 50)
print("Dimensiones originales:")
for dimension in dimensiones:
    print(dimension)

# Reasignamos la variable con una tupla nueva
dimensiones = (400, 100)
print("Dimensiones modificadas:")
for dimension in dimensiones:
    print(dimension)
```

::: nota ¿Cuándo usar tuplas?
Úsalas cuando los valores deban permanecer constantes durante el programa: días de la semana, coordenadas fijas o configuraciones de hardware, por ejemplo.
:::

## Diccionarios: datos con clave y valor

En una lista, para encontrar algo debes conocer su índice: `0`, `1`, `2`... Pero para describir a una persona resulta más claro pedir su «nombre» o su «edad».

Un **diccionario** funciona como un diccionario de papel: buscas una **clave** y obtienes su **valor**. Se escribe con llaves `{}` y contiene pares `clave: valor`.

```python
mi_gato = {
    "tamaño": "grande",
    "color": "gris",
    "tipo": "ruidoso"
}
```

### Acceder a los valores

Usamos la clave entre corchetes:

```python
print(mi_gato["tamaño"])
print(f"Mi gato tiene el pelo {mi_gato['color']}.")
```

### Modificar y añadir datos

Los diccionarios son **mutables**. El orden no es lo importante: cada dato se identifica por su clave.

```python
alumno = {"nombre": "Pedro", "edad": 15}

# Añadir un dato
alumno["curso"] = "4º ESO"

# Modificar un dato existente
alumno["edad"] = 16

print(alumno)
# {'nombre': 'Pedro', 'edad': 16, 'curso': '4º ESO'}
```

### Evitar `KeyError` con `.get()`

Si intentas acceder a una clave que no existe con `diccionario["clave"]`, el programa falla con un `KeyError`.

```python
usuario = {"nombre": "Pedro", "edad": 15}
# print(usuario["color"])  # KeyError: 'color'
```

El método `.get()` es más seguro: si no encuentra la clave, devuelve un valor por defecto que elijas. Si no indicas ninguno, devuelve `None`.

```python
materiales = {"manzanas": 5, "vasos": 2}

print(f"Traigo {materiales.get('vasos', 0)} vasos.")
print(f"Traigo {materiales.get('huevos', 0)} huevos.")
```

Salida:

```text
Traigo 2 vasos.
Traigo 0 huevos.
```

## Recorrer y utilizar diccionarios

Un diccionario se puede recorrer con un `for`. Sus métodos permiten elegir qué parte queremos obtener:

| Método | Devuelve |
|--------|----------|
| `.keys()` | Las claves. Es el comportamiento por defecto al recorrer un diccionario. |
| `.values()` | Los valores. |
| `.items()` | Parejas de clave y valor. |

```python
perfil = {"color": "rojo", "edad": 42}

print("--- Valores ---")
for valor in perfil.values():
    print(valor)

print("\n--- Clave y valor ---")
for clave, valor in perfil.items():
    print(f"La clave es '{clave}' y el valor es {valor}")
```

### Comprobar si existe una clave

Como con las listas, `in` comprueba si algo existe. En un diccionario, comprueba las **claves**.

```python
ordenador = {"cpu": "i7", "ram": "16 GB"}

if "grafica" in ordenador:
    print(f"Tiene gráfica: {ordenador['grafica']}")
else:
    print("Este ordenador no tiene tarjeta gráfica dedicada.")
```

### Añadir un valor solo si no existe: `.setdefault()`

`.setdefault(clave, valor)` añade la clave con ese valor únicamente si todavía no existe. Es útil, por ejemplo, para contar apariciones.

```python
mensaje = "Hola a todos los alumnos de SMR"
conteo = {}

for letra in mensaje:
    # La primera vez crea la clave con valor 0
    conteo.setdefault(letra, 0)
    conteo[letra] = conteo[letra] + 1

print(conteo)
```

### Mostrar diccionarios grandes con `pprint`

El módulo `pprint` (*pretty print*) muestra diccionarios grandes de forma más legible y ordenada.

```python
import pprint

pprint.pprint(conteo)
```

::: resumen
- Las **tuplas** se escriben con `()` y son inmutables.
- Los **diccionarios** se escriben con `{}` y relacionan cada clave con un valor.
- Usa `diccionario[clave]` si sabes que existe; usa `.get(clave, valor_por_defecto)` si podría faltar.
- `.items()` permite recorrer claves y valores a la vez.
:::

## Ejercicios prácticos

### 1. El buffet: tuplas

Un restaurante de buffet ofrece cinco comidas básicas.

1. Guarda cinco comidas sencillas en una tupla.
2. Usa un `for` para mostrar cada comida.
3. Intenta modificar un elemento y comprueba el error. Después comenta esa línea para que el programa pueda continuar.
4. El restaurante cambia dos platos: reasigna la variable a una tupla nueva y vuelve a mostrar el menú.

### 2. Glosario de programación

Crea un diccionario con palabras de programación y sus definiciones.

- Incluye, por ejemplo, `bucle`, `lista`, `diccionario`, `string` y `tupla` como claves.
- Muestra cada palabra y su significado con un formato limpio usando f-strings y `\n` si lo necesitas.

Ejemplo: `Bucle: estructura que repite un bloque de código...`

### 3. Registro de usuarios

Simula una pequeña base de datos.

1. Crea un diccionario vacío llamado `usuario`.
2. Pide con `input()` el nombre, apellido, edad y correo electrónico.
3. Guarda cada dato con una clave adecuada.
4. Muestra: `El usuario {nombre} {apellido} tiene {edad} años y su correo es {email}`.
5. **Extra:** crea una lista vacía `lista_usuarios` y añade cada diccionario de usuario con `.append()` para guardar varios usuarios.

### 4. Contador de vocales

Crea un programa que pida una frase y cuente sus vocales.

1. Empieza con este diccionario:

   ```python
   vocales = {"a": 0, "e": 0, "i": 0, "o": 0, "u": 0}
   ```

2. Recorre la frase letra a letra.
3. Convierte cada letra a minúscula con `.lower()`.
4. Si es una vocal, aumenta su contador en el diccionario.
5. Muestra el resultado final.

### 5. Inventario de hardware

Parte de este inventario:

```python
inventario = {
    "ratones": 12,
    "teclados": 5,
    "monitores": 2
}
```

1. Muestra el inventario con `.items()`.
2. Pregunta qué artículo se quiere retirar del almacén.
3. Usa `.get()` para comprobar si existe.
4. Si no existe, muestra `No tenemos ese artículo`.
5. Si existe pero tiene `0` unidades, muestra `No queda stock`.
6. Si hay existencias, resta una unidad e informa de cuántas quedan.
