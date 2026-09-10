
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "TRAVELER":
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

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth2/success" element={<OAuth2Success />} />

      {/* Generic Dashboard URL */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardRedirect />
          </PrivateRoute>
        }
      />

      {/* Traveler Dashboard */}
      <Route element={<RoleRoute allowedRole="TRAVELER" />}>
        <Route
          path="/dashboard/traveler"
          element={<TravelerDashboard />}
        />
      </Route>

      {/* Admin Dashboard */}
      <Route element={<RoleRoute allowedRole="ADMIN" />}>
        <Route
          path="/dashboard/admin"
          element={<AdminDashboard />}
        />
      </Route>

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
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
