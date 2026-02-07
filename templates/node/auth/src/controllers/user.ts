import type { Request, Response } from "express";
import { asyncHandler } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import type { IUserPayload } from "types";
import { UserService } from "@services/user";
import { Assert } from "@utils/assert";

export class UserController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const users = await UserService.getAll();
    res.status(StatusCodes.OK).json(users);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    Assert.required(id, "User id");
    const user = await UserService.getById(id);
    res.status(StatusCodes.OK).json(user);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    Assert.required(id, "User id");
    const payload: IUserPayload = req.body;
    const user = await UserService.update(id, payload);
    res.status(StatusCodes.OK).json(user);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    Assert.required(id, "User id");
    const user = await UserService.delete(id);
    res.status(StatusCodes.OK).json(user);
  });

  static updateImage = asyncHandler(async (req: Request, res: Response) => {
    // implement this as per your preferences like store in server, AWS bucket, cloudinary
    res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .json({ msg: "Method not implemented" });
  });
}
