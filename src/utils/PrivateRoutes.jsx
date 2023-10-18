import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";
import axios from "axios";

function PrivateRoutes() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { user } =useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  // add to every request from now on
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;

  return <Outlet />;
}

export default PrivateRoutes;