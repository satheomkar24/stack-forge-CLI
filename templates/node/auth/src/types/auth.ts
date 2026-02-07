import type { Role } from "types";

export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type IRegisterPayload = Omit<IRegister, "confirmPassword"> & {
  role?: Role;
};

export type IForgotPassword = {
  email: string;
};

export type IResetPassword = {
  password: string;
  confirmPassword: string;
};

export type IResetPasswordPayload = Omit<IResetPassword, "confirmPassword"> & {
  token: string;
};

export type INewPassword = {
  email: string;
  newPassword: string;
};

export type IChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type IChangePasswordPayload = Omit<
  IChangePassword,
  "confirmNewPassword"
>;

export type IAuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type IAuthTokens = {
  accessToken: string;
  refreshToken: string;
};
export type IAuthResponse = IAuthTokens & {
  user: IAuthUser;
};
