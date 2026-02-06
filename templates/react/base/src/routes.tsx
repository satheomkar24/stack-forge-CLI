import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import Home from "./pages/Home";
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
