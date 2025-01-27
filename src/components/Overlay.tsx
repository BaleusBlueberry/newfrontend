import React from "react";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../content/placeholder.png";
import allbuildings from "../content/allbuildings.webp";
import Armybuildings from "../content/Armybuildings.webp";
import defensesbuildings from "../content/defensesbuildings.webp";
import HeroesBuildings from "../content/HeroesBuildings.webp";
import ResourceImage from "../content/ResourceImage.webp";
import TrapsBuildings from "../content/TrapsBuildings.webp";
import useAuth from "../hooks/useAuth";
import { DeleateButtonTownHall, EditButton, FavoriteButton } from "./Card";
import useTownHalls from "../hooks/useTownHalls";
import { COCTownhallDataType } from "../Types/TownHalls/COCTownhallDataType";

interface OverlayProps {
  isOverlayOpen: boolean;
  onClose: () => void;
  townHall: COCTownhallDataType | null;
}

const Overlay: React.FC<OverlayProps> = ({
  isOverlayOpen,
  onClose,
  townHall,
}) => {
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn } = useAuth();
  const { deleateTownHall } = useTownHalls();

  if (!isOverlayOpen || !townHall) return null;

  const categories = [
    { key: "armyBuildings", title: "Army Buildings", image: Armybuildings },
    {
      key: "defensiveBuildings",
      title: "Defensive Buildings",
      image: defensesbuildings,
    },
    { key: "trapBuildings", title: "Trap Buildings", image: TrapsBuildings },
    { key: "heroes", title: "Heroes", image: HeroesBuildings },
    {
      key: "resourceBuildings",
      title: "Resource Buildings",
      image: ResourceImage,
    },
    { key: "allBuildings", title: "All Buildings", image: allbuildings },
  ];

  const handleCardClick = (buildingType: string) => {
    onClose();
    navigate(`/Townhalls/${townHall.level}/${buildingType}`);
  };

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
          <div className="flex">
            {isAdmin && (
              <>
                <EditButton navigate={`/Townhalls/Edit/${townHall.level}`} />
                <DeleateButtonTownHall
                  function={() => {
                    deleateTownHall(townHall.id);
                  }}
                  text={`Deleate TownHall Level`}
                ></DeleateButtonTownHall>
              </>
            )}
            {isLoggedIn && (
              <>
                <FavoriteButton id={townHall.id} buildingtype="townHall" />
              </>
            )}
          </div>

          <div>
            <div className="overlay-title">TownHall Level {townHall.level}</div>

            <div className="overflow-hidden flex justify-center items-center rounded-lg sm:mx-6 mx-4">
              <img
                src={
                  townHall.picture &&
                  !townHall.picture.toLowerCase().includes("string")
                    ? townHall.picture
                    : placeholderImage
                }
                alt={`Town hall Level ${townHall.level} image`}
                className="image"
              />
            </div>

            <div className="grid grid-cols-2 md:gap-1 sm:gap-0 sm:mt-1 px-1">
              {categories.map((category) => (
                <div
                  key={category.key}
                  className="overlay-card"
                  onClick={() => handleCardClick(category.key)}
                >
                  <div className="inner-image">
                    <img
                      src={category.image}
                      alt={`${category.title} Icon`}
                      className="h-24 mx-auto"
                    />
                  </div>
                  <h3 className="text-center font-semibold text-sm">
                    {category.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
