import { env } from "@config/env";
import {
  signResetToken,
  signToken,
  verifyResetToken,
  type TokenPayload,
} from "@config/jwt";
import type {
  ActivationMailParams,
  IAuthResponse,
  IForgotPassword,
  IGenericResponse,
  ILogin,
  IRegisterPayload,
  IResetPasswordPayload,
  Role,
} from "types";
import { ErrorRes } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "@utils/email";
import { logger } from "@utils/logger";
import { User } from "@models/user";
import { ROLES } from "@enums/index";
import { createHash, randomBytes } from "crypto";

export class UserAuthService {
  static async register(
    payload: IRegisterPayload,
    authContext: Role,
  ): Promise<IGenericResponse> {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new ErrorRes("Email already registered", StatusCodes.BAD_REQUEST);
    }

    const frontendUrl =
      authContext === ROLES.ADMIN
        ? env.FRONTEND_ADMIN_URL
        : env.FRONTEND_USER_URL;
    const { token, hashedToken } = generateActivationToken();

    await User.create({
      ...payload,
      isActive: false,
      activationToken: hashedToken,
      activationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    });

    await sendActivationMail({
      email: payload.email,
      name: payload.name,
      token,
      frontendUrl,
    });

    return {
      message:
        "Registration successful. Please check your email to activate your account.",
    };
  }

  static async login(
    payload: ILogin,
    authContext: Role,
  ): Promise<IAuthResponse> {
    const user = await User.findOne({ email: payload.email }).select(
      "+password",
    );

    if (!user)
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);

    if (authContext === ROLES.ADMIN && user.role !== ROLES.ADMIN) {
      throw new ErrorRes("Admin access required", StatusCodes.FORBIDDEN);
    }

    if (!user.isActive) {
      throw new ErrorRes(
        "Please activate your account via email",
        StatusCodes.FORBIDDEN,
      );
    }

    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) {
      logger.warn(`Invalid password attempt for ${payload.email}`);
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);
    }
    const jwtPayload = {
      id: user._id.toString(),
      role: ROLES.ADMIN,
      email: user.email,
    };
    const accessToken = signToken(jwtPayload, env.JWT_EXPIRES_IN);
    const refreshToken = signToken(jwtPayload, env.REFRESH_TOKEN_EXPIRES_IN);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  static async forgotPassword(
    payload: IForgotPassword,
    authContext: Role,
  ): Promise<IGenericResponse> {
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return {
        message: "If account exists, Password reset link sent has been email",
      };
    }

    const resetToken = signResetToken({
      id: user._id.toString(),
      role: ROLES.ADMIN,
      email: user.email,
    });

    const frontendUrl =
      authContext === ROLES.ADMIN
        ? env.FRONTEND_ADMIN_URL
        : env.FRONTEND_USER_URL;

    const resetUrl = `${frontendUrl}/auth/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset</p>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes</p>
      `,
    });

    return {
      message: "If account exists, Password reset link sent has been email",
    };
  }

  static async resetPassword(
    payload: IResetPasswordPayload,
  ): Promise<IGenericResponse> {
    let decoded: TokenPayload;

    try {
      decoded = verifyResetToken(payload.token);
    } catch {
      throw new ErrorRes(
        "Token is invalid or expired",
        StatusCodes.BAD_REQUEST,
      );
    }

    const user = await User.findById(decoded.id).select("+password");

    if (!user) {
      throw new ErrorRes("User not found", StatusCodes.BAD_REQUEST);
    }

    user.password = payload.password;
    await user.save();

    return {
      message: "Password reset successful",
    };
  }

  static async activateAccount(token: string) {
    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      activationToken: hashedToken,
      activationTokenExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      throw new ErrorRes("Invalid or expired activation token", 400);
    }

    user.isActive = true;
    user.activationToken = undefined;
    user.activationTokenExpiresAt = undefined;

    await user.save();

    return {
      message: "Account activated successfully",
    };
  }

  static async resendActivation(email: string, authContext: Role) {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        message: "If the account exists, an activation email has been sent",
      };
    }

    if (user.isActive) {
      return {
        message: "Account is already activated",
      };
    }
    const frontendUrl =
      authContext === ROLES.ADMIN
        ? env.FRONTEND_ADMIN_URL
        : env.FRONTEND_USER_URL;

    const { token, hashedToken } = generateActivationToken();

    user.activationToken = hashedToken;
    user.activationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //24hr

    await user.save();

    await sendActivationMail({
      email: user.email,
      name: user.name,
      token,
      frontendUrl,
    });

    return {
      message: "Activation email sent",
    };
  }
}

function generateActivationToken() {
  const token = randomBytes(32).toString("hex");
  const hashedToken = createHash("sha256").update(token).digest("hex");
  return { token, hashedToken };
}

export async function sendActivationMail({
  email,
  name,
  token,
  frontendUrl,
}: ActivationMailParams): Promise<void> {
  const activationLink = `${frontendUrl}/auth/activate-account?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Hello ${name} 👋</h2>
      <p>Thanks for registering!</p>
      <p>Please activate your account by clicking the link below:</p>
      <a href="${activationLink}" target="_blank">
        Activate Account
      </a>
      <p>This link will expire in 24 hours.</p>
      <br />
      <p>If you didn’t create this account, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: "Activate your account",
    html,
  });
}
