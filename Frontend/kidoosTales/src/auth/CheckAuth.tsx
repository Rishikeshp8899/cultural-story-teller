import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function CheckAuth({ children }: { children: ReactNode }) {
  const getExpiry = () => Number(sessionStorage.getItem("token_expiry"));
  if (Date.now() < getExpiry()) {
    return <Navigate to="/videos" replace />;
  }
  return <>{children}</>;
}

