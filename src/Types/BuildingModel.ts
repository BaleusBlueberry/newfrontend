import { BuildingTypes } from "./enums/BuildingTypes";
import { UpgradeCost } from "./UpgradeCost";

export interface BuildingModel {
  id?: string;
  name: string;
  level: number; // Range: 1-25
  upgradeTimeSeconds: number; // Time in seconds
  hp?: number; // Range: 0-10000
  experience: number; // Range: 0-10000
  townHallLevel: number; // Range: 1-17
  buildingType?: BuildingTypes;
  picture: string;
  upgradeCost: UpgradeCost;
}
