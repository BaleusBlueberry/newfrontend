import { COCTownhallDataType } from "../Types/TownHalls/COCTownhallDataType";
import request from "../utils/axios-interceptors";

export type COCDataInterface =
  | "ArmyBuildings"
  | "DefensiveBuildings"
  | "TrapBuildings"
  | "heroes"
  | "ResourceBuildings";

export const getCOCData = (name: COCDataInterface) => {
  return request({
    method: "GET",
    url: `/${name}`,
  });
};

export const getTownHalls = () => {
  return request({
    method: "GET",
    url: "/TownHall",
  });
};

export const UpdateTownHall = (townhall: COCTownhallDataType) => {
  return request({
    method: "PUT",
    url: `/TownHall/Edit/${townhall.id}`,
    data: townhall,
  });
};

export const deleteTownHall = (id: string) => {
  return request({
    method: "DELETE",
    url: `/TownHall/Delete/${id}`,
  });
};

export const getSingleTownHall = (id: string) => {
  return request({
    method: "GET",
    url: `/TownHall/${id}`,
  });
};

export const createSingleTownHall = (data: COCTownhallDataType) => {
  return request({
    method: "POST",
    url: `/TownHall/Create`,
    data: data,
  });
};
