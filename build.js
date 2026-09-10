#!/usr/bin/env node
/* ============================================================
   build.js — Genera index.html y capitulos/*.html a partir de
   archivos Markdown (capitulos/*.md).

   Uso:  node build.js   (o doble clic en construir.bat)

   No requiere instalar nada: usa lib/marked.min.js (incluido).
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const marked = require("./lib/marked.min.js");

const RUTA_LISTA     = "capitulos/lista.json";
const RUTA_PLANTILLA = "plantilla.html";

/* Materias disponibles y su etiqueta de color */
const MATERIAS = {
  python:      { label: "Python",      cls: "tag--py"  },
  matematicas: { label: "Matemáticas", cls: "tag--mat" },
  biologia:    { label: "Biología",    cls: "tag--bio" },
  fisica:      { label: "Física",      cls: "tag--fis" },
  quimica:     { label: "Química",     cls: "tag--qui" },
  actividades: { label: "Repaso",      cls: "tag--act" },
};

/* Contenedores ::: admitidos.
   def = título por defecto (null => bloque sin título, render inline) */
const CONTENEDORES = {
  ejemplo:    { cls: "box box--example", def: "Ejemplo" },
  example:    { cls: "box box--example", def: "Ejemplo" },
  resumen:    { cls: "box box--resumen", def: "Resumen" },
  resum:      { cls: "box box--resumen", def: "Resumen" },
  dato:       { cls: "box box--dato",    def: "¿Sabías que…?" },
  importante: { cls: "box box--dato",    def: "Importante" },
  sabias:     { cls: "box box--dato",    def: "¿Sabías que…?" },
  nota:       { cls: "box",              def: "Nota" },
  math:       { cls: "math",             def: null },
  formula:    { cls: "math formula",     def: null },
  ecuacion:   { cls: "math formula",     def: null },
};

function escaparHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* Convierte un bloque ::: en el HTML correspondiente.
   match: resultado de /^:::\s*([^\s:]+)(?:\s+(.*))?\s*$/ */
function renderarContenedor(match, inner) {
  const tipo = match[1].toLowerCase();
  const titulo = match[2] ? match[2].trim() : null;
  const conf = CONTENEDORES[tipo];

  // Tipo desconocido → se convierte en una cita normal
  if (!conf) {
    return inner.trim().split("\n").map(function (l) { return "> " + l; }).join("\n");
  }

  let html = '<div class="' + conf.cls + '">\n';
  const t = titulo || conf.def;
  if (t) html += '<p class="box__title">' + escaparHTML(t) + "</p>\n";

  // Los bloques de tipo math/formula se renderizan en línea (sin <p>)
  html += (conf.def === null ? marked.parseInline(inner.trim()) : marked.parse(inner.trim()));
  html += "\n</div>";
  return html;
}

/* Convierte los bloques de código Python en editores ejecutables.
   marked genera <pre><code class="language-python">...</code></pre>;
   aquí se transforman en un editor con botón "Ejecutar" (ver script.js). */
function activarRunners(html) {
  return html.replace(
    /<pre><code class="language-python">([\s\S]*?)<\/code><\/pre>/g,
    function (m, codigoEscapado) {
      var lineas = codigoEscapado.replace(/\n$/, "").split("\n").length;
      var filas = Math.max(2, lineas);
      return [
        '<div class="runner">',
        '  <div class="runner__bar">',
        '    <span class="runner__label">🐍 Python</span>',
        '    <div class="runner__acciones">',
        '      <button type="button" class="runner__btn runner__btn--reset" title="Volver al código original">↺ Restaurar</button>',
        '      <button type="button" class="runner__btn runner__btn--run" title="Ejecutar (Ctrl + Enter)">▶ Ejecutar</button>',
        "    </div>",
        "  </div>",
        '  <div class="runner__editor">',
        '    <pre class="runner__highlight" aria-hidden="true"><code>' + codigoEscapado + "</code></pre>",
        '    <textarea class="runner__code" spellcheck="false" rows="' + filas + '" aria-label="Código Python editable">' + codigoEscapado + "</textarea>",
        "  </div>",
        '  <pre class="runner__output" hidden></pre>',
        "</div>",
      ].join("\n");
    }
  );
}

/* Renderiza un fragmento de Markdown que puede contener bloques :::.
   Se divide en trozos y cada trozo se pasa por marked por separado,
   para que los <div> de los contenedores no se "rompan". */
function renderarBloque(md) {
  const lineas = md.split("\n");
  const fragmentos = [];
  let buffer = [];
  const volcar = function () {
    if (buffer.join("").trim()) {
      fragmentos.push(marked.parse(buffer.join("\n")));
    }
    buffer = [];
  };

  let i = 0;
  let enCodigo = false; // ignora los ":::" que aparezcan dentro de un bloque de código
  while (i < lineas.length) {
    const linea = lineas[i];
    if (/^\s*(```|~~~)/.test(linea)) {
      enCodigo = !enCodigo;
      buffer.push(linea);
      i++;
      continue;
    }
    const abierto = enCodigo ? null : linea.match(/^:::\s*([^\s:]+)(?:\s+(.*))?\s*$/);
    if (abierto) {
      volcar();
      const inner = [];
      i++;
      while (i < lineas.length && lineas[i].trim() !== ":::") {
        inner.push(lineas[i]);
        i++;
      }
      i++; // salta el cierre ":::"
      fragmentos.push(renderarContenedor(abierto, inner.join("\n")));
    } else {
      buffer.push(linea);
      i++;
    }
  }
  volcar();
  return fragmentos.join("\n");
}

/* Genera la portada de un capítulo */
function renderarPortada(cap, serie, num, etapa, curso) {
  const mat = MATERIAS[cap.materia] || { label: cap.materia, cls: "tag--mat" };
  return [
    '<header class="cover" id="portada">',
    '  <p class="cover__kicker">' + escaparHTML(serie) + " · Capítulo " + num + "</p>",
    '  <h1 class="cover__title">' + escaparHTML(cap.titulo) + "</h1>",
    '  <p class="cover__subtitle"><span class="tag ' + mat.cls + '">' + mat.label + "</span></p>",
    '  <div class="cover__meta"><span>' + escaparHTML(curso || "") + "</span><span>" + escaparHTML(etapa || "") + "</span></div>",
    "</header>",
  ].join("\n");
}

/* Convierte el Markdown de un capítulo en las secciones .slide */
function renderarCapitulo(md, cap, serie, num) {
  const lineas = md.split("\n");
  const secciones = [];
  let actual = null;
  let intro = [];

  let enCodigo = false; // dentro de un bloque ``` ... ``` o ~~~ ... ~~~

  lineas.forEach(function (linea) {
    // Las vallas de código (``` o ~~~) se tratan siempre como contenido,
    // para que los comentarios "#" de Python no se confundan con títulos.
    if (/^\s*(```|~~~)/.test(linea)) {
      if (actual) actual.cuerpo.push(linea); else intro.push(linea);
      enCodigo = !enCodigo;
      return;
    }
    const h2 = enCodigo ? null : linea.match(/^##\s+(.*)$/);
    const h1 = enCodigo ? null : linea.match(/^#\s+(.*)$/);
    if (h2) {
      actual = { titulo: h2[1].trim(), cuerpo: [] };
      secciones.push(actual);
    } else if (h1) {
      // El título del capítulo ya viene de lista.json: se ignora
    } else if (actual) {
      actual.cuerpo.push(linea);
    } else {
      intro.push(linea);
    }
  });

  // El texto anterior al primer "##" se antepone a la primera sección
  if (intro.join("").trim() && secciones.length) {
    secciones[0].cuerpo = intro.concat(secciones[0].cuerpo);
  }

  let html = "";

  secciones.forEach(function (sec) {
    html += '<section class="slide" data-materia="' + cap.materia + '">\n';
    html += "  <h2>" + marked.parseInline(sec.titulo) + "</h2>\n";
    html += activarRunners(renderarBloque(sec.cuerpo.join("\n")));
    html += "\n</section>\n";
  });

  return html;
}

/* Genera la página índice general */
function renderarIndex(lista) {
  const tarjetas = lista.capitulos.map(function (cap) {
    const mat = MATERIAS[cap.materia] || { label: cap.materia, cls: "tag--mat" };
    const href = cap.archivo.replace(/\.md$/, ".html");
    return [
      '<a class="chapter-card" href="' + href + '">',
      '  <span class="tag ' + mat.cls + '">' + mat.label + "</span>",
      "  <h2>" + escaparHTML(cap.titulo) + "</h2>",
      "  <p>" + escaparHTML(cap.descripcion || "") + "</p>",
      "</a>",
    ].join("\n");
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escaparHTML(lista.serie)} · Índice</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="pagina-indice">
  <header class="topbar">
    <div class="topbar__title">
      <span class="topbar__brand">${escaparHTML(lista.serie)}</span>
    </div>
    <div class="topbar__actions">
      <button class="btn btn--outline" id="btn-print" title="Imprimir o guardar como PDF">🖨️ <span class="btn__label">Imprimir / PDF</span></button>
    </div>
  </header>

  <main class="indice">
    <header class="cover indice__portada">
      <p class="cover__kicker">${escaparHTML(lista.etapa || "Formación Básica")}</p>
      <h1 class="cover__title">${escaparHTML(lista.serie)}</h1>
      <p class="cover__subtitle">${escaparHTML(lista.subtitulo || "")}</p>
      <div class="cover__meta"><span>${escaparHTML(lista.curso || "")}</span><span>${lista.capitulos.length} capítulos</span></div>
    </header>

    <nav class="chapter-grid" aria-label="Capítulos">
${tarjetas}
    </nav>
  </main>

  <script>
    document.getElementById("btn-print").addEventListener("click", function () { window.print(); });
  </script>
</body>
</html>`;
}

/* ============================ MAIN ============================ */

function main() {
  const lista = JSON.parse(fs.readFileSync(RUTA_LISTA, "utf8"));
  const plantilla = fs.readFileSync(RUTA_PLANTILLA, "utf8");

  lista.capitulos.forEach(function (cap, idx) {
    const md = fs.readFileSync(cap.archivo, "utf8");
    const contenido = renderarCapitulo(md, cap, lista.serie, idx + 1);

    const html = plantilla
      .split("{{SERIE}}").join(lista.serie)
      .split("{{TITULO}}").join(cap.titulo)
      .split("{{PORTADA}}").join(renderarPortada(cap, lista.serie, idx + 1, lista.etapa, lista.curso))
      .split("{{CONTENIDO}}").join(contenido)
      .split("{{VOLVER}}").join("../index.html");

    const salida = cap.archivo.replace(/\.md$/, ".html");
    fs.writeFileSync(salida, html);
    console.log("✓ " + salida);
  });

  fs.writeFileSync("index.html", renderarIndex(lista));
  console.log("✓ index.html");
  console.log("\nListo. Abre index.html para ver el índice de capítulos.");
}

main();
