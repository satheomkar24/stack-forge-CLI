import constant from "../constant";
import { AxiosInstanceService } from "./axiosInstanceService";

export const apiService = new AxiosInstanceService(constant.backendAPIUrl);
