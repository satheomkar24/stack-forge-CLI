import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "./env";
import type { Role } from "types";

export type TokenPayload = {
  id: string;
  role: Role;
  email: string;
};

export const signToken = (
  payload: TokenPayload,
  expiresIn: Exclude<SignOptions["expiresIn"], undefined>,
) => jwt.sign(payload, env.JWT_SECRET, { expiresIn });

export const verifyToken = (token: string): TokenPayload =>
  jwt.verify(token, env.JWT_SECRET) as TokenPayload;

export const signResetToken = (payload: TokenPayload) =>
  jwt.sign(payload, env.PASSWORD_RESET_SECRET, {
    expiresIn: env.PASSWORD_RESET_EXPIRES_IN,
  });

export const verifyResetToken = (token: string): TokenPayload =>
  jwt.verify(token, env.PASSWORD_RESET_SECRET) as TokenPayload;
