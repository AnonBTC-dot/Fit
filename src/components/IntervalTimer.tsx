"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

interface Phase {
  label: string;
  kind: "work" | "rest";
  seconds: number;
}

/**
 * Timer de intervalos integrado (estilo Fuertafit): recorre
 * rondas × ejercicios con fases de trabajo y descanso.
 */
export function IntervalTimer({
  exercises,
  rounds,
  workSec,
  restSec
}: {
  exercises: string[];
  rounds: number;
  workSec: number;
  restSec: number;
}) {
  const phases = useMemo<Phase[]>(() => {
    const list: Phase[] = [];
    for (let r = 0; r < rounds; r++) {
      exercises.forEach((name, i) => {
        list.push({ label: name, kind: "work", seconds: workSec });
        const isLast = r === rounds - 1 && i === exercises.length - 1;
        if (restSec > 0 && !isLast) list.push({ label: "Descansa", kind: "rest", seconds: restSec });
      });
    }
    return list;
  }, [exercises, rounds, workSec, restSec]);

  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(phases[0]?.seconds ?? 0);
  const [running, setRunning] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    interval.current = setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        // siguiente fase
        setIdx((i) => {
          const next = i + 1;
          if (next >= phases.length) {
            setRunning(false);
            return i;
          }
          setLeft(phases[next].seconds);
          return next;
        });
        return 0;
      });
    }, 1000);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [running, phases]);

  const finished = !running && idx === phases.length - 1 && left === 0;
  const phase = phases[idx];
  const round = Math.floor(idx / (exercises.length * (restSec > 0 ? 2 : 1))) + 1;

  function reset() {
    setRunning(false);
    setIdx(0);
    setLeft(phases[0]?.seconds ?? 0);
  }

  if (!phase) return null;

  return (
    <div
      className={`rounded-xl p-4 text-center transition-colors ${
        finished
          ? "bg-emerald-50"
          : phase.kind === "work"
            ? "bg-ink-200"
            : "bg-ink-50"
      }`}
    >
      {finished ? (
        <div className="text-lg font-extrabold text-emerald-700">¡Bloque terminado! 🎉</div>
      ) : (
        <>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
            Ronda {Math.min(round, rounds)}/{rounds} · {phase.kind === "work" ? "¡Dale!" : "Respira"}
          </div>
          <div className="mt-0.5 truncate text-sm font-bold text-ink-800">{phase.label}</div>
          <div className={`my-1 text-5xl font-extrabold tabular-nums ${phase.kind === "work" ? "text-brand-400" : "text-ink-500"}`}>
            {left}
          </div>
        </>
      )}
      <div className="mt-2 flex justify-center gap-3">
        <button
          onClick={() => (finished ? reset() : setRunning(!running))}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-2000 text-ink-950 shadow-sm active:scale-95"
          aria-label={running ? "Pausar" : "Iniciar"}
        >
          {running ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <button
          onClick={reset}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-200 text-ink-500 shadow-sm active:scale-95"
          aria-label="Reiniciar"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
