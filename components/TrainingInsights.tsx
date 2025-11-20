type Point = { k: number; accuracy: number };

const sampleCurve: Point[] = [
  { k: 3, accuracy: 0.74 },
  { k: 5, accuracy: 0.78 },
  { k: 7, accuracy: 0.82 },
  { k: 9, accuracy: 0.81 },
  { k: 11, accuracy: 0.79 },
];

export default function TrainingInsights() {
  return (
    <div className="panel">
      <div className="badge">Aprendizaje del modelo</div>
      <p style={{ marginTop: 8 }}>
        Esta sección resume cómo se comportó el KNN durante el entrenamiento.
        Los datos son ilustrativos; usa el notebook en Colab para regenerar gráficas reales.
      </p>

      <div className="grid two" style={{ alignItems: "center" }}>
        <div className="panel" style={{ borderColor: "rgba(61,139,125,0.2)" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Curva de accuracy vs K</p>
          <div style={{ height: 180, position: "relative", padding: "10px 6px 0" }}>
            {sampleCurve.map((pt) => (
              <div
                key={pt.k}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: `${(pt.k - 3) * 18}%`,
                  width: 20,
                  height: `${pt.accuracy * 140}px`,
                  background: "linear-gradient(180deg, #3D8B7D, #8FBC91)",
                  borderRadius: 6,
                }}
                title={`K=${pt.k} | acc=${(pt.accuracy * 100).toFixed(1)}%`}
              />
            ))}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 1,
                background: "rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <p style={{ margin: "8px 0 0", color: "#3b4b49" }}>
            El mejor K se selecciona por equilibrio entre estabilidad y desempeño.
          </p>
        </div>

        <div className="panel" style={{ borderColor: "rgba(219, 197, 87, 0.5)" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Consejos rápidos</p>
          <ul style={{ margin: "8px 0 0 16px", padding: 0, color: "#3b4b49" }}>
            <li>Perfiles con alta indecisión tienden a repartirse entre varias clases.</li>
            <li>Escalar numéricas y codificar categóricas es clave para KNN.</li>
            <li>Reentrena con datos frescos y balancea clases minoritarias.</li>
          </ul>
          <p style={{ margin: "6px 0 0", color: "#5a4e12" }}>
            Usa el notebook en Colab para ver matriz de confusión y métricas macro.
          </p>
        </div>
      </div>
    </div>
  );
}
