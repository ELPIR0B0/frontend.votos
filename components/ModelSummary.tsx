"use client";

import { ModelInfo } from "../lib/api";

type Props = {
  info?: ModelInfo;
  loading?: boolean;
  error?: string | null;
};

export default function ModelSummary({ info, loading, error }: Props) {
  return (
    <div className="panel">
      <div className="badge">Resumen del modelo</div>
      {loading && <p>Cargando detalles...</p>}
      {error && <div className="alert">No se pudo cargar /model-info: {error}</div>}
      {!info && !loading && !error && (
        <p>Consulta /model-info para ver detalles del artefacto en el backend.</p>
      )}
      {info && (
        <div className="grid" style={{ gap: "10px" }}>
          <div className="grid two">
            <div className="panel">
              <p style={{ margin: 0, color: "#3c3c3c" }}>Tipo de modelo</p>
              <strong>{info.model_type}</strong>
              <p style={{ margin: "4px 0 0" }}>K = {info.k_value}</p>
              <p style={{ margin: "0" }}>Métrica: {info.metric}</p>
              <p style={{ margin: "0" }}>Weights: {info.weights}</p>
            </div>
            <div className="panel">
              <p style={{ margin: 0, color: "#3c3c3c" }}>Métricas aproximadas</p>
              <p style={{ margin: "4px 0 0" }}>Val acc: {info.val_accuracy ?? "-"} </p>
              <p style={{ margin: "0" }}>Test acc: {info.test_accuracy ?? "-"}</p>
              <p style={{ margin: "0" }}>Tamaño entrenamiento: {info.train_size ?? "-"}</p>
            </div>
          </div>
          <div className="alert">
            <strong>Limitaciones:</strong> modelo educativo y sensible a cambios en los datos.
            Reentrenar con el CSV actualizado antes de usar en campaña.
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Clases:</p>
            <p style={{ margin: "4px 0 0" }}>{info.classes.join(" · ")}</p>
          </div>
          {info.notes && <p style={{ margin: 0, color: "#555" }}>{info.notes}</p>}
        </div>
      )}
    </div>
  );
}
