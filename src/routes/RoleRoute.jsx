import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRole }) => {
  const { user } = useAuth();

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Convert allowedRole into an array
  const allowedRoles = Array.isArray(allowedRole)
    ? allowedRole
    : [allowedRole];

  // User has permission
  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // Logged-in user does not have permission
  // Redirect them to their correct dashboard
  if (user.role === "ADMIN") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (
    user.role === "TRAVELER" ||
    user.role === "GROUP_ADMIN"
  ) {
    return <Navigate to="/dashboard/traveler" replace />;
  }

  // Unknown role
  return <Navigate to="/login" replace />;
};

export default RoleRoute;