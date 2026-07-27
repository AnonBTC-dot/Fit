"use client";

import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { useApp } from "@/lib/store";
import { PRESET_PROFILES } from "@/lib/presets";

/** Pantalla inicial: ¿quién eres? Sin cuentas, sin contraseñas, sin PIN. */
export default function WelcomePage() {
  const router = useRouter();
  const { profiles, chooseMe } = useApp();

  function pick(slot: "p1" | "p2") {
    chooseMe(slot);
    const hasProfile = profiles.some((p) => p.slot === slot);
    router.replace(hasProfile ? "/dashboard" : `/onboarding?slot=${slot}`);
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center px-5 py-10">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 border border-ink-200 shadow-lg shadow-brand-900">
          <Zap className="text-brand-500" size={30} fill="#22c55e" />
        </div>
        <h1 className="text-2xl font-extrabold text-ink-900">Fit</h1>
        <p className="mt-1 text-sm text-ink-500">Fuerza + HIIT · comida rica de verdad</p>
      </div>

      <p className="mb-3 text-center text-sm font-medium text-ink-600">¿Quién eres?</p>
      <div className="grid grid-cols-2 gap-3">
        {PRESET_PROFILES.map((p) => (
          <button
            key={p.slot}
            onClick={() => pick(p.slot)}
            className="rounded-xl2 border border-ink-100 bg-ink-100 p-6 text-center shadow-sm transition-all active:scale-[0.96]"
          >
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-ink-200 text-3xl">
              {p.emoji}
            </div>
            <div className="text-lg font-bold text-ink-800">Soy {p.name}</div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-ink-400">
        Elige una vez en cada móvil. Vuestro progreso y la lista de la compra se sincronizan solos en la nube.
      </p>
    </div>
  );
}
