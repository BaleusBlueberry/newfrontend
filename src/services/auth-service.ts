import axios from "axios";
import request from "../utils/axios-interceptors";
import { UserDataForUpdateModel } from "../Types/userDataModels/UserDataForUpdateModel";

const baseUrl = import.meta.env.VITE_BASE_URL + "/API";

const registerr = (
  email: string,
  username: string,
  password: string,
  PasswordConfirm: string
) =>
  axios.post(`${baseUrl}/auth/register`, {
    email,
    username,
    password,
    PasswordConfirm,
  });

const loginnn = (email: string, password: string) => {
  return request({
    method: "POST",
    url: `/Auth/login`,
    data: { email, password },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const EditProfile = (editProfile: UserDataForUpdateModel) => {
  return request({
    method: "PUT",
    url: `/Auth/Update`,
    data: { ...editProfile },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const GetUser = (userId: string) => {
  return request({
    method: "GET",
    url: `/Auth/getUser/${userId}`,
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
  edit: EditProfile,
  GetUser,
};

export default auth;
