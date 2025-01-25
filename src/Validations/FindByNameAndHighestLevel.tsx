import { BuildingModel } from "../Types/BuildingModel";

const FindByNameAndHighestLevel = (selectedBuildings: BuildingModel[]) => {
  if (selectedBuildings == null) return;

  try {
    const filteredBuildings = Array.from(
      selectedBuildings
        .reduce((map, building) => {
          // Check if the building name already exists in the map
          if (
            !map.has(building.name) ||
            building.level > map.get(building.name).level
          ) {
            // Update the map with the building if it's new or has a higher level
            map.set(building.name, building);
          }
          return map;
        }, new Map())
        .values()
    );
    return filteredBuildings;
  } catch (e) {
    console.error("Error filtering buildings:", e);
    throw e;
  }
};

export default FindByNameAndHighestLevel;
