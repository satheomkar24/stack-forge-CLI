import type {
  IChangePassword,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
} from "../types/auth";
import * as Yup from "yup";
import { regex } from "../utils/regex";

export const registerInitialValues: IRegister = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const loginInitialValues: ILogin = {
  email: "",
  password: "",
};

export const forgotPasswordInitialValues: IForgotPassword = {
  email: "",
};

export const resetPasswordInitialValues: IResetPassword = {
  password: "",
  confirmPassword: "",
};

export const changePasswordInitialValues: IChangePassword = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(regex.name, "Name can only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .matches(regex.email, "Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      regex.password,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(regex.email, "Invalid email format"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(regex.email, "Invalid email format"),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      regex.password,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .matches(
      regex.password,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character",
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
