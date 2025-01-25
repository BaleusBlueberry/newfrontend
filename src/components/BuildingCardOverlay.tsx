import useAuth from "../hooks/useAuth";
import { DeleateButtonTownHall, EditButton } from "./Card";
import { BuildingModel } from "../Types/BuildingModel";
import useCOCProvider from "../hooks/useCOCProvider";
import { BasicBuildingDetails } from "./buildingDetails/BuildingDitails";

interface OverlayProps {
  isOverlayOpen: boolean;
  onClose: () => void;
  building: BuildingModel;
}

export const BuildingCardOverlay: React.FC<OverlayProps> = ({
  isOverlayOpen,
  onClose,
  building,
}) => {
  const { isAdmin } = useAuth();
  const { deleateBuilding } = useCOCProvider();

  if (!isOverlayOpen || !building) return null;

  const categories = [
    { key: "otherBuildings" },
    { key: "defensiveBuildings" },
    { key: "trapBuildings" },
    { key: "heroes" },
    { key: "resourceBuildings" },
    { key: "allBuildings" },
  ];

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-container"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
          margin: "20px",
        }}
      >
        <div className="inner-container">
          {isAdmin && (
            <div className="flex">
              <EditButton
                navigate={`/${building.buildingType}/edit/${building.id}`}
              />
              <DeleateButtonTownHall
                function={() => {
                  deleateBuilding(building.buildingType, building.id);
                }}
                text={`Deleate ${building.name} level ${building.level}`}
              ></DeleateButtonTownHall>
            </div>
          )}
          <div className="inner-container p-4 ">
            <BasicBuildingDetails
              building={building}
              buildingType={building.buildingType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingCardOverlay;
