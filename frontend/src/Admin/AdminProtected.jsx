import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;
