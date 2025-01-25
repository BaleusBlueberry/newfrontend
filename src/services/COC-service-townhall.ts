import { COCTownhallDataType } from "../Types/TownHalls/COCTownhallDataType";
import request from "../utils/axios-interceptors";

const getTownHalls = () => {
  return request({
    method: "GET",
    url: "/TownHall",
  });
};

const UpdateTownHall = (townhall: COCTownhallDataType) => {
  return request({
    method: "PUT",
    url: `/TownHall/Edit/${townhall.id}`,
    data: townhall,
  });
};

const deleteTownHall = (id: string) => {
  return request({
    method: "DELETE",
    url: `/TownHall/Delete/${id}`,
  });
};

const getSingleTownHall = (level: number) => {
  return request({
    method: "GET",
    url: `/TownHall/level/${level}`,
  });
};

const createSingleTownHall = (data: COCTownhallDataType) => {
  return request({
    method: "POST",
    url: `/TownHall/Create`,
    data: data,
  });
};

const apiTownHall = {
  getAll: getTownHalls,
  update: UpdateTownHall,
  delete: deleteTownHall,
  getSingle: getSingleTownHall,
  create: createSingleTownHall,
};

export default apiTownHall;
