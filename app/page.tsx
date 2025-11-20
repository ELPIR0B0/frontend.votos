"use client";

import { useEffect, useState } from "react";
import VoterForm from "../components/VoterForm";
import PredictionResult from "../components/PredictionResult";
import ModelSummary from "../components/ModelSummary";
import { ModelInfo, Prediction, VoterPayload } from "../lib/api";
import { fetchModelInfo, predict } from "../lib/api";

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modelInfo, setModelInfo] = useState<ModelInfo | undefined>();
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);

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
          Ingresa las características de un votante para estimar su afinidad. El backend FastAPI
          expone el pipeline KNN entrenado; esta interfaz consulta `/predict` y muestra probabilidades.
        </p>
      </header>

      <div className="grid" style={{ gap: "16px" }}>
        <VoterForm onSubmit={handlePredict} loading={loading} />
        <PredictionResult data={prediction} loading={loading} error={error} />
        <ModelSummary info={modelInfo} loading={infoLoading} error={infoError} />
        <div className="panel alert">
          Tips: completa al menos edad, región, estatus laboral, preferencia primaria/secundaria y
          los campos de participación. El backend imputará faltantes siguiendo el pipeline del notebook.
          Configura la variable `NEXT_PUBLIC_API_BASE_URL` para apuntar al deployment del backend.
        </div>
      </div>
    </div>
  );
}
