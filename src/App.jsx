import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuth2Success from "./pages/OAuth2Success";

import TravelerDashboard from "./pages/dashboards/TravelerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

import RoleRoute from "./routes/RoleRoute";

import TripDashboard from "./pages/trips/TripDashboard";

import CreateTrip from "./pages/trips/CreateTrip";

import TripDetails from "./pages/trips/TripDetails";

/*
 * ============================================================
 * PRIVATE ROUTE
 * ============================================================
 *
 * Allows only authenticated users to access the route.
 */

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


/*
 * ============================================================
 * DASHBOARD REDIRECT
 * ============================================================
 *
 * Determines which dashboard a user should see.
 *
 * TRAVELER     -> Traveler/User Dashboard
 * GROUP_ADMIN  -> Traveler/User Dashboard
 * ADMIN        -> Admin Dashboard
 *
 * Group Admin is NOT a separate global dashboard.
 * Group Admin functionality will later depend on the
 * particular trip/group the user manages.
 */

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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


/*
 * ============================================================
 * APPLICATION ROUTES
 * ============================================================
 */

const AppRoutes = () => {
  return (
    <Routes>

      {/* ======================================================
          LANDING PAGE
          ====================================================== */}

      <Route
        path="/"
        element={<LandingPage />}
      />


      {/* ======================================================
          PUBLIC ROUTES
          ====================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/oauth2/success"
        element={<OAuth2Success />}
      />


      {/* ======================================================
          GENERIC DASHBOARD URL
          ====================================================== */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardRedirect />
          </PrivateRoute>
        }
      />


      {/* ======================================================
          USER / TRAVELER DASHBOARD
          ======================================================
          
          Both TRAVELER and GROUP_ADMIN can access this
          dashboard.

          GROUP_ADMIN is no longer treated as a separate
          application-level dashboard role.
          ====================================================== */}

      <Route
  element={
    <RoleRoute
      allowedRole={["TRAVELER", "GROUP_ADMIN"]}
    />
  }
>
  <Route
    path="/dashboard/traveler"
    element={<TravelerDashboard />}
  />

  <Route
    path="/dashboard/trips"
    element={<TripDashboard />}
  />
  <Route
  path="/dashboard/trips/create"
  element={<CreateTrip />}
/>
<Route
  path="/dashboard/trips/:id"
  element={<TripDetails />}
/>
</Route>


      {/* ======================================================
          ADMIN DASHBOARD
          ====================================================== */}

      <Route
        element={
          <RoleRoute
            allowedRole="ADMIN"
          />
        }
      >
        <Route
          path="/dashboard/admin"
          element={<AdminDashboard />}
        />
      </Route>


      {/* ======================================================
          UNKNOWN ROUTES
          ====================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};


/*
 * ============================================================
 * ROOT APPLICATION
 * ============================================================
 */

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