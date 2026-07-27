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
