// Data store (context) for dark mode
//state variable: isDark
//function to toggle dark mode
// need to implemet css
import { createContext, useEffect, useState } from "react";

export interface DarkModeContextType {
  darkMode: boolean;
  toggle: () => void;
}
const DarkModeContext = createContext<DarkModeContextType>(null);

function DarkModeProvider({ children }) {
  useEffect(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode === "dark") {
      setDarkMode(true);
      document.body.classList.toggle("dark");
    } else if (mode === "light") {
      setDarkMode(false);
      document.body.classList.toggle("light");
    }
  }, []);

  //state variables:
  const [darkMode, setDarkMode] = useState(false);
  //functions:
  function toggle() {
    if (document.body.classList.contains("light")) {
      setDarkMode(false);
      localStorage.setItem("darkMode", "dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      setDarkMode(true);
      localStorage.setItem("darkMode", "light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }
  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}
export { DarkModeProvider, DarkModeContext };
