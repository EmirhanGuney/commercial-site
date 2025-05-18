import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../../components/header/Header";
import UserCard from "../../components/card/usercard/UserCard.jsx";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loaders/Loader.jsx";
import { getUserAddresses } from "../../core/api/requests/userApi.js";
function Home() {
  const [loading, setLoading] = useState(true);
  const [userAddresses, setUserAddresses] = useState([]);
  const getUserAddress = async () => {
    try {
      const response = await getUserAddresses();

      setUserAddresses(response);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserAddress();
  }, []);

  return (
    <div className="profile-main">
      <Header />

      <div className="profile-content">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <div className="profile-address-area">
            <div className="address-area">
              <UserCard userAddresses={userAddresses} />
            </div>
            <div className="address-area">adadada</div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default Home;
