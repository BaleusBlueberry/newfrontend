import * as Yup from "yup";

export const UpdateUserValidation = Yup.object({
  UserId: Yup.string(),
  ElectronicLocation: Yup.string().email("Bad Email!"),
  UseByName: Yup.string().min(2).max(20),
  OldPas: Yup.string()
    .min(8)
    .max(20)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  NewPas: Yup.string(),
});
