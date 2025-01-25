import { ArmyBuildingsModel } from "../../Types/ArmyModels/ArmyBuildingsModel";
import { BuildingModel } from "../../Types/BuildingModel";
import { DefensiveBuildingsModel } from "../../Types/DefensiveModels/DefensiveBuildingsModel";
import { ResourceBuildingsModel } from "../../Types/ResourceModels/ResourceBuildingsModel";
import { TrapBuildingsModel } from "../../Types/TrapModels/TrapBuildingsModel";
import { CardProps } from "../Card";
import placeholderImage from "../../content/placeholder.png";
import { ArmyBuildingDetails } from "./ArmyBuildingDetails";
import { DefensiveBuildingDetails } from "./DefensiveBuildingDetails";
import { ResourceBuildingDetails } from "./ResourceBuildingDetails";
import { TrapBuildingDetails } from "./TrapBuildingDetails";

interface BasicBuildingDetailsProps extends CardProps {
  building: BuildingModel;
  buildingType: string;
}

export const BasicBuildingDetails: React.FC<BasicBuildingDetailsProps> = ({
  building,
  buildingType,
}) => {
  const renderBuildingDetails = () => {
    switch (buildingType) {
      case "trapBuildings":
        return (
          <TrapBuildingDetails building={building as TrapBuildingsModel} />
        );
      case "armyBuildings":
        return (
          <ArmyBuildingDetails building={building as ArmyBuildingsModel} />
        );
      case "resourceBuildings":
        return (
          <ResourceBuildingDetails
            building={building as ResourceBuildingsModel}
          />
        );
      case "defensiveBuildings":
        return (
          <DefensiveBuildingDetails
            building={building as DefensiveBuildingsModel}
          />
        );
      default:
        return (
          <>
            <p>Error Loading Details</p>
          </>
        ); // Handle unknown buildingType
    }
  };

  return (
    <div>
      <div className="overlay-title">
        {building.name} Level {building.level}
      </div>
      <div className="overflow-hidden flex justify-center items-center rounded-lg sm:mx-6 mx-4">
        <img
          src={
            building.picture &&
            !building.picture.toLowerCase().includes("string")
              ? building.picture
              : placeholderImage
          }
          alt={`${building.name} Level ${building.level} image`}
          className="image"
        />
      </div>
      {renderBuildingDetails()}
    </div>
  );
};
