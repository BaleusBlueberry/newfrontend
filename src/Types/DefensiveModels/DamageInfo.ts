import { DamageType } from "../enums/DamageType";

export interface DamageInfo {
  damagePerHit?: number;
  damagePerSecond?: number;
  shockwaveDamage?: number;
  burstsFire?: number;
  damageWhenDestroyed?: number;
  pushStrength?: number;
  damageType: DamageType;
}
