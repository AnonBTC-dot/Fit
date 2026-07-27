"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell, Home, ListChecks, ShoppingCart, TrendingUp } from "lucide-react";
import { useApp } from "@/lib/store";

const NAV = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/entrenamiento", label: "Entreno", icon: Dumbbell },
  { href: "/nutricion", label: "Comidas", icon: ListChecks },
  { href: "/compra", label: "Compra", icon: ShoppingCart },
  { href: "/progreso", label: "Progreso", icon: TrendingUp }
];

/** Registra el service worker (PWA), sincroniza con Supabase y protege rutas. */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { hydrated, mySlot, profiles, loadFromServer } = useApp();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    loadFromServer();
    const onOnline = () => loadFromServer();
    const onFocus = () => loadFromServer();
    window.addEventListener("online", onOnline);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSetup = pathname === "/bienvenida" || pathname === "/onboarding";
  const myProfileReady = mySlot !== null && profiles.some((p) => p.slot === mySlot);

  useEffect(() => {
    if (!hydrated || isSetup) return;
    if (mySlot === null) router.replace("/bienvenida");
    else if (!myProfileReady) router.replace(`/onboarding?slot=${mySlot}`);
  }, [hydrated, mySlot, myProfileReady, isSetup, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="animate-pulse text-lg font-bold text-brand-600">Fit 💪</div>
      </div>
    );
  }

  const showNav = myProfileReady && !isSetup;

  return (
    <div className="mx-auto min-h-dvh max-w-md">
      <main className={showNav ? "pb-24" : ""}>{children}</main>
      {showNav && (
        <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-ink-100 bg-white/95 backdrop-blur">
          <div className="flex justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium ${
                    active ? "text-brand-600" : "text-ink-400"
                  }`}
                >
                  <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
