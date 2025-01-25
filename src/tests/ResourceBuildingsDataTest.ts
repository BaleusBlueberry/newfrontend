import { BuildingTypes } from "../Types/enums/BuildingTypes";
import { ResourceType } from "../Types/enums/ResourceType";
import { ResourceBuildingsModel } from "../Types/ResourceModels/ResourceBuildingsModel";

export const ResourceBuildingsDataTest: ResourceBuildingsModel = {
  level: 1,
  picture: "",
  name: "",
  hp: 0,
  experience: 0,
  townHallLevel: 1,
  upgradeTimeSeconds: 10,
  buildingType: BuildingTypes.ResourceBuildings,
  productionRate: 0,
  storageCapacityGold: 0,
  storageCapacityElixir: 0,
  storageCapacityDarkElixir: 0,
  upgradeCost: {
    resourceType: ResourceType.Gold,
    cost: 0,
  },
};
