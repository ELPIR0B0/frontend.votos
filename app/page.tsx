"use client";

import { useEffect, useState } from "react";
import VoterForm from "../components/VoterForm";
import PredictionResult from "../components/PredictionResult";
import ModelSummary from "../components/ModelSummary";
import TrainingInsights from "../components/TrainingInsights";
import { ModelInfo, Prediction, VoterPayload } from "../lib/api";
import { fetchModelInfo, predict } from "../lib/api";

type Tab = "prediccion" | "resultados" | "aprendizaje";

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>();
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("prediccion");

  useEffect(() => {
    const loadInfo = async () => {
      try {
        setInfoLoading(true);
        const info = await fetchModelInfo();
        setModelInfo(info);
      } catch (err: any) {
        setInfoError(err.message);
      } finally {
        setInfoLoading(false);
      }
    };
    loadInfo();
  }, []);

  const handlePredict = async (payload: VoterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await predict(payload);
      setPrediction(res);
      setActiveTab("resultados");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shell">
      <header
        style={{
          display: "grid",
          gap: "10px",
          marginBottom: "18px",
          background: "linear-gradient(145deg, rgba(61,139,125,0.12), rgba(236,189,191,0.7))",
          padding: "18px",
          borderRadius: "20px",
          border: "1px solid rgba(61,139,125,0.15)",
        }}
      >
        <div className="tag">Modelo KNN como servicio</div>
        <h1 style={{ margin: 0, fontSize: "1.9rem", color: "#243532" }}>
          Predicción de intención de voto
        </h1>
        <p style={{ margin: 0, color: "#31403e" }}>
          Ingresa un perfil, obtén la predicción y revisa cómo se entrenó el modelo.
          Presentado por Leny Lopez · Machine Learning 802.
        </p>
      </header>

      <nav style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        {[
          { id: "prediccion", label: "1. Perfil y predicción" },
          { id: "resultados", label: "2. Resultados e interpretación" },
          { id: "aprendizaje", label: "3. Entrenamiento y consejos" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className="btn-secondary"
            style={{
              background: activeTab === tab.id ? "var(--viridian)" : "var(--beauty-bush)",
              color: activeTab === tab.id ? "#fff" : "#2f3a39",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "prediccion" && (
        <div className="grid" style={{ gap: "16px" }}>
          <VoterForm onSubmit={handlePredict} loading={loading} />
          <div className="panel alert">
            Tip: usa “Ejemplo rápido” y ajusta edad, región, empleo, preferencias y participación. El pipeline completa datos faltantes.
          </div>
        </div>
      )}

      {activeTab === "resultados" && (
        <div className="grid" style={{ gap: "16px" }}>
          <PredictionResult data={prediction} loading={loading} error={error} />
        </div>
      )}

      {activeTab === "aprendizaje" && (
        <div className="grid" style={{ gap: "16px" }}>
          <TrainingInsights info={modelInfo} />
          <ModelSummary info={modelInfo} loading={infoLoading} error={infoError} />
        </div>
      )}
    </div>
  );
}
