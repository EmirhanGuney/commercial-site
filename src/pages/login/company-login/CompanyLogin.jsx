import React, { useState } from "react";
import "./CompanyLogin.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, registerCompany } from "../../../core/api/requests/authApi";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const navigateTo = (navigationRoute) => {
    navigate(navigationRoute);
  };

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    companyType: "",
    taxNumber: "",
    phoneNumber: "",
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Input değişimlerini yönet
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form gönderimi için işlemler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Kayıt işlemi
        const result = await registerCompany(
          formData.email,
          formData.password,
          formData.companyName,
          formData.companyType,
          formData.taxNumber,
          formData.phoneNumber
        );
        if (result) {
          handleToggle();
        }

      } else {
        //login
        const result = await login(formData.email, formData.password);
        if (result) {
          navigateTo("/");
        }
      }
    } catch (error) {
      //TODO: log mekanizması eklenecek
      console.error("error", error);
    }
  };

  // Formlar arasında geçiş yap
  const handleToggle = () => {
    setFormData({
      companyName: "",
      email: "",
      password: "",
      companyType: "",
      taxNumber: "",
      phoneNumber: "",
    });
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="company-login-main">
      {isMobile ? null : <Header />}
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        {/* Üye Ol Formu */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Bayi Ol</h1>

            <input
              type="text"
              name="companyName"
              placeholder="Bayi Adı"
              value={formData.companyName}
              onChange={handleInputChange}
              required={isSignUp}
            />
            <input
              type="email"
              name="email"
              placeholder="E-Posta"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="taxNumber"
              placeholder="Vergi Numarası"
              value={formData.taxNumber}
              onChange={handleInputChange}
              required={isSignUp}
            />
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Telefon Numarası"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required={isSignUp}
            />
            <input
              type="text"
              name="companyType"
              placeholder="Bayi Türü"
              value={formData.companyType}
              onChange={handleInputChange}
              required={isSignUp}
            />
            <button type="submit">Bayi Ol</button>
            <div className="mobile-ref-container">
              <span>Zaten bayimiz misin?</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
              >
                Giriş Yap
              </button>
            </div>
          </form>
        </div>

        {/* Giriş Yap Formu */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Giriş Yap</h1>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <a href="#">Şifreni mi unuttun?</a>
            <button type="submit">Giriş Yap</button>
            <div className="mobile-ref-container">
              <span>Henüz bayimiz değil misin?</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
              >
                Bayi Ol
              </button>
            </div>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <p>Merhaba! nanocamkesmemakinesi.com'a Bayi girişi yapın!</p>
              <button onClick={handleToggle} className="hidden" id="login">
                Giriş Yap
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <p>
                Merhaba! nanocamkesmemakinesi.com'dan en iyi şekilde
                yararlanabilmek için Bayi olun!
              </p>
              <button onClick={handleToggle} className="hidden" id="register">
                Bayi Ol
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyLogin;
