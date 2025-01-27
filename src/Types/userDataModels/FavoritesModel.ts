import { FavoritesBuildingsModel } from "./FavoritesBuildingsModel";

export interface FavoritesModel {
  favoriteTownHalls: string[];
  favoriteBuildings: FavoritesBuildingsModel;
}

export interface FavoritesToServerModel {
  FavoriteTownHalls: string[];
  FavoriteBuildings: FavoritesBuildingsModel;
  UserId: string;
}
