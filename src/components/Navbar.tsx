import { SiHomebridge } from "react-icons/si";
import { NavLink } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import useAuth from "../hooks/useAuth";
import { DropdownBar } from "./Dropdown/DropdownBar";
import MenuItemsForBuildingTypes from "../data/MenuItemsForBuildingTypes";
import { LogInMenu } from "./Dropdown/LoggedInMenu";
import SearchBar from "./SearchBar";
import { searchablePages } from "../data/SearchData";

function Navbar() {
  const { darkMode, toggle } = useDarkMode();
  const { isLoggedIn } = useAuth();

  return (
    <nav id="app-nav">
      <div>
        <NavLink to="/">
          <SiHomebridge aria-description="Home" />
        </NavLink>
        <NavLink className="hidden md:block" to="/about">
          About
        </NavLink>
        <NavLink to="/TownHalls">TownHalls</NavLink>
        <SearchBar pages={searchablePages} />
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

        {isLoggedIn && (
          <>
            <NavLink to="/favorites">Favorites</NavLink>
            <LogInMenu />
          </>
        )}
        <button onClick={toggle}>{darkMode ? "🌞" : "🌚"}</button>
      </div>
    </nav>
  );
}

export default Navbar;
