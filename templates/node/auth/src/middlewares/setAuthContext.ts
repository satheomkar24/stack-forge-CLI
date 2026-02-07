import type { Role } from "types";
import type { Request, Response, NextFunction } from "express";

export const setAuthContext =
  (context: Role) => (req: Request, _res: Response, next: NextFunction) => {
    req.authContext = context;
    next();
  };
