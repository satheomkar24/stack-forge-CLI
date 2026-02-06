import type { IResetPassword } from "../../types/auth";
import { authService } from "../../services/authService";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ResetPasswordForm } from "../../components/auth/ResetPassword";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const handleSubmit = async (values: IResetPassword) => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }
    await authService.resetPassword({ ...values, token: token });
  };
  return <ResetPasswordForm onSubmit={handleSubmit} />;
};

export default ResetPassword;
