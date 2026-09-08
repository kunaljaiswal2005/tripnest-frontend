import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    switch (user.role) {
      case 'TRAVELER':
        return <Navigate to="/dashboard/traveler" replace />;

      case 'GROUP_ADMIN':
        return <Navigate to="/dashboard/group-admin" replace />;

      case 'ADMIN':
        return <Navigate to="/dashboard/admin" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default RoleRoute;