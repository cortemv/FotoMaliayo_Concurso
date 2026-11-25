/* =====================================================================
   FOTOGRAFÍAS DE LA GALERÍA
   ---------------------------------------------------------------------
   Fotos de exposiciones, entregas de premios y otros momentos de cada
   edición (se muestran en galeria.html). Una línea por fotografía.
   Para añadir una, copia una línea existente y cambia los datos
   (cada línea termina en coma, salvo la última):

     {"edicion": 2027, "momento": "Exposición", "img": "img/fotos/galeria/2027-exposicion-1.jpg", "mini": "img/fotos/galeria/2027-exposicion-1-mini.jpg", "w": 720, "h": 480, "pie": "Texto del pie de foto", "alt": "Descripción para personas ciegas"},

     edicion: año. Cada año tiene su pestaña, que aparece sola.
     momento: apartado dentro del año, por ejemplo "Exposición" o
              "Entrega de premios". Puedes inventar otros ("Salida
              fotográfica"...): se crean solos, en el orden en que
              aparecen por primera vez en la lista.
     img:     la foto, en la carpeta img/fotos/galeria/. Recomendado: JPG
              de 1600 px en el lado mayor (unos 200-500 KB).
     mini:    opcional. Miniatura para la rejilla (720 px). Si no la
              pones, se usa img.
     w, h:    opcionales. Ancho y alto de la miniatura en píxeles.
     pie:     texto que aparece bajo la foto y en el visor ampliado.
     alt:     opcional. Si no lo pones, se usa el pie.
   Dentro de cada año, el orden de las líneas es el orden en la web.
   Si la lista se queda vacía, galeria.html muestra «Próximamente».
   ===================================================================== */

const GALERIA = [
  {"edicion": 2026, "momento": "Exposición", "img": "img/fotos/galeria/2026-exposicion-inauguracion.jpg", "mini": "img/fotos/galeria/2026-exposicion-inauguracion-mini.jpg", "w": 720, "h": 480, "pie": "Inauguración de la exposición de FotoMaliayo 2026 en las calles de Villaviciosa.", "alt": "Un hombre con micrófono habla junto a una de las fotografías expuestas en gran formato, ante un grupo de asistentes."},
  {"edicion": 2026, "momento": "Entrega de premios", "img": "img/fotos/galeria/2026-gala-cartel.jpg", "mini": "img/fotos/galeria/2026-gala-cartel-mini.jpg", "w": 720, "h": 480, "pie": "Gala de entrega de premios de 2026 en el Teatro Riera, con el cartel de la IV edición en pantalla.", "alt": "Un presentador en el atril del escenario junto a la proyección del cartel de FotoMaliayo 2026."},
  {"edicion": 2026, "momento": "Entrega de premios", "img": "img/fotos/galeria/2026-gala-homenaxe.jpg", "mini": "img/fotos/galeria/2026-gala-homenaxe-mini.jpg", "w": 720, "h": 480, "pie": "Homenaxe a Ambas y Ramses (ATOAM) durante la gala de 2026.", "alt": "Dos personas hablan con micrófono en el escenario ante una proyección con el texto «Homenaxe a Ambas y Ramses»."},
  {"edicion": 2025, "momento": "Exposición", "img": "img/fotos/galeria/2025-exposicion-noche.jpg", "mini": "img/fotos/galeria/2025-exposicion-noche-mini.jpg", "w": 720, "h": 540, "pie": "Inauguración nocturna de la exposición de FotoMaliayo 2025 en el casco antiguo de Villaviciosa.", "alt": "Numeroso público reunido de noche en una plaza iluminada alrededor de las fotografías expuestas en estructuras metálicas."},
  {"edicion": 2025, "momento": "Exposición", "img": "img/fotos/galeria/2025-exposicion-autor.jpg", "mini": "img/fotos/galeria/2025-exposicion-autor-mini.jpg", "w": 720, "h": 480, "pie": "Un autor presenta su fotografía en la exposición de 2025.", "alt": "Un hombre con micrófono señala una fotografía de montaña expuesta en gran formato."},
  {"edicion": 2025, "momento": "Entrega de premios", "img": "img/fotos/galeria/2025-gala-ponente.jpg", "mini": "img/fotos/galeria/2025-gala-ponente-mini.jpg", "w": 720, "h": 480, "pie": "Intervención en la gala de entrega de premios de 2025 en el Teatro Riera.", "alt": "Un ponente habla en el atril del escenario junto a una proyección con una fotografía de grupo."},
  {"edicion": 2025, "momento": "Entrega de premios", "img": "img/fotos/galeria/2025-gala-proyeccion.jpg", "mini": "img/fotos/galeria/2025-gala-proyeccion-mini.jpg", "w": 720, "h": 480, "pie": "Proyección de las fotografías seleccionadas durante la gala de 2025.", "alt": "Escenario a oscuras con una gran pantalla que muestra una fotografía seleccionada."},
  {"edicion": 2024, "momento": "Exposición", "img": "img/fotos/galeria/2024-exposicion-autor.jpg", "mini": "img/fotos/galeria/2024-exposicion-autor-mini.jpg", "w": 720, "h": 480, "pie": "Presentación de las obras en la exposición de FotoMaliayo 2024.", "alt": "Un hombre con micrófono habla delante de un panel de la exposición de 2024."},
  {"edicion": 2024, "momento": "Entrega de premios", "img": "img/fotos/galeria/2024-gala-placa.jpg", "mini": "img/fotos/galeria/2024-gala-placa-mini.jpg", "w": 720, "h": 480, "pie": "Entrega de una placa de reconocimiento en la gala de 2024.", "alt": "Dos hombres en el escenario del teatro; uno de ellos sostiene una placa."},
  {"edicion": 2023, "momento": "Entrega de premios", "img": "img/fotos/galeria/2023-gala-premiados.jpg", "mini": "img/fotos/galeria/2023-gala-premiados-mini.jpg", "w": 720, "h": 480, "pie": "Foto de familia de los premiados de 2023 en el Teatro Riera.", "alt": "Grupo de premiados posando en fila sobre el escenario del teatro con sus diplomas."},
  {"edicion": 2023, "momento": "Entrega de premios", "img": "img/fotos/galeria/2023-gala-patio.jpg", "mini": "img/fotos/galeria/2023-gala-patio-mini.jpg", "w": 720, "h": 480, "pie": "Gala de entrega de premios en el Teatro Riera de Villaviciosa.", "alt": "Vista del patio de butacas y el escenario del teatro, con una pantalla que dice «¡Todes participan!»."}
];
