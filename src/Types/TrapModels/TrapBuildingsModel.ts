import { BuildingModel } from "../BuildingModel";
import { DamageTrapInfo } from "./DamageTrapInfo";

export interface TrapBuildingsModel extends BuildingModel {
  damageType: DamageTrapInfo;
  triggerRadius: number;
  spawnedUnits?: number;
}
