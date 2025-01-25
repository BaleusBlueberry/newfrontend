import { BuildingTypes } from "../Types/enums/BuildingTypes";
import { DamageType } from "../Types/enums/DamageType";
import { ResourceType } from "../Types/enums/ResourceType";
import { TrapBuildingsModel } from "../Types/TrapModels/TrapBuildingsModel";

export const TrapBuildingsDataTest: TrapBuildingsModel = {
  level: 1,
  picture: "",
  name: "Bomb",
  hp: 0,
  experience: 10,
  townHallLevel: 1,
  upgradeTimeSeconds: 30,
  buildingType: BuildingTypes.TrapBuildings,
  upgradeCost: {
    resourceType: ResourceType.Gold,
    cost: 5000,
  },
  damageType: {
    damageType: DamageType.AreaSplash,
    damageRadius: 2,
    damage: 50,
  },
  triggerRadius: 1.5,
  spawnedUnits: 0,
};
