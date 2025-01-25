import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCOCProvider from "../../hooks/useCOCProvider";
import { BuildingCard } from "../../components/Card";
import { BuildingModel } from "../../Types/BuildingModel";
import Spinner from "../../components/Spinner";
import FindByNameAndHighestLevel from "../../Validations/FindByNameAndHighestLevel";

export const BuildingsPage: React.FC = () => {
  const { buildingType, buildingName } = useParams<{
    buildingType: string;
    buildingName: string;
  }>();
  const [selectedBuildings, setSelectedBuildings] = useState<BuildingModel[]>(
    []
  );

  const navigate = useNavigate();
  const {
    resourceBuildings,
    armyBuildings,
    defensiveBuildings,
    trapBuildings,
    fetchAll,
  } = useCOCProvider();

  useEffect(() => {
    const fetcher = async () => {
      if (buildingType) {
        await fetchAll();
        setSelectedBuildingsFunction(buildingType);
      }
    };

    fetcher();
  }, [buildingType]);

  function SetBuildingsByNameAndHighestLevel(
    selectedBuildings: BuildingModel[]
  ) {
    const buildings = FindByNameAndHighestLevel(selectedBuildings);
    setSelectedBuildings(buildings);
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

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">{buildingType}</h1>
        {!selectedBuildings && <Spinner />}
        {selectedBuildings && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8 mt-6">
            {selectedBuildings.map((building) => (
              <div
                onClick={() =>
                  navigate(`/Buildings/${buildingType}/${building.name}`)
                }
                key={building.id}
                className="cursor-pointer"
              >
                <BuildingCard key={building.id} building={building} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
