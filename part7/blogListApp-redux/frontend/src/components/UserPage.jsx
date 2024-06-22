import { useEffect, useState } from "react";
import usersServices from "../services/users";
import { Link, useMatch } from "react-router-dom";

const UserPage = ({ users }) => {
  return (
    <div className="bg-black text-white min-h-screen py-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        Users:
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto" style={{ minWidth: "400px" }}>
          <thead>
            <tr className="bg-black">
              <th className="border-2 border-white py-2 px-4">User</th>
              <th className="border-2 border-white py-2 px-4">Blog Count</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-gray-800">
                <td className="border-2 border-white py-2 px-4 text-center">
                  <Link to={`/users/${user.id}`} className="text-yellow-400">
                    {user.username}
                  </Link>
                </td>
                <td className="border-2 border-white py-2 px-4 text-center">
                  {user.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
