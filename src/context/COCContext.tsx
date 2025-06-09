import { createContext, useEffect, useState } from "react";
import { ArmyBuildingsModel } from "../Types/ArmyModels/ArmyBuildingsModel";
import { DefensiveBuildingsModel } from "../Types/DefensiveModels/DefensiveBuildingsModel";
import { TrapBuildingsModel } from "../Types/TrapModels/TrapBuildingsModel";
import { ResourceBuildingsModel } from "../Types/ResourceModels/ResourceBuildingsModel";
import { BuildingTypes } from "../Types/enums/BuildingTypes";
import apiBuildings from "../services/COC-Service-Buildings";
import handleAxiosError from "../services/handleAxiosError";
import { AxiosError } from "axios";
import { dialogs } from "../dialogs/dialogs";
import { BuildingData } from "../services/@types";
import { BuildingModel } from "../Types/BuildingModel";
import { useNavigate } from "react-router-dom";

interface COCContext {
  armyBuildings: ArmyBuildingsModel[];
  defensiveBuildings: DefensiveBuildingsModel[];
  trapBuildings: TrapBuildingsModel[];
  // heroes: heroesDataType[]; not implemented
  resourceBuildings: ResourceBuildingsModel[];
  isLoading: boolean;
  error: Record<BuildingTypes, string> | null;
  fetchAll: () => Promise<void>;
  fetchCategory: (category: BuildingTypes) => Promise<void>;
  deleateBuilding: (category: BuildingTypes, id: string) => Promise<unknown>;
  updateBuilding: (
    category: BuildingTypes,
    data: BuildingData
  ) => Promise<unknown>;
  createBuilding: (
    category: BuildingTypes,
    data: BuildingData
  ) => Promise<unknown>;
  fetchSingleBuilding: (
    category: BuildingTypes,
    id: string
  ) => Promise<BuildingModel>;
  fetchHighestLevelBuilding: (
    category: BuildingTypes,
    buildingName: string
  ) => Promise<BuildingModel | null>;
}

const COCContext = createContext<COCContext>(null);

function COCProvider({ children }) {
  //state variables:
  const [armyBuildings, setArmyBuildings] = useState<ArmyBuildingsModel[]>([]);
  const [defensiveBuildings, setDefensiveBuildings] = useState<
    DefensiveBuildingsModel[]
  >([]);
  const [trapBuildings, setTrapBuildings] = useState<TrapBuildingsModel[]>([]);
  const [resourceBuildings, setResourceBuildings] = useState<
    ResourceBuildingsModel[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<Record<BuildingTypes, string | null>>({
    armyBuildings: null,
    defensiveBuildings: null,
    trapBuildings: null,
    resourceBuildings: null,
  });

  const categoryMap: Record<
    BuildingTypes,
    React.Dispatch<React.SetStateAction<BuildingData[]>>
  > = {
    armyBuildings: setArmyBuildings,
    defensiveBuildings: setDefensiveBuildings,
    trapBuildings: setTrapBuildings,
    resourceBuildings: setResourceBuildings,
  };
  const navigate = useNavigate();

  const handleAsyncOperation = async (
    category: BuildingTypes,
    operation: () => Promise<any>
  ) => {
    setIsLoading(true);
    setError((prev) => ({ ...prev, [category]: null }));
    try {
      const result = await operation();
      return result;
    } catch (err) {
      handleAxiosError(err as AxiosError, (message) => {
        setError((prev) => ({ ...prev, [category]: message }));
        dialogs.error(message);
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAllBuildings();
  }, []);

  // Function to refresh a specific category
  const refreshCategory = async (category: BuildingTypes) => {
    await handleAsyncOperation(category, async () => {
      const response = await apiBuildings.getAll(category);
      categoryMap[category](response.data);
      return response;
    });
  };

  // refresh all categories
  const refreshAllBuildings = async () => {
    Object.keys(categoryMap).forEach(async (category) => {
      return await refreshCategory(category as BuildingTypes);
    });
  };

  // Add or update building in a specific category
  const setBuilding = async (
    category: BuildingTypes,
    building: BuildingData
  ) => {
    try {
      // Show loading state and reset error
      setIsLoading(true);
      await handleAsyncOperation(category, async () => {
        // Update the state for the given category
        categoryMap[category]((prevBuildings) => {
          const index = prevBuildings.findIndex((b) => b.id === building.id);
          if (index !== -1) {
            // Update existing building
            const updatedBuildings = [...prevBuildings];
            updatedBuildings[index] = building;
            return updatedBuildings;
          } else {
            // Add new building
            return [...prevBuildings, building];
          }
        });
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error setting building:", error);
      return null;
    }
  };

  // Fetch a single building by category and level
  const fetchSingleBuilding = async (
    category: BuildingTypes,
    id: string
  ): Promise<BuildingModel> => {
    try {
      const response = await handleAsyncOperation(category, async () => {
        return await apiBuildings.getSingle(category, id);
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching building:", error);
    }
  };

  const fetchHighestLevelBuilding = async (
    category: BuildingTypes,
    buildingName: string
  ) => {
    try {
      await refreshCategory(category);
      const buildings = {
        armyBuildings,
        defensiveBuildings,
        trapBuildings,
        resourceBuildings,
      }[category];

      const highest = buildings.filter(
        (b) => b.name.toLowerCase() == buildingName.toLowerCase()
      );

      if (!highest) return null;

      const finalBuilding = highest.sort((a, b) => b.level - a.level)[0];

      return finalBuilding;
    } catch (error) {
      dialogs.error(`there was en error getting data from previus buildings`);
      console.error(
        "Error fetching Highest Level of a building in a category:",
        error
      );
    }
  };

  // Reusable update function
  const updateBuilding = async (
    category: BuildingTypes,
    updatedBuilding: BuildingData
  ) => {
    try {
      return await handleAsyncOperation(category, async () => {
        const response = await apiBuildings.update(category, updatedBuilding);
        if (response.status === 204) {
          setBuilding(category, updatedBuilding);
          dialogs.success(`updated building successfully`);
          navigate(`/Buildings/${category}`);
        }
        return response;
      });
    } catch (error) {
      console.error("Error updating building:", error);
    }
  };

  // Reusable add function
  const addBuilding = async (
    category: BuildingTypes,
    building: BuildingData
  ) => {
    try {
      return await handleAsyncOperation(category, async () => {
        const response = await apiBuildings.create(category, building);
        if (response.status === 201) {
          setBuilding(category, response.data);
          dialogs.success(`added building successfully`);
          navigate(`/Buildings/${category}`);
        }
        return response;
      });
    } catch (error) {
      console.error("Error adding building:", error);
    }
  };

  const deleateBuilding = async (category: BuildingTypes, id: string) => {
    if (id === "") {
      setError((prev) => ({ ...prev, [category]: "id is empty" }));
      return;
    }
    try {
      return await handleAsyncOperation(category, async () => {
        const response = await apiBuildings.delete(category, id);
        if (response.status == 204) {
          await refreshCategory(category);
        }
        return response;
      });
    } catch (error) {
      console.error("Error deleting building:", error);
      return null;
    }
  };

  const contextValue: COCContext = {
    armyBuildings,
    defensiveBuildings,
    trapBuildings,
    resourceBuildings,
    fetchAll: refreshAllBuildings,
    fetchCategory: refreshCategory,
    updateBuilding,
    createBuilding: addBuilding,
    fetchSingleBuilding,
    isLoading,
    error,
    deleateBuilding,
    fetchHighestLevelBuilding,
  };

  return (
    <COCContext.Provider value={contextValue}>{children}</COCContext.Provider>
  );
}
export { COCProvider, COCContext };
