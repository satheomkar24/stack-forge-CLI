import { Router } from "express";
import { env } from "@config/env";
import { signToken, verifyToken, type TokenPayload } from "@config/jwt";
import { logger } from "@utils/logger";
import { StatusCodes } from "http-status-codes";
import { Assert } from "@utils/assert";
import type { IAuthTokens } from "types";

const router = Router();

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  Assert.required(refreshToken, "Refresh token");

  try {
    const decoded = verifyToken(refreshToken);

    const cleanPayload: TokenPayload = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    const accessToken = signToken(cleanPayload, env.JWT_EXPIRES_IN);
    const newRefreshToken = signToken(
      cleanPayload,
      env.REFRESH_TOKEN_EXPIRES_IN,
    );

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    } as IAuthTokens);
  } catch (err) {
    logger.error(err);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired refresh token" });
  }
});

export default router;
