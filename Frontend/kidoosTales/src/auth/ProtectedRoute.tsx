import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiCall from "../service/ApiCall";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log("Checking authorization...");
    const validateToken = async () => {
      const expiry = sessionStorage.getItem("token_expiry");
      console.log("Token expiry:", expiry);
      if (expiry && Date.now() < Number(expiry)) {
        setAuthorized(true);
        setLoading(false);
        return;
      }
      try {
        const response = await ApiCall({ apiname: "REFRESH" });

        if (response?.status === 200 && response?.message === "Token refreshed") {
          const newExpiry = Date.now() + 5 * 60 * 1000;
          sessionStorage.setItem("token_expiry", newExpiry.toString());
          setAuthorized(true);
        } else {
          sessionStorage.clear();
          setAuthorized(false);
        }
      } catch (error) {
        sessionStorage.clear();
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) return null; 

  if (!authorized) {
    console.log("Not authorized, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
