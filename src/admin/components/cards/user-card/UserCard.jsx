import React from "react";
import "./UserCard.css";
import Accordion from "react-bootstrap/Accordion";
import { verifyCompany } from "../../../../core/api/requests/userApi";
function UserCard({ from, user }) {
  const verifyCompnayHandler = async () => {
    await verifyCompany(user.email);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="user-content-item">Kullanıcı Adı: {user.email}</div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="user-accordion-body">
            {from === "users" ? (
              ""
            ) : (
              <div className="user-accordion-body-row-1">
                {!user.isVerified ? (
                  <button
                    style={{
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "10px",
                      padding: "10px",
                      backgroundColor: " #7ec880",
                    }}
                    onClick={verifyCompnayHandler}
                  >
                    Onayla
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="user-accordion-body-row-2">
              <div className="user-address-body">
                {from === "users" ? (
                  ""
                ) : (
                  <span>
                    <b>Durum:</b> <br />
                    {user.isVerified ? "Onaylı" : "Onay bekliyor"}
                  </span>
                )}
                <span>
                  {" "}
                  <b>Adresler:</b>
                </span>

                <div
                  style={{
                    maxWidth: "100%",
                    overflowX: "auto",
                    paddingBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      gap: "12px",
                    }}
                  >
                    {user.addresses.map((address, index) => (
                      <div
                        key={index}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "12px",
                          minWidth: "250px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <div>Adres Başlığı: {address.title}</div>
                        <div>
                          Adres: {address.country} | {address.city} |{" "}
                          {address.district} | {address.postalCode}
                        </div>
                        <div>Adres Detayı: {address.addressDetail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <span>
                  {" "}
                  <b>Bilgiler:</b>
                </span>
                <span>Telefon Numarası: {user.role ===  "company" ? user.companyDetails.phoneNumber : user.customerDetails.phoneNumber}</span>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default UserCard;
