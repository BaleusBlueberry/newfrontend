import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import useDarkMode from "../hooks/useDarkMode";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav id="app-nav">
      <div>
        <NavLink to="/">
          <SiHomebridge aria-description="Home" />
        </NavLink>
        <NavLink to="/about">About</NavLink>
        {isLoggedIn && <NavLink to="/products">Products</NavLink>}
      </div>

      <div className="flex-1"></div>

      <div>
        {!isLoggedIn && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        <a href="https://github.com/TomerBu/D290323ER">
          <SiHomebridge aria-description="Github" />
        </a>

        {isLoggedIn && (
          <button onClick={logout}>
            <BiLogOut aria-description="Logout" />
          </button>
        )}
        <button onClick={toggle}>{darkMode ? "🌞" : "🌚"}</button>
      </div>
    </nav>
  );
}

export default Navbar;
