import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCOCProvider from "../../hooks/useCOCProvider";
import { BuildingModel } from "../../Types/BuildingModel";
import Spinner from "../../components/Spinner";
import BuildingCardOverlay from "../../components/BuildingCardOverlay";
import { CheckLevel } from "../../Validations/LevelChecker";
import { BuildingCard } from "../../components/Card";

export const TownHallBuildings: React.FC = () => {
  const { level, buildingType } = useParams<{
    level: string;
    buildingType: string;
  }>();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedBuildingType, setSelectedBuildingType] = useState("");
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingModel | null>(null);

  const navigate = useNavigate();
  const {
    resourceBuildings,
    armyBuildings,
    defensiveBuildings,
    trapBuildings,
    fetchAll,
  } = useCOCProvider();
  const toggleOverlay = (building: BuildingModel | null = null) => {
    setSelectedBuilding(building);
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    const fetcher = async () => {
      if (buildingType) {
        setSelectedBuildingType(buildingType);
        await fetchAll();
        setSelectedBuildingsFunction(selectedBuildingType);
      }
    };

    fetcher();
  }, []);

  if (isNaN(Number(level))) {
    navigate("/townhalls", { replace: true });
    return null;
  }

  let levelNumber;
  if (level == null) {
    levelNumber = 0;
  } else {
    levelNumber = Number(level);
  }
  CheckLevel(levelNumber);

  function SetBuildingsByLevel(
    selectedBuildings: BuildingModel[],
    lvl: number
  ) {
    if (lvl == null || lvl == undefined || selectedBuildings == null) return;

    try {
      if (lvl == 0) {
        setSelectedBuildings(selectedBuildings);
        return;
      }
      const filteredBuildings = selectedBuildings.filter((building) => {
        return building.townHallLevel === lvl;
      });
      setSelectedBuildings(filteredBuildings);
    } catch (e) {
      console.error("Error filtering buildings:", e);
      throw e;
    }
  }

  function setSelectedBuildingsFunction(selectedBuildingType: string) {
    let building;
    if (selectedBuildingType == "") {
      building = buildingType;
    } else {
      building = selectedBuildingType;
    }
    switch (building.toLocaleLowerCase()) {
      case "armybuildings":
        SetBuildingsByLevel(armyBuildings, levelNumber);
        break;
      case "defensivebuildings":
        SetBuildingsByLevel(defensiveBuildings, levelNumber);
        break;
      case "trapbuildings":
        SetBuildingsByLevel(trapBuildings, levelNumber);
        break;
      case "resourcebuildings":
        SetBuildingsByLevel(resourceBuildings, levelNumber);
        break;
      case "allbuildings":
        SetBuildingsByLevel(
          [
            ...armyBuildings,
            ...defensiveBuildings,
            ...trapBuildings,
            ...resourceBuildings,
          ],
          levelNumber
        );
        break;
      case "heroes":
        navigate("/townhalls", { replace: true });
        break;
      default:
        navigate("/townhalls", { replace: true });
        return null; // Stop further rendering
    }
  }

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Details for Townhall Level {level} - {buildingType}
        </h1>
        {!selectedBuildings && <Spinner />}
        {selectedBuildings && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8 mt-6">
            {selectedBuildings.map((building) => (
              <div
                onClick={() => toggleOverlay(building)}
                key={building.id}
                className="cursor-pointer"
              >
                <BuildingCard key={building.id} building={building} />
              </div>
            ))}
          </div>
        )}
      </div>
      <BuildingCardOverlay
        isOverlayOpen={isOverlayOpen}
        onClose={() => toggleOverlay()}
        building={selectedBuilding}
      />
    </div>
  );
};
