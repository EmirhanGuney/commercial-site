import React, { useEffect, useState } from "react";
import "./OrderCard.css";
import urun from "../../../../assets/placeholder.png";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import { updateOrderStatus } from "../../../../core/api/requests/orderApi";
import { getOrderStatus } from "../../../../core/api/requests/lookUpApi";

const MAX_CHAR_LENGTH = 30;

function renderOrderSummary(order) {
  const titles = [];
  let totalLength = 0;
  let hiddenCount = 0;

  for (let i = 0; i < order.products.length; i++) {
    const title = order.products[i].productTitle;
    const nextLength = totalLength + title.length + (titles.length > 0 ? 3 : 0); // 3: " | "

    if (nextLength <= MAX_CHAR_LENGTH) {
      titles.push(title);
      totalLength = nextLength;
    } else {
      hiddenCount = order.products.length - i;
      break;
    }
  }

  let displayText = titles.join(" , ");
  if (hiddenCount > 0) {
    displayText += ` & ${hiddenCount} ürün daha...`;
  }

  return displayText;
}

function OrderCard({ order, setReFetch }) {
  const paymentStatus = true;
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");

  const getOrderStatusesHandler = async () => {
    const orderStatus = await getOrderStatus();
    setOrderStatuses(orderStatus);
  };

  const updateOrderStatusHandler = async (status, rejectionReason) => {
    await updateOrderStatus(order.id, status, rejectionReason);
    setReFetch(true);
  };

  useEffect(() => {
    getOrderStatusesHandler();
  }, []);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="content-item">
            <img
              src={
                order.products[0].productPhoto
                  ? `https://nanocamkesmemakinesi.com/api/file/${order.products[0].productPhoto}`
                  : urun
              }
              alt="Order Item"
              className="order-image"
            />
            <div className="products-information">
              <span className="product-names">{renderOrderSummary(order)}</span>
            </div>
            <div className="payment-information">
              <span className="payment-price">{order.totalAmount} ₺</span>
              <span className="payment-status">
                {paymentStatus ? "---" : "---"}
              </span>
              <div
                style={{
                  backgroundColor: paymentStatus ? "green" : "green",
                  width: "90%",
                  height: "4px",
                  borderRadius: "2px",
                }}
              ></div>
            </div>
            <div className="status-information">
              <div
                className={`order-status-div ${
                  order.status === "onaylandı" ||
                  order.status === "teslim edildi" ||
                  order.status === "mağazadan alınacak"
                    ? "green"
                    : order.status === "hazırlanıyor" ||
                      order.status === "kargoya verildi"
                    ? "orange"
                    : order.status === "onaylanmadı" ||
                      order.status === "iptal edildi"
                    ? "red"
                    : ""
                }`}
              >
                {order.status}
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="accordion-body">
            <div className="accordion-body-row-1">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "10px",
                    padding: "10px",
                    backgroundColor: " #7ec880",
                  }}
                >
                  Durum Güncelle
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    fontSize: "10px",
                    width: " auto",
                    minWidth: "400px",
                  }}
                >
                  {orderStatuses.map((status) => (
                    <Dropdown.Item
                      key={status}
                      onClick={(e) => {
                        if (status !== "iptal edildi") {
                          e.stopPropagation();
                          updateOrderStatusHandler(status);
                        } else {
                          e.stopPropagation();
                        }
                      }}
                    >
                      {status === "iptal edildi" ? (
                        <Accordion>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header className="admin-accordion-header">
                              İptal Edildi
                            </Accordion.Header>
                            <Accordion.Body className="admin-accordion-body">
                              <textarea
                                name=""
                                id=""
                                onKeyDown={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  setRejectionReason(e.target.value);
                                }}
                                value={rejectionReason}
                                placeholder="İptal sebebini buraya yazın..."
                              ></textarea>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatusHandler(
                                    status,
                                    rejectionReason
                                  );
                                }}
                                className="send-button-cancel"
                              >
                                Gönder
                              </button>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      ) : (
                        status
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="accordion-body-row-2">
              <div className="address-body">
                <span>Teslimat Adresi:</span>
                <span>
                  Adres Başlığı: {order.address.title} <br />
                  <br />
                  Adres: {order.address.country} | {order.address.city} |{" "}
                  {order.address.district} | {order.address.postalCode} <br />
                  <br /> {order.address.addressDetail}
                </span>
              </div>
              <div className="products-body">
                {order.products.map((product) => (
                  <div key={product.id} className="accordion-content-item">
                    <img
                      src={
                        product.productPhoto
                          ? `https://nanocamkesmemakinesi.com/api/file/${product.productPhoto}`
                          : urun
                      }
                      alt=""
                    />
                    <div className="accordion-products-information">
                      <span className="accordion-product-names">
                        {product.productTitle}
                      </span>
                    </div>
                    <div className="accordion-payment-information">
                      <span className="accordion-payment-price">
                        Adet Fiyatı: {product.price} ₺
                      </span>
                      <span className="accordion-payment-count">
                        Adet: <br /> {product.quantity}
                      </span>
                      <span className="accordion-payment-count">
                        Toplam Fiyat: {product.price * product.quantity} ₺
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default OrderCard;
