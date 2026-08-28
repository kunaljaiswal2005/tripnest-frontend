import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Invalid email or password!' };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await api.post('/api/auth/register', {
        name, email, password, role
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Registration failed!' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);