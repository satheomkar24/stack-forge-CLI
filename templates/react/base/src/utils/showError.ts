import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const showError = (
  error: Error | AxiosError,
  defaultMessage: string
) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || defaultMessage);
    return;
  }
  toast.error(error.message || defaultMessage);
};
