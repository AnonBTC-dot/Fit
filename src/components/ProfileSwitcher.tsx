"use client";

import { useApp } from "@/lib/store";
import { PRESET_PROFILES } from "@/lib/presets";

/**
 * Switch de vista: tu perfil, el de tu pareja, o los dos a la vez.
 * Cada móvil "es" una persona (mySlot); el switch solo cambia lo que ves.
 * El modo "Ambos" solo aparece donde tiene sentido (cocina), con `allowBoth`.
 */
export function ProfileSwitcher({ allowBoth = false }: { allowBoth?: boolean }) {
  const { profiles, mySlot, viewSlot, viewBoth, setViewSlot, setViewBoth } = useApp();
  if (profiles.length === 0) return null;

  const losDos = allowBoth && profiles.length === 2;

  return (
    <div className="flex rounded-full bg-ink-100 p-1">
      {PRESET_PROFILES.map((preset) => {
        const profile = profiles.find((p) => p.slot === preset.slot);
        const isMe = mySlot === preset.slot;
        const label = profile?.name ?? preset.name;
        const activo = !viewBoth && viewSlot === preset.slot;
        return (
          <button
            key={preset.slot}
            onClick={() => setViewSlot(preset.slot)}
            disabled={!profile}
            className={`flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-all disabled:opacity-40 ${
              activo ? "bg-ink-200 text-brand-400 shadow-sm" : "text-ink-500"
            }`}
          >
            {label}
            {isMe ? " (tú)" : ""}
            {!profile ? " ⏳" : ""}
          </button>
        );
      })}

      {losDos && (
        <button
          onClick={() => setViewBoth(true)}
          className={`flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
            viewBoth ? "bg-ink-200 text-brand-400 shadow-sm" : "text-ink-500"
          }`}
        >
          Ambos
        </button>
      )}
    </div>
  );
}
