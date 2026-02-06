import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { storageService } from "./storageService";
import type { IAuthTokens } from "../types/auth";

export class AxiosInstanceService {
  private api: AxiosInstance;
  private baseURL: string;

  // 🔒 Refresh handling
  private isRefreshing = false;
  private refreshQueue: Array<(token: string) => void> = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL: baseURL || "http://localhost:3000/api",
      timeout: 10000000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // =========================
    // Request Interceptor
    // =========================
    this.api.interceptors.request.use(
      (config) => {
        const accessToken = storageService.getLocal<string>("accessToken");

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // =========================
    // Response Interceptor
    // =========================
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config as
          | (AxiosRequestConfig & { _retry?: boolean })
          | undefined;

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAccessToken();

            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };

            return this.api(originalRequest);
          } catch {
            this.handleUnauthorized();
          }
        }

        return Promise.reject(error);
      },
    );
  }

  // =========================
  // Refresh Token Logic
  // =========================
  private async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshQueue.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = storageService.getLocal<string>("refreshToken");

      if (!refreshToken) {
        throw new Error("Refresh token missing");
      }

      // ⚠️ Use raw axios to avoid interceptor loop
      const response = await axios.post<IAuthTokens>(
        `${this.baseURL}/auth/refresh`,
        { refreshToken },
      );

      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;

      storageService.setLocal("accessToken", newAccessToken);
      storageService.setLocal("refreshToken", newRefreshToken);

      // Notify queued requests
      this.refreshQueue.forEach((cb) => cb(newAccessToken));
      this.refreshQueue = [];

      return newAccessToken;
    } finally {
      this.isRefreshing = false;
    }
  }

  // =========================
  // Logout / Unauthorized
  // =========================
  private handleUnauthorized(): void {
    storageService.removeLocal("accessToken");
    storageService.removeLocal("refreshToken");
    storageService.removeLocal("userData");

    if (!window.location.pathname.includes("/auth/login")) {
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    }
  }

  // =========================
  // HTTP Methods
  // =========================
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }

  // =========================
  // Access Axios Instance
  // =========================
  getAxiosInstance(): AxiosInstance {
    return this.api;
  }
}
