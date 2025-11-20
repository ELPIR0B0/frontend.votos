"use client";

import { ModelInfo } from "../lib/api";

type Props = {
  info?: ModelInfo;
  loading?: boolean;
  error?: string | null;
};

function formatNum(value?: number) {
  if (value === undefined || value === null) return "-";
  return value.toFixed(2);
}

function classesPreview(classes: string[]) {
  if (!classes.length) return "-";
  if (classes.length <= 6) return classes.join(" · ");
  const head = classes.slice(0, 6).join(" · ");
  return `${head} · +${classes.length - 6} más`;
}

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
              <p style={{ margin: 0, color: "#3c3c3c" }}>Modelo</p>
              <strong>{info.model_type}</strong>
              <p style={{ margin: "4px 0 0" }}>K = {info.k_value}</p>
              <p style={{ margin: "0" }}>Métrica: {info.metric}</p>
              <p style={{ margin: "0" }}>Peso de vecinos: {info.weights}</p>
            </div>
            <div className="panel">
              <p style={{ margin: 0, color: "#3c3c3c" }}>Métricas</p>
              <p style={{ margin: "4px 0 0" }}>Val acc: {formatNum(info.val_accuracy)}</p>
              <p style={{ margin: "0" }}>Test acc: {formatNum(info.test_accuracy)}</p>
              <p style={{ margin: "0" }}>Datos de entrenamiento: {info.train_size ?? "-"}</p>
            </div>
          </div>
          <div className="alert">
            Modelo educativo. Sensible a cambios en los datos; reentrena con el CSV actualizado antes de usarlo en campaña.
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Clases:</p>
            <p style={{ margin: "4px 0 0" }}>{classesPreview(info.classes)}</p>
          </div>
          {info.notes && <p style={{ margin: 0, color: "#555" }}>{info.notes}</p>}
        </div>
      )}
    </div>
  );
}
