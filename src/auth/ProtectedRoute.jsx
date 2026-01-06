import { Navigate, Outlet } from "react-router-dom";
import { AUTH_KEY } from "./constants";

export default function ProtectedRoute() {
  const isAuth = !!localStorage.getItem(AUTH_KEY);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
