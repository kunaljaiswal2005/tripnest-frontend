import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL se token, email, role lo
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const role  = params.get('role');

    if (token) {
      // localStorage mein save karo
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ token, email, role }));
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Google Login ho raha hai...</p>
      </div>
    </div>
  );
};

export default OAuth2Success;