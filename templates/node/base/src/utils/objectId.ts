import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { ErrorRes } from "@middlewares/error";

export const toObjectId = (
  value: unknown,
  fieldName = "id",
): Types.ObjectId => {
  if (!value || typeof value !== "string") {
    throw new ErrorRes(`${fieldName} is required`, StatusCodes.BAD_REQUEST);
  }

  if (!Types.ObjectId.isValid(value)) {
    throw new ErrorRes(`Invalid ${fieldName}`, StatusCodes.BAD_REQUEST);
  }

  return new Types.ObjectId(value);
};
