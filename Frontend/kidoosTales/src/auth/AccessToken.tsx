import { Navigate } from "react-router-dom";
import ApiCall from "../service/ApiCall";

interface ProtectedRouteProps {
  login:string,
  logout:string,
  user_id:string
}

export default function ProtectedRoute({login,logout,user_id}: ProtectedRouteProps) {

if(login=="true"){
  console.log("Setting token expiry on login");
        sessionStorage.setItem("token_expiry", (Date.now() + 5 * 60 * 1000).toString());
        sessionStorage.setItem("user_id", user_id);
    }
if (logout=="true") {
     sessionStorage.removeItem("token_expiry");
      sessionStorage.removeItem("user_id");
  }

  return ;
}
