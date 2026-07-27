"use client";

/** Gráfico de líneas SVG sin dependencias: peso/medidas de los dos perfiles. */

export interface Series {
  name: string;
  color: string;
  points: { x: string; y: number }[]; // x = fecha ISO
}

export function LineChart({ series, height = 160, unit = "kg" }: { series: Series[]; height?: number; unit?: string }) {
  const all = series.flatMap((s) => s.points);
  if (all.length === 0) {
    return <div className="flex h-32 items-center justify-center text-sm text-ink-400">Aún no hay registros</div>;
  }
  const width = 320;
  const pad = { l: 34, r: 8, t: 10, b: 20 };
  const xs = Array.from(new Set(all.map((p) => p.x))).sort();
  const ys = all.map((p) => p.y);
  const yMin = Math.floor(Math.min(...ys) - 1);
  const yMax = Math.ceil(Math.max(...ys) + 1);
  const xPos = (x: string) =>
    xs.length === 1 ? width / 2 : pad.l + ((width - pad.l - pad.r) * xs.indexOf(x)) / (xs.length - 1);
  const yPos = (y: number) => pad.t + (height - pad.t - pad.b) * (1 - (y - yMin) / (yMax - yMin || 1));

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {[yMin, (yMin + yMax) / 2, yMax].map((y) => (
          <g key={y}>
            <line x1={pad.l} x2={width - pad.r} y1={yPos(y)} y2={yPos(y)} stroke="#232c3b" strokeWidth={1} />
            <text x={2} y={yPos(y) + 4} fontSize={9} fill="#8593aa">
              {Math.round(y * 10) / 10}
            </text>
          </g>
        ))}
        {series.map((s) => {
          const pts = s.points
            .slice()
            .sort((a, b) => a.x.localeCompare(b.x))
            .map((p) => `${xPos(p.x)},${yPos(p.y)}`)
            .join(" ");
          return (
            <g key={s.name}>
              <polyline points={pts} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />
              {s.points.map((p) => (
                <circle key={p.x} cx={xPos(p.x)} cy={yPos(p.y)} r={3} fill={s.color} />
              ))}
            </g>
          );
        })}
        {xs.length > 1 &&
          [xs[0], xs[xs.length - 1]].map((x, i) => (
            <text key={x} x={i === 0 ? pad.l : width - pad.r} y={height - 4} fontSize={9} fill="#8593aa" textAnchor={i === 0 ? "start" : "end"}>
              {x.slice(5)}
            </text>
          ))}
      </svg>
      <div className="mt-1 flex gap-4">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5 text-xs text-ink-600">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.name} ({unit})
          </span>
        ))}
      </div>
    </div>
  );
}
