"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarHeart, Clock, Dumbbell, Flame, Pencil, Trophy, UtensilsCrossed } from "lucide-react";
import { Button, Card, Input, Ring } from "@/components/ui";
import { LineChart } from "@/components/LineChart";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { calcTargets, computeStreak, daysUntil, todayISO } from "@/lib/calculations";
import { getPlan, todayDayIndex } from "@/data/workouts";
import { MEALS, getCurrentWeekMenu } from "@/data/meals";
import { useApp } from "@/lib/store";

const SLOT_COLORS: Record<string, string> = { p1: "#d92660", p2: "#515e77" };

export default function DashboardPage() {
  const { profiles, mySlot, viewSlot, measurements, logs, settings, setWeddingDate } = useApp();
  const [editingDate, setEditingDate] = useState(false);
  const [dateDraft, setDateDraft] = useState(settings.wedding_date ?? "");

  const active = profiles.find((p) => p.slot === viewSlot) ?? profiles[0];
  if (!active) return null;
  const isMe = active.slot === mySlot;

  const targets = calcTargets(active);
  const today = todayISO();
  const dayIdx = todayDayIndex(active.days_per_week);
  const plan = getPlan(active.venue, active.days_per_week);
  const todayLog = logs.find((l) => l.slot === active.slot && l.date === today);

  const todayDow = (new Date().getDay() + 6) % 7;
  const todayMenu = getCurrentWeekMenu()[todayDow];

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

  const wedding = settings.wedding_date ? daysUntil(settings.wedding_date) : null;

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
        <p className="text-sm text-ink-500">Equipo Fit · un día más cerca 💪</p>
      </header>

      <ProfileSwitcher />

      {/* Cuenta regresiva para la boda (opcional) */}
      <Card className="bg-gradient-to-br from-brand-600 to-brand-800 !border-0 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarHeart size={28} />
            {wedding !== null && !editingDate ? (
              <div>
                <div className="text-2xl font-extrabold">{wedding > 0 ? `${wedding} días` : "¡Es hoy! 🎉"}</div>
                <div className="text-xs opacity-80">para el gran día</div>
              </div>
            ) : (
              <div className="text-sm font-medium opacity-90">
                {editingDate ? "Elige la fecha:" : "Sin prisa: lo importante es el proceso. ¿Fecha del gran día?"}
              </div>
            )}
          </div>
          {!editingDate ? (
            <button onClick={() => setEditingDate(true)} className="rounded-full bg-white/20 p-2" aria-label="Editar fecha">
              <Pencil size={14} />
            </button>
          ) : null}
        </div>
        {editingDate && (
          <div className="mt-3 flex gap-2">
            <Input type="date" value={dateDraft} onChange={(e) => setDateDraft(e.target.value)} />
            <Button
              variant="ghost"
              onClick={() => {
                setWeddingDate(dateDraft || null);
                setEditingDate(false);
              }}
            >
              OK
            </Button>
          </div>
        )}
      </Card>

      {/* Objetivo nutricional del día */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">{isMe ? "Tu objetivo de hoy" : `Objetivo de ${active.name}`}</h2>
          {isMe && (
            <Link href={`/onboarding?slot=${active.slot}`} className="text-xs font-semibold text-brand-600">
              Editar perfil
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Ring pct={100} label={`${targets.kcal}`} sub="kcal" color="#d92660" size={84} />
          <div className="grid flex-1 grid-cols-3 gap-2 text-center">
            {[
              { l: "Prot", v: targets.protein_g },
              { l: "Carbs", v: targets.carbs_g },
              { l: "Grasa", v: targets.fat_g }
            ].map((m) => (
              <div key={m.l} className="rounded-xl bg-ink-50 py-2">
                <div className="text-base font-bold text-ink-800">{m.v}g</div>
                <div className="text-[10px] font-medium uppercase text-ink-400">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Sesión de hoy */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Dumbbell size={22} />
            </div>
            <div>
              <div className="font-bold">{dayIdx >= 0 ? plan[dayIdx].title : "Descanso activo 🧘"}</div>
              <div className="flex items-center gap-1 text-xs text-ink-500">
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
            <Link href="/entrenamiento">
              <Button className="!px-3 !py-2 text-xs">{todayLog?.completed ? "Ver" : "Ir"}</Button>
            </Link>
          )}
        </div>
      </Card>

      {/* Menú de hoy */}
      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold">
            <UtensilsCrossed size={16} className="text-brand-600" /> Menú de hoy
          </h2>
          <Link href="/nutricion" className="text-xs font-semibold text-brand-600">
            Ver recetas
          </Link>
        </div>
        <ul className="grid gap-1.5 text-sm text-ink-700">
          <li>🍳 {MEALS[todayMenu.breakfast].name}</li>
          <li>🍛 {MEALS[todayMenu.lunch].name}</li>
          <li>🍎 {MEALS[todayMenu.snack].name}</li>
          <li>🌙 {MEALS[todayMenu.dinner].name}</li>
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
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-bold">Evolución del peso</h2>
          <Link href="/progreso" className="text-xs font-semibold text-brand-600">
            Registrar medidas
          </Link>
        </div>
        <LineChart series={weightSeries} />
      </Card>
    </div>
  );
}
