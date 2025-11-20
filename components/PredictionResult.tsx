"use client";

import { Prediction, Probability } from "../lib/api";
import ProbabilityBars from "./ProbabilityBars";

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
      <div className="badge">Resultado y análisis</div>
      {!data && !error && (
        <p style={{ marginTop: 12 }}>
          Envía un perfil para ver la predicción de intención de voto con explicaciones sencillas.
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
            {top3.length > 0 && (
              <p style={{ margin: "6px 0 0", color: "#5a4e12" }}>
                El modelo identifica que este perfil se parece más a votantes de {top3[0].label}. Las barras de probabilidad muestran qué tan clara es la preferencia: si la primera barra está mucho más alta, la predicción es más firme; si están parejas, el caso es ambiguo.
              </p>
            )}
          </div>

          {top3.length > 0 && (
            <div>
              <h4 className="section-title">Top 3 probabilidades</h4>
              <ProbabilityBars probabilities={top3} />
            </div>
          )}

          {data.nearest_neighbors_info && (
            <div className="alert">
              <strong>¿Cómo se calcula?</strong> Se toman los perfiles más parecidos del histórico (vecinos KNN) y se combinan sus preferencias, dando más peso a los más cercanos.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
