import { ResourceBuildingsModel } from "../../Types/ResourceModels/ResourceBuildingsModel";
import { CardProps } from "../Card";

interface ResourceBuildingDetailsProps extends CardProps {
  building: ResourceBuildingsModel;
}
export const ResourceBuildingDetails: React.FC<
  ResourceBuildingDetailsProps
> = ({ building }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm inner-container-x2 p-3">
        <div className="col-span-2 text-center text-base">
          <span className="font-semibold">Required TownHall: </span>
          {building.townHallLevel}
        </div>
        <div className="col-span-2 sm:col-span-1 text-base sm:text-sm">
          <span className="font-semibold">Upgrade Cost: </span>
          {building.upgradeCost.cost}
        </div>
        <div className="col-span-2 sm:col-span-1 text-base sm:text-sm">
          <span className="font-semibold">Upgrade Time: </span>
          {/* fix time rendering */}
          {building.upgradeTimeSeconds}
        </div>
        <div className="col-span-2 sm:col-span-1 text-base sm:text-sm">
          <span className="font-semibold">Experience: </span>
          {building.experience}
        </div>
        <div className="col-span-2 sm:col-span-1 text-base sm:text-sm">
          <span className="font-semibold">Health: </span>
          {building.hp}
        </div>
        {building.storageCapacityGold !== null &&
          building.storageCapacityGold !== 0 && (
            <div className="col-span-2 text-base sm:text-sm">
              <span className="font-semibold">Gold Storage Cpacity: </span>
              {building.storageCapacityGold}
            </div>
          )}
        {building.storageCapacityElixir !== null &&
          building.storageCapacityElixir !== 0 && (
            <div className="col-span-2 text-base sm:text-sm">
              <span className="font-semibold">Elixel Storage Cpacity: </span>
              {building.storageCapacityElixir}
            </div>
          )}
        {building.storageCapacityDarkElixir !== null &&
          building.storageCapacityDarkElixir !== 0 && (
            <div className="col-span-2 text-base sm:text-sm">
              <span className="font-semibold">
                Dark Elixel Storage Cpacity:{" "}
              </span>
              {building.storageCapacityDarkElixir}
            </div>
          )}
        {building.productionRate !== null && building.productionRate !== 0 && (
          <div className="col-span-2 sm:col-span-1 text-base sm:text-sm">
            <span className="font-semibold">Production Rate: </span>
            {building.productionRate}
          </div>
        )}
      </div>
    </div>
  );
};
