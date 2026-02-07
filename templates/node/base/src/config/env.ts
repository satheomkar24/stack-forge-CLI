import dotenv from "dotenv";

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required env variable: ${key}`);
  }
  return value;
};

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  MONGO_URI: required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: "15m" as const,
  REFRESH_TOKEN_EXPIRES_IN: "7d" as const,
  PASSWORD_RESET_SECRET: required("PASSWORD_RESET_SECRET"),
  PASSWORD_RESET_EXPIRES_IN: "15m" as const,
  FRONTEND_USER_URL: required("FRONTEND_USER_URL"),
  FRONTEND_ADMIN_URL: "FRONTEND_ADMIN_URL",
  SMTP_HOST: required("SMTP_HOST"),
  SMTP_PORT: required("SMTP_PORT"),
  SMTP_USER: required("SMTP_USER"),
  SMTP_PASS: required("SMTP_PASS"),
};
