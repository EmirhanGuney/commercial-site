import Accordion from "react-bootstrap/Accordion";

function UserCard({ userAddresses }) {
  return (
    <div>
      {userAddresses.map((address, index) => (
        <Accordion key={address.id} defaultActiveKey={null}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {address.title} - {address.fullName}
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <strong>Ad Soyad:</strong> {address.fullName}
              </p>
              <p>
                <strong>Telefon:</strong> {address.phoneNumber}
              </p>
              <p>
                <strong>Ülke:</strong> {address.country}
              </p>
              <p>
                <strong>Şehir:</strong> {address.city}
              </p>
              <p>
                <strong>İlçe:</strong> {address.district}
              </p>
              <p>
                <strong>Adres:</strong> {address.addressDetail}
              </p>
              <p>
                <strong>Posta Kodu:</strong> {address.postalCode}
              </p>
              <p>
                <strong>Fatura Tipi:</strong>{" "}
                {address.billType === "individual" ? "Bireysel" : "Kurumsal"}
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}

export default UserCard;
