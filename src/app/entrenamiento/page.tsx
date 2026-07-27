"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, Flame, PartyPopper, Zap } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { IntervalTimer } from "@/components/IntervalTimer";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { todayISO } from "@/lib/calculations";
import { VENUE_LABELS, currentPhase, getPlan, todayDayIndex, type Block } from "@/data/workouts";
import { useApp } from "@/lib/store";

const KIND_META: Record<Block["kind"], { label: string; icon: typeof Flame; color: string }> = {
  warmup: { label: "Calentamiento", icon: Clock, color: "text-amber-500" },
  strength: { label: "Fuerza", icon: Flame, color: "text-brand-400" },
  hiit: { label: "HIIT", icon: Zap, color: "text-violet-600" }
};

export default function TrainingPage() {
  const { profiles, mySlot, viewSlot, logs, upsertLog } = useApp();
  const active = profiles.find((p) => p.slot === viewSlot) ?? profiles[0];
  const [viewDay, setViewDay] = useState<number | null>(null);

  if (!active) return null;
  const isMe = active.slot === mySlot;

  const plan = getPlan(active.venue, active.days_per_week);
  const todayIdx = todayDayIndex(active.days_per_week);
  const dayIdx = viewDay ?? (todayIdx >= 0 ? todayIdx : 0);
  const session = plan[dayIdx];
  const today = todayISO();
  const log = logs.find((l) => l.slot === active.slot && l.date === today);
  const done = new Set(log?.done_exercises ?? []);
  const isToday = dayIdx === todayIdx;

  const totalRounds = session.blocks.reduce((acc, b) => acc + b.rounds, 0);
  const doneRounds = session.blocks.reduce(
    (acc, b, bi) => acc + Array.from({ length: b.rounds }).filter((_, ri) => done.has(`${bi}-r${ri}`)).length,
    0
  );

  function toggleRound(bi: number, ri: number) {
    if (!isToday || !isMe) return;
    const id = `${bi}-r${ri}`;
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    upsertLog({
      slot: active!.slot,
      date: today,
      day_index: dayIdx,
      done_exercises: Array.from(next),
      completed: next.size >= totalRounds
    });
  }

  return (
    <div className="grid gap-4 px-5 py-6">
      <header>
        <h1 className="text-xl font-extrabold">Entrenamiento</h1>
        <p className="text-sm text-ink-500">
          Bloque {currentPhase()} · {VENUE_LABELS[active.venue]} · {active.days_per_week} días/semana · sesiones de {Math.min(...plan.map((s) => s.minutes))}-
          {Math.max(...plan.map((s) => s.minutes))} min
        </p>
      </header>

      <ProfileSwitcher />

      {/* Selector de día */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {plan.map((s, i) => (
          <button
            key={i}
            onClick={() => setViewDay(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
              i === dayIdx
                ? "bg-ink-2000 text-ink-950"
                : i === todayIdx
                  ? "border border-brand-300 bg-ink-200 text-brand-700"
                  : "border border-ink-200 bg-ink-100 text-ink-500"
            }`}
          >
            Día {i + 1}
            {i === todayIdx && " · hoy"}
          </button>
        ))}
      </div>

      <Card className="!py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">{session.title}</h2>
            <p className="text-xs text-ink-500">{session.focus}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-bold text-brand-400">
              <Clock size={14} /> {session.minutes} min
            </div>
            {isToday && (
              <div className="text-xs text-ink-500">
                {doneRounds}/{totalRounds} rondas
              </div>
            )}
          </div>
        </div>
        {isToday && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-ink-2000 transition-all"
              style={{ width: `${totalRounds ? (doneRounds / totalRounds) * 100 : 0}%` }}
            />
          </div>
        )}
      </Card>

      {session.blocks.map((block, bi) => {
        const meta = KIND_META[block.kind];
        const Icon = meta.icon;
        const hasTimer = block.workSec !== undefined && block.kind !== "warmup";
        return (
          <Card key={bi}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={18} className={meta.color} />
                <h3 className="font-bold">{block.title}</h3>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{meta.label}</span>
            </div>
            <p className="mb-3 text-xs text-ink-500">{block.scheme}</p>

            <div className="grid gap-2">
              {block.exercises.map((ex, ei) => (
                <div key={ei} className="rounded-xl bg-ink-50 p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-ink-800">{ex.name}</span>
                    <span className="shrink-0 text-xs font-bold text-brand-400">{ex.work}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-500">💡 {ex.tip}</p>
                </div>
              ))}
            </div>

            {hasTimer && (
              <div className="mt-3">
                <IntervalTimer
                  exercises={block.exercises.map((e) => e.name)}
                  rounds={block.rounds}
                  workSec={block.workSec!}
                  restSec={block.restSec ?? 0}
                />
              </div>
            )}

            {/* Checklist de rondas */}
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: block.rounds }).map((_, ri) => {
                const checked = done.has(`${bi}-r${ri}`);
                return (
                  <button
                    key={ri}
                    onClick={() => toggleRound(bi, ri)}
                    disabled={!isToday || !isMe}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      checked ? "bg-ink-2000 text-ink-950" : "bg-ink-100 border border-ink-200 text-ink-500"
                    } ${!isToday || !isMe ? "opacity-40" : ""}`}
                  >
                    {checked ? <CheckCircle2 size={13} /> : <Circle size={13} />} Ronda {ri + 1}
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}

      {isToday && log?.completed && (
        <div className="flex items-center gap-2 rounded-xl bg-ink-200 p-3 text-sm font-semibold text-brand-700">
          <PartyPopper size={18} /> ¡Sesión completada! Racha al alza 🔥
        </div>
      )}
      {!isMe && (
        <p className="text-center text-xs text-ink-400">
          Estás curioseando el plan de {active.name} 👀 (solo lectura).
        </p>
      )}
      {isMe && !isToday && (
        <p className="text-center text-xs text-ink-400">
          Estás viendo otro día del plan. Solo puedes registrar rondas en la sesión de hoy.
        </p>
      )}
      {isToday && isMe && !log?.completed && (
        <Button
          variant="outline"
          onClick={() => {
            const all: string[] = [];
            session.blocks.forEach((b, bi) => Array.from({ length: b.rounds }).forEach((_, ri) => all.push(`${bi}-r${ri}`)));
            upsertLog({ slot: active.slot, date: today, day_index: dayIdx, done_exercises: all, completed: true });
          }}
        >
          Marcar toda la sesión como hecha
        </Button>
      )}
    </div>
  );
}
