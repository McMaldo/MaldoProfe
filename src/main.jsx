import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import links from "./data/links.json";
import FindLink from "./components/page/FindLink";
const MainPage = lazy(() => import("./components/page/MainPage"));
const CoursePopup = lazy(() => import("./components/template/CoursePopup"));
import ErrorPage from "./components/page/Error";

console.log(
  "\n%c¡Bienvenidos a la MaldoProfeApp!\n\n%cEsta es la consola de desarrollo web, todo lo que modifiques aquí unicamente afectará los resultados en tu dispositivo. Aunque puedes aprender un poco de programación y como esta hecha esta página web\n\nTecnologías empleadas:\n - React + Vite\n - Typescript\n - TailwindCSS",
  "font-size: 16px; font-weight: bold;", // título
  "font-size: 10px;", // texto explicativo
);
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        path=""
        element={
          <Suspense fallback={<></>}>
            <MainPage sections={links} />
          </Suspense>
        }
      >
        <Route
          path="/:section/:course/"
          element={
            <Suspense fallback={<></>}>
              <CoursePopup />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/:sectionSearch/:courseSearch/:classSearch"
        element={<FindLink linkList={links} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>,
);
