import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

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
}

const initialValues: AuthContextType = {
  isLoggedIn: checkToken,
  token: getToken,
  isAdmin: false,
  loginFunction: () => {},
  logout: () => {},
};

const AuthContext = createContext(initialValues);

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken);
  const [token, setToken] = useState(getToken);
  const [isAdmin, setIsAdmin] = useState(false);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);

      // Access roles safely
      const roleClaim =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

      return { ...decoded, roles }; // Add roles as an array for easy handling
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

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

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, loginFunction, logout, isAdmin }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
