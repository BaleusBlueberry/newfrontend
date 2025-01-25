import { ReactNode } from "react";
import { ResourceBuildingsModel } from "../Types/ResourceModels/ResourceBuildingsModel";
import { TrapBuildingsModel } from "../Types/TrapModels/TrapBuildingsModel";
import { ArmyBuildingsModel } from "../Types/ArmyModels/ArmyBuildingsModel";
import { DefensiveBuildingsModel } from "../Types/DefensiveModels/DefensiveBuildingsModel";

export type FC<T> = (props: T) => ReactNode;

export type RegisterUser = {
  Email: string;
  Username: string;
  Password: string;
  PasswordConfirm: string;
};

export type editprofile = {
  userId: string;
  email?: string; // Optional
  userName?: string; // Optional
  newPassword?: string; // Optional
  currentPassword?: string; // Optional
};

export type FCP = FC<{ children: ReactNode }>;

export type productType = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  price: number;
};

export type BuildingData =
  | ArmyBuildingsModel
  | DefensiveBuildingsModel
  | TrapBuildingsModel
  | ResourceBuildingsModel;
