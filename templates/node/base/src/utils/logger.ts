import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })
);

const logDir = path.join(process.cwd(), "logs");

//  Rotate combined logs
const combinedTransport = new DailyRotateFile({
  dirname: path.join(logDir, "combined"),
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

// Rotate error logs
const errorTransport = new DailyRotateFile({
  dirname: path.join(logDir, "error"),
  filename: "%DATE%.error.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
  level: "error",
});

export const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [combinedTransport, errorTransport],
});

// Console logs only in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        logFormat
      ),
    })
  );
}
