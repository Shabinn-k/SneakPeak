// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Layout from "../Components/Layout.jsx"
// import { api } from "../../api/Axios.jsx";
// import "./UserDetail.css";

// const UserDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch user
//   const getUser = async () => {
//     try {
//       const res = await api.get(`/users/${id}`);
//       setUser(res.data);
//     } catch {
//       console.log("Error fetching user");
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   // Block / Unblock user
//   const toggleBlockUser = async () => {
//     if (!user) return;

//     const newStatus = user.status === "blocked" ? "active" : "blocked";

//     if (
//       !window.confirm(
//         `Are you sure you want to ${newStatus === "blocked" ? "block" : "unblock"} this user?`
//       )
//     )
//       return;

//     try {
//       setLoading(true);

//       await api.patch(`/users/${id}`, {
//         status: newStatus,
//       });

//       setUser({ ...user, status: newStatus });
//     } catch {
//       alert("Failed to update user status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user)
//     return (
//       <Layout>
//         <p>Loading...</p>
//       </Layout>
//     );

//   return (
//     <Layout>
//       <div className="user-detail">
//         <h2>User Details</h2>

//         <div className="user-card">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Role:</strong> {user.role || "User"}</p>

//           <p>
//             <strong>Status:</strong>{" "}
//             <span className={user.status === "blocked" ? "blocked" : "active"}>
//               {user.status}
//             </span>
//           </p>

//           <button
//             className={user.status === "blocked" ? "unblock-btn" : "block-btn"}
//             onClick={toggleBlockUser}
//             disabled={loading}
//           >
//             {loading
//               ? "Processing..."
//               : user.status === "blocked"
//               ? "Unblock User"
//               : "Block User"}
//           </button>
//         </div>

//         <button className="back-btn" onClick={() => navigate("/admin/users")}>
//           Back to Users
//         </button>
//       </div>
//     </Layout>
//   );
// };

// export default UserDetail;
