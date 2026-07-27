import type { Sex, Slot } from "./types";

/** Los dos protagonistas de esta app */
export const PRESET_PROFILES: { slot: Slot; name: string; sex: Sex; emoji: string }[] = [
  { slot: "p1", name: "Pamela", sex: "F", emoji: "⚡" },
  { slot: "p2", name: "Leo", sex: "M", emoji: "🔥" }
];

export function presetFor(slot: Slot) {
  return PRESET_PROFILES.find((p) => p.slot === slot) ?? PRESET_PROFILES[0];
}
