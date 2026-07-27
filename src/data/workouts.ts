import type { DaysPerWeek, Venue } from "@/lib/types";

/**
 * Sesiones estilo Fuertafit: dinámicas, de 12 a 25 minutos, combinando
 * fuerza + cardio/HIIT para recomposición corporal.
 *
 * Estructura de cada sesión:
 *  1. Calentamiento (2-3 min, movilidad + activación)
 *  2. Bloque(s) de fuerza en circuito (rondas con intervalos 40s/20s en casa,
 *     o series por repeticiones en gimnasio)
 *  3. Finisher HIIT (tabata 20s/10s o intervalos 30s/15s) para el pico cardiovascular
 *
 * Criterios: frecuencia 2x/semana por patrón de movimiento, ejercicios
 * multiarticulares, densidad alta (poco descanso) para maximizar gasto
 * calórico en poco tiempo.
 */

export interface CircuitExercise {
  name: string;
  work: string; // "40s" o "12 reps"
  tip: string;
}

export interface Block {
  title: string;
  kind: "warmup" | "strength" | "hiit";
  rounds: number;
  scheme: string; // descripción del formato
  workSec?: number; // para el timer integrado
  restSec?: number;
  exercises: CircuitExercise[];
}

export interface Session {
  title: string;
  focus: string;
  minutes: number;
  blocks: Block[];
}

/* ---------- Calentamientos reutilizables ---------- */

const WARMUP_FULL: Block = {
  title: "Calentamiento",
  kind: "warmup",
  rounds: 1,
  scheme: "1 ronda · 30s por ejercicio, sin parar",
  workSec: 30,
  restSec: 0,
  exercises: [
    { name: "Jumping jacks suaves", work: "30s", tip: "Ritmo cómodo, ve entrando en calor." },
    { name: "Círculos de brazos + cadera", work: "30s", tip: "Amplitud creciente, suelta las articulaciones." },
    { name: "Sentadilla sin peso lenta", work: "30s", tip: "Baja en 3s, activa glúteo al subir." },
    { name: "Zancada dinámica con giro", work: "30s", tip: "Gira el torso hacia la pierna adelantada." }
  ]
};

const WARMUP_UPPER: Block = {
  title: "Calentamiento",
  kind: "warmup",
  rounds: 1,
  scheme: "1 ronda · 30s por ejercicio, sin parar",
  workSec: 30,
  restSec: 0,
  exercises: [
    { name: "Círculos de brazos", work: "30s", tip: "Adelante y atrás, amplios." },
    { name: "Band pull-apart o abrazos", work: "30s", tip: "Abre el pecho, junta escápulas." },
    { name: "Flexión inclinada suave", work: "30s", tip: "Pocas reps, técnica perfecta." },
    { name: "Rotaciones de torso", work: "30s", tip: "Pies fijos, gira controlado." }
  ]
};

const WARMUP_LOWER: Block = {
  title: "Calentamiento",
  kind: "warmup",
  rounds: 1,
  scheme: "1 ronda · 30s por ejercicio, sin parar",
  workSec: 30,
  restSec: 0,
  exercises: [
    { name: "Marcha con rodillas altas", work: "30s", tip: "Brazos activos, core firme." },
    { name: "Bisagra de cadera sin peso", work: "30s", tip: "Cadera atrás, espalda recta." },
    { name: "Sentadilla + talones", work: "30s", tip: "Sentadilla y elevación de talones alterna." },
    { name: "Puente de glúteo", work: "30s", tip: "Aprieta 1s arriba en cada rep." }
  ]
};

/* ---------- CASA (peso corporal) ---------- */

const HOME_3: Session[] = [
  {
    title: "Full Body Dinámico A",
    focus: "Empuje + pierna + core",
    minutes: 20,
    blocks: [
      WARMUP_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Sentadilla con salto suave (o sin salto)", work: "40s", tip: "Aterriza blandito, talones al suelo." },
          { name: "Flexiones (rodillas si hace falta)", work: "40s", tip: "Cuerpo en tabla, codos a 45º." },
          { name: "Zancada alterna", work: "40s", tip: "Paso largo, rodilla trasera casi al suelo." },
          { name: "Plancha con toque de hombro", work: "40s", tip: "Cadera quieta al levantar la mano." }
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
          { name: "Escaladores", work: "20s", tip: "Máxima velocidad que puedas mantener." },
          { name: "Jumping jacks", work: "20s", tip: "Salta ligero, respira con ritmo." }
        ]
      }
    ]
  },
  {
    title: "Full Body Dinámico B",
    focus: "Tirón + glúteo + cardio",
    minutes: 20,
    blocks: [
      WARMUP_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Remo invertido en mesa (o con toalla en puerta)", work: "40s", tip: "Pecho a la mesa, escápulas juntas." },
          { name: "Puente de glúteo a una pierna", work: "40s", tip: "20s por pierna, empuja con el talón." },
          { name: "Peso muerto rumano a una pierna", work: "40s", tip: "20s por pierna, espalda neutra." },
          { name: "Superman con pausa", work: "40s", tip: "2s arriba, mirada al suelo." }
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
          { name: "Burpees adaptados", work: "30s", tip: "Sin salto si lo necesitas; constante." },
          { name: "Skipping en el sitio", work: "30s", tip: "Rodillas altas, brazos activos." }
        ]
      }
    ]
  },
  {
    title: "Full Body Dinámico C",
    focus: "Cuerpo completo + core",
    minutes: 22,
    blocks: [
      WARMUP_FULL,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Sentadilla goblet con mochila", work: "40s", tip: "Mochila abrazada, torso erguido." },
          { name: "Fondos de tríceps en silla", work: "40s", tip: "Hombros lejos de las orejas." },
          { name: "Zancada inversa alterna", work: "40s", tip: "Más amable con las rodillas que la frontal." },
          { name: "Hollow hold o plancha", work: "40s", tip: "Lumbar pegada al suelo." }
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
          { name: "Sentadilla con salto", work: "20s", tip: "O sentadilla rápida sin salto." },
          { name: "Plancha con apertura de piernas", work: "20s", tip: "Como jumping jacks en plancha." }
        ]
      }
    ]
  }
];

const HOME_4: Session[] = [
  {
    title: "Torso Dinámico",
    focus: "Pecho, espalda y hombro",
    minutes: 18,
    blocks: [
      WARMUP_UPPER,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Flexiones", work: "40s", tip: "Variante que te permita 8-15 reps." },
          { name: "Remo invertido o con toalla", work: "40s", tip: "Codos pegados, aprieta espalda." },
          { name: "Pike push-up", work: "40s", tip: "Cadera alta, cabeza entre las manos." },
          { name: "Plancha lateral (cambia a mitad)", work: "40s", tip: "Cadera alta, cuerpo alineado." }
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
          { name: "Shadow boxing", work: "30s", tip: "Golpes rápidos, core girando." },
          { name: "Escaladores", work: "30s", tip: "Cadera baja, ritmo alto." }
        ]
      }
    ]
  },
  {
    title: "Pierna Dinámica",
    focus: "Cuádriceps + glúteo",
    minutes: 20,
    blocks: [
      WARMUP_LOWER,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Sentadilla con pausa abajo", work: "40s", tip: "2s abajo, sube explosivo." },
          { name: "Zancada búlgara (pie en silla)", work: "40s", tip: "20s por pierna, peso delante." },
          { name: "Puente de glúteo con pausa", work: "40s", tip: "Aprieta fuerte 2s arriba." },
          { name: "Elevación de talones", work: "40s", tip: "Sube alto, baja lento." }
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
          { name: "Sentadilla rápida", work: "20s", tip: "Rango completo, máximo ritmo." },
          { name: "Skipping", work: "20s", tip: "Rodillas altas." }
        ]
      }
    ]
  },
  {
    title: "Cardio + Core Exprés",
    focus: "Quema + abdomen (sesión corta)",
    minutes: 14,
    blocks: [
      WARMUP_FULL,
      {
        title: "HIIT principal",
        kind: "hiit",
        rounds: 5,
        scheme: "5 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Burpees adaptados", work: "30s", tip: "Versión sin flexión si hace falta." },
          { name: "Escaladores", work: "30s", tip: "Core apretado siempre." }
        ]
      },
      {
        title: "Core final",
        kind: "strength",
        rounds: 2,
        scheme: "2 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Crunch lento", work: "40s", tip: "Exhala al subir, sin tirón de cuello." },
          { name: "Plancha", work: "40s", tip: "Glúteo y abdomen apretados." },
          { name: "Giro ruso", work: "40s", tip: "Con o sin peso, talones al suelo." }
        ]
      }
    ]
  },
  {
    title: "Full Body + Glúteo",
    focus: "Cuerpo completo con énfasis en glúteo",
    minutes: 22,
    blocks: [
      WARMUP_LOWER,
      {
        title: "Circuito de fuerza",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas · 40s trabajo / 20s descanso",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Hip thrust con hombros en sofá", work: "40s", tip: "Extensión completa, aprieta arriba." },
          { name: "Flexiones", work: "40s", tip: "La variante que domines." },
          { name: "Patada de glúteo en cuadrupedia", work: "40s", tip: "20s por pierna, sin arquear lumbar." },
          { name: "Remo con banda o toalla", work: "40s", tip: "Pausa 1s con escápulas juntas." }
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
          { name: "Jumping jacks", work: "30s", tip: "Ligero y constante." },
          { name: "Sentadilla + patada lateral", work: "30s", tip: "Alterna lado en cada rep." }
        ]
      }
    ]
  }
];

const HOME_5: Session[] = [
  ...HOME_4,
  {
    title: "Movilidad + Cardio Suave",
    focus: "Recuperación activa (día ligero)",
    minutes: 12,
    blocks: [
      WARMUP_FULL,
      {
        title: "Circuito suave",
        kind: "strength",
        rounds: 2,
        scheme: "2 rondas · 40s trabajo / 20s descanso · intensidad suave",
        workSec: 40,
        restSec: 20,
        exercises: [
          { name: "Sentadilla lenta sin peso", work: "40s", tip: "3s de bajada, respira." },
          { name: "Gato-vaca + cobra", work: "40s", tip: "Moviliza toda la columna." },
          { name: "Zancada con estiramiento de cadera", work: "40s", tip: "Mantén 2-3s en la parte baja." },
          { name: "Marcha rápida en el sitio", work: "40s", tip: "Pulso medio, sin ahogo." }
        ]
      }
    ]
  }
];

/* ---------- GIMNASIO (material básico) ---------- */

const GYM_3: Session[] = [
  {
    title: "Full Body Fuerza A",
    focus: "Básicos de empuje + finisher",
    minutes: 25,
    blocks: [
      WARMUP_FULL,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 60-90s de descanso entre rondas",
        exercises: [
          { name: "Sentadilla goblet o con barra", work: "8-10 reps", tip: "Deja 1-2 reps en recámara." },
          { name: "Press banca o mancuernas", work: "8-10 reps", tip: "Escápulas retraídas, pies firmes." },
          { name: "Remo en máquina o polea", work: "10-12 reps", tip: "Pausa 1s con el codo atrás." },
          { name: "Plancha con peso", work: "30-40s", tip: "Disco ligero en la espalda si es fácil." }
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
          { name: "Remo máquina o bici a tope", work: "30s", tip: "Sprint controlado." },
          { name: "Jumping jacks", work: "30s", tip: "Mantén el pulso arriba." }
        ]
      }
    ]
  },
  {
    title: "Full Body Fuerza B",
    focus: "Tirón + cadera + finisher",
    minutes: 25,
    blocks: [
      WARMUP_LOWER,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 60-90s de descanso entre rondas",
        exercises: [
          { name: "Peso muerto rumano", work: "8-10 reps", tip: "Barra pegada a las piernas." },
          { name: "Jalón al pecho", work: "10-12 reps", tip: "Codos hacia el bolsillo trasero." },
          { name: "Press militar mancuernas", work: "8-12 reps", tip: "Core firme, sin arquear." },
          { name: "Crunch en polea", work: "12-15 reps", tip: "Flexiona la columna, no los brazos." }
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
          { name: "Kettlebell swing o sentadilla rápida", work: "20s", tip: "Cadera explosiva." },
          { name: "Escaladores", work: "20s", tip: "Ritmo máximo sostenible." }
        ]
      }
    ]
  },
  {
    title: "Full Body Fuerza C",
    focus: "Glúteo + mixto + finisher",
    minutes: 25,
    blocks: [
      WARMUP_LOWER,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 60-90s de descanso entre rondas",
        exercises: [
          { name: "Hip thrust con barra", work: "8-12 reps", tip: "Aprieta 2s arriba." },
          { name: "Press inclinado mancuernas", work: "8-12 reps", tip: "Baja profundo y controla." },
          { name: "Remo con mancuerna a una mano", work: "10-12 reps/lado", tip: "Tira hacia la cadera." },
          { name: "Zancadas con mancuernas", work: "10 reps/pierna", tip: "Torso erguido, pasos firmes." }
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
          { name: "Battle rope o shadow boxing", work: "30s", tip: "Brazos a tope, rodillas flexionadas." },
          { name: "Skipping", work: "30s", tip: "Rodillas altas." }
        ]
      }
    ]
  }
];

const GYM_4: Session[] = [
  {
    title: "Torso Fuerza",
    focus: "Pecho + espalda",
    minutes: 25,
    blocks: [
      WARMUP_UPPER,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 60-90s de descanso entre rondas",
        exercises: [
          { name: "Press banca", work: "6-10 reps", tip: "Última ronda cerca del fallo." },
          { name: "Remo con barra o máquina", work: "8-10 reps", tip: "Sin inercia, espalda trabaja." },
          { name: "Press militar", work: "8-10 reps", tip: "Glúteos apretados." },
          { name: "Face pull", work: "15-20 reps", tip: "Clave para postura y hombro sano." }
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
          { name: "Jumping jacks", work: "30s", tip: "Recupera el ritmo respirando." }
        ]
      }
    ]
  },
  {
    title: "Pierna Fuerza",
    focus: "Cuádriceps dominante",
    minutes: 25,
    blocks: [
      WARMUP_LOWER,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 90s de descanso entre rondas",
        exercises: [
          { name: "Sentadilla", work: "6-10 reps", tip: "Profundidad según tu movilidad." },
          { name: "Prensa", work: "10-15 reps", tip: "Sin despegar la cadera." },
          { name: "Extensión de cuádriceps", work: "12-15 reps", tip: "Pausa 1s arriba." },
          { name: "Gemelo de pie", work: "10-15 reps", tip: "Estira 2s abajo." }
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
          { name: "Sentadilla con salto", work: "20s", tip: "O sentadilla rápida." },
          { name: "Skipping", work: "20s", tip: "Brazos activos." }
        ]
      }
    ]
  },
  {
    title: "Cardio + Core Exprés",
    focus: "Quema + abdomen (sesión corta)",
    minutes: 15,
    blocks: [
      WARMUP_FULL,
      {
        title: "HIIT principal",
        kind: "hiit",
        rounds: 5,
        scheme: "5 rondas · 30s trabajo / 15s descanso",
        workSec: 30,
        restSec: 15,
        exercises: [
          { name: "Bici o cinta a tope", work: "30s", tip: "Sprint al 85-90%." },
          { name: "Kettlebell swing", work: "30s", tip: "Cadera, no brazos." }
        ]
      },
      {
        title: "Core final",
        kind: "strength",
        rounds: 2,
        scheme: "2 rondas · sin descanso entre ejercicios",
        exercises: [
          { name: "Crunch en polea", work: "12-15 reps", tip: "Siente el abdomen plegarse." },
          { name: "Plancha con peso", work: "30-40s", tip: "Cuerpo en línea." },
          { name: "Elevación de piernas", work: "10-12 reps", tip: "Lumbar pegada al banco." }
        ]
      }
    ]
  },
  {
    title: "Pierna + Glúteo Fuerza",
    focus: "Femoral y glúteo",
    minutes: 25,
    blocks: [
      WARMUP_LOWER,
      {
        title: "Fuerza principal",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 90s de descanso entre rondas",
        exercises: [
          { name: "Peso muerto rumano", work: "8-10 reps", tip: "El femoral se carga en la bajada." },
          { name: "Hip thrust", work: "8-12 reps", tip: "Extensión completa de cadera." },
          { name: "Curl femoral", work: "10-15 reps", tip: "Baja en 3s." },
          { name: "Abducción en máquina", work: "15-20 reps", tip: "Torso inclinado adelante." }
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
          { name: "Step-up rápido a banco", work: "30s", tip: "Alterna piernas, sube con el talón." },
          { name: "Jumping jacks", work: "30s", tip: "Última pieza: vacíalo todo." }
        ]
      }
    ]
  }
];

const GYM_5: Session[] = [
  ...GYM_4,
  {
    title: "Puntos Débiles + Brazo",
    focus: "Hombro, brazo y core (día ligero)",
    minutes: 20,
    blocks: [
      WARMUP_UPPER,
      {
        title: "Circuito de accesorios",
        kind: "strength",
        rounds: 3,
        scheme: "3 rondas del circuito · 60s de descanso entre rondas",
        exercises: [
          { name: "Elevaciones laterales", work: "12-20 reps", tip: "Sin impulso, como sirviendo jarras." },
          { name: "Curl de bíceps", work: "10-12 reps", tip: "Baja en 3s." },
          { name: "Extensión de tríceps en polea", work: "10-15 reps", tip: "Codos fijos al cuerpo." },
          { name: "Giro ruso con disco", work: "20 toques", tip: "Talones al suelo si puedes." }
        ]
      }
    ]
  }
];

const PLANS: Record<Venue, Record<DaysPerWeek, Session[]>> = {
  home: { 3: HOME_3, 4: HOME_4, 5: HOME_5 },
  gym: { 3: GYM_3, 4: GYM_4, 5: GYM_5 }
};

/** Nº de semana ISO actual (para rotar bloques y menús automáticamente). */
export function isoWeekNumber(): number {
  const d = new Date();
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Bloque activo: 4 semanas de Bloque 1 -> 4 semanas de Bloque 2, en ciclo.
 * La sobrecarga progresiva se aplica sola, sin tocar nada en Supabase.
 */
export function currentPhase(): 1 | 2 {
  return isoWeekNumber() % 8 < 4 ? 1 : 2;
}

export function getPlan(venue: Venue, days: DaysPerWeek, phase: 1 | 2 = currentPhase()): Session[] {
  if (phase === 2) {
    // Import estático al final del archivo para evitar ciclos en tiempo de carga
    return PHASE2[venue][days];
  }
  return PLANS[venue][days];
}

/** Sesión que toca hoy: rota según día de la semana (L-V). */
export function todayDayIndex(days: DaysPerWeek): number {
  const dow = new Date().getDay(); // 0=Dom
  const map: Record<DaysPerWeek, number[]> = {
    3: [-1, 0, -1, 1, -1, 2, -1], // L, X, V
    4: [-1, 0, 1, -1, 2, 3, -1], // L, M, J, V
    5: [-1, 0, 1, 2, 3, 4, -1] // L-V
  };
  return map[days][dow];
}

export const VENUE_LABELS: Record<Venue, string> = { home: "En casa", gym: "Gimnasio" };

import { PHASE2_PLANS as PHASE2 } from "./workoutsData";
