import type { ROLES } from "@enums/index";

export * from "./auth";
export * from "./common";
export * from "./email";
export * from "./user";

export type Role = (typeof ROLES)[keyof typeof ROLES];
