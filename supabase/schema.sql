-- Fit · Esquema de base de datos (Supabase, plan gratuito)
-- Ejecutar en: Dashboard -> SQL Editor -> New query -> pegar todo -> Run.
--
-- Sin cuentas, sin contraseñas, sin PIN: vuestro proyecto de Supabase ES el
-- espacio privado de la pareja. En cada móvil solo se elige "Soy Pamela" o
-- "Soy Leo" (slot p1/p2) y todo queda sincronizado en esta base común.

create table if not exists public.profiles (
  id            uuid primary key default gen_random_uuid(),
  slot          text not null unique check (slot in ('p1', 'p2')),
  name          text not null,
  sex           text not null check (sex in ('M', 'F')),
  age           int  not null check (age between 16 and 90),
  height_cm     numeric not null check (height_cm between 120 and 230),
  weight_kg     numeric not null check (weight_kg between 35 and 250),
  waist_cm      numeric,
  hip_cm        numeric,
  activity      text not null check (activity in ('sedentary', 'light', 'moderate', 'high')),
  goal          text not null check (goal in ('fatloss', 'recomp')),
  venue         text not null check (venue in ('home', 'gym')),
  days_per_week int not null default 4 check (days_per_week in (3, 4, 5)),
  created_at    timestamptz not null default now()
);

create table if not exists public.measurements (
  id        uuid primary key default gen_random_uuid(),
  slot      text not null check (slot in ('p1', 'p2')),
  date      date not null default current_date,
  weight_kg numeric not null,
  waist_cm  numeric,
  hip_cm    numeric,
  unique (slot, date)
);

create table if not exists public.workout_logs (
  id             uuid primary key default gen_random_uuid(),
  slot           text not null check (slot in ('p1', 'p2')),
  date           date not null default current_date,
  day_index      int  not null,
  done_exercises jsonb not null default '[]'::jsonb,
  completed      boolean not null default false,
  unique (slot, date)
);

-- Lista de la compra compartida: los "ticks" viven en la nube y se
-- sincronizan al instante. Clave por semana ISO (ej. "2026-W31"), así la
-- lista "se limpia" sola cada lunes.
create table if not exists public.shopping_checks (
  id            uuid primary key default gen_random_uuid(),
  week          text not null,
  ingredient_id text not null,
  checked       boolean not null default true,
  updated_at    timestamptz not null default now(),
  unique (week, ingredient_id)
);

create table if not exists public.couple_settings (
  id           int primary key default 1 check (id = 1),
  wedding_date date,
  updated_at   timestamptz not null default now()
);

-- Acceso con la anon key del proyecto (solo la tenéis vosotros dos).
alter table public.profiles        enable row level security;
alter table public.measurements    enable row level security;
alter table public.workout_logs    enable row level security;
alter table public.shopping_checks enable row level security;
alter table public.couple_settings enable row level security;

create policy "open profiles" on public.profiles        for all using (true) with check (true);
create policy "open meas"     on public.measurements    for all using (true) with check (true);
create policy "open logs"     on public.workout_logs    for all using (true) with check (true);
create policy "open checks"   on public.shopping_checks for all using (true) with check (true);
create policy "open settings" on public.couple_settings for all using (true) with check (true);

-- Realtime: el tick de la compra aparece en el otro móvil al momento.
alter publication supabase_realtime add table public.shopping_checks;

-- ─────────────────────────────────────────────────────────────────────────────
-- REGISTRO DE COMIDAS (conteo diario de calorías y macros)
-- Cada fila = un plato que alguien marcó como comido.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists intake_log (
  id          text primary key,
  slot        text not null check (slot in ('p1','p2')),
  date        date not null,
  meal_id     text not null,
  servings    numeric not null default 1,
  kcal        numeric not null default 0,
  protein     numeric not null default 0,
  carbs       numeric not null default 0,
  fat         numeric not null default 0,
  created_at  timestamptz default now()
);

create index if not exists intake_log_slot_date_idx on intake_log (slot, date);

alter table intake_log enable row level security;
drop policy if exists "intake abierto" on intake_log;
create policy "intake abierto" on intake_log for all using (true) with check (true);

-- Perfiles: si desayunas o si tu primera comida es al mediodía
alter table profiles add column if not exists eats_breakfast boolean default true;
