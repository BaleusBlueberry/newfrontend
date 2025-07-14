import { MenuItemType } from "../../Types/DropDownModel";
import { NavLink, useNavigate } from "react-router-dom";

interface DropdownMenuProps {
  Items: MenuItemType[];
  closeDropdown: () => void;
}

export const DropDownMenu: React.FC<DropdownMenuProps> = ({
  Items,
  closeDropdown,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (link: string) => {
    closeDropdown(); // Close the dropdown
    navigate(link); // Navigate to the link
  };

  return (
    <>
      <ul className="dropdown">
        <li className="pointer-events-none h-4"></li>
        {Items.map((submenu, index) => (
          <li
            className={`menu-items ${submenu.submenu ? "has-submenu" : ""}`}
            key={index}
          >
            {submenu.submenu ? (
              <>
                <div
                  className="wrapper p-9"
                  onClick={() => handleItemClick(submenu.link)}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    className="dropdown-trigger"
                    onClick={() => handleItemClick(submenu.link)}
                  >
                    {submenu.label}
                  </button>
                </div>
                <DropDownMenu
                  Items={submenu.submenu}
                  closeDropdown={closeDropdown}
                />
              </>
            ) : (
              <div className="wrapper">
                <NavLink to={submenu.link} onClick={closeDropdown}>
                  {submenu.label}
                </NavLink>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
