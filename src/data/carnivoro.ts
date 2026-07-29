import type { Ingredient, Meal } from "./meals";
import type { Nutrients } from "./nutrition";

/**
 * EXPANSIÓN CARNÍVORA — comida de verdad, con sabor.
 *
 * Criterio: ternera y pollo como columna vertebral, huevos en platos
 * protagonistas (no de acompañante), ensaladas que llenan de verdad y
 * pescado ocasional. Todo con método del plato y cero platos tristes.
 *
 * Cada plato lleva sus ingredientes con cantidad base; las calorías y macros
 * los calcula la app desde la tabla nutricional, así que siempre cuadran.
 */

/* ── Ingredientes nuevos ── */

export const CARN_INGREDIENTS: Record<string, Ingredient> = {
  ternerafilete: { id: "ternerafilete", name: "Filete de ternera (entrecot/babilla)", unit: "g", section: "Proteínas", packLabel: "bandeja 500 g", packSize: 500, packPrice: 8.5 },
  ternerapicada: { id: "ternerapicada", name: "Carne picada de ternera", unit: "g", section: "Proteínas", packLabel: "bandeja 500 g", packSize: 500, packPrice: 5.5 },
  cerdolomo: { id: "cerdolomo", name: "Lomo/solomillo de cerdo", unit: "g", section: "Proteínas", packLabel: "pieza 500 g", packSize: 500, packPrice: 4.5 },
  ternerafalda: { id: "ternerafalda", name: "Falda / churrasco de res", unit: "g", section: "Proteínas", packLabel: "bandeja 600 g", packSize: 600, packPrice: 7.0 },
  cerdocostilla: { id: "cerdocostilla", name: "Costillas de cerdo", unit: "g", section: "Proteínas", packLabel: "costillar ~800 g", packSize: 800, packPrice: 5.5 },
  cerdoaguja: { id: "cerdoaguja", name: "Aguja / paleta de cerdo", unit: "g", section: "Proteínas", packLabel: "pieza 800 g", packSize: 800, packPrice: 4.8 },
  cerdochuleta: { id: "cerdochuleta", name: "Chuletas de cerdo", unit: "g", section: "Proteínas", packLabel: "bandeja 600 g", packSize: 600, packPrice: 4.5 },
  pollomuslo: { id: "pollomuslo", name: "Contramuslos de pollo sin piel", unit: "g", section: "Proteínas", packLabel: "bandeja 700 g", packSize: 700, packPrice: 4.5 },
  quesofresco: { id: "quesofresco", name: "Queso fresco (feta/mozzarella)", unit: "g", section: "Lácteos y huevos", packLabel: "tarrina 200 g", packSize: 200, packPrice: 2.3 },
  boniato: { id: "boniato", name: "Boniato", unit: "g", section: "Frescos", packLabel: "malla 1 kg", packSize: 1000, packPrice: 2.2 },
  limon: { id: "limon", name: "Limón", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 0.3 },
  ajo: { id: "ajo", name: "Ajo (dientes)", unit: "ud", section: "Frescos", packLabel: "cabeza (~10 dientes)", packSize: 10, packPrice: 0.6 },
  alubiasrojas: { id: "alubiasrojas", name: "Alubias rojas cocidas (bote)", unit: "g", section: "Despensa", packLabel: "bote 400 g escurrido", packSize: 400, packPrice: 1.0 },
  salsasoja: { id: "salsasoja", name: "Salsa de soja", unit: "ml", section: "Despensa", packLabel: "botella 250 ml", packSize: 250, packPrice: 1.8 },
  mostaza: { id: "mostaza", name: "Mostaza de Dijon", unit: "g", section: "Despensa", packLabel: "bote 200 g", packSize: 200, packPrice: 1.5 },
  aceitunas: { id: "aceitunas", name: "Aceitunas", unit: "g", section: "Despensa", packLabel: "bote 200 g escurrido", packSize: 200, packPrice: 1.6 },
  especias: { id: "especias", name: "Especias (pimentón, comino, orégano)", unit: "g", section: "Despensa", packLabel: "bote 50 g", packSize: 50, packPrice: 1.2 }
};

/* ── Datos nutricionales (por 100 g/ml, o por unidad en los "ud") ── */

export const CARN_NUTRITION: Record<string, Nutrients> = {
  ternerafilete: { kcal: 180, protein: 26, carbs: 0, fat: 8, weighAs: "crudo" },
  ternerapicada: { kcal: 150, protein: 21, carbs: 0, fat: 7, weighAs: "crudo" },
  cerdolomo: { kcal: 143, protein: 22, carbs: 0, fat: 6, weighAs: "crudo" },
  ternerafalda: { kcal: 210, protein: 24, carbs: 0, fat: 13, weighAs: "crudo" },
  cerdocostilla: { kcal: 250, protein: 19, carbs: 0, fat: 19, weighAs: "crudo" },
  cerdoaguja: { kcal: 200, protein: 19, carbs: 0, fat: 14, weighAs: "crudo" },
  cerdochuleta: { kcal: 175, protein: 24, carbs: 0, fat: 9, weighAs: "crudo" },
  pollomuslo: { kcal: 165, protein: 20, carbs: 0, fat: 9, weighAs: "crudo" },
  quesofresco: { kcal: 250, protein: 18, carbs: 3, fat: 18, weighAs: "tal cual" },
  boniato: { kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, weighAs: "crudo" },
  limon: { kcal: 17, protein: 0.6, carbs: 5, fat: 0.2, weighAs: "tal cual" },
  ajo: { kcal: 4, protein: 0.2, carbs: 1, fat: 0, weighAs: "tal cual" },
  alubiasrojas: { kcal: 120, protein: 8, carbs: 20, fat: 0.5, weighAs: "cocido" },
  salsasoja: { kcal: 53, protein: 8, carbs: 5, fat: 0, weighAs: "tal cual" },
  mostaza: { kcal: 66, protein: 4, carbs: 6, fat: 3, weighAs: "tal cual" },
  aceitunas: { kcal: 145, protein: 1, carbs: 4, fat: 15, weighAs: "tal cual" },
  especias: { kcal: 280, protein: 13, carbs: 34, fat: 13, weighAs: "tal cual" }
};

/* ── Platos nuevos ── */

export const CARN_MEALS: Record<string, Meal> = {
  /* ════════ DESAYUNOS con huevo (para quien sí desayuna) ════════ */
  d_huevosrancheros: {
    id: "d_huevosrancheros",
    name: "Huevos rancheros con alubias y aguacate",
    category: "breakfast",
    kcal: 480,
    protein: 26,
    items: [
      { ing: "huevo", qty: 2 },
      { ing: "alubiasrojas", qty: 80 },
      { ing: "tortillawrap", qty: 1 },
      { ing: "tomate", qty: 1 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "especias", qty: 2 }
    ],
    prep: "Sofríe tomate con especias, añade las alubias. Huevos a la plancha encima, todo sobre la tortilla y aguacate al lado."
  },
  d_revueltoternera: {
    id: "d_revueltoternera",
    name: "Revuelto de huevo con ternera y pan tostado",
    category: "breakfast",
    kcal: 470,
    protein: 38,
    items: [
      { ing: "huevo", qty: 3 },
      { ing: "ternerapicada", qty: 70 },
      { ing: "pan", qty: 40 },
      { ing: "tomate", qty: 1 },
      { ing: "aove", qty: 6 }
    ],
    prep: "Dora la carne con ajo y pimentón, añade los huevos batidos y revuelve a fuego suave. Pan tostado con tomate."
  },
  d_tortillajamon: {
    id: "d_tortillajamon",
    name: "Tortilla de 3 huevos con queso y tomate",
    category: "breakfast",
    kcal: 430,
    protein: 30,
    items: [
      { ing: "huevo", qty: 3 },
      { ing: "quesofresco", qty: 40 },
      { ing: "tomate", qty: 1 },
      { ing: "pan", qty: 30 },
      { ing: "aove", qty: 5 }
    ],
    prep: "Tortilla francesa jugosa con el queso dentro para que funda. Tomate en rodajas con sal y aceite al lado."
  },

  /* ════════ ALMUERZOS — TERNERA ════════ */
  c_entrecot: {
    id: "c_entrecot",
    name: "Filete de ternera a la plancha con patatas y ensalada",
    category: "lunch",
    kcal: 620,
    protein: 48,
    items: [
      { ing: "ternerafilete", qty: 180 },
      { ing: "patata", qty: 200 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "ajo", qty: 2 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Plancha muy caliente: 2-3 min por lado y reposa 3 min (esto lo deja jugoso). Patatas al horno con ajo y romero."
  },
  c_chili: {
    id: "c_chili",
    name: "Chili con carne de ternera y arroz",
    category: "lunch",
    kcal: 640,
    protein: 45,
    items: [
      { ing: "ternerapicada", qty: 160 },
      { ing: "alubiasrojas", qty: 120 },
      { ing: "tomatetrit", qty: 150 },
      { ing: "arroz", qty: 60 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "especias", qty: 4 }
    ],
    prep: "Dora la carne, añade cebolla y pimiento, luego tomate, alubias, comino y pimentón. 15 min a fuego lento. Arroz al lado."
  },
  c_carneasada: {
    id: "c_carneasada",
    name: "Carne asada con chimichurri, boniato y verduras",
    category: "lunch",
    kcal: 630,
    protein: 44,
    items: [
      { ing: "ternerafilete", qty: 170 },
      { ing: "boniato", qty: 200 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "ajo", qty: 2 },
      { ing: "aove", qty: 12 }
    ],
    prep: "Chimichurri: ajo, perejil, orégano, aceite y vinagre. Carne a la plancha, boniato y verduras al horno 25 min."
  },
  c_estofado: {
    id: "c_estofado",
    name: "Estofado de ternera con patata y zanahoria",
    category: "lunch",
    kcal: 610,
    protein: 42,
    items: [
      { ing: "ternerapicada", qty: 150 },
      { ing: "patata", qty: 180 },
      { ing: "zanahoria", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "tomatetrit", qty: 100 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sella la carne, sofríe cebolla y zanahoria, añade tomate y patata en cachelos. Cubre con agua y 25 min tapado."
  },
  c_tacos: {
    id: "c_tacos",
    name: "Tacos de ternera con pico de gallo y aguacate",
    category: "lunch",
    kcal: 620,
    protein: 40,
    items: [
      { ing: "ternerapicada", qty: 150 },
      { ing: "tortillawrap", qty: 2 },
      { ing: "tomate", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "limon", qty: 0.5 },
      { ing: "especias", qty: 3 }
    ],
    prep: "Carne con comino y pimentón. Pico de gallo: tomate, cebolla y limón picados. Lechuga abundante dentro del taco y aguacate encima."
  },
  c_lomocerdo: {
    id: "c_lomocerdo",
    name: "Solomillo de cerdo a la mostaza con puré y verduras",
    category: "lunch",
    kcal: 580,
    protein: 45,
    items: [
      { ing: "cerdolomo", qty: 180 },
      { ing: "patata", qty: 180 },
      { ing: "brocoli", qty: 120 },
      { ing: "mostaza", qty: 12 },
      { ing: "leche", qty: 50 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sella el solomillo, salsea con mostaza y un chorro de nata ligera. Puré de patata con leche y brócoli al vapor."
  },

  /* ════════ ALMUERZOS — POLLO con sabor ════════ */
  c_polloasado: {
    id: "c_polloasado",
    name: "Contramuslos de pollo asados con boniato y verduras",
    category: "lunch",
    kcal: 600,
    protein: 42,
    items: [
      { ing: "pollomuslo", qty: 200 },
      { ing: "boniato", qty: 200 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "ajo", qty: 3 },
      { ing: "especias", qty: 3 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Todo en una bandeja: pollo adobado con pimentón y ajo, boniato en cubos, pimiento y calabacín. Horno 200° 30 min. Una sola bandeja que lavar."
  },
  c_pollolimon: {
    id: "c_pollolimon",
    name: "Pollo al limón con arroz y brócoli",
    category: "lunch",
    kcal: 580,
    protein: 48,
    items: [
      { ing: "pollo", qty: 180 },
      { ing: "arroz", qty: 70 },
      { ing: "brocoli", qty: 130 },
      { ing: "limon", qty: 1 },
      { ing: "ajo", qty: 2 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Pollo en tiras a fuego fuerte con ajo, deglasa con zumo de limón y una cucharada de agua: sale una salsa brillante."
  },
  c_brochetas: {
    id: "c_brochetas",
    name: "Brochetas de pollo y verduras con cuscús de quinoa",
    category: "lunch",
    kcal: 570,
    protein: 45,
    items: [
      { ing: "pollo", qty: 180 },
      { ing: "quinoa", qty: 70 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Marina el pollo 15 min con especias y limón. Alterna con verduras en las brochetas y plancha 10 min girando."
  },

  /* ════════ ENSALADAS QUE LLENAN (plato principal) ════════ */
  c_ensaladaternera: {
    id: "c_ensaladaternera",
    name: "Ternera a la plancha con ensalada de aguacate y queso",
    category: "lunch",
    kcal: 560,
    protein: 42,
    items: [
      { ing: "ternerafilete", qty: 150 },
      { ing: "ensalada", qty: 1 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "quesofresco", qty: 40 },
      { ing: "tomate", qty: 1 },
      { ing: "aceitunas", qty: 25 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Ternera a la plancha en tiras, aún templada sobre la ensalada. Aliño de aceite, limón y mostaza."
  },
  c_ensaladapollo: {
    id: "c_ensaladapollo",
    name: "Pollo a la plancha con ensalada de huevo y aguacate",
    category: "lunch",
    kcal: 550,
    protein: 46,
    items: [
      { ing: "pollo", qty: 150 },
      { ing: "huevo", qty: 2 },
      { ing: "ensalada", qty: 1 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "maiz", qty: 40 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Pollo a la plancha, huevos duros en cuartos, aguacate y maíz. Aliña con aceite, limón y mostaza."
  },
  n_ensaladacaprese: {
    id: "n_ensaladacaprese",
    name: "Pollo con ensalada caprese y pan tostado",
    category: "dinner",
    kcal: 470,
    protein: 40,
    items: [
      { ing: "pollo", qty: 140 },
      { ing: "quesofresco", qty: 50 },
      { ing: "tomate", qty: 2 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "pan", qty: 30 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Capas de tomate y queso fresco, pollo a la plancha en tiras, albahaca y un buen aceite. Pan tostado al lado."
  },

  /* ════════ CENAS ════════ */
  n_burgerternera: {
    id: "n_burgerternera",
    name: "Hamburguesa casera de ternera con boniato al horno",
    category: "dinner",
    kcal: 560,
    protein: 40,
    items: [
      { ing: "ternerapicada", qty: 150 },
      { ing: "pan", qty: 60 },
      { ing: "quesofresco", qty: 25 },
      { ing: "tomate", qty: 1 },
      { ing: "ensalada", qty: 0.25 },
      { ing: "boniato", qty: 150 },
      { ing: "mostaza", qty: 8 }
    ],
    prep: "Forma la burger sin apretar (queda jugosa), 3 min por lado. Boniato en bastones al horno 25 min a 200°."
  },
  n_huevosrotos: {
    id: "n_huevosrotos",
    name: "Huevos rotos con patata, pimientos y ensalada",
    category: "dinner",
    kcal: 490,
    protein: 32,
    items: [
      { ing: "huevo", qty: 3 },
      { ing: "patata", qty: 200 },
      { ing: "pavopicado", qty: 60 },
      { ing: "pimiento", qty: 1 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "aove", qty: 12 },
      { ing: "especias", qty: 2 }
    ],
    prep: "Patata en dados al horno con pimientos hasta dorar. Huevos fritos encima, rómpelos y mezcla. Ensalada al lado."
  },
  n_shakshuka: {
    id: "n_shakshuka",
    name: "Shakshuka: huevos escalfados con queso y pimiento",
    category: "dinner",
    kcal: 460,
    protein: 28,
    items: [
      { ing: "quesofresco", qty: 50 },
      { ing: "huevo", qty: 3 },
      { ing: "tomatetrit", qty: 200 },
      { ing: "pimiento", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "pan", qty: 40 },
      { ing: "especias", qty: 3 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sofríe pimiento y cebolla, añade tomate y comino. Haz huecos, casca los huevos dentro y tapa 5 min. Pan para mojar."
  },
  n_terneraplancha: {
    id: "n_terneraplancha",
    name: "Ternera a la plancha con ensalada y queso fresco",
    category: "dinner",
    kcal: 480,
    protein: 44,
    items: [
      { ing: "ternerafilete", qty: 170 },
      { ing: "ensalada", qty: 1 },
      { ing: "quesofresco", qty: 30 },
      { ing: "tomate", qty: 1 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Cena rápida de 8 minutos: filete a la plancha con sal gorda y ensalada generosa con queso desmenuzado."
  },
  n_polloajillo: {
    id: "n_polloajillo",
    name: "Pollo al ajillo con champiñones y pan",
    category: "dinner",
    kcal: 470,
    protein: 42,
    items: [
      { ing: "pollo", qty: 170 },
      { ing: "champinones", qty: 120 },
      { ing: "ajo", qty: 4 },
      { ing: "pan", qty: 40 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Ajos laminados dorándose, pollo en dados a fuego fuerte, champiñones al final. Perejil y pan para la salsa."
  },
  n_wokternera: {
    id: "n_wokterneraverde",
    name: "Wok de ternera con brócoli y salsa de soja",
    category: "dinner",
    kcal: 490,
    protein: 42,
    items: [
      { ing: "ternerafilete", qty: 160 },
      { ing: "brocoli", qty: 150 },
      { ing: "zanahoria", qty: 1 },
      { ing: "arroz", qty: 45 },
      { ing: "salsasoja", qty: 15 },
      { ing: "ajo", qty: 2 }
    ],
    prep: "Sartén al máximo: ternera 90 segundos y fuera. Verduras 3 min, devuelve la carne con soja y ajo. Arroz al lado."
  },
  n_pimientosrellenos: {
    id: "n_pimientosrellenos",
    name: "Pimientos rellenos de ternera y arroz",
    category: "dinner",
    kcal: 500,
    protein: 38,
    items: [
      { ing: "ternerapicada", qty: 140 },
      { ing: "pimiento", qty: 2 },
      { ing: "arroz", qty: 45 },
      { ing: "tomatetrit", qty: 100 },
      { ing: "quesorallado", qty: 25 },
      { ing: "cebolla", qty: 0.5 }
    ],
    prep: "Rellena los pimientos con la carne salteada, arroz y tomate. Queso encima y horno 25 min a 190°."
  },
  n_atunplancha: {
    id: "n_atunplancha",
    name: "Lomo de merluza a la plancha con ensalada templada",
    category: "dinner",
    kcal: 430,
    protein: 38,
    items: [
      { ing: "merluza", qty: 200 },
      { ing: "patata", qty: 150 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "limon", qty: 0.5 },
      { ing: "ajo", qty: 2 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Merluza a la plancha 3 min por lado con ajo y limón. Patata cocida templada sobre la ensalada."
  },


  /* ════════ CERDO ════════ */
  c_costillas: {
    id: "c_costillas",
    name: "Costillas de cerdo al horno con boniato y ensalada",
    category: "lunch",
    kcal: 680,
    protein: 40,
    items: [
      { ing: "cerdocostilla", qty: 200 },
      { ing: "boniato", qty: 180 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "ajo", qty: 3 },
      { ing: "especias", qty: 4 }
    ],
    prep: "Adoba con pimentón, ajo y comino. Horno tapado 45 min a 160° y 10 min destapado a 220° para que doren."
  },
  c_pulledpork: {
    id: "c_pulledpork",
    name: "Cerdo desmechado con tortillas, pico de gallo y ensalada",
    category: "lunch",
    kcal: 650,
    protein: 42,
    items: [
      { ing: "cerdoaguja", qty: 180 },
      { ing: "tortillawrap", qty: 2 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "tomate", qty: 1 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "especias", qty: 4 }
    ],
    prep: "Cuece la aguja 2 h a fuego lento con cebolla y especias (o 40 min en olla exprés) y desmecha con dos tenedores."
  },
  c_chuletacerdo: {
    id: "c_chuletacerdo",
    name: "Chuleta de cerdo a la plancha con patatas y pimientos",
    category: "lunch",
    kcal: 610,
    protein: 46,
    items: [
      { ing: "cerdochuleta", qty: 190 },
      { ing: "patata", qty: 190 },
      { ing: "pimiento", qty: 1 },
      { ing: "ajo", qty: 2 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Chuleta a fuego fuerte 3 min por lado, sal al final. Pimientos asados y patatas panadera al horno."
  },
  c_cerdoagridulce: {
    id: "c_cerdoagridulce",
    name: "Salteado de cerdo agridulce con arroz y verduras",
    category: "lunch",
    kcal: 600,
    protein: 44,
    items: [
      { ing: "cerdolomo", qty: 180 },
      { ing: "arroz", qty: 65 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "zanahoria", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "salsasoja", qty: 15 },
      { ing: "miel", qty: 10 }
    ],
    prep: "Cerdo en tiras al wok, retira. Saltea verduras, devuelve la carne con soja, miel y un chorro de limón."
  },
  n_pinchomoruno: {
    id: "n_pinchomoruno",
    name: "Pinchos morunos de cerdo con ensalada y pan",
    category: "dinner",
    kcal: 520,
    protein: 42,
    items: [
      { ing: "cerdolomo", qty: 180 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "pan", qty: 40 },
      { ing: "especias", qty: 4 }
    ],
    prep: "Marina el cerdo en dados con comino, pimentón, ajo y aceite (mejor de un día para otro). Plancha 8 min girando."
  },
  n_cerdochampinones: {
    id: "n_cerdochampinones",
    name: "Lomo de cerdo con champiñones al ajillo y ensalada",
    category: "dinner",
    kcal: 490,
    protein: 44,
    items: [
      { ing: "cerdolomo", qty: 180 },
      { ing: "champinones", qty: 130 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "ajo", qty: 3 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Lomo en medallones a la plancha, retira. En la misma sartén, champiñones con ajo y perejil. Salsea encima."
  },

  /* ════════ MÁS RES ════════ */
  c_churrasco: {
    id: "c_churrasco",
    name: "Churrasco de res con chimichurri, patata y ensalada",
    category: "lunch",
    kcal: 670,
    protein: 46,
    items: [
      { ing: "ternerafalda", qty: 190 },
      { ing: "patata", qty: 180 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "ajo", qty: 3 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Falda a fuego fuerte 3-4 min por lado, córtala SIEMPRE contra la fibra. Chimichurri generoso encima."
  },
  c_bistecencebollado: {
    id: "c_bistecencebollado",
    name: "Bistec encebollado con arroz y ensalada",
    category: "lunch",
    kcal: 620,
    protein: 46,
    items: [
      { ing: "ternerafilete", qty: 180 },
      { ing: "cebolla", qty: 1 },
      { ing: "arroz", qty: 65 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Sella el bistec y retíralo. Poch a la cebolla en la misma sartén hasta dorar, devuelve la carne 1 min. Clásico y perfecto."
  },
  n_ropavieja: {
    id: "n_ropavieja",
    name: "Ropa vieja de res con pimientos y arroz",
    category: "dinner",
    kcal: 530,
    protein: 42,
    items: [
      { ing: "ternerafalda", qty: 170 },
      { ing: "pimiento", qty: 1 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "tomatetrit", qty: 120 },
      { ing: "arroz", qty: 45 },
      { ing: "especias", qty: 3 }
    ],
    prep: "Cuece y desmecha la falda. Sofríe pimiento y cebolla, añade tomate y la carne. 10 min juntos."
  },
  n_milanesa: {
    id: "n_milanesa",
    name: "Milanesa de res al horno con ensalada y patata",
    category: "dinner",
    kcal: 560,
    protein: 45,
    items: [
      { ing: "ternerafilete", qty: 170 },
      { ing: "huevo", qty: 1 },
      { ing: "pan", qty: 35 },
      { ing: "patata", qty: 150 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Empana con huevo y pan rallado, y al horno 200° 20 min sobre rejilla: queda crujiente sin fritura."
  },

  /* ════════ SNACKS con proteína ════════ */
  s_huevosduros: {
    id: "s_huevosduros",
    name: "Huevos duros con sal y pimentón",
    category: "snack",
    kcal: 160,
    protein: 13,
    items: [
      { ing: "huevo", qty: 2 },
      { ing: "especias", qty: 1 }
    ],
    prep: "10 min de cocción exactos. Cocina varios el domingo y tienes snack de proteína toda la semana."
  },
  s_quesoaceitunas: {
    id: "s_quesoaceitunas",
    name: "Queso fresco con aceitunas y tomate",
    category: "snack",
    kcal: 190,
    protein: 12,
    items: [
      { ing: "quesofresco", qty: 50 },
      { ing: "aceitunas", qty: 25 },
      { ing: "tomate", qty: 1 }
    ],
    prep: "Tapa rápida: queso en dados, aceitunas y tomate con orégano y un hilo de aceite."
  }
};
