import React, { useEffect, useState } from "react";
import API from "../services";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await API.privateApi.getAllUsers();
      if (response.data.code === "OK") {
        setUsers(response.data.data);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      {users.map((user) => (
        <div key={user.ID}>
          <h2>{user.Name}</h2>
          <p>{user.Email}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
