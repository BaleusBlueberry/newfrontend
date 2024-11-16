import { createContext, useEffect, useState } from "react";

const checkToken = !!localStorage.getItem("token");
const getToken = localStorage.getItem("token") ?? "";

export interface AuthContextType {
  isLoggedIn: boolean;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

const initialValues: AuthContextType = {
  isLoggedIn: checkToken,
  token: getToken,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(initialValues);

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken);
  const [token, setToken] = useState(getToken);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken); // Set token state
      console.log("logged in");
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if token not found
      console.log("not logged in");
    }
  }, []);

  function login(token: string) {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token); // Store token in localStorage
  }

  function logout() {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("token"); // Remove token from localStorage
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
