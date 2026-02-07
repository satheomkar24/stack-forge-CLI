import type { Request, Response, NextFunction } from "express";

export const allowRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //  No user attached → not authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //  Role not allowed
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    //  Allowed → continue
    next();
  };
};
