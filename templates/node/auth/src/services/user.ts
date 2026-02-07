import { User } from "@models/user";
import type { IGenericResponse, IUser, IUserPayload } from "types";
import { Assert } from "@utils/assert";

export class UserService {
  static async getAll(): Promise<IUser[]> {
    return User.find();
  }

  static async getById(id: string): Promise<IUser> {
    const user = await User.findById(id).lean();
    Assert.entityFound(user, "User");
    return user as unknown as IUser;
  }

  static async update(
    id: string,
    payload: IUserPayload,
  ): Promise<IGenericResponse> {
    const user = await User.findByIdAndUpdate(id, payload, {
      new: true, // return updated doc
      runValidators: true, // validate schema
    });
    Assert.entityFound(user, "User");
    return {
      message: "User updated successfully",
    };
  }

  static async delete(id: string): Promise<IGenericResponse> {
    const user = await User.findByIdAndDelete(id);
    Assert.entityFound(user, "User");
    return {
      message: "User deleted successfully",
    };
  }
}
