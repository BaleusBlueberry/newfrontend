import { ReactNode } from "react";
import placeholderImage from "../content/placeholder.png";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { dialogs } from "../dialogs/dialogs";
import { COCTownhallDataType } from "../Types/TownHalls/COCTownhallDataType";
import { BuildingModel } from "../Types/BuildingModel";
import AddIcon from "../content/AddIcon.png";

export interface CardProps {
  children?: ReactNode;
  title?: ReactNode;
  textsize?: BigInteger;
}

interface FunctionButtonProps {
  navigate: string;
}

interface ReactiveButtonProps {
  text: string;
  function: () => void;
}

interface TownHallCardProp extends CardProps {
  townHall: COCTownhallDataType;
}
interface BuildingCardProps extends CardProps {
  building: BuildingModel;
}
interface AddCardProps extends CardProps {
  buildingtype: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className=" p-6 shadow-lg rounded-lg text-center">
      <h2 className="text-xl text-center font-semibold">{props.title}</h2>
      <div className="flex items-center justify-center">{props.children}</div>
    </div>
  );
};

const TownHallCard: React.FC<TownHallCardProp> = ({ townHall }) => {
  return (
    <div className="overlay-card">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 mx-auto">
          <img
            className="h-25 sm:h-24 xl:h-32 transform transition-transform duration-300"
            src={
              townHall.picture &&
              !townHall.picture.toLowerCase().includes("string")
                ? townHall.picture
                : placeholderImage
            }
            alt={`Town Hall Level ${townHall.level}`}
          />
        </div>
        <h3 className="text-lg font-semibold">Level {townHall.level}</h3>
        <p className="text-sm text-gray-500">Tap to see details</p>
      </div>
    </div>
  );
};

const EditButton: React.FC<FunctionButtonProps> = ({ navigate }) => {
  const nav = useNavigate();
  return (
    <div
      className="admin-btn"
      onClick={() => {
        nav(navigate);
      }}
    >
      <FaPencilAlt aria-description="Edit" />
    </div>
  );
};

const DeleateButtonTownHall: React.FC<ReactiveButtonProps> = (
  props: ReactiveButtonProps
) => {
  let answer;
  return (
    <div
      className="admin-btn"
      onClick={async () => {
        answer = await dialogs.question(props.text);
        if (answer) props.function();
      }}
    >
      <FaTrashAlt aria-description="Deleate Button" />
    </div>
  );
};

const ReturnButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="return-btn"
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/"); // Default fallback route
        }
      }}
    >
      <IoReturnDownBackOutline />
    </div>
  );
};

const NotFoundCard: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className="Card p-6 shadow-lg rounded-lg text-center">
      <h2 className="text-xl text-center font-semibold mb-2">{props.title}</h2>
      <div className="flex items-center justify-center">{props.children}</div>
    </div>
  );
};

const AddCard: React.FC<AddCardProps> = ({ buildingtype }) => {
  return (
    <div className="overlay-card">
      <div className="p-4 rounded-lg flex flex-col items-center justify-center overflow-hidden">
        <img
          className="w-full h-auto max-h-48 object-cover"
          src={AddIcon || placeholderImage}
          alt="add icon button"
        />
        <h2 className="text-xl text-center font-semibold">
          Add New {buildingtype}
        </h2>
      </div>
    </div>
  );
};

const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
  return (
    <div className="overlay-card">
      <div className="p-4 rounded-lg flex flex-col items-center justify-center overflow-hidden">
        <img
          className="w-full h-auto max-h-48 object-cover -mb-2"
          src={building.picture || placeholderImage}
          alt={building.name}
        />
        <h3 className="text-lg font-semibold text-center break-words">
          {building.name}
        </h3>
        <p className="text-sm text-gray-500 text-center break-words">
          Level {building.level}
        </p>
      </div>
    </div>
  );
};

export {
  Card,
  NotFoundCard,
  BuildingCard,
  TownHallCard,
  EditButton,
  ReturnButton,
  DeleateButtonTownHall,
  AddCard,
};
