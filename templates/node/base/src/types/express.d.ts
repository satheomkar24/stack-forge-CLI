import type { TokenPayload } from "@config/jwt";
import "express";
import type { Role } from "types";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      authContext?: Role;
    }
  }
}
