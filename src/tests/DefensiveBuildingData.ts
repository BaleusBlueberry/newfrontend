import { DefensiveBuildingsModel } from "../Types/DefensiveModels/DefensiveBuildingsModel";
import { BuildingTypes } from "../Types/enums/BuildingTypes";
import { DamageType } from "../Types/enums/DamageType";
import { ResourceType } from "../Types/enums/ResourceType";

export const DefensiveBuildingsDataTest: DefensiveBuildingsModel = {
  level: 1,
  picture: "",
  name: "",
  hp: 300,
  experience: 15,
  townHallLevel: 1,
  upgradeTimeSeconds: 60,
  buildingType: BuildingTypes.DefensiveBuildings,
  upgradeCost: {
    resourceType: ResourceType.Gold,
    cost: 10000,
  },
  buildingRange: {
    maxRange: 9,
    minRange: 0,
  },
  damageInfo: {
    damagePerHit: 1.5,
    damagePerSecond: 60,
    shockwaveDamage: 0,
    burstsFire: 0,
    damageWhenDestroyed: 0,
    pushStrength: 0,
    damageType: DamageType.SingleTarget,
  },
  targets: {
    ground: true,
    air: false,
  },
};
