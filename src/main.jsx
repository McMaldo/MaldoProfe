import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className="w-full max-w-200 flex flex-col items-center gap-6 p-8">
      <App />
    </main>
  </StrictMode>,
);
