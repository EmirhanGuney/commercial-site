import "./App.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductList from "./pages/productlist/ProductList";
import ProductInformation from "./pages/productinformation/ProductInformation";
import ScrollToTop from "./components/ScrollHelper";
import CompanyLogin from "./pages/login/company-login/CompanyLogin";
import UserLogin from "./pages/login/user-login/UserLogin";
import MyOrders from "./pages/myorders/MyOrders";
import Cart from "./pages/cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setNavigate } from "./core/services/navigationService";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./admin/pages/login/Login";
import AdminHome from "./admin/AdminHome";
import Products from "./admin/pages/products/Products";
import Users from "./admin/pages/users/Users";
import Orders from "./admin/pages/orders/Orders";
import Companies from "./admin/pages/companies/Companies";
import Categories from "./admin/pages/category/Category";
import AddProduct from "./admin/pages/addProduct/AddProduct";
import UpdateProduct from "./admin/pages/updateProduct/UpdateProduct";
import HomeAdmin from "./admin/pages/home/Home";
import BulkOperations from "./admin/pages/bulkoperations/BulkOperations";
import Profile from "./pages/profile/Profile";
const NavigationSetter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <NavigationSetter />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route
          path="/productinformation/:productId"
          element={<ProductInformation />}
        />
        <Route path="/bayi-girişi" element={<CompanyLogin />} />
        <Route path="/kullanıcı-girişi" element={<UserLogin />} />
        <Route
          path="/siparişlerim"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sepetim"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profilim"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["superAdmin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<HomeAdmin />} />
          <Route path="products" element={<Products />} />
          <Route path="bulk-operations" element={<BulkOperations />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="companies" element={<Companies />} />
          <Route path="categories" element={<Categories />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product/:productId" element={<UpdateProduct />} />
        </Route>

        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
