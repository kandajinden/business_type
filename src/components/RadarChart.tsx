"use client";

import { AxisScores, AXIS_LABELS, AxisKey } from "@/types";

interface Props {
  scores: AxisScores;
  size?: number;
}

const AXES: AxisKey[] = ["L", "C", "G", "A", "I", "E"];

export default function RadarChart({ scores, size = 280 }: Props) {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = [20, 40, 60, 80, 100];

  const getPoint = (axisIndex: number, value: number) => {
    const angle = (Math.PI * 2 * axisIndex) / 6 - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = AXES.map((_, i) => getPoint(i, scores[AXES[i]]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* グリッド */}
        {levels.map((level) => {
          const points = AXES.map((_, i) => getPoint(i, level));
          const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return (
            <path
              key={level}
              d={path}
              fill="none"
              stroke="#CCCCCC"
              strokeWidth={0.5}
            />
          );
        })}

        {/* 軸線 */}
        {AXES.map((_, i) => {
          const p = getPoint(i, 100);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="#CCCCCC"
              strokeWidth={0.5}
            />
          );
        })}

        {/* データ面 */}
        <path d={dataPath} fill="#E84715" fillOpacity={0.2} stroke="#E84715" strokeWidth={2} />

        {/* データ点 */}
        {dataPoints.map((p, i) => (
          <circle key={`point-${i}`} cx={p.x} cy={p.y} r={4} fill="#E84715" />
        ))}

        {/* ラベル */}
        {AXES.map((axis, i) => {
          const labelPos = getPoint(i, 120);
          return (
            <text
              key={`label-${i}`}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-[#555555]"
            >
              {AXIS_LABELS[axis]}
            </text>
          );
        })}

        {/* スコア値 */}
        {AXES.map((axis, i) => {
          const scorePos = getPoint(i, scores[axis] + 12);
          return (
            <text
              key={`score-${i}`}
              x={scorePos.x}
              y={scorePos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] font-bold fill-[#E84715]"
            >
              {scores[axis]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
