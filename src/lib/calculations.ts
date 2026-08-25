import type { Activity, Goal, MacroTargets, Profile, Sex } from "./types";

/**
 * Motor de cálculo nutricional de Fit.
 *
 * Decisiones metodológicas:
 * 1. % graso estimado con RFM (Relative Fat Mass, Woolcott & Bergman 2018),
 *    que solo necesita estatura y cintura y supera al IMC en precisión.
 * 2. Si hay cintura -> BMR con Katch-McArdle (usa masa magra: ideal para
 *    recomposición). Si no -> Mifflin-St Jeor (el estándar clínico).
 * 3. Déficit moderado y sostenible: -20% para pérdida de grasa, -10% para
 *    recomposición. Suelos de seguridad: 1200 kcal (F) / 1500 kcal (M).
 * 4. Proteína alta para preservar músculo en déficit (1.8-2.2 g/kg),
 *    grasa mínima saludable (0.8 g/kg) y el resto carbohidratos.
 */

const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725
};

export const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: "Sedentario (oficina, poco movimiento)",
  light: "Ligero (caminas a diario, 1-2 entrenos/sem)",
  moderate: "Moderado (3-4 entrenos/sem)",
  high: "Alto (5+ entrenos o trabajo físico)"
};

/** RFM: estimación de % graso a partir de estatura y cintura. */
export function estimateBodyFat(sex: Sex, heightCm: number, waistCm?: number | null): number | null {
  if (!waistCm || waistCm <= 0) return null;
  const ratio = heightCm / waistCm;
  const rfm = sex === "M" ? 64 - 20 * ratio : 76 - 20 * ratio;
  if (rfm < 4 || rfm > 55) return null; // fuera de rango plausible -> descartar
  return Math.round(rfm * 10) / 10;
}

export function calcBMR(p: Pick<Profile, "sex" | "age" | "height_cm" | "weight_kg" | "waist_cm">): {
  bmr: number;
  bodyfat: number | null;
  formula: MacroTargets["formula"];
} {
  const bodyfat = estimateBodyFat(p.sex, p.height_cm, p.waist_cm);
  if (bodyfat !== null) {
    const leanMass = p.weight_kg * (1 - bodyfat / 100);
    return { bmr: Math.round(370 + 21.6 * leanMass), bodyfat, formula: "katch-mcardle" };
  }
  const base = 10 * p.weight_kg + 6.25 * p.height_cm - 5 * p.age;
  const bmr = p.sex === "M" ? base + 5 : base - 161;
  return { bmr: Math.round(bmr), bodyfat: null, formula: "mifflin-st-jeor" };
}

export function calcTargets(p: Profile): MacroTargets {
  const { bmr, bodyfat, formula } = calcBMR(p);
  const tdee = Math.round(bmr * ACTIVITY_FACTORS[p.activity]);

  const deficit = p.goal === "fatloss" ? 0.8 : 0.9;
  const floor = p.sex === "F" ? 1200 : 1500;
  const kcal = Math.max(floor, Math.round((tdee * deficit) / 10) * 10);

  // Proteína por kg: más alta cuanto mayor el déficit; capada si hay obesidad
  // (en BF alto se usa un peso de referencia para no sobreestimar).
  const refWeight =
    bodyfat !== null && bodyfat > 32 ? (p.weight_kg * (1 - bodyfat / 100)) / 0.75 : p.weight_kg;
  const proteinPerKg = p.goal === "fatloss" ? 2.0 : 1.8;
  const protein_g = Math.round(refWeight * proteinPerKg);

  const fat_g = Math.max(40, Math.round(refWeight * 0.8));
  const carbs_g = Math.max(50, Math.round((kcal - protein_g * 4 - fat_g * 9) / 4));

  return { kcal, protein_g, carbs_g, fat_g, bmr, tdee, bodyfat_pct: bodyfat, formula };
}

/** Ratio cintura/estatura: indicador simple de riesgo (objetivo < 0.5). */
export function waistHeightRatio(waistCm?: number | null, heightCm?: number): number | null {
  if (!waistCm || !heightCm) return null;
  return Math.round((waistCm / heightCm) * 100) / 100;
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysUntil(dateISO: string): number {
  const target = new Date(dateISO + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

/** Racha: nº de días consecutivos (terminando hoy o ayer) con entreno completado. */
/**
 * RACHA POR SEMANAS, no por días seguidos.
 *
 * El plan son N sesiones a la semana y tú eliges qué día hacer cada una: si
 * entrenas lunes, miércoles y sábado, una racha de días consecutivos se rompe
 * siempre y no mide nada. Esto cuenta cuántas semanas seguidas has cumplido
 * el objetivo, que es lo que de verdad hace el progreso.
 *
 * La semana en curso no rompe la racha si todavía vas a tiempo de cumplirla.
 */
export function computeWeeklyStreak(completedDates: string[], objetivo: number): number {
  if (objetivo <= 0) return 0;
  const porSemana = new Map<string, number>();
  for (const d of completedDates) {
    const k = mondayOf(new Date(d + "T12:00:00"));
    porSemana.set(k, (porSemana.get(k) ?? 0) + 1);
  }
  const hoy = new Date();
  const cursor = new Date(hoy);
  let racha = 0;

  // Semana en curso: solo cuenta si ya cumpliste; si no, se mira la anterior
  if ((porSemana.get(mondayOf(cursor)) ?? 0) >= objetivo) racha++;
  cursor.setDate(cursor.getDate() - 7);

  while ((porSemana.get(mondayOf(cursor)) ?? 0) >= objetivo) {
    racha++;
    cursor.setDate(cursor.getDate() - 7);
  }
  return racha;
}

function mondayOf(d: Date): string {
  const x = new Date(d);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  x.setHours(0, 0, 0, 0);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
}

export function computeStreak(completedDates: string[]): number {
  const set = new Set(completedDates);
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  // La racha no se rompe si hoy aún no has entrenado.
  if (!set.has(iso(day))) day.setDate(day.getDate() - 1);
  let streak = 0;
  while (set.has(iso(day))) {
    streak++;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

/**
 * REFERENCIA DE LA PAREJA.
 *
 * Comen juntos el 99% del tiempo: se cocina UN plato y cada uno se sirve su
 * ración. Para que el planificador no le proponga a cada uno un snack o una
 * cena distinta, el plato lo decide siempre el mismo perfil de referencia
 * (el de p1, y si no está, el primero). Las cantidades sí son de cada uno.
 */
export function refDePareja(profiles: Profile[]): { targets: MacroTargets; eatsBreakfast: boolean } | undefined {
  if (profiles.length < 2) return undefined;
  const ref = profiles.find((p) => p.slot === "p1") ?? profiles[0];
  return { targets: calcTargets(ref), eatsBreakfast: ref.eats_breakfast ?? true };
}

/**
 * ¿Toca comida libre? Es una decisión de la pareja, no de cada uno: si uno
 * tiene el finde libre activado, la cena del sábado es la misma para los dos.
 */
export function cheatDePareja(profiles: Profile[]): boolean {
  if (profiles.length === 0) return true;
  return profiles.some((p) => p.cheat_day ?? true);
}

/** Lunes de la semana en curso, en ISO (YYYY-MM-DD). */
export function mondayOfThisWeek(): string {
  const d = new Date();
  const dow = (d.getDay() + 6) % 7; // 0 = lunes
  d.setDate(d.getDate() - dow);
  d.setHours(0, 0, 0, 0);
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}
