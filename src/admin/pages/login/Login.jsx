import React from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../core/api/requests/authApi.js";
import { useState } from "react";
import "./Login.css";
function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await adminLogin(username, password);
    if (result) {
      navigate("/admin");
    }
  };

  return (
    <div className="login-main">
      <div className="content-login">
        <form className="form">
          <p className="form-title">Admin Girişi</p>
          <div className="input-container">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Kullanıcı Adı"
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Şifre"
            />
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="submit"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
