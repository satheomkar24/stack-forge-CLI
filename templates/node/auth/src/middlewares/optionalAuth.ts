import { verifyToken } from "@config/jwt";
import type { Request, Response, NextFunction } from "express";

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    req.user = verifyToken(token);
  } catch {
    // ignore invalid token
  }

  next();
};
