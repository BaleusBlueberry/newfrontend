import { TimeCalculator } from "../../services/TimeCalculator";
import { ArmyBuildingsModel } from "../../Types/ArmyModels/ArmyBuildingsModel";
import { CardProps } from "../Card";

interface ArmyBuildingDetailsProps extends CardProps {
  building: ArmyBuildingsModel;
}
export const ArmyBuildingDetails: React.FC<ArmyBuildingDetailsProps> = ({
  building,
}) => {
  const timer = new TimeCalculator(building.upgradeTimeSeconds);
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl -mt-6 inner-container-x2 p-3">
        <div className="col-span-2 text-center">
          <span className="font-semibold">Required TownHall: </span>
          {building.townHallLevel}
        </div>
        <div className="col-span-2 sm:col-span-1 text-2xl">
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
        {building.capacity !== null && building.capacity !== 0 && (
          <div className="col-span-2">
            <span className="font-semibold">Unit Capacity: </span>
            {building.capacity}
          </div>
        )}
        {building.heroSlots !== null && building.heroSlots !== 0 && (
          <div className="col-span-2">
            <span className="font-semibold">Hero Slots: </span>
            {building.heroSlots}
          </div>
        )}
        {building.heroUpgrades.archerQueen !== null &&
          building.heroUpgrades.archerQueen !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">ArcherQueen Max: </span>
              {building.heroUpgrades.archerQueen}
            </div>
          )}
        {building.heroUpgrades.barbarianKing !== null &&
          building.heroUpgrades.barbarianKing !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Barbarian King Max: </span>
              {building.heroUpgrades.barbarianKing}
            </div>
          )}
        {building.heroUpgrades.grandWarden !== null &&
          building.heroUpgrades.grandWarden !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Grand Warden Max: </span>
              {building.heroUpgrades.grandWarden}
            </div>
          )}
        {building.heroUpgrades.royalChampion !== null &&
          building.heroUpgrades.royalChampion !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Royal Champion Max: </span>
              {building.heroUpgrades.archerQueen}
            </div>
          )}
        {building.heroUpgrades.minionPrince !== null &&
          building.heroUpgrades.minionPrince !== 0 && (
            <div className="col-span-2">
              <span className="font-semibold">Minion Prince Max: </span>
              {building.heroUpgrades.minionPrince}
            </div>
          )}
        {building.unlocks !== null && (
          <div className="col-span-2 sm:col-span-1">
            <span className="font-semibold">Unlucks: </span>
            {building.unlocks}
          </div>
        )}
      </div>
    </div>
  );
};
