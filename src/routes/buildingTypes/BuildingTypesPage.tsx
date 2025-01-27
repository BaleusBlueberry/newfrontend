import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCOCProvider from "../../hooks/useCOCProvider";
import { AddCard, BuildingCard } from "../../components/Card";
import { BuildingModel } from "../../Types/BuildingModel";
import Spinner from "../../components/Spinner";
import FindByNameAndHighestLevel from "../../Validations/FindByNameAndHighestLevel";
import BuildingCardOverlay from "../../components/BuildingCardOverlay";
import useAuth from "../../hooks/useAuth";

export const BuildingTypesPage: React.FC = () => {
  const { buildingType, buildingName } = useParams<{
    buildingType: string;
    buildingName: string;
  }>();
  const [selectedBuildings, setSelectedBuildings] = useState<BuildingModel[]>(
    []
  );
  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingModel | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const {
    resourceBuildings,
    armyBuildings,
    defensiveBuildings,
    trapBuildings,
    isLoading,
  } = useCOCProvider();

  const toggleOverlay = (building: BuildingModel | null = null) => {
    setSelectedBuilding(building);
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    // Ensure that the data is fetched before processing
    const fetchData = async () => {
      if (!isLoading && buildingType) {
        setSelectedBuildingsFunction(buildingType);
      }
    };

    fetchData();
  }, [buildingType, buildingName, isLoading]);

  function SetBuildingsByNameAndHighestLevel(
    selectedBuildings: BuildingModel[]
  ) {
    let buildings;
    if (buildingName) {
      buildings = selectedBuildings.filter((building) =>
        building.name.toLowerCase().includes(buildingName.toLowerCase())
      );
    } else {
      buildings = FindByNameAndHighestLevel(selectedBuildings);
    }
    setSelectedBuildings(buildings);
  }

  function setSelectedBuildingsFunction(selectedBuildingType: string) {
    let building;
    if (selectedBuildingType === "") {
      building = buildingType;
    } else {
      building = selectedBuildingType;
    }

    switch (building.toLocaleLowerCase()) {
      case "armybuildings":
        SetBuildingsByNameAndHighestLevel(armyBuildings);
        break;
      case "defensivebuildings":
        SetBuildingsByNameAndHighestLevel(defensiveBuildings);
        break;
      case "trapbuildings":
        SetBuildingsByNameAndHighestLevel(trapBuildings);
        break;
      case "resourcebuildings":
        SetBuildingsByNameAndHighestLevel(resourceBuildings);
        break;
      case "allbuildings":
        SetBuildingsByNameAndHighestLevel([
          ...armyBuildings,
          ...defensiveBuildings,
          ...trapBuildings,
          ...resourceBuildings,
        ]);
        break;
      case "heroes":
        navigate("/townhalls", { replace: true });
        break;
      default:
        navigate("/townhalls", { replace: true });
        return null;
    }
  }

  if (isLoading) {
    return <Spinner />; // Show a loading spinner if the data is still being fetched
  }

  return (
    <div>
      <div className="p-6">
        <h1 className="overlay-title">{buildingType}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8 mt-6">
          {selectedBuildings.map((building) => (
            <div
              onClick={() => {
                if (buildingName) toggleOverlay(building);
                else {
                  navigate(`/Buildings/${buildingType}/${building.name}`);
                }
              }}
              key={building.id}
              className="cursor-pointer"
            >
              <BuildingCard key={building.id} building={building} />
            </div>
          ))}
          {isAdmin && (
            <div
              onClick={() => {
                navigate(`/${buildingType}/add`);
              }}
              key="324"
              className="cursor-pointer"
            >
              <AddCard buildingtype={buildingType}></AddCard>
            </div>
          )}
        </div>
      </div>
      <BuildingCardOverlay
        isOverlayOpen={isOverlayOpen}
        onClose={() => toggleOverlay()}
        building={selectedBuilding}
      />
    </div>
  );
};
