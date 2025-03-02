import { BuildingModel } from "../Types/BuildingModel";

const FindByNameAndHighestLevel = (selectedBuildings: BuildingModel[]) => {
  if (!Array.isArray(selectedBuildings) || selectedBuildings.length === 0) {
    return [];
  }

  try {
    const filteredBuildings = Array.from(
      selectedBuildings
        .filter(
          (building) =>
            building && building.name && typeof building.name === "string"
        ) // Ensure valid name
        .reduce((map, building) => {
          if (
            !map.has(building.name) ||
            building.level > map.get(building.name).level
          ) {
            map.set(building.name, building);
          }
          return map;
        }, new Map<string, BuildingModel>())
        .values()
    );

    return filteredBuildings;
  } catch (e) {
    console.error("Error filtering buildings:", e);
    return []; // Return an empty array on error
  }
};

export default FindByNameAndHighestLevel;
