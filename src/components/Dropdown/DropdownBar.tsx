import { MenuItemType } from "../../Types/DropDownModel";
import { MenuItems } from "./MenuItems";

interface DropdownBarProps {
  menuItems: MenuItemType;
}

export const DropdownBar: React.FC<DropdownBarProps> = ({ menuItems }) => {
  return (
    <nav>
      <MenuItems items={menuItems} />
    </nav>
  );
};
