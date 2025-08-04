import React, { useEffect, useState } from "react";

import Notification from "../components/ui/Notification";
import API from "../services";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchAllUsers();
    // fetchSingleUser();
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

  const fetchSingleUser = async (id) => {
    try {
      const response = await API.privateApi.getSingleUser(id);
      if (response.data.code === "OK") {
        setUser(response.data.data);
      } else {
        Notification.error("Error fetching user!");
      }
    } catch (error) {
      Notification.error("Error fetching user", error);
    }
  };

  const closeModal = () => setUser(null);

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
              <td
                className="px-6 py-4 max-sm:px-1 max-sm:py-2"
                onClick={() => fetchSingleUser(user.ID)}
              >
                {user.Name}
              </td>
              <td className="px-6 py-4 max-sm:px-1 max-sm:py-2">
                {user.Email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {user && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Selected User
            </h2>
            <p>
              <strong>ID:</strong> {user.ID}
            </p>
            <p>
              <strong>Name:</strong> {user.Name}
            </p>
            <p>
              <strong>Email:</strong> {user.Email}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
