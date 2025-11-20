"use client";

import { Prediction, Probability } from "../lib/api";

type Props = {
  data?: Prediction;
  loading?: boolean;
  error?: string | null;
};

function topProbabilities(probs?: Probability[]) {
  if (!probs) return [];
  return [...probs].sort((a, b) => b.probability - a.probability).slice(0, 3);
}

export default function PredictionResult({ data, loading, error }: Props) {
  const top3 = topProbabilities(data?.class_probabilities);

  return (
    <div className="panel">
      <div className="badge">Resultado</div>
      {!data && !error && (
        <p style={{ marginTop: 12 }}>
          Envía un perfil para ver la predicción de intención de voto.
        </p>
      )}
      {loading && <p>Procesando predicción...</p>}
      {error && <div className="alert">Error: {error}</div>}
      {data && !loading && !error && (
        <div className="grid" style={{ gap: "12px" }}>
          <div
            className="panel"
            style={{
              background: "#fffceb",
              borderColor: "rgba(219, 197, 87, 0.7)",
            }}
          >
            <p style={{ margin: 0, color: "#7a6a1a", fontSize: "0.9rem" }}>
              Intención de voto estimada
            </p>
            <h2 style={{ margin: "6px 0 0", color: "#5a4e12" }}>
              {data.predicted_vote}
            </h2>
          </div>

          {top3.length > 0 && (
            <div>
              <h4 className="section-title">Top 3 probabilidades</h4>
              <div className="grid two">
                {top3.map((p) => (
                  <div
                    key={p.label}
                    className="panel"
                    style={{ borderColor: "rgba(61,139,125,0.2)" }}
                  >
                    <strong>{p.label}</strong>
                    <p style={{ margin: "4px 0 0" }}>
                      {(p.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.nearest_neighbors_info && (
            <div className="alert">
              <strong>Vecinos cercanos:</strong> índices{" "}
              {data.nearest_neighbors_info.indices?.join(", ")} con distancias{" "}
              {data.nearest_neighbors_info.distances?.map((d) =>
                d.toFixed ? d.toFixed(3) : d
              ).join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
