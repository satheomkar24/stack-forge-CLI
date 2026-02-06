import type { IUserAuth } from "../types/auth";
import type { IUser, IUserPayload } from "../types/user";
import { apiService } from "./apiService";

class UserService {
  private base = "/users/me";

  async getData() {
    return await apiService.get<IUser>(this.base);
  }
  async update(data: IUserPayload) {
    return await apiService.put<IUserAuth>(this.base, data);
  }
  async uploadImage(image: File) {
    const formData = new FormData();
    formData.append("image", image);
    return await apiService.put<{ url: string }>(
      `${this.base}/image`,
      formData,
    );
  }

  async delete() {
    return await apiService.delete<{ message: string }>(this.base);
  }
}
export const userService = new UserService();
