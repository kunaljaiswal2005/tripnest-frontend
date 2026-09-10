import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuth2Success from "./pages/OAuth2Success";

import TravelerDashboard from "./pages/dashboards/TravelerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

import RoleRoute from "./routes/RoleRoute";


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "TRAVELER":
    case "GROUP_ADMIN":
      return <Navigate to="/dashboard/traveler" replace />;

    case "ADMIN":
      return <Navigate to="/dashboard/admin" replace />;

    default:
      return <Navigate to="/login" replace />;
  }
};


const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth2/success" element={<OAuth2Success />} />


      {/* Generic dashboard URL */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardRedirect />
          </PrivateRoute>
        }
      />


      {/* Traveler Routes */}
      <Route element={<RoleRoute allowedRole="TRAVELER" />}>
        <Route
          path="/dashboard/traveler"
          element={<TravelerDashboard />}
        />
      </Route>


      {/* Admin Routes */}
      <Route element={<RoleRoute allowedRole="ADMIN" />}>
        <Route
          path="/dashboard/admin"
          element={<AdminDashboard />}
        />
      </Route>


      {/* Root */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;