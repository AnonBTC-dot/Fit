"use client";

import Link from "next/link";
import { Clock, Dumbbell, Flame, Trophy, UtensilsCrossed } from "lucide-react";
import { Button, Card, Ring } from "@/components/ui";
import { LineChart } from "@/components/LineChart";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { calcTargets, computeStreak, todayISO , refDePareja, cheatDePareja } from "@/lib/calculations";
import { getPlan, todayDayIndex } from "@/data/workouts";
import { MEALS, MEAL_EMOJI, buildDayPlan, mealMacrosFor } from "@/data/meals";
import { useApp } from "@/lib/store";

const SLOT_COLORS: Record<string, string> = { p1: "#22c55e", p2: "#8593aa" };

export default function DashboardPage() {
  const { profiles, mySlot, viewSlot, measurements, logs, intake } = useApp();

  const active = profiles.find((p) => p.slot === viewSlot) ?? profiles[0];
  if (!active) return null;
  const isMe = active.slot === mySlot;

  const targets = calcTargets(active);
  const today = todayISO();
  const dayIdx = todayDayIndex(active.days_per_week);
  const plan = getPlan(active.venue, active.days_per_week);
  const todayLog = logs.find((l) => l.slot === active.slot && l.date === today);

  const todayDow = (new Date().getDay() + 6) % 7;
  const eatsBreakfast = active.eats_breakfast ?? true;
  const dayPlan = buildDayPlan(todayDow, targets, eatsBreakfast, cheatDePareja(profiles), {}, refDePareja(profiles));
  const todayMenu = dayPlan.menu;
  const slots = dayPlan.slots;

  // Conteo de hoy
  const todayIntake = intake.filter((e) => e.slot === active.slot && e.date === today);
  const eaten = todayIntake.reduce(
    (a, e) => ({ kcal: a.kcal + e.kcal, protein: a.protein + e.protein, carbs: a.carbs + e.carbs, fat: a.fat + e.fat }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const kcalPct = Math.min(100, (eaten.kcal / targets.kcal) * 100);

  const streak = computeStreak(logs.filter((l) => l.slot === active.slot && l.completed).map((l) => l.date));
  const teamDates = new Set(logs.filter((l) => l.slot === "p1" && l.completed).map((l) => l.date));
  const teamStreak = computeStreak(
    logs.filter((l) => l.slot === "p2" && l.completed && teamDates.has(l.date)).map((l) => l.date)
  );

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  });
  const done7 = last7.filter((d) => logs.some((l) => l.slot === active.slot && l.date === d && l.completed)).length;
  const weekPct = Math.round((done7 / active.days_per_week) * 100);

  const weightSeries = profiles.map((p) => ({
    name: p.name,
    color: SLOT_COLORS[p.slot],
    points: measurements
      .filter((m) => m.slot === p.slot)
      .map((m) => ({ x: m.date, y: Number(m.weight_kg) }))
  }));

  return (
    <div className="grid gap-4 px-5 py-6">
      <header>
        <h1 className="text-xl font-extrabold">
          {isMe ? `Hola, ${active.name} 👋` : `Progreso de ${active.name} 👀`}
        </h1>
        <p className="text-sm text-ink-500">Equipo Fit · a darle caña 💪</p>
      </header>

      <ProfileSwitcher />

      {/* Objetivo nutricional del día */}
      <Card>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="min-w-0 truncate font-bold">{isMe ? "Tu objetivo de hoy" : `Objetivo de ${active.name}`}</h2>
          {isMe && (
            <Link href={`/onboarding?slot=${active.slot}`} className="text-xs font-semibold text-brand-400">
              Editar perfil
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Ring
            pct={kcalPct}
            label={`${Math.max(0, targets.kcal - Math.round(eaten.kcal))}`}
            sub="restantes"
            color="#22c55e"
            size={84}
          />
          <div className="min-w-0 flex-1">
            <div className="mb-2 text-lg font-extrabold text-ink-900">
              {Math.round(eaten.kcal)}
              <span className="text-xs font-semibold text-ink-400"> / {targets.kcal} kcal</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Prot", v: `${Math.round(eaten.protein)}/${targets.protein_g}` },
                { l: "Carbs", v: `${Math.round(eaten.carbs)}/${targets.carbs_g}` },
                { l: "Grasa", v: `${Math.round(eaten.fat)}/${targets.fat_g}` }
              ].map((m) => (
                <div key={m.l} className="min-w-0 rounded-xl bg-ink-200 px-1 py-1.5">
                  <div className="truncate text-[11px] font-bold text-ink-800">{m.v}</div>
                  <div className="text-[9px] font-medium uppercase text-ink-400">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Sesión de hoy */}
      <Card>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-200 text-brand-400">
              <Dumbbell size={22} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-bold">{dayIdx >= 0 ? plan[dayIdx].title : "Descanso activo 🧘"}</div>
              <div className="flex min-w-0 items-center gap-1 truncate text-xs text-ink-500">
                {dayIdx >= 0 ? (
                  <>
                    <Clock size={12} /> {plan[dayIdx].minutes} min · {plan[dayIdx].focus}
                    {todayLog?.completed && " · ✅"}
                  </>
                ) : (
                  "Camina 30-60 min o estira. Mañana más."
                )}
              </div>
            </div>
          </div>
          {dayIdx >= 0 && (
            <Link href="/entrenamiento" className="shrink-0">
              <Button className="!px-3 !py-2 text-xs">{todayLog?.completed ? "Ver" : "Ir"}</Button>
            </Link>
          )}
        </div>
      </Card>

      {/* Menú de hoy */}
      <Card>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="flex min-w-0 items-center gap-2 font-bold">
            <UtensilsCrossed size={16} className="shrink-0 text-brand-400" /> Menú de hoy
          </h2>
          <Link href="/nutricion" className="shrink-0 text-xs font-semibold text-brand-400">
            Registrar comidas
          </Link>
        </div>
        <ul className="grid gap-1.5 text-sm text-ink-700">
          {slots.map((k) => {
            const mealId = todayMenu[k];
            const done = todayIntake.some((e) => e.meal_id === mealId);
            const mm = mealMacrosFor(mealId, k, targets.kcal, eatsBreakfast);
            return (
              <li key={k} className={`flex items-center justify-between gap-2 ${done ? "opacity-45" : ""}`}>
                <span className="min-w-0 truncate">
                  {MEAL_EMOJI[k]} {MEALS[mealId].name}
                  {dayPlan.cheatSlot === k && " 🔥"}
                </span>
                <span className="shrink-0 text-[10px] font-semibold text-ink-400">
                  {done ? "✅ " : ""}
                  {mm.kcal} kcal
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Gamificación: rachas y adherencia */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <Flame className="mx-auto text-brand-500" size={20} />
          <div className="mt-1 text-xl font-extrabold">{streak}</div>
          <div className="text-[10px] font-medium uppercase text-ink-400">{isMe ? "Tu racha" : "Su racha"}</div>
        </Card>
        <Card className="text-center">
          <Trophy className="mx-auto text-amber-500" size={20} />
          <div className="mt-1 text-xl font-extrabold">{teamStreak}</div>
          <div className="text-[10px] font-medium uppercase text-ink-400">Racha juntos</div>
        </Card>
        <Card className="flex flex-col items-center justify-center">
          <Ring pct={weekPct} size={52} stroke={6} label={`${done7}`} sub={`/ ${active.days_per_week}`} />
          <div className="mt-1 text-[10px] font-medium uppercase text-ink-400">Semana</div>
        </Card>
      </div>

      {/* Progreso de peso de ambos */}
      <Card>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="font-bold">Evolución del peso</h2>
          <Link href="/progreso" className="shrink-0 text-xs font-semibold text-brand-400">
            Registrar medidas
          </Link>
        </div>
        <LineChart series={weightSeries} />
      </Card>
    </div>
  );
}
