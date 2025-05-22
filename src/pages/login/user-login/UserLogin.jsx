import React, { useState } from "react";
import "./UserLogin.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, registerCustomer } from "../../../core/api/requests/authApi";


const UserLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

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

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login(loginData.email, loginData.password);
    if (response === true) {
      navigate("/");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await registerCustomer(
      signUpData.name,
      signUpData.phoneNumber,
      signUpData.email,
      signUpData.password
    );
    if (response === true) {
      handleToggle();
    }
  };

  return (
    <div className="company-login-main">
      {isMobile ? null : <Header />}
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Üye Ol</h1>

            <input
              type="text"
              name="name"
              placeholder="Ad Soyad"
              value={signUpData.name}
              onChange={(e) => {
                setSignUpData({ ...signUpData, name: e.target.value });
              }}
              required={isSignUp}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Telefon Numarası"
              value={signUpData.phoneNumber}
              onChange={(e) => {
                setSignUpData({ ...signUpData, phoneNumber: e.target.value });
              }}
              required={isSignUp}
            />
            <input
              type="email"
              name="email"
              placeholder="E-Posta"
              value={signUpData.email}
              onChange={(e) => {
                setSignUpData({ ...signUpData, email: e.target.value });
              }}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={signUpData.password}
              onChange={(e) => {
                setSignUpData({ ...signUpData, password: e.target.value });
              }}
              required
            />
            <button onClick={(e) => handleSignUp(e)}>Üye Ol</button>
            <div className="mobile-ref-container">
              <span>Zaten Üye misin?</span>
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

        <div className="form-container sign-in">
          <form>
            <h1>Giriş Yap</h1>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              required
            />
            <a href="#">Şifreni mi unuttun?</a>
            <button onClick={(e) => handleLogin(e)}>Giriş Yap</button>
            <div className="mobile-ref-container">
              <span>Henüz üye değil misin?</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
              >
                Üye Ol
              </button>
            </div>
          </form>
        </div>
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
                yararlanabilmek için Üye olun!
              </p>
              <button onClick={handleToggle} className="hidden" id="register">
                Üye Ol
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLogin;
