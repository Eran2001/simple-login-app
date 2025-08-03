import React, { useEffect, useState } from "react";
import API from "../services";

const Home = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const response = await API.privateApi.getAllUsers();
    setUsers(response.data);
  };
  return (
    <>
      <div>
        <h1>{users}</h1>
      </div>
    </>
  );
};

export default Home;
