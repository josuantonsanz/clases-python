---
created: 2025-09-13T16:55
updated: 2025-09-14T00:02
dg-publish: true
dg-hide: true
---
# Introducción a Python

Ahora que ya sabemos por qué vamos a aprender a programar y por qué usaremos Python, vamos a profundizar un poco más en qué es exactamente este lenguaje y cómo funciona por dentro.

### Un poco de historia

Python no es un lenguaje nuevo; de hecho, tiene una historia bastante interesante. Fue creado a finales de los años 80 por un programador holandés llamado **Guido van Rossum** en el Centro para las Matemáticas y la Informática de los Países Bajos. Curiosamente, el nombre no tiene nada que ver con serpientes. Van Rossum era un gran fan del grupo de cómicos británicos **Monty Python**, y de ahí viene el nombre.

En los 90, van Rossum continuó su trabajo en Estados Unidos, donde lanzó la iniciativa Computer Programming for Everybody (CP4E), o «Programación para todo el mundo». Su objetivo era hacer la programación más accesible, con una sintaxis limpia y fácil de leer. Esta filosofía sigue siendo hoy una de sus mayores fortalezas.

Desde el año 2001, Python es gestionado por la **Python Software Foundation (PSF)**, una organización sin ánimo de lucro que garantiza que el lenguaje siga siendo libre, abierto y desarrollado por su comunidad.

## ¿Qué es un lenguaje?

Para empezar, es importante aclarar tres términos que a menudo se confunden: **lenguaje**, **código** y **programa**.

- Un **lenguaje de programación** es un conjunto de reglas, símbolos y palabras clave que nos permiten comunicarnos con un ordenador y darle instrucciones. Es como el castellano o el inglés: tiene una gramática (sintaxis) y un vocabulario que debemos respetar. Python es uno de estos lenguajes.
- El **código** (o código fuente) es el texto que escribimos siguiendo las reglas de un lenguaje de programación. Son las «frases» y «párrafos» que creamos usando el vocabulario y la gramática del lenguaje.
- Un **programa** es el conjunto de código que, al ser ejecutado por el ordenador, realiza una tarea específica. Generalmente, cuando hablamos de un «programa», nos referimos a ese proceso de ejecución, ya sea de un archivo que se compila y luego se ejecuta, o de un script que se va interpretando línea a línea.
    
Uniendo los tres términos, decimos que usamos un **lenguaje** para escribir **código**, y la ejecución de ese código es lo que llamamos un **programa**.

## Distintos niveles de lenguaje

No todos los lenguajes de programación hablan al ordenador de la misma manera. Podemos clasificarlos por su «nivel de abstracción», es decir, lo lejos o cerca que están del lenguaje que entiende el hardware.

- **Lenguajes de alto nivel**: Son los que están más cerca del lenguaje humano. Utilizan palabras que nos resultan fáciles de entender (como `if`, `for` o `print`). Son más sencillos de aprender y nos permiten escribir programas más rápidamente. Python es un lenguaje de alto nivel, al igual que Java, JavaScript o PHP.
    - Ejemplo de una suma en Python (alto nivel): `resultado = 5 + 3`
- **Lenguajes de bajo nivel (Ensamblador)**: Están mucho más cerca del "idioma" de la máquina. Sus instrucciones se corresponden directamente con operaciones del procesador. Son muy rápidos, pero también mucho más difíciles de escribir. El ejemplo más común es el lenguaje ensamblador (Assembly).
    - Ejemplo de la misma suma en lenguaje ensamblador (bajo nivel):

        
```Assembly
mov eax, 5 ; Mueve el valor 5 al registro del procesador 'eax' 
mov ebx, 3 ; Mueve el valor 3 al registro 'ebx' 
add eax, ebx  ; Suma ebx a eax y guarda el resultado en eax 
mov [resultado], eax ; Mueve el resultado desde el registro a la memoria
```
          
        
- **Código máquina**: Este es el nivel más bajo que existe. Es el único lenguaje que el procesador de un ordenador entiende de verdad y está compuesto exclusivamente por unos y ceros (código binario). El código ensamblador de arriba es una representación legible para nosotros, pero la máquina en realidad leería algo como 10111000 00000101.... Todo código, sin importar el lenguaje, debe ser traducido a código máquina para que el ordenador pueda ejecutarlo.
    
### Lenguaje interpretado vs. compilado

Esa «traducción» de nuestro código a código máquina se puede hacer de dos maneras principales. Esto da lugar a dos tipos de lenguajes:

#### Lenguajes compilados

Un lenguaje compilado necesita un programa especial llamado **compilador**. El compilador coge todo nuestro código fuente y lo traduce de una sola vez a código máquina, generando un archivo nuevo e independiente que se puede ejecutar (como un .exe en Windows).

- **Ventajas**: La ejecución es muy rápida, porque toda la traducción se ha hecho antes.
- **Desventajas**: Si cambias una sola línea de código, tienes que volver a compilar todo el programa. Además, el archivo ejecutable solo funciona en un sistema operativo específico.
- **Ejemplos**: C, C++.
    
#### Lenguajes interpretados

Un lenguaje interpretado utiliza un programa llamado **intérprete**. En lugar de traducir todo el código de golpe, el intérprete lee el código fuente línea por línea y ejecuta cada instrucción sobre la marcha.

- **Ventajas**: Son muy flexibles y portátiles. El mismo archivo de código puede funcionar en Windows, Linux o Mac, siempre que tengan el intérprete instalado. Son ideales para el scripting y el desarrollo rápido.
- **Desventajas**: La ejecución es más lenta, porque la traducción se hace cada vez que se ejecuta el programa.
- **Ejemplos**: Python, JavaScript, PHP.

En principio, Python es un lenguaje interpretado. Esto es lo que nos permite ejecutar programas tan fácilmente y probar código de forma interactiva. Aunque internamente Python realiza un paso intermedio (compila el código a un formato llamado bytecode que luego interpreta), a efectos prácticos se comporta como un lenguaje interpretado, dándonos toda su flexibilidad.
