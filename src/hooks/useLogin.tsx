import { useState } from "react";
import auth from "../services/auth-service";
import { dialogs } from "../dialogs/dialogs";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { RegisterUser } from "../services/@types";
import handleAxiosError from "../services/handleAxiosError";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { loginFunction } = useAuth();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(undefined);
    await auth
      .login(email, password)
      .then((response) => {
        dialogs.success("Login successful");
        loginFunction(response.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        handleAxiosError(error, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const register = async (registerData: RegisterUser) => {
    setIsLoading(true);
    setError(undefined);
    await auth
      .register(
        registerData.Email,
        registerData.Username,
        registerData.Password,
        registerData.PasswordConfirm
      )
      .then(() => {
        dialogs.success("Registered successfully!!!!");
        navigate("/login");
      })
      .catch((error) => {
        handleAxiosError(error, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, error, login, register };
};

export default useLogin;
