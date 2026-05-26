import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import links from "./data/links.json";
import FindLink from "./components/page/FindLink";
const MainPage = lazy(() => import("./components/page/MainPage"));
const CoursePopup = lazy(() => import("./components/template/CoursePopup"));
import ErrorPage from "./components/page/Error";

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
