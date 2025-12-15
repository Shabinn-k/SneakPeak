import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./UserDetail.css";

const UserDetail = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  //  Fetch users
  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Block / Unblock user
  const toggleBlock = (user) => {
    const acc =
      user.acc=== "blocked" ? "active" : "blocked";

    if (!window.confirm("Are you sure?")) return;

    api.patch(`/users/${user.id}`, { acc});

    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, acc};
      }
      return u;
    });

    setUsers(updatedUsers);
  };

  // Simple filtering
  const displayUsers = users.filter((user) => {
    if (showBlocked && user.acc !== "blocked") return false;
    if (
      search &&
      !user.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <Layout>
      <div className="users-page">

        {/* COUNTS */}
        <h3>Total Users: {users.length}</h3>
        <h3>
          Blocked Users:{" "}
          {users.filter((u) => u.acc === "blocked").length}
        </h3>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setShowBlocked(!showBlocked)}>
          {showBlocked ? "Show All" : "Show Blocked"}
        </button>

        {/* TABLE */}
        <table className="users-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>acc</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {displayUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="avatar">
                    {user.name[0].toUpperCase()}
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.acc || "active"}</td>
                <td>
                  <button onClick={() => toggleBlock(user)}>
                    {user.acc === "blocked"
                      ? "Unblock"
                      : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </Layout>
  );
};

export default UserDetail;
