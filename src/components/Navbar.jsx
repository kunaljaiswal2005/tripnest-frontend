import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();

  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideMenuRef = useRef();

  // Open mobile menu
  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(0)';
    setIsMenuOpen(true);
  };

  // Close mobile menu
  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(100%)';
    setIsMenuOpen(false);
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`
          w-full fixed top-0 left-0
          px-5 lg:px-8 xl:px-[8%]
          py-4
          flex items-center justify-between
          z-50
          transition-all duration-300
          ${
            isScroll
              ? 'bg-white/80 backdrop-blur-lg shadow-sm'
              : 'bg-blue-600'
          }
        `}
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          className={`
            text-xl font-bold
            ${
              isScroll
                ? 'text-blue-600'
                : 'text-white'
            }
          `}
        >
          ✈️ TripNest
        </Link>

        {/* Desktop Menu */}
        <ul
          className={`
            hidden md:flex
            items-center
            gap-6 lg:gap-8
            rounded-full
            px-8 py-3
            ${
              isScroll
                ? 'bg-white/50 shadow-sm'
                : 'bg-blue-700/50'
            }
          `}
        >
          <li>
            <Link
              to="/dashboard"
              className={`font-medium ${
                isScroll ? 'text-gray-800' : 'text-white'
              }`}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/trips"
              className={`font-medium ${
                isScroll ? 'text-gray-800' : 'text-white'
              }`}
            >
              Trips
            </Link>
          </li>

          <li>
            <Link
              to="/bookings"
              className={`font-medium ${
                isScroll ? 'text-gray-800' : 'text-white'
              }`}
            >
              Bookings
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className={`font-medium ${
                isScroll ? 'text-gray-800' : 'text-white'
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              {/* User Information */}
              <div className="hidden lg:flex items-center gap-3">
                <span
                  className={`text-sm ${
                    isScroll ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  👤 {user.email}
                </span>

                <span
                  className={`
                    text-xs
                    px-2 py-1
                    rounded
                    ${
                      isScroll
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-blue-800 text-white'
                    }
                  `}
                >
                  {user.role}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="
                  hidden lg:block
                  bg-red-500
                  text-white
                  px-4 py-2
                  rounded-full
                  hover:bg-red-600
                  transition
                "
              >
                Logout
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`
              block md:hidden
              text-2xl
              ml-2
              ${
                isScroll
                  ? 'text-gray-800'
                  : 'text-white'
              }
            `}
            onClick={openMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile Side Menu */}
        <ul
          ref={sideMenuRef}
          className="
            flex md:hidden
            flex-col
            gap-6
            py-20
            px-10
            fixed
            right-0
            top-0
            bottom-0
            w-64
            z-50
            h-screen
            bg-white
            text-gray-800
            shadow-lg
            transition-transform
            duration-500
          "
          style={{
            transform: 'translateX(100%)',
          }}
        >
          {/* Close Button */}
          <div
            className="absolute right-6 top-6 cursor-pointer text-2xl"
            onClick={closeMenu}
          >
            ✕
          </div>

          {/* Mobile Links */}
          <li>
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="font-medium"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/trips"
              onClick={closeMenu}
              className="font-medium"
            >
              Trips
            </Link>
          </li>

          <li>
            <Link
              to="/bookings"
              onClick={closeMenu}
              className="font-medium"
            >
              Bookings
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="font-medium"
            >
              Profile
            </Link>
          </li>

          {/* Mobile User Info */}
          {user && (
            <>
              <div className="border-t pt-5 mt-2">
                <p className="text-sm break-all">
                  👤 {user.email}
                </p>

                <span className="
                  inline-block
                  mt-2
                  text-xs
                  bg-blue-100
                  text-blue-700
                  px-2
                  py-1
                  rounded
                ">
                  {user.role}
                </span>
              </div>

              {/* Mobile Logout */}
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-full
                  hover:bg-red-600
                  transition
                  w-fit
                "
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;