import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth(): JSX.Element {
  const location = useLocation();

  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
