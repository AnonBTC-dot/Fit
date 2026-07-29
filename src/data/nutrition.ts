/**
 * TABLA NUTRICIONAL POR INGREDIENTE
 *
 * Los macros de cada plato NO se escriben a mano: se calculan sumando sus
 * ingredientes. Así, cuando la ración se escala a tus calorías, los macros
 * escalan con ella y siempre cuadran.
 *
 * CONVENCIÓN DE PESOS (esto es lo que más se equivoca la gente):
 * - "crudo"  -> pésalo ANTES de cocinar (arroz, pasta, quinoa, carnes, pescado,
 *               patata, avena). Es el estándar: al cocer, el alimento absorbe
 *               agua y pesa 2-3x más, pero las calorías son las mismas.
 * - "cocido" -> el producto ya viene cocido de bote/lata (lentejas, garbanzos,
 *               maíz, atún escurrido).
 * - "tal cual" -> se pesa como se come (fruta, yogur, aceite, frutos secos).
 *
 * Valores por 100 g / 100 ml, o por unidad en los ingredientes con unit "ud".
 */

export type WeighAs = "crudo" | "cocido" | "tal cual";

export interface Nutrients {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  weighAs: WeighAs;
}

/** Por 100 g / 100 ml, salvo los "ud" que son por unidad (ver comentario). */
export const NUTRITION: Record<string, Nutrients> = {
  /* ── Despensa ── */
  avena: { kcal: 380, protein: 13, carbs: 60, fat: 7, weighAs: "crudo" },
  nueces: { kcal: 654, protein: 15, carbs: 14, fat: 65, weighAs: "tal cual" },
  cremacacahuete: { kcal: 600, protein: 25, carbs: 20, fat: 50, weighAs: "tal cual" },
  cacao: { kcal: 350, protein: 20, carbs: 15, fat: 12, weighAs: "tal cual" },
  miel: { kcal: 304, protein: 0, carbs: 82, fat: 0, weighAs: "tal cual" },
  pan: { kcal: 250, protein: 9, carbs: 41, fat: 3.5, weighAs: "tal cual" },
  tortillawrap: { kcal: 200, protein: 6, carbs: 32, fat: 5, weighAs: "tal cual" }, // por unidad (~62 g)
  arroz: { kcal: 350, protein: 7, carbs: 78, fat: 1, weighAs: "crudo" },
  pasta: { kcal: 350, protein: 13, carbs: 65, fat: 2, weighAs: "crudo" },
  quinoa: { kcal: 368, protein: 14, carbs: 64, fat: 6, weighAs: "crudo" },
  lentejas: { kcal: 116, protein: 9, carbs: 16, fat: 0.4, weighAs: "cocido" },
  garbanzos: { kcal: 140, protein: 8, carbs: 20, fat: 2.5, weighAs: "cocido" },
  tomatetrit: { kcal: 30, protein: 1.5, carbs: 5, fat: 0.3, weighAs: "tal cual" },
  atun: { kcal: 108, protein: 24, carbs: 0, fat: 1, weighAs: "cocido" },
  aove: { kcal: 900, protein: 0, carbs: 0, fat: 100, weighAs: "tal cual" },
  curry: { kcal: 325, protein: 14, carbs: 55, fat: 14, weighAs: "tal cual" },
  maiz: { kcal: 86, protein: 3, carbs: 19, fat: 1.2, weighAs: "cocido" },
  palomitasmaiz: { kcal: 380, protein: 11, carbs: 78, fat: 4, weighAs: "crudo" },

  /* ── Frescos (los "ud" son por unidad media) ── */
  platano: { kcal: 105, protein: 1.3, carbs: 27, fat: 0.4, weighAs: "tal cual" }, // ud ~120 g pelado
  manzana: { kcal: 95, protein: 0.5, carbs: 25, fat: 0.3, weighAs: "tal cual" }, // ud ~180 g
  aguacate: { kcal: 240, protein: 3, carbs: 12, fat: 22, weighAs: "tal cual" }, // ud ~150 g pulpa
  tomate: { kcal: 22, protein: 1, carbs: 4, fat: 0.2, weighAs: "tal cual" }, // ud ~120 g
  cebolla: { kcal: 44, protein: 1.2, carbs: 10, fat: 0.1, weighAs: "tal cual" }, // ud ~110 g
  pimiento: { kcal: 45, protein: 1.5, carbs: 9, fat: 0.3, weighAs: "tal cual" }, // ud ~150 g
  calabacin: { kcal: 34, protein: 2.4, carbs: 6, fat: 0.6, weighAs: "tal cual" }, // ud ~200 g
  pepino: { kcal: 30, protein: 1.3, carbs: 6, fat: 0.2, weighAs: "tal cual" }, // ud ~200 g
  zanahoria: { kcal: 33, protein: 0.7, carbs: 8, fat: 0.2, weighAs: "tal cual" }, // ud ~80 g
  ensalada: { kcal: 30, protein: 2, carbs: 4, fat: 0.4, weighAs: "tal cual" }, // bolsa ~200 g
  brocoli: { kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, weighAs: "crudo" },
  calabaza: { kcal: 26, protein: 1, carbs: 6, fat: 0.1, weighAs: "crudo" },
  champinones: { kcal: 22, protein: 3, carbs: 3, fat: 0.3, weighAs: "crudo" },
  patata: { kcal: 77, protein: 2, carbs: 17, fat: 0.1, weighAs: "crudo" },

  /* ── Proteínas ── */
  pollo: { kcal: 120, protein: 23, carbs: 0, fat: 2.6, weighAs: "crudo" },
  pavopicado: { kcal: 150, protein: 20, carbs: 0, fat: 8, weighAs: "crudo" },
  ternera: { kcal: 130, protein: 21, carbs: 0, fat: 5, weighAs: "crudo" },
  salmon: { kcal: 208, protein: 20, carbs: 0, fat: 13, weighAs: "crudo" },
  merluza: { kcal: 82, protein: 17, carbs: 0, fat: 1, weighAs: "crudo" },
  gambas: { kcal: 85, protein: 18, carbs: 0.5, fat: 1, weighAs: "crudo" },

  /* ── Lácteos y huevos ── */
  leche: { kcal: 46, protein: 3.2, carbs: 4.8, fat: 1.6, weighAs: "tal cual" },
  huevo: { kcal: 78, protein: 6.3, carbs: 0.6, fat: 5.3, weighAs: "tal cual" }, // ud talla L
  yogurgriego: { kcal: 130, protein: 5, carbs: 5, fat: 10, weighAs: "tal cual" }, // ud 125 g
  quesobatido: { kcal: 47, protein: 8, carbs: 4, fat: 0.2, weighAs: "tal cual" },
  quesorallado: { kcal: 280, protein: 30, carbs: 2, fat: 17, weighAs: "tal cual" },

  /* ── Congelados ── */
  frutosrojos: { kcal: 45, protein: 1, carbs: 8, fat: 0.4, weighAs: "tal cual" },
  espinacas: { kcal: 25, protein: 3, carbs: 1.5, fat: 0.4, weighAs: "crudo" }
};

/* Los ingredientes de la expansión carnívora se fusionan al cargar. */
import { CARN_NUTRITION } from "./carnivoro";
import { GOURMET_NUTRITION } from "./gourmet";
Object.assign(NUTRITION, CARN_NUTRITION, GOURMET_NUTRITION);

export interface Macros {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const ZERO_MACROS: Macros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

/** Macros de una cantidad concreta de un ingrediente. */
export function macrosOf(ingId: string, qty: number, unit: "g" | "ml" | "ud"): Macros {
  const n = NUTRITION[ingId];
  if (!n) return { ...ZERO_MACROS };
  // "ud" -> los valores ya son por unidad; g/ml -> valores por 100
  const f = unit === "ud" ? qty : qty / 100;
  return { kcal: n.kcal * f, protein: n.protein * f, carbs: n.carbs * f, fat: n.fat * f };
}

export function addMacros(a: Macros, b: Macros): Macros {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat
  };
}

export function scaleMacros(m: Macros, f: number): Macros {
  return { kcal: m.kcal * f, protein: m.protein * f, carbs: m.carbs * f, fat: m.fat * f };
}

export function roundMacros(m: Macros): Macros {
  return {
    kcal: Math.round(m.kcal),
    protein: Math.round(m.protein),
    carbs: Math.round(m.carbs),
    fat: Math.round(m.fat)
  };
}

export const WEIGH_LABEL: Record<WeighAs, string> = {
  crudo: "en crudo",
  cocido: "ya cocido",
  "tal cual": ""
};
