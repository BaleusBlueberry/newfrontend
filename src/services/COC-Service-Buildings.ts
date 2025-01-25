import { BuildingTypes } from "../Types/enums/BuildingTypes";

import request from "../utils/axios-interceptors";
import { BuildingData } from "./@types";

const getAllCategories = () => {
  return request({
    method: "GET",
    url: `/Buildings/all`,
  });
};

const getCategory = (category: BuildingTypes) => {
  return request({
    method: "GET",
    url: `/Buildings/${category}`,
  });
};

const updateBuilding = (category: BuildingTypes, data: BuildingData) => {
  return request({
    method: "PUT",
    url: `/Buildings/${category}/Edit/${data.id}`,
    data: data,
  });
};

const deleteBuilding = (category: BuildingTypes, id: string) => {
  return request({
    method: "DELETE",
    url: `/Buildings/${category}/Delete/${id}`,
  });
};

const getSingleBuilding = (category: BuildingTypes, id: string) => {
  return request({
    method: "GET",
    url: `/Buildings/${category}/${id}`,
  });
};

const createSingleBuilding = (category: BuildingTypes, data: BuildingData) => {
  return request({
    method: "POST",
    url: `/Buildings/${category}`,
    data: data,
  });
};

const apiBuildings = {
  getAllCategories: getAllCategories,
  getAll: getCategory,
  update: updateBuilding,
  delete: deleteBuilding,
  getSingle: getSingleBuilding,
  create: createSingleBuilding,
};

export default apiBuildings;
