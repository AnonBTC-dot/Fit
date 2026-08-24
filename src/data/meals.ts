/**
 * Nutrición estilo Fuertafit: CERO dietas aburridas.
 * Nada de "arroz, brócoli y pechuga seca": platos ricos, variados y fáciles
 * siguiendo el MÉTODO DEL PLATO (½ verduras/hortalizas + ¼ proteína de
 * calidad + ¼ carbohidrato complejo, con grasas saludables).
 *
 * Recetario: avena cocida con fruta y frutos secos, fajitas saludables,
 * pollo al curry con puré, salmón al horno, raviolis de zapallito,
 * hamburguesa casera fit, pasta proteica con verduras, crema de verduras
 * con toppings crujientes, mugcake fit de chocolate...
 *
 * Las cantidades base están calibradas para ~1800 kcal/día y se escalan
 * linealmente al objetivo calórico de cada perfil (factor 0.75-1.45).
 */

export type IngUnit = "g" | "ml" | "ud";

export type MarketSection = "Frescos" | "Proteínas" | "Lácteos y huevos" | "Despensa" | "Congelados";

export const SECTION_ORDER: MarketSection[] = [
  "Proteínas",
  "Frescos",
  "Lácteos y huevos",
  "Congelados",
  "Despensa"
];

export interface Ingredient {
  id: string;
  name: string;
  unit: IngUnit;
  section: MarketSection; // sección del supermercado
  packLabel: string; // formato de compra habitual
  packSize: number; // cuánto contiene un pack, en `unit`
  packPrice: number; // guaraníes (Gs) estimados por pack · precios de Asunción
}

export const INGREDIENTS: Record<string, Ingredient> = {
  /* Despensa */
  avena: { id: "avena", name: "Copos de avena", unit: "g", section: "Despensa", packLabel: "paquete 1 kg", packSize: 1000, packPrice: 18000 },
  nueces: { id: "nueces", name: "Nueces peladas", unit: "g", section: "Despensa", packLabel: "bolsa 200 g", packSize: 200, packPrice: 30000 },
  cremacacahuete: { id: "cremacacahuete", name: "Mantequilla de maní 100%", unit: "g", section: "Despensa", packLabel: "bote 340 g", packSize: 340, packPrice: 28000 },
  cacao: { id: "cacao", name: "Cacao puro en polvo", unit: "g", section: "Despensa", packLabel: "lata 250 g", packSize: 250, packPrice: 25000 },
  miel: { id: "miel", name: "Miel", unit: "g", section: "Despensa", packLabel: "bote 500 g", packSize: 500, packPrice: 30000 },
  pan: { id: "pan", name: "Pan integral", unit: "g", section: "Despensa", packLabel: "barra/paquete 500 g", packSize: 500, packPrice: 9000 },
  tortillawrap: { id: "tortillawrap", name: "Tortillas integrales (wrap/fajita)", unit: "ud", section: "Despensa", packLabel: "pack 6 uds", packSize: 6, packPrice: 15000 },
  arroz: { id: "arroz", name: "Arroz", unit: "g", section: "Despensa", packLabel: "paquete 1 kg", packSize: 1000, packPrice: 7500 },
  pasta: { id: "pasta", name: "Pasta integral/proteica", unit: "g", section: "Despensa", packLabel: "paquete 500 g", packSize: 500, packPrice: 8000 },
  quinoa: { id: "quinoa", name: "Quinoa", unit: "g", section: "Despensa", packLabel: "paquete 500 g", packSize: 500, packPrice: 30000 },
  lentejas: { id: "lentejas", name: "Lentejas cocidas (bote)", unit: "g", section: "Despensa", packLabel: "bote 400 g escurrido", packSize: 400, packPrice: 10000 },
  garbanzos: { id: "garbanzos", name: "Garbanzos cocidos (bote)", unit: "g", section: "Despensa", packLabel: "bote 400 g escurrido", packSize: 400, packPrice: 10000 },
  tomatetrit: { id: "tomatetrit", name: "Tomate triturado", unit: "g", section: "Despensa", packLabel: "brik 400 g", packSize: 400, packPrice: 6000 },
  atun: { id: "atun", name: "Atún al natural (lata)", unit: "g", section: "Despensa", packLabel: "pack 3 latas (3x56 g)", packSize: 168, packPrice: 24000 },
  aove: { id: "aove", name: "Aceite de oliva virgen extra", unit: "ml", section: "Despensa", packLabel: "botella 1 L", packSize: 1000, packPrice: 45000 },
  curry: { id: "curry", name: "Curry en polvo", unit: "g", section: "Despensa", packLabel: "bote 50 g", packSize: 50, packPrice: 12000 },

  /* Frescos */
  platano: { id: "platano", name: "Banana", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 1000 },
  manzana: { id: "manzana", name: "Manzana", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 3000 },
  aguacate: { id: "aguacate", name: "Aguacate (palta)", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 6000 },
  tomate: { id: "tomate", name: "Tomate fresco", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 1800 },
  cebolla: { id: "cebolla", name: "Cebolla", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 900 },
  pimiento: { id: "pimiento", name: "Locote", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 4000 },
  calabacin: { id: "calabacin", name: "Zapallito", unit: "ud", section: "Frescos", packLabel: "unidad", packSize: 1, packPrice: 4000 },
  brocoli: { id: "brocoli", name: "Brócoli", unit: "g", section: "Frescos", packLabel: "pieza ~500 g", packSize: 500, packPrice: 12000 },
  calabaza: { id: "calabaza", name: "Zapallo", unit: "g", section: "Frescos", packLabel: "trozo ~1 kg", packSize: 1000, packPrice: 8000 },
  champinones: { id: "champinones", name: "Champiñones", unit: "g", section: "Frescos", packLabel: "bandeja 250 g", packSize: 250, packPrice: 15000 },
  ensalada: { id: "ensalada", name: "Mix de hojas verdes / ensalada", unit: "g", section: "Frescos", packLabel: "bolsa 200 g", packSize: 200, packPrice: 8000 },
  patata: { id: "patata", name: "Papas", unit: "g", section: "Frescos", packLabel: "malla 3 kg", packSize: 3000, packPrice: 22000 },

  /* Proteínas */
  pollo: { id: "pollo", name: "Pechuga de pollo", unit: "g", section: "Proteínas", packLabel: "bandeja 1 kg", packSize: 1000, packPrice: 25000 },
  pavopicado: { id: "pavopicado", name: "Carne molida de pavo/pollo", unit: "g", section: "Proteínas", packLabel: "bandeja 500 g", packSize: 500, packPrice: 13000 },
  salmon: { id: "salmon", name: "Lomos de salmón", unit: "g", section: "Proteínas", packLabel: "bandeja 2 lomos (500 g)", packSize: 500, packPrice: 70000 },
  merluza: { id: "merluza", name: "Filetes de merluza", unit: "g", section: "Proteínas", packLabel: "bandeja 400 g", packSize: 400, packPrice: 22000 },

  /* Lácteos y huevos */
  leche: { id: "leche", name: "Leche descremada", unit: "ml", section: "Lácteos y huevos", packLabel: "brik 1 L", packSize: 1000, packPrice: 6300 },
  huevo: { id: "huevo", name: "Huevos", unit: "ud", section: "Lácteos y huevos", packLabel: "docena", packSize: 12, packPrice: 14000 },
  yogurgriego: { id: "yogurgriego", name: "Yogur griego natural", unit: "ud", section: "Lácteos y huevos", packLabel: "pack 4 x 125 g", packSize: 4, packPrice: 18000 },
  quesobatido: { id: "quesobatido", name: "Yogur natural sin azúcar", unit: "g", section: "Lácteos y huevos", packLabel: "tarrina 500 g", packSize: 500, packPrice: 15000 },
  quesorallado: { id: "quesorallado", name: "Queso rallado light", unit: "g", section: "Lácteos y huevos", packLabel: "bolsa 200 g", packSize: 200, packPrice: 20000 },

  /* Congelados */
  frutosrojos: { id: "frutosrojos", name: "Frutos rojos congelados", unit: "g", section: "Congelados", packLabel: "bolsa 300 g", packSize: 300, packPrice: 25000 },
  gambas: { id: "gambas", name: "Camarones pelados", unit: "g", section: "Congelados", packLabel: "bolsa 500 g", packSize: 500, packPrice: 45000 },
  espinacas: { id: "espinacas", name: "Espinacas (congeladas o frescas)", unit: "g", section: "Congelados", packLabel: "bolsa 400 g", packSize: 400, packPrice: 12000 }
};

export type MealCategory = "breakfast" | "lunch" | "dinner" | "snack";

export const CATEGORY_LABELS: Record<MealCategory, string> = {
  breakfast: "Desayunos",
  lunch: "Almuerzos",
  dinner: "Cenas",
  snack: "Snacks"
};

export interface MealItem {
  ing: string;
  qty: number; // en la unidad del ingrediente, base 1800 kcal
}

export interface Meal {
  id: string;
  name: string;
  category: MealCategory;
  /** @deprecated Referencia orientativa. Los macros REALES se calculan desde
   *  los ingredientes con mealMacrosBase() / mealMacrosFor(). */
  kcal: number;
  /** @deprecated ver arriba */
  protein: number;
  items: MealItem[];
  prep: string; // 1-2 líneas
}

export const MEALS: Record<string, Meal> = {
  /* ---------- Desayunos ---------- */
  d_gachas: {
    id: "d_gachas",
    name: "Avena cocida con banana, frutos rojos y nueces",
    category: "breakfast",
    kcal: 430,
    protein: 15,
    items: [
      { ing: "avena", qty: 50 },
      { ing: "leche", qty: 250 },
      { ing: "platano", qty: 0.5 },
      { ing: "frutosrojos", qty: 50 },
      { ing: "nueces", qty: 15 }
    ],
    prep: "Cuece la avena con la leche 3 min (fuego o micro). Corona con banana, frutos rojos y nueces. Canela al gusto."
  },
  d_tostavo: {
    id: "d_tostavo",
    name: "Tostadas integrales con aguacate y huevo",
    category: "breakfast",
    kcal: 460,
    protein: 22,
    items: [
      { ing: "pan", qty: 80 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "huevo", qty: 2 },
      { ing: "tomate", qty: 0.5 }
    ],
    prep: "Aguacate machacado sobre las tostadas, huevos a la plancha o poché encima y tomate en rodajas. Pimienta y listo."
  },
  d_bowlyogur: {
    id: "d_bowlyogur",
    name: "Bol de yogur griego con avena crujiente, manzana y miel",
    category: "breakfast",
    kcal: 400,
    protein: 20,
    items: [
      { ing: "yogurgriego", qty: 2 },
      { ing: "avena", qty: 30 },
      { ing: "manzana", qty: 1 },
      { ing: "miel", qty: 8 }
    ],
    prep: "Tuesta la avena 2 min en sartén (queda tipo granola). Monta el bol: yogur, manzana en dados, avena y un hilo de miel."
  },
  d_tortitas: {
    id: "d_tortitas",
    name: "Panqueques de avena y banana con mantequilla de maní",
    category: "breakfast",
    kcal: 470,
    protein: 22,
    items: [
      { ing: "avena", qty: 50 },
      { ing: "huevo", qty: 2 },
      { ing: "platano", qty: 1 },
      { ing: "cremacacahuete", qty: 15 }
    ],
    prep: "Tritura avena + huevos + ½ banana. Cuaja las panqueques en sartén y sirve con el resto del banana y la mantequilla de maní."
  },

  /* ---------- Almuerzos ---------- */
  c_curry: {
    id: "c_curry",
    name: "Pollo al curry cremoso con puré y brócoli",
    category: "lunch",
    kcal: 560,
    protein: 45,
    items: [
      { ing: "brocoli", qty: 120 },
      { ing: "pollo", qty: 150 },
      { ing: "patata", qty: 250 },
      { ing: "leche", qty: 50 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "yogurgriego", qty: 1 },
      { ing: "curry", qty: 4 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sofríe cebolla, añade el pollo en dados y el curry; liga con el yogur (salsa cremosa sin crema). Puré: papa cocida machacada con leche."
  },
  c_salmon: {
    id: "c_salmon",
    name: "Salmón al horno con papa y brócoli",
    category: "lunch",
    kcal: 580,
    protein: 38,
    items: [
      { ing: "salmon", qty: 150 },
      { ing: "patata", qty: 250 },
      { ing: "brocoli", qty: 150 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Todo a la bandeja: papa en rodajas 15 min, luego añade salmón y brócoli 12-15 min más a 200 ºC. Limón por encima."
  },
  c_fajitas: {
    id: "c_fajitas",
    name: "Fajitas saludables de pollo con verduras y salsa de yogur",
    category: "lunch",
    kcal: 560,
    protein: 42,
    items: [
      { ing: "tortillawrap", qty: 2 },
      { ing: "pollo", qty: 150 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "yogurgriego", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Tiras de pollo con locote y cebolla a fuego fuerte con especias fajita. Rellena las tortillas y remata con salsa de yogur y limón."
  },
  c_bolonesa: {
    id: "c_bolonesa",
    name: "Pasta proteica con boloñesa de pavo",
    category: "lunch",
    kcal: 570,
    protein: 40,
    items: [
      { ing: "calabacin", qty: 0.5 },
      { ing: "zanahoria", qty: 1 },
      { ing: "pasta", qty: 90 },
      { ing: "pavopicado", qty: 130 },
      { ing: "tomatetrit", qty: 150 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "quesorallado", qty: 15 }
    ],
    prep: "Boloñesa: pavo + cebolla + tomate triturado con orégano. Mezcla con la pasta y termina con el queso."
  },
  c_lentejas: {
    id: "c_lentejas",
    name: "Lentejas estofadas con verduras",
    category: "lunch",
    kcal: 520,
    protein: 28,
    items: [
      { ing: "lentejas", qty: 300 },
      { ing: "patata", qty: 100 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "tomatetrit", qty: 100 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Sofrito de cebolla, locote y tomate; añade lentejas de bote y papa cocida. 10 min y plato de cuchara listo."
  },
  c_ensaladagarb: {
    id: "c_ensaladagarb",
    name: "Ensalada de garbanzos con atún y aguacate",
    category: "lunch",
    kcal: 540,
    protein: 32,
    items: [
      { ing: "garbanzos", qty: 250 },
      { ing: "atun", qty: 84 },
      { ing: "aguacate", qty: 0.5 },
      { ing: "tomate", qty: 1 },
      { ing: "ensalada", qty: 100 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Todo al bol: garbanzos escurridos, atún, aguacate y tomate en dados sobre la ensalada. Aliña y mezcla."
  },
  c_bowlquinoa: {
    id: "c_bowlquinoa",
    name: "Bol de quinoa con pollo y verduras asadas",
    category: "lunch",
    kcal: 550,
    protein: 42,
    items: [
      { ing: "quinoa", qty: 70 },
      { ing: "pollo", qty: 150 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Quinoa cocida 12 min. Pollo y verduras a la plancha con especias. Móntalo en bol con un chorrito de aceite y limón."
  },
  c_arrozpavo: {
    id: "c_arrozpavo",
    name: "Arroz salteado estilo wok con pavo y verduras",
    category: "lunch",
    kcal: 550,
    protein: 38,
    items: [
      { ing: "arroz", qty: 80 },
      { ing: "pavopicado", qty: 130 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "cebolla", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Saltea pavo con las verduras, añade el arroz cocido y un toque de soja. Estilo wok en 10 min."
  },

  /* ---------- Cenas ---------- */
  n_raviolis: {
    id: "n_raviolis",
    name: "Raviolis de zapallito rellenos de pavo y queso",
    category: "dinner",
    kcal: 400,
    protein: 33,
    items: [
      { ing: "calabacin", qty: 1 },
      { ing: "pavopicado", qty: 120 },
      { ing: "quesorallado", qty: 25 },
      { ing: "tomatetrit", qty: 100 },
      { ing: "cebolla", qty: 0.25 }
    ],
    prep: "Láminas finas de zapallito (pelador), rellena con pavo salteado, cierra en paquetitos, tomate y queso por encima y gratina 10 min."
  },
  n_burger: {
    id: "n_burger",
    name: "Hamburguesa casera fit con pan integral",
    category: "dinner",
    kcal: 460,
    protein: 38,
    items: [
      { ing: "pavopicado", qty: 150 },
      { ing: "pan", qty: 60 },
      { ing: "ensalada", qty: 50 },
      { ing: "tomate", qty: 0.5 },
      { ing: "cebolla", qty: 0.25 },
      { ing: "quesorallado", qty: 15 }
    ],
    prep: "Forma la burger con el pavo especiado (ajo, pimentón, perejil) y plancha. Monta con pan tostado, verduras y queso fundido."
  },
  n_merluza: {
    id: "n_merluza",
    name: "Merluza en papillote con verduras y papa",
    category: "dinner",
    kcal: 420,
    protein: 33,
    items: [
      { ing: "merluza", qty: 150 },
      { ing: "calabacin", qty: 0.5 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "patata", qty: 150 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Papel de horno: merluza + verduras en juliana + papa en rodajas finas, cierra el paquete y 15 min a 200 ºC."
  },
  n_gambas: {
    id: "n_gambas",
    name: "Salteado de camarones con arroz y verduras",
    category: "dinner",
    kcal: 430,
    protein: 30,
    items: [
      { ing: "gambas", qty: 125 },
      { ing: "arroz", qty: 60 },
      { ing: "brocoli", qty: 100 },
      { ing: "pimiento", qty: 0.5 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Wok: camarones con ajo, añade verduras y el arroz cocido. Toque de soja y listo en 10 min."
  },
  n_tortillaverde: {
    id: "n_tortillaverde",
    name: "Tortilla de espinacas, champiñones y queso con pan",
    category: "dinner",
    kcal: 420,
    protein: 26,
    items: [
      { ing: "quesofresco", qty: 50 },
      { ing: "huevo", qty: 2 },
      { ing: "espinacas", qty: 100 },
      { ing: "champinones", qty: 100 },
      { ing: "pan", qty: 40 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Saltea champiñones y espinacas, añade los huevos batidos y cuaja. Acompaña con pan tostado."
  },
  n_wrap: {
    id: "n_wrap",
    name: "Wrap integral de pollo con verduras y salsa de yogur",
    category: "dinner",
    kcal: 440,
    protein: 38,
    items: [
      { ing: "tortillawrap", qty: 1 },
      { ing: "pollo", qty: 130 },
      { ing: "ensalada", qty: 100 },
      { ing: "tomate", qty: 0.5 },
      { ing: "yogurgriego", qty: 0.5 }
    ],
    prep: "Pollo a tiras a la plancha, monta el wrap con las verduras y salsa de yogur con limón y especias."
  },
  n_cremacalabaza: {
    id: "n_cremacalabaza",
    name: "Crema de zapallo con pollo, huevo y toppings crujientes",
    category: "dinner",
    kcal: 400,
    protein: 20,
    items: [
      { ing: "pollo", qty: 110 },
      { ing: "calabaza", qty: 300 },
      { ing: "patata", qty: 100 },
      { ing: "huevo", qty: 2 },
      { ing: "pan", qty: 30 },
      { ing: "aove", qty: 8 }
    ],
    prep: "Cuece zapallo y papa, tritura con un chorrito de aceite. Toppings: huevo duro troceado y picatostes dorados en sartén."
  },

  /* ---------- Snacks ---------- */
  s_mugcake: {
    id: "s_mugcake",
    name: "Mugcake fit de chocolate y banana",
    category: "snack",
    kcal: 240,
    protein: 12,
    items: [
      { ing: "avena", qty: 30 },
      { ing: "huevo", qty: 1 },
      { ing: "platano", qty: 0.5 },
      { ing: "cacao", qty: 8 }
    ],
    prep: "Tritura todo, vierte en taza y 2 min al microondas. Bizcocho de chocolate saludable al momento."
  },
  s_yogurnueces: {
    id: "s_yogurnueces",
    name: "Yogur griego con nueces y miel",
    category: "snack",
    kcal: 210,
    protein: 10,
    items: [
      { ing: "yogurgriego", qty: 1 },
      { ing: "nueces", qty: 10 },
      { ing: "miel", qty: 5 }
    ],
    prep: "Yogur con las nueces troceadas y un hilo de miel. Simple y saciante."
  },
  s_manzanacacahuete: {
    id: "s_manzanacacahuete",
    name: "Manzana con mantequilla de maní",
    category: "snack",
    kcal: 180,
    protein: 6,
    items: [
      { ing: "manzana", qty: 1 },
      { ing: "cremacacahuete", qty: 15 }
    ],
    prep: "Manzana en gajos para mojar en la mantequilla de maní."
  },
  s_batidorojo: {
    id: "s_batidorojo",
    name: "Batido de queso fresco con frutos rojos",
    category: "snack",
    kcal: 160,
    protein: 16,
    items: [
      { ing: "quesobatido", qty: 200 },
      { ing: "frutosrojos", qty: 75 }
    ],
    prep: "Mezcla en bol o tritura como batido. Alto en proteína, perfecto post-entreno."
  }
};

export interface DayMenu {
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export const WEEK_MENU: DayMenu[] = [
  { breakfast: "d_gachas", lunch: "c_curry", dinner: "n_tortillaverde", snack: "s_yogurnueces" },
  { breakfast: "d_tostavo", lunch: "c_lentejas", dinner: "n_raviolis", snack: "s_batidorojo" },
  { breakfast: "d_bowlyogur", lunch: "c_bolonesa", dinner: "n_merluza", snack: "s_manzanacacahuete" },
  { breakfast: "d_tortitas", lunch: "c_ensaladagarb", dinner: "n_burger", snack: "s_batidorojo" },
  { breakfast: "d_gachas", lunch: "c_bowlquinoa", dinner: "n_gambas", snack: "s_mugcake" },
  { breakfast: "d_tostavo", lunch: "c_salmon", dinner: "n_cremacalabaza", snack: "s_yogurnueces" },
  { breakfast: "d_bowlyogur", lunch: "c_fajitas", dinner: "n_wrap", snack: "s_manzanacacahuete" }
];

export const DAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

/* ─────────────────────────────────────────────────────────────────────────────
   MACROS REALES + REPARTO DE COMIDAS DEL DÍA
   ───────────────────────────────────────────────────────────────────────────── */

export type MealSlotKey = "breakfast" | "lunch" | "snack" | "dinner";

export const MEAL_LABELS: Record<MealSlotKey, string> = {
  breakfast: "Desayuno",
  lunch: "Almuerzo",
  snack: "Snack",
  dinner: "Cena"
};

export const MEAL_EMOJI: Record<MealSlotKey, string> = {
  breakfast: "🍳",
  lunch: "🍛",
  snack: "🍎",
  dinner: "🌙"
};

/**
 * Cómo se reparten las calorías del día entre comidas.
 * Si no desayunas, ese 25% NO se pierde: se reparte en almuerzo y cena, que
 * es justo lo que hace la gente que come por primera vez al mediodía.
 */
export const SPLIT_WITH_BREAKFAST: Record<MealSlotKey, number> = {
  breakfast: 0.2,
  lunch: 0.35,
  snack: 0.15,
  dinner: 0.3
};

export const SPLIT_NO_BREAKFAST: Record<MealSlotKey, number> = {
  breakfast: 0,
  lunch: 0.4,
  snack: 0.2,
  dinner: 0.4
};

export function splitFor(eatsBreakfast: boolean): Record<MealSlotKey, number> {
  return eatsBreakfast ? SPLIT_WITH_BREAKFAST : SPLIT_NO_BREAKFAST;
}

export function activeSlots(eatsBreakfast: boolean): MealSlotKey[] {
  return eatsBreakfast ? ["breakfast", "lunch", "snack", "dinner"] : ["lunch", "snack", "dinner"];
}

/** Macros de UNA ración base del plato, calculados desde sus ingredientes. */
export function mealMacrosBase(mealId: string): Macros {
  const meal = MEALS[mealId];
  if (!meal) return { ...ZERO_MACROS };
  let total: Macros = { ...ZERO_MACROS };
  for (const item of meal.items) {
    const ing = INGREDIENTS[item.ing];
    if (!ing) continue;
    total = addMacros(total, macrosOf(item.ing, item.qty, ing.unit));
  }
  return total;
}

/**
 * Factor de ración de un plato para TI: ajusta la receta base para que aporte
 * las kcal que te tocan en esa comida del día (según tu objetivo y si desayunas).
 */
export function servingFactor(mealId: string, slot: MealSlotKey, targetKcal: number, eatsBreakfast: boolean): number {
  const base = mealMacrosBase(mealId);
  if (base.kcal <= 0) return 1;
  const share = splitFor(eatsBreakfast)[slot];
  if (share <= 0) return 0;
  return Math.min(2.2, Math.max(0.5, (targetKcal * share) / base.kcal));
}

/** Macros del plato ya ajustados a tu ración. */
export function mealMacrosFor(mealId: string, slot: MealSlotKey, targetKcal: number, eatsBreakfast: boolean): Macros {
  return roundMacros(scaleMacros(mealMacrosBase(mealId), servingFactor(mealId, slot, targetKcal, eatsBreakfast)));
}

/* ─────────────────────────────────────────────────────────────────────────────
   MENÚ DEL DÍA: comida libre del finde + snack que cuadra los macros
   ───────────────────────────────────────────────────────────────────────────── */

export interface DayPlan {
  menu: DayMenu;
  slots: MealSlotKey[];
  cheatSlot: MealSlotKey | null; // qué comida es la libre (si aplica)
  /** Factor de ración de cada comida (el del snack se ajusta para cuadrar macros). */
  factors: Record<MealSlotKey, number>;
  totals: Macros;
  deviation: { kcal: number; protein: number; carbs: number; fat: number }; // % vs objetivo
}

/** ¿Toca comida libre? Solo sábado/domingo y si está activada. */
export function isCheatDay(dayIdx: number, cheatEnabled: boolean): boolean {
  return cheatEnabled && (dayIdx === 5 || dayIdx === 6); // 5 = sábado, 6 = domingo
}

function macrosOfDay(menu: DayMenu, slots: MealSlotKey[], kcal: number, eatsBreakfast: boolean): Macros {
  let t: Macros = { ...ZERO_MACROS };
  for (const k of slots) t = addMacros(t, mealMacrosFor(menu[k], k, kcal, eatsBreakfast));
  return t;
}

/**
 * Construye el menú del día:
 * 1. Si es finde con cheat day activo, cambia una comida principal por una
 *    comida libre controlada (pizza proteica, hamburguesa doble, costillas BBQ).
 * 2. Elige el SNACK que deja los macros del día lo más cerca posible del
 *    objetivo (esa es su función: cuadrar la cuenta, no rellenar).
 */
/**
 * Referencia de la pareja: fija QUÉ se cocina para que los dos coman el mismo
 * plato. Cada uno ajusta solo el tamaño de su ración.
 */
export interface RefPareja {
  targets: { kcal: number; protein_g: number; carbs_g: number; fat_g: number };
  eatsBreakfast: boolean;
}

/** Busca plato de snack + ración que mejor cierran el día. */
function ajustarSnack(
  fixed: Macros,
  poolIds: string[],
  targets: { kcal: number; protein_g: number; carbs_g: number; fat_g: number },
  fallbackId: string,
  /** Snack que propone el menú de la semana: se respeta salvo que descuadre. */
  sugerido?: string
): { id: string; factor: number } {
  let bestId = fallbackId;
  let bestFactor = 1;
  let bestScore = Infinity;
  for (const id of poolIds) {
    const base = mealMacrosBase(id);
    if (base.kcal <= 0) continue;
    /**
     * Sin esto el optimizador acaba proponiendo SIEMPRE el mismo snack, el que
     * cuadra mejor, y comes helado proteico seis días de siete. La penalización
     * hace que solo se aparte de lo que propone el menú si de verdad merece la
     * pena. Variedad primero; los macros ya se ajustan con la ración.
     */
    const penal = sugerido && id !== sugerido ? 1.2 : 0;
    for (let f = 0.5; f <= 2.01; f += 0.1) {
      const t = addMacros(fixed, scaleMacros(base, f));
      const score = penal +
        4 * Math.abs(t.protein - targets.protein_g) / Math.max(1, targets.protein_g) +
        3 * Math.abs(t.kcal - targets.kcal) / Math.max(1, targets.kcal) +
        Math.abs(t.carbs - targets.carbs_g) / Math.max(1, targets.carbs_g) +
        Math.abs(t.fat - targets.fat_g) / Math.max(1, targets.fat_g);
      if (score < bestScore) {
        bestScore = score;
        bestId = id;
        bestFactor = Math.round(f * 10) / 10;
      }
    }
  }
  return { id: bestId, factor: bestFactor };
}

/** Qué snack elegiría la referencia de la pareja: ese es el que se cocina. */
function elegirSnack(
  menu: DayMenu,
  slotsTodos: MealSlotKey[],
  targets: { kcal: number; protein_g: number; carbs_g: number; fat_g: number },
  eatsBreakfast: boolean,
  _cheatEnabled: boolean,
  _dayIdx: number,
  _semana: number
): { id: string; factor: number } {
  const slots = activeSlots(eatsBreakfast);
  let fixed: Macros = { ...ZERO_MACROS };
  for (const k of slots) {
    if (k === "snack") continue;
    const f = servingFactor(menu[k], k, targets.kcal, eatsBreakfast);
    fixed = addMacros(fixed, scaleMacros(mealMacrosBase(menu[k]), f));
  }
  const pool = Object.values(MEALS).filter((m) => m.category === "snack").map((m) => m.id);
  return ajustarSnack(fixed, pool, targets, menu.snack, menu.snack);
}

export function buildDayPlan(
  dayIdx: number,
  targets: { kcal: number; protein_g: number; carbs_g: number; fat_g: number },
  eatsBreakfast: boolean,
  cheatEnabled = false,
  /** Platos que has cambiado tú a mano: mandan sobre la sugerencia. */
  swaps: Partial<Record<MealSlotKey, string>> = {},
  referencia?: RefPareja
): DayPlan {
  return buildDayPlanDeSemana(0, dayIdx, targets, eatsBreakfast, cheatEnabled, swaps, referencia);
}

/**
 * Igual que `buildDayPlan`, pero mirando N semanas por delante del ciclo.
 * Lo usa la lista de la compra cuando compras 2, 3 o 4 semanas de golpe.
 */
export function buildDayPlanDeSemana(
  semanasAdelante: number,
  dayIdx: number,
  targets: { kcal: number; protein_g: number; carbs_g: number; fat_g: number },
  eatsBreakfast: boolean,
  cheatEnabled = false,
  swaps: Partial<Record<MealSlotKey, string>> = {},
  /** Si comen juntos, el plato lo decide la referencia y no cada uno. */
  referencia?: RefPareja
): DayPlan {
  const semana = (currentCycleWeek() + semanasAdelante) % MENU_CYCLE.length;
  const base = MENU_CYCLE[semana][dayIdx];
  const slots = activeSlots(eatsBreakfast);
  const menu: DayMenu = { ...base };
  let cheatSlot: MealSlotKey | null = null;

  if (isCheatDay(dayIdx, cheatEnabled)) {
    // Domingo -> almuerzo libre; sábado -> cena libre
    cheatSlot = dayIdx === 6 ? "lunch" : "dinner";
    const pool = CHEAT_MEALS[cheatSlot as "lunch" | "dinner"];
    menu[cheatSlot] = pool[dayIdx % pool.length];
  }

  // Tus cambios manuales tienen la última palabra
  for (const k of slots) {
    const chosen = swaps[k];
    if (chosen && MEALS[chosen]) {
      menu[k] = chosen;
      if (cheatSlot === k) cheatSlot = null;
    }
  }

  // Factores base de las comidas principales
  const factors = {} as Record<MealSlotKey, number>;
  for (const k of slots) factors[k] = servingFactor(menu[k], k, targets.kcal, eatsBreakfast);

  // Macros de todo menos el snack (eso es lo que el snack tiene que compensar)
  let fixed: Macros = { ...ZERO_MACROS };
  for (const k of slots) {
    if (k === "snack") continue;
    fixed = addMacros(fixed, scaleMacros(mealMacrosBase(menu[k]), factors[k]));
  }

  /**
   * El snack cierra la cuenta: se busca la combinación de plato + tamaño de
   * ración que deja el día lo más cerca posible del objetivo. Prioriza
   * proteína (lo crítico en recomposición) y calorías.
   *
   * OJO: el PLATO tiene que ser el mismo para los dos (cocinan una vez); lo
   * que cambia es la RACIÓN. Por eso, si hay referencia de pareja, primero se
   * elige el snack con ella y después cada uno ajusta solo su factor.
   */
  let poolIds: string[];
  if (swaps.snack && MEALS[swaps.snack]) {
    poolIds = [swaps.snack]; // lo elegiste tú a mano
  } else if (referencia) {
    poolIds = [elegirSnack(menu, slots, referencia.targets, referencia.eatsBreakfast, cheatEnabled, dayIdx, semana).id];
  } else {
    poolIds = Object.values(MEALS).filter((m) => m.category === "snack").map((m) => m.id);
  }

  const { id: bestId, factor: bestFactor } = ajustarSnack(fixed, poolIds, targets, menu.snack, base.snack);
  menu.snack = bestId;
  factors.snack = bestFactor;

  const totals = roundMacros(addMacros(fixed, scaleMacros(mealMacrosBase(bestId), bestFactor)));
  const pct = (a: number, b: number) => Math.round(((a - b) / Math.max(1, b)) * 1000) / 10;
  return {
    menu,
    slots,
    cheatSlot,
    factors,
    totals,
    deviation: {
      kcal: pct(totals.kcal, targets.kcal),
      protein: pct(totals.protein, targets.protein_g),
      carbs: pct(totals.carbs, targets.carbs_g),
      fat: pct(totals.fat, targets.fat_g)
    }
  };
}

/**
 * Alternativas para cambiar una comida. Devuelve el recetario de esa categoría
 * ordenado por parecido calórico al plato sugerido, para que el cambio no te
 * descuadre el día. Nada es obligatorio: puedes elegir cualquiera.
 */
export function alternativesFor(slot: MealSlotKey, currentId: string): Meal[] {
  const cat: MealCategory = slot === "snack" ? "snack" : (slot as MealCategory);
  const current = mealMacrosBase(currentId);
  return Object.values(MEALS)
    .filter((m) => m.category === cat && m.id !== currentId)
    .sort((a, b) => {
      const da = Math.abs(mealMacrosBase(a.id).kcal - current.kcal);
      const db = Math.abs(mealMacrosBase(b.id).kcal - current.kcal);
      return da - db;
    });
}

/** Cantidad de un ingrediente ya ajustada a tu ración, con nota crudo/cocido. */
export function itemQtyFor(item: MealItem, factor: number): { qty: number; unit: IngUnit; note: string } {
  const ing = INGREDIENTS[item.ing];
  const qty = scaleQty(item.qty, factor, ing.unit, item.ing);
  const n = NUTRITION[item.ing];
  return { qty, unit: ing.unit, note: n ? WEIGH_LABEL[n.weighAs] : "" };
}

/* ---------- Ampliación: semanas 5-8 (recipesData.ts) ---------- */
// Fusión automática: las nuevas recetas e ingredientes entran al recetario,
// al buscador y a la lista de la compra sin tocar nada en Supabase.
Object.assign(INGREDIENTS, NEW_INGREDIENTS, CARN_INGREDIENTS, GOURMET_INGREDIENTS);
Object.assign(MEALS, NEW_MEALS, CARN_MEALS, GOURMET_MEALS);

/** Ciclo de 8 semanas equilibradas (res/pollo de base, pescado ocasional). */
export const MENU_CYCLE: DayMenu[][] = MENU_WEEKS;

/**
 * Semana ISO en la que arrancó el plan. Es un dato de LA PAREJA, no del
 * teléfono: si cada móvil guarda el suyo, uno va por la semana 3 y el otro
 * por la 6, y entonces ni la cena ni la compra coinciden. Lo escribe el
 * store al sincronizar con Supabase.
 */
let PLAN_INICIO: number | null = null;

/** Lo llama el store con el valor compartido que viene de la nube. */
export function setPlanInicio(semanaIso: number | null): void {
  PLAN_INICIO = semanaIso;
}

/** Semana ISO de hoy, para que el store pueda guardar el arranque. */
export function semanaIsoDeHoy(): number {
  return isoWeekNumber();
}

/**
 * Semana del ciclo (0..7). Cuenta desde la semana en que empezasteis el plan,
 * no desde el calendario: si arrancáis hoy, estáis en la Semana 1.
 * Al terminar las 8 vuelve a la 1 con los mismos menús.
 */
export function currentCycleWeek(): number {
  // Sin dato compartido todavía (primer arranque o sin conexión) el ciclo
  // empieza en la semana 1 de este calendario, igual en los dos móviles.
  const inicio = PLAN_INICIO ?? 0;
  const dif = isoWeekNumber() - inicio;
  return ((dif % MENU_CYCLE.length) + MENU_CYCLE.length) % MENU_CYCLE.length;
}

/** Menú activo de esta semana (rota solo, según la semana ISO del año). */
export function getCurrentWeekMenu(): DayMenu[] {
  return MENU_CYCLE[currentCycleWeek()];
}

const BASE_KCAL = 1800;

/** Factor de escala de raciones según objetivo calórico del perfil. */
export function kcalFactor(targetKcal: number): number {
  return Math.min(1.45, Math.max(0.75, targetKcal / BASE_KCAL));
}

/**
 * Ingredientes que solo tienen sentido en piezas enteras: no se cocina medio
 * huevo ni tres cuartos de tortilla.
 */
const SOLO_ENTEROS = new Set(["huevo", "tortillawrap", "tortillamaiz", "yogurgriego"]);

export function scaleQty(qty: number, factor: number, unit: IngUnit, ing?: string): number {
  const v = qty * factor;
  if (unit === "ud") {
    if (ing && SOLO_ENTEROS.has(ing)) return Math.max(1, Math.round(v)); // piezas enteras
    return Math.round(v * 2) / 2; // medias unidades: media cebolla, medio locote
  }
  return Math.round(v / 5) * 5; // redondeo a 5 g/ml
}

/**
 * Para la LISTA DE LA COMPRA: en el súper compras piezas enteras, así que las
 * unidades se redondean hacia arriba. Nadie compra 1,25 aguacates.
 */
export function qtyParaComprar(qty: number, unit: IngUnit): number {
  if (unit === "ud") return Math.ceil(qty - 0.001);
  return Math.round(qty / 5) * 5;
}

export interface ShoppingItem {
  ingredient: Ingredient;
  totalQty: number;
  packs: number;
  estPrice: number;
}

/** Lista de la compra COMPARTIDA de la semana: suma los menús de ambos. */
export function buildShoppingList(
  eaters: {
    /** Objetivo diario completo: hace falta para calcular las mismas raciones
     *  que ves en Nutrición (el snack se ajusta para cuadrar macros). */
    targets: { kcal: number; protein_g: number; carbs_g: number; fat_g: number };
    eatsBreakfast: boolean;
    cheat?: boolean;
    /** Referencia de la pareja: cocinan el mismo plato, distinta ración. */
    ref?: RefPareja;
  }[],
  /** Platos que han cambiado, por fecha: "YYYY-MM-DD|comida" -> plato. */
  swaps: Record<string, string> = {},
  /** Lunes de la semana que se compra (para casar los cambios con su día). */
  weekStart?: Date,
  /** Cuántas semanas se compran de una vez (1 a 4), para no ir cada semana. */
  semanas = 1
): ShoppingItem[] {
  const totals: Record<string, number> = {};
  // Varias semanas: se encadenan los menús siguientes del ciclo, así compras lo
  // que de verdad vas a cocinar cada semana y no cuatro veces lo mismo.
  const inicio = currentCycleWeek();
  const week: DayMenu[] = [];
  for (let w = 0; w < Math.max(1, semanas); w++) {
    week.push(...MENU_CYCLE[(inicio + w) % MENU_CYCLE.length]);
  }
  // Solo los platos que TÚ has cambiado a mano: el resto (incluida la comida
  // libre del finde) lo decide el planificador, igual que en Nutrición.
  const cambios = week.map((_, i) => {
    const out: Partial<Record<MealSlotKey, string>> = {};
    if (!weekStart) return out;
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i); // i avanza también entre semanas
    const iso = d.toISOString().slice(0, 10);
    for (const k of ["breakfast", "lunch", "snack", "dinner"] as MealSlotKey[]) {
      const chosen = swaps[`${iso}|${k}`];
      if (chosen && MEALS[chosen]) out[k] = chosen;
    }
    return out;
  });
  for (const eater of eaters) {
    cambios.forEach((swapsDia, i) => {
      const dayIdx = i % 7; // día de la semana, aunque compres varias semanas
      // Se usa EXACTAMENTE el mismo planificador que ves en Nutrición: así lo
      // que compras es lo que vas a cocinar, sin sobrantes ni faltantes.
      const plan = buildDayPlanDeSemana(
        Math.floor(i / 7),
        dayIdx,
        eater.targets,
        eater.eatsBreakfast,
        eater.cheat ?? false,
        swapsDia,
        eater.ref
      );
      for (const slotKey of plan.slots) {
        const mealId = plan.menu[slotKey];
        const meal = MEALS[mealId];
        if (!meal) continue;
        const f = plan.factors[slotKey];
        if (!f || f <= 0) continue;
        for (const item of meal.items) {
          const unit = INGREDIENTS[item.ing].unit;
          totals[item.ing] = (totals[item.ing] ?? 0) + scaleQty(item.qty, f, unit, item.ing);
        }
      }
    });
  }
  return Object.entries(totals).map(([id, bruto]) => {
    const ingredient = INGREDIENTS[id];
    // En el súper se compran piezas enteras
    const totalQty = qtyParaComprar(bruto, ingredient.unit);
    const packs = Math.max(1, Math.ceil(totalQty / ingredient.packSize));
    return {
      ingredient,
      totalQty: Math.round(totalQty * 10) / 10,
      packs,
      /**
       * Coste de lo que REALMENTE consumís esa semana, no del pack entero:
       * el aceite, las especias o la proteína en polvo duran meses, así que
       * cobrar el bote completo cada semana infla el total sin sentido.
       * `packs` sigue indicando cuántos envases llevar del súper.
       */
      estPrice: Math.round(((totalQty / ingredient.packSize) * ingredient.packPrice) / 100) * 100
    };
  });
}

/** Guaraníes con separador de miles: 1.234.500 Gs */
export function formatGs(v: number): string {
  return `${Math.round(v).toLocaleString("es-PY")} Gs`;
}

export function formatQty(qty: number, unit: IngUnit): string {
  if (unit === "ud") return `${qty} ud`;
  if (qty >= 1000) return `${Math.round(qty / 100) / 10} ${unit === "g" ? "kg" : "L"}`;
  return `${qty} ${unit}`;
}

import {
  NUTRITION,
  WEIGH_LABEL,
  ZERO_MACROS,
  addMacros,
  macrosOf,
  roundMacros,
  scaleMacros,
  type Macros
} from "./nutrition";
import { CARN_INGREDIENTS, CARN_MEALS } from "./carnivoro";
import { CHEAT_MEALS, GOURMET_INGREDIENTS, GOURMET_MEALS } from "./gourmet";
import { MENU_WEEKS } from "./menus";
import { NEW_INGREDIENTS, NEW_MEALS } from "./recipesData";
import { isoWeekNumber } from "./workouts";
