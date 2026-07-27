"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, Input } from "@/components/ui";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { calcTargets } from "@/lib/calculations";
import {
  CATEGORY_LABELS,
  DAY_NAMES,
  INGREDIENTS,
  MEALS,
  getCurrentWeekMenu,
  currentCycleWeek,
  formatQty,
  kcalFactor,
  scaleQty,
  type Meal,
  type MealCategory
} from "@/data/meals";
import { useApp } from "@/lib/store";

const MEAL_LABELS = [
  { key: "breakfast", label: "🍳 Desayuno" },
  { key: "lunch", label: "🍛 Almuerzo" },
  { key: "snack", label: "🍎 Snack" },
  { key: "dinner", label: "🌙 Cena" }
] as const;

function MealCard({ meal, factor, tag }: { meal: Meal; factor: number; tag?: string }) {
  return (
    <Card>
      <div className="mb-1 flex items-start justify-between gap-2">
        <div>
          {tag && <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">{tag}</div>}
          <h3 className="font-bold text-ink-800">{meal.name}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-ink-50 px-2 py-1 text-[10px] font-semibold text-ink-500">
          ~{Math.round(meal.kcal * factor)} kcal · {Math.round(meal.protein * factor)}g prot
        </span>
      </div>
      <ul className="mt-2 grid gap-1">
        {meal.items.map((it) => {
          const ing = INGREDIENTS[it.ing];
          return (
            <li key={it.ing} className="flex justify-between text-sm text-ink-600">
              <span>{ing.name}</span>
              <span className="font-medium text-ink-800">{formatQty(scaleQty(it.qty, factor, ing.unit), ing.unit)}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 rounded-lg bg-ink-50 p-2 text-xs text-ink-500">👨‍🍳 {meal.prep}</p>
    </Card>
  );
}

export default function NutritionPage() {
  const { profiles, viewSlot } = useApp();
  const active = profiles.find((p) => p.slot === viewSlot) ?? profiles[0];
  const todayDow = (new Date().getDay() + 6) % 7; // 0 = lunes
  const [tab, setTab] = useState<"menu" | "recetas">("menu");
  const [dayIdx, setDayIdx] = useState(todayDow);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MealCategory | "all">("all");

  const targets = active ? calcTargets(active) : null;
  const factor = targets ? kcalFactor(targets.kcal) : 1;

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

  if (!active || !targets) return null;

  const menu = getCurrentWeekMenu()[dayIdx];
  const dayKcal = MEAL_LABELS.reduce((acc, m) => acc + MEALS[menu[m.key]].kcal, 0);
  const dayProtein = MEAL_LABELS.reduce((acc, m) => acc + MEALS[menu[m.key]].protein, 0);

  return (
    <div className="grid gap-4 px-5 py-6">
      <header>
        <h1 className="text-xl font-extrabold">Nutrición</h1>
        <p className="text-sm text-ink-500">
          Método del plato · raciones para {active.name} ({targets.kcal} kcal)
        </p>
      </header>

      <ProfileSwitcher />

      {/* Tabs */}
      <div className="flex rounded-full bg-ink-100 p-1">
        {(
          [
            { key: "menu", label: "Menú semanal" },
            { key: "recetas", label: "Recetas" }
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              tab === t.key ? "bg-white text-brand-600 shadow-sm" : "text-ink-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "menu" && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DAY_NAMES.map((d, i) => (
              <button
                key={d}
                onClick={() => setDayIdx(i)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${
                  i === dayIdx
                    ? "bg-brand-600 text-white"
                    : i === todayDow
                      ? "border border-brand-300 bg-brand-50 text-brand-700"
                      : "border border-ink-200 bg-white text-ink-500"
                }`}
              >
                {d.slice(0, 3)}
                {i === todayDow && " · hoy"}
              </button>
            ))}
          </div>

          <Card className="flex items-center justify-between !py-3">
            <span className="text-sm font-semibold text-ink-700">{DAY_NAMES[dayIdx]} · Semana {currentCycleWeek() + 1}/8</span>
            <span className="text-xs text-ink-500">
              ~{Math.round(dayKcal * factor)} kcal · {Math.round(dayProtein * factor)} g proteína
            </span>
          </Card>

          {MEAL_LABELS.map(({ key, label }) => (
            <MealCard key={key} meal={MEALS[menu[key]]} factor={factor} tag={label} />
          ))}
        </>
      )}

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
                  category === c ? "bg-brand-600 text-white" : "border border-ink-200 bg-white text-ink-500"
                }`}
              >
                {c === "all" ? "Todas" : CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
          {results.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-400">Sin resultados para “{query}”.</p>
          )}
          {results.map((m) => (
            <MealCard key={m.id} meal={m} factor={factor} tag={CATEGORY_LABELS[m.category]} />
          ))}
        </>
      )}
    </div>
  );
}
