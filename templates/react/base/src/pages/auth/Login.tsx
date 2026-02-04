import type { ILogin } from "../../types/auth";
import { authService } from "../../services/authService";
import { useAppDispatch } from "../../hooks/redux";
import { setAuth } from "../../store/authSlice";
import { storageService } from "../../services/storageService";
import { LoginForm } from "../../components/auth/Login";

const Register = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: ILogin) => {
    const res = await authService.login(values);
    storageService.setLocal("accessToken", res.accessToken);
    storageService.setLocal("refreshToken", res.refreshToken);
    storageService.setLocal("userData", res.user);
    dispatch(setAuth({ user: res.user }));
  };
  return <LoginForm onSubmit={handleSubmit} />;
};

export default Register;
