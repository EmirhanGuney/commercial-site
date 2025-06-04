import React from "react";
import "./Home.css";
import AdminSlider from "../../components/slider/AdminSlider";

function Home() {
  const [photo, setPhoto] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  return (
    <div className="homeadmin-main">
      <div className="content-homeadmin">
        <p style={{ color: "#f5f5f5" }}>Ana Sayfa'da gösterilen canlı slider</p>

        <div className="admin-slider-area">
          <AdminSlider />
        </div>

        <div className="homeadmin-inner">
          <input className="add-new-slider-input" type="file" />
          <button className="add-new-photo-btn">Yeni Fotoğraf Ekle</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
