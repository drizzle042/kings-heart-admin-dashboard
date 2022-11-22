import * as yup from "yup";

const signInSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const forgotPasswordSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
});

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least minimum 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export {
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};
