import { TimeCalculator } from "../../services/TimeCalculator";
import { TrapBuildingsModel } from "../../Types/TrapModels/TrapBuildingsModel";
import { CardProps } from "../Card";

interface TrapBuildingDetailsProps extends CardProps {
  building: TrapBuildingsModel;
}
export const TrapBuildingDetails: React.FC<TrapBuildingDetailsProps> = ({
  building,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl -mt-6 inner-container-x2 p-3">
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
          {TimeCalculator(building.upgradeTimeSeconds)}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Experience: </span>
          {building.experience}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-semibold">Trigger Radius: </span>
          {building.triggerRadius}
        </div>
        {building.spawnedUnits == null || building.spawnedUnits === 0 ? (
          <>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold">Damage Type: </span>
              {building.damageType.damageType}
            </div>

            {building.damageType.damage && (
              <div className="col-span-2 sm:col-span-1">
                <span className="font-semibold">Damage Radius: </span>
                {building.damageType.damageRadius}
              </div>
            )}
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold">Damage: </span>
              {building.damageType.damage}
            </div>
          </>
        ) : (
          <div className="col-span-2">
            <span className="font-semibold">Spawned Units Count: </span>
            {building.spawnedUnits}
          </div>
        )}
      </div>
    </div>
  );
};
