"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currentWeekKey, getSupabase } from "./supabase";
import type { CoupleSettings, Measurement, Profile, Slot, WorkoutLog } from "./types";

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
  profiles: Profile[];
  measurements: Measurement[];
  logs: WorkoutLog[];
  settings: CoupleSettings;
  checks: Record<string, boolean>; // lista de la compra de la semana actual

  chooseMe: (s: Slot) => void;
  setViewSlot: (s: Slot) => void;
  loadFromServer: () => Promise<void>;
  saveProfile: (p: Profile) => Promise<void>;
  addMeasurement: (m: Measurement) => Promise<void>;
  upsertLog: (l: WorkoutLog) => Promise<void>;
  toggleCheck: (ingredientId: string) => Promise<void>;
  setWeddingDate: (date: string | null) => Promise<void>;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      mySlot: null,
      viewSlot: "p1",
      profiles: [],
      measurements: [],
      logs: [],
      settings: { wedding_date: null },
      checks: {},

      chooseMe: (s) => set({ mySlot: s, viewSlot: s }),
      setViewSlot: (s) => set({ viewSlot: s }),

      loadFromServer: async () => {
        const sb = getSupabase();
        if (!sb) return;
        try {
          const week = currentWeekKey();
          const [profiles, measurements, logs, settings, checks] = await Promise.all([
            sb.from("profiles").select("*").order("slot"),
            sb.from("measurements").select("*").order("date"),
            sb.from("workout_logs").select("*").order("date"),
            sb.from("couple_settings").select("*").maybeSingle(),
            sb.from("shopping_checks").select("*").eq("week", week)
          ]);
          const checkMap: Record<string, boolean> = {};
          for (const c of checks.data ?? []) checkMap[c.ingredient_id] = c.checked;
          set({
            profiles: (profiles.data as Profile[]) ?? [],
            measurements: (measurements.data as Measurement[]) ?? [],
            logs: (logs.data as WorkoutLog[]) ?? [],
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
        profiles: s.profiles,
        measurements: s.measurements,
        logs: s.logs,
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
    .channel("shopping-sync")
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
    .subscribe();
  return () => {
    sb.removeChannel(channel);
  };
}
