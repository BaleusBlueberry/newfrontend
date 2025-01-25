import { DamageType } from "../enums/DamageType";

export interface DamageTrapInfo {
  damageType: DamageType;
  damageRadius?: number;
  damage?: number;
}
