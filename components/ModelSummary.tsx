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
              <p style={{ margin: 0, color: "#3c3c3c" }}>¿Qué es?</p>
              <strong>{info.model_type}</strong>
              <p style={{ margin: "4px 0 0" }}>Usa K vecinos para comparar tu perfil con encuestados parecidos.</p>
              <p style={{ margin: "4px 0 0" }}>K elegido: {info.k_value}</p>
              <p style={{ margin: "0" }}>Distancia: {info.metric}</p>
              <p style={{ margin: "0" }}>Peso de vecinos: {info.weights}</p>
            </div>
            <div className="panel">
              <p style={{ margin: 0, color: "#3c3c3c" }}>Resultados</p>
              <p style={{ margin: "4px 0 0" }}>Precisión en validación: {formatNum(info.val_accuracy)}</p>
              <p style={{ margin: "0" }}>Precisión en prueba: {formatNum(info.test_accuracy)}</p>
              <p style={{ margin: "0" }}>Datos usados: {info.train_size ?? "-"}</p>
            </div>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>Clases (resumen):</p>
            <p style={{ margin: "4px 0 0" }}>{classesPreview(info.classes)}</p>
          </div>
          <p style={{ margin: 0, color: "#555" }}>
            ¿Por qué ese K? Se probaron varios valores y se eligió el que mantuvo buena precisión sin volverse inestable. El pipeline limpia datos faltantes, convierte texto a números, normaliza escalas y con KNN decide a qué grupo se parece más cada persona.
          </p>
        </div>
      )}
    </div>
  );
}
