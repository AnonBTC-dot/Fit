import type { DaysPerWeek, Venue } from "@/lib/types";
import type { Block, Session } from "./workouts";

/**
 * BLOQUE 2 DE ENTRENAMIENTO · Sobrecarga progresiva estilo Fuertafit.
 * La app alterna automáticamente: 4 semanas Bloque 1 → 4 semanas Bloque 2.
 *
 * Progresión aplicada respecto al Bloque 1:
 * - Casa: intervalos 45s/15s (más tiempo bajo tensión), 4 rondas en vez de 3,
 *   variantes más exigentes (búlgaras, flexión diamante, plancha dinámica).
 * - Gym: rangos de fuerza 5-8 reps en básicos + técnicas de intensidad
 *   (series descendentes, pausas) y nuevos ejercicios.
 * - Finishers HIIT nuevos para mantener el estímulo cardiovascular.
 */

const WARMUP2_FULL: Block = {
  title: "Calentamiento",
  kind: "warmup",
  rounds: 1,
  scheme: "1 ronda · 30s por ejercicio, sin parar",
  workSec: 30,
  restSec: 0,
  exercises: [
    { name: "Comba imaginaria", work: "30s", tip: "Salta ligero sobre las puntas." },
    { name: "Rotaciones de cadera y tobillo", work: "30s", tip: "Amplio y controlado." },
    { name: "Sentadilla + alcance arriba", work: "30s", tip: "Estira todo el cuerpo al subir." },
    { name: "Plancha con extensión de brazo", work: "30s", tip: "Activa core y hombro." }
  ]
};

/* ---------- CASA · Bloque 2 ---------- */

const HOME2_3: Session[] = [
  {
    title: "B2 · Full Body Tensión A",
    focus: "Empuje + pierna (45s trabajo)",
    minutes: 22,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 4,
        scheme: "4 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Sentadilla búlgara (pie en silla)", work: "45s", tip: "22s por pierna; baja en 3s." },
          { name: "Flexión con manos juntas (diamante)", work: "45s", tip: "Codos pegados: más tríceps y pecho interno." },
          { name: "Zancada con pulso abajo", work: "45s", tip: "Doble rebote en la parte baja de cada rep." },
          { name: "Plancha dinámica (antebrazo-mano)", work: "45s", tip: "Sube y baja sin balancear la cadera." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "Tabata · 4 rondas · 20s a tope / 10s descanso",
        workSec: 20,
        restSec: 10,
        exercises: [
          { name: "Sprint en el sitio", work: "20s", tip: "Rodillas altas, máxima frecuencia." },
          { name: "Sentadilla con salto", work: "20s", tip: "Aterriza suave y encadena." }
        ]
      }
    ]
  },
  {
    title: "B2 · Full Body Tensión B",
    focus: "Tirón + glúteo (45s trabajo)",
    minutes: 22,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 4,
        scheme: "4 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Remo invertido con pausa 2s", work: "45s", tip: "Congela arriba con escápulas juntas." },
          { name: "Hip thrust a una pierna (sofá)", work: "45s", tip: "22s por pierna, cadera bien arriba." },
          { name: "Peso muerto rumano lento (mochila)", work: "45s", tip: "4s de bajada, siente el femoral." },
          { name: "Curl con banda + press hombro", work: "45s", tip: "Combo continuo, sin descanso interno." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "4 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Burpee completo", work: "30s", tip: "Versión con flexión si puedes." },
          { name: "Patinador lateral", work: "30s", tip: "Salta de lado a lado, aterriza estable." }
        ]
      }
    ]
  },
  {
    title: "B2 · Full Body Tensión C",
    focus: "Cuerpo completo + core avanzado",
    minutes: 24,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 4,
        scheme: "4 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Sentadilla goblet pausada (mochila)", work: "45s", tip: "3s abajo + subida explosiva." },
          { name: "Flexión con pies elevados", work: "45s", tip: "Pies en silla: más carga en hombros." },
          { name: "Puente de glúteo con marcha", work: "45s", tip: "Cadera arriba, levanta rodillas alternas." },
          { name: "Hollow rock o hollow hold", work: "45s", tip: "Lumbar pegada al suelo siempre." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 5,
        scheme: "5 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Escaladores cruzados", work: "30s", tip: "Rodilla al codo contrario." },
          { name: "Jumping jacks con sentadilla", work: "30s", tip: "Alterna 4 jacks + 2 sentadillas." }
        ]
      }
    ]
  }
];

const HOME2_4: Session[] = [
  {
    title: "B2 · Torso Tensión",
    focus: "Pecho, espalda y hombro (45s)",
    minutes: 20,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 4,
        scheme: "4 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Flexión diamante o estándar lenta", work: "45s", tip: "3s de bajada en cada rep." },
          { name: "Remo invertido con pausa", work: "45s", tip: "2s de aprieto arriba." },
          { name: "Pike push-up con pies elevados", work: "45s", tip: "Más carga al hombro que en B1." },
          { name: "Plancha lateral con rotación", work: "45s", tip: "22s por lado, gira el brazo bajo el cuerpo." }
        ]
      },
      {
        title: "Finisher",
        kind: "hiit",
        rounds: 3,
        scheme: "3 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Shadow boxing con sprawl", work: "30s", tip: "Golpea 5s, baja al suelo y sube." },
          { name: "Escaladores", work: "30s", tip: "Ritmo máximo sostenible." }
        ]
      }
    ]
  },
  {
    title: "B2 · Pierna Tensión",
    focus: "Cuádriceps + glúteo (45s)",
    minutes: 22,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 4,
        scheme: "4 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Sentadilla búlgara", work: "45s", tip: "22s por pierna, torso ligeramente inclinado." },
          { name: "Sentadilla sissy asistida o pausada", work: "45s", tip: "Rodillas adelante controlando, talones arriba." },
          { name: "Hip thrust a una pierna", work: "45s", tip: "22s por pierna, aprieta 2s." },
          { name: "Gemelo a una pierna lento", work: "45s", tip: "3s bajada, pausa abajo." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "Tabata · 4 rondas · 20s a tope / 10s descanso",
        workSec: 20,
        restSec: 10,
        exercises: [
          { name: "Salto al cajón o sentadilla salto", work: "20s", tip: "Potencia máxima con aterrizaje suave." },
          { name: "Patinador lateral", work: "20s", tip: "Empuja fuerte con la pierna exterior." }
        ]
      }
    ]
  },
  {
    title: "B2 · HIIT Metabólico Exprés",
    focus: "Quema total (sesión corta)",
    minutes: 15,
    blocks: [
      WARMUP2_FULL,
      {
        title: "HIIT principal",
        kind: "hiit",
        rounds: 6,
        scheme: "6 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Burpee completo", work: "30s", tip: "Tu ritmo, pero sin parar." },
          { name: "Sprint en el sitio", work: "30s", tip: "Brazos a tope." }
        ]
      },
      {
        title: "Core final",
        kind: "strength",
        rounds: 2,
        scheme: "2 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Hollow hold", work: "45s", tip: "Brazos atrás si aguantas." },
          { name: "Plancha con toque de hombro", work: "45s", tip: "Cadera de piedra." },
          { name: "Crunch bicicleta", work: "45s", tip: "Lento y con giro completo." }
        ]
      }
    ]
  },
  {
    title: "B2 · Full Body + Glúteo",
    focus: "Énfasis en glúteo (45s)",
    minutes: 24,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 4,
        scheme: "4 rondas · 45s trabajo / 15s descanso",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Hip thrust con pausa 3s (sofá)", work: "45s", tip: "El triple de aprieto que en B1." },
          { name: "Zancada inversa + rodilla arriba", work: "45s", tip: "Encadena el gesto completo por pierna." },
          { name: "Flexiones", work: "45s", tip: "La variante que te rete a 8-12 reps." },
          { name: "Patada de glúteo con pulso", work: "45s", tip: "22s por pierna con doble rebote arriba." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "4 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Sentadilla con salto", work: "30s", tip: "O rápida sin salto." },
          { name: "Puente de glúteo rápido", work: "30s", tip: "Vacía el depósito del glúteo." }
        ]
      }
    ]
  }
];

const HOME2_5: Session[] = [
  ...HOME2_4,
  {
    title: "B2 · Movilidad + Cardio Suave",
    focus: "Recuperación activa (día ligero)",
    minutes: 12,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito suave",
        kind: "strength",
        rounds: 2,
        scheme: "2 rondas · 45s trabajo / 15s descanso · intensidad suave",
        workSec: 45,
        restSec: 15,
        exercises: [
          { name: "Sentadilla profunda mantenida", work: "45s", tip: "Respira abajo, moviliza cadera." },
          { name: "Gato-vaca + cobra", work: "45s", tip: "Columna despierta." },
          { name: "Zancada con estiramiento de psoas", work: "45s", tip: "2-3s por lado en la parte baja." },
          { name: "Marcha rápida en el sitio", work: "45s", tip: "Pulso medio, sin ahogo." }
        ]
      }
    ]
  }
];

/* ---------- GIMNASIO · Bloque 2 ---------- */

const GYM2_3: Session[] = [
  {
    title: "B2 · Full Body Fuerza A",
    focus: "Básicos pesados 5-8 reps",
    minutes: 25,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 90-120s de descanso · sube peso vs Bloque 1",
        exercises: [
          { name: "Sentadilla con barra", work: "5-8 reps", tip: "Más peso, misma técnica: 1-2 en recámara." },
          { name: "Press banca", work: "5-8 reps", tip: "Pausa 1s en el pecho." },
          { name: "Remo con barra", work: "6-8 reps", tip: "Torso a 45º, tira al ombligo." },
          { name: "Plancha con peso", work: "40-50s", tip: "Añade disco respecto al B1." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "4 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Assault bike o remo sprint", work: "30s", tip: "90% de esfuerzo." },
          { name: "Wall ball o sentadilla + press", work: "30s", tip: "Fluido y constante." }
        ]
      }
    ]
  },
  {
    title: "B2 · Full Body Fuerza B",
    focus: "Tirón + cadera 5-8 reps",
    minutes: 25,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 90-120s de descanso",
        exercises: [
          { name: "Peso muerto rumano", work: "6-8 reps", tip: "Sube peso; espalda de acero." },
          { name: "Dominada asistida o jalón pesado", work: "6-8 reps", tip: "Si haces 8, añade lastre o menos goma." },
          { name: "Press militar con barra", work: "6-8 reps", tip: "Glúteo y core apretados." },
          { name: "Crunch en polea pesado", work: "10-12 reps", tip: "Más peso que en B1." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "Tabata · 4 rondas · 20s a tope / 10s descanso",
        workSec: 20,
        restSec: 10,
        exercises: [
          { name: "Kettlebell swing pesado", work: "20s", tip: "Cadera explosiva." },
          { name: "Burpee", work: "20s", tip: "Los últimos 20s de la sesión: todo." }
        ]
      }
    ]
  },
  {
    title: "B2 · Full Body Fuerza C",
    focus: "Glúteo + mixto con drop sets",
    minutes: 25,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · última serie de cada ejercicio en drop set",
        exercises: [
          { name: "Hip thrust pesado", work: "6-8 reps + drop", tip: "Última ronda: baja 30% el peso y saca 8 más." },
          { name: "Press inclinado mancuernas", work: "6-8 reps + drop", tip: "Drop solo en la última ronda." },
          { name: "Remo mancuerna a una mano", work: "8-10 reps/lado", tip: "El codo roza la cadera." },
          { name: "Zancada búlgara con mancuernas", work: "8 reps/pierna", tip: "Nueva vs B1: pierna atrás en banco." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "4 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Farmer walk rápido", work: "30s", tip: "Mancuernas pesadas, pasos cortos." },
          { name: "Jumping jacks", work: "30s", tip: "Recupera respirando por la nariz." }
        ]
      }
    ]
  }
];

const GYM2_4: Session[] = [
  {
    title: "B2 · Torso Fuerza Pesada",
    focus: "Pecho + espalda 5-8 reps",
    minutes: 25,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 90-120s de descanso · sube peso vs B1",
        exercises: [
          { name: "Press banca", work: "5-8 reps", tip: "Progresión doble: llega a 8 y sube peso." },
          { name: "Remo con barra o pendlay", work: "6-8 reps", tip: "Fuerza pura desde el suelo." },
          { name: "Press militar", work: "6-8 reps", tip: "Sin impulso de piernas." },
          { name: "Face pull pesado", work: "12-15 reps", tip: "Codos altos, pausa atrás." }
        ]
      },
      {
        title: "Finisher",
        kind: "hiit",
        rounds: 3,
        scheme: "3 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Remo máquina sprint", work: "30s", tip: "Potencia con técnica." },
          { name: "Battle rope o shadow boxing", work: "30s", tip: "Brazos vivos hasta el final." }
        ]
      }
    ]
  },
  {
    title: "B2 · Pierna Fuerza Pesada",
    focus: "Cuádriceps 5-8 reps + drop",
    minutes: 25,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 2min de descanso · última serie drop set",
        exercises: [
          { name: "Sentadilla con barra", work: "5-8 reps", tip: "El básico del bloque: apunta a récord." },
          { name: "Prensa pesada", work: "8-10 reps + drop", tip: "Drop en la última ronda." },
          { name: "Extensión cuádriceps con pausa", work: "10-12 reps", tip: "2s arriba en cada rep." },
          { name: "Gemelo de pie pesado", work: "8-10 reps", tip: "3s de bajada." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "Tabata · 4 rondas · 20s a tope / 10s descanso",
        workSec: 20,
        restSec: 10,
        exercises: [
          { name: "Salto al cajón", work: "20s", tip: "Baja pisando, no saltes hacia atrás." },
          { name: "Sprint en el sitio", work: "20s", tip: "Rodillas altas." }
        ]
      }
    ]
  },
  {
    title: "B2 · HIIT Metabólico Exprés",
    focus: "Cardio + core (sesión corta)",
    minutes: 15,
    blocks: [
      WARMUP2_FULL,
      {
        title: "HIIT principal",
        kind: "hiit",
        rounds: 6,
        scheme: "6 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Assault bike / cinta sprint", work: "30s", tip: "85-90% cada ronda." },
          { name: "Kettlebell swing", work: "30s", tip: "La cadera manda." }
        ]
      },
      {
        title: "Core final",
        kind: "strength",
        rounds: 2,
        scheme: "2 rondas · sin descanso entre ejercicios",
        exercises: [
          { name: "Rueda abdominal o polea", work: "10-12 reps", tip: "Lumbar neutra." },
          { name: "Plancha con peso", work: "40s", tip: "Más disco que en B1." },
          { name: "Elevación de piernas colgado", work: "8-12 reps", tip: "Sin balanceo." }
        ]
      }
    ]
  },
  {
    title: "B2 · Femoral + Glúteo Pesado",
    focus: "Cadena posterior 6-8 reps",
    minutes: 25,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 90-120s de descanso",
        exercises: [
          { name: "Peso muerto rumano pesado", work: "6-8 reps", tip: "La estrella del bloque para glúteo-femoral." },
          { name: "Hip thrust con pausa 2s", work: "6-8 reps", tip: "Pausa arriba en todas las reps." },
          { name: "Curl femoral tumbado", work: "8-10 reps + drop", tip: "Drop en la última ronda." },
          { name: "Abducción pesada", work: "12-15 reps", tip: "Torso adelante, pausa fuera." }
        ]
      },
      {
        title: "Finisher HIIT",
        kind: "hiit",
        rounds: 4,
        scheme: "4 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Step-up con mancuernas", work: "30s", tip: "Alterna piernas con ritmo." },
          { name: "Swing con kettlebell", work: "30s", tip: "Última pieza: vacíalo." }
        ]
      }
    ]
  }
];

const GYM2_5: Session[] = [
  ...GYM2_4,
  {
    title: "B2 · Brazos + Hombro + Core",
    focus: "Accesorios con superseries (día ligero)",
    minutes: 20,
    blocks: [
      WARMUP2_FULL,
      {
        title: "Circuito de accesorios",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas en superserie · 60s de descanso entre rondas",
        exercises: [
          { name: "Curl bíceps + extensión tríceps", work: "10-12 + 10-12", tip: "Superserie sin descanso interno." },
          { name: "Elevaciones laterales con pausa", work: "12-15 reps", tip: "1s arriba en cada rep." },
          { name: "Curl martillo", work: "10-12 reps", tip: "Nuevo vs B1: agarre neutro." },
          { name: "Giro ruso con disco", work: "20 toques", tip: "Controla el giro, no lo lances." }
        ]
      }
    ]
  }
];

export const PHASE2_PLANS: Record<Venue, Record<DaysPerWeek, Session[]>> = {
  home: { 3: HOME2_3, 4: HOME2_4, 5: HOME2_5 },
  gym: { 3: GYM2_3, 4: GYM2_4, 5: GYM2_5 }
};
