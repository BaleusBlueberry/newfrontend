import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import useAuth from "../hooks/useAuth";
import { FaPencilAlt } from "react-icons/fa";
import { ReturnButton } from "./Card";
import { DropdownBar } from "./Dropdown/DropdownBar";
import MenuItemsForBuildingTypes from "../data/MenuItemsForBuildingTypes";
import { LogInMenu } from "./Dropdown/LoggedInMenu";

function Navbar() {
  const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <nav id="app-nav">
      <div>
        <ReturnButton />
        <NavLink to="/">
          <SiHomebridge aria-description="Home" />
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/TownHalls">TownHalls</NavLink>
        {/* Building Types Dropdown */}
      </div>

      <DropdownBar menuItems={MenuItemsForBuildingTypes} />

      <div className="flex-1"></div>

      <div>
        {!isLoggedIn && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        {isAdmin && (
          <NavLink to="/edit-townhall-levels">
            <FaPencilAlt aria-description="Edit Admin" />
          </NavLink>
        )}
        {isLoggedIn && (
          <>
            <LogInMenu />
          </>
        )}
        <button onClick={toggle}>{darkMode ? "🌞" : "🌚"}</button>
      </div>
    </nav>
  );
}

export default Navbar;
