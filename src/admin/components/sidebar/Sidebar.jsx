import React from "react";
import "./Sidebar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsHandbag, BsBuildingCheck } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { SlUser } from "react-icons/sl";
import { IoIosLogOut } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { BiGrid } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/admin-login");
  };
  const sidebarItems = [
    { key: "", icon: <IoHomeOutline />, label: "Anasayfa" },
    { key: "products", icon: <BsHandbag />, label: "Ürünler" },
    { key: "bulk-operations", icon: <BiGrid />, label: "Toplu İşlemler" },
    { key: "companies", icon: <BsBuildingCheck />, label: "Bayiler" },
    { key: "users", icon: <SlUser />, label: "Kullanıcılar" },
    { key: "orders", icon: <AiOutlineShoppingCart />, label: "Siparişler" },
    { key: "categories", icon: <TbCategory />, label: "Kategoriler" },

    {
      key: "logout",
      icon: <IoIosLogOut />,
      label: "Çıkış Yap",
      action: () => handleLogout(),
    },
  ];
  return (
    <div className="main-sidebar">
      <div
        onClick={() => {
          navigate("/admin");
        }}
        className="sidebar-header"
      >
        <span className="header-text">
          Rova GSM <br />
          Admin Paneli
        </span>
      </div>
      <div className="sidebar-content">
        {sidebarItems.map(({ key, icon, label, action }) => (
          <button
            key={key}
            className="sidebar-button"
            onClick={() => (action ? action() : navigate(`/admin/${key}`))}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
};

export default Sidebar;
