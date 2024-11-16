import axios from "axios";

const baseUrl = "https://localhost:7128/api/auth";

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

// after successful login, the server will return a token
// and we will store it in the local storage
const loginn = (email: string, password: string) =>
  axios.post(`${baseUrl}/login`, { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  });

const auth = {
  register: registerr,
  login: loginn,
};

export default auth;
