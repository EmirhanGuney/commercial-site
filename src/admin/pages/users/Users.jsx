import React, { useEffect, useState } from "react";
import UserCard from "../../components/cards/user-card/UserCard";
import "./Users.css";
import { getAllUsers } from "../../../core/api/requests/userApi";
function Users() {
  const [customers, setCustomers] = useState([]);
  
    const getCustomersHandler = async () => { 
      const result = await getAllUsers({
        role: "customer",
      });
      setCustomers(result.data);
    }
  
    useEffect(() => {
      getCustomersHandler();
    }
    , []);


  return (
    <div className="users-main">
      <span className="users-header">Kullanıcı Bilgileri</span>
      <div className="content-users">
        {customers.map((customer) => (
          <UserCard from="users" user={customer} />
        ))}
      </div>
      <div className="admin-navigate-area">
        <button>GERİ</button>
        <span>1 / 10</span>
        <button>İLERİ</button>
      </div>
    </div>
  );
}

export default Users;
