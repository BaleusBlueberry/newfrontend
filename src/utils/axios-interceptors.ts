import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL + "api";

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const onSuccess = (response) => {
  console.debug("request succfull", response);
  return response;
};

const onError = (error) => {
  console.error("request error", error);
  return Promise.reject(error);
};

export const request = async (options: AxiosRequestConfig) => {
  try {
    const result = await client.request(options);
    return onSuccess(result);
  } catch (error) {
    return onError(error);
  }
};

export default request;
