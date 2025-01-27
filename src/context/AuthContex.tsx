import { createContext, useEffect, useState } from "react";
import { UserDataForUpdateModel } from "../Types/userDataModels/UserDataForUpdateModel";
import { dialogs } from "../dialogs/dialogs";
import auth from "../services/auth-service";
import { decodeToken } from "../services/TokenDecode";
import handleAxiosError from "../services/handleAxiosError";
import { AxiosError } from "axios";
import { BuildingFavoritesTypes } from "../Types/enums/BuildingTypes";
import {
  FavoritesModel,
  FavoritesToServerModel,
} from "../Types/userDataModels/FavoritesModel";

const checkToken = !!localStorage.getItem("token");
const getToken = localStorage.getItem("token") ?? "";

export interface LoginResponse {
  token: string;
  roles: string[];
}

export interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoadingFavorites: boolean;
  token: string;
  loginFunction: (response: LoginResponse) => void;
  logout: () => void;
  getSingleUser: () => Promise<UserDataForUpdateModel>;
  getFavorites: () => Promise<FavoritesModel>;
  setSingleFavorite: (category: string, id: string) => void;
  checkIfFavorite: (category: string, id: string) => boolean;
  favArmyBuildings: string[];
  favDefensiveBuildings: string[];
  favTrapBuildings: string[];
  favTownHalls: string[];
  favResourceBuildings: string[];
}

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken);
  const [token, setToken] = useState(getToken);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoadingFavorites, setLoadingFavorites] = useState(true);
  let firstMove = false;

  const [favArmyBuildings, setFavArmyBuildings] = useState<string[]>([]);
  const [favDefensiveBuildings, setFavDefensiveBuildings] = useState<string[]>(
    []
  );
  const [favTrapBuildings, setFavTrapBuildings] = useState<string[]>([]);
  const [favResourceBuildings, setFavResourceBuildings] = useState<string[]>(
    []
  );
  const [favTownHalls, setFavTownHalls] = useState<string[]>([]);

  const categoryMap: Record<
    BuildingFavoritesTypes,
    React.Dispatch<React.SetStateAction<string[]>>
  > = {
    armyBuildings: setFavArmyBuildings,
    defensiveBuildings: setFavDefensiveBuildings,
    trapBuildings: setFavTrapBuildings,
    resourceBuildings: setFavResourceBuildings,
    townHall: setFavTownHalls,
  };

  const favoritesArray = {
    armyBuildings: favArmyBuildings,
    defensiveBuildings: favDefensiveBuildings,
    trapBuildings: favTrapBuildings,
    resourceBuildings: favResourceBuildings,
    townHall: favTownHalls,
  };

  const isValidCategory = (
    category: string
  ): category is keyof typeof favoritesArray => {
    return [
      "armyBuildings",
      "defensiveBuildings",
      "trapBuildings",
      "resourceBuildings",
      "townHall",
    ].includes(category);
  };

  const resetAllFavorites = () => {
    for (const buildingType in BuildingFavoritesTypes) {
      setSingleFavoriteCategorie(BuildingFavoritesTypes[buildingType], []);
    }
  };

  useEffect(() => {
    const updateFavorites = async () => {
      const favorites: FavoritesToServerModel = {
        UserId: userId,
        FavoriteTownHalls: favTownHalls,
        FavoriteBuildings: {
          armyBuildings: favArmyBuildings,
          defensiveBuildings: favDefensiveBuildings,
          trapBuildings: favTrapBuildings,
          resourceBuildings: favResourceBuildings,
        },
      };

      const response = await auth.UpdateFavorites(favorites);
      if (response.status !== 200) {
        dialogs.error("Failed to update favorites! Try to relogin.");
      }
    };
    if (firstMove) updateFavorites();
  }, [
    favArmyBuildings,
    favDefensiveBuildings,
    favTrapBuildings,
    favResourceBuildings,
    favTownHalls,
  ]);

  useEffect(() => {
    setLoadingFavorites(true);
    if (checkToken) {
      setToken(getToken);
      console.log("logged in");
      const decodedToken = decodeToken(token);
      setUserId(decodedToken.userId);
      getFavorites(decodedToken.userId);

      if (decodedToken.roles.includes("Admin")) {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if token not found
      setUserId("");
      console.log("not logged in");
      resetAllFavorites();
    }
    setLoadingFavorites(false);
  }, []);

  function loginFunction(response: LoginResponse) {
    setIsLoggedIn(true);
    setToken(response.token);

    localStorage.setItem("token", response.token); // Store token in localStorage

    const decodedToken = decodeToken(response.token);
    setUserId(decodedToken.userId);
    getFavorites(decodedToken.userId);

    if (response.roles.includes("Admin")) {
      setIsAdmin(true);
    }
  }

  function logout() {
    setIsLoggedIn(false);
    setToken("");
    setUserId("");
    setIsAdmin(false);
    localStorage.removeItem("token"); // Remove token from localStorage
    resetAllFavorites();
  }

  const getSingleUser = async () => {
    dialogs.load();
    try {
      const decodedToken = decodeToken(token);
      if (!decodedToken.userId) {
        throw new Error("Invalid token");
      }
      const user = await auth.GetUser(decodedToken.userId);
      dialogs.closeLoad();

      return user.data;
    } catch (err) {
      dialogs.closeLoad();
      handleAxiosError(err as AxiosError, (message) => {
        dialogs.error(message);
      });
      throw err;
    }
  };

  const getFavorites = async (id: string) => {
    setLoadingFavorites(true);
    if (id == "") {
      return;
    }
    try {
      const response = await auth.GetFavorites(id);
      if (response.status == 200) {
        const constructedData: FavoritesModel = response.data;
        setAllFavoriteCategories(constructedData);
      }
      setLoadingFavorites(false);
      return response;
    } catch (err) {
      handleAxiosError(err as AxiosError, (message) => {
        dialogs.error(message);
        setLoadingFavorites(false);
      });
      throw err;
    }
  };

  const setSingleFavorite = (category: string, id: string) => {
    if (!isValidCategory(category)) return;

    // Access the category state setter using categoryMap
    const setCategory = categoryMap[category];
    // Check if the category setter exists
    if (setCategory) {
      setCategory((prev) => {
        if (prev.includes(id)) {
          // If the ID exists, remove it
          return prev.filter((existingId) => existingId !== id);
        } else {
          // If the ID doesn't exist, add it
          return [...prev, id];
        }
      });
    } else {
      console.error("Category not found in categoryMap:", category);
    }
  };

  const setSingleFavoriteCategorie = (
    category: BuildingFavoritesTypes,
    listToSet: string[]
  ) => {
    categoryMap[category](listToSet);
  };

  const setAllFavoriteCategories = (data: FavoritesModel) => {
    const deconstructed = {
      [BuildingFavoritesTypes.ArmyBuildings]:
        data.favoriteBuildings.armyBuildings,
      [BuildingFavoritesTypes.DefensiveBuildings]:
        data.favoriteBuildings.defensiveBuildings,
      [BuildingFavoritesTypes.ResourceBuildings]:
        data.favoriteBuildings.resourceBuildings,
      [BuildingFavoritesTypes.TrapBuildings]:
        data.favoriteBuildings.trapBuildings,
      [BuildingFavoritesTypes.TownHalls]: data.favoriteTownHalls,
    };

    for (const [category, buildingList] of Object.entries(deconstructed)) {
      setSingleFavoriteCategorie(
        category as BuildingFavoritesTypes,
        buildingList
      );
    }
  };

  const checkIfFavorite = (category: string, id: string): boolean => {
    if (!isValidCategory(category)) {
      console.log(category + " is not a valid category");
      firstMove = true;
      return false;
    }

    return favoritesArray[category]?.includes(id) ?? false;
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    token,
    loginFunction,
    logout,
    isAdmin,
    getSingleUser,
    checkIfFavorite,
    favArmyBuildings,
    favDefensiveBuildings,
    favTrapBuildings,
    favResourceBuildings,
    favTownHalls,
    setSingleFavorite,
    isLoadingFavorites,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
