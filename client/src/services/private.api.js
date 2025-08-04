import axios from "../lib/axios";

const privateAPI = {
  getAllUsers: () => axios.get("/users"),
  getSingleUser: (id) => axios.get(`/users/${id}`),
};

export default privateAPI;
