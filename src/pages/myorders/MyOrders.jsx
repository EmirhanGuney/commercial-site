import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MyOrders.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import img1 from "../../assets/urun.png";
import img2 from "../../assets/urun.png";
import img3 from "../../assets/urun.png";
import { IoIosArrowForward } from "react-icons/io";
import urun from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { getUserOrder, getUserOrders } from "../../core/api/requests/orderApi";

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

  let displayText = titles.join(" | ");
  if (hiddenCount > 0) {
    displayText += ` & ${hiddenCount} ürün daha...`;
  }

  return displayText;
}

function dateFormatter(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long", // kısa istiyorsan 'short' yapabilirsin
    year: "numeric",
  });
  return formattedDate;
}

function getDatePlusDays(dateStr, daysToAdd = 5) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + daysToAdd);
  return dateFormatter(date);
}

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  const navigateTo = (where) => {
    navigate(where);
  }

  const getUserOrdersHandler = async () => {
    const result = await getUserOrders();
    setOrders(result.orders);
  };

  const getUserOrderHandler = async (orderId) => {
    const result = await getUserOrder(orderId);
    setSelectedOrder(result);
  };

  useEffect(() => {
    getUserOrdersHandler();
  }, []);

  const toggleSelectedOrder = (orderId) => {
    if (selectedOrder?._id === orderId) {
      setSelectedOrder(null);
    } else {
      getUserOrderHandler(orderId);
    }
    console.log(selectedOrder);
  };

  return (
    <div className="main-myorders">
      <Header />
      <span className="my-orders-header">Ev {">"} Siparişlerim</span>
      <div className="myorders-content">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-status">
              <span
                className={
                  order.status === "teslim edildi" ? "delivered" : "in-progress"
                }
              >
                {order.status}
              </span>
              <span className="order-date">
                {dateFormatter(order.orderDate)}
              </span>
            </div>
            <div className="order-details">
              <img
                src={
                  order.orderPhoto
                    ? `https://nanocamkesmemakinesi.com/api/file/${order.orderPhoto}`
                    : urun
                }
                alt="Order Item"
                className="order-image"
              />
              <div className="order-info">
                <div className="order-info-first">
                  <p className="order-id">Şipariş ID: {order._id}</p>
                  <p className="order-items">{renderOrderSummary(order)}</p>
                </div>
                <p className="order-price">{order.totalAmount} ₺</p>
              </div>
              <div className="expand-order">
                <button onClick={() => toggleSelectedOrder(order._id)}>
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {selectedOrder?._id === order._id && (
                <motion.div
                  className="order-extra-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "300px", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="address-details">
                    <motion.div
                      className="address-details-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    >
                      <span className="address-details-row-header">
                        Teslimat Detayları:
                      </span>
                      <span className="address-details-row-content">
                        Sipariş Tarihi: {dateFormatter(selectedOrder.orderDate)}{" "}
                        <br />
                        <br />
                        Sipariş Durumu: {selectedOrder.status} <br />
                        <br />
                        Tahmini Teslimat Tarihi:{" "}
                        {getDatePlusDays(selectedOrder.orderDate)}
                      </span>
                    </motion.div>

                    {/* Teslimat Adresi */}
                    <motion.div
                      className="address-details-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    >
                      <span className="address-details-row-header">
                        Teslimat Adresi:
                      </span>
                      <span className="address-details-row-content">
                        Adres Başlığı: {selectedOrder.address.title} <br />
                        <br />
                        Adres: {selectedOrder.address.country} |{" "}
                        {selectedOrder.address.city} <br />
                        <br /> {selectedOrder.address.district} |{" "}
                        {selectedOrder.address.postalCode} <br />
                        <br /> {selectedOrder.address.addressDetail}
                      </span>
                    </motion.div>

                    {/* İletişim Bilgileri */}
                    <motion.div
                      className="address-details-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.6,
                      }}
                    >
                      <span className="address-details-row-header">
                        Ürünler:
                      </span>
                      <div className="orders-scrollable-product-list">
                        {selectedOrder?.products?.map((product, index) => {
                          const photoUrl = product?.productPhoto
                            ? `https://nanocamkesmemakinesi.com/api/file/${product.productPhoto}`
                            : urun;
                          const totalPrice = product.quantity * product.price;

                          return (
                            <div
                              key={product.productId || index}
                              className="product-line"
                              onClick={() =>
                                navigate(
                                  `/productinformation/${product.productId}`
                                )
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <img
                                src={photoUrl}
                                alt={product.productTitle}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                              />
                              <span>
                                {product.productTitle} | {product.quantity}{" "}
                                adet| {totalPrice}₺
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;
