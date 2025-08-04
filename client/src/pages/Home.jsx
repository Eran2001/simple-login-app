import React, { useEffect, useState } from "react";

import Notification from "../components/ui/Notification";
import Modal from "../components/ui/Modal";
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
            <th className="text-left px-6 py-3 text-sm font-semibold max-sm:px-1 max-sm:py-2">
              Action
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
              <td className="px-6 py-4 max-sm:px-1 max-sm:py-2">&</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={!!user}
        onClose={closeModal}
        title="Selected User"
        footer={
          <>
            <button
              onClick={closeModal}
              className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Close
            </button>
            <button
              onClick={() => {
                Notification.success("Save changes clicked!");
              }}
              className="py-2 px-3 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save changes
            </button>
          </>
        }
      >
        {user && (
          <>
            <p>
              <strong>ID:</strong> {user.ID}
            </p>
            <p>
              <strong>Name:</strong> {user.Name}
            </p>
            <p>
              <strong>Email:</strong> {user.Email}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default Home;
