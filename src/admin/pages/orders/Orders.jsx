import React, { use, useEffect, useState } from "react";
import "./Orders.css";
import OrderCard from "../../components/cards/order-card/OrderCard";
import { getOrders } from "../../../core/api/requests/orderApi";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 18;
  const [reFetch, setReFetch] = useState(true);
  const getOrdersHandler = async () => {
    const result = await getOrders({
      page: selectedPage,
      limit,
    });
    setOrders(result.data);
  };

  useEffect(() => {
    if (reFetch) {
      console.log("if calisti");
      getOrdersHandler();
      setReFetch(false);
    }
  }, [reFetch]);

  return (
    <div className="orders-main">
      <header className="orders-header">Sipariş Takibi</header>
      <div className="content-orders">
        <div className="content-row-1">
          <span className="order-span">Sipariş</span>
          <span className="payment-span">Ödeme</span>
          <span className="status-span">Sipariş Durumu</span>
          <span></span>
        </div>
        <div className="content-row-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} setReFetch={setReFetch} />
          ))}
        </div>
      </div>
      <div className="admin-navigate-area">
        <button>GERİ</button>
        <span>1 / 10</span>
        <button>İLERİ</button>
      </div>
    </div>
  );
}

export default Orders;
