"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import { Button, Card, Field, Input } from "@/components/ui";
import { LineChart } from "@/components/LineChart";
import { ProfileSwitcher } from "@/components/ProfileSwitcher";
import { todayISO, waistHeightRatio } from "@/lib/calculations";
import { useApp } from "@/lib/store";

const SLOT_COLORS: Record<string, string> = { p1: "#22c55e", p2: "#8593aa" };

export default function ProgressPage() {
  const { profiles, mySlot, viewSlot, measurements, addMeasurement } = useApp();
  const active = profiles.find((p) => p.slot === viewSlot) ?? profiles[0];
  const isMe = active?.slot === mySlot;
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [saved, setSaved] = useState(false);

  if (!active) return null;

  const mine = measurements.filter((m) => m.slot === active.slot);
  const first = mine[0];
  const last = mine[mine.length - 1];
  const weightDelta = first && last ? Math.round((Number(last.weight_kg) - Number(first.weight_kg)) * 10) / 10 : 0;
  const waistDelta =
    first?.waist_cm && last?.waist_cm ? Math.round((Number(last.waist_cm) - Number(first.waist_cm)) * 10) / 10 : null;
  const whr = waistHeightRatio(last?.waist_cm, active.height_cm);

  const series = (field: "weight_kg" | "waist_cm") =>
    profiles.map((p) => ({
      name: p.name,
      color: SLOT_COLORS[p.slot],
      points: measurements
        .filter((m) => m.slot === p.slot && m[field] != null)
        .map((m) => ({ x: m.date, y: Number(m[field]) }))
    }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!weight) return;
    addMeasurement({
      slot: active!.slot,
      date: todayISO(),
      weight_kg: Number(weight),
      waist_cm: waist ? Number(waist) : null,
      hip_cm: hip ? Number(hip) : null
    });
    setWeight("");
    setWaist("");
    setHip("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="grid gap-4 px-5 py-6">
      <header>
        <h1 className="text-xl font-extrabold">Progreso</h1>
        <p className="text-sm text-ink-500">Pésate 1-2 veces por semana, siempre en ayunas</p>
      </header>

      <ProfileSwitcher />

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center !p-3">
          <div className="text-lg font-extrabold text-ink-800">{last ? `${last.weight_kg}` : "—"}</div>
          <div className="text-[10px] font-medium uppercase text-ink-400">kg actual</div>
        </Card>
        <Card className="text-center !p-3">
          <div className={`text-lg font-extrabold ${weightDelta <= 0 ? "text-emerald-600" : "text-ink-800"}`}>
            {weightDelta > 0 ? "+" : ""}
            {weightDelta}
          </div>
          <div className="text-[10px] font-medium uppercase text-ink-400">kg desde inicio</div>
        </Card>
        <Card className="text-center !p-3">
          <div className={`text-lg font-extrabold ${whr !== null && whr < 0.5 ? "text-emerald-600" : "text-ink-800"}`}>
            {whr ?? "—"}
          </div>
          <div className="text-[10px] font-medium uppercase text-ink-400">cintura/altura</div>
        </Card>
      </div>
      {waistDelta !== null && (
        <p className="-mt-2 text-center text-xs text-ink-500">
          Cintura: {waistDelta > 0 ? "+" : ""}
          {waistDelta} cm desde el inicio {waistDelta < 0 && "· ¡la recomposición va por buen camino! 🎯"}
        </p>
      )}

      {/* Registro (solo en tu propio perfil) */}
      {!isMe && (
        <p className="text-center text-xs text-ink-400">
          Estás viendo el progreso de {active.name} 👀. Cambia a tu perfil para registrar tus medidas.
        </p>
      )}
      {isMe && (
      <Card>
        <h2 className="mb-3 flex items-center gap-2 font-bold">
          <Scale size={18} className="text-brand-600" /> Registrar hoy
        </h2>
        <form onSubmit={save} className="grid grid-cols-3 gap-3">
          <Field label="Peso (kg)">
            <Input type="number" inputMode="decimal" step="0.1" required value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="72.4" />
          </Field>
          <Field label="Cintura (cm)">
            <Input type="number" inputMode="decimal" step="0.5" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="84" />
          </Field>
          <Field label="Cadera (cm)">
            <Input type="number" inputMode="decimal" step="0.5" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="97" />
          </Field>
          <Button type="submit" className="col-span-3">
            {saved ? "✅ Guardado" : "Guardar medidas"}
          </Button>
        </form>
      </Card>
      )}

      <Card>
        <h2 className="mb-2 font-bold">Peso (kg)</h2>
        <LineChart series={series("weight_kg")} />
      </Card>

      <Card>
        <h2 className="mb-2 font-bold">Cintura (cm)</h2>
        <LineChart series={series("waist_cm")} unit="cm" />
      </Card>
    </div>
  );
}
