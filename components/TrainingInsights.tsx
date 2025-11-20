import { ModelInfo } from "../lib/api";

type Point = { k: number; accuracy: number };

const sampleCurve: Point[] = [
  { k: 3, accuracy: 0.74 },
  { k: 5, accuracy: 0.78 },
  { k: 7, accuracy: 0.82 },
  { k: 9, accuracy: 0.81 },
  { k: 11, accuracy: 0.79 },
];

type Props = {
  info?: ModelInfo;
};

export default function TrainingInsights({ info }: Props) {
  const chosenK = info?.k_value ?? 7;
  const valAcc = info?.val_accuracy ?? 0.78;
  const testAcc = info?.test_accuracy ?? 0.75;
  return (
    <div className="panel">
      <div className="badge">Aprendizaje del modelo</div>
      <p style={{ marginTop: 8 }}>
        Cómo se eligió el modelo: probamos varios valores de K y medimos su precisión. Se escogió el K que dio mejor equilibrio entre aciertos y estabilidad. Valores ilustrativos; extrae los reales desde el notebook de Colab.
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
            Se eligió K = {chosenK}. Se evaluaron 5 valores de K; la búsqueda “convergió” cuando la precisión se estabilizó en la tercera prueba.
          </p>
        </div>

        <div className="panel" style={{ borderColor: "rgba(219, 197, 87, 0.5)" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Consejos claros</p>
          <ul style={{ margin: "8px 0 0 16px", padding: 0, color: "#3b4b49", lineHeight: 1.4 }}>
            <li>Perfiles muy indecisos → probabilidades repartidas entre varias opciones.</li>
            <li>Escala numéricas y codifica texto: el KNN se basa en distancias.</li>
            <li>Reentrena con datos frescos y balancea clases pequeñas.</li>
            <li>Consulta el notebook para matriz de confusión y métricas reales.</li>
          </ul>
        </div>

        <div className="panel" style={{ borderColor: "rgba(61,139,125,0.2)" }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Precisión por conjunto (ejemplo)</p>
          <div className="grid two" style={{ alignItems: "end", gap: 16 }}>
            {[
              { label: "Validación", value: valAcc },
              { label: "Prueba", value: testAcc },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 140,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: `${Math.max(10, item.value * 120)}px`,
                      background: "linear-gradient(180deg, #3D8B7D, #8FBC91)",
                      borderRadius: 8,
                    }}
                    title={`${(item.value * 100).toFixed(1)}%`}
                  />
                </div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: "0.9rem", color: "#3b4b49" }}>
                  {(item.value * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: "8px 0 0", color: "#3b4b49" }}>
            Sirve para ver que el modelo no solo acierta en validación, sino también en prueba; si ves mucha diferencia, reentrena y ajusta K o el preprocesamiento.
          </p>
        </div>
      </div>
    </div>
  );
}
