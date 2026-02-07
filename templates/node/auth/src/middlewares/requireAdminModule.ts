import type { Request, Response, NextFunction } from "express";
import { env } from "@config/env";

export const requireAdminModule = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!env.FRONTEND_ADMIN_URL) {
    throw new Error("Admin module is not enabled");
  }
  next();
};
