"use client";

import { useMemo, useState } from "react";
import { Check, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { Card, Input, Ring } from "@/components/ui";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { calcTargets, todayISO , refDePareja, cheatDePareja } from "@/lib/calculations";
import {
  CATEGORY_LABELS,
  DAY_NAMES,
  INGREDIENTS,
  MEALS,
  MEAL_EMOJI,
  MEAL_LABELS,
  activeSlots,
  alternativesFor,
  buildDayPlan,
  currentCycleWeek,
  formatQty,
  getCurrentWeekMenu,
  itemQtyFor,
  mealMacrosBase,
  mealMacrosFor,
  servingFactor,
  type Meal,
  type MealCategory,
  type MealSlotKey
} from "@/data/meals";
import { roundMacros, scaleMacros } from "@/data/nutrition";
import { useApp } from "@/lib/store";
import type { IntakeEntry } from "@/lib/types";

/* ── Tarjeta de plato: cantidades ya ajustadas a TU ración, con macros ── */
function MealCard({
  meal,
  factor,
  tag,
  onEat,
  onSwap,
  swapped,
  juntos
}: {
  meal: Meal;
  factor: number;
  tag?: string;
  onEat?: (servings: number) => void;
  onSwap?: () => void;
  swapped?: boolean;
  /** Modo cocina para dos: cantidades sumadas y macros de cada uno. */
  juntos?: { nombre: string; factor: number }[];
}) {
  const [open, setOpen] = useState(false);
  // En modo conjunto las cantidades son la SUMA (lo que va a la olla)
  const factorTotal = juntos ? juntos.reduce((t, j) => t + j.factor, 0) : factor;
  const m = roundMacros(scaleMacros(mealMacrosBase(meal.id), factorTotal));

  return (
    <Card>
      <div className="mb-1 flex items-start justify-between gap-2">
        <div>
          {tag && <div className="text-xs font-semibold uppercase tracking-wide text-brand-400">{tag}</div>}
          <h3 className="font-bold text-ink-800">{meal.name}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-ink-200 px-2 py-1 text-[10px] font-semibold text-brand-400">
          {m.kcal} kcal{juntos ? " total" : ""}
        </span>
      </div>

      {/* Macros: del plato, o de cada persona si cocinan juntos */}
      {juntos ? (
        <div className="mt-2 grid gap-1.5">
          {juntos.map((j) => {
            const mj = roundMacros(scaleMacros(mealMacrosBase(meal.id), j.factor));
            return (
              <div key={j.nombre} className="flex items-center justify-between rounded-lg bg-ink-200 px-2.5 py-1.5">
                <span className="text-xs font-semibold text-ink-700">{j.nombre}</span>
                <span className="text-[11px] text-ink-500">
                  <span className="font-bold text-brand-400">{mj.kcal}</span> kcal · {mj.protein}P / {mj.carbs}C / {mj.fat}G
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          {[
            { l: "Proteína", v: `${m.protein} g` },
            { l: "Carbos", v: `${m.carbs} g` },
            { l: "Grasa", v: `${m.fat} g` }
          ].map((x) => (
            <div key={x.l} className="rounded-lg bg-ink-200 py-1.5">
              <div className="text-sm font-bold text-ink-800">{x.v}</div>
              <div className="text-[9px] font-medium uppercase tracking-wide text-ink-400">{x.l}</div>
            </div>
          ))}
        </div>
      )}

      {juntos && (
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
          Para cocinar (los dos juntos)
        </p>
      )}
      <ul className="mt-3 grid gap-1">
        {meal.items.map((it) => {
          const ing = INGREDIENTS[it.ing];
          const q = itemQtyFor(it, factorTotal);
          return (
            <li key={it.ing} className="flex justify-between gap-2 text-sm text-ink-600">
              <span>{ing.name}</span>
              <span className="shrink-0 font-medium text-ink-800">
                {formatQty(q.qty, q.unit)}
                {q.note && <span className="ml-1 text-[10px] font-normal text-ink-400">{q.note}</span>}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 rounded-lg bg-ink-200 p-2 text-xs text-ink-500">👨‍🍳 {meal.prep}</p>

      {onSwap && (
        <button
          onClick={onSwap}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink-300 py-2 text-xs font-semibold text-ink-600"
        >
          <RefreshCw size={13} /> {swapped ? "Cambiar de nuevo · volver al sugerido" : "No me apetece, cambiar plato"}
        </button>
      )}

      {onEat && (
        <div className="mt-3">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-ink-950 active:scale-[0.98]"
            >
              <Check size={16} /> Me lo comí
            </button>
          ) : (
            <div className="grid gap-2">
              <p className="text-center text-xs text-ink-400">¿Cuánto comiste?</p>
              <div className="flex gap-2">
                {[0.5, 1, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onEat(s);
                      setOpen(false);
                    }}
                    className="flex-1 rounded-xl bg-brand-500 px-2 py-2.5 text-sm font-bold text-ink-950 active:scale-[0.98]"
                  >
                    {s === 0.5 ? "½ ración" : s === 1 ? "Ración" : "1½"}
                  </button>
                ))}
              </div>
              <button onClick={() => setOpen(false)} className="text-xs font-medium text-ink-400">
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

/* ── Barra de macro consumido vs objetivo ── */
function MacroBar({ label, eaten, target, unit = "g" }: { label: string; eaten: number; target: number; unit?: string }) {
  const pct = target > 0 ? Math.min(100, (eaten / target) * 100) : 0;
  const over = eaten > target * 1.05;
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium text-ink-600">{label}</span>
        <span className={over ? "font-semibold text-amber-400" : "text-ink-500"}>
          {Math.round(eaten)} / {Math.round(target)} {unit}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-200">
        <div
          className={`h-full rounded-full transition-all ${over ? "bg-amber-400" : "bg-brand-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Selector de alternativas: nada es obligatorio ── */
function SwapPicker({
  slotKey,
  currentId,
  targetKcal,
  eatsBreakfast,
  onPick,
  onClose,
  canReset
}: {
  slotKey: MealSlotKey;
  currentId: string;
  targetKcal: number;
  eatsBreakfast: boolean;
  onPick: (id: string | null) => void;
  onClose: () => void;
  canReset: boolean;
}) {
  const [q, setQ] = useState("");
  const alts = useMemo(() => {
    const list = alternativesFor(slotKey, currentId);
    const s = q.trim().toLowerCase();
    return s ? list.filter((m) => m.name.toLowerCase().includes(s)) : list;
  }, [slotKey, currentId, q]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink-50">
      <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
        <div>
          <h2 className="font-bold text-ink-900">Cambiar {MEAL_LABELS[slotKey].toLowerCase()}</h2>
          <p className="text-xs text-ink-400">
            El cambio vale para los dos · cada uno con su ración
          </p>
        </div>
        <button onClick={onClose} className="rounded-full bg-ink-200 p-2 text-ink-600">
          <X size={16} />
        </button>
      </div>

      <div className="px-5 py-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar..." style={{ paddingLeft: "2.25rem" }} />
        </div>
        {canReset && (
          <button
            onClick={() => onPick(null)}
            className="mt-2 w-full rounded-xl border border-ink-300 py-2 text-xs font-semibold text-ink-500"
          >
            Volver al plato sugerido
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="grid gap-2">
          {alts.map((m) => {
            const mm = mealMacrosFor(m.id, slotKey, targetKcal, eatsBreakfast);
            return (
              <button
                key={m.id}
                onClick={() => onPick(m.id)}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-ink-100 p-3 text-left active:scale-[0.98]"
              >
                <span className="min-w-0 text-sm font-semibold text-ink-800">{m.name}</span>
                <span className="shrink-0 text-right">
                  <span className="block text-sm font-bold text-brand-400">{mm.kcal}</span>
                  <span className="block text-[10px] text-ink-400">{mm.protein}g prot</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function NutritionPage() {
  const { profiles, mySlot, viewSlot, viewBoth, intake, swaps, swapMeal, addIntake, removeIntake, empezarPlanEstaSemana, sincronizarSemanaDesdeAqui } =
    useApp();
  const [swapping, setSwapping] = useState<MealSlotKey | null>(null);
  const [verSemana, setVerSemana] = useState(false);
  const active = profiles.find((p) => p.slot === viewSlot) ?? profiles[0];
  const todayDow = (new Date().getDay() + 6) % 7; // 0 = lunes
  const [tab, setTab] = useState<"hoy" | "menu" | "recetas">("hoy");
  const [dayIdx, setDayIdx] = useState(todayDow);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MealCategory | "all">("all");

  const targets = active ? calcTargets(active) : null;
  const eatsBreakfast = active?.eats_breakfast ?? true;
  const isMe = active?.slot === mySlot;
  const today = todayISO();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.values(MEALS).filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.items.some((it) => INGREDIENTS[it.ing].name.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  const todayEntries = useMemo(
    () => intake.filter((e) => e.slot === active?.slot && e.date === today),
    [intake, active?.slot, today]
  );

  const eaten = useMemo(
    () =>
      todayEntries.reduce(
        (a, e) => ({
          kcal: a.kcal + e.kcal,
          protein: a.protein + e.protein,
          carbs: a.carbs + e.carbs,
          fat: a.fat + e.fat
        }),
        { kcal: 0, protein: 0, carbs: 0, fat: 0 }
      ),
    [todayEntries]
  );

  if (!active || !targets) return null;

  // Comen juntos: el PLATO lo decide la pareja, la RACIÓN cada uno.
  const refPareja = refDePareja(profiles);
  const cheatOn = cheatDePareja(profiles);
  // Cocinan juntos: cantidades sumadas, pero macros de cada uno por separado
  const cocinaJuntos = viewBoth && profiles.length === 2;
  const comensales = profiles.map((p) => ({
    nombre: p.name,
    kcal: calcTargets(p).kcal,
    eatsBreakfast: p.eats_breakfast ?? true
  }));
  const juntosPara = (mealId: string, k: MealSlotKey) =>
    cocinaJuntos
      ? comensales.map((c) => ({
          nombre: c.nombre,
          factor: servingFactor(mealId, k, c.kcal, c.eatsBreakfast)
        }))
      : undefined;
  // Cambios manuales guardados para hoy
  // Los platos son COMPARTIDOS (comen juntos); las raciones, de cada uno
  const mySwaps: Partial<Record<MealSlotKey, string>> = {};
  for (const k of ["breakfast", "lunch", "snack", "dinner"] as MealSlotKey[]) {
    const v = swaps[`${today}|${k}`];
    if (v) mySwaps[k] = v;
  }
  // Plan del día: comida libre del finde + tus cambios + snack que cuadra macros
  const todayPlan = buildDayPlan(todayDow, targets, eatsBreakfast, cheatOn, mySwaps, refPareja);
  const viewPlan = buildDayPlan(dayIdx, targets, eatsBreakfast, cheatOn, dayIdx === todayDow ? mySwaps : {}, refPareja);
  const slots = viewPlan.slots;
  const menu = viewPlan.menu;
  const todayMenu = todayPlan.menu;

  const remaining = Math.max(0, targets.kcal - eaten.kcal);
  const pctKcal = Math.min(100, (eaten.kcal / targets.kcal) * 100);

  function eat(mealId: string, slotKey: MealSlotKey, servings: number) {
    const per = mealMacrosFor(mealId, slotKey, targets!.kcal, eatsBreakfast);
    const e: IntakeEntry = {
      slot: active!.slot,
      date: today,
      meal_id: mealId,
      servings,
      kcal: Math.round(per.kcal * servings),
      protein: Math.round(per.protein * servings),
      carbs: Math.round(per.carbs * servings),
      fat: Math.round(per.fat * servings)
    };
    addIntake(e);
  }

  return (
    <div className="grid gap-4 px-5 py-6">
      {swapping && (
        <SwapPicker
          slotKey={swapping}
          currentId={todayPlan.menu[swapping]}
          targetKcal={targets.kcal}
          eatsBreakfast={eatsBreakfast}
          canReset={Boolean(mySwaps[swapping])}
          onPick={(id) => {
            swapMeal(today, swapping, id, active.slot);
            setSwapping(null);
          }}
          onClose={() => setSwapping(null)}
        />
      )}
      <header>
        <h1 className="text-xl font-extrabold">Nutrición</h1>
        <p className="text-sm text-ink-500">
          {cocinaJuntos
            ? `Cantidades para cocinar los dos · ${comensales.map((c) => `${c.nombre} ${c.kcal}`).join(" · ")} kcal`
            : `${targets.kcal} kcal · raciones de ${active.name}`}
          {!cocinaJuntos && !eatsBreakfast && " · sin desayuno"}
        </p>
      </header>

      <ProfileSwitcher allowBoth />

      {/* Tabs */}
      <div className="flex rounded-full bg-ink-100 p-1">
        {(
          [
            { key: "hoy", label: "Hoy" },
            { key: "menu", label: "Menú" },
            { key: "recetas", label: "Recetas" }
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
              tab === t.key ? "bg-ink-200 text-brand-400 shadow-sm" : "text-ink-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─────────── HOY: conteo de calorías y macros ─────────── */}
      {tab === "hoy" && (
        <>
          <Card>
            <div className="flex items-center gap-4">
              <Ring pct={pctKcal} label={`${remaining}`} sub="restantes" size={96} stroke={9} />
              <div className="flex-1">
                <div className="mb-1 text-2xl font-extrabold text-ink-900">
                  {Math.round(eaten.kcal)}
                  <span className="text-sm font-semibold text-ink-400"> / {targets.kcal} kcal</span>
                </div>
                <p className="text-xs text-ink-500">
                  {eaten.kcal === 0
                    ? "Aún no has registrado nada hoy."
                    : remaining > 0
                      ? `Te quedan ${remaining} kcal por comer.`
                      : "Objetivo del día completado."}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2.5">
              <MacroBar label="Proteína" eaten={eaten.protein} target={targets.protein_g} />
              <MacroBar label="Carbohidratos" eaten={eaten.carbs} target={targets.carbs_g} />
              <MacroBar label="Grasas" eaten={eaten.fat} target={targets.fat_g} />
            </div>
          </Card>

          {/* Registro del día */}
          {todayEntries.length > 0 && (
            <Card>
              <h2 className="mb-2 text-sm font-bold text-ink-700">Lo que llevas hoy</h2>
              <ul className="grid gap-1.5">
                {todayEntries.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-2 border-b border-ink-200 pb-1.5 last:border-0">
                    <div className="min-w-0">
                      <div className="truncate text-sm text-ink-700">{MEALS[e.meal_id]?.name ?? e.meal_id}</div>
                      <div className="text-[10px] text-ink-400">
                        {e.servings === 0.5 ? "½ ración" : e.servings === 1 ? "1 ración" : `${e.servings} raciones`} ·{" "}
                        {e.protein}P / {e.carbs}C / {e.fat}G
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-sm font-bold text-brand-400">{e.kcal}</span>
                      {isMe && (
                        <button onClick={() => removeIntake(e)} className="text-ink-400" aria-label="Quitar">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Menú de hoy con botón de registrar */}
          <div>
            <h2 className="mb-2 text-sm font-bold text-ink-700">
              Tu menú de hoy · {DAY_NAMES[todayDow]}
            </h2>
            {!eatsBreakfast && (
              <p className="mb-2 text-xs text-ink-400">
                Tu primera comida es el almuerzo: las calorías del desayuno se reparten en almuerzo y cena.
              </p>
            )}
            <div className="grid gap-3">
              {todayPlan.slots.map((k) => {
                const mealId = todayMenu[k];
                const done = todayEntries.some((e) => e.meal_id === mealId);
                return (
                  <div key={k} className={done ? "opacity-50" : ""}>
                    <MealCard
                      meal={MEALS[mealId]}
                      factor={servingFactor(mealId, k, targets.kcal, eatsBreakfast)}
                      tag={`${MEAL_EMOJI[k]} ${MEAL_LABELS[k]}${todayPlan.cheatSlot === k ? " · 🔥 comida libre" : ""}${done ? " · registrado" : ""}`}
                      onEat={isMe && !done ? (s) => eat(mealId, k, s) : undefined}
                      onSwap={isMe && !done ? () => setSwapping(k) : undefined}
                      swapped={Boolean(mySwaps[k])}
                      juntos={juntosPara(mealId, k)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {isMe && (
            <button
              onClick={() => setTab("recetas")}
              className="flex items-center justify-center gap-2 rounded-xl border border-ink-300 py-3 text-sm font-semibold text-ink-600"
            >
              <Plus size={16} /> Comí otra cosa (buscar en recetas)
            </button>
          )}
        </>
      )}

      {/* ─────────── MENÚ SEMANAL ─────────── */}
      {tab === "menu" && (
        <>
          <div className="flex rounded-full bg-ink-100 p-1">
            {[
              { k: false, l: "Un día" },
              { k: true, l: "Semana completa" }
            ].map((o) => (
              <button
                key={String(o.k)}
                onClick={() => setVerSemana(o.k)}
                className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  verSemana === o.k ? "bg-ink-200 text-brand-400 shadow-sm" : "text-ink-500"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>

          {!verSemana && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DAY_NAMES.map((d, i) => (
              <button
                key={d}
                onClick={() => setDayIdx(i)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${
                  i === dayIdx
                    ? "bg-brand-500 text-ink-950"
                    : i === todayDow
                      ? "border border-brand-500 bg-ink-200 text-brand-400"
                      : "border border-ink-300 bg-ink-200 text-ink-600"
                }`}
              >
                {d.slice(0, 3)}
                {i === todayDow && " · hoy"}
              </button>
            ))}
          </div>
          )}

          {!verSemana && (
          <>
          <Card className="flex items-center justify-between !py-3">
            <span className="text-sm font-semibold text-ink-700">
              {DAY_NAMES[dayIdx]} · Semana {currentCycleWeek() + 1}/8
              <button
                onClick={async () => {
                  const n = currentCycleWeek() + 1;
                  if (
                    confirm(
                      `¿Poner a los dos móviles en la Semana ${n}?\n\n` +
                        "No cambia lo que ya estáis comiendo: solo hace que el otro teléfono " +
                        "siga esta misma semana."
                    )
                  ) {
                    await sincronizarSemanaDesdeAqui();
                    location.reload();
                  }
                }}
                className="ml-2 text-[11px] font-normal text-brand-400 underline"
              >
                sincronizar
              </button>
              <button
                onClick={async () => {
                  if (
                    confirm(
                      "¿Volver a empezar el plan desde la Semana 1?\n\n" +
                        "Cambia el menú de esta semana en los dos móviles."
                    )
                  ) {
                    await empezarPlanEstaSemana();
                    location.reload();
                  }
                }}
                className="ml-2 text-[11px] font-normal text-ink-500 underline"
              >
                reiniciar
              </button>
            </span>
            <span className="text-xs text-ink-500">
              {viewPlan.totals.kcal} kcal · {viewPlan.totals.protein}P / {viewPlan.totals.carbs}C / {viewPlan.totals.fat}G
            </span>
          </Card>

          {viewPlan.cheatSlot && (
            <p className="-mt-2 text-center text-xs font-semibold text-brand-400">
              🔥 Hoy toca comida libre controlada en {MEAL_LABELS[viewPlan.cheatSlot].toLowerCase()}
            </p>
          )}

          {slots.map((k) => (
            <MealCard
              key={k}
              meal={MEALS[menu[k]]}
              factor={servingFactor(menu[k], k, targets.kcal, eatsBreakfast)}
              tag={`${MEAL_EMOJI[k]} ${MEAL_LABELS[k]}${viewPlan.cheatSlot === k ? " · 🔥 libre" : ""}`}
              juntos={juntosPara(menu[k], k)}
            />
          ))}
          </>
          )}
        </>
      )}

      {/* ─────────── MENÚ · SEMANA COMPLETA ─────────── */}
      {tab === "menu" && verSemana && targets && (
        <>
          <p className="-mt-1 text-xs text-ink-500">
            Vista rápida de los 7 días para que sepas qué carne sacar del freezer.
            Toca un día para abrirlo con sus gramos y macros.
          </p>
          {DAY_NAMES.map((nombre, i) => {
            const plan = buildDayPlan(i, targets, eatsBreakfast, cheatOn, i === todayDow ? mySwaps : {}, refPareja);
            return (
              <Card key={nombre} className="!py-3">
                <button
                  onClick={() => {
                    setDayIdx(i);
                    setVerSemana(false);
                  }}
                  className="w-full text-left"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`text-sm font-bold ${i === todayDow ? "text-brand-400" : "text-ink-700"}`}>
                      {nombre}
                      {i === todayDow && " · hoy"}
                    </span>
                    <span className="text-[11px] text-ink-500">{plan.totals.kcal} kcal</span>
                  </div>
                  <ul className="grid gap-1">
                    {plan.slots.map((k) => (
                      <li key={k} className="flex items-start gap-2 text-xs text-ink-600">
                        <span className="shrink-0">{MEAL_EMOJI[k]}</span>
                        <span className="flex-1">
                          {MEALS[plan.menu[k]]?.name ?? "—"}
                          {plan.cheatSlot === k && " · 🔥 libre"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </button>
              </Card>
            );
          })}
        </>
      )}

      {/* ─────────── RECETARIO ─────────── */}
      {tab === "recetas" && (
        <>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar receta o ingrediente..."
              style={{ paddingLeft: "2.25rem" }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "breakfast", "lunch", "dinner", "snack"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${
                  category === c ? "bg-brand-500 text-ink-950" : "border border-ink-300 bg-ink-200 text-ink-600"
                }`}
              >
                {c === "all" ? "Todas" : CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
          {results.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-400">Sin resultados para “{query}”.</p>
          )}
          {results.map((m) => {
            const slotKey: MealSlotKey = m.category === "dinner" ? "dinner" : (m.category as MealSlotKey);
            const useSlot: MealSlotKey = slotKey === "breakfast" && !eatsBreakfast ? "lunch" : slotKey;
            return (
              <MealCard
                key={m.id}
                meal={m}
                factor={servingFactor(m.id, useSlot, targets.kcal, eatsBreakfast)}
                tag={CATEGORY_LABELS[m.category]}
                onEat={isMe ? (s) => eat(m.id, useSlot, s) : undefined}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
