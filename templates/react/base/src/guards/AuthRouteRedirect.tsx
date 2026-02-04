import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { storageService } from "../services/storageService";
import type { IUser } from "../types/auth";

type PropTypes = {
  children: ReactNode;
};

//if already login and come to auth route, redirect to the home page
export const AuthRouteRedirect = ({ children }: PropTypes) => {
  const userData = storageService.getLocal<IUser>("userData");
  const location = useLocation();

  const isResetRoute = location.pathname.includes("reset");

  if (!isResetRoute && userData?.email) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
};
