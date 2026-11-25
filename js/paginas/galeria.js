/* =====================================================================
   PÁGINA: galería de fotografías (galeria.html)
   ---------------------------------------------------------------------
   Crea una pestaña por edición y, para la edición elegida, un apartado
   por momento («Exposición», «Entrega de premios»...) con su rejilla de
   fotos, a partir de js/datos/galeria.js. Cada foto se abre ampliada en
   el visor (js/componentes/lightbox.js), donde se puede pasar a la
   anterior o a la siguiente del mismo apartado.
   Mientras la lista esté vacía, se muestra el aviso «Próximamente».
   La estructura de cada pieza está en los <template> de galeria.html.
   Se puede enlazar a una edición o apartado concreto:
     galeria.html#2025   galeria.html#2025-exposicion
   ===================================================================== */

(() => {
  const ORDINALES = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  const vacia = GALERIA.length === 0;
  $("#galeria-vacia").hidden = !vacia;
  $("#galeria").hidden = vacia;
  if (vacia) return;

  const listaPestanas = $("#pestanas");
  const panel = $("#panel");
  const ediciones = [...new Set(GALERIA.map((f) => f.edicion))].sort((a, b) => b - a);
  let edicionActual;

  /* ---------- Piezas ---------- */
  function crearFoto(foto) {
    const figura = clonarPlantilla("tpl-foto").firstElementChild;
    const boton = $("button", figura);
    const imagen = $("img", boton);

    imagen.src = foto.mini || foto.img;
    if (foto.w) imagen.width = foto.w;
    if (foto.h) imagen.height = foto.h;
    imagen.alt = foto.alt || foto.pie || "";
    boton.dataset.img = foto.img;
    boton.dataset.cap = foto.pie || "";

    const pie = $("figcaption", figura);
    if (foto.pie) pie.textContent = foto.pie;
    else pie.remove();

    return figura;
  }

  function crearMomento(id, nombre, fotos) {
    const bloque = clonarPlantilla("tpl-momento").firstElementChild;
    bloque.id = id;
    $("h2", bloque).textContent = nombre;
    $("h2", bloque).id = `${id}-titulo`;
    bloque.setAttribute("aria-labelledby", `${id}-titulo`);
    $(".mosaico", bloque).append(...fotos.map(crearFoto));
    return bloque;
  }

  function crearEnlace(id, texto) {
    const enlace = clonarPlantilla("tpl-enlace-momento").firstElementChild;
    enlace.href = `#${id}`;
    enlace.textContent = texto;
    return enlace;
  }

  /* ---------- Una edición ---------- */
  function mostrarEdicion(edicion) {
    const fotos = GALERIA.filter((f) => f.edicion === edicion);
    const ordinal = ORDINALES[edicion - CONFIG.primeraEdicion] || "";
    const total = fotos.length === 1 ? "1 fotografía" : `${fotos.length} fotografías`;
    $("#ordinal").textContent = `${ordinal ? ordinal + " edición, " : ""}${edicion} · ${total}`;

    const momentos = [...new Set(fotos.map((f) => f.momento || "Otros momentos"))];
    const enlaces = [];
    const bloques = [];
    for (const momento of momentos) {
      const id = `${edicion}-${slug(momento)}`;
      const delMomento = fotos.filter((f) => (f.momento || "Otros momentos") === momento);
      enlaces.push(crearEnlace(id, momento));
      bloques.push(crearMomento(id, momento, delMomento));
    }

    const indice = $("#indice-momentos");
    indice.setAttribute("aria-label", `Apartados de ${edicion}`);
    indice.replaceChildren(...(momentos.length > 1 ? enlaces : []));
    $("#momentos").replaceChildren(...bloques);
  }

  /* ---------- Pestañas (patrón ARIA «tabs», con teclado) ---------- */
  function seleccionar(edicion, conFoco = false) {
    edicionActual = edicion;
    $$('[role="tab"]', listaPestanas).forEach((pestana) => {
      const activa = Number(pestana.dataset.edicion) === edicion;
      pestana.setAttribute("aria-selected", String(activa));
      pestana.tabIndex = activa ? 0 : -1;
      if (activa && conFoco) pestana.focus();
    });
    panel.setAttribute("aria-labelledby", `pestana-${edicion}`);
    mostrarEdicion(edicion);
  }

  function crearPestanas() {
    listaPestanas.replaceChildren(
      ...ediciones.map((edicion) => {
        const pestana = clonarPlantilla("tpl-pestana").firstElementChild;
        pestana.id = `pestana-${edicion}`;
        pestana.dataset.edicion = edicion;
        pestana.textContent = edicion;
        return pestana;
      }),
    );

    listaPestanas.addEventListener("click", (evento) => {
      const pestana = evento.target.closest('[role="tab"]');
      if (pestana) seleccionar(Number(pestana.dataset.edicion));
    });

    listaPestanas.addEventListener("keydown", (evento) => {
      const actual = ediciones.indexOf(Number(evento.target.dataset.edicion));
      const ultima = ediciones.length - 1;
      const nueva = {
        ArrowRight: actual === ultima ? 0 : actual + 1,
        ArrowLeft: actual === 0 ? ultima : actual - 1,
        Home: 0,
        End: ultima,
      }[evento.key];
      if (nueva === undefined || actual < 0) return;
      evento.preventDefault();
      seleccionar(ediciones[nueva], true);
    });
  }

  /* ---------- Enlaces a una edición o apartado (#2025, #2025-exposicion) ---------- */
  function irAlEnlace() {
    const destino = decodeURIComponent(location.hash.slice(1));
    const edicion = parseInt(destino, 10);
    if (ediciones.includes(edicion) && edicion !== edicionActual) {
      seleccionar(edicion);
      document.getElementById(destino)?.scrollIntoView();
    }
  }

  /* ---------- Arranque ---------- */
  crearPestanas();
  irAlEnlace();
  if (edicionActual === undefined) seleccionar(ediciones[0]);
  window.addEventListener("hashchange", irAlEnlace);
})();
