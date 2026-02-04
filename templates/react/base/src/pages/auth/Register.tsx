import type { IRegister } from "../../types/auth";
import { authService } from "../../services/authService";
import { RegisterForm } from "../../components/auth/Register";

const Register = () => {
  const handleSubmit = async (values: IRegister) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = values;
    await authService.register(payload);
  };
  return <RegisterForm onSubmit={handleSubmit} />;
};

export default Register;
