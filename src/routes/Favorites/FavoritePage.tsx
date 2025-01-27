import React, { useEffect, useState } from "react";
import useCOCProvider from "../../hooks/useCOCProvider";
import useAuth from "../../hooks/useAuth";
import BuildingCardOverlay from "../../components/BuildingCardOverlay";
import { BuildingCard } from "../../components/Card";
import { BuildingModel } from "../../Types/BuildingModel";
import Spinner from "../../components/Spinner";

export const FavoriteBuildingsPage: React.FC = () => {
  const {
    armyBuildings,
    defensiveBuildings,
    trapBuildings,
    resourceBuildings,
    isLoading,
  } = useCOCProvider();
  const {
    favArmyBuildings,
    favDefensiveBuildings,
    favResourceBuildings,
    favTrapBuildings,
    isLoadingFavorites,
  } = useAuth();

  const [favoriteBuildings, setFavoriteBuildings] = useState<BuildingModel[]>(
    []
  );
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = (building: BuildingModel = null) => {
    setSelectedBuilding(building);
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    if (!isLoading && !isLoadingFavorites) {
      // Combine favorite buildings from all categories
      const allFavoriteBuildings = [
        ...armyBuildings.filter((b) => favArmyBuildings.includes(b.id)),
        ...defensiveBuildings.filter((b) =>
          favDefensiveBuildings.includes(b.id)
        ),
        ...trapBuildings.filter((b) => favTrapBuildings.includes(b.id)),
        ...resourceBuildings.filter((b) => favResourceBuildings.includes(b.id)),
      ];
      setFavoriteBuildings(allFavoriteBuildings);
    }
  }, [
    isLoading,
    favArmyBuildings,
    favDefensiveBuildings,
    favResourceBuildings,
    favTrapBuildings,
    isLoadingFavorites,
  ]);

  if (isLoading) {
    return <Spinner />; // Show a loading spinner if the data is still being fetched
  }

  return (
    <div className="p-6">
      <h1 className="overlay-title">Favorite Buildings</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8 mt-6">
        {favoriteBuildings.map((building) => (
          <div
            key={building.id}
            onClick={() => toggleOverlay(building)}
            className="cursor-pointer"
          >
            <BuildingCard building={building} />
          </div>
        ))}
      </div>
      <BuildingCardOverlay
        isOverlayOpen={isOverlayOpen}
        onClose={() => toggleOverlay()}
        building={selectedBuilding}
      />
    </div>
  );
};

export default FavoriteBuildingsPage;
