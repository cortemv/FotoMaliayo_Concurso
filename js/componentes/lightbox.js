/* =====================================================================
   VISOR DE FOTOGRAFÍAS AMPLIADAS
   ---------------------------------------------------------------------
   Cualquier <button data-img="ruta.jpg" data-cap="Pie de foto"> de la
   página abre la imagen en el <dialog id="lightbox">. El botón «Cerrar»
   funciona sin JavaScript (form method="dialog"); aquí solo se añade el
   cierre al pulsar fuera de la imagen.
   Si los botones están dentro de un elemento con el atributo data-serie
   (como en la galería), el visor muestra además los botones «anterior»
   y «siguiente» y se puede pasar de foto con las flechas del teclado o
   deslizando el dedo en el móvil.
   Requiere js/lib/utilidades.js.
   ===================================================================== */

(() => {
  const dialogo = document.getElementById("lightbox");
  if (!dialogo) return;

  const figura = $("figure", dialogo);
  const pie = $("figcaption", dialogo);
  const imagen = document.createElement("img");
  figura.prepend(imagen);

  /* ---------- Navegación entre fotos de una misma serie ---------- */
  const navegacion = document.createElement("div");
  navegacion.className = "lightbox-nav";
  navegacion.innerHTML = `
    <button type="button" class="btn ghost" data-paso="-1" aria-label="Fotografía anterior">‹</button>
    <span class="lightbox-contador" aria-live="polite"></span>
    <button type="button" class="btn ghost" data-paso="1" aria-label="Fotografía siguiente">›</button>`;
  figura.append(navegacion);
  const contador = $(".lightbox-contador", navegacion);

  let serie = [];
  let posicion = 0;

  function mostrar(boton) {
    imagen.src = boton.dataset.img;
    imagen.alt = $("img", boton)?.alt || "";
    pie.textContent = boton.dataset.cap || "";
    posicion = serie.indexOf(boton);
    contador.textContent = serie.length > 1 ? `${posicion + 1} / ${serie.length}` : "";
  }

  function abrir(boton) {
    const contenedor = boton.closest("[data-serie]");
    serie = contenedor ? $$("button[data-img]", contenedor) : [boton];
    navegacion.hidden = serie.length < 2;
    mostrar(boton);
    dialogo.showModal();
  }

  function pasar(paso) {
    if (serie.length < 2) return;
    mostrar(serie[(posicion + paso + serie.length) % serie.length]);
  }

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-img]");
    if (boton) abrir(boton);
  });

  navegacion.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-paso]");
    if (boton) pasar(Number(boton.dataset.paso));
  });

  dialogo.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") pasar(-1);
    if (evento.key === "ArrowRight") pasar(1);
  });

  // Deslizar el dedo a izquierda o derecha en el móvil
  let inicioX = null;
  imagen.addEventListener("touchstart", (evento) => (inicioX = evento.touches[0].clientX), { passive: true });
  imagen.addEventListener("touchend", (evento) => {
    if (inicioX === null) return;
    const distancia = evento.changedTouches[0].clientX - inicioX;
    if (Math.abs(distancia) > 50) pasar(distancia < 0 ? 1 : -1);
    inicioX = null;
  });

  // Un clic en el fondo oscuro (fuera de la imagen) cierra el visor.
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
})();
