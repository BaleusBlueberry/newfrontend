import { TimeCalculator } from "../../services/TimeCalculator";
import { DefensiveBuildingsModel } from "../../Types/DefensiveModels/DefensiveBuildingsModel";
import { CardProps } from "../Card";

interface DefensiveBuildingDetailsProps extends CardProps {
  building: DefensiveBuildingsModel;
}

export const DefensiveBuildingDetails: React.FC<
  DefensiveBuildingDetailsProps
> = ({ building }) => {
  const timer = new TimeCalculator(building.upgradeTimeSeconds);
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl -mt-2 inner-container-x2 p-3">
        <div className="col-span-2 text-center">
          <span className="font-semibold">Required TownHall: </span>
          {building.townHallLevel}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Upgrade Cost: </span>
          {building.upgradeCost.cost}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Upgrade Time: </span>
          {timer.printFull()}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Experience: </span>
          {building.experience}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Health: </span>
          {building.hp}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Targets: </span>
          {building.damageInfo.damageType}
        </div>
        {building.buildingRange.minRange !== null &&
          building.buildingRange.minRange !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Minimum Range: </span>
              {building.buildingRange.minRange}
            </div>
          )}
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">max Range: </span>
          {building.buildingRange.maxRange}
        </div>
        {building.damageInfo.shockwaveDamage !== null &&
          building.damageInfo.shockwaveDamage !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Shockwave Damage: </span>
              {building.damageInfo.shockwaveDamage}
            </div>
          )}
        {building.damageInfo.damageWhenDestroyed !== null &&
          building.damageInfo.damageWhenDestroyed !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Damage When Destroyed: </span>
              {building.damageInfo.damageWhenDestroyed}
            </div>
          )}
        {building.damageInfo.pushStrength !== null &&
          building.damageInfo.pushStrength !== 0 && (
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold">PushS trength: </span>
              {building.damageInfo.pushStrength}
            </div>
          )}
        {building.damageInfo.damagePerSecond !== null &&
          building.damageInfo.damagePerSecond !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Damage Per Second: </span>
              {building.damageInfo.damagePerSecond}
            </div>
          )}
        {building.damageInfo.damagePerHit !== null &&
          building.damageInfo.damagePerHit !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Damage Per Hit: </span>
              {building.damageInfo.damagePerHit}
            </div>
          )}
        {building.damageInfo.burstsFire !== null &&
          building.damageInfo.burstsFire !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Bursts Fire Ammount: </span>
              {building.damageInfo.burstsFire}
            </div>
          )}
      </div>
    </div>
  );
};
