# Frontend: Demo de intención de voto (KNN)

Interfaz en Next.js para interactuar con el backend FastAPI que expone el pipeline KNN. Pensada para deploy en Vercel.

## Características
- Paleta obligatoria: We Peep (#F9DFE0) fondo, Beauty Bush (#ECBDBF) detalles, Viridian (#3D8B7D) y Norway (#8FBC91) para acciones, Tacha (#DBC557) para alertas.
- Formulario en español, agrupado por secciones (datos demográficos, socioeconómicos, participación y preferencias).
- Consume `/predict` y `/model-info` del backend configurable mediante variable de entorno.

## Configuración

1. Instala dependencias:
```bash
cd frontend
npm install
```

2. Copia `.env.example` a `.env.local` y ajusta la URL del backend:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

3. Ejecuta en desarrollo:
```bash
npm run dev
```
Visita `http://localhost:3000`.

## Build y producción local
```bash
npm run build
npm start
```

## Docker
```bash
docker build -t knn-vote-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 knn-vote-frontend
```

## Deploy en Vercel
- Usa `NEXT_PUBLIC_API_BASE_URL` en las variables de entorno de Vercel apuntando al backend publicado.
- Comando de build: `npm run build`.
- Directorio de salida: `.next`.

## Archivo clave
- `app/page.tsx`: página principal con formulario, resultados y resumen del modelo.
- `components/`: `VoterForm`, `PredictionResult`, `ModelSummary`.
- `lib/api.ts`: helpers para llamadas al backend.
- `styles/globals.css`: variables de color y estilos base siguiendo la paleta pedida.

## Limitaciones
- El modelo depende del backend. Si el servicio `/model-info` falla, la UI lo indicará.
- No se incluyen todos los campos del dataset para mantener la UI manejable; el backend imputa faltantes según el pipeline entrenado.
