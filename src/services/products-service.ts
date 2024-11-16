import request from "../utils/axios-interceptors";

export const getProduts = () => {
  return request({
    method: "GET",
    url: "/products",
  });
};

export const getSingleProduct = (id: number) => {
  return request({
    method: "GET",
    url: `/products/${id}`,
  });
};
