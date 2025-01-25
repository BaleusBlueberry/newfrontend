import * as Yup from "yup";
export const LoginValidation = Yup.object({
  Email: Yup.string().email("Bad Email!").required("The Email is required"),
  Password: Yup.string()
    .required()
    .min(8)
    .max(20)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});
