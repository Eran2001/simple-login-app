import axios from "../lib/axios";

const privateAPI = {
  getAllUsers: () => axios.get("/users"),
};

export default privateAPI;
