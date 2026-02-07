import { ErrorRes } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";

export class Assert {
  static entityFound<T>(
    entity: T | null | undefined,
    entityName = "Resource",
  ): asserts entity is T {
    if (!entity) {
      throw new ErrorRes(`${entityName} not found`, StatusCodes.NOT_FOUND);
    }
  }

  static required<T>(
    value: T | null | undefined,
    name = "field",
  ): asserts value is T {
    if (value == null) {
      throw new ErrorRes(`${name} is required`, StatusCodes.BAD_REQUEST);
    }
  }
}
