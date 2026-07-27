"use client";

import { useApp } from "@/lib/store";
import { PRESET_PROFILES } from "@/lib/presets";

/**
 * Switch de vista: tu perfil o el de tu pareja (solo lectura del otro).
 * Cada móvil "es" una persona (mySlot); el switch solo cambia lo que ves.
 */
export function ProfileSwitcher() {
  const { profiles, mySlot, viewSlot, setViewSlot } = useApp();
  if (profiles.length === 0) return null;

  return (
    <div className="flex rounded-full bg-ink-100 p-1">
      {PRESET_PROFILES.map((preset) => {
        const profile = profiles.find((p) => p.slot === preset.slot);
        const isMe = mySlot === preset.slot;
        const label = profile?.name ?? preset.name;
        return (
          <button
            key={preset.slot}
            onClick={() => setViewSlot(preset.slot)}
            disabled={!profile}
            className={`flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-all disabled:opacity-40 ${
              viewSlot === preset.slot ? "bg-ink-200 text-brand-400 shadow-sm" : "text-ink-500"
            }`}
          >
            {label}
            {isMe ? " (tú)" : ""}
            {!profile ? " ⏳" : ""}
          </button>
        );
      })}
    </div>
  );
}
