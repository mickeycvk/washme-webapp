import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://washme-server-nodejs.herokuapp.com/api/wash/";

const getUserBoard = (branch) => {
  return axios.get(API_URL + `${branch}`, { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getUserBoard,
  getAdminBoard,
};
export default UserService;
