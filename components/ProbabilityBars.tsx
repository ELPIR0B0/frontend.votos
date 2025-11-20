import { Probability } from "../lib/api";

type Props = {
  probabilities: Probability[];
};

export default function ProbabilityBars({ probabilities }: Props) {
  const total = probabilities.reduce((acc, it) => acc + it.probability, 0) || 1;
  return (
    <div className="grid" style={{ gap: "10px" }}>
      {probabilities.map((item) => {
        const pct = (item.probability / total) * 100;
        return (
          <div key={item.label} className="panel" style={{ borderColor: "rgba(61,139,125,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{item.label}</strong>
              <span>{(item.probability * 100).toFixed(1)}%</span>
            </div>
            <div
              style={{
                background: "rgba(61,139,125,0.12)",
                borderRadius: 8,
                height: 10,
                marginTop: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #3D8B7D, #8FBC91)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
