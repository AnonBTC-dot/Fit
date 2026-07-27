# Fit 💪 — En forma juntos para el gran día

PWA mobile-first para Pamela y Leo: recomposición corporal con la filosofía **Fuertafit** — sesiones dinámicas de 12-25 min (fuerza + HIIT) y comida rica de verdad (método del plato, cero dietas aburridas). Cada uno usa la app desde su móvil y todo se sincroniza en una base común de **Supabase (gratis)**: progreso mutuo y lista de la compra compartida en tiempo real. Deploy gratis en **Vercel**.

## Cómo funciona el acceso (sin cuentas, sin PIN)

Vuestro proyecto de Supabase ES el espacio privado de la pareja. En cada móvil se elige una sola vez **"Soy Pamela"** o **"Soy Leo"** y ya está: cada uno registra sus entrenos y medidas de forma independiente, y puede curiosear el progreso del otro (solo lectura). La lista de la compra usa **Supabase Realtime**: si Pamela marca un ingrediente en el súper, a Leo se le tacha en su pantalla al instante.

## Decisiones técnicas

**Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + lucide-react + Zustand + @supabase/supabase-js.

- **Local-first + write-through**: la app abre al instante y funciona offline con la última copia local; cada cambio se escribe en Supabase y se recarga al volver online o al enfocar la app.
- **PWA**: manifest + service worker (instalable, funciona sin conexión). Gráficos SVG propios y fuente del sistema → bundle mínimo.
- **Calorías**: % graso estimado con RFM (estatura + cintura) → BMR con Katch-McArdle si hay cintura, si no Mifflin-St Jeor. Déficit −20% (pérdida de grasa) o −10% (recomposición), suelos 1200/1500 kcal, proteína 1.8-2.0 g/kg.

**Nutrición estilo Fuertafit**: método del plato (½ verduras + ¼ proteína + ¼ carbo complejo). Recetario con buscador y categorías (Desayunos, Almuerzos, Cenas, Snacks): gachas de avena con fruta y nueces, fajitas saludables, pollo al curry con puré, salmón al horno, raviolis de calabacín, hamburguesa fit, pasta proteica, crema con toppings crujientes, mugcake de chocolate... Las raciones se escalan a las kcal de cada perfil y la lista de la compra suma la semana de ambos, organizada por secciones del súper (Proteínas, Frescos, Lácteos, Congelados, Despensa).

**Entrenamiento estilo Fuertafit**: sesiones de 12-25 min → calentamiento + circuito de fuerza (40s/20s en casa, reps en gym) + finisher HIIT (tabata 20/10 o 30/15), con timer de intervalos integrado y checklist de rondas. Plantillas 3/4/5 días, casa (sin material) o gimnasio.

## Estructura del proyecto

```
fit/
├── package.json / tsconfig.json / next.config.mjs
├── tailwind.config.ts / postcss.config.mjs / .env.example
├── supabase/schema.sql       # tablas + realtime (pegar en SQL Editor)
├── public/                   # manifest.json · sw.js · icons/
└── src/
    ├── app/
    │   ├── layout.tsx / globals.css / page.tsx
    │   ├── bienvenida/page.tsx     # "Soy Pamela" / "Soy Leo"
    │   ├── onboarding/page.tsx     # wizard 5 pasos + macros
    │   ├── dashboard/page.tsx      # resumen del día + switch pareja
    │   ├── entrenamiento/page.tsx  # sesión + timer + rondas
    │   ├── nutricion/page.tsx      # menú semanal + recetario buscable
    │   ├── compra/page.tsx         # lista compartida por secciones (realtime)
    │   └── progreso/page.tsx       # registro + gráficos de ambos
    ├── components/   # AppShell, UI, IntervalTimer, LineChart, switcher
    ├── data/         # workouts.ts · meals.ts
    └── lib/          # calculations.ts · store.ts · supabase.ts · presets.ts · types.ts
```

## Configurar Supabase (gratis, ~4 min)

1. Crea cuenta en [supabase.com](https://supabase.com) → **New project** (plan Free).
2. **SQL Editor → New query** → pega todo `supabase/schema.sql` → **Run**.
3. **Project Settings → API** → copia `Project URL` y `anon public key`.

## Probar en local

```bash
npm install
cp .env.example .env.local   # pega tus dos claves de Supabase
npm run dev                  # http://localhost:3000
```

## Desplegar en Vercel (gratis, ~4 min)

1. Sube el proyecto a GitHub:
   ```bash
   git init && git add -A && git commit -m "Fit"
   # crea un repo vacío en github.com y luego:
   git remote add origin https://github.com/TU_USUARIO/fit.git
   git branch -M main && git push -u origin main
   ```
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
3. En **Environment Variables** añade `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. **Deploy** → abrid la URL en cada móvil → **"Añadir a pantalla de inicio"**.

## Primer uso

Cada uno en su móvil: elige su tarjeta (Pamela / Leo) → completa su cuestionario → listo. Todo lo demás se sincroniza solo.
