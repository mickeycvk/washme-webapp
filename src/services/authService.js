import axios from "axios";

const API_URL = "https://washme-server-nodejs.herokuapp.com/api/auth/";

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, password, roles, branch) => {
  return axios
    .post(API_URL + "signup", {
      username,
      password,
      roles,
      branch,
    })
    .then((response) => {
      return response.data;
    });
};

const updateUser = (id, username,branch) => {
  return axios.put(API_URL + `${id}`, {username,branch}).then((res) => {
    return res.data;
  });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + `${id}`)
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
  getCurrentUser,
};

export default AuthService;
