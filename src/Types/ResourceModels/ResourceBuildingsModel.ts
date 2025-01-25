import { BuildingModel } from "../BuildingModel";

export interface ResourceBuildingsModel extends BuildingModel {
  storageCapacityGold?: number; // Range: 0-10,000,000
  storageCapacityElixir?: number; // Range: 0-10,000,000
  storageCapacityDarkElixir?: number; // Range: 0-400,000
  productionRate?: number; // Range: 0-10,000
}
