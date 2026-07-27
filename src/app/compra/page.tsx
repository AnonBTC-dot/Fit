"use client";

import { useEffect, useMemo } from "react";
import { CheckCircle2, Circle, Cloud, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui";
import { calcTargets } from "@/lib/calculations";
import { SECTION_ORDER, buildShoppingList, formatQty } from "@/data/meals";
import { subscribeShoppingRealtime, useApp } from "@/lib/store";

const SECTION_EMOJI: Record<string, string> = {
  Proteínas: "🥩",
  Frescos: "🥦",
  "Lácteos y huevos": "🥚",
  Congelados: "🧊",
  Despensa: "🛒"
};

/**
 * Lista de la compra COMPARTIDA: suma la semana de ambos y sincroniza los
 * ticks en la nube en tiempo real (si Pamela marca, a Leo se le tacha).
 */
export default function ShoppingPage() {
  const { profiles, checks, toggleCheck } = useApp();

  useEffect(() => {
    const unsubscribe = subscribeShoppingRealtime();
    return unsubscribe;
  }, []);

  const items = useMemo(
    () => buildShoppingList(profiles.map((p) => calcTargets(p).kcal)),
    [profiles]
  );

  if (profiles.length === 0) return null;

  const total = items.reduce((acc, i) => acc + i.estPrice, 0);
  const names = profiles.map((p) => p.name).join(" + ");
  const doneCount = items.filter((i) => checks[i.ingredient.id]).length;

  return (
    <div className="grid gap-4 px-5 py-6">
      <header>
        <h1 className="text-xl font-extrabold">Lista de la compra</h1>
        <p className="flex items-center gap-1 text-sm text-ink-500">
          Semana completa para {names} <Cloud size={13} className="text-brand-500" /> sincronizada
        </p>
      </header>

      <Card className="flex items-center justify-between bg-brand-50 !border-brand-100 !py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
          <ShoppingCart size={18} /> {doneCount}/{items.length} en el carro
        </div>
        <span className="text-lg font-extrabold text-brand-700">~{Math.round(total)} €</span>
      </Card>

      {SECTION_ORDER.map((section) => {
        const sectionItems = items.filter((i) => i.ingredient.section === section);
        if (sectionItems.length === 0) return null;
        return (
          <Card key={section}>
            <h2 className="mb-2 font-bold">
              {SECTION_EMOJI[section]} {section}
            </h2>
            <div className="grid gap-1">
              {sectionItems.map((item) => {
                const isChecked = Boolean(checks[item.ingredient.id]);
                return (
                  <button
                    key={item.ingredient.id}
                    onClick={() => toggleCheck(item.ingredient.id)}
                    className={`flex items-center justify-between rounded-xl px-2 py-2.5 text-left transition-all ${
                      isChecked ? "opacity-40" : "hover:bg-ink-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isChecked ? (
                        <CheckCircle2 size={18} className="shrink-0 text-brand-600" />
                      ) : (
                        <Circle size={18} className="shrink-0 text-ink-300" />
                      )}
                      <span>
                        <span
                          className={`block text-sm font-medium text-ink-800 ${isChecked ? "line-through" : ""}`}
                        >
                          {item.ingredient.name}
                        </span>
                        <span className="block text-xs text-ink-400">
                          {item.packs} × {item.ingredient.packLabel}
                        </span>
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-sm font-semibold text-ink-700">
                        {formatQty(item.totalQty, item.ingredient.unit)}
                      </span>
                      <span className="block text-xs text-ink-400">~{item.estPrice.toFixed(2)} €</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        );
      })}

      <p className="text-center text-xs text-ink-400">
        Cantidades = menú semanal de ambos, escalado a las calorías de cada uno. La lista se renueva sola cada
        lunes. Precios orientativos.
      </p>
    </div>
  );
}
