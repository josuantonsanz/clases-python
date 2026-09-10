# Formato Markdown de los capítulos

Cada capítulo es un archivo `.md` dentro de la carpeta `capitulos/`.
Al ejecutar `node build.js` (o `construir.bat`), esos archivos se convierten
automáticamente en páginas HTML con el diseño, el índice, la impresión y las
diapositivas ya incluidos.

---

## 1. Estructura de un capítulo

- El **título** del capítulo y su **materia** se escriben en `capitulos/lista.json`
  (no en el `.md`).
- Dentro del `.md`, cada apartado empieza con `## Título del apartado`.
- Cada `##` se convierte en una **sección** y, en modo diapositivas, en una **diapositiva**.
- Dentro de una diapositiva, cada **bloque** (párrafo, lista, tabla, caja `::: `,
  bloque de código…) aparece **de uno en uno** al avanzar. Así puedes explicar
  la diapositiva paso a paso sin cortarla en trozos.

Ejemplo mínimo (`capitulos/06-ejemplo.md`):

```markdown
## Primer apartado

Texto introductorio del apartado.

### Subtítulo (opcional)

Más contenido...

## Segundo apartado

Más contenido...
```

> Nota: puedes empezar el archivo con `# Título`, pero se ignora (el título
> real es el de `lista.json`).

---

## 2. Sintaxis básica de Markdown

| Elemento | Se escribe | Resultado |
|----------|-----------|-----------|
| Negrita | `**texto**` | **texto** |
| Cursiva | `*texto*` | *texto* |
| Lista sin orden | `- elemento` | • elemento |
| Lista numerada | `1. elemento` | 1. elemento |
| Enlace | `[texto](https://…)` | enlace |
| Cita | `> texto` | cita |
| Título de sección | `## Título` | apartado nuevo |
| Subtítulo | `### Subtítulo` | subtítulo dentro del apartado |
| Bloque de código | ```` ```python ... ``` ```` | código con formato |

### Tablas

```markdown
| Columna 1 | Columna 2 |
|-----------|-----------|
| dato      | dato      |
```

| Columna 1 | Columna 2 |
|-----------|-----------|
| dato      | dato      |

### Bloques de código

Para incluir código usa tres acentos graves y, si quieres, el lenguaje:

````markdown
```python
# Los comentarios con # no crean apartados
x = 5
print(x)
```
````

Los comentarios de Python que empiezan por `#` **no** se confunden con
títulos de sección, porque el conversor respeta los bloques de código.

> **Código ejecutable:** los bloques marcados como ` ```python ` se
> convierten en un **editor con botón ▶ Ejecutar**: el alumno puede modificar
> el código y ver el resultado en la propia página. El intérprete (**Skulpt**)
> va incluido en `lib/`, así que funciona sin conexión. Los bloques de otros
> lenguajes (por ejemplo ` ```assembly ` o ` ```markdown `) se muestran solo
> como texto.

---

## 3. Contenedores especiales `:::`

Para crear cajas de color (ejemplos, resúmenes, etc.) se usan bloques que
empiezan y terminan con `:::`:

```markdown
::: tipo Título opcional
contenido en markdown
:::
```

El **título opcional** se escribe en la misma línea que el tipo. Si no se
escribe, se usa un título por defecto.

### Tipos disponibles

| Tipo | Alias | Caja generada | Título por defecto |
|------|-------|---------------|--------------------|
| `ejemplo` | `example` | azul (ejemplo) | *Ejemplo* |
| `resumen` | `resum` | verde (resumen) | *Resumen* |
| `dato` | `sabias`, `importante` | naranja (dato) | *¿Sabías que…?* / *Importante* |
| `nota` | — | gris (nota) | *Nota* |
| `math` | — | fórmula en línea, sin título | — |
| `formula` | `ecuacion` | fórmula centrada, sin título | — |

### Ejemplos

**Ejemplo con título personalizado:**

```markdown
::: ejemplo Calcular el IVA
Un producto cuesta 80 € y el IVA es del 21 %.
80 × 21 / 100 = 16,80 €
:::
```

**Resumen con lista:**

```markdown
::: resumen
- Respeta la jerarquía de operaciones.
- Una fracción expresa una parte de la unidad.
:::
```

**Dato curioso:**

```markdown
::: dato
El cuerpo humano tiene unos 37 billones de células.
:::
```

**Fórmula centrada:**

```markdown
::: formula
v = d / t
:::
```

**Nota:**

```markdown
::: nota
Entrega las actividades con los pasos y las unidades.
:::
```

---

## 4. Fórmulas y fracciones (HTML dentro del Markdown)

Para fracciones o expresiones matemáticas más bonitas puedes usar HTML
directamente dentro del Markdown (se respeta tal cual).

**Fracción:**

```markdown
::: math
<span class="frac"><span class="frac__num">3</span><span class="frac__den">4</span></span>
:::
```

Se ve así: <span class="frac"><span class="frac__num">3</span><span class="frac__den">4</span></span>

**Superíndices y subíndices:**

```markdown
m<sup>2</sup>  y  H<sub>2</sub>O
```

---

## 5. Añadir un capítulo nuevo

1. Crea `capitulos/06-tema.md` (o el nombre que quieras) y escribe el contenido.
2. Añade su entrada en `capitulos/lista.json`:

```json
{
  "archivo": "capitulos/06-tema.md",
  "titulo": "Título del nuevo capítulo",
  "materia": "python",
  "descripcion": "Breve descripción que aparece en el índice."
}
```

3. Ejecuta `node build.js` (o doble clic en `construir.bat`).

Materias disponibles en `lista.json`:

| Clave | Etiqueta | Color |
|-------|----------|-------|
| `python` | Python | azul Python |
| `matematicas` | Matemáticas | azul |
| `biologia` | Biología | verde |
| `fisica` | Física | naranja |
| `quimica` | Química | morado |
| `actividades` | Repaso | rosa |

> En este tema solo se usa `python`; las demás claves se mantienen por si
> quieres reutilizar la plantilla para otras materias.

---

## 6. Trucos

- **Modo diapositivas paso a paso:** al pulsar `→`, `Espacio`, hacer clic o
  deslizar, aparece el siguiente bloque de la diapositiva. Solo cuando ya se
  han mostrado todos se pasa a la siguiente. `←` deshace el último bloque y,
  si no queda ninguno, vuelve a la diapositiva anterior. Los puntos junto al
  contador indican cuántos bloques quedan por aparecer.
  - El **título** `##` se ve siempre desde el principio.
  - Si un apartado tiene muchos bloques y prefieres verlo entero de golpe,
    basta con **partirlo en dos `##`** o reducir el número de párrafos.
- Para **imágenes**, usa HTML directo: `<img src="imagen.jpg" alt="...">` y
  guarda la imagen junto al capítulo.
- Para un **salto de página** forzado al imprimir, usa:
  `<div style="break-before: page"></div>`.
- Los enlaces entre capítulos se escriben como rutas relativas:
  `[Ir a Primeros comandos](02-primeros-comandos.html)`.
