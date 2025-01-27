import { useNavigate } from "react-router-dom";
import { Card, MainPageCard } from "../components/Card";
import TownHall from "../content/TownHall.png";
import DefensiveBuildings from "../content/defensesbuildings.webp";
import TrapsBuildings from "../content/TrapsBuildings.webp";
import ResourceBuildings from "../content/ResourceImage.webp";
import Armybuildings from "../content/Armybuildings.webp";

export const Home = () => {
  const navigate = useNavigate();
  const categories = [
    { link: "townHalls", title: "TownHalls Page", image: TownHall },
    {
      link: "Buildings/defensiveBuildings",
      title: "Defensive Buildings Page",
      image: DefensiveBuildings,
    },
    {
      link: "Buildings/trapBuildings",
      title: "Traps Buildings Page",
      image: TrapsBuildings,
    },
    {
      link: "Buildings/resourceBuildings",
      title: "Resource Buildings Page",
      image: ResourceBuildings,
    },
    {
      link: "Buildings/armyBuildings",
      title: "Army buildings Page",
      image: Armybuildings,
    },
  ];
  return (
    <div className="bg-gradient-to-t py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">Clash Of Clans Helper</h1>
          <p className="text-xl mt-4">
            Welcome to a small tool to help you decide what to upgrade in your
            game.
          </p>
          <p className="text-lg mt-2">
            Click one of the categories below to get started!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {categories.map((category) => (
              <div
                onClick={() => navigate(`/${category.link}`)}
                key={category.link}
                className="cursor-pointer transform transition duration-300 hover:scale-105 rounded-xl overflow-hiddenbg-opacity-80 backdrop-blur-md"
              >
                <MainPageCard
                  image={category.image}
                  text={category.title}
                  link={category.link}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
