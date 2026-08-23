"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currentWeekKey, getSupabase } from "./supabase";
import type { CoupleSettings, IntakeEntry, Measurement, Profile, Slot, WorkoutLog } from "./types";

/**
 * Estado global con estrategia "local-first + write-through":
 * - Todo se persiste en localStorage -> la app abre al instante y funciona
 *   offline con los últimos datos conocidos.
 * - Cada escritura se envía a Supabase (base común de la pareja); al abrir o
 *   volver online se recarga del servidor -> los dos móviles quedan en sync.
 * - La lista de la compra además se suscribe por Realtime: si Pamela marca
 *   un ingrediente en el súper, a Leo se le tacha al instante.
 */

interface AppState {
  hydrated: boolean;
  mySlot: Slot | null; // quién soy YO en este dispositivo
  viewSlot: Slot; // qué perfil estoy viendo
  viewBoth: boolean; // ver los dos a la vez (cocinan juntos)
  profiles: Profile[];
  measurements: Measurement[];
  logs: WorkoutLog[];
  intake: IntakeEntry[]; // qué se ha comido (conteo diario)
  swaps: Record<string, string>; // "fecha|comida" -> plato elegido (COMPARTIDO por los dos)
  settings: CoupleSettings;
  checks: Record<string, boolean>; // lista de la compra de la semana actual

  chooseMe: (s: Slot) => void;
  setViewSlot: (s: Slot) => void;
  setViewBoth: (b: boolean) => void;
  loadFromServer: () => Promise<void>;
  saveProfile: (p: Profile) => Promise<void>;
  addMeasurement: (m: Measurement) => Promise<void>;
  upsertLog: (l: WorkoutLog) => Promise<void>;
  swapMeal: (date: string, mealSlot: string, mealId: string | null, by: Slot) => Promise<void>;
  addIntake: (e: IntakeEntry) => Promise<void>;
  removeIntake: (e: IntakeEntry) => Promise<void>;
  toggleCheck: (ingredientId: string) => Promise<void>;
  setWeddingDate: (date: string | null) => Promise<void>;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      mySlot: null,
      viewSlot: "p1",
      viewBoth: false,
      profiles: [],
      measurements: [],
      logs: [],
      intake: [],
      swaps: {},
      settings: { wedding_date: null },
      checks: {},

      chooseMe: (s) => set({ mySlot: s, viewSlot: s, viewBoth: false }),
      setViewSlot: (s) => set({ viewSlot: s, viewBoth: false }),
      setViewBoth: (b) => set({ viewBoth: b }),

      loadFromServer: async () => {
        const sb = getSupabase();
        if (!sb) return;
        try {
          const week = currentWeekKey();
          const [profiles, measurements, logs, intake, mealSwaps, settings, checks] = await Promise.all([
            sb.from("profiles").select("*").order("slot"),
            sb.from("measurements").select("*").order("date"),
            sb.from("workout_logs").select("*").order("date"),
            sb.from("intake_log").select("*").order("date"),
            sb.from("meal_swaps").select("*"),
            sb.from("couple_settings").select("*").maybeSingle(),
            sb.from("shopping_checks").select("*").eq("week", week)
          ]);
          const checkMap: Record<string, boolean> = {};
          for (const c of checks.data ?? []) checkMap[c.ingredient_id] = c.checked;
          set({
            profiles: (profiles.data as Profile[]) ?? [],
            measurements: (measurements.data as Measurement[]) ?? [],
            logs: (logs.data as WorkoutLog[]) ?? [],
            intake: (intake.data as IntakeEntry[]) ?? [],
            swaps: Object.fromEntries(
              ((mealSwaps.data as { date: string; meal_slot: string; meal_id: string }[]) ?? []).map((r) => [
                `${r.date}|${r.meal_slot}`,
                r.meal_id
              ])
            ),
            settings: { wedding_date: settings.data?.wedding_date ?? null },
            checks: checkMap
          });
        } catch {
          /* offline: seguimos con la copia local */
        }
      },

      saveProfile: async (p) => {
        const profiles = [...get().profiles.filter((x) => x.slot !== p.slot), p].sort((a, b) =>
          a.slot.localeCompare(b.slot)
        );
        set({ profiles });
        const sb = getSupabase();
        if (sb) await sb.from("profiles").upsert({ ...p, id: undefined }, { onConflict: "slot" });
        await get().addMeasurement({
          slot: p.slot,
          date: new Date().toISOString().slice(0, 10),
          weight_kg: p.weight_kg,
          waist_cm: p.waist_cm ?? null,
          hip_cm: p.hip_cm ?? null
        });
      },

      addMeasurement: async (m) => {
        const rest = get().measurements.filter((x) => !(x.slot === m.slot && x.date === m.date));
        set({ measurements: [...rest, m].sort((a, b) => a.date.localeCompare(b.date)) });
        const sb = getSupabase();
        if (sb) await sb.from("measurements").upsert({ ...m, id: undefined }, { onConflict: "slot,date" });
      },

      upsertLog: async (l) => {
        const rest = get().logs.filter((x) => !(x.slot === l.slot && x.date === l.date));
        set({ logs: [...rest, l].sort((a, b) => a.date.localeCompare(b.date)) });
        const sb = getSupabase();
        if (sb) await sb.from("workout_logs").upsert({ ...l, id: undefined }, { onConflict: "slot,date" });
      },

      /**
       * Cambiar el plato de una comida. Es COMPARTIDO: comen juntos, así que
       * el plato es el mismo para los dos y se sincroniza al otro móvil al
       * instante. Lo que NO se comparte son las raciones: cada uno ve las suyas
       * calculadas con sus propias calorías y macros.
       */
      swapMeal: async (date, mealSlot, mealId, by) => {
        const key = `${date}|${mealSlot}`;
        const next = { ...get().swaps };
        if (mealId) next[key] = mealId;
        else delete next[key];
        set({ swaps: next });

        const sb = getSupabase();
        if (!sb) return;
        if (mealId) {
          await sb.from("meal_swaps").upsert(
            { date, meal_slot: mealSlot, meal_id: mealId, changed_by: by, updated_at: new Date().toISOString() },
            { onConflict: "date,meal_slot" }
          );
        } else {
          await sb.from("meal_swaps").delete().eq("date", date).eq("meal_slot", mealSlot);
        }
      },

      addIntake: async (e) => {
        const entry: IntakeEntry = { ...e, id: e.id ?? `${e.slot}-${e.date}-${e.meal_id}-${Date.now()}` };
        set({ intake: [...get().intake, entry] });
        const sb = getSupabase();
        if (sb) await sb.from("intake_log").insert(entry);
      },

      removeIntake: async (e) => {
        set({ intake: get().intake.filter((x) => x.id !== e.id) });
        const sb = getSupabase();
        if (sb && e.id) await sb.from("intake_log").delete().eq("id", e.id);
      },

      toggleCheck: async (ingredientId) => {
        const checked = !get().checks[ingredientId];
        set({ checks: { ...get().checks, [ingredientId]: checked } });
        const sb = getSupabase();
        if (sb)
          await sb
            .from("shopping_checks")
            .upsert(
              { week: currentWeekKey(), ingredient_id: ingredientId, checked, updated_at: new Date().toISOString() },
              { onConflict: "week,ingredient_id" }
            );
      },

      setWeddingDate: async (date) => {
        set({ settings: { wedding_date: date } });
        const sb = getSupabase();
        if (sb) await sb.from("couple_settings").upsert({ id: 1, wedding_date: date });
      }
    }),
    {
      name: "fit-store",
      onRehydrateStorage: () => () => {
        useApp.setState({ hydrated: true });
      },
      partialize: (s) => ({
        mySlot: s.mySlot,
        viewSlot: s.viewSlot,
        viewBoth: s.viewBoth,
        profiles: s.profiles,
        measurements: s.measurements,
        logs: s.logs,
        intake: s.intake,
        swaps: s.swaps,
        settings: s.settings,
        checks: s.checks
      })
    }
  )
);

/** Suscripción Realtime a la lista de la compra (llamar una vez al montar). */
export function subscribeShoppingRealtime(): () => void {
  const sb = getSupabase();
  if (!sb) return () => {};
  const channel = sb
    .channel("couple-sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "shopping_checks" },
      (payload: { new?: { week?: string; ingredient_id?: string; checked?: boolean } }) => {
        const row = payload.new;
        if (row?.ingredient_id && row.week === currentWeekKey()) {
          useApp.setState((s) => ({ checks: { ...s.checks, [row.ingredient_id!]: Boolean(row.checked) } }));
        }
      }
    )
    // Si uno cambia el plato, al otro le cambia al instante (comen lo mismo)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "meal_swaps" },
      (payload: {
        eventType?: string;
        new?: { date?: string; meal_slot?: string; meal_id?: string };
        old?: { date?: string; meal_slot?: string };
      }) => {
        const row = payload.new;
        if (payload.eventType === "DELETE") {
          const old = payload.old;
          if (old?.date && old.meal_slot) {
            useApp.setState((s) => {
              const next = { ...s.swaps };
              delete next[`${old.date}|${old.meal_slot}`];
              return { swaps: next };
            });
          }
          return;
        }
        if (row?.date && row.meal_slot && row.meal_id) {
          useApp.setState((s) => ({ swaps: { ...s.swaps, [`${row.date}|${row.meal_slot}`]: row.meal_id! } }));
        }
      }
    )
    .subscribe();
  return () => {
    sb.removeChannel(channel);
  };
}
