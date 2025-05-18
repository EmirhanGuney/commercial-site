import React from "react";
import "./Navbar.css";

import Dropdown from "react-bootstrap/Dropdown";

import { useNavigate } from "react-router-dom";
function Navbar({ searchTermSetter }) {
  const navigate = useNavigate();
  return (
    <div className="main-navbar">
      <div className="navbar-content">
        <div className="search-group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>

          <input
            id="query"
            className="input"
            type="search"
            placeholder="Arama..."
            name="searchbar"
            onChange={(e) => searchTermSetter(e.target.value)}
          />
        </div>
        <div className="filter-area">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="sirala-dropdown"
            >
              Sırala
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="filtrele-dropdown"
            >
              Filtrele
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button
          onClick={() => {
            navigate("/admin/add-product");
          }}
          className="add-product-button"
        >
          Ürün Ekle
        </button>
      </div>
    </div>
  );
}

export default Navbar;
