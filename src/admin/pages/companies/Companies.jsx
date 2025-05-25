import React, { useEffect, useState } from "react";
import "./Companies.css";
import UserCard from "../../components/cards/user-card/UserCard";
import { getAllUsers } from "../../../core/api/requests/userApi";
function Companies() {
  const [companies, setCompanies] = useState([]);

  const getCompaniesHandler = async () => {
    const result = await getAllUsers({
      role: "company",
    });
    setCompanies(result.data);
  };

  useEffect(() => {
    getCompaniesHandler();
  }, []);

  return (
    <div className="companies-main">
      <span className="companies-header">Bayi Bilgileri</span>
      <div className="content-companies">
        {companies.map((company) => (
          <UserCard key={company.id} from="company" user={company} />
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

export default Companies;
