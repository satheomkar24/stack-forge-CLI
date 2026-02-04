import type { IForgotPassword } from "../../types/auth";
import { authService } from "../../services/authService";
import { ForgotPasswordForm } from "../../components/auth/ForgotPassword";

const ForgotPassword = () => {
  const handleSubmit = async (values: IForgotPassword) => {
    await authService.forgotPassword(values);
  };
  return <ForgotPasswordForm onSubmit={handleSubmit} />;
};

export default ForgotPassword;
