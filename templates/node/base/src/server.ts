import { connectDB } from "@config/db";
import { env } from "@config/env";
import { logger } from "@utils/logger";
import app from "app";

export const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on port ${env.PORT}`);
  });
};
