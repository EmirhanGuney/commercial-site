import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthGuard } from "../core/auth/AuthGuard.js";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, roles = [] }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const toastIds = {
    notLoggedIn: "not-logged-in",
    unauthorized: "unauthorized-access"
  };

  useEffect(() => {
    const isAuthenticated = AuthGuard.isAuthenticated();

    if (!isAuthenticated) {
      if (!toast.isActive(toastIds.notLoggedIn)) {
        toast.warning("Lütfen giriş yapınız", { toastId: toastIds.notLoggedIn });
      }
      setIsAllowed(false);
      return;
    }

    if (roles.length > 0 && !AuthGuard.isAuthorized(roles)) {
      if (!toast.isActive(toastIds.unauthorized)) {
        toast.warning("Yetkisiz erişim", { toastId: toastIds.unauthorized });
      }
      setIsAllowed(false);
      return;
    }

    setIsAllowed(true);

  }, [children, roles])


  if(isAllowed === null) return null;

  if(!isAllowed){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
