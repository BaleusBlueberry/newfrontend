import { useState } from "react";
import auth from "../services/auth-service";
import { dialogs } from "../dialogs/dialogs";
import useAuth from "./useAuth";
import { editprofile } from "../services/@types";
import handleAxiosError from "../services/handleAxiosError";

const useEditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { loginFunction } = useAuth();

  const editUser = async (editProfile: editprofile) => {
    setIsLoading(true);
    setError(undefined);
    await auth
      .edit(editProfile)
      .then((response) => {
        dialogs.success("User Updated Suscessfully!!!!");
        loginFunction(response.data);
      })
      .catch((error) => {
        handleAxiosError(error, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, error, editUser };
};

export default useEditUser;
