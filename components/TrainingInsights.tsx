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
        Vista rápida de cómo rindió el KNN en validación. Valores ilustrativos; obtén los reales desde el notebook de Colab.
      </p>

      <div className="grid" style={{ gap: "12px" }}>
        <div className="panel" style={{ borderColor: "rgba(61,139,125,0.2)" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Accuracy por valor de K</p>
          <div className="grid" style={{ gap: 8 }}>
            {sampleCurve.map((pt) => (
              <div key={pt.k}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>K = {pt.k}</span>
                  <span>{(pt.accuracy * 100).toFixed(1)}%</span>
                </div>
                <div
                  style={{
                    background: "rgba(61,139,125,0.12)",
                    borderRadius: 8,
                    height: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(10, pt.accuracy * 100)}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #3D8B7D, #8FBC91)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: "8px 0 0", color: "#3b4b49" }}>
            Se elige el K que balancea precisión y estabilidad (evita sobreajuste con K muy bajo).
          </p>
        </div>

        <div className="panel" style={{ borderColor: "rgba(219, 197, 87, 0.5)" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Consejos claros</p>
          <ul style={{ margin: "8px 0 0 16px", padding: 0, color: "#3b4b49", lineHeight: 1.4 }}>
            <li>Perfiles muy indecisos → probabilidades repartidas entre varias opciones.</li>
            <li>Escala numéricas y codifica texto: el KNN usa distancias.</li>
            <li>Reentrena con datos frescos y balancea clases pequeñas.</li>
            <li>Consulta el notebook para matriz de confusión y métricas reales.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
