import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { UserDataForUpdateModel } from "../Types/userDataModels/UserDataForUpdateModel";
import { dialogs } from "../dialogs/dialogs";
import auth from "../services/auth-service";
import { isString } from "formik";
import { decodeToken } from "../services/TokenDecode";
import handleAxiosError from "../services/handleAxiosError";
import { AxiosError } from "axios";

const checkToken = !!localStorage.getItem("token");
const getToken = localStorage.getItem("token") ?? "";

export interface LoginResponse {
  token: string;
  roles: string[];
}

export interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  token: string;
  loginFunction: (response: LoginResponse) => void;
  logout: () => void;
  getSingleUser: () => Promise<UserDataForUpdateModel>;
}

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken);
  const [token, setToken] = useState(getToken);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (checkToken) {
      setToken(getToken);
      console.log("logged in");
      const decodedToken = decodeToken(token);

      if (decodedToken.roles.includes("Admin")) {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if token not found
      console.log("not logged in");
    }
  }, []);

  function loginFunction(response: LoginResponse) {
    setIsLoggedIn(true);
    setToken(response.token);
    localStorage.setItem("token", response.token); // Store token in localStorage
    if (response.roles.includes("Admin")) {
      setIsAdmin(true);
    }
  }

  function logout() {
    setIsLoggedIn(false);
    setToken("");
    setIsAdmin(false);
    localStorage.removeItem("token"); // Remove token from localStorage
  }

  const getSingleUser = async () => {
    dialogs.load();
    try {
      const decodedToken = decodeToken(token);
      if (!decodedToken.userId) {
        throw new Error("Invalid token");
      }
      const user = await auth.GetUser(decodedToken.userId);
      dialogs.closeLoad();

      return user.data;
    } catch (err) {
      dialogs.closeLoad();
      handleAxiosError(err as AxiosError, (message) => {
        dialogs.error(message);
      });
      throw err;
    }
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    token,
    loginFunction,
    logout,
    isAdmin,
    getSingleUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
