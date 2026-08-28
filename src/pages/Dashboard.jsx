import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to TripNest! ✈️
          </h1>
          <p className="text-gray-600 mb-6">
            Plan your trips, manage itineraries, and travel smart.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <h2 className="font-semibold text-blue-800 mb-2">Your Profile</h2>
            <p className="text-sm text-gray-700">Email: {user?.email}</p>
            <p className="text-sm text-gray-700">Role: {user?.role}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <div className="text-2xl">🗺️</div>
              <p className="font-semibold text-green-800 mt-1">My Trips</p>
              <p className="text-xs text-gray-500">Coming in Milestone 2</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
              <div className="text-2xl">💰</div>
              <p className="font-semibold text-yellow-800 mt-1">Budget</p>
              <p className="text-xs text-gray-500">Coming in Milestone 3</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-4 text-center">
              <div className="text-2xl">👥</div>
              <p className="font-semibold text-purple-800 mt-1">Groups</p>
              <p className="text-xs text-gray-500">Coming in Milestone 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;