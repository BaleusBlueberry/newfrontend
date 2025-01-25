import * as Yup from "yup";
import { BuildingTypes } from "../Types/enums/BuildingTypes";
import { ResourceType } from "../Types/enums/ResourceType";
export const ResourceBuildingValidation = Yup.object({
  level: Yup.number()
    .min(1, "Level must be at least 1")
    .required("Level is required"),
  picture: Yup.string()
    .url("Picture must be a valid URL")
    .required("Picture is required"),
  name: Yup.string().required("Required"),
  hp: Yup.number(),
  experience: Yup.number().required("Required"),
  townHallLevel: Yup.number()
    .min(1, "Level must be at least 1")
    .max(17, "Level must be at most 17")
    .required("Required"),
  upgradeTimeSeconds: Yup.number()
    .min(0, "Upgrade time cannot be negative")
    .required("Required"),
  buildingType: Yup.mixed<keyof typeof BuildingTypes>()
    .oneOf(Object.values(BuildingTypes), "Invalid building type")
    .required("Building type is required"),
  productionRate: Yup.number()
    .min(0, "Production rate cannot be negative")
    .default(0),
  storageCapacityGold: Yup.number()
    .min(0, "Gold storage capacity cannot be negative")
    .default(0),
  storageCapacityElixir: Yup.number()
    .min(0, "Elixir storage capacity cannot be negative")
    .default(0),
  storageCapacityDarkElixir: Yup.number()
    .min(0, "Dark Elixir storage capacity cannot be negative")
    .default(0),
  upgradeCost: Yup.object({
    resourceType: Yup.mixed<keyof typeof ResourceType>()
      .oneOf(Object.values(ResourceType), "Invalid resource type")
      .required("Resource type is required"),
    cost: Yup.number()
      .min(0, "Cost cannot be negative")
      .required("Cost is required"),
  }).required("Upgrade cost is required"),
});
