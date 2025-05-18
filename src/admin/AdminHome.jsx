import React from "react";
import "./AdminHome.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function AdminHome() {
  return (
    <div className="admin-main">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-render-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
