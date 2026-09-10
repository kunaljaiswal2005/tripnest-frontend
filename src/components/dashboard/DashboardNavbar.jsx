import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role;

  // =====================================================
  // DASHBOARD PATH
  // =====================================================

  const dashboardPath =
    role === 'ADMIN'
      ? '/dashboard/admin'
      : '/dashboard/traveler';


  // =====================================================
  // NAVIGATION ITEMS
  // =====================================================

  const userNavItems = [
    {
      label: 'Dashboard',
      icon: '🏠',
      path: '/dashboard/traveler',
    },
    {
      label: 'My Trips',
      icon: '✈️',
      path: '/trips',
    },
    {
      label: 'Explore',
      icon: '🗺️',
      path: '/explore',
    },
    {
      label: 'Budget',
      icon: '💰',
      path: '/budget',
    },
    {
      label: 'Groups',
      icon: '👥',
      path: '/groups',
    },
    {
      label: 'Favorites',
      icon: '❤️',
      path: '/favorites',
    },
  ];


  const adminNavItems = [
    {
      label: 'Dashboard',
      icon: '🏠',
      path: '/dashboard/admin',
    },
    {
      label: 'Users',
      icon: '👥',
      path: '/users',
    },
    {
      label: 'Trips',
      icon: '✈️',
      path: '/trips',
    },
    {
      label: 'Destinations',
      icon: '🌍',
      path: '/destinations',
    },
    {
      label: 'Reports',
      icon: '📊',
      path: '/reports',
    },
    {
      label: 'Settings',
      icon: '⚙️',
      path: '/settings',
    },
  ];


  // =====================================================
  // SELECT NAVIGATION BASED ONLY ON ADMIN VS USER
  // =====================================================

  const currentItems =
    role === 'ADMIN'
      ? adminNavItems
      : userNavItems;


  // =====================================================
  // DISPLAY ROLE
  // =====================================================

  const currentRole =
    role === 'ADMIN'
      ? 'Administrator'
      : 'User';


  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMenu = () => {
    setIsOpen(false);
  };


  return (
    <>
      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}

      <header
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          z-50
          bg-white/90
          backdrop-blur-xl
          border-b
          border-gray-200
          px-5
          py-4
        "
      >

        <div className="flex items-center justify-between">

          <NavLink
            to={dashboardPath}
            onClick={closeMenu}
            className="text-xl font-bold text-slate-800"
          >
            ✈️ <span className="text-blue-600">Trip</span>Nest
          </NavLink>


          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-slate-700"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>

        </div>

      </header>


      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {isOpen && (
        <div
          className="
            lg:hidden
            fixed
            inset-0
            z-40
            bg-black/30
          "
          onClick={closeMenu}
        />
      )}


      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          bottom-0
          z-50
          w-72
          bg-white
          border-r
          border-gray-200
          flex
          flex-col
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* =================================================
            LOGO
        ================================================== */}

        <div
          className="
            px-7
            py-7
            border-b
            border-gray-100
          "
        >

          <NavLink
            to={dashboardPath}
            onClick={closeMenu}
            className="text-2xl font-bold text-slate-800"
          >
            ✈️ <span className="text-blue-600">Trip</span>Nest
          </NavLink>


          <p className="text-xs text-gray-500 mt-2">
            Your journey, beautifully planned.
          </p>


          {/* =================================================
              ACCOUNT TYPE BADGE
          ================================================== */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              mt-4
              px-3
              py-1.5
              rounded-full
              bg-blue-50
              text-blue-600
              text-xs
              font-semibold
            "
          >
            <span>●</span>
            {currentRole}
          </div>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav
          className="
            flex-1
            px-4
            py-6
            overflow-y-auto
          "
        >

          <p
            className="
              px-3
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            {role === 'ADMIN'
              ? 'Administration'
              : 'Travel'}
          </p>


          <div className="space-y-1">

            {currentItems.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
              >

                <span
                  className="
                    text-lg
                    w-6
                    text-center
                  "
                >
                  {item.icon}
                </span>


                <span>
                  {item.label}
                </span>

              </NavLink>

            ))}

          </div>


          {/* =================================================
              ACCOUNT
          ================================================== */}

          <div className="mt-8">

            <p
              className="
                px-3
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-gray-400
              "
            >
              Account
            </p>


            <NavLink
              to="/profile"
              onClick={closeMenu}
              className={({ isActive }) => `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-medium
                transition-all

                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }
              `}
            >

              <span
                className="
                  text-lg
                  w-6
                  text-center
                "
              >
                ⚙️
              </span>


              <span>
                Profile & Settings
              </span>

            </NavLink>

          </div>

        </nav>


        {/* =================================================
            USER SECTION
        ================================================== */}

        <div
          className="
            p-4
            border-t
            border-gray-100
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-gray-50
            "
          >

            {/* User Avatar */}

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-blue-100
                flex
                items-center
                justify-center
                text-lg
                flex-shrink-0
              "
            >
              {role === 'ADMIN' ? '🛡️' : '👤'}
            </div>


            {/* User Information */}

            <div
              className="
                flex-1
                min-w-0
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-800
                  truncate
                "
              >
                {user?.name || currentRole}
              </p>


              <p
                className="
                  text-xs
                  text-gray-500
                  truncate
                "
              >
                {user?.email || 'Account'}
              </p>

            </div>

          </div>


          {/* =================================================
              LOGOUT
          ================================================== */}

          <button
            onClick={logout}
            className="
              w-full
              mt-3
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-medium
              text-red-600
              hover:bg-red-50
              transition
            "
          >

            <span>↪</span>

            Logout

          </button>

        </div>

      </aside>
    </>
  );
};

export default DashboardNavbar;