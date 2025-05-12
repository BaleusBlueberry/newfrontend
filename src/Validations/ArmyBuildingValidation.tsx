import * as Yup from "yup";
import { BuildingTypes } from "../Types/enums/BuildingTypes";
import { ResourceType } from "../Types/enums/ResourceType";

export const ArmyBuildingsValidation = Yup.object({
  level: Yup.number()
    .min(1, "Level must be at least 1")
    .required("Level is required"),
  picture: Yup.string()
    .url("Picture must be a valid URL")
    .required("Picture is required"),
  name: Yup.string().required("Name is required"),
  hp: Yup.number().min(0, "HP cannot be negative"),
  experience: Yup.number().required("Experience is required"),
  townHallLevel: Yup.number()
    .min(1, "Level must be at least 1")
    .max(17, "Level must be at most 17")
    .required("Town hall level is required"),
  upgradeTimeSeconds: Yup.number()
    .min(0, "Upgrade time cannot be negative")
    .required("Upgrade time is required"),
  buildingType: Yup.mixed<BuildingTypes>()
    .oneOf(
      Object.values(BuildingTypes) as BuildingTypes[],
      "Invalid building type"
    )
    .required("Building type is required"),
  upgradeCost: Yup.object({
    resourceType: Yup.mixed<ResourceType>()
      .oneOf(
        Object.values(ResourceType) as ResourceType[],
        "Invalid resource type"
      )
      .required("Resource type is required"),
    cost: Yup.number()
      .min(0, "Cost cannot be negative")
      .required("Cost is required"),
  }).required("Upgrade cost is required"),
  unlocks: Yup.array().of(Yup.string()).default([]),
  capacity: Yup.number().min(0, "Capacity cannot be negative").default(0),
  heroSlots: Yup.number().min(0, "Hero slots cannot be negative").default(0),
  heroUpgrades: Yup.object({
    barbarianKing: Yup.number().min(0).default(0),
    archerQueen: Yup.number().min(0).default(0),
    grandWarden: Yup.number().min(0).default(0),
    royalChampion: Yup.number().min(0).default(0),
    minionPrince: Yup.number().min(0).default(0),
  }).required("Hero upgrades are required"),
});
