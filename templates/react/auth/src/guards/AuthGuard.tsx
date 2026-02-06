import { storageService } from "../services/storageService";
import type { IUserAuth } from "../types/auth";
import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: PropTypes) => {
  const userData = storageService.getLocal<IUserAuth>("userData");
  const accessToken = storageService.getLocal<string>("accessToken");
  const navigate = useNavigate();

  // perform logout if unauthenticated
  useEffect(() => {
    if (!accessToken || !userData?.email) {
      storageService.removeLocal("userData");
      storageService.removeLocal("accessToken");
      storageService.removeLocal("refreshToken");
      navigate("/auth/login", { replace: true });
    }
  }, []);

  // while logout is running (render nothing)
  if (!accessToken || !userData?.email) {
    return null;
  }

  return children;
};
