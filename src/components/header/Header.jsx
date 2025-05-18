import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo3.jpg";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { PiUserCircle } from "react-icons/pi";
import { getCategories } from "../../core/api/requests/categoryApi";
import CartDrop from "../dropdown/cart-dropdown/CartDrop";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import { AuthGuard } from "../../core/auth/AuthGuard";

function Header() {
  const navigate = useNavigate();
  const [isCartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const isAuthenticated = AuthGuard.isAuthenticated();
    setIsLoggedIn(isAuthenticated);
    const fetchCategories = async () => {
      const response = await getCategories();

      setCategories(response);
    };
    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/productlist?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/kullanıcı-girişi");
    toast.success(" Çıkış yapıldı.");
  };
  return (
    <div className="header-main">
      <img onClick={() => navigate("/")} src={logo} alt="" />
      <div className="header-content">
        <div className="header-search">
          <input
            type="text"
            className="search-input"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            <CiSearch />
          </button>
        </div>

        <div className="header-buttons">
          {categories.map((category) =>
            isMobile ? (
              <button
                key={category.id}
                className="header-mobile-button"
                onClick={() =>
                  navigate(`/productlist/?categoryId=${category.id}`)
                }
              >
                {category.name}
              </button>
            ) : (
              <Dropdown key={category.id}>
                <Dropdown.Toggle
                  variant="warning"
                  id="dropdown-basic"
                  className="header-button"
                >
                  {category.name}
                </Dropdown.Toggle>

                <Dropdown.Menu className="header-dropdown-menu">
                  <Dropdown.Item
                    onClick={() =>
                      navigate(`/productlist/?categoryId=${category.id}`)
                    }
                  >
                    Tüm Ürünler
                  </Dropdown.Item>
                  {category.subCategories.map((subcategory) => (
                    <Dropdown.Item
                      key={subcategory.id}
                      onClick={() =>
                        navigate(
                          `/productlist/?categoryId=${category.id}&subCategoryId=${subcategory.id}`
                        )
                      }
                    >
                      <span> {subcategory.name}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )
          )}
        </div>
      </div>

      <div className="header-user">
        <div className="cart-wrapper">
          <button
            onClick={() => {
              if (!isMobile) {
                setCartOpen(!isCartOpen);
              } else {
                navigate("/sepetim");
              }
            }}
          >
            <BsCart2 />
          </button>
        </div>
        <span className="mobile-text" onClick={() => navigate("/")}>
          Biemtek GSM
        </span>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="header-user-dropdown"
          >
            <PiUserCircle />
          </Dropdown.Toggle>

          <Dropdown.Menu className="header-user-dropdown-menu">
            {isLoggedIn ? (
              ""
            ) : (
              <>
                <Dropdown.Item href="/kullanıcı-girişi">
                  Kullanıcı Girişi
                </Dropdown.Item>
                <Dropdown.Item href="/bayi-girişi">Bayi Girişi</Dropdown.Item>
              </>
            )}
            <Dropdown.Item href="/siparişlerim">Siparişlerim</Dropdown.Item>
            <Dropdown.Item href="/productlist?isFavorite=true">
              Favorilerim
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLogout()}>
              Çıkış Yap
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {isCartOpen && (
        <CartDrop isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      )}
    </div>
  );
}

export default Header;
