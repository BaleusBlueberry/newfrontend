import { useState } from "react";
import auth from "../services/auth-service";
import { dialogs } from "../dialogs/dialogs";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

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
        localStorage.setItem("user", JSON.stringify(response.data));
        setTimeout(() => {
          navigate("/");
          loginFunction(response.data);
        }, 2000);
      })
      .catch((error) => {
        setError(error.message);
        dialogs.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, error, login };
};

export default useLogin;
