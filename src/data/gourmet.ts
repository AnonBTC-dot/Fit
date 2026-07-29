import type { Ingredient, Meal } from "./meals";
import type { Nutrients } from "./nutrition";

/**
 * GOURMET FIT — adherencia a largo plazo.
 *
 * Aquí vive lo que evita que la dieta se abandone: postres proteicos de verdad,
 * lasañas y hamburguesas fit, y las comidas libres controladas del finde.
 *
 * Reglas que respeta este bloque:
 * - Proteína prioritaria: huevo, res y cerdo. Pollo y salmón, puntuales.
 * - Yogures proteicos (Skyr/Quark/griego 0%) integrados a diario.
 * - Todo principal lleva verdura o ensalada (micronutrientes).
 */

/* ── Ingredientes nuevos ── */

export const GOURMET_INGREDIENTS: Record<string, Ingredient> = {
  skyr: { id: "skyr", name: "Skyr / Quark / yogur proteico 0%", unit: "g", section: "Lácteos y huevos", packLabel: "tarrina 450 g", packSize: 450, packPrice: 2.4 },
  whey: { id: "whey", name: "Proteína en polvo (whey)", unit: "g", section: "Despensa", packLabel: "bote 1 kg", packSize: 1000, packPrice: 22.0 },
  quesocrema: { id: "quesocrema", name: "Queso crema light", unit: "g", section: "Lácteos y huevos", packLabel: "tarrina 250 g", packSize: 250, packPrice: 1.9 },
  berenjena: { id: "berenjena", name: "Berenjena", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 0.8 },
  chocolatenegro: { id: "chocolatenegro", name: "Chocolate negro 85%", unit: "g", section: "Despensa", packLabel: "tableta 100 g", packSize: 100, packPrice: 1.8 },
  panmasamadre: { id: "panmasamadre", name: "Pan artesanal de masa madre", unit: "g", section: "Despensa", packLabel: "hogaza 500 g", packSize: 500, packPrice: 2.8 },
  tortillamaiz: { id: "tortillamaiz", name: "Tortillas de maíz", unit: "ud", section: "Despensa", packLabel: "paquete 12 uds", packSize: 12, packPrice: 1.6 },
  levadura: { id: "levadura", name: "Levadura química", unit: "g", section: "Despensa", packLabel: "sobre 100 g", packSize: 100, packPrice: 1.0 }
};

export const GOURMET_NUTRITION: Record<string, Nutrients> = {
  skyr: { kcal: 60, protein: 10, carbs: 4, fat: 0.2, weighAs: "tal cual" },
  whey: { kcal: 380, protein: 80, carbs: 8, fat: 5, weighAs: "tal cual" },
  quesocrema: { kcal: 150, protein: 10, carbs: 5, fat: 10, weighAs: "tal cual" },
  berenjena: { kcal: 60, protein: 2.5, carbs: 14, fat: 0.4, weighAs: "crudo" }, // ud ~250 g
  chocolatenegro: { kcal: 590, protein: 10, carbs: 20, fat: 46, weighAs: "tal cual" },
  panmasamadre: { kcal: 260, protein: 10, carbs: 45, fat: 2.5, weighAs: "tal cual" },
  tortillamaiz: { kcal: 65, protein: 1.7, carbs: 13, fat: 0.8, weighAs: "tal cual" }, // por unidad
  levadura: { kcal: 100, protein: 0, carbs: 25, fat: 0, weighAs: "tal cual" }
};

/* ── Platos ── */

export const GOURMET_MEALS: Record<string, Meal> = {
  /* ═══════════ POSTRES Y SNACKS PROTEICOS ═══════════ */
  s_mousseproteico: {
    id: "s_mousseproteico",
    name: "Mousse proteico de chocolate",
    category: "snack",
    kcal: 220,
    protein: 28,
    items: [
      { ing: "skyr", qty: 200 },
      { ing: "whey", qty: 20 },
      { ing: "cacao", qty: 8 },
      { ing: "miel", qty: 8 }
    ],
    prep: "Bate el Skyr con la proteína, el cacao y la miel hasta que quede aireado. 30 min en la nevera y textura de mousse."
  },
  s_skyrbowl: {
    id: "s_skyrbowl",
    name: "Bowl de Skyr con frutos rojos y crema de cacahuete",
    category: "snack",
    kcal: 250,
    protein: 24,
    items: [
      { ing: "skyr", qty: 200 },
      { ing: "frutosrojos", qty: 80 },
      { ing: "cremacacahuete", qty: 12 },
      { ing: "avena", qty: 15 }
    ],
    prep: "Skyr de base, frutos rojos encima, hilo de crema de cacahuete y avena por encima para el crujiente."
  },
  s_mugcakewhey: {
    id: "s_mugcakewhey",
    name: "Mugcake de avena y proteína (2 min al micro)",
    category: "snack",
    kcal: 280,
    protein: 26,
    items: [
      { ing: "avena", qty: 30 },
      { ing: "whey", qty: 25 },
      { ing: "huevo", qty: 1 },
      { ing: "leche", qty: 60 },
      { ing: "cacao", qty: 5 },
      { ing: "levadura", qty: 3 }
    ],
    prep: "Todo en una taza, remueve y 90 segundos al micro. Que quede jugoso por dentro: si se pasa, se seca."
  },
  s_tartaqueso: {
    id: "s_tartaqueso",
    name: "Tarta de queso proteica individual",
    category: "snack",
    kcal: 270,
    protein: 25,
    items: [
      { ing: "skyr", qty: 150 },
      { ing: "quesocrema", qty: 40 },
      { ing: "huevo", qty: 1 },
      { ing: "whey", qty: 15 },
      { ing: "miel", qty: 8 }
    ],
    prep: "Bate todo, a un molde individual y horno 180° 20 min. Mejor de un día para otro, bien fría."
  },
  s_heladoplatano: {
    id: "s_heladoplatano",
    name: "Helado proteico de plátano y cacao",
    category: "snack",
    kcal: 240,
    protein: 22,
    items: [
      { ing: "platano", qty: 1 },
      { ing: "skyr", qty: 120 },
      { ing: "whey", qty: 15 },
      { ing: "cacao", qty: 5 }
    ],
    prep: "Congela el plátano en rodajas. Tritúralo con el Skyr, la proteína y el cacao: sale un helado cremoso de verdad."
  },
  s_yogurchoco: {
    id: "s_yogurchoco",
    name: "Yogur proteico con chocolate negro y nueces",
    category: "snack",
    kcal: 250,
    protein: 20,
    items: [
      { ing: "skyr", qty: 170 },
      { ing: "chocolatenegro", qty: 15 },
      { ing: "nueces", qty: 12 }
    ],
    prep: "Skyr con el chocolate picado y las nueces. Postre de 30 segundos que sabe a capricho."
  },
  s_batidoproteico: {
    id: "s_batidoproteico",
    name: "Batido proteico de fresas y avena",
    category: "snack",
    kcal: 260,
    protein: 30,
    items: [
      { ing: "whey", qty: 30 },
      { ing: "leche", qty: 250 },
      { ing: "frutosrojos", qty: 80 },
      { ing: "avena", qty: 20 }
    ],
    prep: "Todo a la batidora con hielo. El práctico para después de entrenar o cuando no da tiempo a nada."
  },

  /* ═══════════ GOURMET FIT — principales ═══════════ */
  c_lasagna: {
    id: "c_lasagna",
    name: "Lasaña fit de calabacín con boloñesa de res",
    category: "lunch",
    kcal: 620,
    protein: 48,
    items: [
      { ing: "ternerapicada", qty: 180 },
      { ing: "calabacin", qty: 1 },
      { ing: "berenjena", qty: 0.5 },
      { ing: "tomatetrit", qty: 150 },
      { ing: "quesorallado", qty: 35 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "ensalada", qty: 0.5 }
    ],
    prep: "Láminas finas de calabacín y berenjena en vez de pasta. Capas con la boloñesa, queso arriba y horno 25 min a 190°."
  },
  c_berenjenasrellenas: {
    id: "c_berenjenasrellenas",
    name: "Berenjenas rellenas de carne con queso gratinado",
    category: "lunch",
    kcal: 590,
    protein: 44,
    items: [
      { ing: "ternerapicada", qty: 170 },
      { ing: "berenjena", qty: 1 },
      { ing: "tomatetrit", qty: 120 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "quesorallado", qty: 30 },
      { ing: "ensalada", qty: 0.5 }
    ],
    prep: "Vacía las berenjenas, saltea la pulpa con la carne y el tomate. Rellena, queso encima y gratina 15 min."
  },
  c_pastacremosa: {
    id: "c_pastacremosa",
    name: "Pasta cremosa proteica con res y champiñones",
    category: "lunch",
    kcal: 640,
    protein: 50,
    items: [
      { ing: "ternerapicada", qty: 160 },
      { ing: "pasta", qty: 85 },
      { ing: "champinones", qty: 120 },
      { ing: "quesocrema", qty: 45 },
      { ing: "espinacas", qty: 80 },
      { ing: "ajo", qty: 2 }
    ],
    prep: "Salsa cremosa sin nata: queso crema light + un cazo del agua de cocción de la pasta. Espinacas al final."
  },
  c_tacosmaiz: {
    id: "c_tacosmaiz",
    name: "Tacos de res en tortilla de maíz con pico de gallo",
    category: "lunch",
    kcal: 600,
    protein: 45,
    items: [
      { ing: "ternerafalda", qty: 170 },
      { ing: "tortillamaiz", qty: 3 },
      { ing: "tomate", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "limon", qty: 0.5 }
    ],
    prep: "Falda a la plancha bien dorada y picada. Tortillas de maíz calientes, pico de gallo, aguacate y mucho limón."
  },
  c_cerdomielmostaza: {
    id: "c_cerdomielmostaza",
    name: "Solomillo de cerdo a la miel y mostaza con boniato",
    category: "lunch",
    kcal: 600,
    protein: 46,
    items: [
      { ing: "cerdolomo", qty: 185 },
      { ing: "boniato", qty: 190 },
      { ing: "brocoli", qty: 130 },
      { ing: "mostaza", qty: 12 },
      { ing: "miel", qty: 10 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sella el solomillo, glasea con miel y mostaza y termina 10 min al horno. Boniato asado y brócoli al vapor."
  },
  n_burgerdoble: {
    id: "n_burgerdoble",
    name: "Hamburguesa fit de res con salsa de yogur y masa madre",
    category: "dinner",
    kcal: 580,
    protein: 44,
    items: [
      { ing: "ternerapicada", qty: 165 },
      { ing: "panmasamadre", qty: 70 },
      { ing: "quesofresco", qty: 30 },
      { ing: "skyr", qty: 40 },
      { ing: "mostaza", qty: 8 },
      { ing: "tomate", qty: 1 },
      { ing: "ensalada", qty: 0.5 }
    ],
    prep: "Salsa casera: Skyr + mostaza + pepinillo picado. Carne sin apretar, 3 min por lado, y monta en el pan de masa madre."
  },
  n_salmonteriyaki: {
    id: "n_salmonteriyaki",
    name: "Salmón teriyaki con verduras al wok",
    category: "dinner",
    kcal: 540,
    protein: 40,
    items: [
      { ing: "salmon", qty: 170 },
      { ing: "arroz", qty: 50 },
      { ing: "brocoli", qty: 130 },
      { ing: "zanahoria", qty: 1 },
      { ing: "salsasoja", qty: 15 },
      { ing: "miel", qty: 8 }
    ],
    prep: "Glasea el salmón con soja y miel a fuego medio hasta que caramelice. Verduras al wok crujientes, no blandas."
  },
  n_pollocrujiente: {
    id: "n_pollocrujiente",
    name: "Pollo crujiente al horno con salsa de yogur y ensalada",
    category: "dinner",
    kcal: 520,
    protein: 48,
    items: [
      { ing: "pollo", qty: 180 },
      { ing: "huevo", qty: 1 },
      { ing: "avena", qty: 30 },
      { ing: "skyr", qty: 60 },
      { ing: "ensalada", qty: 1 },
      { ing: "especias", qty: 4 }
    ],
    prep: "Empana con huevo y avena molida especiada, horno 200° 20 min sobre rejilla. Salsa de Skyr con ajo y limón."
  },


  /* ═══════════ CAMARONES ═══════════ */
  c_pastacamarones: {
    id: "c_pastacamarones",
    name: "Pasta con camarones al ajillo y espinacas",
    category: "lunch",
    kcal: 580,
    protein: 42,
    items: [
      { ing: "gambas", qty: 180 },
      { ing: "pasta", qty: 85 },
      { ing: "espinacas", qty: 100 },
      { ing: "tomate", qty: 1 },
      { ing: "ajo", qty: 3 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Ajo laminado en el aceite, camarones 2 min (más se ponen chiclosos). Espinacas, la pasta y un cazo de su agua."
  },
  c_arrozcamarones: {
    id: "c_arrozcamarones",
    name: "Arroz con camarones y verduras al wok",
    category: "lunch",
    kcal: 570,
    protein: 40,
    items: [
      { ing: "gambas", qty: 180 },
      { ing: "arroz", qty: 70 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "zanahoria", qty: 1 },
      { ing: "huevo", qty: 1 },
      { ing: "salsasoja", qty: 15 },
      { ing: "ajo", qty: 2 }
    ],
    prep: "Arroz del día anterior al wok bien caliente, huevo revuelto aparte, verduras y camarones al final. Soja y listo."
  },
  c_camaronesboniato: {
    id: "c_camaronesboniato",
    name: "Camarones a la plancha con boniato y ensalada",
    category: "lunch",
    kcal: 540,
    protein: 42,
    items: [
      { ing: "gambas", qty: 190 },
      { ing: "boniato", qty: 190 },
      { ing: "ensalada", qty: 1 },
      { ing: "limon", qty: 0.5 },
      { ing: "ajo", qty: 2 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Camarones a la plancha fuerte con ajo y limón, 90 segundos por lado. Boniato asado y ensalada generosa."
  },
  n_camaronesajillo: {
    id: "n_camaronesajillo",
    name: "Camarones al ajillo con pan y ensalada",
    category: "dinner",
    kcal: 460,
    protein: 40,
    items: [
      { ing: "gambas", qty: 190 },
      { ing: "pan", qty: 45 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "ajo", qty: 4 },
      { ing: "aove", qty: 12 }
    ],
    prep: "Cazuela con aceite, ajo y guindilla. Camarones 2 min, perejil y fuera. El pan es obligatorio para la salsa."
  },
  n_camaronesbrocoli: {
    id: "n_camaronesbrocoli",
    name: "Salteado de camarones con brócoli y arroz",
    category: "dinner",
    kcal: 480,
    protein: 42,
    items: [
      { ing: "gambas", qty: 185 },
      { ing: "brocoli", qty: 150 },
      { ing: "arroz", qty: 50 },
      { ing: "salsasoja", qty: 15 },
      { ing: "ajo", qty: 3 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Brócoli al wok 3 min con un chorro de agua para que se haga al vapor. Camarones, ajo y soja al final."
  },

  /* ═══════════ HUEVO A DIARIO ═══════════ */
  c_arrozhuevores: {
    id: "c_arrozhuevores",
    name: "Arroz frito con res y huevo",
    category: "lunch",
    kcal: 620,
    protein: 46,
    items: [
      { ing: "ternerapicada", qty: 150 },
      { ing: "arroz", qty: 70 },
      { ing: "huevo", qty: 2 },
      { ing: "zanahoria", qty: 1 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "salsasoja", qty: 15 }
    ],
    prep: "Huevo revuelto y retira. Carne a fuego fuerte, verduras, el arroz y devuelve el huevo. Soja al final."
  },
  c_resconhuevo: {
    id: "c_resconhuevo",
    name: "Bistec a caballo: res con huevo frito y patatas",
    category: "lunch",
    kcal: 640,
    protein: 48,
    items: [
      { ing: "ternerafilete", qty: 165 },
      { ing: "huevo", qty: 2 },
      { ing: "patata", qty: 180 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Filete a la plancha y los huevos fritos con la puntilla encima. Patatas al horno y ensalada al lado."
  },
  n_huevoscerdo: {
    id: "n_huevoscerdo",
    name: "Revuelto de huevo con cerdo y pimientos",
    category: "dinner",
    kcal: 490,
    protein: 42,
    items: [
      { ing: "huevo", qty: 3 },
      { ing: "cerdolomo", qty: 120 },
      { ing: "pimiento", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "pan", qty: 35 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Cerdo en tiras dorado, pimientos y cebolla pochados, y los huevos al final removiendo a fuego suave."
  },
  n_tortillacamarones: {
    id: "n_tortillacamarones",
    name: "Tortilla de camarones y espinacas",
    category: "dinner",
    kcal: 450,
    protein: 40,
    items: [
      { ing: "huevo", qty: 3 },
      { ing: "gambas", qty: 120 },
      { ing: "espinacas", qty: 100 },
      { ing: "pan", qty: 35 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Saltea camarones con ajo y espinacas, añade el huevo batido y cuaja jugosa por dentro."
  },
  n_huevosalhorno: {
    id: "n_huevosalhorno",
    name: "Huevos al horno con carne y queso gratinado",
    category: "dinner",
    kcal: 510,
    protein: 44,
    items: [
      { ing: "huevo", qty: 3 },
      { ing: "ternerapicada", qty: 120 },
      { ing: "tomatetrit", qty: 120 },
      { ing: "quesofresco", qty: 40 },
      { ing: "espinacas", qty: 80 },
      { ing: "pan", qty: 30 }
    ],
    prep: "Carne con tomate en una fuente, haz huecos, casca los huevos, queso encima y horno 12 min a 200°."
  },
  s_huevoaguacate: {
    id: "s_huevoaguacate",
    name: "Huevos cocidos con aguacate y pimentón",
    category: "snack",
    kcal: 240,
    protein: 15,
    items: [
      { ing: "huevo", qty: 2 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "especias", qty: 1 }
    ],
    prep: "Huevos cocidos partidos por la mitad con aguacate machacado encima, sal y pimentón. Sacia muchísimo."
  },
  s_tortillamini: {
    id: "s_tortillamini",
    name: "Mini tortilla francesa con queso",
    category: "snack",
    kcal: 230,
    protein: 20,
    items: [
      { ing: "huevo", qty: 2 },
      { ing: "quesofresco", qty: 30 },
      { ing: "aove", qty: 4 }
    ],
    prep: "Dos huevos batidos con el queso dentro. Tres minutos y tienes 20 g de proteína."
  },

  /* ═══════════ COMIDA LIBRE CONTROLADA (finde) ═══════════ */
  n_pizzaproteica: {
    id: "n_pizzaproteica",
    name: "🔥 Pizza proteica de masa de avena con res",
    category: "dinner",
    kcal: 700,
    protein: 50,
    items: [
      { ing: "avena", qty: 60 },
      { ing: "skyr", qty: 80 },
      { ing: "ternerapicada", qty: 150 },
      { ing: "tomatetrit", qty: 100 },
      { ing: "quesorallado", qty: 50 },
      { ing: "champinones", qty: 80 },
      { ing: "ensalada", qty: 0.5 }
    ],
    prep: "Masa: avena molida + Skyr + levadura, estira y hornea 8 min sola. Añade tomate, carne y queso y 10 min más."
  },
  n_burgerdoblecheat: {
    id: "n_burgerdoblecheat",
    name: "🔥 Hamburguesa doble de res con patatas al horno",
    category: "dinner",
    kcal: 780,
    protein: 55,
    items: [
      { ing: "ternerapicada", qty: 220 },
      { ing: "panmasamadre", qty: 80 },
      { ing: "quesorallado", qty: 40 },
      { ing: "patata", qty: 200 },
      { ing: "skyr", qty: 40 },
      { ing: "mostaza", qty: 10 },
      { ing: "ensalada", qty: 0.5 }
    ],
    prep: "Dos medallones finos (más costra, más sabor), queso fundido entre ellos. Patatas gajo al horno con pimentón."
  },
  c_costillasbbq: {
    id: "c_costillasbbq",
    name: "🔥 Costillas BBQ caseras con boniato y ensalada",
    category: "lunch",
    kcal: 760,
    protein: 45,
    items: [
      { ing: "cerdocostilla", qty: 230 },
      { ing: "boniato", qty: 200 },
      { ing: "tomatetrit", qty: 60 },
      { ing: "miel", qty: 12 },
      { ing: "mostaza", qty: 8 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "especias", qty: 5 }
    ],
    prep: "Salsa BBQ casera: tomate + miel + mostaza + pimentón ahumado. Costillas 45 min tapadas y 15 min glaseando."
  },
  c_parrillada: {
    id: "c_parrillada",
    name: "🔥 Parrillada de res y cerdo con chimichurri",
    category: "lunch",
    kcal: 800,
    protein: 62,
    items: [
      { ing: "ternerafalda", qty: 180 },
      { ing: "cerdochuleta", qty: 120 },
      { ing: "patata", qty: 180 },
      { ing: "pimiento", qty: 1 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "ajo", qty: 4 },
      { ing: "aove", qty: 12 }
    ],
    prep: "Asa las carnes con sal gorda, reposa 5 min antes de cortar. Pimientos y patatas a la brasa, chimichurri generoso."
  }
};

/** Comidas libres controladas: solo aparecen en fin de semana si activas cheat day. */
export const CHEAT_MEALS = {
  lunch: ["c_costillasbbq", "c_parrillada"],
  dinner: ["n_pizzaproteica", "n_burgerdoblecheat"]
};
