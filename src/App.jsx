import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import LandingPage   from './pages/LandingPage';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Dashboard     from './pages/Dashboard';
import OAuth2Success from './pages/OAuth2Success';
import Trips         from './pages/Trips';
import CreateTrip    from './pages/CreateTrip';
import TripDetail    from './pages/TripDetail';
import Destinations  from './pages/Destinations';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  if (!user && !token) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/"              element={<LandingPage />} />
    <Route path="/login"         element={<Login />} />
    <Route path="/register"      element={<Register />} />
    <Route path="/oauth2/success" element={<OAuth2Success />} />

    <Route path="/dashboard" element={
      <PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path="/trips" element={
      <PrivateRoute><Trips /></PrivateRoute>} />
    <Route path="/trips/create" element={
      <PrivateRoute><CreateTrip /></PrivateRoute>} />
    <Route path="/trips/:id" element={
      <PrivateRoute><TripDetail /></PrivateRoute>} />
    <Route path="/destinations" element={
      <PrivateRoute><Destinations /></PrivateRoute>} />
  </Routes>
);

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