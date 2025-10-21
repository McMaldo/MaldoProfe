import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className="w-full max-w-200 min-h-screen text-white flex flex-col items-center justify-center gap-4 py-8 px-4">
      <h1 className="text-2xl">LinkTree de MaldoProfe</h1>
      <App />
    </main>
  </StrictMode>,
);
