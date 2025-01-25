import { UserDataForUpdateModel } from "./UserDataForUpdateModel";
import { UserDataEditModel } from "./UserDataModel";

export const transformUserData = (
  input: UserDataEditModel
): UserDataForUpdateModel => {
  return {
    userId: input.UserId,
    email: input.ElectronicLocation,
    userName: input.UseByName == "" ? null : input.UseByName,
    newPassword: input.NewPas == "" ? null : input.NewPas,
    currentPassword: input.OldPas == "" ? null : input.OldPas,
  };
};
