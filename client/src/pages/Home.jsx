import React, { useEffect, useState } from "react";

import Notification from "../components/ui/Notification";
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
        Notification.error("Error fetching users!");
      }
    } catch (error) {
      Notification.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="text-center px-6 py-3 text-sm font-semibold">
              User ID
            </th>
            <th className="text-left px-6 py-3 text-sm font-semibold max-sm:px-1 max-sm:py-2">
              Name
            </th>
            <th className="text-left px-6 py-3 text-sm font-semibold max-sm:px-1 max-sm:py-2">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-red-100 divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.ID}>
              <td className="px-6 py-4 max-sm:px-1 max-sm:py-2 text-center">
                {user.ID}
              </td>
              <td className="px-6 py-4 max-sm:px-1 max-sm:py-2">{user.Name}</td>
              <td className="px-6 py-4 max-sm:px-1 max-sm:py-2">
                {user.Email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
