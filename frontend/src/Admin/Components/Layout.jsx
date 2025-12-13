import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../../Authentication/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <ul className="admin-menu">
          <li>
            <Link className="link-items1" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>

          {/* FIXED */}
          <li>
            <Link className="link-items1" to="/admin/products/">
              Products
            </Link>
          </li>
 
          {/* <li>
            <Link className="link-items1" to="/admin/users/:id">
              Users
            </Link>
          </li> */}

          <li>
            <Link className="link-items1" to="/admin/orders">
              Orders
            </Link>
          </li>

          <li>
            <Link className="link-items1" to="/admin/feedback">
              Feedback
            </Link>
          </li>
        </ul>

        <div className="logout-wrapper">
          <Link className="logout" to="/" onClick={logout}>
            <FiLogOut /> Logout
          </Link>
        </div>
      </aside>

      <main className="admin-content">
        <div className="admin-page">{children}</div>
      </main>

    </div>
  );
};

export default Layout;
