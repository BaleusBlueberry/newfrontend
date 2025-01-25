import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaPencilAlt, FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const LogInMenu: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();
  const handleClick = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown
  };
  return (
    <div className="menu-items">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
        className="dropdown-trigger"
        onClick={handleClick}
      >
        <FaRegUserCircle></FaRegUserCircle>
      </button>
      {isDropdownOpen && (
        <ul className="dropdown logged-in-dropdown">
          <li className="menu-items m-2" key="logout">
            <div className="wrapper">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                className="dropdown-trigger"
                onClick={() => {
                  logout();
                  handleClick();
                }}
              >
                <div className="m-1">
                  <p className=" text-xs">LogOut</p>
                  <BiLogOut aria-description="Logout" />
                </div>
              </button>
            </div>
          </li>
          <li className="menu-items m-2" key="Edit Profile">
            <div className="wrapper">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                className="dropdown-trigger"
                onClick={() => {
                  navigate("/user/profile");
                  handleClick();
                }}
              >
                <div className="m-1">
                  <p className=" text-xs">Edit Profile</p>
                  <FaPencilAlt aria-description="Edit Profile" />
                </div>
              </button>
            </div>
          </li>
          {isAdmin && (
            <li className="menu-items m-2" key="View All Users">
              <div className="wrapper">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  className="dropdown-trigger"
                  onClick={() => {
                    navigate("/user/all");
                    handleClick();
                  }}
                >
                  <div className="m-1">
                    <p className=" text-xs">View All Users</p>
                  </div>
                </button>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
