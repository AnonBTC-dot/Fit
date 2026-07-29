"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Flame } from "lucide-react";
import { Button, Card, Field, Input, OptionGrid, Select } from "@/components/ui";
import { ACTIVITY_LABELS, calcTargets } from "@/lib/calculations";
import { presetFor } from "@/lib/presets";
import { useApp } from "@/lib/store";
import type { Activity, DaysPerWeek, Goal, Profile, Sex, Slot, Venue } from "@/lib/types";

const STEPS = ["Sobre ti", "Tus medidas", "Tu actividad", "Tu plan", "Resultado"];

function OnboardingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { profiles, mySlot, saveProfile } = useApp();

  const slot: Slot = (params.get("slot") as Slot) ?? mySlot ?? "p1";
  const preset = presetFor(slot);
  const existing = profiles.find((p) => p.slot === slot);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: existing?.name ?? preset.name,
    sex: (existing?.sex ?? preset.sex) as Sex | null,
    age: existing?.age?.toString() ?? "",
    height_cm: existing?.height_cm?.toString() ?? "",
    weight_kg: existing?.weight_kg?.toString() ?? "",
    waist_cm: existing?.waist_cm?.toString() ?? "",
    hip_cm: existing?.hip_cm?.toString() ?? "",
    activity: (existing?.activity ?? null) as Activity | null,
    goal: (existing?.goal ?? null) as Goal | null,
    venue: (existing?.venue ?? null) as Venue | null,
    days_per_week: (existing?.days_per_week ?? 4) as DaysPerWeek,
    eats_breakfast: existing?.eats_breakfast ?? true,
    cheat_day: existing?.cheat_day ?? true
  });

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const profile: Profile | null = useMemo(() => {
    if (!form.name || !form.sex || !form.age || !form.height_cm || !form.weight_kg || !form.activity || !form.goal || !form.venue)
      return null;
    return {
      slot,
      name: form.name.trim(),
      sex: form.sex,
      age: Number(form.age),
      height_cm: Number(form.height_cm),
      weight_kg: Number(form.weight_kg),
      waist_cm: form.waist_cm ? Number(form.waist_cm) : null,
      hip_cm: form.hip_cm ? Number(form.hip_cm) : null,
      activity: form.activity,
      goal: form.goal,
      venue: form.venue,
      days_per_week: form.days_per_week,
      eats_breakfast: form.eats_breakfast,
      cheat_day: form.cheat_day
    };
  }, [form, slot]);

  const targets = profile ? calcTargets(profile) : null;

  const canNext = [
    Boolean(form.name && form.sex && Number(form.age) >= 16),
    Boolean(Number(form.height_cm) > 120 && Number(form.weight_kg) > 35),
    Boolean(form.activity),
    Boolean(form.goal && form.venue)
  ][step];

  async function finish() {
    if (!profile) return;
    await saveProfile(profile);
    router.replace("/dashboard");
  }

  return (
    <div className="px-5 py-8">
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-500">
          <span>
            Paso {step + 1} de {STEPS.length} · {STEPS[step]}
          </span>
          <span>
            {preset.emoji} {form.name || preset.name}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <Card className="grid gap-4">
          <h2 className="text-lg font-bold">¡Hola, {preset.name}! Confirma tus datos</h2>
          <Field label="Nombre">
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tu nombre" />
          </Field>
          <Field label="Sexo biológico" hint="Lo usamos solo para calcular tu metabolismo.">
            <OptionGrid<Sex>
              value={form.sex}
              onChange={(v) => set("sex", v)}
              options={[
                { value: "F", label: "Mujer" },
                { value: "M", label: "Hombre" }
              ]}
            />
          </Field>
          <Field label="Edad">
            <Input type="number" inputMode="numeric" min={16} max={90} value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="30" />
          </Field>
        </Card>
      )}

      {step === 1 && (
        <Card className="grid gap-4">
          <h2 className="text-lg font-bold">Tus medidas de partida</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Estatura (cm)">
              <Input type="number" inputMode="decimal" value={form.height_cm} onChange={(e) => set("height_cm", e.target.value)} placeholder="170" />
            </Field>
            <Field label="Peso (kg)">
              <Input type="number" inputMode="decimal" step="0.1" value={form.weight_kg} onChange={(e) => set("weight_kg", e.target.value)} placeholder="72.5" />
            </Field>
            <Field label="Cintura (cm)">
              <Input type="number" inputMode="decimal" value={form.waist_cm} onChange={(e) => set("waist_cm", e.target.value)} placeholder="85" />
            </Field>
            <Field label="Cadera (cm)">
              <Input type="number" inputMode="decimal" value={form.hip_cm} onChange={(e) => set("hip_cm", e.target.value)} placeholder="98" />
            </Field>
          </div>
          <p className="text-xs text-ink-400">
            La cintura se mide a la altura del ombligo, relajado. Con ella afinamos mucho más tus calorías
            (fórmula Katch-McArdle con % graso estimado). Opcional pero recomendado.
          </p>
        </Card>
      )}

      {step === 2 && (
        <Card className="grid gap-4">
          <h2 className="text-lg font-bold">¿Cómo es tu día a día?</h2>
          <OptionGrid<Activity>
            value={form.activity}
            onChange={(v) => set("activity", v)}
            options={(Object.keys(ACTIVITY_LABELS) as Activity[]).map((a) => ({
              value: a,
              label: ACTIVITY_LABELS[a].split(" (")[0],
              sub: ACTIVITY_LABELS[a].match(/\((.+)\)/)?.[1]
            }))}
          />
        </Card>
      )}

      {step === 3 && (
        <Card className="grid gap-4">
          <h2 className="text-lg font-bold">Tu plan de ataque</h2>
          <Field label="Objetivo">
            <OptionGrid<Goal>
              value={form.goal}
              onChange={(v) => set("goal", v)}
              options={[
                { value: "fatloss", label: "Perder grasa", sub: "Déficit del 20% · prioridad: bajar peso y cintura" },
                { value: "recomp", label: "Recomposición", sub: "Déficit suave del 10% · perder grasa ganando músculo" }
              ]}
            />
          </Field>
          <Field label="¿Dónde entrenarás?">
            <OptionGrid<Venue>
              value={form.venue}
              onChange={(v) => set("venue", v)}
              options={[
                { value: "home", label: "En casa", sub: "Solo peso corporal, sesiones dinámicas de 7-25 min" },
                { value: "gym", label: "Gimnasio", sub: "Material básico + finishers de cardio" }
              ]}
            />
          </Field>
          <Field label="¿Cuál es tu primera comida del día?" hint="Si no desayunas, repartimos esas calorías entre almuerzo y cena.">
            <OptionGrid<string>
              value={form.eats_breakfast ? "si" : "no"}
              onChange={(v) => set("eats_breakfast", v === "si")}
              options={[
                { value: "si", label: "Desayuno por la mañana", sub: "4 comidas: desayuno, almuerzo, snack y cena" },
                { value: "no", label: "Como al mediodía", sub: "3 comidas: almuerzo, snack y cena (ayuno matutino)" }
              ]}
            />
          </Field>
          <Field label="¿Comida libre el fin de semana?" hint="Una comida principal del sábado o domingo se cambia por una versión libre pero controlada.">
            <OptionGrid<string>
              value={form.cheat_day ? "si" : "no"}
              onChange={(v) => set("cheat_day", v === "si")}
              options={[
                { value: "si", label: "Sí, con capricho el finde", sub: "Pizza proteica, hamburguesa doble, costillas BBQ o parrillada" },
                { value: "no", label: "No, estructura limpia siempre", sub: "Mismo tipo de menú los 7 días" }
              ]}
            />
          </Field>
          <Field label="Días de entreno por semana">
            <Select value={form.days_per_week} onChange={(e) => set("days_per_week", Number(e.target.value) as DaysPerWeek)}>
              <option value={3}>3 días (L-X-V)</option>
              <option value={4}>4 días (L-M-J-V)</option>
              <option value={5}>5 días (L a V)</option>
            </Select>
          </Field>
        </Card>
      )}

      {step === 4 && targets && profile && (
        <div className="grid gap-4">
          <Card className="text-center">
            <Flame className="mx-auto mb-2 text-brand-500" size={32} />
            <h2 className="text-lg font-bold">Tu objetivo diario, {profile.name}</h2>
            <div className="my-3 text-4xl font-extrabold text-brand-400">
              {targets.kcal} <span className="text-lg font-semibold text-ink-400">kcal</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Proteína", v: `${targets.protein_g} g`, color: "bg-ink-200 text-brand-700" },
                { label: "Carbohidratos", v: `${targets.carbs_g} g`, color: "bg-ink-50 text-ink-700" },
                { label: "Grasas", v: `${targets.fat_g} g`, color: "bg-ink-50 text-ink-700" }
              ].map((m) => (
                <div key={m.label} className={`rounded-xl p-2 ${m.color}`}>
                  <div className="text-base font-bold">{m.v}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wide opacity-70">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-400">
              Metabolismo basal {targets.bmr} kcal · Gasto diario {targets.tdee} kcal
              {targets.bodyfat_pct !== null && <> · % graso estimado {targets.bodyfat_pct}%</>}
              <br />
              Fórmula: {targets.formula === "katch-mcardle" ? "Katch-McArdle (con tu cintura)" : "Mifflin-St Jeor"}
            </p>
          </Card>
          <Button onClick={finish}>
            Empezar mi plan <Check className="ml-1 inline" size={16} />
          </Button>
        </div>
      )}

      {step < 4 && (
        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)} className="flex-1">
              <ArrowLeft className="mr-1 inline" size={16} /> Atrás
            </Button>
          )}
          <Button onClick={() => setStep(step + 1)} disabled={!canNext} className="flex-1">
            Siguiente <ArrowRight className="ml-1 inline" size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingInner />
    </Suspense>
  );
}
