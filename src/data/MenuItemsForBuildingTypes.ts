import { MenuItemType } from "../Types/DropDownModel";

const MenuItemsForBuildingTypes: MenuItemType = {
  label: "Building Types",
  link: "/#",
  submenu: [
    {
      label: "Army Buildings",
      link: "/Buildings/armyBuildings",
      submenu: [
        {
          label: "Army Camp",
          link: "/Buildings/armyBuildings/armyCamp",
        },
        {
          label: "Barracks",
          link: "/Buildings/armyBuildings/barracks",
        },
        {
          label: "Dark Barracks",
          link: "/Buildings/armyBuildings/darkBarracks",
        },
      ],
    },
    {
      label: "Defensive Buildings",
      link: "/Buildings/defensiveBuildings",
      submenu: [
        {
          label: "Cannon",
          link: "/Buildings/defensiveBuildings/cannon",
        },
        {
          label: "Archer Tower",
          link: "/Buildings/defensiveBuildings/archerTower",
        },
        {
          label: "Mortar",
          link: "/Buildings/defensiveBuildings/mortar",
        },
      ],
    },
    {
      label: "Traps",
      link: "/Buildings/trapBuildings",
      submenu: [
        {
          label: "Bomb",
          link: "/Buildings/trapBuildings/bomb",
        },
        {
          label: "Spring Trap",
          link: "/Buildings/trapBuildings/springTrap",
        },
        {
          label: "Air Bomb",
          link: "/Buildings/trapBuildings/airBomb",
        },
      ],
    },
    {
      label: "Resource Buildings",
      link: "/Buildings/resourceBuildings",
      submenu: [
        {
          label: "Gold Mine",
          link: "/Buildings/resourceBuildings/goldMine",
        },
        {
          label: "Elixir Collector",
          link: "/Buildings/resourceBuildings/elixirCollector",
        },
        {
          label: "Gold Storage",
          link: "/Buildings/resourceBuildings/goldStorage",
        },
      ],
    },
  ],
};

export default MenuItemsForBuildingTypes;
