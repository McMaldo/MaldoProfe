import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FaultyTerminal from "./components/FaultyTerminal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className="w-full max-w-200 min-h-dvh text-white flex flex-col items-center justify-center gap-4 py-8 px-4">
      <div className="relative w-full h-60 rounded-md overflow-hidden select-none">
        <FaultyTerminal
          scale={0.9}
          gridMul={[3, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.2}
          tint="#101828"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={1}
        />
        <div className="absolute top-0 left-0 size-full flex flex-col gap-4 items-center justify-center px-4">
          <h1 className="text-3xl text-center">Clases con MaldoProfe</h1>
          <div className="flex gap-4">
            <span className="border border-gray-800 bg-gray-900 py-1 px-3 rounded-full text-sm">
              Computación
            </span>
            <span className="border border-gray-800 bg-gray-900 py-1 px-3 rounded-full text-sm">
              NTICX
            </span>
          </div>
        </div>
      </div>
      <App />
    </main>
  </StrictMode>,
);
