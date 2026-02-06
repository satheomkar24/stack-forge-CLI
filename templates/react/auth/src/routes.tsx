import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { AuthRouteRedirect } from "./guards/AuthRouteRedirect";
import { AuthGuard } from "./guards/AuthGuard";
import Profile from "./pages/Profile";
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "auth",
    element: (
      <AuthRouteRedirect>
        <Outlet />
      </AuthRouteRedirect>
    ),
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "reset-password/:token",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
