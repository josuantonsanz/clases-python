/* ============================================================
   CIENCIAS APLICADAS I · Comportamiento
   1) Índice automático con scroll-spy
   2) Menú lateral en móvil
   3) Botón Imprimir/PDF
   4) Modo diapositivas (navegación por botones, teclado y táctil)
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1) ÍNDICE AUTOMÁTICO
     ---------------------------------------------------------- */
  var tocList = document.getElementById("toc");
  var sections = Array.prototype.slice.call(document.querySelectorAll(".slide"));

  // Asigna un id automático a las secciones que no lo tengan
  sections.forEach(function (section, i) {
    if (!section.id) section.id = "seccion-" + (i + 1);
  });

  var MATERIAS = {
    python:      "Python",
    matematicas: "Matemáticas",
    biologia:    "Biología",
    fisica:      "Física",
    quimica:     "Química",
    actividades: "Repaso"
  };

  var materiaActual = null;

  sections.forEach(function (section) {
    var heading = section.querySelector("h2");
    if (!heading) return;

    var materia = section.getAttribute("data-materia") || "";
    var textoTitulo = heading.textContent
      .replace(/^\s*Python\s*/, "")
      .replace(/^\s*Matemáticas\s*/, "")
      .replace(/^\s*Biología\s*/, "")
      .replace(/^\s*Física\s*/, "")
      .replace(/^\s*Química\s*/, "")
      .replace(/^\s*Repaso\s*/, "")
      .trim();

    // Añade separador de materia cuando cambia
    if (materia && materia !== materiaActual) {
      materiaActual = materia;
      var cabecera = document.createElement("li");
      cabecera.className = "toc__materia";
      cabecera.textContent = MATERIAS[materia] || materia;
      tocList.appendChild(cabecera);
    }

    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + section.id;
    a.textContent = textoTitulo;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  /* Scroll-spy: resalta la sección visible */
  var enlacesToc = Array.prototype.slice.call(tocList.querySelectorAll("a"));

  function resaltarIndice() {
    var posicion = window.scrollY + 110;
    var activo = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= posicion) activo = section.id;
    });

    enlacesToc.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + activo);
    });
  }

  window.addEventListener("scroll", resaltarIndice, { passive: true });
  resaltarIndice();

  /* ----------------------------------------------------------
     2) MENÚ LATERAL EN MÓVIL
     ---------------------------------------------------------- */
  var sidebar = document.getElementById("sidebar");
  var btnMenu = document.getElementById("btn-menu");

  btnMenu.addEventListener("click", function () {
    sidebar.classList.toggle("is-open");
  });

  // Cerrar el menú al pulsar un enlace (en móvil)
  enlacesToc.forEach(function (a) {
    a.addEventListener("click", function () {
      sidebar.classList.remove("is-open");
    });
  });

  /* ----------------------------------------------------------
     3) BOTÓN IMPRIMIR / PDF
     ---------------------------------------------------------- */
  document.getElementById("btn-print").addEventListener("click", function () {
    window.print();
  });

  /* ----------------------------------------------------------
     4) MODO DIAPOSITIVAS
     ---------------------------------------------------------- */
  var slideshow   = document.getElementById("slideshow");
  var stage       = document.getElementById("slides-stage");
  var barra       = document.getElementById("slides-bar");
  var contador    = document.getElementById("slides-counter");
  var btnSlides   = document.getElementById("btn-slides");
  var btnCerrar   = document.getElementById("slides-close");
  var btnPrev     = document.getElementById("slides-prev");
  var btnNext     = document.getElementById("slides-next");
  var puntos      = document.getElementById("slides-dots");

  var vistas = [];      // elementos .slide-view
  var indice = 0;

  /* --- Fragmentos: los bloques de cada diapositiva se muestran
         de uno en uno al avanzar (flecha, clic o deslizar). --- */

  // Cada bloque hijo de la diapositiva es un fragmento, salvo el título.
  function marcarFragmentos(inner) {
    if (!inner) return;
    Array.prototype.slice.call(inner.children).forEach(function (bloque) {
      if (bloque.tagName === "H2") return; // el título se ve desde el principio
      bloque.classList.add("fragment");
    });
  }

  function fragmentosDe(vista) {
    return vista ? Array.prototype.slice.call(vista.querySelectorAll(".fragment")) : [];
  }

  // Si el bloque recién mostrado queda por debajo del borde, baja la vista.
  function seguirFragmento(vista, bloque) {
    var inner = vista.querySelector(".slide-view__inner");
    if (!inner) return;
    var caja = inner.getBoundingClientRect();
    var b = bloque.getBoundingClientRect();
    if (b.bottom > caja.bottom - 10) {
      inner.scrollTop += (b.bottom - caja.bottom) + 18;
    }
  }

  // Puntos que indican cuántos bloques quedan por aparecer en la diapositiva.
  function pintarPuntos(vista) {
    if (!puntos) return;
    var fragmentos = fragmentosDe(vista);
    if (fragmentos.length < 2) {
      puntos.hidden = true;
      puntos.innerHTML = "";
      return;
    }
    puntos.hidden = false;
    puntos.innerHTML = fragmentos.map(function (f) {
      return '<span class="dot' + (f.classList.contains("is-visible") ? " is-on" : "") + '"></span>';
    }).join("");
  }

  function crearVistas() {
    stage.innerHTML = "";
    vistas = [];

    // 1) Diapositiva de portada: clona la portada real de la página
    var portada = document.querySelector(".cover");
    if (portada) {
      var vistaPortada = document.createElement("div");
      vistaPortada.className = "slide-view slide-view--cover";
      vistaPortada.innerHTML = '<div class="slide-view__inner">' + portada.innerHTML + "</div>";
      stage.appendChild(vistaPortada);
      vistas.push(vistaPortada);
    }

    // 2) Una diapositiva por cada sección de contenido
    sections.forEach(function (section) {
      var vista = document.createElement("div");
      vista.className = "slide-view";
      vista.innerHTML = '<div class="slide-view__inner">' + section.innerHTML + "</div>";
      marcarFragmentos(vista.querySelector(".slide-view__inner"));
      stage.appendChild(vista);
      vistas.push(vista);
    });

    resaltarRunners(stage);
    indice = 0;
    actualizar();
  }

  function actualizar() {
    vistas.forEach(function (vista, i) {
      vista.classList.toggle("is-active", i === indice);
    });
    contador.textContent = (indice + 1) + " / " + vistas.length;
    barra.style.width = ((indice + 1) / vistas.length * 100) + "%";
    pintarPuntos(vistas[indice]);
  }

  function irA(n) {
    if (n < 0) n = 0;
    if (n > vistas.length - 1) n = vistas.length - 1;
    if (n !== indice) {
      // Cada diapositiva empieza a leerse desde arriba
      var inner = vistas[n] && vistas[n].querySelector(".slide-view__inner");
      if (inner) inner.scrollTop = 0;
    }
    indice = n;
    actualizar();
  }

  /* Avanzar: primero aparece el siguiente bloque pendiente; cuando ya
     no queda ninguno, se pasa a la diapositiva siguiente. */
  function siguiente() {
    var vista = vistas[indice];
    var pendiente = fragmentosDe(vista).filter(function (f) {
      return !f.classList.contains("is-visible");
    })[0];
    if (pendiente) {
      pendiente.classList.add("is-visible");
      seguirFragmento(vista, pendiente);
      actualizar();
      return;
    }
    irA(indice + 1);
  }

  /* Retroceder: primero se esconde el último bloque mostrado; cuando no
     hay ninguno visible, se vuelve a la diapositiva anterior. */
  function anterior() {
    var vista = vistas[indice];
    var visibles = fragmentosDe(vista).filter(function (f) {
      return f.classList.contains("is-visible");
    });
    if (visibles.length) {
      visibles[visibles.length - 1].classList.remove("is-visible");
      actualizar();
      return;
    }
    irA(indice - 1);
  }

  function abrir() {
    crearVistas();
    slideshow.hidden = false;
    document.body.style.overflow = "hidden"; // bloquea el scroll de fondo
  }

  function cerrar() {
    slideshow.hidden = true;
    document.body.style.overflow = "";
  }

  /* Eventos de botones. Se quita el foco al pulsarlos para que después la
     barra espaciadora y las flechas sigan moviendo las diapositivas. */
  function alPulsar(boton, accion) {
    boton.addEventListener("click", function () {
      accion();
      boton.blur();
    });
  }
  alPulsar(btnSlides, abrir);
  alPulsar(btnCerrar, cerrar);
  alPulsar(btnNext, siguiente);
  alPulsar(btnPrev, anterior);

  /* Teclado: ← → espacio y Esc */
  document.addEventListener("keydown", function (e) {
    if (slideshow.hidden) return;

    // Si se está escribiendo en un editor de código (o un campo), el teclado
    // no debe cambiar de diapositiva (salvo Esc, que sigue cerrando).
    var enfocado = e.target;
    var esCampo = enfocado && (enfocado.tagName === "TEXTAREA" || enfocado.tagName === "INPUT" || enfocado.tagName === "BUTTON");
    if (esCampo && e.key !== "Escape") return;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        siguiente();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        anterior();
        break;
      case "Home":
        e.preventDefault();
        irA(0);
        break;
      case "End":
        e.preventDefault();
        irA(vistas.length - 1);
        break;
      case "Escape":
        cerrar();
        break;
    }
  });

  /* Navegación táctil (deslizar en horizontal; el vertical hace scroll) */
  var inicioX = 0, inicioY = 0;
  stage.addEventListener("touchstart", function (e) {
    inicioX = e.changedTouches[0].clientX;
    inicioY = e.changedTouches[0].clientY;
  }, { passive: true });

  stage.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - inicioX;
    var dy = e.changedTouches[0].clientY - inicioY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? siguiente() : anterior();
    }
  }, { passive: true });

  /* Un clic (o toque) en cualquier punto de la diapositiva también avanza.
     Se ignora si el clic cae sobre algo interactivo —botones, enlaces,
     editores de código— o si se está seleccionando texto. */
  stage.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a, button, textarea, input, select, label, .runner")) return;
    var seleccion = window.getSelection();
    if (seleccion && String(seleccion).trim()) return;
    siguiente();
  });

  /* ----------------------------------------------------------
     5) BLOQUES DE CÓDIGO EJECUTABLES (Skulpt)
     Carga el intérprete de Python solo la primera vez que se
     pulsa "Ejecutar", para no ralentizar la lectura normal.
     ---------------------------------------------------------- */
  var skulptCargando = null;

  function cargarSkulpt() {
    if (window.Sk) return Promise.resolve();
    if (skulptCargando) return skulptCargando;

    function cargarScript(src) {
      return new Promise(function (resolver, rechazar) {
        var s = document.createElement("script");
        s.src = src;
        s.onload = function () { resolver(); };
        s.onerror = function () { rechazar(new Error("No se pudo cargar " + src)); };
        document.head.appendChild(s);
      });
    }

    skulptCargando = cargarScript("../lib/skulpt.min.js")
      .then(function () { return cargarScript("../lib/skulpt-stdlib.js"); });
    return skulptCargando;
  }

  /* ----------------------------------------------------------
     5b) RESALTADO DE SINTAXIS DE PYTHON
     Un resaltador ligero (sin dependencias) que pinta el código
     en una capa <pre> situada detrás del <textarea> transparente.
     ---------------------------------------------------------- */
  var PALABRAS_CLAVE = [
    "False", "None", "True", "and", "as", "assert", "async", "await", "break",
    "class", "continue", "def", "del", "elif", "else", "except", "finally",
    "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
    "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"
  ];
  var FUNCIONES = [
    "abs", "all", "any", "bool", "chr", "dict", "divmod", "enumerate", "filter",
    "float", "format", "frozenset", "getattr", "hasattr", "hash", "help", "hex",
    "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "map",
    "max", "min", "next", "object", "oct", "open", "ord", "pow", "print", "range",
    "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "str", "sum",
    "tuple", "type", "zip"
  ];

  function escaparHTML(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function resaltarPython(codigo) {
    var html = "";
    var i = 0;
    var n = codigo.length;

    while (i < n) {
      var c = codigo.charAt(i);

      // Comentario hasta el final de la línea
      if (c === "#") {
        var finComentario = codigo.indexOf("\n", i);
        if (finComentario === -1) finComentario = n;
        html += '<span class="tok-comment">' + escaparHTML(codigo.slice(i, finComentario)) + "</span>";
        i = finComentario;
        continue;
      }

      // Cadenas (simples, dobles o triples)
      if (c === '"' || c === "'") {
        var triple = codigo.substr(i, 3) === c + c + c;
        var cierre = triple ? c + c + c : c;
        var k = i + cierre.length;
        while (k < n) {
          if (codigo.charAt(k) === "\\") { k += 2; continue; }
          if (codigo.substr(k, cierre.length) === cierre) { k += cierre.length; break; }
          k++;
        }
        html += '<span class="tok-string">' + escaparHTML(codigo.slice(i, k)) + "</span>";
        i = k;
        continue;
      }

      // Números
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(codigo.charAt(i + 1)))) {
        var mNum = /^[0-9][0-9_]*(\.[0-9_]+)?([eE][+-]?[0-9]+)?/.exec(codigo.slice(i));
        if (mNum) {
          html += '<span class="tok-number">' + mNum[0] + "</span>";
          i += mNum[0].length;
          continue;
        }
      }

      // Identificadores, palabras clave y funciones
      if (/[A-Za-z_]/.test(c)) {
        var mId = /^[A-Za-z_][A-Za-z0-9_]*/.exec(codigo.slice(i));
        var palabra = mId[0];
        var clase = "";
        if (PALABRAS_CLAVE.indexOf(palabra) !== -1) clase = "tok-keyword";
        else if (FUNCIONES.indexOf(palabra) !== -1) clase = "tok-builtin";
        else if (/^\s*\(/.test(codigo.slice(i + palabra.length))) clase = "tok-function";
        html += clase ? '<span class="' + clase + '">' + palabra + "</span>" : palabra;
        i += palabra.length;
        continue;
      }

      // Operadores
      if ("+-*/%=<>!&|^~".indexOf(c) !== -1) {
        html += '<span class="tok-operator">' + escaparHTML(c) + "</span>";
        i++;
        continue;
      }

      // Resto (espacios, saltos, paréntesis, comas…)
      html += escaparHTML(c);
      i++;
    }

    return html;
  }

  function aplicarResaltado(editor) {
    if (!editor) return;
    var contenedor = editor.closest(".runner__editor");
    var destino = contenedor && contenedor.querySelector(".runner__highlight code");
    if (!destino) return;
    destino.innerHTML = resaltarPython(editor.value) + "\n";
    contenedor.classList.add("is-highlighted");
  }

  function resaltarRunners(raiz) {
    Array.prototype.slice.call((raiz || document).querySelectorAll(".runner__editor")).forEach(function (contenedor) {
      if (contenedor.classList.contains("is-highlighted")) return;
      aplicarResaltado(contenedor.querySelector(".runner__code"));
    });
  }

  function sincronizarScroll(editor) {
    var contenedor = editor.closest(".runner__editor");
    var capa = contenedor && contenedor.querySelector(".runner__highlight");
    if (capa) {
      capa.scrollTop = editor.scrollTop;
      capa.scrollLeft = editor.scrollLeft;
    }
  }

  // Al escribir, vuelve a resaltar y mantiene la capa alineada
  document.addEventListener("input", function (e) {
    var editor = e.target;
    if (!editor.classList || !editor.classList.contains("runner__code")) return;
    aplicarResaltado(editor);
    sincronizarScroll(editor);
  });

  // Sincroniza el desplazamiento (los eventos scroll no burbujean: captura)
  document.addEventListener("scroll", function (e) {
    var editor = e.target;
    if (editor && editor.classList && editor.classList.contains("runner__code")) {
      sincronizarScroll(editor);
    }
  }, true);

  resaltarRunners(document);

  function ejecutarRunner(runner) {
    var editor = runner.querySelector(".runner__code");
    var salida = runner.querySelector(".runner__output");
    var boton  = runner.querySelector(".runner__btn--run");
    var buffer = "";

    salida.hidden = false;
    salida.className = "runner__output";
    salida.textContent = "Cargando intérprete de Python…";
    boton.disabled = true;

    cargarSkulpt()
      .then(function () {
        Sk.configure({
          output: function (texto) {
            buffer += texto;
            salida.textContent = buffer;
          },
          read: function (x) {
            if (typeof Sk.builtinFiles === "undefined" ||
                typeof Sk.builtinFiles["files"][x] === "undefined") {
              throw "File not found: '" + x + "'";
            }
            return Sk.builtinFiles["files"][x];
          },
          inputfun: function (pregunta) {
            return new Promise(function (resolver) {
              resolver(window.prompt(pregunta));
            });
          },
          inputfunTakesPrompt: true,
          __future__: Sk.python3
        });

        return Sk.misceval.asyncToPromise(function () {
          return Sk.importMainWithBody("<stdin>", false, editor.value, true);
        });
      })
      .then(function () {
        if (!buffer) salida.textContent = "(El programa ha terminado sin mostrar nada)";
        boton.disabled = false;
      })
      .catch(function (error) {
        salida.className = "runner__output runner__output--error";
        salida.textContent = "⚠ " + (error && error.toString ? error.toString() : String(error));
        boton.disabled = false;
      });
  }

  /* Delegación de eventos: así los runners también funcionan en el
     modo diapositivas, que clona las secciones del capítulo. */

  document.addEventListener("click", function (e) {
    var boton = e.target.closest ? e.target.closest(".runner__btn") : null;
    if (!boton) return;
    var runner = boton.closest(".runner");
    if (!runner) return;
    boton.blur(); // así Espacio/Flechas siguen controlando las diapositivas

    if (boton.classList.contains("runner__btn--run")) {
      ejecutarRunner(runner);
    } else if (boton.classList.contains("runner__btn--reset")) {
      var editor = runner.querySelector(".runner__code");
      var salida = runner.querySelector(".runner__output");
      editor.value = editor.defaultValue;
      aplicarResaltado(editor);
      sincronizarScroll(editor);
      salida.hidden = true;
      salida.className = "runner__output";
      salida.textContent = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    var editor = e.target;
    if (!editor.classList || !editor.classList.contains("runner__code")) return;

    if (e.key === "Tab") {
      e.preventDefault();
      var inicio = editor.selectionStart;
      var fin = editor.selectionEnd;
      editor.value = editor.value.slice(0, inicio) + "    " + editor.value.slice(fin);
      editor.selectionStart = editor.selectionEnd = inicio + 4;
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      var runner = editor.closest(".runner");
      if (runner) ejecutarRunner(runner);
    }
  });
})();
