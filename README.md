# Programación en Python · Material de aula multi-capítulo

Plantilla **HTML + CSS + JS** para la asignatura de *Programación en Python*.

Actualmente incluye dos capítulos: **Introducción a Python** y **Primeros comandos**.

El contenido se escribe en **Markdown** (carpeta `capitulos/`) y un comando lo
convierte en páginas HTML con diseño, índice lateral, impresión en PDF y modo
diapositivas.

## Cómo funciona

```
escribes Markdown  →  node build.js  →  HTML estático listo para usar
(capitulos/*.md)      (o construir.bat)   (index.html + capitulos/*.html)
```

- **Leer online:** abre `index.html` y entra en cada capítulo.
- **Imprimir / PDF:** botón **🖨️ Imprimir / PDF** o `Ctrl+P`. Salida A4, con
  portada y cada apartado en su propia página, sin la URL ni la fecha del navegador.
- **Diapositivas:** botón **▶ Diapositivas** dentro de cada capítulo.
  Navega con `←` `→` `Espacio` `Esc` o deslizando en pantalla táctil.
- **Código ejecutable:** cada bloque ` ```python ` se convierte en un editor con
  botón **▶ Ejecutar** y **resaltado de sintaxis tipo IDE**. El alumno puede
  modificar el código y ver el resultado en la propia página. Funciona sin
  conexión (el intérprete **Skulpt** va incluido en `lib/`) y también en el modo
  diapositivas, donde el código se muestra más grande.

## Archivos

| Archivo / carpeta      | Qué es                                             |
|------------------------|----------------------------------------------------|
| `capitulos/*.md`       | **Contenido** de cada capítulo (Markdown). Se edita. |
| `capitulos/lista.json` | Títulos, materias y descripciones de los capítulos. |
| `plantilla.html`       | Plantilla que da forma a cada capítulo.            |
| `build.js`             | Conversor Markdown → HTML.                         |
| `construir.bat`        | Ejecuta el build con doble clic (Windows).         |
| `lib/skulpt.min.js`   | Intérprete de Python en JavaScript (bloques ejecutables). |
| `lib/skulpt-stdlib.js` | Librería estándar de Skulpt.                      |
| `lib/marked.min.js`    | Conversor de Markdown (ya incluido, no requiere instalar nada). |
| `styles.css` / `script.js` | Diseño y comportamiento (índice, diapositivas, impresión). |
| `FORMATO-MARKDOWN.md`  | **Guía con todas las opciones de Markdown y `:::`.** |

## Uso

1. Edita o añade archivos `.md` en `capitulos/`.
2. Añade su entrada en `capitulos/lista.json` (título, materia, descripción).
3. Ejecuta `node build.js` o haz doble clic en **`construir.bat`**.
4. Abre `index.html`.

No hace falta conexión a internet para usar el resultado: todo es HTML estático
que puedes abrir con doble clic o subir a **GitHub Pages** (o cualquier hosting)
tal cual, porque los capítulos ya están convertidos.

## Sintaxis rápida

````markdown
## Título del apartado          → sección / diapositiva

**negrita**, *cursiva*, listas y tablas como en cualquier Markdown.

```python
# Bloque de código; los comentarios # no crean apartados
print("Hola")
```

::: ejemplo Título opcional     → caja de ejemplo
contenido...
:::

::: resumen                     → caja de resumen
- idea clave
:::

::: formula                     → fórmula centrada
v = d / t
:::
````

> Los bloques con lenguaje `python` se vuelven **ejecutables** (botón
> *Ejecutar*); los de otros lenguajes se muestran solo como texto.

Todas las opciones (tipos de caja, fracciones, tablas, añadir capítulos…) están
detalladas en **`FORMATO-MARKDOWN.md`**.

## Personalizar colores

En la parte superior de `styles.css`, dentro de `:root`, están las variables
`--azul`, `--py` (Python), `--mat`, `--bio`, `--fis`, `--qui`, etc.

## Publicación (GitHub Pages)

Este tema se publica como sitio estático en:

**https://josuantonsanz.github.io/clases-python/**

GitHub Pages sirve la rama `main` desde la raíz del repositorio. Para
actualizar la web después de editar los capítulos:

```bash
node build.js
git add -A
git commit -m "Actualizar capítulos"
git push
```

En Windows también puedes hacer doble clic en **`publicar.bat`**, que hace
todo el proceso: genera el HTML, guarda los cambios y los sube a GitHub.
