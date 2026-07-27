"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl2 bg-white shadow-sm border border-ink-100 p-4 ${className}`}>{children}</div>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  const styles = {
    primary:
      "bg-brand-500 text-ink-950 hover:bg-brand-400 active:scale-[0.98] disabled:opacity-40 shadow-sm shadow-brand-200",
    ghost: "bg-ink-50 text-ink-800 hover:bg-ink-100 active:scale-[0.98]",
    outline: "border border-ink-200 text-ink-700 hover:bg-ink-50 active:scale-[0.98]"
  }[variant];
  return (
    <button
      className={`rounded-xl px-4 py-3 font-semibold transition-all text-sm ${styles} ${className}`}
      {...props}
    />
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      {...props}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      {...props}
    />
  );
}

/** Selector de opciones tipo "pill" para el onboarding. */
export function OptionGrid<T extends string | number>({
  options,
  value,
  onChange
}: {
  options: { value: T; label: string; sub?: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-xl border px-4 py-3 text-left transition-all ${
            value === o.value
              ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200"
              : "border-ink-200 bg-white hover:border-ink-300"
          }`}
        >
          <span className="block text-sm font-semibold text-ink-800">{o.label}</span>
          {o.sub && <span className="block text-xs text-ink-500">{o.sub}</span>}
        </button>
      ))}
    </div>
  );
}

/** Anillo de progreso SVG (macros, adherencia semanal). */
export function Ring({
  pct,
  size = 72,
  stroke = 8,
  color = "#22c55e",
  label,
  sub
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sub?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#eceef2" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * clamped) / 100}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute text-center leading-tight">
        {label && <div className="text-sm font-bold text-ink-800">{label}</div>}
        {sub && <div className="text-[10px] text-ink-400">{sub}</div>}
      </div>
    </div>
  );
}
