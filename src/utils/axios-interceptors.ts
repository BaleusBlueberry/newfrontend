import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL + "/API";

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the latest token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Dynamically set the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

const onSuccess = (response) => {
  console.debug("request succfull", response);
  return Promise.resolve(response);
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
