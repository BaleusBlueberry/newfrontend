export type MenuItemType = {
  label: string;
  link: string;
  submenu?: MenuItemType[]; // Recursive definition to allow nested menus
};
