import { useEffect, useState } from "react";
import { AddCard, Card, TownHallCard } from "../../components/Card";
import Spinner from "../../components/Spinner";
import Overlay from "../../components/Overlay";
import useTownHalls from "../../hooks/useTownHalls";
import { COCTownhallDataType } from "../../Types/TownHalls/COCTownhallDataType";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const TownhallLevels = () => {
  const { townHalls, isLoadingTownHall, getAllTownHalls } = useTownHalls();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedTownhall, setSelectedTownhall] =
    useState<COCTownhallDataType | null>(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleOverlay = (townhall: COCTownhallDataType | null = null) => {
    setSelectedTownhall(townhall);
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    if (townHalls.length < 1) getAllTownHalls();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <Card title="Townhall Levels"></Card>
      </div>
      {isLoadingTownHall && <Spinner />}
      {!isLoadingTownHall && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {townHalls &&
              [...townHalls]
                .sort((a, b) => a.level - b.level) // Sort by level in ascending order
                .map((townhall) => (
                  <div
                    onClick={() => toggleOverlay(townhall)}
                    key={townhall.id}
                    className="cursor-pointer"
                  >
                    <TownHallCard townHall={townhall} />
                  </div>
                ))}
            {isAdmin && (
              <div
                onClick={() => {
                  navigate(`/TownHalls/add`);
                }}
                key="324"
                className="cursor-pointer"
              >
                <AddCard buildingtype={"Town Hall"}></AddCard>
              </div>
            )}
          </div>
        </>
      )}
      <Overlay
        isOverlayOpen={isOverlayOpen}
        onClose={() => toggleOverlay()}
        townHall={selectedTownhall}
      />
    </div>
  );
};

export default TownhallLevels;
