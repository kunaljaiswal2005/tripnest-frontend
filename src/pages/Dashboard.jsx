import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Dashboard Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to TripNest! ✈️
          </h1>

          <p className="text-gray-600 mt-2">
            Plan your trips, manage itineraries, and travel smart.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Profile
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Account information
              </p>
            </div>

            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-medium text-gray-800 mt-1">
                {user?.email || 'Not available'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="font-medium text-gray-800 mt-1">
                {user?.role || 'TRAVELER'}
              </p>
            </div>

          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* My Trips */}
          <Link
            to="/trips"
            className="group bg-green-50 border border-green-200 rounded-xl p-6 text-center
                       hover:bg-green-100 hover:shadow-md transition duration-200"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition">
              🗺️
            </div>

            <h3 className="text-lg font-semibold text-green-800">
              My Trips
            </h3>

            <p className="text-sm text-green-700 mt-2">
              Create and manage your trips
            </p>

            <span className="inline-block mt-4 text-sm font-medium text-green-800">
              View Trips →
            </span>
          </Link>

          {/* Budget */}
          <Link
            to="/budget"
            className="group bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center
                       hover:bg-yellow-100 hover:shadow-md transition duration-200"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition">
              💰
            </div>

            <h3 className="text-lg font-semibold text-yellow-800">
              Budget
            </h3>

            <p className="text-sm text-yellow-700 mt-2">
              Track your travel expenses
            </p>

            <span className="inline-block mt-4 text-sm font-medium text-yellow-800">
              Manage Budget →
            </span>
          </Link>

          {/* Groups */}
          <Link
            to="/groups"
            className="group bg-purple-50 border border-purple-200 rounded-xl p-6 text-center
                       hover:bg-purple-100 hover:shadow-md transition duration-200"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition">
              👥
            </div>

            <h3 className="text-lg font-semibold text-purple-800">
              Groups
            </h3>

            <p className="text-sm text-purple-700 mt-2">
              Plan trips with friends & family
            </p>

            <span className="inline-block mt-4 text-sm font-medium text-purple-800">
              View Groups →
            </span>
          </Link>

        </div>

        {/* Quick Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold">
                Ready for your next adventure? 🌍
              </h2>

              <p className="text-blue-100 mt-1">
                Start planning your next unforgettable trip.
              </p>
            </div>

            <Link
              to="/trips"
              className="bg-white text-blue-600 px-5 py-2.5 rounded-lg
                         font-semibold hover:bg-blue-50 transition whitespace-nowrap"
            >
              Plan a Trip
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;