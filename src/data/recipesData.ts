import type { DayMenu, Ingredient, Meal } from "./meals";

/**
 * AMPLIACIÓN DE NUTRICIÓN · Semanas 5-8 (28 días de menús nuevos)
 * Método del plato Fuertafit: ½ verduras/hortalizas + ¼ proteína de calidad
 * + ¼ carbohidrato complejo, con grasas saludables. Cero monotonía.
 *
 * Este archivo se fusiona automáticamente con la base (meals.ts): las nuevas
 * recetas entran al recetario/buscador y la lista de la compra compartida
 * sigue sumando y categorizando por secciones del súper sin tocar Supabase.
 */

/* ---------- Nuevos ingredientes (categorizados para la lista) ---------- */

export const NEW_INGREDIENTS: Record<string, Ingredient> = {
  ternera: { id: "ternera", name: "Ternera magra en tiras", unit: "g", section: "Proteínas", packLabel: "bandeja 500 g", packSize: 500, packPrice: 5.9 },
  pepino: { id: "pepino", name: "Pepino", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 0.6 },
  zanahoria: { id: "zanahoria", name: "Zanahoria", unit: "ud", section: "Frescos", packLabel: "bolsa 1 kg (~10 ud)", packSize: 10, packPrice: 1.0 },
  maiz: { id: "maiz", name: "Maíz dulce (lata)", unit: "g", section: "Despensa", packLabel: "lata 140 g escurrido", packSize: 140, packPrice: 0.9 },
  palomitasmaiz: { id: "palomitasmaiz", name: "Maíz para palomitas", unit: "g", section: "Despensa", packLabel: "bolsa 250 g", packSize: 250, packPrice: 1.2 }
};

/* ---------- Nuevas recetas ---------- */

export const NEW_MEALS: Record<string, Meal> = {
  /* Desayunos */
  d_tortillaavena: {
    id: "d_tortillaavena",
    name: "Tortilla de avena dulce con plátano y canela",
    category: "breakfast",
    kcal: 410,
    protein: 20,
    items: [
      { ing: "avena", qty: 40 },
      { ing: "huevo", qty: 2 },
      { ing: "leche", qty: 50 },
      { ing: "platano", qty: 0.5 },
      { ing: "miel", qty: 5 }
    ],
    prep: "Bate avena + huevos + leche y cuaja como tortilla. Dobla con plátano dentro, canela y un hilo de miel."
  },
  d_overnight: {
    id: "d_overnight",
    name: "Overnight oats de frutos rojos y cacahuete",
    category: "breakfast",
    kcal: 430,
    protein: 16,
    items: [
      { ing: "avena", qty: 50 },
      { ing: "leche", qty: 200 },
      { ing: "frutosrojos", qty: 75 },
      { ing: "cremacacahuete", qty: 12 }
    ],
    prep: "La noche antes: avena + leche + frutos rojos al bote. Por la mañana, remueve y corona con la crema de cacahuete."
  },

  /* Almuerzos */
  c_pokeatun: {
    id: "c_pokeatun",
    name: "Poke bowl de atún con arroz, aguacate y maíz",
    category: "lunch",
    kcal: 560,
    protein: 30,
    items: [
      { ing: "arroz", qty: 80 },
      { ing: "atun", qty: 84 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "pepino", qty: 0.5 },
      { ing: "zanahoria", qty: 1 },
      { ing: "maiz", qty: 50 }
    ],
    prep: "Base de arroz, y por encima atún, aguacate, pepino, zanahoria rallada y maíz. Aliña con soja y limón."
  },
  c_wokternera: {
    id: "c_wokternera",
    name: "Wok de ternera con verduras y arroz",
    category: "lunch",
    kcal: 560,
    protein: 36,
    items: [
      { ing: "ternera", qty: 130 },
      { ing: "arroz", qty: 70 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "zanahoria", qty: 1 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sartén muy caliente: ternera 2 min, retira. Saltea verduras, vuelve a añadir carne y arroz cocido con soja."
  },
  c_ensaladatemplada: {
    id: "c_ensaladatemplada",
    name: "Quinoa templada con pollo, huevo y verduras asadas",
    category: "lunch",
    kcal: 520,
    protein: 25,
    items: [
      { ing: "pollo", qty: 120 },
      { ing: "quinoa", qty: 70 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "huevo", qty: 2 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Quinoa cocida + verduras asadas aún templadas + huevo poché o duro. Aliño de aceite, limón y pimentón."
  },
  c_albondigas: {
    id: "c_albondigas",
    name: "Albóndigas de pavo en salsa con arroz y ensalada",
    category: "lunch",
    kcal: 560,
    protein: 40,
    items: [
      { ing: "ensalada", qty: 0.5 },
      { ing: "pavopicado", qty: 150 },
      { ing: "tomatetrit", qty: 150 },
      { ing: "arroz", qty: 70 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "aove", qty: 6 }
    ],
    prep: "Bolitas de pavo especiado doradas en sartén; cuece 8 min en el tomate con cebolla. Arroz y ensalada aliñada al lado."
  },
  c_pastapollo: {
    id: "c_pastapollo",
    name: "Pasta integral con pollo, champiñones y calabacín al ajillo",
    category: "lunch",
    kcal: 570,
    protein: 45,
    items: [
      { ing: "pasta", qty: 90 },
      { ing: "pollo", qty: 130 },
      { ing: "champinones", qty: 100 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Pollo y verduras salteados con ajo y guindilla, mezcla con la pasta y un cazo de su agua de cocción."
  },

  /* Cenas */
  n_pizzafit: {
    id: "n_pizzafit",
    name: "Pizza fit de base de wrap con pavo y champiñones",
    category: "dinner",
    kcal: 430,
    protein: 32,
    items: [
      { ing: "tortillawrap", qty: 1 },
      { ing: "tomatetrit", qty: 80 },
      { ing: "quesorallado", qty: 30 },
      { ing: "champinones", qty: 75 },
      { ing: "pavopicado", qty: 80 }
    ],
    prep: "Wrap como base, tomate, pavo salteado, champis y queso. Horno fuerte 8-10 min hasta que cruja. Orégano."
  },
  n_cesar: {
    id: "n_cesar",
    name: "Ensalada César fit de pollo con salsa de yogur",
    category: "dinner",
    kcal: 420,
    protein: 40,
    items: [
      { ing: "pollo", qty: 130 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "pan", qty: 30 },
      { ing: "yogurgriego", qty: 0.5 },
      { ing: "quesorallado", qty: 10 }
    ],
    prep: "Pollo a la plancha en tiras, picatostes al horno y salsa César ligera: yogur + limón + ajo + una anchoa opcional."
  },
  n_revueltogambas: {
    id: "n_revueltogambas",
    name: "Revuelto de gambas y espinacas con pan tostado",
    category: "dinner",
    kcal: 420,
    protein: 34,
    items: [
      { ing: "gambas", qty: 125 },
      { ing: "espinacas", qty: 100 },
      { ing: "huevo", qty: 2 },
      { ing: "pan", qty: 40 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Gambas con ajo, añade espinacas y después los huevos; revuelve a fuego suave. Pan tostado para acompañar."
  },
  n_tortillapatata: {
    id: "n_tortillapatata",
    name: "Tortilla de patata con atún y ensalada",
    category: "dinner",
    kcal: 430,
    protein: 22,
    items: [
      { ing: "huevo", qty: 1 },
      { ing: "atun", qty: 56 },
      { ing: "patata", qty: 200 },
      { ing: "huevo", qty: 2 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "ensalada", qty: 0.5 },
      { ing: "aove", qty: 10 }
    ],
    prep: "Patata al micro 8 min en vez de frita, mezcla con huevo y cebolla pochada y cuaja. Ensalada aliñada al lado."
  },

  /* Snacks */
  s_palomitas: {
    id: "s_palomitas",
    name: "Palomitas caseras a la sartén",
    category: "snack",
    kcal: 130,
    protein: 4,
    items: [
      { ing: "palomitasmaiz", qty: 25 },
      { ing: "aove", qty: 3 }
    ],
    prep: "Maíz + unas gotas de aceite en olla tapada a fuego medio. Snack de cine sin culpa, sal al gusto."
  },
  s_platanonueces: {
    id: "s_platanonueces",
    name: "Plátano con puñadito de nueces",
    category: "snack",
    kcal: 180,
    protein: 4,
    items: [
      { ing: "platano", qty: 1 },
      { ing: "nueces", qty: 12 }
    ],
    prep: "El snack más rápido del mundo: fruta + grasas buenas para llegar sin hambre a la siguiente comida."
  }
};

/* ---------- Menús · Semanas 5 a 8 (Lunes a Domingo) ---------- */

export const WEEKS_5_8: DayMenu[][] = [
  /* Semana 5 */
  [
    { breakfast: "d_tortillaavena", lunch: "c_pokeatun", dinner: "n_pizzafit", snack: "s_yogurnueces" },
    { breakfast: "d_gachas", lunch: "c_wokternera", dinner: "n_tortillaverde", snack: "s_batidorojo" },
    { breakfast: "d_overnight", lunch: "c_albondigas", dinner: "n_cesar", snack: "s_platanonueces" },
    { breakfast: "d_tostavo", lunch: "c_ensaladatemplada", dinner: "n_gambas", snack: "s_mugcake" },
    { breakfast: "d_bowlyogur", lunch: "c_pastapollo", dinner: "n_revueltogambas", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortitas", lunch: "c_salmon", dinner: "n_burger", snack: "s_yogurnueces" },
    { breakfast: "d_gachas", lunch: "c_fajitas", dinner: "n_cremacalabaza", snack: "s_palomitas" }
  ],
  /* Semana 6 */
  [
    { breakfast: "d_overnight", lunch: "c_curry", dinner: "n_tortillapatata", snack: "s_batidorojo" },
    { breakfast: "d_tostavo", lunch: "c_pokeatun", dinner: "n_raviolis", snack: "s_yogurnueces" },
    { breakfast: "d_gachas", lunch: "c_lentejas", dinner: "n_pizzafit", snack: "s_manzanacacahuete" },
    { breakfast: "d_tortillaavena", lunch: "c_bolonesa", dinner: "n_merluza", snack: "s_platanonueces" },
    { breakfast: "d_bowlyogur", lunch: "c_wokternera", dinner: "n_wrap", snack: "s_mugcake" },
    { breakfast: "d_tortitas", lunch: "c_ensaladagarb", dinner: "n_cesar", snack: "s_palomitas" },
    { breakfast: "d_tostavo", lunch: "c_albondigas", dinner: "n_tortillaverde", snack: "s_yogurnueces" }
  ],
  /* Semana 7 */
  [
    { breakfast: "d_gachas", lunch: "c_ensaladatemplada", dinner: "n_gambas", snack: "s_yogurnueces" },
    { breakfast: "d_tortillaavena", lunch: "c_arrozpavo", dinner: "n_tortillapatata", snack: "s_batidorojo" },
    { breakfast: "d_tostavo", lunch: "c_pastapollo", dinner: "n_raviolis", snack: "s_manzanacacahuete" },
    { breakfast: "d_overnight", lunch: "c_salmon", dinner: "n_pizzafit", snack: "s_platanonueces" },
    { breakfast: "d_bowlyogur", lunch: "c_pokeatun", dinner: "n_burger", snack: "s_mugcake" },
    { breakfast: "d_tortitas", lunch: "c_curry", dinner: "n_revueltogambas", snack: "s_palomitas" },
    { breakfast: "d_gachas", lunch: "c_wokternera", dinner: "n_cremacalabaza", snack: "s_yogurnueces" }
  ],
  /* Semana 8 */
  [
    { breakfast: "d_overnight", lunch: "c_albondigas", dinner: "n_tortillaverde", snack: "s_manzanacacahuete" },
    { breakfast: "d_gachas", lunch: "c_bowlquinoa", dinner: "n_cesar", snack: "s_yogurnueces" },
    { breakfast: "d_tortillaavena", lunch: "c_fajitas", dinner: "n_merluza", snack: "s_batidorojo" },
    { breakfast: "d_tostavo", lunch: "c_lentejas", dinner: "n_pizzafit", snack: "s_platanonueces" },
    { breakfast: "d_tortitas", lunch: "c_pokeatun", dinner: "n_gambas", snack: "s_mugcake" },
    { breakfast: "d_bowlyogur", lunch: "c_salmon", dinner: "n_tortillapatata", snack: "s_palomitas" },
    { breakfast: "d_tostavo", lunch: "c_bolonesa", dinner: "n_wrap", snack: "s_yogurnueces" }
  ]
];
