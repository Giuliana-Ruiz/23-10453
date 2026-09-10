///
/// Chart.tsx
///

interface Props {
  data: number[];
}

const Chart = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "#94a3b8",
          fontFamily: "consolas",
          borderRadius: "8px",
          border: "1px solid #334155",
        }}
      >
        <p>⚡ Esperando datos del reactor Macondian para graficar...</p>
      </div>
    );
  }

  const width = 600;
  const height = 280;
  const padding = 40;

  const minVal = Math.min(...data, 0);
  const maxVal = Math.max(...data, 4);
  const range = maxVal - minVal || 1;

  const points = data.map((val, idx) => {
    const x = padding + (idx / Math.max(data.length - 1, 1)) * (width - 2 * padding);
    const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
    return { x, y, val };
  });

  const pathD = points.reduce(
    (acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
    ""
  );

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
      : "";

  const lastValue = data[data.length - 1];

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #334155",
        color: "#f8fafc",
        fontFamily: "consolas",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h5 style={{ margin: 0, color: "#38bdf8", fontWeight: 600 }}>
          Serie Macondiana en Tiempo Real
        </h5>
        <span
          style={{
            backgroundColor: "#1e293b",
            padding: "4px 12px",
            borderRadius: "6px",
            border: "1px solid #3b82f6",
            color: "#f59e0b",
            fontWeight: "bold",
          }}
        >
          Último Promedio: {lastValue !== undefined ? lastValue.toFixed(3) : "N/A"}
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "220px", overflow: "visible" }}>
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * (height - 2 * padding);
          const val = (maxVal - ratio * range).toFixed(1);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#334155" strokeDasharray="4 4" />
              <text x={padding - 8} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">
                {val}
              </text>
            </g>
          );
        })}

        <path d={areaD} fill="url(#chartGlow)" />
        <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={i === points.length - 1 ? "5" : "3"}
            fill={i === points.length - 1 ? "#ffffff" : "#38bdf8"}
            stroke="#0f172a"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
};

export default Chart;