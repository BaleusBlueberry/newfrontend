import * as Yup from "yup";

export const RegisterValidation = Yup.object({
  Email: Yup.string().email("Bad Email!").required("The Email is required"),
  Username: Yup.string().required().min(2).max(20),
  Password: Yup.string()
    .required()
    .min(8)
    .max(20)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  PasswordConfirm: Yup.string()
    .required()
    .oneOf([Yup.ref("Password")], "Passwords must match"),
});
