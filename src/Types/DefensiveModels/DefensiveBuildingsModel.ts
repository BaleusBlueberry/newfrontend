import { BuildingModel } from "../BuildingModel";
import { BuildingRange } from "./BuildingRange";
import { DamageInfo } from "./DamageInfo";
import { Targets } from "./Targets";

export interface DefensiveBuildingsModel extends BuildingModel {
  buildingRange: BuildingRange;
  damageInfo: DamageInfo;
  targets: Targets;
}
