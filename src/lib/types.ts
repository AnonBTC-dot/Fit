export type Slot = "p1" | "p2";
export type Sex = "M" | "F";
export type Activity = "sedentary" | "light" | "moderate" | "high";
export type Goal = "fatloss" | "recomp";
export type Venue = "home" | "gym";
export type DaysPerWeek = 3 | 4 | 5;

export interface Profile {
  id?: string;
  slot: Slot;
  name: string;
  sex: Sex;
  age: number;
  height_cm: number;
  weight_kg: number;
  waist_cm?: number | null;
  hip_cm?: number | null;
  activity: Activity;
  goal: Goal;
  venue: Venue;
  days_per_week: DaysPerWeek;
  /** false = primera comida al mediodía (las kcal se reparten entre las que sí comes). */
  eats_breakfast?: boolean;
  /** Comida libre controlada el fin de semana. */
  cheat_day?: boolean;
}

/** Un plato registrado como comido (el conteo diario se construye con esto). */
export interface IntakeEntry {
  id?: string;
  slot: Slot;
  date: string; // YYYY-MM-DD
  meal_id: string;
  servings: number; // 0.5 = media ración, 1 = ración completa, 1.5...
  kcal: number; // snapshot ya escalado
  protein: number;
  carbs: number;
  fat: number;
}

export interface Measurement {
  id?: string;
  slot: Slot;
  date: string; // YYYY-MM-DD
  weight_kg: number;
  waist_cm?: number | null;
  hip_cm?: number | null;
}

export interface WorkoutLog {
  id?: string;
  slot: Slot;
  date: string; // YYYY-MM-DD
  day_index: number;
  done_exercises: string[]; // ids "exIdx-setIdx"
  completed: boolean;
}

export interface CoupleSettings {
  wedding_date: string | null; // YYYY-MM-DD
  /** Semana ISO en la que la pareja arrancó el plan. Compartida: si no, cada
   *  móvil cae en una semana distinta del ciclo y el menú deja de coincidir. */
  plan_start_week: number | null;
}

export interface MacroTargets {
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  bmr: number;
  tdee: number;
  bodyfat_pct: number | null;
  formula: "katch-mcardle" | "mifflin-st-jeor";
}
