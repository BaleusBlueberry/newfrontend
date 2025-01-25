import { ArmyBuildingsModel } from "../Types/ArmyModels/ArmyBuildingsModel";
import { BuildingTypes } from "../Types/enums/BuildingTypes";
import { ResourceType } from "../Types/enums/ResourceType";

export const ArmyBuildingsDataTest: ArmyBuildingsModel = {
  level: 1,
  picture: "",
  name: "",
  hp: 250,
  experience: 10,
  townHallLevel: 1,
  upgradeTimeSeconds: 30,
  buildingType: BuildingTypes.ArmyBuildings,
  upgradeCost: {
    resourceType: ResourceType.Elixir,
    cost: 5000,
  },
  unlocks: [],
  capacity: 0,
  heroSlots: 0,
  heroUpgrades: {
    barbarianKing: 0,
    archerQueen: 0,
    grandWarden: 0,
    royalChampion: 0,
    minionPrince: 0,
  },
};
