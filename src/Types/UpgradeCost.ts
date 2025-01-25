import { ResourceType } from "./enums/ResourceType";

export interface UpgradeCost {
  resourceType: ResourceType;
  cost: number;
}
