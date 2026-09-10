import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRole }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Administrator route
  if (allowedRole === "ADMIN") {
    if (user.role === "ADMIN") {
      return <Outlet />;
    }

    // Non-admin users go to the normal user dashboard
    if (
      user.role === "TRAVELER" ||
      user.role === "GROUP_ADMIN"
    ) {
      return <Navigate to="/dashboard/traveler" replace />;
    }
  }

  // Normal user route
  if (allowedRole === "TRAVELER") {
    if (
      user.role === "TRAVELER" ||
      user.role === "GROUP_ADMIN"
    ) {
      return <Outlet />;
    }

    // Admin users go to admin dashboard
    if (user.role === "ADMIN") {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  // Unknown role
  return <Navigate to="/login" replace />;
};

export default RoleRoute;