"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

/** Raíz: redirige a la bienvenida o al panel. */
export default function RootPage() {
  const router = useRouter();
  const { hydrated, mySlot, profiles } = useApp();

  useEffect(() => {
    if (!hydrated) return;
    if (mySlot === null) router.replace("/bienvenida");
    else if (!profiles.some((p) => p.slot === mySlot)) router.replace(`/onboarding?slot=${mySlot}`);
    else router.replace("/dashboard");
  }, [hydrated, mySlot, profiles, router]);

  return null;
}
