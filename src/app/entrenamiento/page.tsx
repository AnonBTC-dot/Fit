"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, Flame, PartyPopper, Zap } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { IntervalTimer } from "@/components/IntervalTimer";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { todayISO, mondayOfThisWeek } from "@/lib/calculations";
import { VENUE_LABELS, currentPhase, getPlan, type Block } from "@/data/workouts";
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
  const today = todayISO();
  const log = logs.find((l) => l.slot === active.slot && l.date === today);

  /*
   * El plan son N sesiones POR SEMANA, no N días fijos del calendario. Puedes
   * hacer el Día 1 el lunes y el Día 2 el miércoles, o entrenar el domingo:
   * lo que importa es que completes las sesiones antes de que acabe la semana.
   * Por eso ya no hay sesión "de hoy" ni días bloqueados.
   */
  const lunes = mondayOfThisWeek();
  const sesionesSemana = logs.filter(
    (l) => l.slot === active.slot && l.date >= lunes && l.date <= today
  );
  const hechas = new Set(sesionesSemana.filter((l) => l.completed).map((l) => l.day_index));
  const empezadas = new Set(sesionesSemana.map((l) => l.day_index));

  // Por defecto: la que ya empezaste hoy; si no, la primera que te falte
  const pendiente = plan.findIndex((_, i) => !hechas.has(i));
  const dayIdx = viewDay ?? log?.day_index ?? (pendiente >= 0 ? pendiente : 0);
  const session = plan[dayIdx];

  // Las rondas marcadas hoy solo valen para la sesión que registraste hoy
  const done = new Set(log?.day_index === dayIdx ? log?.done_exercises ?? [] : []);
  const editable = isMe;

  const totalRounds = session.blocks.reduce((acc, b) => acc + b.rounds, 0);
  const doneRounds = session.blocks.reduce(
    (acc, b, bi) => acc + Array.from({ length: b.rounds }).filter((_, ri) => done.has(`${bi}-r${ri}`)).length,
    0
  );

  function toggleRound(bi: number, ri: number) {
    if (!editable) return;
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
          Bloque {currentPhase()} · {VENUE_LABELS[active.venue]} · sesiones de{" "}
          {Math.min(...plan.map((s) => s.minutes))}-{Math.max(...plan.map((s) => s.minutes))} min
        </p>
        <p className="mt-1 text-sm font-semibold text-brand-400">
          {hechas.size}/{plan.length} sesiones esta semana
          <span className="ml-1 font-normal text-ink-500">· tú eliges qué día hacer cada una</span>
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
                ? "bg-brand-500 text-ink-950"
                : hechas.has(i)
                  ? "border border-brand-500 bg-ink-200 text-brand-400"
                  : empezadas.has(i)
                    ? "border border-brand-300 bg-ink-200 text-ink-600"
                    : "border border-ink-300 bg-ink-200 text-ink-600"
            }`}
          >
            {hechas.has(i) ? "✓ " : ""}Sesión {i + 1}
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
            {(
              <div className="text-xs text-ink-500">
                {doneRounds}/{totalRounds} rondas
              </div>
            )}
          </div>
        </div>
        {(
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
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
                    disabled={!editable}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      checked ? "bg-brand-500 text-ink-950" : "bg-ink-200 border border-ink-300 text-ink-500"
                    } ${!editable ? "opacity-40" : ""}`}
                  >
                    {checked ? <CheckCircle2 size={13} /> : <Circle size={13} />} Ronda {ri + 1}
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}

      {log?.day_index === dayIdx && log?.completed && (
        <div className="flex items-center gap-2 rounded-xl bg-ink-200 p-3 text-sm font-semibold text-brand-700">
          <PartyPopper size={18} /> ¡Sesión completada! Racha al alza 🔥
        </div>
      )}
      {!isMe && (
        <p className="text-center text-xs text-ink-400">
          Estás curioseando el plan de {active.name} 👀 (solo lectura).
        </p>
      )}
      {isMe && log && log.day_index !== dayIdx && (
        <p className="text-center text-xs text-ink-400">
          Hoy registraste la Sesión {log.day_index + 1}. Si marcas rondas aquí, hoy pasará a contar
          como Sesión {dayIdx + 1}.
        </p>
      )}
      {isMe && !(log?.day_index === dayIdx && log?.completed) && (
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
