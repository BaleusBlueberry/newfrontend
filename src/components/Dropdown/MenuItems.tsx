import { useNavigate } from "react-router-dom";
import { MenuItemType } from "../../Types/DropDownModel";
import { DropDownMenu } from "./DropDownMenu";
import { useState } from "react";

interface MenuItemsProps {
  items: MenuItemType;
}

export const MenuItems: React.FC<MenuItemsProps> = ({ items }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    if (items.submenu) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      setIsDropdownOpen(false);
      navigate(items.link);
    }
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
        {items.label}
      </button>
      {isDropdownOpen && items.submenu && (
        <DropDownMenu
          Items={items.submenu}
          closeDropdown={() => setIsDropdownOpen(false)} // Pass a method to close the dropdown
        />
      )}
    </div>
  );
};
