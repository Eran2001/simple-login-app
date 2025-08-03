import axios from "../lib/axios";

const privateAPI = {
  getAllUsers: () => axios.get("/users"),
  // getUserById: (id) => axios.get(`/users/${id}`),
  // createUser: (data) => axios.post("/users", data),
  // updateUser: (id, data) => axios.put(`/users/${id}`, data),
  // deleteUser: (id) => axios.delete(`/users/${id}`),
};

export default privateAPI;
