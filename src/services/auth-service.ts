import axios from "axios";
import request from "../utils/axios-interceptors";

const baseUrl = import.meta.env.VITE_BASE_URL + "api";
const registerr = (
  email: string,
  username: string,
  password: string,
  PasswordConfirm: string
) =>
  axios.post(`${baseUrl}/register`, {
    email,
    username,
    password,
    PasswordConfirm,
  });

const loginnn = (email: string, password: string) => {
  return request({
    method: "POST",
    url: `/auth/login`,
    data: { email, password },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const auth = {
  register: registerr,
  login: loginnn,
};

export default auth;
