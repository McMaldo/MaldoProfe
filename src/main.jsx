import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import links from "./links.json";
import FindLink from "./components/FindLink.jsx";
const App = lazy(() => import("./components/App.jsx"));

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        path=""
        element={
          <Suspense fallback={<></>}>
            <App sections={links} />
          </Suspense>
        }
      ></Route>
      <Route
        path="/:sectionSearch/:courseSearch/:classSearch"
        element={<FindLink linkList={links} />}
      ></Route>
    </Routes>
  </BrowserRouter>,
);
