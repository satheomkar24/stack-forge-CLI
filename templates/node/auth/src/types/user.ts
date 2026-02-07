import type { Role } from "types";

export type IUser = {
  _id: string;
  name: string;
  image?: string;
  password: string;
  email: string;
  role: Role;
  isActive: boolean;
  activationToken?: string | undefined;
  activationTokenExpiresAt?: Date | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IUserPayload = {
  name: string;
  image?: string;
};
