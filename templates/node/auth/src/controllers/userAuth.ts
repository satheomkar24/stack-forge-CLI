import type { Request, Response } from "express";
import type {
  IForgotPassword,
  ILogin,
  IRegisterPayload,
  IResetPasswordPayload,
} from "types";
import { asyncHandler } from "@middlewares/error";
import { UserAuthService } from "@services/userAuth";
import { ROLES } from "@enums/index";
import { Assert } from "@utils/assert";

export class UserAuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const payload: IRegisterPayload = req.body;
    payload.role = req.authContext || ROLES.USER;
    const authContext = req.authContext;
    Assert.required(authContext, "Auth context");
    const result = await UserAuthService.register(payload, authContext);
    res.status(201).json(result);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const payload: ILogin = req.body;
    const authContext = req.authContext;
    Assert.required(authContext, "Auth context");
    const result = await UserAuthService.login(payload, authContext);
    res.status(200).json(result);
  });

  static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const payload: IForgotPassword = req.body;
    const authContext = req.authContext;
    Assert.required(authContext, "Auth context");
    const result = await UserAuthService.forgotPassword(payload, authContext);
    res.status(200).json(result);
  });

  static resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const payload: IResetPasswordPayload = req.body;
    const result = await UserAuthService.resetPassword(payload);
    res.status(200).json(result);
  });

  static activateAccount = asyncHandler(async (req: Request, res: Response) => {
    const token = req.query.token as string;
    Assert.required(token, "Activation token");
    const result = await UserAuthService.activateAccount(token);
    res.status(200).json(result);
  });

  static resendActivation = asyncHandler(
    async (req: Request, res: Response) => {
      const { email }: { email: string } = req.body;
      Assert.required(email, "Email id");
      const authContext = req.authContext;
      Assert.required(authContext, "Auth context");
      const result = await UserAuthService.resendActivation(email, authContext);
      res.status(200).json(result);
    },
  );
}
