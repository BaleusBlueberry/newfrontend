import { BuildingModel } from "../BuildingModel";
import { HeroesType } from "../DefensiveModels/HeroesType";

export interface ArmyBuildingsModel extends BuildingModel {
  unlocks?: string[];
  capacity?: number;
  heroSlots?: number;
  heroUpgrades?: HeroesType;
}
